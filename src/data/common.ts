export const PROFILE = {
  name: 'Andrés Suárez',
  initials: 'AS',
  url: 'https://andressuarez.dev',
  location: 'Cali, Colombia',
  locationLink: 'https://www.google.com/maps/place/Cali',
  avatarUrl: '/me.jpeg',

  // The very short pitch used in hero or top level description
  description:
    'Senior Full-Stack Engineer with 9+ years of experience building secure, scalable platforms across SaaS, Fintech, Insurtech, AI, Marketing Automation, GIS, and HealthTech.',

  // The timeline / shorter summary
  summary:
    'Innovative **Software & Solutions Engineer** with 8+ years delivering scalable SaaS, cloud, and GIS systems across 11 countries. Recognized for bridging business and technology, leading enterprise engineering, and building open-source projects.',

  // The longer, more detailed summary for the resume
  longSummary:
    'Senior Full-Stack Engineer with 9+ years of experience building secure, scalable platforms across SaaS, Fintech, Insurtech, AI, Marketing Automation, GIS, and HealthTech. Backend-leaning engineer specializing in Node.js/TypeScript and AWS cloud architecture. Experienced in leading production systems within SOC 2–regulated environments, designing centralized data platforms, and supporting investor technical due diligence. Proven ability to mentor engineers, drive architectural decisions, and deliver reliable systems across cross-functional and multicultural teams. Seeking a long-term product-focused role centered on performance, system design, and sustainable engineering practices.',
} as const;

export const SKILLS = [
  'Node.js',
  'TypeScript',
  'React',
  'Next.js',
  'PostgreSQL',
  'MongoDB',
  'GraphQL',
  'Python',
  'Go',
  'AWS',
  'Docker',
  'Strapi',
  'Automation (n8n, Make, Dapta)',
] as const;

export const CATEGORIZED_SKILLS = {
  'Backend Engineering': [
    'Node.js',
    'TypeScript',
    'Express',
    'NestJS',
    'GraphQL',
    'RESTful APIs',
    'Microservices',
    'Event-Driven (SNS/SQS)',
    'Background Jobs',
    'ETL',
    'Auth (JWT/Cognito/SSO)',
  ],
  'Cloud & Infrastructure': [
    'AWS',
    'Lambda',
    'API Gateway',
    'RDS',
    'DynamoDB',
    'S3',
    'CloudFront',
    'CDK',
    'CloudFormation',
    'Docker',
    'CI/CD',
    'FinOps',
    'Observability',
  ],
  'AI & Automation': [
    'AWS Bedrock',
    'LangChain',
    'Prompt Engineering',
    'OpenAI',
    'Anthropic',
    'Gemini',
    'AI Workflows',
  ],
  'Frontend Engineering': [
    'React',
    'Next.js',
    'React Native',
    'State Management (Redux/Context)',
    'GIS (Mapbox/Leaflet)',
    'Data Viz (D3.js)',
  ],
  'Data & Architecture': [
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Data Modeling',
    'Multi-tenant SaaS',
    'High-volume Systems',
  ],
  'Security & Governance': [
    'SOC 2 Type II',
    'Secure SDLC',
    'Tech Due Diligence',
    'RBAC',
    'Encryption',
    'GuardDuty',
    'IAM',
    'KMS',
  ],
} as const;
