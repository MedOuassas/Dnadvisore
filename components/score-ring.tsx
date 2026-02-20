interface Props {
  score: number;
}

export function ScoreRing({ score }: Props) {
  const safe = Math.max(0, Math.min(100, score));
  const degree = (safe / 100) * 360;

  return (
    <div
      className="grid h-40 w-40 place-items-center rounded-full"
      style={{ background: `conic-gradient(#2f80ed ${degree}deg, #dbeafe ${degree}deg)` }}
    >
      <div className="grid h-28 w-28 place-items-center rounded-full bg-white text-3xl font-bold dark:bg-slate-900">{safe}</div>
    </div>
  );
}
