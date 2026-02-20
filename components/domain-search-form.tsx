"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const TLD_OPTIONS = [".com", ".ai", ".io", ".net", ".org", ".co"];

function sanitize(raw: string): string {
  return raw.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/^-+|-+$/g, "");
}

export function DomainSearchForm() {
  const [label, setLabel] = useState("");
  const [tld, setTld] = useState(".com");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const normalized = useMemo(() => sanitize(label), [label]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!normalized) return;
    setLoading(true);
    router.push(`/evaluate/${normalized}${tld}`);
  };

  return (
    <form onSubmit={submit} className="card space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Domain to evaluate</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="startupname"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
            required
          />
          <select
            value={tld}
            onChange={(e) => setTld(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg dark:border-slate-700 dark:bg-slate-900"
          >
            {TLD_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-brand-500 px-6 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
          >
            {loading ? "Evaluating..." : "Evaluate"}
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-500">Instant availability, score breakdown, valuation and alternatives.</p>
    </form>
  );
}
