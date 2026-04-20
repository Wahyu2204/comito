import { RobotIcon, ArrowLeftIcon } from "@/components/icons";
import { GitHubSignInButton } from "@/components/auth/GitHubSignInButton";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white font-mono flex flex-col">
      {/* Back Link */}
      <div className="p-6">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-black hover:opacity-60 transition-opacity"
        >
          <ArrowLeftIcon />
          Back to Home
        </a>
      </div>

      {/* Centered Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="flex flex-col items-center text-center">
          <RobotIcon className="w-16 h-16 mb-8" />

          <GitHubSignInButton />

          <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400 max-w-xs">
            By continuing, you agree to our{" "}
            <a
              href="/terms"
              className="underline hover:opacity-60 transition-opacity"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline hover:opacity-60 transition-opacity"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}