import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface ChatRoom {
  id: string;
  name: string;
  users: { id: string; nickname: string }[];
}

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private chatRooms: ChatRoom[] = [];
  private userNicknames: Map<string, string> = new Map();
  private connectedClients: Set<string> = new Set();

  handleConnection(client: Socket) {
    this.connectedClients.add(client.id);
    this.server.emit('userCount', { count: this.connectedClients.size });
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
    this.userNicknames.delete(client.id);

    // 사용자가 참여한 모든 방에서 제거
    this.chatRooms.forEach((room) => {
      const userIndex = room.users.findIndex((u) => u.id === client.id);
      if (userIndex !== -1) {
        room.users.splice(userIndex, 1);
        this.server.to(room.id).emit('userLeft', {
          user: { id: client.id, nickname: room.users[userIndex].nickname },
          message: `${room.users[userIndex].nickname}님이 퇴장하셨습니다.`,
        });
      }
    });

    this.server.emit('roomList', this.chatRooms);
    this.server.emit('userCount', { count: this.connectedClients.size });
  }

  @SubscribeMessage('setNickname')
  handleSetNickname(
    @ConnectedSocket() client: Socket,
    @MessageBody() nickname: string,
  ) {
    this.userNicknames.set(client.id, nickname);
    return { success: true, nickname };
  }

  @SubscribeMessage('createRoom')
  handleCreateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomName: string,
  ) {
    const room: ChatRoom = {
      id: Math.random().toString(36).substring(7),
      name: roomName,
      users: [],
    };
    this.chatRooms.push(room);
    this.server.emit('roomList', this.chatRooms);
    return { success: true, room };
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    const room = this.chatRooms.find((r) => r.id === roomId);
    if (!room) return { success: false, message: '방을 찾을 수 없습니다.' };

    const nickname = this.userNicknames.get(client.id);
    if (!nickname) return { success: false, message: '닉네임을 설정해주세요.' };

    client.join(roomId);
    room.users.push({ id: client.id, nickname });

    this.server.to(roomId).emit('userJoined', {
      user: { id: client.id, nickname },
      message: `${nickname}님이 입장하셨습니다.`,
    });

    this.server.emit('roomList', this.chatRooms);
    return { success: true, room };
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    const room = this.chatRooms.find((r) => r.id === roomId);
    if (!room) return { success: false, message: '방을 찾을 수 없습니다.' };

    const nickname = this.userNicknames.get(client.id);
    client.leave(roomId);

    room.users = room.users.filter((user) => user.id !== client.id);

    this.server.to(roomId).emit('userLeft', {
      user: { id: client.id, nickname },
      message: `${nickname}님이 퇴장하셨습니다.`,
    });

    this.server.emit('roomList', this.chatRooms);
    return { success: true };
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; message: string },
  ) {
    const nickname = this.userNicknames.get(client.id);
    if (!nickname) return { success: false, message: '닉네임을 설정해주세요.' };

    this.server.to(data.roomId).emit('newMessage', {
      user: { id: client.id, nickname },
      message: data.message,
      timestamp: new Date(),
    });

    return { success: true };
  }

  @SubscribeMessage('getRooms')
  handleGetRooms() {
    return { success: true, rooms: this.chatRooms };
  }
}
