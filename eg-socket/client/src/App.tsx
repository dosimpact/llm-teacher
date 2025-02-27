import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ChatRoom as ChatRoomType, ChatMessage, UserEvent } from "./types";
import { RoomList } from "./components/RoomList";
import { ChatRoom } from "./components/ChatRoom";
import { NicknameForm } from "./components/NicknameForm";
import "./App.css";

// 상대 경로로 소켓 연결 (프록시된 경로 사용)
const socket = io(window.location.origin, {
  withCredentials: true,
  path: "/socket.io",
});

function App() {
  const [nickname, setNickname] = useState("");
  const [rooms, setRooms] = useState<ChatRoomType[]>([]);
  const [currentRoom, setCurrentRoom] = useState<ChatRoomType | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [events, setEvents] = useState<UserEvent[]>([]);
  const [connectedUsers, setConnectedUsers] = useState(0);

  useEffect(() => {
    socket.on("userCount", (data: { count: number }) => {
      setConnectedUsers(data.count);
    });

    if (nickname) {
      socket.emit(
        "getRooms",
        (response: { success: boolean; rooms: ChatRoomType[] }) => {
          if (response.success) {
            setRooms(response.rooms);
          }
        }
      );
    }

    socket.on("roomList", (updatedRooms: ChatRoomType[]) => {
      setRooms(updatedRooms);
      if (currentRoom) {
        const updatedRoom = updatedRooms.find((r) => r.id === currentRoom.id);
        if (updatedRoom) {
          setCurrentRoom(updatedRoom);
        }
      }
    });

    socket.on("newMessage", (message: ChatMessage) => {
      setMessages((prev) => [
        ...prev,
        { ...message, timestamp: new Date(message.timestamp) },
      ]);
    });

    socket.on("userJoined", (event: UserEvent) => {
      setEvents((prev) => [...prev, event]);
    });

    socket.on("userLeft", (event: UserEvent) => {
      setEvents((prev) => [...prev, event]);
    });

    return () => {
      socket.off("userCount");
      socket.off("roomList");
      socket.off("newMessage");
      socket.off("userJoined");
      socket.off("userLeft");
    };
  }, [currentRoom, nickname]);

  const handleSetNickname = (name: string) => {
    socket.emit(
      "setNickname",
      name,
      (response: { success: boolean; nickname: string }) => {
        if (response.success) {
          setNickname(response.nickname);
        }
      }
    );
  };

  const handleCreateRoom = (roomName: string) => {
    socket.emit(
      "createRoom",
      roomName,
      (response: { success: boolean; room: ChatRoomType }) => {
        if (response.success) {
          handleJoinRoom(response.room.id);
        }
      }
    );
  };

  const handleJoinRoom = (roomId: string) => {
    socket.emit(
      "joinRoom",
      roomId,
      (response: { success: boolean; room: ChatRoomType }) => {
        if (response.success) {
          setCurrentRoom(response.room);
          setMessages([]);
          setEvents([]);
        }
      }
    );
  };

  const handleLeaveRoom = () => {
    if (currentRoom) {
      socket.emit(
        "leaveRoom",
        currentRoom.id,
        (response: { success: boolean }) => {
          if (response.success) {
            setCurrentRoom(null);
            setMessages([]);
            setEvents([]);
          }
        }
      );
    }
  };

  const handleSendMessage = (message: string) => {
    if (currentRoom) {
      socket.emit("sendMessage", { roomId: currentRoom.id, message });
    }
  };

  if (!nickname) {
    return <NicknameForm onSubmit={handleSetNickname} />;
  }

  return (
    <div className="app">
      <div className="app-header">
        <div className="user-info">
          <span>
            안녕하세요, <strong>{nickname}</strong>님!
          </span>
          <div className="user-count">
            <span>전체 접속자:</span>
            <span className="count">{connectedUsers}</span>
            <span>명</span>
          </div>
        </div>
        <div className="room-info">
          <span>전체 채팅방: </span>
          <span className="count">{rooms.length}</span>
          <span>개</span>
        </div>
      </div>

      {currentRoom ? (
        <ChatRoom
          room={currentRoom}
          onLeaveRoom={handleLeaveRoom}
          onSendMessage={handleSendMessage}
          messages={messages}
          events={events}
        />
      ) : (
        <RoomList
          rooms={rooms}
          onJoinRoom={handleJoinRoom}
          onCreateRoom={handleCreateRoom}
        />
      )}
    </div>
  );
}

export default App;
