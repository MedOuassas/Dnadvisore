import { NextRequest, NextResponse } from "next/server";
import { evaluateDomain } from "@/lib/services/evaluator";
import { assertRateLimit } from "@/lib/security/rate-limit";
import { bulkPayloadSchema, sanitizeDomain } from "@/lib/security/validation";

export async function POST(request: NextRequest) {
  try {
    assertRateLimit(request.ip ?? "unknown", "bulk", 20, 60_000);
    const body = await request.json();

    const parsed = bulkPayloadSchema.parse({
      domains: (body.domains ?? []).map((entry: string) => sanitizeDomain(entry))
    });

    const results = await Promise.all(parsed.domains.map((domain) => evaluateDomain(domain, false)));
    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
