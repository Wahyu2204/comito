"use client";

import { useState } from "react";
import Link from "next/link";
import { HistoryIcon, SearchIcon } from "@/components/icons";

interface Generation {
  id: string;
  repo_name: string;
  pr_url: string | null;
  output: string;
  created_at: string;
}

interface HistoryListProps {
  generations: Generation[];
  error?: string | null;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayName = days[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${dayName}, ${day} ${month} ${year} at ${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
}

function truncateDescription(text: string, maxLength: number = 50): string {
  const cleaned = text.replace(/[#*`]/g, "").trim();
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.substring(0, maxLength) + "...";
}

function extractRepoName(prUrl: string | null, repoName: string): string {
  if (repoName && repoName !== "Unknown Repository") return repoName;
  if (!prUrl) return "Manual Diff";
  try {
    const match = prUrl.match(/github\.com\/([^/]+\/[^/]+)/);
    return match ? match[1] : prUrl;
  } catch {
    return "Unknown Repository";
  }
}

export function HistoryList({ generations, error }: HistoryListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGenerations = generations.filter((gen) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      gen.repo_name.toLowerCase().includes(query) ||
      gen.output.toLowerCase().includes(query) ||
      (gen.pr_url && gen.pr_url.toLowerCase().includes(query))
    );
  });

  if (error) {
    return (
      <div className="w-full">
        <p className="text-zinc-500 mb-6">{error}</p>
        <Link
          href="/dashboard/history"
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          Retry
        </Link>
      </div>
    );
  }

  if (generations.length === 0) {
    return (
      <div className="w-full">
        <p className="text-zinc-500 mb-6">No PR descriptions yet</p>
        <Link
          href="/dashboard/new"
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          Generate New PR
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
            <HistoryIcon className="w-4 h-4" />
            <span>History</span>
            <span className="text-zinc-300">&gt;</span>
          </div>
          {/* Title */}
          <h1 className="text-xl font-bold">List PR yang pernah di-generate</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 placeholder:text-zinc-400 w-48"
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800">
            <th className="py-3 px-4 text-left text-xs font-bold text-black dark:text-white">#</th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black dark:text-white">Repository Name</th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black dark:text-white">Date</th>
            <th className="py-3 px-4 text-left text-xs font-bold text-black dark:text-white">Description</th>
            <th className="py-3 px-4 text-right text-xs font-bold text-black dark:text-white">Detail</th>
          </tr>
        </thead>
        <tbody>
          {filteredGenerations.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-8 text-center text-zinc-500 text-sm">
                No results found for &quot;{searchQuery}&quot;
              </td>
            </tr>
          ) : (
            filteredGenerations.map((gen, index) => (
              <tr
                key={gen.id}
                className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
              >
                <td className="py-4 px-4 text-sm text-zinc-500 font-mono">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="py-4 px-4 text-sm text-zinc-500">
                  {extractRepoName(gen.pr_url, gen.repo_name)}
                </td>
                <td className="py-4 px-4 text-sm text-zinc-500">
                  {formatDate(gen.created_at)}
                </td>
                <td className="py-4 px-4 text-sm text-zinc-500 truncate max-w-[200px]">
                  {truncateDescription(gen.output)}
                </td>
                <td className="py-4 px-4 text-right">
                  <Link
                    href={`/dashboard/${gen.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                  >
                    View
                    <span className="text-xs">→</span>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {filteredGenerations.length > 0 && (
        <p className="mt-4 text-xs text-zinc-400">
          Showing {filteredGenerations.length} of {generations.length} results
        </p>
      )}
    </div>
  );
}