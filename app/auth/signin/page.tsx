"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black font-mono">
      <div className="w-full max-w-sm px-6 py-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2">Comito.</h1>
        <p className="text-sm mb-8 opacity-60">Sign in to continue</p>

        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="w-full px-6 py-3 border border-black bg-white text-black font-mono text-sm hover:bg-black hover:text-white transition-colors"
        >
          Sign in with GitHub →
        </button>
      </div>
    </main>
  );
}