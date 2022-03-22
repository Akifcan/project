import { Module } from '@nestjs/common'
import { AssistantService } from './assistant.service'
import { AssistantController } from './assistant.controller'
import { ElasticModule } from '../../elastic/elastic.module'
import { ConfigModule } from '../../config/config.module'

@Module({
  imports: [ElasticModule, ConfigModule],
  providers: [AssistantService],
  controllers: [AssistantController]
})
export class AssistantModule { }
