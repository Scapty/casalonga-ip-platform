"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingAnimation from "./LoadingAnimation";

const STEPS = [
  { label: "Initialisation de l'analyse", duration: 1500 },
  { label: "Recherche dans les registres publics", duration: 3000 },
  { label: "Analyse phonétique en cours", duration: 2500 },
  { label: "Analyse visuelle des similarités", duration: 2000 },
  { label: "Étude conceptuelle et sémantique", duration: 2500 },
  { label: "Évaluation du risque global", duration: 2000 },
  { label: "Génération du rapport", duration: 1500 },
];

export default function LoadingAnalysis() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = STEPS.reduce((acc, s) => acc + s.duration, 0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 50;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 95);
      setProgress(newProgress);

      let cumulative = 0;
      for (let i = 0; i < STEPS.length; i++) {
        cumulative += STEPS[i].duration;
        if (elapsed < cumulative) {
          setCurrentStep(i);
          break;
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-cream/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="glass-card rounded-2xl p-8 shadow-xl shadow-navy/5">
          {/* Animated logo with liquid gold fill */}
          <div className="flex justify-center mb-8">
            <LoadingAnimation />
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="h-1 bg-border/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent to-gold"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-muted">Analyse en cours</span>
              <span className="text-[10px] text-muted tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            {STEPS.map((step, i) => (
              <AnimatePresence key={step.label}>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: i <= currentStep ? 1 : 0.3,
                    x: 0,
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {i < currentStep ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-risk-low"
                      />
                    ) : i === currentStep ? (
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-gold"
                      />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-border" />
                    )}
                  </div>
                  <span
                    className={`text-xs ${i === currentStep ? "text-navy font-medium" : i < currentStep ? "text-muted" : "text-border"}`}
                  >
                    {step.label}
                  </span>
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
