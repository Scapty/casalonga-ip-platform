import { TRADEMARK_SYSTEM_PROMPT, CLAIMS_SYSTEM_PROMPT } from "./prompts";
import type { SearchInput, TrademarkAnalysis, ClaimsInput, ClaimsAnalysis } from "./types";

export async function analyzeTrademarkConflicts(
  input: SearchInput
): Promise<TrademarkAnalysis> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.AI_MODEL || "claude-haiku-4-5-20251001",
      max_tokens: 16000,
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search",
        },
      ],
      system: TRADEMARK_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Analyse la disponibilité de la marque suivante :

Nom proposé : ${input.trademarkName}
Classes Nice : ${input.niceClasses.join(", ")}
Territoire : ${input.territory}
${input.description ? `Description : ${input.description}` : ""}

IMPORTANT : Utilise le web search pour chercher dans les registres réels de marques AVANT de répondre. Fournis ton analyse complète en JSON.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Claude API error:", errorData);
    throw new Error(`Claude API error: ${response.status}`);
  }

  const data = await response.json();

  // Extract text blocks from response (ignore web search tool_use blocks)
  const textBlocks = data.content.filter(
    (block: { type: string }) => block.type === "text"
  );
  const text = textBlocks
    .map((block: { text: string }) => block.text)
    .join("");

  if (!text) {
    throw new Error("No text response from Claude");
  }

  // Parse JSON from response — Claude may include text before/after the JSON
  const stripped = text.replace(/```json\n?|```\n?/g, "");

  // Try to extract a JSON object from the response
  const jsonMatch = stripped.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("No JSON found in response:", stripped.substring(0, 500));
    throw new Error("No JSON found in Claude response");
  }

  return JSON.parse(jsonMatch[0]) as TrademarkAnalysis;
}

export async function analyzePatentClaims(
  input: ClaimsInput
): Promise<ClaimsAnalysis> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.AI_MODEL || "claude-haiku-4-5-20251001",
      max_tokens: 16000,
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search",
        },
      ],
      system: CLAIMS_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Rédige un jeu de revendications brevet pour l'invention suivante :

Titre : ${input.title}
Domaine technique : ${input.technicalField}
Office cible : ${input.targetOffice}

DESCRIPTION DE L'INVENTION :
${input.description}

${input.noveltyElements ? `ÉLÉMENTS DE NOUVEAUTÉ IDENTIFIÉS PAR L'INVENTEUR :\n${input.noveltyElements}` : ""}
${input.knownPriorArt ? `ART ANTÉRIEUR CONNU :\n${input.knownPriorArt}` : ""}
${input.protectionTypes?.length ? `TYPES DE PROTECTION SOUHAITÉS : ${input.protectionTypes.join(", ")}` : ""}

IMPORTANT : Effectue d'abord des recherches web pour identifier l'état de la technique, puis rédige les revendications. Réponds uniquement en JSON valide.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Claude API error:", errorData);
    throw new Error(`Claude API error: ${response.status}`);
  }

  const data = await response.json();

  const textBlocks = data.content.filter(
    (block: { type: string }) => block.type === "text"
  );
  const text = textBlocks
    .map((block: { text: string }) => block.text)
    .join("");

  if (!text) {
    throw new Error("No text response from Claude");
  }

  const stripped = text.replace(/```json\n?|```\n?/g, "");
  const jsonMatch = stripped.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("No JSON found in response:", stripped.substring(0, 500));
    throw new Error("No JSON found in Claude response");
  }

  return JSON.parse(jsonMatch[0]) as ClaimsAnalysis;
}
