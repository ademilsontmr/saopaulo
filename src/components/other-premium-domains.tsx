import { ExternalLink } from "lucide-react";

import { getOtherPremiumSites } from "@/lib/site";

export function OtherPremiumDomainsSection() {
  const sites = getOtherPremiumSites();
  if (sites.length === 0) return null;

  return (
    <section
      aria-labelledby="outros-dominios-heading"
      className="border-t border-border/40 bg-card/20 py-14 md:py-16"
    >
      <div className="container mx-auto max-w-6xl px-6 text-center">
        <h2
          id="outros-dominios-heading"
          className="font-serif text-2xl md:text-3xl text-foreground mb-3"
        >
          Outros domínios premium à venda
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-xl mx-auto">
          Estes sites também estão disponíveis para aquisição
        </p>
        <ul
          className="flex flex-wrap items-center justify-center gap-3 list-none p-0 m-0"
          role="list"
        >
          {sites.map(({ url, label }) => (
            <li key={label}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-4 py-2.5 text-sm text-muted-foreground hover:border-gold/50 hover:text-foreground hover:bg-card/80 transition"
              >
                <span>{label}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
