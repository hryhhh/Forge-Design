import { Controller, Get, Logger } from '@nestjs/common'
import { ComponentsService } from './components.service'

@Controller('api')
export class ComponentsController {
  private readonly logger = new Logger(ComponentsController.name)

  constructor(private readonly componentsService: ComponentsService) {}

  @Get('components')
  getComponents() {
    this.logger.log('获取组件元数据')
    return {
      components: this.componentsService.getComponents(),
    }
  }
}
