import { GitBranch, HomeIcon } from 'lucide-react';
import { Icons } from '@/components/icons.tsx';

// types for SEO/cards
export type HighContentItem = {
  title: string;
  href: string;
  subtitle: string; // short description
  badges: string[];
  year: string;
  active: boolean;
};

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

  work: [
    {
      company: 'Benekiva',
      href: 'https://benekiva.com',
      badges: [
        'Node.js',
        'TypeScript',
        'GraphQL',
        'PostgreSQL',
        'MongoDB',
        'AWS',
        'Docker',
        'CI/CD',
      ],
      location: 'Remote (US)',
      title: 'Senior Software Engineer',
      logoUrl: '/benekiva.png',
      start: '2021',
      end: '2025',
      description:
        'Led backend engineering and AWS infrastructure for an insurance claims automation SaaS. Delivered secure APIs with Node.js/GraphQL, optimized SQL & NoSQL performance, and built fraud detection services. Implemented CI/CD pipelines, observability, and mentoring of junior devs. Reduced system latency and scaled workloads across multiple regions.',
    },
    {
      company: 'Freelance / Independent',
      href: 'https://andressuarez.dev',
      badges: [
        'Strapi',
        'AWS',
        'Node.js',
        'Next.js',
        'n8n',
        'Make',
        'Dapta',
        'PostgreSQL',
      ],
      location: 'Remote',
      title: 'Full Stack Engineer & Cloud Consultant',
      logoUrl: '/freelance.png',
      start: '2025',
      end: 'Present',
      description:
        'Partnering with startups and agencies to ship production-ready SaaS products and automation systems. Delivered Strapi + AWS architectures, WhatsApp commerce apps, and large-scale web scraping SaaS with token-based billing. Specialized in MVP → production lifecycles: API design, cloud infra, migrations, and performance tuning.',
    },
    {
      company: 'Vibe Coding',
      href: '#',
      badges: ['Node.js', 'Python', 'AWS', 'Automation', 'MVP Development'],
      location: 'Cali, Colombia',
      title: 'Technical Lead',
      logoUrl: '/vibe.png',
      start: '2020',
      end: '2021',
      description:
        'Directed technical development for edtech products. Built Node.js/Python services, cloud infra on AWS, and automation pipelines. Designed MVPs to support scale, aligned with stakeholders to deliver resilient, growth-ready systems.',
    },
  ],

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
  openSource: [
    {
      title: 'Uber-like Open Source App',
      href: '#',
      dates: '2025',
      active: true,
      description:
        'An open-source ride-hailing platform inspired by Uber. Implemented geolocation-based ride matching, real-time driver tracking with WebSockets, and scalable backend APIs. Designed for extensibility and community contribution.',
      technologies: [
        'Node.js',
        'React Native',
        'PostgreSQL',
        'WebSockets',
        'AWS',
      ],
      badges: ['Open Source', 'Node.js', 'React Native', 'Real-time'],
    },
    {
      title: 'Audiobaked (Open Source)',
      href: '#',
      dates: '2025',
      active: true,
      description:
        'Open-source audio processing and streaming platform. Features include baked-in audio effects, podcast hosting, and API integrations for distribution. Built for scalability and developer extensibility.',
      technologies: ['Node.js', 'Go', 'FFmpeg', 'AWS S3', 'PostgreSQL'],
      badges: ['Open Source', 'Node.js', 'Go', 'Audio'],
    },
    {
      title: 'Personal Portfolio (Open Source)',
      href: 'https://andressuarez.dev',
      dates: '2025',
      active: true,
      description:
        'Minimalistic, developer-first portfolio using Magic UI, shadcn, and animations. Open-sourced to help devs showcase their work with a hacker-themed aesthetic.',
      technologies: ['Next.js', 'TailwindCSS', 'Magic UI', 'Vercel'],
      badges: ['Open Source', 'Portfolio', 'Next.js'],
    },
  ],

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

// derive from DATA.openSource
//eslint-disable-next-line
export const OPEN_SOURCE_HIGHLIGHTS: HighContentItem[] = DATA.openSource.map((p) => ({
  title: p.title,
  href: p.href,
  subtitle: p.description,
  badges: [...p.badges],
  year: p.dates,
  active: p.active,
}));
