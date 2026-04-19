import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { HistoryList } from "./history/history-list";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  let generations: {
    id: string;
    repo_name: string;
    pr_url: string | null;
    created_at: string;
  }[] = [];
  let error: string | null = null;

  try {
    const result = await prisma.generation.findMany({
      where: {
        userId: BigInt(session.user.id),
      },
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        repo_name: true,
        pr_url: true,
        created_at: true,
      },
    });

    generations = result.map((gen) => ({
      id: gen.id.toString(),
      repo_name: gen.repo_name,
      pr_url: gen.pr_url,
      created_at: gen.created_at.toISOString(),
    }));
  } catch (err) {
    console.error("Error fetching generations:", err);
    error = "Failed to load history. Please try again.";
  }

  return <HistoryList generations={generations} error={error} />;
}