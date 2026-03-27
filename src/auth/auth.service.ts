import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    email: string,
    password: string,
    role: 'user' | 'admin' = 'user',
  ) {
    const user = await this.usersService.create(email, password, role);
    const token = this.generateToken(user.id, user.email, user.role);
    return {
      accessToken: token,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.generateToken(user.id, user.email, user.role);
    return {
      accessToken: token,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }

  async forgotPassword(email: string) {
    const token = await this.usersService.generateResetToken(email);
    // TODO: Send email with reset link containing the token
    // For now, return the token in the response
    return {
      message: 'Password reset link has been sent to your email',
      resetToken: token,
    };
  }

  async resetPassword(token: string, newPassword: string) {
    await this.usersService.resetPassword(token, newPassword);
    return { message: 'Password has been reset successfully' };
  }

  private generateToken(userId: string, email: string, role: string): string {
    return this.jwtService.sign({ sub: userId, email, role });
  }
}
