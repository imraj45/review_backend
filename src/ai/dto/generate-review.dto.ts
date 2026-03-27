import { IsOptional, IsString, IsIn } from 'class-validator';

export class GenerateReviewDto {
  @IsOptional()
  @IsString()
  productName?: string;

  @IsOptional()
  @IsString()
  @IsIn(['positive', 'neutral', 'mixed'])
  tone?: 'positive' | 'neutral' | 'mixed';
}
