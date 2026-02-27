import { GitBranch, HomeIcon } from 'lucide-react';
import { Icons } from '@/components/icons.tsx';
import openSource from '@/data/open-source.ts';
import work from '@/data/work.ts';

export const DATA = {
  name: 'Andrés Suárez',
  initials: 'AS',
  url: 'https://andressuarez.dev',
  location: 'Cali, Colombia',
  locationLink: 'https://www.google.com/maps/place/Cali',
  description:
    'Senior Full-Stack Engineer with 9+ years of experience building secure, scalable platforms across SaaS, Fintech, Insurtech, AI, Marketing Automation, GIS, and HealthTech.',
  summary:
    'Senior Full-Stack Engineer with 9+ years of experience building secure, scalable platforms across SaaS, Fintech, Insurtech, AI, Marketing Automation, GIS, and HealthTech. Backend-leaning engineer specializing in Node.js/TypeScript and AWS cloud architecture. Experienced in leading production systems within SOC 2–regulated environments, designing centralized data platforms, and supporting investor technical due diligence. Proven ability to mentor engineers, drive architectural decisions, and deliver reliable systems across cross-functional and multicultural teams. Seeking a long-term product-focused role centered on performance, system design, and sustainable engineering practices.',
  avatarUrl: '/me.jpeg',
  skills: [
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
  ],
  categorizedSkills: {
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
  },
  navbar: [
    { href: '/', icon: HomeIcon, label: 'Home' },
    { href: '/oss', icon: GitBranch, label: 'Open Source' },
    { href: '/blog', icon: Icons.notion, label: 'Blog' },
  ],
  contact: {
    email: 'andresfelipe9619@gmail.com',
    tel: '',
    social: {
      GitHub: {
        name: 'GitHub',
        url: 'https://github.com/andresfelipe9619',
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/suarezdev96',
        icon: Icons.linkedin,
        navbar: true,
      },
      Instagram: {
        name: 'Instagram',
        url: 'https://instagram.com/suarezdev96',
        icon: Icons.instagram,
        navbar: false,
      },
      email: {
        name: 'Send Email',
        url: 'mailto:andresfelipe9619@gmail.com',
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: work,

  education: [
    {
      school: 'Universidad del Valle',
      href: 'https://www.univalle.edu.co',
      degree: 'Bachelor’s in Systems Engineering (in progress)',
      logoUrl: '/univalle.jpg',
      start: '2014',
      end: '—',
    },
    {
      school: 'Self-Learning & Bootcamps',
      href: '#',
      degree: 'Specializations in AWS, SaaS Development, Automation',
      logoUrl: '',
      start: '2016',
      end: 'Present',
    },
  ],
  openSource: openSource,

  projects: [
    {
      title: 'Web Scraping SaaS',
      href: '#',
      dates: '2025',
      active: true,
      description:
        'Scalable SaaS for web scraping with token-based billing and automation. Built backend with Node.js & GraphQL, PostgreSQL persistence, and Dockerized infra on AWS.',
      technologies: ['Node.js', 'GraphQL', 'PostgreSQL', 'AWS', 'Docker'],
      badges: ['SaaS', 'Scraping', 'AWS'],
    },
    {
      title: 'Strapi + AWS Deployments',
      href: '#',
      dates: '2024 - 2025',
      active: true,
      description:
        'Automated Strapi deployments with Postgres/S3, migrations for millions of records, and production-ready infra with Nginx reverse proxy & CI/CD.',
      technologies: ['Strapi', 'AWS', 'PostgreSQL', 'EC2', 'S3', 'Nginx'],
      badges: ['Strapi', 'AWS', 'PostgreSQL'],
    },
    {
      title: 'Catalog + WhatsApp Commerce',
      href: '#',
      dates: '2024',
      active: false,
      description:
        'Lightweight e-commerce catalog with WhatsApp quote requests. Delivered responsive Next.js UI, product families, filters, and cart integration.',
      technologies: ['Next.js', 'TailwindCSS', 'Node.js', 'WhatsApp API'],
      badges: ['Next.js', 'Commerce', 'WhatsApp API'],
    },
  ],
} as const;
