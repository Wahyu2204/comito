"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HistoryIcon, SettingsIcon, PlusIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

const navItems = [
  { href: "/dashboard/new", label: "New PR", icon: PlusIcon },
  { href: "/dashboard/history", label: "History", icon: HistoryIcon },
  { href: "/dashboard/settings", label: "Settings", icon: SettingsIcon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex font-mono bg-white dark:bg-zinc-950 text-black dark:text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-56 flex flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 z-50">
        {/* Logo */}
        <Link href="/dashboard" className="px-6 py-6 text-xl font-bold tracking-tight">
          Comito
        </Link>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                      isActive
                        ? "bg-zinc-100 dark:bg-zinc-800 font-medium"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        {session?.user && (
          <div className="px-4 py-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-8 h-8 rounded-full ring-1 ring-zinc-200 dark:ring-zinc-700"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-medium">
                  {session.user.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              <span className="text-sm font-medium truncate max-w-[120px]">
                {session.user.name?.split(" ")[0] || "User"}
              </span>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-56 min-h-screen w-full p-8 md:p-10 flex flex-col items-start justify-center">
        {children}
      </main>
    </div>
  );
}