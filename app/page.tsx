import { DomainSearchForm } from "@/components/domain-search-form";

export default function HomePage() {
  return (
    <section className="space-y-8 pt-10">
      <div className="space-y-3">
        <p className="inline-flex rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-50">
          AI-enhanced domain intelligence
        </p>
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Find, score, and value domains in under one second.</h2>
        <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-300">
          Real-time availability checks, a weighted scoring engine, monetization-ready valuation, and smart alternatives.
        </p>
      </div>
      <DomainSearchForm />
    </section>
  );
}
