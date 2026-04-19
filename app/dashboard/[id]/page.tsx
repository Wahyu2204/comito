import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";

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
      <div className="min-h-screen p-8">
        <Link
          href="/dashboard"
          className="text-sm text-black/60 hover:text-black mb-6 inline-block"
        >
          ← Back to Dashboard
        </Link>
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-black/60 mb-6">{error}</p>
          <Link
            href="/dashboard"
            className="px-6 py-3 border border-black/20 text-sm font-medium hover:bg-black/5 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!generation) {
    return (
      <div className="min-h-screen p-8">
        <Link
          href="/dashboard"
          className="text-sm text-black/60 hover:text-black mb-6 inline-block"
        >
          ← Back to Dashboard
        </Link>
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-black/60 mb-6">Generation not found</p>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-black text-white text-sm font-medium hover:bg-black/80 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
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
    <div className="min-h-screen p-8">
      <Link
        href="/dashboard"
        className="text-sm text-black/60 hover:text-black mb-6 inline-block"
      >
        ← Back to Dashboard
      </Link>

      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{generation.repo_name}</h1>
          {generation.pr_url ? (
            <a
              href={generation.pr_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-black/60 hover:text-black font-mono"
            >
              {generation.pr_url}
            </a>
          ) : (
            <span className="text-sm text-black/60">Manual diff input</span>
          )}
          <p className="text-xs text-black/40 mt-1">{formattedDate}</p>
        </div>

        {/* Markdown Output */}
        <div className="border border-black/10">
          <div className="flex items-center justify-between px-4 py-3 bg-black/5 border-b border-black/10">
            <span className="text-xs font-medium text-black/60 uppercase tracking-wide">
              Generated Description
            </span>
            <CopyButton text={generation.output} />
          </div>
          <div className="p-6 max-h-[60vh] overflow-auto">
            <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed">
              {generation.output}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}