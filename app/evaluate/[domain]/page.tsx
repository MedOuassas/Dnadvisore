import { ScoringBreakdown } from "@/components/scoring-breakdown";
import { ScoreRing } from "@/components/score-ring";
import { evaluateDomain } from "@/lib/services/evaluator";
import { domainSchema } from "@/lib/security/validation";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ResultPage({ params }: { params: { domain: string } }) {
  const parsed = domainSchema.safeParse(params.domain.toLowerCase());
  if (!parsed.success) return notFound();

  const result = await evaluateDomain(parsed.data, false);

  return (
    <section className="space-y-6 pb-10 pt-6">
      <Link href="/" className="text-sm text-brand-700 hover:underline dark:text-brand-50">
        ← Back to search
      </Link>
      <div className="card flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold">{result.domain}</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
            {result.availability.available ? "✅ Available now" : "❌ Currently registered"} · {result.availability.premium ? "Premium" : "Standard"} · ${result.availability.price} {result.availability.currency}
          </p>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-200">{result.aiBrandabilitySummary}</p>
        </div>
        <ScoreRing score={result.score.total} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card md:col-span-1">
          <h3 className="text-lg font-semibold">Estimated Value</h3>
          <p className="mt-3 text-3xl font-bold">${result.value.estimatedLow.toLocaleString()} - ${result.value.estimatedHigh.toLocaleString()}</p>
          <p className="mt-2 text-sm text-slate-500">Confidence: {result.value.confidence}%</p>
          <p className="mt-2 text-xs text-slate-400">Stripe-ready monetization hooks and affiliate registrar links can be enabled via feature flags.</p>
        </div>

        <div className="card md:col-span-2">
          <h3 className="text-lg font-semibold">Comparable Sales</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {result.comparables.map((comp) => (
              <li key={comp.domain} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700">
                <span>{comp.domain}</span>
                <span className="font-medium">${comp.price.toLocaleString()}</span>
                <span className="text-slate-500">{comp.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ScoringBreakdown score={result.score} locked={result.premiumBreakdownLocked} />

      <div className="card">
        <h3 className="text-lg font-semibold">Alternative Suggestions</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {result.alternatives.map((suggestion) => (
            <span key={suggestion} className="rounded-full border border-slate-200 px-3 py-1 text-sm dark:border-slate-700">
              {suggestion}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
