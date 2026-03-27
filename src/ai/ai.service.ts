import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeneratedReview } from './generated-review.entity.js';
import { buildG2ReviewPrompt } from './prompts/g2-review.prompt.js';
import { buildProductHuntReviewPrompt } from './prompts/producthunt-review.prompt.js';
import { buildChromeWebStoreReviewPrompt } from './prompts/chromewebstore-review.prompt.js';
import { buildTrustpilotReviewPrompt } from './prompts/trustpilot-review.prompt.js';
import { buildCapterraReviewPrompt } from './prompts/capterra-review.prompt.js';

interface AiConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
}

@Injectable()
export class AiService {
  constructor(
    @InjectRepository(GeneratedReview)
    private readonly generatedReviewRepo: Repository<GeneratedReview>,
  ) {}
  private getConfig(): AiConfig {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new HttpException(
        'OPENAI_API_KEY environment variable is not set',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      apiKey,
      baseUrl: process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1',
      model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
    };
  }

  async generateG2Review(
    productName: string,
    tone: 'positive' | 'neutral' | 'mixed',
    userId: string,
  ): Promise<GeneratedReview> {
    const systemPrompt = this.buildSystemPrompt('G2', tone);
    const userPrompt = buildG2ReviewPrompt(productName);
    const reviewData = await this.callAi(systemPrompt, userPrompt);
    return this.saveGeneratedReview(
      userId,
      'g2',
      productName,
      tone,
      reviewData,
    );
  }

  async generateProductHuntReview(
    productName: string,
    tone: 'positive' | 'neutral' | 'mixed',
    userId: string,
  ): Promise<GeneratedReview> {
    const systemPrompt = this.buildSystemPrompt('Product Hunt', tone);
    const userPrompt = buildProductHuntReviewPrompt(productName);
    const reviewData = await this.callAi(systemPrompt, userPrompt);
    return this.saveGeneratedReview(
      userId,
      'producthunt',
      productName,
      tone,
      reviewData,
    );
  }

  async generateChromeWebStoreReview(
    productName: string,
    tone: 'positive' | 'neutral' | 'mixed',
    userId: string,
  ): Promise<GeneratedReview> {
    const systemPrompt = this.buildSystemPrompt('Chrome Web Store', tone);
    const userPrompt = buildChromeWebStoreReviewPrompt(productName);
    const reviewData = await this.callAi(systemPrompt, userPrompt);
    return this.saveGeneratedReview(
      userId,
      'chromewebstore',
      productName,
      tone,
      reviewData,
    );
  }

  async generateTrustpilotReview(
    productName: string,
    tone: 'positive' | 'neutral' | 'mixed',
    userId: string,
  ): Promise<GeneratedReview> {
    const systemPrompt = this.buildSystemPrompt('Trustpilot', tone);
    const userPrompt = buildTrustpilotReviewPrompt(productName);
    const reviewData = await this.callAi(systemPrompt, userPrompt);
    return this.saveGeneratedReview(
      userId,
      'trustpilot',
      productName,
      tone,
      reviewData,
    );
  }

  async generateCapterraReview(
    productName: string,
    tone: 'positive' | 'neutral' | 'mixed',
    userId: string,
  ): Promise<GeneratedReview> {
    const systemPrompt = this.buildSystemPrompt('Capterra', tone);
    const userPrompt = buildCapterraReviewPrompt(productName);
    const reviewData = await this.callAi(systemPrompt, userPrompt);
    return this.saveGeneratedReview(
      userId,
      'capterra',
      productName,
      tone,
      reviewData,
    );
  }

  /** Save a generated review to the database */
  private async saveGeneratedReview(
    userId: string,
    platform: string,
    productName: string,
    tone: string,
    reviewData: Record<string, any>,
  ): Promise<GeneratedReview> {
    const review = this.generatedReviewRepo.create({
      userId,
      platform,
      productName,
      tone,
      reviewData: JSON.stringify(reviewData),
      status: 'generated',
    });
    return this.generatedReviewRepo.save(review);
  }

  /** Get all generated reviews for a user */
  async getMyGeneratedReviews(userId: string): Promise<any[]> {
    const reviews = await this.generatedReviewRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
    return reviews.map((r) => ({
      ...r,
      reviewData: JSON.parse(r.reviewData),
    }));
  }

  /** Get all generated reviews (admin) */
  async getAllGeneratedReviews(): Promise<any[]> {
    const reviews = await this.generatedReviewRepo.find({
      order: { createdAt: 'DESC' },
    });
    return reviews.map((r) => ({
      ...r,
      reviewData: JSON.parse(r.reviewData),
    }));
  }

