import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CommentDto } from './dtos/comment.dto'
import { Comment } from './entities/comment.entity'

import { Payload } from '@nestjs/microservices'
import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
@Injectable()
export class CommentService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>

    @WebSocketServer() server: Server
    private logger: Logger = new Logger('AppGateway')

    commentPrefix = "comment-"
    roomId: string
    currentUserId: number

    afterInit() {
        this.logger.log('Init')
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`)
    }

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`)
    }

    @SubscribeMessage('join-comment-room')
    joinCommentRoom(@Payload() data: { id: number, currentUserId: number }) {
        this.logger.log("post id is " + data.id)
        this.logger.log("current user id is " + data.currentUserId)
        this.server.socketsJoin(this.commentPrefix + data.id.toString())
        this.roomId = data.id.toString()
        this.currentUserId = data.currentUserId
    }


    @SubscribeMessage('create-comment-chatroom')
    async createComment(id: number, commentDto: CommentDto, relation: Record<string, any>) {
        const comment = await this.commentRepository.save(this.commentRepository.create({
            body: commentDto.body,
            user: { id },
            ...relation
        }))
        // just for test from postman api
        // this.findOneComment(comment.id)

        if (this.roomId && this.currentUserId) {
            if (this.currentUserId != id) {
                this.findOneComment(comment.id)
            } else {
                this.logger.log("this comment created by you")
            }
        }
        // this.server.to(JSON.stringify(relation)).emit("new-comment", comment)
        return comment
    }

    private async findOneComment(id: number) {
        const comment = await this.commentRepository.findOne({ where: { id }, relations: ["user", "user.department"] })
        this.server.to(this.roomId).emit("lastly-created-comment", comment)
    }

    listComments(relation: Record<string, any>) {
        return this.commentRepository.find({ order: { createdAt: -1 }, where: { ...relation }, relations: ["user", "user.department"] })
    }

}
