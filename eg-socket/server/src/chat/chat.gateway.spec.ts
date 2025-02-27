import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { Socket, Server } from 'socket.io';
import { createMock } from '@golevelup/ts-jest';

interface MockSocket extends Partial<Socket> {
  id: string;
}

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let mockServer: Server;
  let mockClient: MockSocket;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGateway],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
    mockServer = createMock<Server>();
    mockClient = {
      id: 'test-client-id',
      join: jest.fn(),
      leave: jest.fn(),
    };

    gateway['server'] = mockServer;
  });

  describe('handleConnection', () => {
    it('연결된 클라이언트를 추가하고 현재 사용자 수를 emit해야 함', () => {
      gateway.handleConnection(mockClient as Socket);

      expect(gateway['connectedClients'].has(mockClient.id)).toBeTruthy();
      expect(mockServer.emit).toHaveBeenCalledWith('userCount', { count: 1 });
    });
  });

  describe('handleDisconnect', () => {
    it('연결이 끊긴 클라이언트를 제거하고 관련 정보를 업데이트해야 함', () => {
      // 먼저 클라이언트 연결
      gateway.handleConnection(mockClient as Socket);
      gateway['userNicknames'].set(mockClient.id, 'testUser');

      gateway.handleDisconnect(mockClient as Socket);

      expect(gateway['connectedClients'].has(mockClient.id)).toBeFalsy();
      expect(gateway['userNicknames'].has(mockClient.id)).toBeFalsy();
      expect(mockServer.emit).toHaveBeenCalledWith('userCount', { count: 0 });
      expect(mockServer.emit).toHaveBeenCalledWith('roomList', []);
    });
  });

  describe('handleSetNickname', () => {
    it('닉네임을 성공적으로 설정해야 함', () => {
      const nickname = 'testUser';
      const result = gateway.handleSetNickname(mockClient as Socket, nickname);

      expect(gateway['userNicknames'].get(mockClient.id)).toBe(nickname);
      expect(result).toEqual({ success: true, nickname });
    });

    it('닉네임을 여러 번 변경할 수 있어야 함', () => {
      // 첫 번째 닉네임 설정
      const firstNickname = 'testUser1';
      const firstResult = gateway.handleSetNickname(
        mockClient as Socket,
        firstNickname,
      );

      expect(gateway['userNicknames'].get(mockClient.id)).toBe(firstNickname);
      expect(firstResult).toEqual({ success: true, nickname: firstNickname });

      // 두 번째 닉네임 설정
      const secondNickname = 'testUser2';
      const secondResult = gateway.handleSetNickname(
        mockClient as Socket,
        secondNickname,
      );

      expect(gateway['userNicknames'].get(mockClient.id)).toBe(secondNickname);
      expect(secondResult).toEqual({ success: true, nickname: secondNickname });
    });

    it('다른 사용자와 동일한 닉네임을 사용할 수 있어야 함', () => {
      const anotherMockClient: MockSocket = {
        id: 'another-client-id',
        join: jest.fn(),
        leave: jest.fn(),
      };

      const nickname = 'testUser';

      // 첫 번째 클라이언트 닉네임 설정
      const firstResult = gateway.handleSetNickname(
        mockClient as Socket,
        nickname,
      );
      expect(firstResult.success).toBeTruthy();

      // 두 번째 클라이언트도 같은 닉네임 설정
      const secondResult = gateway.handleSetNickname(
        anotherMockClient as Socket,
        nickname,
      );
      expect(secondResult.success).toBeTruthy();

      expect(gateway['userNicknames'].get(mockClient.id)).toBe(nickname);
      expect(gateway['userNicknames'].get(anotherMockClient.id)).toBe(nickname);
    });
  });

  describe('handleCreateRoom', () => {
    it('새로운 채팅방을 생성하고 roomList를 업데이트해야 함', () => {
      const roomName = 'Test Room';
      const result = gateway.handleCreateRoom(mockClient as Socket, roomName);

      expect(result.success).toBeTruthy();
      expect(result.room.name).toBe(roomName);
      expect(mockServer.emit).toHaveBeenCalledWith(
        'roomList',
        gateway['chatRooms'],
      );
    });
  });

  describe('handleJoinRoom', () => {
    it('존재하지 않는 방에 참여를 시도하면 실패해야 함', () => {
      gateway['userNicknames'].set(mockClient.id, 'testUser');
      const result = gateway.handleJoinRoom(
        mockClient as Socket,
        'non-existent-room',
      );

      expect(result.success).toBeFalsy();
      expect(result.message).toBe('방을 찾을 수 없습니다.');
    });

    it('닉네임이 설정되지 않은 경우 실패해야 함', () => {
      // 방 생성
      const roomName = 'Test Room';
      const { room } = gateway.handleCreateRoom(mockClient as Socket, roomName);

      const result = gateway.handleJoinRoom(mockClient as Socket, room.id);

      expect(result.success).toBeFalsy();
      expect(result.message).toBe('닉네임을 설정해주세요.');
    });

    it('성공적으로 방에 참여해야 함', () => {
      // 방 생성
      const roomName = 'Test Room';
      const { room } = gateway.handleCreateRoom(mockClient as Socket, roomName);

      // 닉네임 설정
      const nickname = 'testUser';
      gateway.handleSetNickname(mockClient as Socket, nickname);

      // 방 참여
      const result = gateway.handleJoinRoom(mockClient as Socket, room.id);

      expect(result.success).toBeTruthy();
      expect(mockClient.join).toHaveBeenCalledWith(room.id);
      expect(mockServer.to).toHaveBeenCalledWith(room.id);
      expect(mockServer.emit).toHaveBeenCalledWith(
        'roomList',
        gateway['chatRooms'],
      );
    });

    it('이미 참여한 방에 다시 참여를 시도하면 실패해야 함', () => {
      // 방 생성
      const roomName = 'Test Room';
      const { room } = gateway.handleCreateRoom(mockClient as Socket, roomName);

      // 닉네임 설정
      const nickname = 'testUser';
      gateway.handleSetNickname(mockClient as Socket, nickname);

      // 첫 번째 참여
      const firstJoinResult = gateway.handleJoinRoom(
        mockClient as Socket,
        room.id,
      );
      expect(firstJoinResult.success).toBeTruthy();

      // 두 번째 참여 시도
      const secondJoinResult = gateway.handleJoinRoom(
        mockClient as Socket,
        room.id,
      );
      expect(secondJoinResult.success).toBeFalsy();
      expect(secondJoinResult.message).toBe('이미 참여한 방입니다.');

      // 방의 사용자 목록에 한 번만 추가되었는지 확인
      const updatedRoom = gateway['chatRooms'].find((r) => r.id === room.id);
      const userCount = updatedRoom?.users.filter(
        (u) => u.id === mockClient.id,
      ).length;
      expect(userCount).toBe(1);
    });
  });

  describe('handleMessage', () => {
    it('닉네임이 설정되지 않은 경우 메시지 전송이 실패해야 함', () => {
      const data = { roomId: 'test-room', message: 'Hello!' };
      const result = gateway.handleMessage(mockClient as Socket, data);

      expect(result.success).toBeFalsy();
      expect(result.message).toBe('닉네임을 설정해주세요.');
    });

    it('성공적으로 메시지를 전송해야 함', () => {
      // 닉네임 설정
      const nickname = 'testUser';
      gateway.handleSetNickname(mockClient as Socket, nickname);

      const data = { roomId: 'test-room', message: 'Hello!' };
      const result = gateway.handleMessage(mockClient as Socket, data);

      expect(result.success).toBeTruthy();
      expect(mockServer.to).toHaveBeenCalledWith(data.roomId);
    });

    it('메시지 전송 시 타임스탬프가 포함되어야 함', () => {
      // 닉네임 설정
      const nickname = 'testUser';
      gateway.handleSetNickname(mockClient as Socket, nickname);

      // 메시지 전송 전 시간
      const beforeSend = new Date();

      const data = { roomId: 'test-room', message: 'Hello!' };
      const result = gateway.handleMessage(mockClient as Socket, data);

      // 메시지 전송 후 시간
      const afterSend = new Date();

      expect(result.success).toBeTruthy();

      // emit된 메시지의 타임스탬프 확인
      const emitCalls = (mockServer.to as jest.Mock).mock.results[0].value.emit
        .mock.calls;
      const emittedMessage = emitCalls.find(
        (call) => call[0] === 'newMessage',
      )?.[1];

      expect(emittedMessage).toBeDefined();
      expect(emittedMessage.timestamp).toBeInstanceOf(Date);
      expect(emittedMessage.timestamp.getTime()).toBeGreaterThanOrEqual(
        beforeSend.getTime(),
      );
      expect(emittedMessage.timestamp.getTime()).toBeLessThanOrEqual(
        afterSend.getTime(),
      );
    });

    it('메시지에 사용자 정보가 올바르게 포함되어야 함', () => {
      // 닉네임 설정
      const nickname = 'testUser';
      gateway.handleSetNickname(mockClient as Socket, nickname);

      const data = { roomId: 'test-room', message: 'Hello!' };
      const result = gateway.handleMessage(mockClient as Socket, data);

      expect(result.success).toBeTruthy();

      // emit된 메시지의 사용자 정보 확인
      const emitCalls = (mockServer.to as jest.Mock).mock.results[0].value.emit
        .mock.calls;
      const emittedMessage = emitCalls.find(
        (call) => call[0] === 'newMessage',
      )?.[1];

      expect(emittedMessage).toBeDefined();
      expect(emittedMessage.user).toEqual({
        id: mockClient.id,
        nickname: nickname,
      });
    });
  });

  describe('handleLeaveRoom', () => {
    it('존재하지 않는 방을 나가려고 하면 실패해야 함', () => {
      const result = gateway.handleLeaveRoom(
        mockClient as Socket,
        'non-existent-room',
      );

      expect(result.success).toBeFalsy();
      expect(result.message).toBe('방을 찾을 수 없습니다.');
    });

    it('성공적으로 방을 나갈 수 있어야 함', () => {
      // 방 생성 및 참여
      const roomName = 'Test Room';
      const { room } = gateway.handleCreateRoom(mockClient as Socket, roomName);
      gateway.handleSetNickname(mockClient as Socket, 'testUser');
      gateway.handleJoinRoom(mockClient as Socket, room.id);

      // 방 나가기
      const result = gateway.handleLeaveRoom(mockClient as Socket, room.id);

      expect(result.success).toBeTruthy();
      expect(mockClient.leave).toHaveBeenCalledWith(room.id);
      expect(mockServer.to).toHaveBeenCalledWith(room.id);
      expect(mockServer.emit).toHaveBeenCalledWith(
        'roomList',
        gateway['chatRooms'],
      );

      // 방의 사용자 목록에서 제거되었는지 확인
      const updatedRoom = gateway['chatRooms'].find((r) => r.id === room.id);
      expect(
        updatedRoom?.users.some((u) => u.id === mockClient.id),
      ).toBeFalsy();
    });

    it('방을 나간 후에 다시 들어갈 수 있어야 함', () => {
      // 방 생성 및 참여
      const roomName = 'Test Room';
      const nickname = 'testUser';
      const { room } = gateway.handleCreateRoom(mockClient as Socket, roomName);
      gateway.handleSetNickname(mockClient as Socket, nickname);
      gateway.handleJoinRoom(mockClient as Socket, room.id);

      // 방 나가기
      gateway.handleLeaveRoom(mockClient as Socket, room.id);

      // 다시 방 참여
      const result = gateway.handleJoinRoom(mockClient as Socket, room.id);

      expect(result.success).toBeTruthy();
      expect(mockClient.join).toHaveBeenCalledWith(room.id);
      expect(mockServer.to).toHaveBeenCalledWith(room.id);
      expect(mockServer.emit).toHaveBeenCalledWith(
        'roomList',
        gateway['chatRooms'],
      );

      // 방의 사용자 목록에 다시 추가되었는지 확인
      const updatedRoom = gateway['chatRooms'].find((r) => r.id === room.id);
      const user = updatedRoom?.users.find((u) => u.id === mockClient.id);
      expect(user).toBeDefined();
      expect(user?.nickname).toBe(nickname);
    });
  });
});
