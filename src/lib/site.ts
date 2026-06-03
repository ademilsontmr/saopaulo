export const SITE_URL =
  import.meta.env.VITE_SITE_URL ?? "https://cassinodesaopaulo.com.br";

export const SITE_NAME = "Cassino de São Paulo — Domínio Premium à Venda";

export const CONTACT_EMAIL = "contato@cassinodesaopaulo.com.br";

export const FORM_URL = "https://forms.gle/aCxqHaa7pMHu83HH7";

/** Domínio principal do site (canônico) */
export const DOMAIN = "cassinodesaopaulo.com.br";

/** Portfólio de domínios à venda */
export const DOMAINS_FOR_SALE = [
  "cassinodesaopaulo.com.br",
  "cassinodesaopaulo.com",
  "cassinosaopaulo.com",
] as const;

/** Lista em português: "a, b e c" */
export function formatDomainsListPt(
  domains: readonly string[] = DOMAINS_FOR_SALE,
): string {
  if (domains.length === 0) return "";
  if (domains.length === 1) return domains[0];
  if (domains.length === 2) return `${domains[0]} e ${domains[1]}`;
  return `${domains.slice(0, -1).join(", ")} e ${domains[domains.length - 1]}`;
}

export const OG_IMAGE_PATH = "/og-image.png";

export const OG_IMAGE = `${SITE_URL}${OG_IMAGE_PATH}`;

/** Rede de sites premium do portfólio (links cruzados no rodapé) */
export const RELATED_PREMIUM_SITES = [
  "https://cassinodegramado.com.br/",
  "https://cassinocamposdojordao.com.br/",
  "https://cassinocopacabana.com/",
  "https://cassinodesaopaulo.com.br/",
  "https://cassinodebrasilia.com.br/",
  "https://cassinodesalinas.com.br/",
  "https://cassinobh.com.br/",
  "https://cassinoportoalegre.com/",
] as const;

function normalizeHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/.*$/, "").toLowerCase();
  }
}

const CURRENT_SITE_HOSTS = new Set(
  [SITE_URL, DOMAIN, ...DOMAINS_FOR_SALE].map((value) => normalizeHostname(value.includes("://") ? value : `https://${value}`)),
);

/** Outros domínios do portfólio, excluindo o site atual */
export function getOtherPremiumSites(): { url: string; label: string }[] {
  const seen = new Set<string>();
  return RELATED_PREMIUM_SITES.filter((url) => {
    const host = normalizeHostname(url);
    if (CURRENT_SITE_HOSTS.has(host) || seen.has(host)) return false;
    seen.add(host);
    return true;
  }).map((url) => ({
    url,
    label: normalizeHostname(url),
  }));
}
