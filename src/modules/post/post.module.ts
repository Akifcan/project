import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { MediaPost } from './entities/mediaPost.entity'
import { FileModule } from '../file/file.module'
import { EventPost } from './entities/eventPost.entity'
import { User } from '../user/entites/user.entity'
import { UserModule } from '../user/user.module'
import { PostTransformer } from './post.transformer'
import UserTransformer from '../user/user.transformer'
import { NotificationModule } from '../notification/notification.module'

@Module({
  imports: [TypeOrmModule.forFeature([MediaPost, Post, EventPost, User]), FileModule, UserModule, NotificationModule],
  providers: [PostService, PostTransformer, UserTransformer],
  controllers: [PostController],
  exports: [PostService]
})
export class PostModule { }
