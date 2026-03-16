"use client";

import { cn } from "@/lib/utils";

type StatusLevel = "ia" | "verified" | "expert";

interface StatusBadgeProps {
  level: StatusLevel;
}

const config = {
  ia: {
    emoji: "\uD83D\uDFE0",
    label: "Analyse IA",
    sublabel: "non vérifiée par un avocat",
    bg: "bg-amber-50",
    border: "border-amber-200/60",
    text: "text-amber-800",
    subtext: "text-amber-600",
  },
  verified: {
    emoji: "\uD83D\uDFE2",
    label: "Vérifié par Casalonga",
    sublabel: "",
    bg: "bg-emerald-50",
    border: "border-emerald-200/60",
    text: "text-emerald-800",
    subtext: "text-emerald-600",
  },
  expert: {
    emoji: "\uD83D\uDD35",
    label: "Expertise Casalonga",
    sublabel: "",
    bg: "bg-blue-50",
    border: "border-blue-200/60",
    text: "text-blue-800",
    subtext: "text-blue-600",
  },
};

export default function StatusBadge({ level }: StatusBadgeProps) {
  const c = config[level];
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border px-4 py-2",
        c.bg,
        c.border
      )}
    >
      <span className="text-sm">{c.emoji}</span>
      <div className="flex flex-col">
        <span className={cn("text-xs font-semibold leading-tight", c.text)}>
          {c.label}
        </span>
        {c.sublabel && (
          <span className={cn("text-[10px] leading-tight", c.subtext)}>
            {c.sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
