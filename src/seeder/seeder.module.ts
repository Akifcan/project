import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entites/user.entity';
import { Lesson } from 'src/entities/lesson.entity';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Lesson])],
  providers: [SeederService],
  controllers: [SeederController],
})
export class SeederModule {}
