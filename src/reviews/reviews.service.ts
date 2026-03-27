import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review, ReviewStatus } from './review.entity.js';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepo: Repository<Review>,
  ) {}

  async create(
    userId: string,
    platformId: string,
    filename: string,
  ): Promise<Review> {
    const review = this.reviewsRepo.create({
      userId,
      platformId,
      screenshotPath: filename,
      screenshotUrl: `/uploads/${filename}`,
      status: 'pending',
    });
    return this.reviewsRepo.save(review);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewsRepo.find();
  }

  async findByUser(userId: string): Promise<Review[]> {
    return this.reviewsRepo.findBy({ userId });
  }

  async findById(id: string): Promise<Review> {
    const review = await this.reviewsRepo.findOneBy({ id });
    if (!review) {
      throw new NotFoundException(`Review ${id} not found`);
    }
    return review;
  }

  async updateStatus(
    id: string,
    status: ReviewStatus,
    comment?: string,
  ): Promise<Review> {
    const review = await this.findById(id);
    if (review.status !== 'pending') {
      throw new BadRequestException(`Review has already been ${review.status}`);
    }
    review.status = status;
    review.adminComment = comment;
    return this.reviewsRepo.save(review);
  }
}
