export interface SiteMeta {
  /** Professional honorific rendered before the name in the <h1>. */
  readonly honorific: string;
  /** Full name as it should appear in the <h1>. */
  readonly name: string;
  /** Credential suffix rendered after the name, e.g. "ECT". */
  readonly credentialSuffix: string;
  /** Title line under the name. */
  readonly title: string;
  /** One-line positioning statement — the thesis of the whole page. */
  readonly positioning: string;
  /** Supporting paragraph under the positioning statement. */
  readonly summary: string;
  /** Availability note. `null` until supplied — never invented. */
  readonly availability: string | null;
  readonly email: string;
  readonly github: string;
  readonly githubHandle: string;
  /**
   * Downloadable CV. `path` is served straight out of `/public`; `filename` is
   * what the browser saves it as. `null` removes every résumé link from the
   * page — the hero and contact section both render without it.
   */
  readonly resume: { readonly path: string; readonly filename: string } | null;
  /** Canonical deploy URL. Used for sitemap, canonical link, and OG tags. */
  readonly url: string;
  readonly ogTitle: string;
  readonly ogDescription: string;
  readonly ogImage: string;
  readonly locale: string;
}

// Drives the canonical link, sitemap.xml, robots.txt, and the absolute OG image
// URL. Must match the live domain exactly, or social previews and the sitemap
// point at the wrong host.
const CANONICAL_URL = 'https://rein-ramirez-portfolio.vercel.app';

export const SITE: SiteMeta = {
  honorific: 'Engr.',
  name: 'Reinhard Mari Ramirez',
  credentialSuffix: 'ECT',
  title:
    'Data Engineer. AWS Certified Cloud Practitioner, Licensed Electronics Engineer (ECE/ECT)',

  positioning: 'Data engineer who automates with AI agents.',

  summary:
    'Five years building ETL pipelines and cloud data infrastructure at Accenture and BTG International. I now build Claude Code skills and agent automation on top of that foundation. The pipelines came first, and they are why the automation holds up in production.',

  availability: 'Available part-time, 20–25 hrs/week, remote only.',

  email: 'reinhardmari19@gmail.com',
  github: 'https://github.com/reinrmz',
  githubHandle: 'reinrmz',

  // Lives in /public, so the path is the public URL. Replacing the file at that
  // same path updates the download with no code change.
  resume: {
    path: '/reinhard-ramirez-cv.pdf',
    filename: 'reinhard-ramirez-cv.pdf',
  },

  url: CANONICAL_URL,

  ogTitle: 'Engr. Reinhard Mari Ramirez, Data engineer who automates with AI agents',
  ogDescription:
    'Five years of production ETL and AWS data infrastructure, now paired with Claude Code skills, hooks, and agent tooling. Available for part-time and contract work.',
  ogImage: '/og.png',
  locale: 'en_AU',
};

/** "Engr. Reinhard Mari Ramirez" — the name as it should read in prose and meta. */
export const FULL_NAME = `${SITE.honorific} ${SITE.name}`;

/**
 * Split an email for naive-scraper obfuscation.
 *
 * The rendered markup never contains the literal `user@domain` string in a single
 * text node, but the `mailto:` href is intact so the link works with JS disabled
 * and the address stays selectable and copyable.
 */
export function splitEmail(email: string): { user: string; domain: string } {
  const at = email.lastIndexOf('@');
  return { user: email.slice(0, at), domain: email.slice(at + 1) };
}
