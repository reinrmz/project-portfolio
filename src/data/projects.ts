export interface ProjectLink {
  readonly label: string;
  readonly href: string;
  /** Primary links render as the card's lead action. */
  readonly primary?: boolean;
}

export interface DemoCredentials {
  readonly username: string;
  readonly password: string;
}

export interface ProjectShot {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  /**
   * `available` renders the image. `missing` renders a labelled placeholder so a
   * dead embed never ships.
   */
  readonly status: 'available' | 'missing';
  /** Shown in the placeholder when status is `missing`. */
  readonly missingNote?: string;
  /** Optional caption rendered under the image. */
  readonly caption?: string;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly tag: string;
  /** One line: what it does. */
  readonly summary: string;
  /** The problem it solves, and why this person solving it matters. */
  readonly problem: string;
  readonly stack: readonly string[];
  readonly links: readonly ProjectLink[];
  readonly credentials?: DemoCredentials;
  /** Rendered as a caveat line under the body — cold starts, disclaimers. */
  readonly note?: string;
  /** Screenshot of the running app. Captured from the live deployment. */
  readonly shot?: ProjectShot;
  /** Exactly one project is featured; it gets the wide cell and heavier type. */
  readonly featured?: boolean;
}

export const PROJECTS: readonly Project[] = [
  {
    slug: 'business-inventory',
    title: 'Business Inventory',
    tag: 'Full-stack SaaS',
    featured: true,
    summary:
      'Multi-tenant inventory and sales application for small retail businesses, running in production.',
    problem:
      'Per-business data isolation, atomic sales writes that prevent overselling, price-history tracking, and an analytics dashboard with low-stock alerts and multi-currency support. Authentication is hand-rolled cookie sessions with admin-approval gating rather than NextAuth, a deliberate choice, since the approval step is a domain rule and not an auth-provider concern. Running in a real deployment for a perfume decanting business.',
    stack: ['Next.js App Router', 'TypeScript', 'Prisma', 'SQLite / Turso', 'Tailwind', 'Vercel'],
    links: [
      {
        label: 'Live app',
        href: 'https://business-inventory-rmr.vercel.app/',
        primary: true,
      },
      { label: 'Repository', href: 'https://github.com/reinrmz/business-inventory' },
    ],
    credentials: {
      username: 'demo@vessel.app',
      password: 'demodemo',
    },
    shot: {
      src: '/shots/business-inventory.webp',
      alt: 'Business Inventory dashboard showing revenue, profit, stock value and average order value tiles, a reinvestment goal progress bar, and a sales trend chart.',
      width: 1280,
      height: 800,
      status: 'available',
      caption: 'Dashboard from the live demo tenant.',
    },
  },
  {
    slug: 'csv-profiler',
    title: 'csv-profiler',
    tag: 'Claude Code Skill',
    summary:
      'A Claude Code Skill that profiles messy CSV and Excel files, then returns a data-quality report with prioritised cleanup steps.',
    problem:
      'The split is the point: deterministic statistics are Python, interpretation and recommendations are Claude. Null counts, type inference, cardinality, and outlier detection are arithmetic and belong in pandas, where they are reproducible and testable. Deciding which of forty quality issues to fix first is judgement, and that belongs to the model. Knowing where that boundary sits is the differentiator, not code volume. This is a data quality problem solved by someone who does data quality for a living.',
    stack: ['Python', 'pandas', 'Claude Code Skill format', 'pytest', 'GitHub Actions'],
    links: [
      {
        label: 'View repository',
        href: 'https://github.com/reinrmz/csv-profiler',
        primary: true,
      },
    ],
  },
  {
    slug: 'ph-freelancer-tax-calculator',
    title: 'PH Freelancer Tax Calculator',
    tag: 'Domain tool',
    summary:
      'Quarterly tax calculator for Philippine freelancers on the 8% income tax option (non-VAT).',
    problem:
      'The 8% option carries a ₱250,000 annual deduction that has to be applied across quarters rather than claimed all at once, which is where the arithmetic usually goes wrong. The tool tracks the deduction as it is consumed quarter by quarter and shows what is actually owed each filing period.',
    stack: ['Python', 'Streamlit', 'pandas', 'openpyxl', 'Render'],
    links: [
      // The repo name and the live URL deliberately differ: the repo was renamed,
      // the Render service was not. Both are correct as written — do not "fix" either.
      { label: 'Live app', href: 'https://project-exp.onrender.com/', primary: true },
      {
        label: 'Repository',
        href: 'https://github.com/reinrmz/ph-freelancer-tax-calculator',
      },
    ],
    note: 'Hosted on Render’s free tier, so the first request may take 30–60 seconds to wake the service. A calculation aid, not tax advice; filing still happens through eBIRForms.',
    shot: {
      src: '/shots/ph-tax-calculator.webp',
      alt: 'Quarterly tax ledger showing income entered per quarter, the ₱250,000 deduction applied to each, and the resulting taxable and payable amounts with a total tax payable figure.',
      // Must match the file on disk — scripts/optimize-shots.mjs prints these.
      width: 1094,
      height: 1100,
      status: 'available',
      caption: 'The ₱250,000 deduction consuming across quarters.',
    },
  },
  {
    slug: 'data-automation-tooling',
    title: 'Data & Automation Tooling',
    tag: 'Internal tools',
    summary:
      'Python tooling for accounting operations, built and used in production at an accounting services firm.',
    problem:
      'Ledger reconciliation matching, GST and BAS data preparation, government API lookups, and Excel pipeline automation. Each piece replaced a manual spreadsheet step that ran on a fixed schedule. Private client work, so the capability is described here but the implementation is not.',
    stack: ['Python', 'pandas', 'openpyxl', 'Claude Code Skills', 'custom hooks'],
    links: [],
    note: 'Private client work. No repository or live link.',
  },
];

export const FEATURED_PROJECT: Project | undefined = PROJECTS.find((p) => p.featured);
