import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from './config/config.module'
import { UploadModule } from './upload/upload.module'
import { FormModule } from './form/form.module'
import { ComponentsModule } from './components/components.module'

@Module({
  imports: [
    ConfigModule,
    UploadModule,
    FormModule,
    ComponentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
