import { NextRequest, NextResponse } from "next/server";
import { evaluateDomain } from "@/lib/services/evaluator";
import { assertRateLimit } from "@/lib/security/rate-limit";
import { evaluatePayloadSchema, sanitizeDomain } from "@/lib/security/validation";

export async function POST(request: NextRequest) {
  try {
    assertRateLimit(request.ip ?? "unknown", "evaluate", 60, 60_000);
    const body = await request.json();
    const parsed = evaluatePayloadSchema.parse({ domain: sanitizeDomain(body.domain) });
    const premium = request.headers.get("x-premium") === "true";

    const evaluation = await evaluateDomain(parsed.domain, premium);
    return NextResponse.json(evaluation);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
