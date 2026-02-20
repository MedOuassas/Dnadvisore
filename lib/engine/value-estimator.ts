import { ScoreBreakdown, ValueEstimate } from "@/lib/types";

const TLD_MULTIPLIER: Record<string, number> = {
  com: 1.7,
  ai: 1.45,
  io: 1.25,
  net: 1.1,
  org: 1,
  co: 1.05
};

export function estimateValue(domain: string, score: ScoreBreakdown): ValueEstimate {
  const [label, tld] = domain.split(".");
  const searchVolume = score.searchVolume * 900;
  const cpc = 0.8 + score.commercialIntent / 8;
  const brandScore = score.brandability / 15;
  const multiplier = TLD_MULTIPLIER[tld] ?? 0.9;

  let base = searchVolume * cpc * brandScore * multiplier;

  if (label.length > 10) base *= 0.72;
  if (/\d|-/.test(label)) base *= 0.6;

  const comparableFactor = 0.8 + score.comparableSales / 10;
  const estimatedMid = base * comparableFactor;

  return {
    estimatedLow: Math.round(estimatedMid * 0.7),
    estimatedHigh: Math.round(estimatedMid * 1.35),
    confidence: Math.min(95, Math.max(52, score.total))
  };
}
