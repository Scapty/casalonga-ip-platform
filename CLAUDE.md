# CASALONGA IP Intelligence Platform — Module 1: Trademark Search

## Project Overview
A web application that allows users to search for potential trademark conflicts. The user enters a proposed trademark name, selects Nice class(es) and territory, and receives an AI-powered analysis of potential conflicts with a risk score.

This is a **prototype/MVP** — no database, no RAG, no vector store. Just the Claude API with a specialized system prompt. The goal is to demonstrate the value of the platform to Casalonga leadership.

## Architecture

```
casalonga-trademark-search/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with fonts, metadata
│   ├── page.tsx                  # Landing / search page
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # API route → calls Claude API
│   └── results/
│       └── page.tsx              # Results display page
├── components/
│   ├── SearchForm.tsx            # Main search form
│   ├── ResultsPanel.tsx          # Analysis results display
│   ├── RiskBadge.tsx             # Risk level badge (green/orange/red)
│   ├── StatusBadge.tsx           # Service level badge (🟠 IA / 🟢 Vérifié / 🔵 Expert)
│   ├── ConflictCard.tsx          # Individual conflict trademark card
│   ├── Header.tsx                # App header with Casalonga branding
│   └── UpgradePrompt.tsx         # CTA to request human verification
├── lib/
│   ├── claude.ts                 # Claude API client wrapper
│   ├── prompts.ts                # System prompts for trademark analysis
│   ├── types.ts                  # TypeScript types
│   └── nice-classes.ts           # Nice classification data (all 45 classes)
├── public/
│   └── logo.png                  # Casalonga logo
├── .env.local                    # ANTHROPIC_API_KEY
├── CLAUDE.md                     # This file
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + shadcn/ui components
- **AI**: Claude API (claude-sonnet-4-20250514)
- **Language**: TypeScript
- **Deployment**: Vercel (later)

## Brand Identity — CASALONGA
- **Primary color (navy)**: #1B2A4A
- **Accent color**: #2E5F8A
- **Gold accent**: #BF9B51
- **Background**: #F5F3EE (warm cream)
- **Text**: #2C2C2C
- **Muted**: #6B6B6B
- **Font**: Use system font stack or Inter for the prototype
- **Tone**: Professional, serious, trustworthy. This is a law firm, not a startup. No emojis in the UI (except the status badges). Clean, minimal, elegant.

## Core Feature: Trademark Similarity Search

### User Flow
1. User lands on the search page
2. Fills in:
   - **Trademark name** (required) — the name they want to register
   - **Nice class(es)** (required) — dropdown/multi-select with all 45 classes
   - **Territory** (required) — dropdown: France, EU, USA, International
   - **Description** (optional) — brief description of goods/services
3. Clicks "Analyser"
4. Loading state with professional animation
5. Results page displays:
   - **Overall risk score** (0-100) with color coding (green <30, orange 30-70, red >70)
   - **Status badge**: 🟠 "Analyse IA — non vérifiée par un avocat"
   - **List of potential conflicts** — each with:
     - Conflicting trademark name
     - Owner
     - Nice class
     - Territory
     - Similarity score (phonetic, visual, conceptual)
     - Risk level
     - Brief analysis
   - **Summary recommendation** by the AI
   - **CTA buttons**:
     - "Demander une vérification Casalonga" (🟢) — disabled/mock for prototype
     - "Demander une expertise approfondie" (🔵) — disabled/mock for prototype

### Status Badge System
Every response displays one of three badges:
- 🟠 **IA** (orange badge): "Analyse IA — non vérifiée" — default for all AI responses
- 🟢 **Vérifié** (green badge): "Vérifié par Casalonga" — after human review (mocked in prototype)
- 🔵 **Expert** (blue badge): "Expertise Casalonga" — full expert analysis (mocked in prototype)

For the prototype, only the 🟠 badge is functional. The 🟢 and 🔵 buttons exist but show a modal saying "Cette fonctionnalité sera disponible prochainement" or similar.

## Claude API Integration

### API Route (`app/api/analyze/route.ts`)
- POST endpoint
- Receives: { trademarkName, niceClasses, territory, description }
- Calls Claude API with the system prompt from `lib/prompts.ts`
- Returns structured JSON response
- Handle errors gracefully

### System Prompt (in `lib/prompts.ts`)
```typescript
export const TRADEMARK_SYSTEM_PROMPT = `Tu es un expert en propriété intellectuelle spécialisé dans l'analyse de marques, travaillant pour CASALONGA, un cabinet européen de référence en PI fondé en 1867.

Tu analyses les risques de conflit pour une marque proposée. Tu dois fournir une analyse rigoureuse et professionnelle.

Pour chaque analyse, tu dois :
1. Identifier les marques existantes potentiellement conflictuelles (invente des exemples réalistes basés sur ta connaissance des marques connues et des règles de similarité)
2. Évaluer la similarité sur trois axes :
   - Phonétique : prononciation similaire (utilise les principes Soundex/Metaphone)
   - Visuelle : apparence écrite similaire (distance de Levenshtein conceptuelle)
   - Conceptuelle : même sens ou évocation similaire
3. Attribuer un score de risque global (0-100)
4. Fournir une recommandation claire

IMPORTANT : Tu es un prototype. Tu ne consultes PAS de vraies bases de données. Tu génères des analyses réalistes et plausibles basées sur ta connaissance générale des marques et du droit des marques. Tes résultats sont illustratifs et ne constituent pas un avis juridique.

Tu DOIS répondre UNIQUEMENT en JSON valide avec cette structure exacte :
{
  "overallRiskScore": number (0-100),
  "riskLevel": "low" | "medium" | "high",
  "summary": "string — résumé de l'analyse en 2-3 phrases",
  "conflicts": [
    {
      "name": "string — nom de la marque conflictuelle",
      "owner": "string — titulaire",
      "niceClass": number,
      "territory": "string",
      "similarityScores": {
        "phonetic": number (0-100),
        "visual": number (0-100),
        "conceptual": number (0-100)
      },
      "overallSimilarity": number (0-100),
      "riskLevel": "low" | "medium" | "high",
      "analysis": "string — brève analyse du conflit"
    }
  ],
  "recommendation": "string — recommandation détaillée en 3-5 phrases"
}

Génère entre 3 et 7 conflits potentiels, classés par score de similarité décroissant. Sois réaliste : certains conflits doivent être faibles (score <30), d'autres moyens, et éventuellement certains forts si le nom proposé est proche de marques connues.`;
```

### Claude API Call (`lib/claude.ts`)
```typescript
export async function analyzeTrademarkConflicts(input: {
  trademarkName: string;
  niceClasses: number[];
  territory: string;
  description?: string;
}) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: TRADEMARK_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Analyse la disponibilité de la marque suivante :
          
