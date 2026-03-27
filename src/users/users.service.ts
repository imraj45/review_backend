import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOneBy({ email });
  }

  async create(
    email: string,
    password: string,
    role: 'user' | 'admin' = 'user',
  ): Promise<User> {
    const existing = await this.findByEmail(email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({
      email,
      password: hashedPassword,
      role,
    });
    return this.usersRepo.save(user);
  }

  async generateResetToken(email: string): Promise<string> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('No account found with this email');
    }

    const token = randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await this.usersRepo.save(user);

    return token;
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.usersRepo.findOneBy({ resetToken: token });
    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      throw new NotFoundException('Invalid or expired reset token');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null as any;
    user.resetTokenExpiry = null as any;
    await this.usersRepo.save(user);
  }
}
