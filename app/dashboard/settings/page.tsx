"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

type TabType = "general" | "appearance" | "account";

interface SessionData {
  id: string;
  device: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}

// Mock session data - in production, this would be fetched from an API
const mockSessions: SessionData[] = [
  {
    id: "1",
    device: "Firefox",
    location: "Jakarta, Jakarta, ID",
    created_at: "Feb 21, 2026, 3:44 AM",
    updated_at: "Feb 21, 2026, 3:44 AM",
  },
  {
    id: "2",
    device: "Chrome",
    location: "Bandung, West Java, ID",
    created_at: "Feb 20, 2026, 10:22 AM",
    updated_at: "Feb 20, 2026, 10:22 AM",
  },
];

// Toggle Switch Component
function ToggleSwitch({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        enabled ? "bg-black dark:bg-white" : "bg-zinc-300 dark:bg-zinc-600"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white dark:bg-zinc-900 transition-transform ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// General Tab Content
function GeneralTab({ userName }: { userName: string }) {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-8">
      {/* Profil Section */}
      <div>
        <h2 className="text-sm font-bold mb-4">Profil</h2>
        <div className="flex gap-4">
          {/* Full Name Input */}
          <div className="flex-1">
            <label className="block text-xs text-zinc-500 mb-2">
              Full Name
            </label>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-medium text-zinc-500">
                {userName?.[0]?.toUpperCase() || "U"}
              </div>
              <input
                type="text"
                defaultValue={userName || "John Doe"}
                className="flex-1 px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
              />
            </div>
          </div>

          {/* Nickname Input */}
          <div className="flex-1">
            <label className="block text-xs text-zinc-500 mb-2">
              What should Comito call you?
            </label>
            <input
              type="text"
              defaultValue={userName?.split(" ")[0] || "John"}
              className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-zinc-200 dark:border-zinc-800" />

      {/* Notification Section */}
      <div>
        <h2 className="text-sm font-bold mb-4">Notification</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">Response completions</p>
            <p className="text-xs text-zinc-500 mt-1">
              Get notified when Comito has finished a response. Most useful for
              long-running tasks like tool calls and Research.
            </p>
          </div>
          <ToggleSwitch
            enabled={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>
      </div>
    </div>
  );
}

// Appearance Tab Content
function AppearanceTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-sm font-bold mb-4">Theme</h2>
        <p className="text-sm text-zinc-500">
          Theme customization coming soon...
        </p>
      </div>
    </div>
  );
}

// Account Tab Content
function AccountTab() {
  const { data: session } = useSession();
  const [sessions] = useState<SessionData[]>(mockSessions);

  return (
    <div className="space-y-8">
      {/* Account Section */}
      <div>
        <h2 className="text-sm font-bold mb-4">Account</h2>
        <div className="space-y-4">
          {/* Log Out Row */}
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm">Log out of all devices</p>
              <p className="text-xs text-zinc-500 mt-1">
                Sign out everywhere and reset all sessions
              </p>
            </div>
            <button className="px-4 py-2 text-xs font-medium bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
              Log Out
            </button>
          </div>

          {/* Delete Account Row */}
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm">Delete Account</p>
              <p className="text-xs text-zinc-500 mt-1">
                Permanently delete your account and all data
              </p>
            </div>
            <button className="px-4 py-2 text-xs font-medium border border-zinc-300 dark:border-zinc-600 text-black dark:text-white rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-zinc-200 dark:border-zinc-800" />

      {/* Active Sessions Section */}
      <div>
        <h2 className="text-sm font-bold mb-4">Active sessions</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th className="py-2 px-2 text-left text-xs font-bold text-black dark:text-white">
                Device
              </th>
              <th className="py-2 px-2 text-left text-xs font-bold text-black dark:text-white">
                Location
              </th>
              <th className="py-2 px-2 text-left text-xs font-bold text-black dark:text-white">
                Created
              </th>
              <th className="py-2 px-2 text-left text-xs font-bold text-black dark:text-white">
                Updated
              </th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s) => (
              <tr
                key={s.id}
                className="border-b border-zinc-100 dark:border-zinc-800/50"
              >
                <td className="py-3 px-2 text-sm text-zinc-500">{s.device}</td>
                <td className="py-3 px-2 text-sm text-zinc-500">
                  {s.location}
                </td>
                <td className="py-3 px-2 text-sm text-zinc-500">
                  {s.created_at}
                </td>
                <td className="py-3 px-2 text-sm text-zinc-500">
                  {s.updated_at}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<TabType>("general");

  const tabs = [
    { id: "general" as TabType, label: "General" },
    { id: "appearance" as TabType, label: "Appearance" },
    { id: "account" as TabType, label: "Account" },
  ];

  const userName = session?.user?.name || "John Doe";

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto">
      <div className="flex gap-12">
        {/* Left Column - Navigation */}
        <div className="w-48 flex-shrink-0">
          <h1 className="text-xl font-bold mb-6">Settings</h1>
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "text-black dark:text-white font-medium"
                    : "text-zinc-500 hover:text-black dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Column - Content */}
        <div className="min-h-screen w-full max-w-7xl mx-auto">
          {activeTab === "general" && <GeneralTab userName={userName} />}
          {activeTab === "appearance" && <AppearanceTab />}
          {activeTab === "account" && <AccountTab />}
        </div>
      </div>
    </div>
  );
}
