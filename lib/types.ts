export interface AvailabilityResult {
  available: boolean;
  premium: boolean;
  price: number;
  currency: "USD";
}

export interface ScoreBreakdown {
  total: number;
  length: number;
  wordQuality: number;
  commercialIntent: number;
  tld: number;
  brandability: number;
  searchVolume: number;
  comparableSales: number;
  reasoning: string[];
}

export interface ValueEstimate {
  estimatedLow: number;
  estimatedHigh: number;
  confidence: number;
}

export interface DomainEvaluation {
  domain: string;
  availability: AvailabilityResult;
  score: ScoreBreakdown;
  value: ValueEstimate;
  alternatives: string[];
  comparables: Array<{ domain: string; price: number; date: string }>;
  premiumBreakdownLocked: boolean;
  aiBrandabilitySummary: string;
}
