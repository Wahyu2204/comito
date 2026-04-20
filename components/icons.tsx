interface IconProps {
  className?: string;
}

export const RobotIcon = ({ className = "w-8 h-8" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="8" y="12" width="24" height="20" rx="3" />
    <circle cx="15" cy="20" r="2" />
    <circle cx="25" cy="20" r="2" />
    <path d="M16 26 Q20 29 24 26" />
    <line x1="20" y1="4" x2="20" y2="12" />
    <circle cx="20" cy="4" r="2" />
    <line x1="4" y1="18" x2="8" y2="18" />
    <line x1="32" y1="18" x2="36" y2="18" />
    <path d="M12 32 L12 36 M28 32 L28 36" />
  </svg>
);

export const SunIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

export const MoonIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const HeroRobot = ({ className = "w-48 h-48" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 200 200"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="50" y="30" width="100" height="80" rx="10" />
    <circle cx="80" cy="65" r="8" />
    <circle cx="120" cy="65" r="8" />
    <circle cx="80" cy="65" r="3" fill="currentColor" />
    <circle cx="120" cy="65" r="3" fill="currentColor" />
    <path d="M75 90 Q100 105 125 90" />
    <line x1="100" y1="10" x2="100" y2="30" />
    <circle cx="100" cy="10" r="5" />
    <rect x="60" y="115" width="80" height="50" rx="5" />
    <line x1="60" y1="130" x2="30" y2="140" />
    <line x1="30" y1="140" x2="25" y2="160" />
    <line x1="140" y1="130" x2="170" y2="140" />
    <line x1="170" y1="140" x2="175" y2="160" />
    <line x1="80" y1="165" x2="80" y2="190" />
    <line x1="120" y1="165" x2="120" y2="190" />
    <path d="M150 25 L180 25 L180 50 L165 50 L155 60 L155 50 L150 50 Z" />
    <text x="155" y="40" fontSize="10" fill="currentColor" stroke="none">
      {"</>"}
    </text>
  </svg>
);

export const DeveloperIcon = ({ className = "w-32 h-32" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 160 160"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="80" cy="35" r="20" />
    <path d="M55 55 L50 100 L110 100 L105 55" />
    <rect x="30" y="100" width="100" height="8" rx="2" />
    <rect x="40" y="108" width="80" height="45" rx="3" />
    <line x1="50" y1="120" x2="110" y2="120" />
    <line x1="50" y1="130" x2="95" y2="130" />
    <line x1="50" y1="140" x2="80" y2="140" />
    <path d="M55 70 L35 90 L35 100" />
    <path d="M105 70 L125 90 L125 100" />
  </svg>
);

export const GitIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="12" cy="12" r="3" />
    <circle cx="19" cy="5" r="2" />
    <circle cx="5" cy="19" r="2" />
    <line x1="14.5" y1="9.5" x2="17.5" y2="6.5" />
    <line x1="9.5" y1="14.5" x2="6.5" y2="17.5" />
  </svg>
);

export const BrainIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M12 2C8 2 5 5 5 9c0 2 1 3 2 4l-1 4h12l-1-4c1-1 2-2 2-4 0-4-3-7-7-7z" />
    <path d="M9 8h6M9 11h4" />
    <line x1="12" y1="17" x2="12" y2="22" />
  </svg>
);

export const MarkdownIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M5 16V8l3 4 3-4v8" />
    <path d="M16 8v8M16 8l2 3M16 8l-2 3" />
  </svg>
);

export const HomeIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M3 12l9-9 9 9" />
    <path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" />
  </svg>
);

export const FolderIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
  </svg>
);

export const SettingsIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

export const GitHubIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export const ArrowLeftIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export const HistoryIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const CopyIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

export const PlusIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const SparklesIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

export const SearchIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);