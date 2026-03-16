export interface TrademarkConflict {
  name: string;
  owner: string;
  niceClass: number;
  territory: string;
  registrationNumber: string | null;
  source: "web_search" | "knowledge";
  similarityScores: {
    phonetic: number;
    visual: number;
    conceptual: number;
  };
  overallSimilarity: number;
  riskLevel: "low" | "medium" | "high";
  analysis: string;
}

export interface TrademarkAnalysis {
  overallRiskScore: number;
  riskLevel: "low" | "medium" | "high";
  summary: string;
  conflicts: TrademarkConflict[];
  recommendation: string;
  disclaimer?: string;
}

export interface SearchInput {
  trademarkName: string;
  niceClasses: number[];
  territory: string;
  description?: string;
}

// ===== Module 2: Patent Claims =====

export interface PatentClaim {
  number: number;
  type: "independent" | "dependent";
  dependsOn: number[] | null;
  category: "method" | "device" | "system" | "composition" | "use" | "computer_program";
  categoryLabel: string;
  text: string;
  strategicNotes: string;
}

export interface ClaimsAnalysis {
  inventionTitle: string;
  technicalField: string;
  closestPriorArt: {
    reference: string;
    summary: string;
    source: "web_search" | "knowledge";
  };
  distinguishingFeatures: {
    feature: string;
    technicalEffect: string;
  }[];
  objectiveTechnicalProblem: string;
  claimStrategy: string;
  claims: PatentClaim[];
  abstract: string;
  globalStrategyNotes: {
    scopeAssessment: string;
    anticipatedObjections: string[];
    fallbackPositions: string[];
    improvementSuggestions: string[];
  };
  disclaimer: string;
}

export interface ClaimsInput {
  title: string;
  technicalField: string;
  description: string;
  noveltyElements?: string;
  targetOffice: string;
  knownPriorArt?: string;
  protectionTypes?: string[];
}
