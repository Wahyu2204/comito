import Link from "next/link";

interface Generation {
  id: string;
  repo_name: string;
  pr_url: string | null;
  created_at: string;
}

interface HistoryListProps {
  generations: Generation[];
  error?: string | null;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function truncateUrl(url: string | null, maxLength: number = 40): string {
  if (!url) return "Manual diff";
  if (url.length <= maxLength) return url;
  return url.substring(0, maxLength) + "...";
}

export function HistoryList({ generations, error }: HistoryListProps) {
  if (error) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-8">History</h1>
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-black/60 mb-6">{error}</p>
          <Link
            href="/dashboard"
            className="px-6 py-3 border border-black/20 text-sm font-medium hover:bg-black/5 transition-colors"
          >
            Retry
          </Link>
        </div>
      </div>
    );
  }

  if (generations.length === 0) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-8">History</h1>
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-black/60 mb-6">No PR descriptions yet</p>
          <Link
            href="/dashboard/new"
            className="px-6 py-3 bg-black text-white text-sm font-medium hover:bg-black/80 transition-colors"
          >
            Generate New PR
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8">History</h1>

      <div className="border border-black/10">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-black/5 text-xs font-medium text-black/60 uppercase tracking-wide border-b border-black/10">
          <div className="col-span-5">Repository</div>
          <div className="col-span-4">PR URL</div>
          <div className="col-span-2">Created</div>
          <div className="col-span-1"></div>
        </div>

        {/* Rows */}
        {generations.map((gen) => (
          <div
            key={gen.id}
            className="grid grid-cols-12 gap-4 px-4 py-3 items-center border-b border-black/5 last:border-b-0 hover:bg-black/2 transition-colors"
          >
            <div className="col-span-5 text-sm font-medium truncate">
              {gen.repo_name}
            </div>
            <div className="col-span-4 text-sm text-black/60 truncate font-mono">
              {truncateUrl(gen.pr_url)}
            </div>
            <div className="col-span-2 text-sm text-black/60">
              {formatDate(gen.created_at)}
            </div>
            <div className="col-span-1 text-right">
              <Link
                href={`/dashboard/${gen.id}`}
                className="text-xs px-3 py-1 border border-black/20 hover:bg-black hover:text-white transition-colors inline-block"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}