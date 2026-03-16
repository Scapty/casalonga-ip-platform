"use client";

import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import type { TrademarkAnalysis, SearchInput } from "@/lib/types";
import ScoreRing from "./ScoreRing";
import StatusBadge from "./StatusBadge";
import ConflictCard from "./ConflictCard";
import UpgradePrompt from "./UpgradePrompt";

interface ResultsPanelProps {
  analysis: TrademarkAnalysis;
  searchInput: SearchInput;
  onBack: () => void;
}

export default function ResultsPanel({
  analysis,
  searchInput,
  onBack,
}: ResultsPanelProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted hover:text-navy transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Nouvelle recherche
        </button>
        <StatusBadge level="ia" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
        {/* Left Sidebar */}
        <div className="space-y-6">
          {/* Score Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 text-center"
          >
            <div className="mb-4">
              <ScoreRing score={analysis.overallRiskScore} />
            </div>
            <div className="space-y-1 mb-4">
              <h2 className="text-lg font-semibold text-navy">
                {searchInput.trademarkName}
              </h2>
              <div className="flex items-center justify-center gap-2 text-xs text-muted">
                <span>
                  {searchInput.niceClasses.length === 1
                    ? `Classe ${searchInput.niceClasses[0]}`
                    : `${searchInput.niceClasses.length} classes`}
                </span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>{searchInput.territory}</span>
              </div>
            </div>
            <div className="border-t border-border/30 pt-4">
              <p className="text-xs text-muted leading-relaxed">
                {analysis.summary}
              </p>
            </div>
          </motion.div>

          {/* Recommendation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 space-y-3"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent" />
              <h3 className="text-xs font-semibold text-navy tracking-wide uppercase">
                Recommandation
              </h3>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              {analysis.recommendation}
            </p>
          </motion.div>

          {/* Upgrade */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <UpgradePrompt />
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex items-center justify-between"
          >
            <h2 className="text-sm font-semibold text-navy">
              {analysis.conflicts.length} conflit
              {analysis.conflicts.length > 1 ? "s" : ""} potentiel
              {analysis.conflicts.length > 1 ? "s" : ""} identifié
              {analysis.conflicts.length > 1 ? "s" : ""}
            </h2>
            <span className="text-[10px] text-muted">
              Trié par similarité décroissante
            </span>
          </motion.div>

          <div className="space-y-3">
            {analysis.conflicts.map((conflict, i) => (
              <ConflictCard key={conflict.name} conflict={conflict} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
