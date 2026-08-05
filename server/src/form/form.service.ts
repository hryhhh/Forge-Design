import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateFormDto } from './dto/create-form.dto'

export interface FormSubmissionResponse {
  id: string
  formName: string
  values: Record<string, any>
  submittedAt: string
}

@Injectable()
export class FormService {
  private readonly logger = new Logger(FormService.name)

  constructor(private readonly prisma: PrismaService) {}

  async createForm(data: CreateFormDto): Promise<FormSubmissionResponse> {
    this.logger.log(`提交表单: ${data.formName}`)
    const submission = await this.prisma.formSubmission.create({
      data: {
        formName: data.formName,
        values: JSON.stringify(data.values),
      },
    })
    return {
      id: submission.id,
      formName: submission.formName,
      values: JSON.parse(submission.values),
      submittedAt: submission.submittedAt.toISOString(),
    }
  }

  async findAll(formName?: string) {
    const where = formName ? { formName } : {}
    return this.prisma.formSubmission.findMany({
      where,
      orderBy: { submittedAt: 'desc' },
      take: 50,
    })
  }

  async findOne(id: string) {
    const submission = await this.prisma.formSubmission.findUnique({
      where: { id },
    })
    if (!submission) return null
    return {
      id: submission.id,
      formName: submission.formName,
      values: JSON.parse(submission.values),
      submittedAt: submission.submittedAt.toISOString(),
    }
  }
}
