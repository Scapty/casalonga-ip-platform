"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, X } from "lucide-react";

export default function UpgradePrompt() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="glass-card rounded-xl p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-navy">
            Aller plus loin avec Casalonga
          </h3>
          <p className="text-xs text-muted leading-relaxed">
            Cette analyse IA est un premier apercu. Nos experts peuvent
            approfondir et valider les résultats.
          </p>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-emerald-200/60 bg-emerald-50/50 hover:bg-emerald-50 transition-colors text-left group"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold text-emerald-800 block">
                Vérification Casalonga
              </span>
              <span className="text-[10px] text-emerald-600">
                Un avocat vérifie votre analyse
              </span>
            </div>
            <span className="text-[10px] text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
              Bientot
            </span>
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-blue-200/60 bg-blue-50/50 hover:bg-blue-50 transition-colors text-left group"
          >
            <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold text-blue-800 block">
                Expertise approfondie
              </span>
              <span className="text-[10px] text-blue-600">
                Analyse complète par nos experts PI
              </span>
            </div>
            <span className="text-[10px] text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
              Bientot
            </span>
          </button>
        </div>
      </div>

      {/* Modal */}
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
                  Fonctionnalité a venir
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Cette fonctionnalité sera disponible prochainement.
                  Nos experts en propriété intellectuelle pourront vérifier
                  et approfondir l&apos;analyse IA pour vous fournir un avis
                  juridique qualifié.
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
    </>
  );
}
