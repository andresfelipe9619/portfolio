import { SKILLS_DICT } from './skills-dict';

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
  SKILLS_DICT.NODEJS,
  SKILLS_DICT.TYPESCRIPT,
  SKILLS_DICT.REACT,
  SKILLS_DICT.NEXTJS,
  SKILLS_DICT.POSTGRESQL,
  SKILLS_DICT.MONGODB,
  SKILLS_DICT.GRAPHQL,
  SKILLS_DICT.PYTHON,
  SKILLS_DICT.GO,
  SKILLS_DICT.AWS,
  SKILLS_DICT.DOCKER,
  SKILLS_DICT.STRAPI,
  SKILLS_DICT.AUTOMATION_N8N_MAKE_DAPTA,
] as const;

export const CATEGORIZED_SKILLS = {
  'Backend Engineering': [
    SKILLS_DICT.NODEJS,
    SKILLS_DICT.TYPESCRIPT,
    SKILLS_DICT.EXPRESS,
    SKILLS_DICT.NESTJS,
    SKILLS_DICT.GRAPHQL,
    SKILLS_DICT.REST_APIS,
    SKILLS_DICT.MICROSERVICES,
    SKILLS_DICT.AWS_SQS,
    SKILLS_DICT.BACKGROUND_JOBS,
    SKILLS_DICT.ETL,
    SKILLS_DICT.AUTH,
  ],
  'Cloud & Infrastructure': [
    SKILLS_DICT.AWS,
    SKILLS_DICT.AWS_LAMBDA,
    SKILLS_DICT.AWS_API_GATEWAY,
    SKILLS_DICT.RDS,
    SKILLS_DICT.DYNAMODB,
    SKILLS_DICT.AWS_S3,
    SKILLS_DICT.AWS_CLOUDFRONT,
    SKILLS_DICT.AWS_CDK,
    SKILLS_DICT.AWS_CLOUDFORMATION,
    SKILLS_DICT.DOCKER,
    SKILLS_DICT.CICD,
    SKILLS_DICT.FINOPS,
    SKILLS_DICT.OBSERVABILITY,
  ],
  'AI & Automation': [
    SKILLS_DICT.AWS_BEDROCK,
    SKILLS_DICT.LANGCHAIN,
    SKILLS_DICT.PROMPT_ENGINEERING,
    SKILLS_DICT.OPENAI,
    SKILLS_DICT.ANTHROPIC,
    SKILLS_DICT.GEMINI,
    SKILLS_DICT.AI_WORKFLOWS,
  ],
  'Frontend Engineering': [
    SKILLS_DICT.REACT,
    SKILLS_DICT.NEXTJS,
    SKILLS_DICT.REACT_NATIVE,
    SKILLS_DICT.STATE_MANAGEMENT,
    'GIS (Mapbox/Leaflet)',
    SKILLS_DICT.D3,
  ],
  'Data & Architecture': [
    SKILLS_DICT.POSTGRESQL,
    SKILLS_DICT.MYSQL,
    SKILLS_DICT.MONGODB,
    SKILLS_DICT.DATA_MODELING,
    'Multi-tenant SaaS',
    'High-volume Systems',
  ],
  'Security & Governance': [
    SKILLS_DICT.SOC2,
    SKILLS_DICT.SECURE_SDLC,
    SKILLS_DICT.DUE_DILIGENCE,
    SKILLS_DICT.RBAC,
    SKILLS_DICT.ENCRYPTION,
    SKILLS_DICT.GUARDDUTY,
    SKILLS_DICT.IAM,
    SKILLS_DICT.KMS,
  ],
} as const;
