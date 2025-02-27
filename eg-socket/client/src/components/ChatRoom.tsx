import { useState, useEffect, useRef } from "react";
import { ChatRoom as ChatRoomType, ChatMessage, UserEvent } from "../types";

interface ChatRoomProps {
  room: ChatRoomType;
  onLeaveRoom: () => void;
  onSendMessage: (message: string) => void;
  messages: ChatMessage[];
  events: UserEvent[];
}

export function ChatRoom({
  room,
  onLeaveRoom,
  onSendMessage,
  messages,
  events,
}: ChatRoomProps) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, events]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="chat-room">
      <div className="chat-header">
        <h2>{room.name}</h2>
        <button onClick={onLeaveRoom}>나가기</button>
      </div>

      <div className="chat-users">
        <h3>참여자 목록</h3>
        <div className="users-list">
          {room.users.map((user) => (
            <div key={user.id} className="user-item">
              {user.nickname}
            </div>
          ))}
        </div>
      </div>

      <div className="chat-messages">
        {[...messages, ...events]
          .sort((a, b) => {
            const aTime = "timestamp" in a ? a.timestamp.getTime() : 0;
            const bTime = "timestamp" in b ? b.timestamp.getTime() : 0;
            return aTime - bTime;
          })
          .map((item, index) => (
            <div
              key={index}
              className={"message-item" + ("timestamp" in item ? "" : " event")}
            >
              {"timestamp" in item ? (
                <>
                  <span className="message-user">{item.user.nickname}</span>
                  <span className="message-text">{item.message}</span>
                  <span className="message-time">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </>
              ) : (
                <span className="event-text">{item.message}</span>
              )}
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
