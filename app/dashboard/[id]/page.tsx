import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import { ArrowLeftIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function GenerationDetailPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const { id } = await params;

  let generation: {
    id: bigint;
    repo_name: string;
    pr_url: string | null;
    input_diff: string | null;
    output: string;
    created_at: Date;
  } | null = null;
  let error: string | null = null;

  try {
    generation = await prisma.generation.findFirst({
      where: {
        id: BigInt(id),
        userId: BigInt(session.user.id),
      },
      select: {
        id: true,
        repo_name: true,
        pr_url: true,
        input_diff: true,
        output: true,
        created_at: true,
      },
    });
  } catch (err) {
    console.error("Error fetching generation:", err);
    error = "Failed to load generation. Please try again.";
  }

  if (error) {
    return (
      <div className="w-full text-center">
        <p className="text-zinc-500 mb-6">{error}</p>
        <Link
          href="/dashboard/history"
          className="px-5 py-2.5 border border-zinc-200 dark:border-zinc-700 text-sm font-medium rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          Back to History
        </Link>
      </div>
    );
  }

  if (!generation) {
    return (
      <div className="w-full text-center">
        <p className="text-zinc-500 mb-6">Generation not found</p>
        <Link
          href="/dashboard/history"
          className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          Back to History
        </Link>
      </div>
    );
  }

  const formattedDate = generation.created_at.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Back Link */}
      <Link
        href="/dashboard/history"
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-black dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to History
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-2">{generation.repo_name}</h1>
        {generation.pr_url ? (
          <a
            href={generation.pr_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 hover:text-black dark:hover:text-white font-mono"
          >
            {generation.pr_url}
          </a>
        ) : (
          <span className="text-sm text-zinc-500">Manual diff input</span>
        )}
        <p className="text-xs text-zinc-400 mt-1">{formattedDate}</p>
      </div>

      {/* Markdown Output */}
      <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700">
          <span className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
            Generated Description
          </span>
          <CopyButton text={generation.output} />
        </div>
        <div className="p-6 max-h-[50vh] overflow-auto bg-white dark:bg-zinc-900">
          <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed text-zinc-700 dark:text-zinc-300">
            {generation.output}
          </pre>
        </div>
      </div>
    </div>
  );
}