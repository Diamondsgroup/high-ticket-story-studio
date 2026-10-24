import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { CTA_URL, siteContent } from '@/config/siteContent';

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it('routes every conversion CTA to the separate qualification page', () => {
    expect(CTA_URL).toBe('/aplicar');
    for (const cta of [siteContent.hero.cta, siteContent.porQueEuropa.cta, siteContent.mentor.cta]) {
      expect(cta.href).toBe('/aplicar');
    }
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes('/aplicar').at(-1)?.routeId).toBe('/aplicar');
  });
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
