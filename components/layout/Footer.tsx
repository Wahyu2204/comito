import { RobotIcon } from "@/components/icons";

interface FooterProps {
  darkMode?: boolean;
}

export function Footer({ darkMode = false }: FooterProps) {
  const borderColor = darkMode ? "border-zinc-800" : "border-zinc-200";
  const mutedColor = darkMode ? "text-zinc-400" : "text-zinc-500";

  return (
    <footer className={`border-t ${borderColor} py-12 px-6`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <RobotIcon className="w-6 h-6" />
            <span className="font-medium">Comito</span>
          </div>
        </div>

        <nav className="flex justify-center gap-8 mb-8">
          {["About", "Privacy", "Terms", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className={`text-sm ${mutedColor} hover:opacity-60 transition-opacity`}
            >
              {item}
            </a>
          ))}
        </nav>

        <p className={`text-center text-sm ${mutedColor}`}>
          © Built with ❤️ by a Wahyu.
        </p>
      </div>
    </footer>
  );
}