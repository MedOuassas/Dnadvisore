import { ScoreBreakdown } from "@/lib/types";

export function ScoringBreakdown({ score, locked }: { score: ScoreBreakdown; locked: boolean }) {
  const rows: Array<[string, number, number]> = [
    ["Length", score.length, 15],
    ["Word Quality", score.wordQuality, 20],
    ["Commercial Intent", score.commercialIntent, 15],
    ["TLD", score.tld, 15],
    ["Brandability", score.brandability, 15],
    ["Search Volume", score.searchVolume, 10],
    ["Comparable Sales", score.comparableSales, 10]
  ];

  return (
    <div className="card space-y-4">
      <h3 className="text-xl font-semibold">Scoring Breakdown</h3>
      <div className="space-y-3">
        {rows.map(([name, value, cap]) => (
          <details key={name} className="rounded-lg border border-slate-200 p-3 dark:border-slate-700" open>
            <summary className="flex cursor-pointer items-center justify-between font-medium">
              <span>{name}</span>
              <span>
                {locked ? "🔒" : value}/{cap}
              </span>
            </summary>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              {locked ? "Upgrade to premium to unlock exact scoring insights." : `Contributes ${value} points out of ${cap}.`}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
