import { AvailabilityResult } from "@/lib/types";

export interface RegistrarProvider {
  checkAvailability(domain: string): Promise<AvailabilityResult>;
}

class MockRegistrarProvider implements RegistrarProvider {
  async checkAvailability(domain: string): Promise<AvailabilityResult> {
    const hash = [...domain].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const available = hash % 5 !== 0;
    const premium = /ai|cloud|crypto|data|pay/.test(domain) || hash % 11 === 0;
    const basePrice = premium ? 1200 + (hash % 5000) : 9 + (hash % 60);

    return {
      available,
      premium,
      price: Number(basePrice.toFixed(2)),
      currency: "USD"
    };
  }
}

export function getRegistrar(): RegistrarProvider {
  return new MockRegistrarProvider();
}
