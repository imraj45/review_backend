import {
  Controller,
  Post,
  Patch,
  Get,
  Param,
  Body,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Req,
} from '@nestjs/common';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { ReviewsService } from './reviews.service.js';
import { UploadScreenshotDto } from './dto/upload-screenshot.dto.js';
import { ReviewActionDto } from './dto/review-action.dto.js';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  /** Upload a screenshot as proof of review submission */
  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('screenshot', {
      storage: memoryStorage(),
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          cb(new BadRequestException('Only image files are allowed'), false);
          return;
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadScreenshotDto,
    @Req() req: { user: { userId: string } },
  ) {
    if (!file) {
      throw new BadRequestException('Screenshot file is required');
    }
    const review = await this.reviewsService.create(
      req.user.userId,
      dto.platformId,
      file.mimetype,
    );
    return {
      message: 'Screenshot uploaded successfully',
      review,
    };
  }

  /** Admin: approve a review */
  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async approve(@Param('id') id: string, @Body() dto: ReviewActionDto) {
    const review = await this.reviewsService.updateStatus(
      id,
      'approved',
      dto.comment,
    );
    return { message: 'Review approved', review };
  }

  /** Admin: reject a review */
  @Patch(':id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async reject(@Param('id') id: string, @Body() dto: ReviewActionDto) {
    const review = await this.reviewsService.updateStatus(
      id,
      'rejected',
      dto.comment,
    );
    return { message: 'Review rejected', review };
  }

  /** Get all reviews (admin only) */
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll() {
    return this.reviewsService.findAll();
  }

  /** Get current user's reviews */
  @Get('my')
  @UseGuards(JwtAuthGuard)
  findMine(@Req() req: { user: { userId: string } }) {
    return this.reviewsService.findByUser(req.user.userId);
  }

  /** Serve the screenshot image for a review */
  @Get(':id/screenshot')
  @UseGuards(JwtAuthGuard)
  async getScreenshot(@Param('id') id: string, @Res() res: Response) {
    const review = await this.reviewsService.findById(id);
    const buffer = Buffer.from(review.screenshotData, 'base64');
    res.set('Content-Type', review.screenshotMimeType);
    res.set('Content-Length', buffer.length.toString());
    res.send(buffer);
  }

  /** Get a single review by ID */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.reviewsService.findById(id);
  }
}
