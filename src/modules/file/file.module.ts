import { Module } from '@nestjs/common'
import { FileService } from './file.service'
import { FileController } from './file.controller'
import { ConfigModule } from '../../config/config.module'

@Module({
  imports: [ConfigModule],
  providers: [FileService],
  controllers: [FileController],
  exports: [FileService]
})
export class FileModule {}
