import { HomeIcon, FolderIcon, SettingsIcon } from "@/components/icons";

interface ProductMockupProps {
  darkMode?: boolean;
}

export function ProductMockup({ darkMode = false }: ProductMockupProps) {
  const borderColor = darkMode ? "border-zinc-800" : "border-zinc-200";
  const mutedColor = darkMode ? "text-zinc-400" : "text-zinc-500";
  const cardBg = darkMode ? "bg-zinc-950" : "bg-zinc-50";

  const navItems = [
    { icon: <HomeIcon />, label: "Dashboard" },
    { icon: <FolderIcon />, label: "Repositories" },
    { icon: <SettingsIcon />, label: "Settings" },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          <div
            className={`absolute top-4 left-4 right-4 h-[500px] border ${borderColor} rounded-lg ${cardBg} opacity-50`}
          />
          <div
            className={`absolute top-2 left-2 right-2 h-[500px] border ${borderColor} rounded-lg ${cardBg} opacity-70`}
          />
          <div
            className={`relative border ${borderColor} rounded-lg ${cardBg} overflow-hidden`}
          >
            <div className="flex h-[500px]">
              <div className={`w-64 border-r ${borderColor} p-4 flex flex-col`}>
                <div className="mb-6">
                  <p className={`text-sm ${mutedColor}`}>Good Night,</p>
                  <p className="font-medium">John Doe</p>
                </div>

                <nav className="space-y-2">
                  {navItems.map((item, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                        idx === 0
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : `${mutedColor} hover:opacity-60`
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <div
                    className={`w-8 h-8 rounded-full border-2 ${borderColor} flex items-center justify-center text-xs`}
                  >
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className={`text-xs ${mutedColor}`}>john@email.com</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-6 flex flex-col">
                <h2 className="text-lg font-medium mb-4">
                  Generate PR Description
                </h2>

                <div className="flex-1 flex flex-col">
                  <div
                    className={`flex-1 border ${borderColor} rounded-md p-4 bg-black dark:bg-zinc-900`}
                  >
                    <p className={`text-sm ${mutedColor}`}>
                      <span className="text-zinc-500">
                        Paste your PR diff or git diff here...
                      </span>
                    </p>
                    <p className={`mt-2 text-xs text-zinc-600`}>
                      diff --git a/src/app.tsx b/src/app.tsx
                    </p>
                    <p className={`text-xs text-green-600`}>
                      + const newFeature = true;
                    </p>
                    <p className={`text-xs text-red-600`}>
                      - const oldCode = false;
                    </p>
                  </div>

                  <button className="mt-4 px-4 py-2 bg-white text-black dark:bg-black dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-md text-sm font-medium hover:opacity-80 transition-opacity">
                    Parse & Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}