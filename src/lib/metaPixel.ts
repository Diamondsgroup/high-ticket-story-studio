// Meta Pixel (2192520231311661) — carregamento condicionado à rota "sem banner":
// em regiões que exigem consentimento (EEE, Reino Unido, Suíça) ou quando a
// região não pode ser confirmada, o Pixel NÃO carrega. Fora dessas regiões,
// carrega normalmente (rastreamento comum, honrando opt-outs quando aplicável).

export const META_PIXEL_ID = "2192520231311661";

const CONSENT_REGIONS = new Set([
  // EEE
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "NL", "NO", "PL", "PT", "RO",
  "SK", "SI", "ES", "SE",
  // Reino Unido e Suíça
  "GB", "CH",
]);

type FbqFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: (...args: unknown[]) => void;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

function installBaseSnippet() {
  if (typeof window === "undefined") return;
  if (window.fbq) return;

  const w = window as Window & { fbq?: FbqFn };
  const n: FbqFn = function (...args: unknown[]) {
    if (n.callMethod) {
      n.callMethod.apply(n, args);
    } else {
      n.queue!.push(args);
    }
  };
  if (!window._fbq) window._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  w.fbq = n;
  w._fbq = n;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
}

async function isConsentRegion(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);
    const res = await fetch("/cdn-cgi/trace", { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return true; // região desconhecida → bloqueia
    const text = await res.text();
    const match = text.match(/^loc=(.*)$/m);
    const loc = match?.[1]?.trim();
    if (!loc || loc === "XX" || loc === "T1") return true; // desconhecido/Tor → bloqueia
    return CONSENT_REGIONS.has(loc);
  } catch {
    return true; // falha na leitura → bloqueia
  }
}

let initPromise: Promise<boolean> | null = null;

/** Inicia o Pixel se a região permitir. Retorna true se o Pixel carregou. */
export function initMetaPixel(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (!initPromise) {
    initPromise = (async () => {
      if (await isConsentRegion()) return false;
      installBaseSnippet();
      window.fbq?.("init", META_PIXEL_ID, {}, { agent: "lovable" });
      window.fbq?.("track", "PageView");
      return true;
    })();
  }
  return initPromise;
}

/** Dispara o evento Lead (só se o Pixel carregou nesta região). */
export async function trackLead(eventId: string) {
  if (typeof window === "undefined") return;
  const ok = await initMetaPixel();
  if (ok) window.fbq?.("track", "Lead", {}, { eventID: eventId });
}
