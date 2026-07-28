import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL(SITE.url)).origin;

  const body = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
