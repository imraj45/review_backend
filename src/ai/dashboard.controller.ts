import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { AiService } from './ai.service.js';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly aiService: AiService) {}

  /** Get latest review for each platform (one per platform) */
  @Get('reviews/by-platform')
  @UseGuards(JwtAuthGuard)
  async getLatestPerPlatform(@Req() req: { user: { userId: string } }) {
    return this.aiService.getLatestReviewPerPlatform(req.user.userId);
  }

  /** Get latest review for a specific platform (e.g., g2, producthunt, capterra) */
  @Get('reviews/platform/:platform')
  @UseGuards(JwtAuthGuard)
  async getReviewByPlatform(
    @Param('platform') platform: string,
    @Req() req: { user: { userId: string } },
  ) {
    return this.aiService.getLatestReviewByPlatform(platform, req.user.userId);
  }
}
