"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, ChevronDown } from "lucide-react";
import type { ClaimsInput } from "@/lib/types";

const TECHNICAL_FIELDS = [
  "Mécanique / Génie civil",
  "Électronique / Semiconducteurs",
  "Informatique / Logiciel",
  "Télécommunications",
  "Chimie / Matériaux",
  "Biotechnologie / Pharma",
  "Énergie / Environnement",
  "Agroalimentaire",
  "Aéronautique / Spatial",
  "Optique / Photonique",
  "Autre",
];

const TARGET_OFFICES = [
  { id: "OEB", label: "OEB (Europe)" },
  { id: "INPI", label: "INPI (France)" },
  { id: "USPTO", label: "USPTO (États-Unis)" },
  { id: "WIPO", label: "WIPO (PCT International)" },
];

const PROTECTION_TYPES = [
  { id: "method", label: "Procédé / Méthode" },
  { id: "device", label: "Dispositif / Appareil" },
  { id: "system", label: "Système" },
  { id: "composition", label: "Composition" },
  { id: "use", label: "Utilisation" },
  { id: "computer_program", label: "Programme d'ordinateur" },
  { id: "product_by_process", label: "Product-by-process" },
];

interface ClaimsSearchFormProps {
  onSubmit: (input: ClaimsInput) => void;
  isLoading: boolean;
}

export default function ClaimsSearchForm({ onSubmit, isLoading }: ClaimsSearchFormProps) {
  const [title, setTitle] = useState("");
  const [technicalField, setTechnicalField] = useState("");
  const [description, setDescription] = useState("");
  const [noveltyElements, setNoveltyElements] = useState("");
  const [targetOffice, setTargetOffice] = useState("");
  const [knownPriorArt, setKnownPriorArt] = useState("");
  const [protectionTypes, setProtectionTypes] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleProtection = (id: string) => {
    setProtectionTypes((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !technicalField || !description || !targetOffice) return;
    onSubmit({
      title,
      technicalField,
      description,
      noveltyElements: noveltyElements || undefined,
      targetOffice,
      knownPriorArt: knownPriorArt || undefined,
      protectionTypes: protectionTypes.length ? protectionTypes : undefined,
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass-card rounded-2xl p-8 shadow-xl shadow-navy/5 space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-navy tracking-wide uppercase">
            Titre de l&apos;invention
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Dispositif de filtration d'eau par membrane catalytique"
            className="w-full h-14 px-5 rounded-xl bg-white border border-border/50 text-lg font-medium text-navy placeholder:text-muted/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
            required
          />
        </div>

        {/* Two columns: Technical Field + Target Office */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-navy tracking-wide uppercase">
              Domaine technique
            </label>
            <select
              value={technicalField}
              onChange={(e) => setTechnicalField(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-white border border-border/50 text-sm text-text focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
              required
            >
              <option value="" disabled>
                Sélectionner un domaine
              </option>
              {TECHNICAL_FIELDS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-navy tracking-wide uppercase">
              Office de dépôt cible
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TARGET_OFFICES.map((office) => (
                <button
                  key={office.id}
                  type="button"
                  onClick={() => setTargetOffice(office.id)}
                  className={`h-11 px-3 rounded-xl border text-xs font-medium transition-all ${
                    targetOffice === office.id
                      ? "bg-navy text-white border-navy shadow-sm"
                      : "bg-white border-border/50 text-muted hover:border-navy/30 hover:text-navy"
                  }`}
                >
                  {office.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-navy tracking-wide uppercase">
            Description détaillée de l&apos;invention
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez votre invention en détail. Incluez : le problème technique résolu, la solution technique proposée, les avantages par rapport aux solutions existantes, et les modes de réalisation envisagés. Plus la description est détaillée, meilleures seront les revendications."
            rows={6}
            className="w-full px-4 py-3 rounded-xl bg-white border border-border/50 text-sm text-text placeholder:text-muted/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all resize-none leading-relaxed"
            required
          />
        </div>

        {/* Novelty Elements */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-navy tracking-wide uppercase">
            Éléments clés de nouveauté{" "}
            <span className="text-muted font-normal normal-case">(optionnel)</span>
          </label>
          <textarea
            value={noveltyElements}
            onChange={(e) => setNoveltyElements(e.target.value)}
            placeholder="Quels aspects de votre invention considérez-vous comme nouveaux par rapport à l'état de la technique ?"
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white border border-border/50 text-sm text-text placeholder:text-muted/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all resize-none"
          />
        </div>

        {/* Advanced options toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-xs text-accent font-medium hover:text-navy transition-colors"
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
          />
          Options avancées
        </button>

        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-5"
          >
            {/* Protection Types */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-navy tracking-wide uppercase">
                Type de protection souhaitée
              </label>
              <div className="flex flex-wrap gap-2">
                {PROTECTION_TYPES.map((pt) => (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => toggleProtection(pt.id)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      protectionTypes.includes(pt.id)
                        ? "bg-navy/5 text-navy border-navy/20"
                        : "bg-white border-border/50 text-muted hover:border-navy/20"
                    }`}
                  >
                    {pt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Known Prior Art */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-navy tracking-wide uppercase">
                Art antérieur connu{" "}
                <span className="text-muted font-normal normal-case">(optionnel)</span>
              </label>
              <textarea
                value={knownPriorArt}
                onChange={(e) => setKnownPriorArt(e.target.value)}
                placeholder="Brevets, publications ou produits existants que vous connaissez dans le domaine (numéros de brevet, références, URLs)"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white border border-border/50 text-sm text-text placeholder:text-muted/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all resize-none"
              />
            </div>
          </motion.div>
        )}

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isLoading || !title || !technicalField || !description || !targetOffice}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-navy to-navy-light text-white font-medium text-sm tracking-wide shadow-lg shadow-navy/20 hover:shadow-xl hover:shadow-navy/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Générer les revendications
        </motion.button>

        <p className="text-[10px] text-center text-muted/60 leading-relaxed">
          Les revendications générées sont un premier jet IA. Elles doivent être validées par un CPI qualifié avant tout dépôt.
        </p>
      </div>
    </motion.form>
  );
}
