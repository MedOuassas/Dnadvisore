# DNAdvisore — Domain Search & Evaluation SaaS

Production-ready Next.js SaaS starter for real-time domain availability, weighted scoring (0–100), valuation estimates, comparable sales, and alternative suggestions.

## Features

- Real-time availability endpoint (`/api/search`) with modular registrar provider.
- Full evaluation endpoint (`/api/evaluate`) with:
  - weighted score engine
  - valuation range and confidence
  - AI-style brandability explanation
  - comparable sales mock engine
  - alternative domain suggestions
- Bulk checker endpoint (`/api/bulk`, up to 20 domains/request).
- PostgreSQL schema with Users, DomainSearches, ComparableSales.
- Redis caching layer for sub-1s repeated evaluations.
- Input validation + sanitization (`zod`), request rate limiting.
- Premium/freemium architecture:
  - premium breakdown lock flag
  - feature-flag readiness for paid tier and Stripe IDs
  - API-key-ready environment variable support
- Modern responsive UI with dark/light mode and animated score ring.

## Stack

- **Frontend**: Next.js 14 App Router, Tailwind CSS
- **Backend**: Next.js Route Handlers (Node runtime)
- **Database**: PostgreSQL + Prisma ORM
- **Cache**: Redis (ioredis)
- **Infra**: Docker + docker-compose

## Folder Structure

```txt
app/
  api/
    bulk/route.ts
    evaluate/route.ts
    search/route.ts
  evaluate/[domain]/page.tsx
  layout.tsx
  page.tsx
components/
  domain-search-form.tsx
  score-ring.tsx
  scoring-breakdown.tsx
  theme-toggle.tsx
lib/
  db/
    prisma.ts
    redis.ts
  engine/
    alternatives.ts
    comparables.ts
    scoring.ts
    value-estimator.ts
  security/
    rate-limit.ts
    validation.ts
  services/
    evaluator.ts
    registrar.ts
  types.ts
prisma/
  schema.prisma
```

## Scoring Model (100 points)

- Length: 15
- Word quality: 20
- Commercial intent: 15
- TLD score: 15
- Brandability: 15
- Search volume: 10
- Comparable sales: 10

## Valuation Formula

```txt
BaseValue = (SearchVolume × CPC × BrandScore) × TLD multiplier
Adjusted by:
- length penalty
- randomness penalty
- comparable sales multiplier
```

Returns:

```json
{
  "estimatedLow": 5200,
  "estimatedHigh": 9600,
  "confidence": 78
}
```

## Getting Started

```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

Open `http://localhost:3000`.

## Database

To create tables locally:

```bash
npm run db:migrate
```

## API Examples

### Availability

```bash
curl "http://localhost:3000/api/search?domain=brandpilot.ai"
```

### Full Evaluation

```bash
curl -X POST http://localhost:3000/api/evaluate \
  -H "Content-Type: application/json" \
  -d '{"domain":"brandpilot.ai"}'
```

### Bulk

```bash
curl -X POST http://localhost:3000/api/bulk \
  -H "Content-Type: application/json" \
  -d '{"domains":["brandpilot.ai","getbrandpilot.com"]}'
```

## Performance & Security

- In-memory request limiter by route+IP.
- Input schema validation and sanitization.
- Redis response caching (`evaluation:<domain>:<premium>`).
- Server-side architecture designed for swapping registrar providers.

## Monetization-Ready Hooks

- `ENABLE_PREMIUM_SCORING` for feature gating score details.
- `STRIPE_PRICE_ID` placeholder for subscription integration.
- `AFFILIATE_REGISTRAR_BASE_URL` for checkout redirects.
- `INTERNAL_API_KEY` placeholder for external API products.

## Bonus-ready extension points

- Plug LLM in `evaluator.ts` for richer brandability text.
- Add portfolio dashboard from `domain_searches` table.
- Add expired-domain scanner as a scheduled worker.
