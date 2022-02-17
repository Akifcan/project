import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Controller()
export class AppController {
  @Inject() private configService: ConfigService;

  @Get()
  getHello(): string {
    return this.configService.database.host;
  }
}
