"use client";

import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  level: "low" | "medium" | "high";
  size?: "sm" | "md";
}

const config = {
  low: {
    label: "Faible",
    bg: "bg-risk-low/8",
    text: "text-risk-low",
    border: "border-risk-low/20",
    dot: "bg-risk-low",
  },
  medium: {
    label: "Modéré",
    bg: "bg-risk-medium/8",
    text: "text-risk-medium",
    border: "border-risk-medium/20",
    dot: "bg-risk-medium",
  },
  high: {
    label: "Élevé",
    bg: "bg-risk-high/8",
    text: "text-risk-high",
    border: "border-risk-high/20",
    dot: "bg-risk-high",
  },
};

export default function RiskBadge({ level, size = "sm" }: RiskBadgeProps) {
  const c = config[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        c.bg,
        c.text,
        c.border,
        size === "sm" ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs"
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", c.dot)} />
      {c.label}
    </span>
  );
}
