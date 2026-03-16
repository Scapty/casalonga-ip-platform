import { NextRequest, NextResponse } from "next/server";
import { analyzeTrademarkConflicts } from "@/lib/claude";
import type { SearchInput } from "@/lib/types";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SearchInput;

    if (!body.trademarkName || !body.niceClasses?.length || !body.territory) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs obligatoires." },
        { status: 400 }
      );
    }

    const analysis = await analyzeTrademarkConflicts(body);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      {
        error:
          "Une erreur est survenue lors de l'analyse. Veuillez réessayer.",
      },
      { status: 500 }
    );
  }
}
