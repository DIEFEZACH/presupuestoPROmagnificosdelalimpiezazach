export function normalizeUrl(raw: string): string {
  const s = (raw ?? "").trim();
  if (!s) return "";

  // Si pegan solo un placeId o algo raro, lo dejamos tal cual (no rompemos)
  // pero sí resolvemos casos comunes.
  if (/^https?:\/\//i.test(s)) return s;

  // "www.google.com/..." o "www...."
  if (/^www\./i.test(s)) return `https://${s}`;

  // "google.com/..." o "maps.google.com/..."
  if (/^[a-z0-9.-]+\.[a-z]{2,}(\/|$)/i.test(s)) return `https://${s}`;

  return s;
}