"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Scale, Shield } from "lucide-react";
import Header from "@/components/Header";
import ClaimsSearchForm from "@/components/ClaimsSearchForm";
import ClaimsResultsPanel from "@/components/ClaimsResultsPanel";
import LoadingAnalysis from "@/components/LoadingAnalysis";
import type { ClaimsInput, ClaimsAnalysis } from "@/lib/types";

type ViewState = "search" | "loading" | "results" | "error";

export default function ClaimsPage() {
  const [view, setView] = useState<ViewState>("search");
  const [analysis, setAnalysis] = useState<ClaimsAnalysis | null>(null);
  const [claimsInput, setClaimsInput] = useState<ClaimsInput | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (input: ClaimsInput) => {
    setClaimsInput(input);
    setView("loading");
    setError("");

    try {
      const response = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la génération");
      }

      const data = await response.json();
      setAnalysis(data);
      setView("results");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur inattendue est survenue."
      );
      setView("error");
    }
  };

  const handleBack = () => {
    setView("search");
    setAnalysis(null);
  };

  return (
    <>
      <Header />

      <main className="relative z-10 min-h-screen pt-16">
        <AnimatePresence mode="wait">
          {view === "loading" && <LoadingAnalysis key="loading" />}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {view === "search" && (
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6 py-16"
            >
              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 max-w-xl"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy/5 border border-navy/10 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold pulse-dot" />
                  <span className="text-[11px] font-medium text-navy tracking-wide">
                    Intelligence artificielle
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-light text-navy mb-4 leading-tight text-balance">
                  Rédaction de{" "}
                  <span className="font-semibold">revendications</span>
                  <br />
                  brevets
                </h1>
                <p className="text-sm text-muted leading-relaxed max-w-md mx-auto">
                  Générez un premier jet de revendications brevet de qualité
                  professionnelle grâce à notre moteur d&apos;intelligence artificielle.
                </p>
              </motion.div>

              <ClaimsSearchForm onSubmit={handleSubmit} isLoading={false} />

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-16 flex items-center gap-8 text-muted/40"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="text-[11px]">Conforme OEB / USPTO</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-border" />
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  <span className="text-[11px]">Expertise depuis 1867</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-border" />
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-[11px]">Recherche d&apos;antériorité IA</span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {view === "results" && analysis && claimsInput && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-6 py-10"
            >
              <ClaimsResultsPanel
                analysis={analysis}
                input={claimsInput}
                onBack={handleBack}
              />
            </motion.div>
          )}

          {view === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6"
            >
              <div className="glass-card rounded-2xl p-8 max-w-md w-full text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-risk-high/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl">!</span>
                </div>
                <h2 className="text-lg font-semibold text-navy">
                  Erreur de génération
                </h2>
                <p className="text-sm text-muted">{error}</p>
                <button
                  onClick={handleBack}
                  className="px-6 py-2.5 rounded-lg bg-navy text-white text-sm font-medium hover:bg-navy-light transition-colors"
                >
                  Réessayer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/30 py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-[10px] text-muted/50">
            CASALONGA IP Intelligence Platform — Prototype v1.0
          </span>
          <span className="text-[10px] text-muted/50">
            Les revendications générées ne constituent pas un avis juridique
          </span>
        </div>
      </footer>
    </>
  );
}
