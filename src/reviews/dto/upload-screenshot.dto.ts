import { IsNotEmpty, IsString } from 'class-validator';

export class UploadScreenshotDto {
  @IsString()
  @IsNotEmpty()
  platformId: string;
}
