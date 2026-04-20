"use client";

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { generatePRDescription } from "@/actions/generate-pr";
import { SparklesIcon, CopyIcon } from "@/components/icons";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function NewPRPage() {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  const [inputType, setInputType] = useState<"url" | "diff">("url");
  const [prUrl, setPrUrl] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isGenerated = output !== null;
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

  const handleReset = () => {
    setOutput(null);
    setPrUrl("");
    setError(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Pill Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-full border border-zinc-200 dark:border-zinc-700 p-1">
          <button
            onClick={() => setInputType("url")}
            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
              inputType === "url"
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "text-zinc-500 hover:text-black dark:hover:text-white"
            }`}
          >
            PR URL
          </button>
          <button
            onClick={() => setInputType("diff")}
            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
              inputType === "diff"
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "text-zinc-500 hover:text-black dark:hover:text-white"
            }`}
          >
            Paste Diff
          </button>
        </div>
      </div>

      {/* Greeting */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <SparklesIcon className="w-6 h-6 text-zinc-400" />
        <h1 className="text-lg font-medium">
          {getGreeting()}, {firstName}
        </h1>
      </div>

      {/* Main Container */}
      <div className="relative bg-zinc-100 dark:bg-zinc-900 rounded-2xl min-h-[400px]">
        {!isGenerated ? (
          /* INPUT STATE */
          <form onSubmit={handleSubmit} className="p-8 h-full flex flex-col">
            {/* Text Input Area */}
            <div className="flex-1">
              {inputType === "url" ? (
                <input
                  type="text"
                  value={prUrl}
                  onChange={(e) => setPrUrl(e.target.value)}
                  placeholder='Paste your link GitHub to here "github.com/user/repo/pull/123"'
                  disabled={isPending}
                  className="w-full bg-transparent text-sm placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none disabled:cursor-not-allowed"
                />
              ) : (
                <textarea
                  value={prUrl}
                  onChange={(e) => setPrUrl(e.target.value)}
                  placeholder="Paste your diff content here..."
                  disabled={isPending}
                  rows={10}
                  className="w-full bg-transparent text-sm placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none resize-none disabled:cursor-not-allowed"
                />
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button - Bottom Right */}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={!prUrl.trim() || isPending}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  prUrl.trim() && !isPending
                    ? "bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200"
                    : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-500 cursor-not-allowed"
                }`}
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
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
                  "Fetch & Generate →"
                )}
              </button>
            </div>
          </form>
        ) : (
          /* OUTPUT STATE */
          <div className="h-full flex flex-col">
            {/* Two Columns */}
            <div className="flex flex-1">
              {/* Left Column - INPUT */}
              <div className="flex-1 p-6 border-r border-zinc-200 dark:border-zinc-700">
                <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                  INPUT
                </span>
                <button
                  onClick={handleReset}
                  className="mt-4 text-xs text-zinc-500 hover:text-black dark:hover:text-white underline"
                >
                  Change URL
                </button>
                <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300 font-mono break-all">
                  {prUrl}
                </p>
              </div>

              {/* Right Column - OUTPUT */}
              <div className="flex-1 p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                    OUTPUT
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    title="Copy to clipboard"
                  >
                    <CopyIcon className="w-4 h-4 text-zinc-500" />
                  </button>
                </div>
                <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed text-zinc-700 dark:text-zinc-300 max-h-[280px] overflow-auto">
                  {output}
                </pre>
                {copied && (
                  <span className="absolute top-1 right-8 text-xs text-zinc-400">
                    Copied!
                  </span>
                )}
              </div>
            </div>

            {/* Regenerate Button - Bottom Center */}
            <div className="flex justify-center pb-6">
              <button
                onClick={handleRegenerate}
                disabled={isPending}
                className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-lg transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
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
                    Regenerating...
                  </span>
                ) : (
                  "Regenerate →"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}