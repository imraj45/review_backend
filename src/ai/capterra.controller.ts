import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { AiService } from './ai.service.js';
import { GenerateReviewDto } from './dto/generate-review.dto.js';

@Controller('capterra')
export class CapterraController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate-review')
  @UseGuards(JwtAuthGuard)
  async generateReview(
    @Body() dto: GenerateReviewDto,
    @Req() req: { user: { userId: string } },
  ) {
    const productName = dto.productName ?? 'Sniffer';
    const tone = dto.tone ?? 'positive';

    const review = await this.aiService.generateCapterraReview(
      productName,
      tone,
      req.user.userId,
    );

    return {
      success: true,
      review: { ...review, reviewData: JSON.parse(review.reviewData) },
    };
  }
}
