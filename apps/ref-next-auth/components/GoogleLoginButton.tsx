"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function GoogleLoginButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
    >
      <Image src="/google.svg" alt="Google 로고" width={20} height={20} />
      <span>Google로 계속하기</span>
    </button>
  );
}
