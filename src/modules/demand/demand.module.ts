import { Module } from '@nestjs/common'
import { DemandService } from './demand.service'
import { DemandController } from './demand.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Demand } from './entities/demand.entity'
import { DemandConversation } from './entities/demandConversation.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Demand, DemandConversation])],
  providers: [DemandService],
  controllers: [DemandController]
})
export class DemandModule { }
