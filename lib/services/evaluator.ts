import { cacheGet, cacheSet } from "@/lib/db/redis";
import { suggestAlternatives } from "@/lib/engine/alternatives";
import { buildComparables } from "@/lib/engine/comparables";
import { evaluateScore } from "@/lib/engine/scoring";
import { estimateValue } from "@/lib/engine/value-estimator";
import { DomainEvaluation } from "@/lib/types";
import { getRegistrar } from "./registrar";

export async function evaluateDomain(domain: string, premium = false): Promise<DomainEvaluation> {
  const cacheKey = `evaluation:${domain}:${premium}`;
  const cached = await cacheGet<DomainEvaluation>(cacheKey);
  if (cached) return cached;

  const registrar = getRegistrar();
  const availability = await registrar.checkAvailability(domain);
  const score = evaluateScore(domain);
  const value = estimateValue(domain, score);
  const comparables = buildComparables(domain);

  const output: DomainEvaluation = {
    domain,
    availability,
    score,
    value,
    alternatives: suggestAlternatives(domain),
    comparables,
    premiumBreakdownLocked: !premium,
    aiBrandabilitySummary: `${domain} scores ${score.brandability}/15 on brandability due to pronounceability, clean character mix, and market-friendly structure.`
  };

  await cacheSet(cacheKey, output);
  return output;
}
