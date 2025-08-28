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
      title: 'Car Booking App (React Native)',
      href: 'https://github.com/andresfelipe9619/car-booking-app',
      dates: '2018-11',
      active: true,
      description:
        'Uber-like booking flows with maps, routing, and clean state. A battle-tested example of mobile product thinking—logic first, pixels second.',
      technologies: [
        'React Native',
        'React Native Maps',
        'Google Places',
        'JavaScript',
        'iOS/Android',
      ],
      badges: ['Most-starred (46★)', 'Mobile', 'Maps', 'Routing'],
    },
    {
      title: 'AudioBaked (CLI)',
      href: 'https://github.com/andresfelipe9619/AudioBaked',
      dates: '2025-08',
      active: true,
      description:
        'Transcribe, diarize, subtitle, and summarize audio/video from the command line. WhisperX accuracy + GPT analysis for notes, action items, and budgets.',
      technologies: ['Python', 'WhisperX', 'ffmpeg', 'OpenAI API'],
      badges: ['AI/ML', 'Transcription', 'CLI', 'Audio'],
    },
    {
      title: 'Prophet Playground',
      href: 'https://github.com/andresfelipe9619/prophet-playground',
      dates: '2024',
      active: true,
      description:
        'Forecasting sandbox with Prophet/ARIMA/XGBoost. Includes cross-validation, metrics (MAE/RMSE), and plotting for quick model selection.',
      technologies: ['Python', 'Prophet', 'ARIMA', 'XGBoost', 'Matplotlib'],
      badges: ['Data', 'Forecasting', 'Analytics'],
    },
    {
      title: 'SES Bounce Dynamo',
      href: 'https://github.com/andresfelipe9619/ses-bounce-dynamo',
      dates: '2022-06',
      active: true,
      description:
        'AWS Lambda microservice to capture SES bounces/complaints and store structured events in DynamoDB for audit and deliverability ops.',
      technologies: ['Node.js', 'AWS Lambda', 'AWS SES', 'DynamoDB'],
      badges: ['Serverless', 'Email', 'DevOps'],
    },
    {
      title: 'Java Battleship',
      href: 'https://github.com/andresfelipe9619/Java-Battleship',
      dates: '2017-11',
      active: false,
      description:
        'Classic Battleship built with pure Java + MySQL. A throwback that still demonstrates fundamentals in state, I/O, and simple UIs.',
      technologies: ['Java', 'MySQL'],
      badges: ['Classic', 'Game'],
    },
    {
      title: 'Personal Portfolio (Open Source)',
      href: 'https://github.com/andresfelipe9619/portfolio',
      dates: '2025-08',
      active: true,
      description:
        'Developer-first portfolio using Vite + React with Magic UI/shadcn. Minimal, fast, and extensible for senior-grade presentation.',
      technologies: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Vercel'],
      badges: ['Open Source', 'Portfolio', 'Frontend'],
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
export const OPEN_SOURCE_HIGHLIGHTS: HighContentItem[] = DATA.openSource.map(
  (p) => ({
    title: p.title,
    href: p.href,
    subtitle: p.description,
    badges: [...p.badges],
    year: p.dates,
    active: p.active,
  }),
);
