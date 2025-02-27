export interface User {
  id: string;
  nickname: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  users: User[];
}

export interface ChatMessage {
  user: User;
  message: string;
  timestamp: Date;
}

export interface UserEvent {
  user: User;
  message: string;
}
