export interface ExperienceRole {
  /** Role label shown as the bullet's lead-in, e.g. "AWS Administrator". */
  readonly label: string;
  readonly detail: string;
  /**
   * Marks the strongest signals in an entry. Emphasised roles render their label
   * in the accent colour so a 30-second skim lands on them first.
   */
  readonly emphasis?: boolean;
}

export interface ExperienceEntry {
  readonly company: string;
  readonly role: string;
  /** Display string for the date range, e.g. "2024 —". */
  readonly period: string;
  /** Machine-readable start year, used for the <time> datetime attribute. */
  readonly startYear: string;
  readonly endYear: string | null;
  /** Optional scope-setting paragraph rendered above the role bullets. */
  readonly scope?: string;
  readonly roles: readonly ExperienceRole[];
}

export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    company: 'BTG International',
    role: 'Data Engineer',
    period: '2024 – present',
    startYear: '2024',
    endYear: null,
    scope:
      'Design, build, and optimise data pipelines and ETL processes into the data warehouse. Build and maintain the data models and schemas behind analytics and reporting.',
    roles: [
      {
        label: 'AWS Administrator',
        detail:
          'Administer the AWS infrastructure behind multiple web applications, data engineering workloads, and databases: availability, security, and operational stability across environments.',
        emphasis: true,
      },
      {
        label: 'Agent tooling',
        detail:
          'Built Claude Code skills, hooks, and agent tooling for internal accounting and reconciliation workflows.',
        emphasis: true,
      },
      {
        label: 'Individual Contributor',
        detail:
          'Automation and reporting solutions built to business requirements; data cleansing, validation, and analysis in Python for cross-functional teams.',
      },
    ],
  },
  {
    company: 'Accenture',
    role: 'Data Engineering Analyst',
    period: '2021 – 2024',
    startYear: '2021',
    endYear: '2024',
    scope:
      'Applied data engineering principles to reusable workflows: ingestion, quality, transformation, optimisation. Scalable ETL pipelines, production deployment, and a legacy data warehouse migration built on cloud architecture principles.',
    roles: [
      {
        label: 'Lead ETL Developer',
        detail:
          'Led a team building DB and ETL processes. Delivered roughly five end-to-end orchestrations: extraction from RDS, transformation via AWS Glue, loading into Redshift and Aurora. Built on Step Functions, Glue, Lambda, ECR, and ECS.',
        emphasis: true,
      },
      {
        label: 'Front-End Web Developer',
        detail: 'AngularJS front-end work in TypeScript, HTML, and CSS.',
      },
    ],
  },
  {
    company: 'PLDT Inc.',
    role: 'Internship',
    period: '2019',
    startYear: '2019',
    endYear: '2019',
    roles: [
      {
        label: 'Customer Experience Zone and Core Network Operations',
        detail: '',
      },
    ],
  },
];
