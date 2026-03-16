"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Target,
  Lightbulb,
  Copy,
  Check,
  ChevronDown,
  Globe,
  Brain,
  Shield,
  AlertTriangle,
  Layers,
  Sparkles,
  X,
  CheckCircle2,
} from "lucide-react";
import type { ClaimsAnalysis, ClaimsInput } from "@/lib/types";
import ClaimCard from "./ClaimCard";
import StatusBadge from "./StatusBadge";
import { cn } from "@/lib/utils";

interface ClaimsResultsPanelProps {
  analysis: ClaimsAnalysis;
  input: ClaimsInput;
  onBack: () => void;
}

export default function ClaimsResultsPanel({
  analysis,
  input,
  onBack,
}: ClaimsResultsPanelProps) {
  const [copied, setCopied] = useState(false);
  const [strategyOpen, setStrategyOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCopyAll = async () => {
    const claimsText = analysis.claims
      .map((c) => `${c.number}. ${c.text}`)
      .join("\n\n");
    await navigator.clipboard.writeText(claimsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const independentCount = analysis.claims.filter((c) => c.type === "independent").length;
  const dependentCount = analysis.claims.filter((c) => c.type === "dependent").length;

  return (
    <div className="w-full max-w-7xl mx-auto">
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
          Nouvelle analyse
        </button>
        <StatusBadge level="ia" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
        {/* ===== LEFT SIDEBAR ===== */}
        <div className="space-y-5">
          {/* Invention Title Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold text-navy mb-2">
              {analysis.inventionTitle}
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-muted mb-3">
              <span className="px-2 py-0.5 rounded bg-accent/10 text-accent font-medium">
                {analysis.technicalField}
              </span>
              <span className="px-2 py-0.5 rounded bg-navy/5 text-navy font-medium">
                {input.targetOffice}
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-muted pt-3 border-t border-border/30">
              <span>{analysis.claims.length} revendications</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>{independentCount} indép.</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>{dependentCount} dép.</span>
            </div>
          </motion.div>

          {/* Closest Prior Art */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card rounded-2xl p-6 space-y-3"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" />
              <h3 className="text-xs font-semibold text-navy tracking-wide uppercase">
                Art antérieur le plus proche
              </h3>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-navy">
                {analysis.closestPriorArt.reference}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border",
                  analysis.closestPriorArt.source === "web_search"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                    : "bg-gray-50 text-gray-500 border-gray-200/60"
                )}
              >
                {analysis.closestPriorArt.source === "web_search" ? (
                  <Globe className="w-2.5 h-2.5" />
                ) : (
                  <Brain className="w-2.5 h-2.5" />
                )}
                {analysis.closestPriorArt.source === "web_search"
                  ? "Recherche web"
                  : "Connaissance IA"}
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              {analysis.closestPriorArt.summary}
            </p>
          </motion.div>

          {/* Objective Technical Problem */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 space-y-3"
          >
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-accent" />
              <h3 className="text-xs font-semibold text-navy tracking-wide uppercase">
                Problème technique objectif
              </h3>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              {analysis.objectiveTechnicalProblem}
            </p>
          </motion.div>

          {/* Distinguishing Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-card rounded-2xl p-6 space-y-3"
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-gold" />
              <h3 className="text-xs font-semibold text-navy tracking-wide uppercase">
                Caractéristiques distinctives
              </h3>
            </div>
            <div className="space-y-3">
              {analysis.distinguishingFeatures.map((f, i) => (
                <div key={i} className="border-l-2 border-gold/30 pl-3">
                  <p className="text-xs font-medium text-navy">{f.feature}</p>
                  <p className="text-[11px] text-muted mt-0.5">
                    Effet : {f.technicalEffect}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Claim Strategy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6 space-y-3"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-accent" />
              <h3 className="text-xs font-semibold text-navy tracking-wide uppercase">
                Stratégie de revendication
              </h3>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              {analysis.claimStrategy}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="glass-card rounded-xl p-6 space-y-4"
          >
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-navy">
                Aller plus loin avec Casalonga
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Ce premier jet IA nécessite une validation par un CPI qualifié.
              </p>
            </div>
            <div className="space-y-2.5">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-emerald-200/60 bg-emerald-50/50 hover:bg-emerald-50 transition-colors text-left"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-xs font-semibold text-emerald-800 block">
                    Vérification CPI Casalonga
                  </span>
                  <span className="text-[10px] text-emerald-600">
                    Un CPI vérifie et affine vos revendications
                  </span>
                </div>
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-blue-200/60 bg-blue-50/50 hover:bg-blue-50 transition-colors text-left"
              >
                <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-xs font-semibold text-blue-800 block">
                    Rédaction complète par un expert
                  </span>
                  <span className="text-[10px] text-blue-600">
                    Rédaction professionnelle du brevet complet
                  </span>
                </div>
              </button>
            </div>
          </motion.div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="space-y-5">
          {/* Actions bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex items-center justify-between"
          >
            <h2 className="text-sm font-semibold text-navy">
              {analysis.claims.length} revendications générées
            </h2>
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/50 bg-white text-xs font-medium text-muted hover:text-navy hover:border-navy/20 transition-all"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-risk-low" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? "Copié" : "Copier tout"}
            </button>
          </motion.div>

          {/* Claims List */}
          <div className="space-y-3">
            {analysis.claims.map((claim, i) => (
              <ClaimCard key={claim.number} claim={claim} index={i} />
            ))}
          </div>

          {/* Abstract */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-xl p-6 space-y-3"
          >
            <h3 className="text-xs font-semibold text-navy tracking-wide uppercase">
              Abrégé suggéré
            </h3>
            <p className="text-sm text-text leading-relaxed">
              {analysis.abstract}
            </p>
          </motion.div>

          {/* Global Strategy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="glass-card rounded-xl p-6 space-y-4"
          >
            <button
              onClick={() => setStrategyOpen(!strategyOpen)}
              className="flex items-center justify-between w-full"
            >
              <h3 className="text-xs font-semibold text-navy tracking-wide uppercase">
                Stratégie globale
              </h3>
              <ChevronDown
                className={`w-4 h-4 text-muted transition-transform ${strategyOpen ? "rotate-180" : ""}`}
              />
            </button>

            {strategyOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-5"
              >
                {/* Scope */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-navy">
                    <Shield className="w-3.5 h-3.5 text-accent" />
                    Portée de protection
                  </div>
                  <p className="text-xs text-muted leading-relaxed pl-5">
                    {analysis.globalStrategyNotes.scopeAssessment}
                  </p>
                </div>

                {/* Anticipated Objections */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-navy">
                    <AlertTriangle className="w-3.5 h-3.5 text-risk-medium" />
                    Objections anticipées
                  </div>
                  <ul className="space-y-1.5 pl-5">
                    {analysis.globalStrategyNotes.anticipatedObjections.map(
                      (obj, i) => (
                        <li
                          key={i}
                          className="text-xs text-muted leading-relaxed list-disc list-inside"
                        >
                          {obj}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Fallback */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-navy">
                    <Layers className="w-3.5 h-3.5 text-accent" />
                    Positions de repli
                  </div>
                  <ul className="space-y-1.5 pl-5">
                    {analysis.globalStrategyNotes.fallbackPositions.map(
                      (pos, i) => (
                        <li
                          key={i}
                          className="text-xs text-muted leading-relaxed list-disc list-inside"
                        >
                          {pos}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Suggestions */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-navy">
                    <Lightbulb className="w-3.5 h-3.5 text-gold" />
                    Suggestions d&apos;amélioration
                  </div>
                  <ul className="space-y-1.5 pl-5">
                    {analysis.globalStrategyNotes.improvementSuggestions.map(
                      (sug, i) => (
                        <li
                          key={i}
                          className="text-xs text-muted leading-relaxed list-disc list-inside"
                        >
                          {sug}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Disclaimer */}
          <p className="text-[10px] text-muted/60 leading-relaxed text-center px-4">
            {analysis.disclaimer}
          </p>
        </div>
      </div>

      {/* Coming soon modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-navy/30 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-2xl shadow-2xl shadow-navy/10 p-8 max-w-md w-full border border-border/30"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-cream transition-colors"
              >
                <X className="w-4 h-4 text-muted" />
              </button>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-navy">
                  Fonctionnalité à venir
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Cette fonctionnalité sera disponible prochainement.
                  Nos Conseils en Propriété Industrielle pourront vérifier,
                  affiner et compléter les revendications générées par l&apos;IA.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="mt-4 px-6 py-2.5 rounded-lg bg-navy text-white text-sm font-medium hover:bg-navy-light transition-colors"
                >
                  Compris
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
