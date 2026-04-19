"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const dynamic = "force-dynamic";

const navItems = [
  { href: "/dashboard/new", label: "+ New PR" },
  { href: "/dashboard/history", label: "History" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex font-mono bg-white text-black">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-16 flex flex-col items-center py-4 border-r border-black/10 bg-white z-50">
        {/* Logo */}
        <Link href="/dashboard" className="text-lg font-bold mb-8">
          C.
        </Link>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-12 h-12 flex items-center justify-center text-xs transition-colors ${
                  isActive
                    ? "bg-black text-white"
                    : "text-black/60 hover:text-black hover:bg-black/5"
                }`}
                title={item.label}
              >
                {item.label === "+ New PR" ? "+" : item.label[0]}
              </Link>
            );
          })}
        </nav>

        {/* User Avatar */}
        {session?.user && (
          <div className="mt-auto flex flex-col items-center gap-1">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-8 h-8 rounded-full border border-black/10"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-xs">
                {session.user.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            <span className="text-[10px] text-black/60 max-w-14 truncate">
              {session.user.name?.split(" ")[0] || "User"}
            </span>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-16 min-h-screen">{children}</main>
    </div>
  );
}