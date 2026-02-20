const PREFIXES = ["get", "try", "join", "go", "my"];
const SUFFIXES = ["hq", "labs", "app", "now", "online"];
const TLDS = [".com", ".ai", ".io", ".net"];

export function suggestAlternatives(domain: string): string[] {
  const [label] = domain.split(".");
  const alternatives = new Set<string>();

  PREFIXES.forEach((prefix, idx) => alternatives.add(`${prefix}${label}${TLDS[idx % TLDS.length]}`));
  SUFFIXES.forEach((suffix, idx) => alternatives.add(`${label}${suffix}${TLDS[(idx + 1) % TLDS.length]}`));

  return [...alternatives].slice(0, 8);
}
