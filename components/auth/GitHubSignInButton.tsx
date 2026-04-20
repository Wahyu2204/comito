"use client";

import { signIn } from "next-auth/react";
import { GitHubIcon } from "@/components/icons";

interface GitHubSignInButtonProps {
  callbackUrl?: string;
}

export function GitHubSignInButton({
  callbackUrl = "/dashboard",
}: GitHubSignInButtonProps) {
  const handleSignIn = () => {
    signIn("github", { callbackUrl });
  };

  return (
    <button
      onClick={handleSignIn}
      className="px-6 py-3 bg-black text-white rounded-md text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-3"
    >
      <GitHubIcon className="w-5 h-5" />
      Sign in with GitHub
    </button>
  );
}