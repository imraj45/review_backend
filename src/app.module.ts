import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { ReviewsModule } from './reviews/reviews.module.js';
import { AiModule } from './ai/ai.module.js';
import { User } from './users/user.entity.js';
import { Review } from './reviews/review.entity.js';
import { GeneratedReview } from './ai/generated-review.entity.js';
import { ApiKeyGuard } from './auth/guards/api-key.guard.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db.sqlite',
      entities: [User, Review, GeneratedReview],
      synchronize: true,
    }),
    AuthModule,
    ReviewsModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule {}
