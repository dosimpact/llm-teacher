import { useState } from "react";

interface NicknameFormProps {
  onSubmit: (nickname: string) => void;
}

export function NicknameForm({ onSubmit }: NicknameFormProps) {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim().length < 2) {
      setError("닉네임은 2글자 이상이어야 합니다.");
      return;
    }
    onSubmit(nickname);
  };

  return (
    <div className="nickname-form">
      <h1>채팅 참여하기</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setError("");
            }}
            placeholder="닉네임을 입력하세요"
            autoFocus
          />
          {error && <div className="error-message">{error}</div>}
        </div>
        <button type="submit" disabled={!nickname.trim()}>
          시작하기
        </button>
      </form>
    </div>
  );
}
