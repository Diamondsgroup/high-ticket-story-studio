import { createFileRoute } from "@tanstack/react-router";
import { App } from "@/components/LandingApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tokfly | Escala e Aquisição no TikTok Ads" },
      { name: "description", content: "Destrave e escale sua operação no Mar Azul do TikTok Ads. Venda todos os dias com CAC até 10x menor." },
      { property: "og:title", content: "Tokfly | Escala e Aquisição no TikTok Ads" },
      { property: "og:description", content: "Destrave e escale sua operação no Mar Azul do TikTok Ads." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", href: "/images/tokfly-mark.svg", type: "image/svg+xml" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" },
    ],
  }),
  component: App,
});