Nom proposé : ${input.trademarkName}
Classes Nice : ${input.niceClasses.join(", ")}
Territoire : ${input.territory}
${input.description ? `Description : ${input.description}` : ""}

Fournis ton analyse complète en JSON.`,
        },
      ],
    }),
  });

  const data = await response.json();
  const text = data.content[0].text;
  
  // Parse JSON from response (handle potential markdown code blocks)
  const clean = text.replace(/```json\n?|```\n?/g, "").trim();
  return JSON.parse(clean);
}
```

## Types (`lib/types.ts`)
```typescript
export interface TrademarkConflict {
  name: string;
  owner: string;
  niceClass: number;
  territory: string;
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
}

export interface SearchInput {
  trademarkName: string;
  niceClasses: number[];
  territory: string;
  description?: string;
}
```

## Nice Classes (`lib/nice-classes.ts`)
Include all 45 Nice classes with their French descriptions. Example:
```typescript
export const NICE_CLASSES = [
  { id: 1, label: "Classe 1", description: "Produits chimiques" },
  { id: 2, label: "Classe 2", description: "Peintures, vernis, laques" },
  { id: 3, label: "Classe 3", description: "Cosmétiques, parfums, produits de toilette" },
  // ... all 45 classes
  { id: 45, label: "Classe 45", description: "Services juridiques, sécurité" },
];
```

## UI Design Guidelines
- **Layout**: Clean single-page app with header, main content, footer
- **Search page**: Centered form, generous whitespace, gold accent on CTA button
- **Results page**: Left sidebar with overall score, main content with conflict cards
- **Cards**: Subtle borders, hover effects, clean typography
- **Loading**: Professional skeleton/shimmer, NOT a spinner. Can use a progress bar with steps ("Analyse phonétique...", "Analyse visuelle...", "Analyse conceptuelle...")
- **Responsive**: Must work on desktop and tablet
- **Language**: ALL UI text in French

## Environment Variables
```
ANTHROPIC_API_KEY=sk-ant-...
```

## Commands
```bash
npx create-next-app@latest casalonga-trademark-search --typescript --tailwind --app --src-dir=false
cd casalonga-trademark-search
npx shadcn@latest init
npx shadcn@latest add button card badge select input label textarea dialog
npm install ai @anthropic-ai/sdk
```

## Important Notes
- This is a PROTOTYPE. No real trademark database is consulted.
- The AI generates plausible but fictional conflict data.
- Every response must show the 🟠 "Analyse IA — non vérifiée" badge prominently.
- The upgrade buttons (🟢 🔵) should exist but be non-functional (show "coming soon" modal).
- Keep the code clean and modular — this will evolve into a much larger platform.
- Error handling must be solid — show user-friendly error messages in French.
- The system prompt is the most important part — it determines the quality of the output.