  /** Get a single generated review by ID */
  async getGeneratedReviewById(id: string): Promise<any> {
    const review = await this.generatedReviewRepo.findOneBy({ id });
    if (!review) {
      throw new HttpException(
        'Generated review not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return { ...review, reviewData: JSON.parse(review.reviewData) };
  }

  /** Get latest review status per platform */
  async getLatestStatusByPlatform(userId?: string) {
    const platforms = [
      'g2',
      'producthunt',
      'capterra',
      'trustpilot',
      'chromewebstore',
    ];
    const result: Record<
      string,
      { status: string; reviewId: string; updatedAt: Date } | null
    > = {};

    for (const platform of platforms) {
      const where: any = { platform };
      if (userId) {
        where.userId = userId;
      }
      const review = await this.generatedReviewRepo.findOne({
        where,
        order: { createdAt: 'DESC' },
      });
      result[platform] = review
        ? {
            status: review.status,
            reviewId: review.id,
            updatedAt: review.updatedAt,
          }
        : null;
    }

    return result;
  }

  /** Get the latest review for a specific platform (for a user) */
  async getLatestReviewByPlatform(
    platform: string,
    userId?: string,
  ): Promise<any> {
    const where: any = { platform };
    if (userId) {
      where.userId = userId;
    }
    const review = await this.generatedReviewRepo.findOne({
      where,
      order: { createdAt: 'DESC' },
    });
    if (!review) {
      throw new HttpException(
        `No review found for platform: ${platform}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return { ...review, reviewData: JSON.parse(review.reviewData) };
  }

  /** Get the latest review per platform for a user (one per platform) */
  async getLatestReviewPerPlatform(userId?: string): Promise<any[]> {
    const platforms = [
      'g2',
      'producthunt',
      'capterra',
      'trustpilot',
      'chromewebstore',
    ];
    const results: any[] = [];

    for (const platform of platforms) {
      const where: any = { platform };
      if (userId) {
        where.userId = userId;
      }
      const review = await this.generatedReviewRepo.findOne({
        where,
        order: { createdAt: 'DESC' },
      });
      if (review) {
        results.push({ ...review, reviewData: JSON.parse(review.reviewData) });
      }
    }

    return results;
  }

  /** Update generated review status */
  async updateGeneratedReviewStatus(
    id: string,
    status: string,
  ): Promise<GeneratedReview> {
    const review = await this.generatedReviewRepo.findOneBy({ id });
    if (!review) {
      throw new HttpException(
        'Generated review not found',
        HttpStatus.NOT_FOUND,
      );
    }
    review.status = status;
    return this.generatedReviewRepo.save(review);
  }

  /** Dashboard stats */
  async getDashboardStats(userId?: string) {
    const qb = this.generatedReviewRepo.createQueryBuilder('gr');
    if (userId) {
      qb.where('gr.userId = :userId', { userId });
    }

    const reviews = await qb.getMany();

    const statusCounts = {
      generated: 0,
      submitted: 0,
      approved: 0,
      rejected: 0,
    };
    const platformStats: Record<string, { count: number; status: string }> = {};

    for (const r of reviews) {
      statusCounts[r.status] = (statusCounts[r.status] ?? 0) + 1;

      if (!platformStats[r.platform]) {
        platformStats[r.platform] = { count: 0, status: r.status };
      }
      platformStats[r.platform].count++;
      // Use the latest status for the platform
      platformStats[r.platform].status = r.status;
    }

    return {
      total: reviews.length,
      statusCounts,
      platforms: platformStats,
    };
  }

  private async callAi(
    systemPrompt: string,
    userPrompt: string,
  ): Promise<Record<string, any>> {
    const config = this.getConfig();

    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.85,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new HttpException(
        `AI provider returned ${response.status}: ${errorBody}`,
        HttpStatus.BAD_GATEWAY,
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new HttpException(
        'AI provider returned an empty response',
        HttpStatus.BAD_GATEWAY,
      );
    }

    try {
      return JSON.parse(content);
    } catch {
      throw new HttpException(
        'Failed to parse AI response as JSON',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  private buildSystemPrompt(platform: string, tone: string): string {
    const toneGuide: Record<string, string> = {
      positive:
        'Generate a positive review with high ratings. The user genuinely likes the product with minor complaints.',
      neutral:
        'Generate a balanced review with moderate ratings. The user sees both pros and cons.',
      mixed:
        'Generate a slightly critical review with lower ratings. The user has significant complaints but acknowledges some value.',
    };

    return `You are a helpful assistant that generates realistic ${platform} product review data. ${toneGuide[tone] ?? toneGuide.positive} Return ONLY valid JSON. Do not wrap in markdown code blocks.`;
  }
}
