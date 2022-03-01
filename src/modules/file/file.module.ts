import { Module } from '@nestjs/common'
import { FileService } from './file.service'
import { FileController } from './file.controller'
import { ConfigModule } from '../../config/config.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { File } from './entities/file.entity'

@Module({
  imports: [TypeOrmModule.forFeature([File]), ConfigModule],
  providers: [FileService],
  controllers: [FileController],
  exports: [FileService]
})
export class FileModule { }
