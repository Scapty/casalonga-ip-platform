"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, CornerDownRight } from "lucide-react";
import type { PatentClaim } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ClaimCardProps {
  claim: PatentClaim;
  index: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  method: "bg-blue-50 text-blue-700 border-blue-200/60",
  device: "bg-purple-50 text-purple-700 border-purple-200/60",
  system: "bg-teal-50 text-teal-700 border-teal-200/60",
  composition: "bg-orange-50 text-orange-700 border-orange-200/60",
  use: "bg-rose-50 text-rose-700 border-rose-200/60",
  computer_program: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
  product_by_process: "bg-amber-50 text-amber-700 border-amber-200/60",
};

function highlightCharacterise(text: string) {
  // Bold the "caractérisé en ce que" / "characterized in that" transition
  const patterns = [
    /caractérisé en ce que/gi,
    /caractérisé par/gi,
    /characterized in that/gi,
    /wherein the improvement comprises/gi,
    /comprising:/gi,
  ];

  let result = text;
  for (const pattern of patterns) {
    result = result.replace(
      pattern,
      (match) => `<strong class="text-navy font-semibold">${match}</strong>`
    );
  }
  return result;
}

export default function ClaimCard({ claim, index }: ClaimCardProps) {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 * index }}
      className={cn(
        "glass-card rounded-xl p-5 hover:shadow-lg hover:shadow-navy/5 transition-all duration-300",
        claim.type === "independent" && "border-l-2 border-l-navy"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3 flex-wrap">
        <span className="text-sm font-semibold text-navy">
          Revendication {claim.number}
        </span>

        {/* Independent/Dependent badge */}
        <span
          className={cn(
            "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border",
            claim.type === "independent"
              ? "bg-navy/5 text-navy border-navy/15"
              : "bg-gray-50 text-gray-500 border-gray-200/60"
          )}
        >
          {claim.type === "independent" ? "Indépendante" : "Dépendante"}
        </span>

        {/* Category badge */}
        <span
          className={cn(
            "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border",
            CATEGORY_COLORS[claim.category] || "bg-gray-50 text-gray-500 border-gray-200/60"
          )}
        >
          {claim.categoryLabel}
        </span>
      </div>

      {/* Depends on */}
      {claim.dependsOn && claim.dependsOn.length > 0 && (
        <div className="flex items-center gap-1.5 mb-3 text-[11px] text-muted">
          <CornerDownRight className="w-3 h-3" />
          dépend de la revendication {claim.dependsOn.join(", ")}
        </div>
      )}

      {/* Claim text */}
      <div
        className="text-sm text-text leading-relaxed whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: highlightCharacterise(claim.text) }}
      />

      {/* Strategic notes toggle */}
      {claim.strategicNotes && (
        <div className="mt-4 border-t border-border/30 pt-3">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="flex items-center gap-1.5 text-[11px] text-accent font-medium hover:text-navy transition-colors"
          >
            <ChevronDown
              className={`w-3 h-3 transition-transform ${showNotes ? "rotate-180" : ""}`}
            />
            Notes stratégiques
          </button>
          {showNotes && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 text-xs text-muted italic leading-relaxed"
            >
              {claim.strategicNotes}
            </motion.p>
          )}
        </div>
      )}
    </motion.div>
  );
}
