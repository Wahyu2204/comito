"use client";

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { generatePRDescription } from "@/actions/generate-pr";

export const dynamic = "force-dynamic";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function NewPRPage() {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  const [prUrl, setPrUrl] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const firstName = session?.user?.name?.split(" ")[0] || "there";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setOutput(null);

    startTransition(async () => {
      const result = await generatePRDescription(prUrl);

      if (result.success && result.data) {
        setOutput(result.data);
      } else {
        setError(result.error || "An error occurred");
      }
    });
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRegenerate = () => {
    if (prUrl.trim()) {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    }
  };

  return (
    <div className="min-h-screen p-8">
      {/* Greeting */}
      <h1 className="text-2xl font-bold mb-8">
        {getGreeting()}, {firstName}
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={prUrl}
            onChange={(e) => setPrUrl(e.target.value)}
            placeholder="github.com/user/repo/pull/123"
            disabled={isPending}
            className="flex-1 px-4 py-3 border border-black/20 text-sm focus:outline-none focus:border-black bg-white disabled:bg-black/5 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!prUrl.trim() || isPending}
            className={`px-6 py-3 text-sm font-medium transition-colors min-w-[140px] ${
              prUrl.trim() && !isPending
                ? "bg-black text-white hover:bg-black/80"
                : "bg-black/10 text-black/40 cursor-not-allowed"
            }`}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Generating...
              </span>
            ) : (
              "Fetch & Generate"
            )}
          </button>
        </div>

        {/* Help text */}
        <p className="text-xs text-black/40">
          Enter a GitHub PR URL. We&apos;ll fetch the diff and generate a professional description.
        </p>
      </form>

      {/* Error Display */}
      {error && (
        <div className="mt-6 p-4 border border-red-500/30 bg-red-50 text-red-700 text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Output Display */}
      {output && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-black/60 uppercase tracking-wide">
              Generated PR Description
            </span>
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="text-xs text-black/60 hover:text-black transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleRegenerate}
                disabled={isPending}
                className="text-xs text-black/60 hover:text-black transition-colors disabled:opacity-50"
              >
                Regenerate
              </button>
            </div>
          </div>

          <div className="border border-black/20 p-6 bg-black/2 max-h-[500px] overflow-auto">
            <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed">
              {output}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}