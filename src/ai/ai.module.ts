import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneratedReview } from './generated-review.entity.js';
import { AiController } from './ai.controller.js';
import { ProductHuntController } from './producthunt.controller.js';
import { ChromeWebStoreController } from './chromewebstore.controller.js';
import { TrustpilotController } from './trustpilot.controller.js';
import { CapterraController } from './capterra.controller.js';
import { DashboardController } from './dashboard.controller.js';
import { AiService } from './ai.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([GeneratedReview])],
  controllers: [
    AiController,
    ProductHuntController,
    ChromeWebStoreController,
    TrustpilotController,
    CapterraController,
    DashboardController,
  ],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
