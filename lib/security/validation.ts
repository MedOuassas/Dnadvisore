import { z } from "zod";

export const domainSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^(?!-)[a-z0-9-]{1,63}\.[a-z]{2,24}$/i, "Invalid domain format");

export const evaluatePayloadSchema = z.object({
  domain: domainSchema
});

export const bulkPayloadSchema = z.object({
  domains: z.array(domainSchema).min(1).max(20)
});

export function sanitizeDomain(input: string): string {
  return input.trim().toLowerCase().replace(/[^a-z0-9.-]/g, "");
}
