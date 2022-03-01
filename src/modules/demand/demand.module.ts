import { Module } from '@nestjs/common'
import { DemandService } from './demand.service'
import { DemandController } from './demand.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Demand } from './entities/demand.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Demand])],
  providers: [DemandService],
  controllers: [DemandController]
})
export class DemandModule { }
