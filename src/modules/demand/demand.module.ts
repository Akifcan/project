import { Module } from '@nestjs/common'
import { DemandService } from './demand.service'
import { DemandController } from './demand.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Demand } from './entities/demand.entity'
import { DemandConversation } from './entities/demandConversation.entity'
import { User } from '../user/entites/user.entity'
import UserTransformer from '../user/user.transformer'
import { DemandActivity } from './entities/demandActivity.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Demand, DemandConversation, DemandActivity, User])],
  providers: [DemandService, UserTransformer],
  controllers: [DemandController]
})
export class DemandModule { }
