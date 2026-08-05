import {
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Logger,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadService } from './upload.service'
import { UploadResponseDto } from './dto/upload-response.dto'

@Controller('api')
export class UploadController {
  private readonly logger = new Logger(UploadController.name)

  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadResponseDto> {
    if (!file) {
      throw new BadRequestException('未找到上传文件')
    }
    this.logger.log(`上传文件: ${file.originalname}, 大小: ${file.size} bytes`)
    return this.uploadService.uploadFile(file)
  }

  @Get('uploads/:id')
  async getUpload(@Param('id') id: string): Promise<UploadResponseDto | null> {
    return this.uploadService.getFileById(id)
  }
}
