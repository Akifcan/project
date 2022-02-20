import { Controller, Get } from '@nestjs/common';

@Controller('seeder')
export class SeederController {
  @Get()
  runSeed() {
    return 'ok';
  }
}
