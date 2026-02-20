import { NextRequest, NextResponse } from "next/server";
import { evaluateDomain } from "@/lib/services/evaluator";
import { assertRateLimit } from "@/lib/security/rate-limit";
import { domainSchema, sanitizeDomain } from "@/lib/security/validation";

export async function GET(request: NextRequest) {
  try {
    assertRateLimit(request.ip ?? "unknown", "search", 120, 60_000);
    const domain = sanitizeDomain(request.nextUrl.searchParams.get("domain") ?? "");
    const parsed = domainSchema.parse(domain);
    const result = await evaluateDomain(parsed, false);

    return NextResponse.json({
      available: result.availability.available,
      premium: result.availability.premium,
      price: result.availability.price,
      currency: result.availability.currency
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
