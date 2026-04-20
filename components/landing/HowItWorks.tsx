import { DeveloperIcon, GitIcon, BrainIcon, MarkdownIcon } from "@/components/icons";

interface HowItWorksProps {
  darkMode?: boolean;
}

const steps = [
  {
    icon: <GitIcon />,
    title: "Paste your diff",
    description: "Drop in your git diff or GitHub PR URL. We handle the parsing.",
    tags: ["git diff", "GitHub URL"],
  },
  {
    icon: <BrainIcon />,
    title: "AI Reads the Code",
    description:
      "Our AI analyzes changes, understands context, and identifies key modifications.",
    tags: ["Llama-3.3", "Groq API"],
  },
  {
    icon: <MarkdownIcon />,
    title: "Get your description",
    description:
      "Receive a clean, formatted PR description ready to copy and paste.",
    tags: ["Markdown", "Copy"],
  },
];

export function HowItWorks({ darkMode = false }: HowItWorksProps) {
  const borderColor = darkMode ? "border-zinc-800" : "border-zinc-200";
  const mutedColor = darkMode ? "text-zinc-400" : "text-zinc-500";

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center mb-12">
          <DeveloperIcon className="w-32 h-32" />
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-2">How It Works</h2>
          <p className={mutedColor}>Three steps. No fluff.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="flex justify-center mb-4">
                <div
                  className={`w-12 h-12 rounded-full border-2 ${borderColor} flex items-center justify-center`}
                >
                  {step.icon}
                </div>
              </div>
              <div
                className={`w-8 h-8 rounded-full border ${borderColor} flex items-center justify-center mx-auto mb-4 text-sm font-medium`}
              >
                {idx + 1}
              </div>
              <h3 className="font-medium mb-2">{step.title}</h3>
              <p className={`text-sm ${mutedColor} mb-4`}>{step.description}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2 py-1 border ${borderColor} rounded`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block relative mt-8">
          <div
            className={`absolute top-0 left-1/6 right-1/6 border-t ${borderColor}`}
          />
        </div>
      </div>
    </section>
  );
}