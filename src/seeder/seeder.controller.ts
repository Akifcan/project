import { Controller, Get, Inject } from '@nestjs/common'
import { SeederService } from './seeder.service'

@Controller('seeder')
export class SeederController {
  @Inject() private seederService: SeederService

  @Get()
  runSeed() {
    return this.seederService.create()
  }
}
