import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UploadResponseDto } from './dto/upload-response.dto'
import * as path from 'path'
import * as fs from 'fs'
import * as crypto from 'crypto'

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name)
  private readonly uploadDir: string
  private readonly maxSize: number
  private readonly allowedMimeTypes: string[]

  constructor(private readonly prisma: PrismaService) {
    this.uploadDir = process.env.UPLOAD_DIR || './uploads'
    this.maxSize = parseInt(process.env.UPLOAD_MAX_SIZE || '10485760', 10)
    this.allowedMimeTypes = (
      process.env.ALLOWED_MIME_TYPES || 'image/jpeg,image/png,image/gif,application/pdf'
    ).split(',')
  }

  async uploadFile(file: Express.Multer.File): Promise<UploadResponseDto> {
    // 验证文件类型
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new Error(`不支持的文件类型: ${file.mimetype}`)
    }

    // 验证文件大小
    if (file.size > this.maxSize) {
      throw new Error(`文件大小超过限制 (${this.maxSize / 1024 / 1024}MB)`)
    }

    // 确保上传目录存在
    const resolvedDir = path.resolve(this.uploadDir)
    if (!fs.existsSync(resolvedDir)) {
      fs.mkdirSync(resolvedDir, { recursive: true })
    }

    // 生成唯一文件名
    const ext = path.extname(file.originalname)
    const fileName = `${crypto.randomUUID()}${ext}`
    const filePath = path.join(resolvedDir, fileName)

    // 保存文件
    fs.writeFileSync(filePath, file.buffer)

    // 保存到数据库
    const record = await this.prisma.uploadRecord.create({
      data: {
        fileName: file.originalname,
        filePath: filePath,
        mimeType: file.mimetype,
        size: file.size,
      },
    })

    return {
      id: record.id,
      url: `/uploads/${fileName}`,
      fileName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      uploadedAt: record.uploadedAt.toISOString(),
    }
  }

  async getFileById(id: string): Promise<UploadResponseDto | null> {
    const record = await this.prisma.uploadRecord.findUnique({
      where: { id },
    })
    if (!record) return null
    return {
      id: record.id,
      url: `/uploads/${path.basename(record.filePath)}`,
      fileName: record.fileName,
      mimeType: record.mimeType,
      size: record.size,
      uploadedAt: record.uploadedAt.toISOString(),
    }
  }
}
