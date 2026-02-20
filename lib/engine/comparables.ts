export function buildComparables(domain: string): Array<{ domain: string; price: number; date: string }> {
  const [label, tld] = domain.split(".");
  const seed = [...label].reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return Array.from({ length: 4 }).map((_, index) => {
    const price = Math.round((1200 + (seed % 4000)) * (1 + index * 0.35));
    return {
      domain: `${label.slice(0, Math.max(3, label.length - index))}.${tld}`,
      price,
      date: `202${index}-0${(index % 8) + 1}-12`
    };
  });
}
