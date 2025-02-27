import { ChatRoom } from "../types";

interface RoomListProps {
  rooms: ChatRoom[];
  onJoinRoom: (roomId: string) => void;
  onCreateRoom: (roomName: string) => void;
}

export function RoomList({ rooms, onJoinRoom, onCreateRoom }: RoomListProps) {
  const handleCreateRoom = () => {
    const roomName = prompt("방 이름을 입력하세요:");
    if (roomName) {
      onCreateRoom(roomName);
    }
  };

  return (
    <div className="room-list">
      <h2>채팅방 목록</h2>
      <button onClick={handleCreateRoom} className="create-room-btn">
        새 채팅방 만들기
      </button>
      <div className="rooms">
        {rooms.map((room) => (
          <div key={room.id} className="room-item">
            <span className="room-name">{room.name}</span>
            <span className="room-users">({room.users.length}명)</span>
            <button onClick={() => onJoinRoom(room.id)}>참여하기</button>
          </div>
        ))}
      </div>
    </div>
  );
}
