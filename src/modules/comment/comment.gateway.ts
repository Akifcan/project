import { Logger } from '@nestjs/common'
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
export class CommentGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server
    private logger: Logger = new Logger('AppGateway')

    comment = "comment-post"

    @SubscribeMessage('join-comment-room')
    handleMessage(@Payload() data: number) {
        this.server.socketsJoin(this.comment + data.toString())
    }

    afterInit() {
        this.logger.log('Init')
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`)
    }

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`)
    }
}
