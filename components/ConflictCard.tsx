"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, Tag, Globe, Brain, Hash } from "lucide-react";
import type { TrademarkConflict } from "@/lib/types";
import RiskBadge from "./RiskBadge";
import { cn } from "@/lib/utils";

interface ConflictCardProps {
  conflict: TrademarkConflict;
  index: number;
}

function SimilarityBar({
  label,
  value,
  delay,
}: {
  label: string;
  value: number;
  delay: number;
}) {
  const color =
    value < 30
      ? "bg-risk-low"
      : value < 70
        ? "bg-risk-medium"
        : "bg-risk-high";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted font-medium">{label}</span>
        <span className="text-[11px] font-semibold tabular-nums text-text">
          {value}%
        </span>
      </div>
      <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay }}
        />
      </div>
    </div>
  );
}

function SourceBadge({ source }: { source: "web_search" | "knowledge" }) {
  const isWebSearch = source === "web_search";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border",
        isWebSearch
          ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
          : "bg-gray-50 text-gray-500 border-gray-200/60"
      )}
    >
      {isWebSearch ? (
        <Globe className="w-2.5 h-2.5" />
      ) : (
        <Brain className="w-2.5 h-2.5" />
      )}
      {isWebSearch ? "Registre public" : "Connaissance IA"}
    </span>
  );
}

export default function ConflictCard({ conflict, index }: ConflictCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 * index }}
      className="glass-card rounded-xl p-5 hover:shadow-lg hover:shadow-navy/5 transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
            <h3 className="text-base font-semibold text-navy truncate">
              {conflict.name}
            </h3>
            <RiskBadge level={conflict.riskLevel} />
            {conflict.source && <SourceBadge source={conflict.source} />}
          </div>
          <div className="flex items-center gap-4 text-[11px] text-muted flex-wrap">
            <span className="flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              {conflict.owner}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              Classe {conflict.niceClass}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {conflict.territory}
            </span>
            {conflict.registrationNumber && (
              <span className="flex items-center gap-1 text-accent">
                <Hash className="w-3 h-3" />
                {conflict.registrationNumber}
              </span>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 ml-4">
          <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center border border-border/40">
            <span
              className="text-lg font-semibold tabular-nums"
              style={{
                color:
                  conflict.overallSimilarity < 30
                    ? "var(--color-risk-low)"
                    : conflict.overallSimilarity < 70
                      ? "var(--color-risk-medium)"
                      : "var(--color-risk-high)",
              }}
            >
              {conflict.overallSimilarity}
            </span>
          </div>
        </div>
      </div>

      {/* Similarity Bars */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <SimilarityBar
          label="Phonétique"
          value={conflict.similarityScores.phonetic}
          delay={0.2 + index * 0.1}
        />
        <SimilarityBar
          label="Visuelle"
          value={conflict.similarityScores.visual}
          delay={0.3 + index * 0.1}
        />
        <SimilarityBar
          label="Conceptuelle"
          value={conflict.similarityScores.conceptual}
          delay={0.4 + index * 0.1}
        />
      </div>

      {/* Analysis */}
      <p className="text-xs text-muted leading-relaxed border-t border-border/30 pt-3">
        {conflict.analysis}
      </p>
    </motion.div>
  );
}
