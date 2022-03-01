import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CommentDto } from './dtos/comment.dto'
import { Comment } from './entities/comment.entity'

@Injectable()
export class CommentService {

    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>

    createComment(id: number, commentDto: CommentDto, relation: Record<string, any>) {
        return this.commentRepository.save(this.commentRepository.create({
            body: commentDto.body,
            user: { id },
            ...relation
        }))
    }

    listComments(relation: Record<string, any>) {
        return this.commentRepository.find({ where: { ...relation }, relations: ["user"] })
    }

}
