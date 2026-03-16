"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, X } from "lucide-react";
import { NICE_CLASSES, TERRITORIES } from "@/lib/nice-classes";
import type { SearchInput } from "@/lib/types";

interface SearchFormProps {
  onSubmit: (input: SearchInput) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSubmit, isLoading }: SearchFormProps) {
  const [trademarkName, setTrademarkName] = useState("");
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [territory, setTerritory] = useState("");
  const [description, setDescription] = useState("");
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [classSearch, setClassSearch] = useState("");

  const filteredClasses = NICE_CLASSES.filter(
    (c) =>
      c.description.toLowerCase().includes(classSearch.toLowerCase()) ||
      c.id.toString().includes(classSearch)
  );

  const toggleClass = (id: number) => {
    setSelectedClasses((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trademarkName || !selectedClasses.length || !territory) return;
    onSubmit({ trademarkName, niceClasses: selectedClasses, territory, description: description || undefined });
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
        {/* Trademark Name — Main input with visual emphasis */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-navy tracking-wide uppercase">
            Nom de la marque
          </label>
          <div className="relative">
            <input
              type="text"
              value={trademarkName}
              onChange={(e) => setTrademarkName(e.target.value)}
              placeholder="Entrez le nom de votre marque"
              className="w-full h-14 px-5 rounded-xl bg-white border border-border/50 text-lg font-medium text-navy placeholder:text-muted/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
              required
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-muted/30" />
            </div>
          </div>
        </div>

        {/* Two columns: Classes Nice + Territory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Nice Classes Multi-select */}
          <div className="space-y-2 relative">
            <label className="text-[11px] font-semibold text-navy tracking-wide uppercase">
              Classes Nice
            </label>
            <button
              type="button"
              onClick={() => setClassDropdownOpen(!classDropdownOpen)}
              className="w-full h-11 px-4 rounded-xl bg-white border border-border/50 text-left flex items-center justify-between focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
            >
              <span
                className={`text-sm truncate ${selectedClasses.length ? "text-text" : "text-muted/40"}`}
              >
                {selectedClasses.length
                  ? `${selectedClasses.length} classe${selectedClasses.length > 1 ? "s" : ""} sélectionnée${selectedClasses.length > 1 ? "s" : ""}`
                  : "Sélectionner les classes"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-muted transition-transform ${classDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Selected tags */}
            {selectedClasses.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {selectedClasses.map((id) => (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-navy/5 text-[10px] font-medium text-navy border border-navy/10"
                  >
                    {id}
                    <button
                      type="button"
                      onClick={() => toggleClass(id)}
                      className="hover:text-risk-high transition-colors"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Dropdown */}
            {classDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-30 top-full left-0 right-0 mt-1 bg-white rounded-xl border border-border/50 shadow-xl shadow-navy/10 overflow-hidden"
              >
                <div className="p-2 border-b border-border/30">
                  <input
                    type="text"
                    value={classSearch}
                    onChange={(e) => setClassSearch(e.target.value)}
                    placeholder="Rechercher une classe..."
                    className="w-full h-8 px-3 rounded-lg bg-cream/50 text-xs placeholder:text-muted/40 focus:outline-none"
                    autoFocus
                  />
                </div>
                <div className="max-h-56 overflow-y-auto py-1">
                  {filteredClasses.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleClass(c.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-cream/50 transition-colors ${selectedClasses.includes(c.id) ? "bg-gold/5" : ""}`}
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${selectedClasses.includes(c.id) ? "bg-navy border-navy" : "border-border"}`}
                      >
                        {selectedClasses.includes(c.id) && (
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-medium text-navy">
                          {c.id}.
                        </span>{" "}
                        <span className="text-xs text-muted">
                          {c.description}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-2 border-t border-border/30">
                  <button
                    type="button"
                    onClick={() => setClassDropdownOpen(false)}
                    className="w-full h-8 rounded-lg bg-navy text-white text-xs font-medium hover:bg-navy-light transition-colors"
                  >
                    Confirmer
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Territory */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-navy tracking-wide uppercase">
              Territoire
            </label>
            <select
              value={territory}
              onChange={(e) => setTerritory(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-white border border-border/50 text-sm text-text focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
              required
            >
              <option value="" disabled>
                Sélectionner un territoire
              </option>
              {TERRITORIES.map((t) => (
                <option key={t.id} value={t.label}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-navy tracking-wide uppercase">
            Description{" "}
            <span className="text-muted font-normal normal-case">(optionnel)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez brièvement les produits ou services associés..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white border border-border/50 text-sm text-text placeholder:text-muted/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all resize-none"
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isLoading || !trademarkName || !selectedClasses.length || !territory}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-navy to-navy-light text-white font-medium text-sm tracking-wide shadow-lg shadow-navy/20 hover:shadow-xl hover:shadow-navy/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          Analyser la disponibilité
        </motion.button>

        <p className="text-[10px] text-center text-muted/60 leading-relaxed">
          Cette analyse est générée par intelligence artificielle a titre
          indicatif. Elle ne constitue pas un avis juridique.
        </p>
      </div>
    </motion.form>
  );
}
