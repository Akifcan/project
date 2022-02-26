import { Controller, Get, Inject, All, Req, BadRequestException } from '@nestjs/common'
import { Public } from 'src/common/decorators/public.decorator'
import { SeederService } from './seeder.service'

@Controller('seeder')
export class SeederController {
  @Inject() private seederService: SeederService

  @Public()
  @All()
  runSeed(@Req() req) {
    if (req.method === 'PURGE') {
      return this.seederService.create()
    }
    throw new BadRequestException('Send purge request for rerun seeder')
  }
}
