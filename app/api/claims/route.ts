import { NextRequest, NextResponse } from "next/server";
import { analyzePatentClaims } from "@/lib/claude";
import type { ClaimsInput } from "@/lib/types";

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ClaimsInput;

    if (!body.title || !body.technicalField || !body.description || !body.targetOffice) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs obligatoires." },
        { status: 400 }
      );
    }

    const analysis = await analyzePatentClaims(body);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Claims analysis error:", error);
    return NextResponse.json(
      {
        error:
          "Une erreur est survenue lors de la génération des revendications. Veuillez réessayer.",
      },
      { status: 500 }
    );
  }
}
