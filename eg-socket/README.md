# Socket.IO 실시간 채팅 애플리케이션

이 프로젝트는 Socket.IO를 사용한 실시간 채팅 애플리케이션의 예제입니다. Nest.js와 React를 사용하여 구현되었으며, 실시간 양방향 통신의 기본 개념부터 실제 구현까지를 보여줍니다.

## 목차

1. [Socket.IO 기본 개념](#socketio-기본-개념)
2. [프로젝트 구조](#프로젝트-구조)
3. [주요 기능](#주요-기능)
4. [실행 방법](#실행-방법)
5. [구현 상세](#구현-상세)

## Socket.IO 기본 개념

### WebSocket vs Socket.IO

#### WebSocket
- HTML5의 웹소켓은 브라우저와 서버 사이의 양방향 통신을 제공하는 프로토콜
- 단순한 TCP 기반의 프로토콜로, 지속적인 연결을 유지
- 기본적인 텍스트/바이너리 메시지 전송만 지원

#### Socket.IO
- WebSocket을 포함한 여러 실시간 통신 방식을 추상화한 라이브러리
- 자동 재연결, 패킷 버퍼링, 브로드캐스팅 등 추가 기능 제공
- 폴백 메커니즘을 통해 WebSocket을 지원하지 않는 환경에서도 동작

### Socket.IO 작동 원리

1. **연결 수립**
   ```typescript
   // 클라이언트
   const socket = io('http://localhost:3000');
   
   // 서버 (Nest.js)
   @WebSocketGateway()
   export class ChatGateway implements OnGatewayConnection {
     handleConnection(client: Socket) {
       // 연결 처리
     }
   }
   ```

2. **이벤트 기반 통신**
   ```typescript
   // 클라이언트에서 이벤트 발생
   socket.emit('message', { text: 'Hello' });
   
   // 서버에서 이벤트 수신
   @SubscribeMessage('message')
   handleMessage(@MessageBody() data: any) {
     // 메시지 처리
   }
   ```

3. **룸(Room) 기능**
   ```typescript
   // 서버에서 룸 관리
   client.join('room1');  // 룸 참여
   this.server.to('room1').emit('message', data);  // 룸에 메시지 전송
   ```

## 프로젝트 구조

```
├── client/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/    # React 컴포넌트
│   │   ├── types/        # TypeScript 타입 정의
│   │   └── App.tsx       # 메인 애플리케이션
│   └── package.json
│
├── server/                # Nest.js 백엔드
│   ├── src/
│   │   ├── chat/        # 채팅 관련 모듈
│   │   └── main.ts      # 서버 엔트리 포인트
│   └── package.json
│
└── docker-compose.yml    # Docker 구성
```

## 주요 기능

1. **실시간 사용자 관리**
   - 접속자 수 실시간 업데이트
   - 닉네임 기반 사용자 식별
   - 연결/연결 해제 이벤트 처리

2. **채팅방 기능**
   - 채팅방 생성/참여/나가기
   - 실시간 메시지 전송
   - 참여자 목록 실시간 업데이트
   - 입장/퇴장 알림

3. **UI/UX**
   - 다크 모드 지원
   - 반응형 디자인
   - 실시간 알림 및 상태 표시

## 구현 상세

### 1. 서버 사이드 (Nest.js)

#### 채팅 게이트웨이
```typescript
@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private chatRooms: ChatRoom[] = [];
  private userNicknames: Map<string, string> = new Map();
  private connectedClients: Set<string> = new Set();

  // 연결 관리
  handleConnection(client: Socket) {
    this.connectedClients.add(client.id);
    this.server.emit('userCount', { count: this.connectedClients.size });
  }

  // 채팅방 관리
  @SubscribeMessage('createRoom')
  handleCreateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomName: string,
  ) {
    // 채팅방 생성 로직
  }
}
```

### 2. 클라이언트 사이드 (React)

#### 소켓 연결 관리
```typescript
const socket = io(window.location.origin, {
  withCredentials: true,
  path: '/socket.io'
});

function App() {
  useEffect(() => {
    socket.on('userCount', (data: { count: number }) => {
      setConnectedUsers(data.count);
    });

    return () => {
      socket.off('userCount');
    };
  }, []);
}
```

#### 메시지 처리
```typescript
function ChatRoom({ room, onSendMessage }) {
  const handleSubmit = (message: string) => {
    socket.emit('sendMessage', { roomId: room.id, message });
  };

  useEffect(() => {
    socket.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => socket.off('newMessage');
  }, []);
}
```

## 실행 방법

### Docker를 사용한 실행

```bash
# 프로젝트 클론
git clone <repository-url>

# Docker Compose로 실행
docker-compose up --build

# 접속
http://localhost:3000
```

### 로컬 개발 환경

```bash
# 서버 실행
cd server
npm install
npm run start:dev

# 클라이언트 실행
cd client
npm install
npm run dev
```

## 확장 가능성

1. **기능 확장**
   - 파일 전송 기능
   - 읽지 않은 메시지 알림
   - 이모지 지원
   - 메시지 검색

2. **성능 최적화**
   - 메시지 페이지네이션
   - 이미지 최적화
   - 연결 상태 관리 개선

3. **보안 강화**
   - 사용자 인증
   - 메시지 암호화
   - Rate limiting

## 라이선스

MIT License