import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { MediaPost } from './entities/mediaPost.entity'
import { FileModule } from '../file/file.module'

@Module({
  imports: [TypeOrmModule.forFeature([MediaPost, Post]), FileModule],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService]
})
export class PostModule { }
