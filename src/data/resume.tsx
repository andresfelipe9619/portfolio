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
    'Senior Software & Solutions Engineer | Cloud Architect | SaaS & Automation Builder',
  summary:
    'Software & Solutions Engineer with 8+ years of experience designing and delivering production-grade systems across SaaS, cloud, e-commerce, and GIS. Specialized in automation, web scraping, and AWS infrastructure. I’ve led enterprise engineering teams (Benekiva), launched independent SaaS products, and delivered 28+ international projects across 11 countries. Adept at bridging business goals and technology, I thrive on building scalable, impactful software products.',
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
  navbar: [
    { href: '/', icon: HomeIcon, label: 'Home' },
    { href: '/open-source', icon: GitBranch, label: 'Open Source' },
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
      logoUrl: '/univalle.png',
      start: '2014',
      end: '—',
    },
    {
      school: 'Self-Learning & Bootcamps',
      href: '#',
      degree: 'Specializations in AWS, SaaS Development, Automation',
      logoUrl: '/self.png',
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

