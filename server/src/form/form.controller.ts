import {
  Controller,
  Post,
  Get,
  BadRequestException,
  Logger,
  Body,
  Query,
  Param,
} from '@nestjs/common'
import { FormService } from './form.service'
import { CreateFormDto } from './dto/create-form.dto'

@Controller('api')
export class FormController {
  private readonly logger = new Logger(FormController.name)

  constructor(private readonly formService: FormService) {}

  @Post('forms')
  async create(@Body() createFormDto: CreateFormDto) {
    this.logger.log(`接收表单提交: ${createFormDto.formName}`)
    return this.formService.createForm(createFormDto)
  }

  @Get('forms')
  async findAll(@Query() query: { formName?: string }) {
    return this.formService.findAll(query.formName)
  }

  @Get('forms/:id')
  async findOne(@Param('id') id: string) {
    const result = await this.formService.findOne(id)
    if (!result) {
      throw new BadRequestException('表单提交不存在')
    }
    return result
  }
}
