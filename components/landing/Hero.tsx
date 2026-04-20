import { HeroRobot } from "@/components/icons";

interface HeroProps {
  darkMode?: boolean;
}

export function Hero({ darkMode = false }: HeroProps) {
  const mutedColor = darkMode ? "text-zinc-400" : "text-zinc-500";

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <HeroRobot className="w-40 h-40 mb-8" />
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Comito
        </h1>
        <p className={`text-lg md:text-xl ${mutedColor} max-w-md mb-8`}>
          No more blank PR descriptions. Paste your diff, get a clear description
          instantly.
        </p>
        <a
          href="/dashboard"
          className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-md text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-2"
        >
          Try Comito
          <span>→</span>
        </a>
      </div>
    </section>
  );
}