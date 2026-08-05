import { IsString, IsNumber, IsOptional } from 'class-validator'

export class UploadResponseDto {
  @IsString()
  id: string

  @IsString()
  url: string

  @IsString()
  fileName: string

  @IsString()
  mimeType: string

  @IsNumber()
  size: number

  @IsString()
  uploadedAt: string
}
