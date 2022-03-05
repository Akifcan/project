import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Post } from './entities/post.entity'

@Injectable()
export class PostService {

    @InjectRepository(Post) readonly postRepository: Repository<Post>

    createPostAsAnnouncement(userId: number, announcementId: number) {
        return this.postRepository.save(this.postRepository.create({ announcement: { id: announcementId }, user: { id: userId } }))
    }

}
