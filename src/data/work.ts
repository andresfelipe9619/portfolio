import { SKILLS_DICT } from './skills-dict';

const work = [
  {
    company: 'Turnstile',
    href: 'https://turnstile.ai',
    badges: [
      SKILLS_DICT.REACT,
      SKILLS_DICT.NODEJS,
      SKILLS_DICT.POSTGRESQL,
      SKILLS_DICT.STRIPE,
      SKILLS_DICT.TWILIO,
    ],
    location: 'Remote',
    title: 'Product Engineer',
    logoUrl: '/turnstile.png',
    start: 'Sept 2025',
    end: 'February 2026',
    description:
      'MVP to Market-Fit: Partnering with technical founders to build a category-defining SaaS product, translating complex business logic into a scalable React/Node.js stack. Engineered mission-critical integrations with Stripe, Twilio, Segment, and Salesforce. Designed robust REST/GraphQL APIs and PostgreSQL schemas optimized for high-velocity startup iterations.',
  },
  {
    company: 'HireWorks — Client: Benekiva/Ro',
    href: 'https://benekiva.com',
    badges: [
      SKILLS_DICT.AWS,
      SKILLS_DICT.AWS_LAMBDA,
      SKILLS_DICT.RDS,
      SKILLS_DICT.AWS_S3,
      'Braze',
    ],
    location: 'Remote',
    title: 'Senior Full-Stack Engineer (Contract)',
    logoUrl: '/benekiva.jpeg',
    start: 'Apr 2025',
    end: 'Sept 2025',
    description:
      'Lifecycle Architecture: Architected complex patient journey eventing for Ro, utilizing Braze, webhooks, and HTML templates. Developed real-time dashboards for marketing KPIs. Acted as SME for reliability, implementing secure AWS architectures aligned with SOC 2 Type II compliance.',
  },
  {
    company: 'Usermuse.AI',
    href: '#',
    badges: [
      SKILLS_DICT.LANGCHAIN,
      SKILLS_DICT.REACT,
      SKILLS_DICT.FIREBASE,
      SKILLS_DICT.OPENAI,
      SKILLS_DICT.ANTHROPIC,
      SKILLS_DICT.GEMINI,
    ],
    location: 'Remote',
    title: 'Senior Software Engineer (AI Specialist)',
    logoUrl: '/evermuse.jpeg',
    start: 'Oct 2024',
    end: 'Jan 2025',
    description:
      'AI Orchestration: Developed an intelligent requirement-gathering engine using LangChain, focusing on multi-model workflows. Built full-stack features using React and Firebase to transform customer conversations into actionable roadmap signals. Integrated major AI APIs for high-velocity prototyping.',
  },
  {
    company: 'Brooklyn Vendor Assurance',
    href: 'https://www.brooklynsolutions.ai',
    badges: [
      SKILLS_DICT.AWS_BEDROCK,
      SKILLS_DICT.AWS_CDK,
      SKILLS_DICT.AWS_CLOUDFORMATION,
    ],
    location: 'Remote',
    title: 'Lead Full-Stack Developer / Engineering Lead',
    logoUrl: '/brooklyn.jpeg',
    start: 'Dec 2018',
    end: 'Apr 2025',
    description:
      'Investment & Due Diligence: Served as Technical Lead during investor audits. GenAI Pioneering: Led integration of generative AI workflows using AWS Bedrock and Anthropic Claude. Established SDLC governance and mentored engineers. Orchestrated heavy AWS environments, achieving a 90% reduction in vulnerabilities.',
  },
  {
    company: 'Kuno Digital',
    href: 'https://kunodigital.com/',
    badges: [
      SKILLS_DICT.MAKE,
      SKILLS_DICT.WHATSAPP,
      SKILLS_DICT.CRM,
      SKILLS_DICT.MARKETING_AUTOMATION,
    ],
    location: 'Panama (Remote)',
    title: 'Senior Technical Consultant (Embedded)',
    logoUrl: '/kuno-digital.png',
    start: '2023',
    end: '2023',
    description:
      'Served as primary technical authority for marketing automation and system integrations. Architected integrations for WhatsApp, SalesManago, and Kommo CRM, and mentored technical staff.',
  },
  {
    company: 'Atentamente',
    href: 'https://atentamente.mx/',
    badges: [SKILLS_DICT.RDS, SKILLS_DICT.POSTGRESQL, SKILLS_DICT.STRAPI],
    location: 'Mexico (Remote)',
    title: 'Platform Architect & Data Engineering Consultant',
    logoUrl: '/atentamente.png',
    start: '2023',
    end: '2023',
    description:
      'Led consolidation of fragmented data sources into a centralized AWS-based platform. Designed PostgreSQL infrastructure and built an internal data management dashboard using Strapi.',
  },
  {
    company: 'Proaxdata',
    href: '#',
    badges: [SKILLS_DICT.GIS, SKILLS_DICT.MAPBOX, 'Google Apps'],
    location: 'Mexico (Remote)',
    title: 'Lead GIS Solutions Architect',
    logoUrl: '',
    start: '2023',
    end: '2023',
    description:
      'Designed geospatial visualization platform. Built automation workflows using Google Apps Script and Sheets, and implemented Mapbox performance optimizations.',
  },
  {
    company: 'Pontificia Universidad Javeriana',
    href: 'https://www.javerianacali.edu.co/',
    badges: [
      SKILLS_DICT.MOBILE,
      SKILLS_DICT.ANDROID,
      SKILLS_DICT.IOS,
      SKILLS_DICT.BIOMETRIC_AUTH,
    ],
    location: 'Colombia',
    title: 'Mobile Application Stabilization Engineer',
    logoUrl: '/javeriana.png',
    start: '2023',
    end: '2023',
    description:
      'Resolved critical bugs, implemented missing features, and improved authentication flows with Biometric on Android and iOS. Stabilized application for production readiness.',
  },
  {
    company: 'Klazia',
    href: 'https://klazia.com/',
    badges: [SKILLS_DICT.AWS, SKILLS_DICT.STRAPI, SKILLS_DICT.FINOPS],
    location: 'Colombia (Remote)',
    title: 'AWS & Strapi Migration Consultant',
    logoUrl: '/klazia.jpg',
    start: '2022',
    end: '2022',
    description:
      'Led Strapi upgrade and backend restructuring. Refined AWS infrastructure to improve performance and reduce costs via FinOps practices.',
  },
  {
    company: 'Cinekomuna',
    href: '#',
    badges: [
      SKILLS_DICT.MONGODB,
      SKILLS_DICT.AWS_EC2,
      SKILLS_DICT.AWS_S3,
      SKILLS_DICT.AWS_CLOUDWATCH,
    ],
    location: 'Mexico (Remote)',
    title: 'Lead Backend Developer / DevOps Consultant',
    logoUrl: '/cinekomuna.jpg',
    start: '2022',
    end: '2022',
    description:
      'Refactored backend services and optimized MongoDB indexing. Improved observability and AWS infrastructure reliability.',
  },
  {
    company: 'Factoring Abogados',
    href: 'https://factoringabogados.com/',
    badges: [
      'AWS Amplify',
      SKILLS_DICT.AWS_COGNITO,
      SKILLS_DICT.AWS_LAMBDA,
      SKILLS_DICT.AWS_SNS,
      SKILLS_DICT.RDS,
    ],
    location: 'Colombia (Remote)',
    title: 'AWS & Multi-Tenant Architecture Consultant',
    logoUrl: '/factoring-abogados.svg',
    start: '2022',
    end: '2022',
    description:
      'Designed secure multi-tenant judicial case automation platform. Built event-driven processing and secure authentication layers.',
  },
  {
    company: 'TODOSURF',
    href: '#',
    badges: [
      SKILLS_DICT.REACT,
      SKILLS_DICT.LEAFLET,
      SKILLS_DICT.GIS,
      'API Integration',
    ],
    location: 'Spain (Remote)',
    title: 'Web & GIS Engineer',
    logoUrl: '/todosurf.png',
    start: '2019',
    end: '2019',
    description:
      'Developed real-time surf conditions web application using React and Leaflet. Integrated multiple public APIs for environmental data and designed interactive GIS map interface.',
  },
];

export default work;
