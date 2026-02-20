import { ScoreBreakdown } from "@/lib/types";

const COMMERCIAL_KEYWORDS = ["pay", "cloud", "ai", "crypto", "health", "legal", "finance", "data"];

function scoreLength(label: string): number {
  if (label.length <= 5) return 15;
  if (label.length <= 8) return 12;
  if (label.length <= 12) return 8;
  return 4;
}

function scoreWordQuality(label: string): number {
  if (/^[a-z]+$/.test(label) && label.length > 3 && !/(.)\1\1/.test(label)) return 10;
  if (/[a-z]+[a-z]+/.test(label) && label.length <= 14) return 8;
  return 2;
}

function scoreCommercialIntent(label: string): number {
  const matched = COMMERCIAL_KEYWORDS.filter((keyword) => label.includes(keyword)).length;
  return Math.min(15, matched * 4 + 3);
}

function scoreTld(tld: string): number {
  if (tld === "com") return 15;
  if (tld === "ai") return 12;
  if (tld === "io") return 10;
  if (["net", "org", "co"].includes(tld)) return 8;
  return 6;
}

function scoreBrandability(label: string): number {
  const hasHyphen = label.includes("-");
  const hasNumbers = /\d/.test(label);
  const vowels = (label.match(/[aeiou]/g) || []).length;
  const ratio = vowels / Math.max(label.length, 1);
  const pronounceable = ratio > 0.25 && ratio < 0.65;

  let score = 6;
  if (!hasHyphen) score += 3;
  if (!hasNumbers) score += 3;
  if (pronounceable) score += 3;
  return Math.min(score, 15);
}

function scoreSearchVolume(label: string): number {
  return Math.min(10, Math.max(2, Math.floor((label.length < 8 ? 8 : 5) + (12 - label.length) / 2)));
}

function scoreComparableSales(label: string): number {
  return Math.min(10, Math.max(2, 11 - Math.floor(label.length / 2)));
}

export function evaluateScore(domain: string): ScoreBreakdown {
  const [label, tld] = domain.split(".");
  const length = scoreLength(label);
  const wordQuality = scoreWordQuality(label);
  const commercialIntent = scoreCommercialIntent(label);
  const tldScore = scoreTld(tld);
  const brandability = scoreBrandability(label);
  const searchVolume = scoreSearchVolume(label);
  const comparableSales = scoreComparableSales(label);

  const total = length + wordQuality + commercialIntent + tldScore + brandability + searchVolume + comparableSales;

  return {
    total,
    length,
    wordQuality,
    commercialIntent,
    tld: tldScore,
    brandability,
    searchVolume,
    comparableSales,
    reasoning: [
      `${label.length} character label impacts memorability and resale potential.`,
      `${tld.toUpperCase()} extension influences trust and liquidity.`,
      `Keyword intent and pronounceability drive conversion potential.`
    ]
  };
}
