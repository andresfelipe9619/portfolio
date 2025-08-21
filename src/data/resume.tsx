import { Icons } from '@/components/icons';
import { HomeIcon, NotebookIcon } from 'lucide-react';

export const DATA = {
  name: 'Andrés Suárez',
  initials: 'AS',
  url: 'https://andressuarez.dev',
  location: 'Cali, Colombia',
  locationLink: 'https://www.google.com/maps/place/Cali',
  description:
    'Senior Software Engineer | Cloud & Automation Expert | SaaS Builder',
  summary:
    'Senior Software Engineer with 8+ years of experience delivering backend, full-stack, and cloud-based systems. Specialized in automation, SaaS platforms, and infrastructure on AWS. After leading engineering at Benekiva, I transitioned into freelance and SaaS projects, where I design and implement production-grade solutions — from APIs and web scraping platforms to automation workflows and scalable Strapi deployments.',
  avatarUrl: '/me.png',
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
    { href: '/blog', icon: NotebookIcon, label: 'Blog' },
  ],
  contact: {
    email: 'hello@andressuarez.dev',
    tel: '',
    social: {
      GitHub: {
        name: 'GitHub',
        url: 'https://github.com/andressuarez',
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/andres-suarez-dev',
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: 'X',
        url: 'https://x.com/andressuarezdev',
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: 'Send Email',
        url: 'mailto:hello@andressuarez.dev',
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
        'Led backend engineering and infrastructure for the insurance claims automation platform. Designed and implemented scalable APIs in Node.js/TypeScript and GraphQL. Optimized PostgreSQL and MongoDB queries for large datasets, reducing latency in critical workflows. Built and deployed fraud detection and data validation services using AWS and Docker. Implemented CI/CD pipelines and SSL/TLS configurations to strengthen system security. Collaborated with cross-functional teams to deliver enterprise features and mentored junior developers in backend best practices.',
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
        'Partnering with startups and agencies to ship production-ready SaaS products and automation systems. Delivered Strapi + AWS architectures, WhatsApp-integrated catalogs, and custom automation flows with n8n, Make, and Dapta. Designed and deployed scalable web scraping SaaS platforms with token-based billing. Specialized in bringing projects from MVP to production: API design, database migrations, cloud infra, observability, and performance tuning.',
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
        'Directed technical development for educational software products. Architected cloud infrastructure on AWS and implemented automation pipelines for online education systems. Built Node.js and Python-based services to handle scale, designed resilient MVPs to support growth, and collaborated with business stakeholders to align technical roadmap with product goals.',
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

  projects: [
    {
      title: 'Web Scraping SaaS',
      href: '#',
      dates: '2025',
      active: true,
      description:
        'Built a SaaS platform for scalable and customizable web scraping. Designed token-based billing and user management. Architected backend in Node.js and GraphQL, integrated SQLite for lightweight jobs and PostgreSQL for production persistence. Deployed on AWS with Docker, using queues and retries for high reliability. Optimized for performance, security, and monitoring.',
      technologies: [
        'Node.js',
        'GraphQL',
        'PostgreSQL',
        'SQLite',
        'AWS',
        'Docker',
      ],
      badges: ['Node.js', 'GraphQL', 'PostgreSQL', 'AWS', 'Docker', 'SaaS'],
      links: [],
      image: '',
      video: '',
    },
    {
      title: 'Strapi + AWS Deployments',
      href: '#',
      dates: '2024 - 2025',
      active: true,
      description:
        'Automated Strapi deployments with PostgreSQL and S3 for startups and agencies. Implemented migration scripts for millions of records, performance-optimized queries, and parallel imports. Configured Nginx reverse proxy with SSL, production-ready EC2/S3 integrations, and CI/CD pipelines. Focused on high availability, scalability, and developer-friendly workflows.',
      technologies: [
        'Strapi',
        'AWS',
        'PostgreSQL',
        'EC2',
        'S3',
        'Nginx',
        'CI/CD',
      ],
      badges: ['Strapi', 'AWS', 'PostgreSQL', 'EC2', 'S3', 'Nginx'],
      links: [],
      image: '',
      video: '',
    },
    {
      title: 'Catalog + WhatsApp Commerce',
      href: '#',
      dates: '2024',
      active: false,
      description:
        'Developed an e-commerce catalog application with product families, search, filters, and detailed pages. Built a cart system that allowed users to request quotes directly via WhatsApp. Designed a clean UI with Next.js and Tailwind, ensuring responsive performance. Delivered as a lightweight solution for SMEs seeking quick digital adoption.',
      technologies: ['Next.js', 'TailwindCSS', 'Node.js', 'WhatsApp API'],
      badges: ['Next.js', 'TailwindCSS', 'WhatsApp API', 'Node.js'],
      links: [],
      image: '',
      video: '',
    },
  ],

  hackathons: [
    {
      title: 'Campus Hackathons',
      dates: '2015 - 2017',
      location: 'Cali, Colombia',
      description:
        'Participated in multiple local hackathons, building MVPs within 48 hours: AR-based education apps, automation tools, and AI prototypes. Gained early experience in rapid prototyping, teamwork, and pitching technical ideas.',
      image: '/hackathon.png',
      badges: ['Hackathons', 'MVP Development', 'Teamwork'],
      links: [],
    },
  ],
} as const;
