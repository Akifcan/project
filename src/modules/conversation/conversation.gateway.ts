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
export class ConversationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server
  private logger: Logger = new Logger('AppGateway')

  conversationPrefix = "conversation-"

  @SubscribeMessage('join-chatroom')
  handleMessage(@Payload() data: number) {
    this.server.socketsJoin(this.conversationPrefix + data.toString())
    this.logger.log("joined ", this.conversationPrefix + data.toString())
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
