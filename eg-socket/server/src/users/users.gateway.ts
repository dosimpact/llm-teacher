import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', // Vite 기본 포트
    credentials: true,
  },
})
export class UsersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers = 0;

  handleConnection(client: Socket) {
    this.connectedUsers++;
    this.emitUserCount();
  }

  handleDisconnect(client: Socket) {
    this.connectedUsers--;
    this.emitUserCount();
  }

  private emitUserCount() {
    this.server.emit('userCount', { count: this.connectedUsers });
  }
}
