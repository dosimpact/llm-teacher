"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p>안녕하세요, {session.user?.name}님!</p>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
    >
      Google로 로그인
    </button>
  );
}
