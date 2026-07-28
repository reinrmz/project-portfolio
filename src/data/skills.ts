export interface SkillGroup {
  readonly name: string;
  readonly items: readonly string[];
  /** Optional trailing note, e.g. a certification tied to the group. */
  readonly note?: string;
}

export interface Credential {
  readonly title: string;
  readonly detail?: string;
}

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    name: 'Data engineering',
    items: [
      'ETL pipeline design',
      'Ingestion',
      'Transformation',
      'Data quality',
      'Legacy warehouse migration',
    ],
  },
  {
    name: 'AWS',
    items: [
      'S3',
      'Glue',
      'Lambda',
      'Step Functions',
      'ECS / ECR',
      'Athena',
      'Redshift',
      'Aurora',
      'RDS',
    ],
    note: 'AWS Certified Cloud Practitioner',
  },
  {
    name: 'AI & agents',
    items: [
      'Claude Code Skills',
      'Hooks',
      'Subagents',
      'MCP servers',
      'Agent SDK',
      'Microsoft Copilot Studio',
      'genAI integration',
    ],
  },
  {
    name: 'Languages & data',
    items: ['Python', 'PySpark', 'SQL (PostgreSQL, MySQL, T-SQL)', 'TypeScript'],
  },
  {
    name: 'Web',
    items: ['Next.js', 'AngularJS', 'Node.js', 'Tailwind'],
  },
  {
    name: 'Practice',
    items: ['Git', 'Azure DevOps CI/CD', 'Agile / Scrum'],
  },
];

export const CREDENTIALS: readonly Credential[] = [
  { title: 'AWS Certified Cloud Practitioner' },
  { title: 'Licensed Electronics Engineer', detail: 'ECE' },
  { title: 'Licensed Electronics Technician', detail: 'ECT' },
  {
    title: 'BS Electronics Engineering',
    detail: 'Saint Louis University, Baguio City',
  },
];
