import { IsOptional, IsString } from 'class-validator';

export class ReviewActionDto {
  @IsString()
  @IsOptional()
  comment?: string;
}
