import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

// Single-page site, so the sitemap is written by hand rather than pulling in
// @astrojs/sitemap for one URL.
export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL(SITE.url)).origin;

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
