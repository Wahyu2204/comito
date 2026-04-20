"use client";

import { useState } from "react";
import { RobotIcon, SunIcon, MoonIcon } from "@/components/icons";

interface HeaderProps {
  onThemeToggle?: (isDark: boolean) => void;
  initialDarkMode?: boolean;
}

export function Header({ onThemeToggle, initialDarkMode = false }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  const handleToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    onThemeToggle?.(newMode);
  };

  const borderColor = darkMode ? "border-zinc-800" : "border-zinc-200";
  const textColor = darkMode ? "text-white" : "text-black";
  const mutedColor = darkMode ? "text-zinc-400" : "text-zinc-500";

  return (
    <header className={`border-b ${borderColor}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RobotIcon className="w-8 h-8" />
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {["Home", "Developers", "Docs", "Blog"].map((item) => (
            <a
              key={item}
              href="#"
              className={`text-sm hover:opacity-60 transition-opacity ${
                item === "Home" ? textColor : mutedColor
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="/api/auth/signin"
            className={`text-sm ${mutedColor} hover:opacity-60 transition-opacity`}
          >
            Sign In
          </a>
          <button
            onClick={handleToggle}
            className={`p-2 rounded-md border ${borderColor} hover:opacity-60 transition-opacity`}
            aria-label="Toggle theme"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}