// Types (optional but recommended)
export type TimelineItem = {
  title: string;
  area?: string; // Industry/sector (Education, Finance, SaaS, etc.)
  kind?: string; // Software class/type (CRM, CMS, GIS, Mobile App, etc.)
  stack?: string[]; // Tech used
  country?: string; // e.g., "Colombia"
  flag?: string; // e.g., "🇨🇴"
};

export type TimelineByYear = Record<string, TimelineItem[]>;

export const TIMELINE_DATA: {
  summary: string;
  asides: string[];
  timeline: TimelineByYear;
} = {
  summary:
    'Innovative **Software & Solutions Engineer** with 8+ years delivering scalable SaaS, cloud, and GIS systems across 11 countries. Recognized for bridging business and technology, leading enterprise engineering, and building open-source projects.',
  asides: [
    '💪 **28+ Projects Delivered**: from SaaS to GIS, every project marks innovation and real-world impact.',
    '🌎 **Global Reach**: successful deliveries in 11 countries prove adaptability in diverse markets.',
    '🐙 **Versatility Across 15 Categories**: e-commerce, healthcare, finance, mining, education, and more.',
    '🏆 **Expert Recognition**: featured in a Codealike interview highlighting measurable engineering excellence.',
    '🚫 **Integrity First**: stood against unfair practices (Workana expulsion) while prioritizing value and transparency.',
    '💡 **Innovation-Driven**: committed to cutting-edge solutions with SaaS, cloud automation, and open source.',
  ],
  timeline: {
    '2015': [
      {
        title: 'Started Information Systems Technology career',
        area: 'Career',
        kind: 'Milestone',
        stack: [],
        country: 'Colombia',
        flag: '🇨🇴',
      },
    ],

    '2017': [
      {
        title: 'Semillero Univalle - Web App',
        area: 'Education',
        kind: 'CMS/Website',
        stack: ['Node.js', 'React', 'PostgreSQL'],
        country: 'Colombia',
        flag: '🇨🇴',
      },
      {
        title: 'Graduation Dinner Univalle - Web App',
        area: 'Education',
        kind: 'EdTech / Event Management',
        stack: ['Node.js', 'React', 'PostgreSQL'],
        country: 'Colombia',
        flag: '🇨🇴',
      },
    ],

    '2018': [
      {
        title: 'Fonvalle - Web App',
        area: 'Finance',
        kind: 'Admin Portal / Website',
        stack: ['Node.js', 'React', 'PostgreSQL'],
        country: 'Colombia',
        flag: '🇨🇴',
      },
      {
        title: 'Topography Degree Work - GIS',
        area: 'Education',
        kind: 'GIS / Spatial Analysis',
        stack: ['Leaflet/Mapbox', 'GeoJSON', 'PostGIS'],
        country: 'Colombia',
        flag: '🇨🇴',
      },
      {
        title: 'H&R Drywall - Web App',
        area: 'Construction',
        kind: 'CRM / Job Tracking',
        stack: ['Node.js', 'React', 'PostgreSQL'],
        country: 'United States',
        flag: '🇺🇸',
      },
      {
        title: 'Open Source: Uber-like Ride App',
        area: 'Transportation',
        kind: 'Mobile / Marketplace',
        stack: ['React Native', 'Node.js', 'PostgreSQL', 'Stripe'],
        country: 'Colombia',
        flag: '🇨🇴',
      },
    ],

    '2019': [
      {
        title: 'Todosurf - GIS',
        area: 'Sports / Surf',
        kind: 'GIS / Spot Maps',
        stack: ['Mapbox GL JS', 'Node.js', 'React'],
        country: 'Spain',
        flag: '🇪🇸',
      },
      {
        title: 'BROOKLYN - CRM & Financial',
        area: 'Finance',
        kind: 'CRM / Billing',
        stack: ['Node.js', 'React', 'MySQL', 'AWS'],
        country: 'United Kingdom',
        flag: '🇬🇧',
      },
      {
        title: 'COGESTEC - Colombia - WebAPP',
        area: 'Business Services',
        kind: 'Admin Portal / Website',
        stack: ['Node.js', 'React', 'PostgreSQL'],
        country: 'Colombia',
        flag: '🇨🇴',
      },
    ],

    '2020': [
      {
        title: 'David Alonso - E-commerce Integration',
        area: 'E-commerce',
        kind: 'Integrations',
        stack: ['Node.js', 'REST APIs', 'Webhook Workers'],
        country: 'Mexico',
        flag: '🇲🇽',
      },
      {
        title: 'Sentir Creativo - Web App & CMS',
        area: 'Creative Industry',
        kind: 'CMS/Website',
        stack: ['Strapi', 'Next.js', 'PostgreSQL'],
        country: 'Chile',
        flag: '🇨🇱',
      },
      {
        title: 'Falconeye - GIS',
        area: 'Geospatial',
        kind: 'GIS Dashboard',
        stack: ['Node.js', 'React', 'Mapbox'],
        country: 'Dominican Republic',
        flag: '🇩🇴',
      },
    ],

    '2021': [
      {
        title: 'COVID-19 - Personal/Professional Growth',
        area: 'Career',
        kind: 'Milestone',
        stack: [],
      },
      {
        title: 'Exited University due to personal difficulties',
        area: 'Career',
        kind: 'Milestone',
        stack: [],
      },
    ],

    '2022': [
      {
        title: 'Ronald Domingues - AWS Implementation',
        area: 'Cloud / Consulting',
        kind: 'Cloud Migration / Infra-as-Code',
        stack: ['AWS (EC2, RDS, S3, Lambda)', 'Terraform/CloudFormation'],
        country: 'Brazil',
        flag: '🇧🇷',
      },
      {
        title: 'Manuel Mendoza - AWS Integration',
        area: 'Cloud / Consulting',
        kind: 'Cloud Integration',
        stack: ['AWS (API Gateway, Lambda, S3)', 'Node.js'],
        country: 'Mexico',
        flag: '🇲🇽',
      },
      {
        title: 'Klazia - Strapi Migration & FinOps on AWS',
        area: 'Content Platforms',
        kind: 'CMS Migration / FinOps',
        stack: ['Strapi', 'AWS (EC2, RDS, S3)', 'PostgreSQL'],
        country: 'Colombia',
        flag: '🇨🇴',
      },
      {
        title: 'Lawyers SaaS',
        area: 'Legal',
        kind: 'SaaS',
        stack: ['Node.js', 'React', 'PostgreSQL', 'AWS'],
        country: 'Colombia',
        flag: '🇨🇴',
      },
      {
        title: 'Cinekomuna - Performance Optimization',
        area: 'Media / Streaming',
        kind: 'Performance Tuning',
        stack: ['Node.js', 'React', 'CDN / Caching'],
        country: 'Mexico',
        flag: '🇲🇽',
      },
      {
        title: 'John Daza - WebApp',
        area: 'Business Services',
        kind: 'CMS/Website',
        stack: ['Next.js', 'Node.js', 'PostgreSQL'],
        country: 'Colombia',
        flag: '🇨🇴',
      },
    ],

    '2023': [
      {
        title: 'GSOFT - End-to-End SaaS',
        area: 'SaaS',
        kind: 'Multi-tenant Platform',
        stack: ['Node.js', 'React', 'PostgreSQL', 'AWS'],
        country: 'Mexico',
        flag: '🇲🇽',
      },
      {
        title: 'Javier Garaeta - AWS Optimization',
        area: 'Cloud / Consulting',
        kind: 'Cost Optimization / Performance',
        stack: ['AWS (Cost Explorer, Lambda, EC2)', 'Observability'],
        country: 'Spain',
        flag: '🇪🇸',
      },
      {
        title: 'Ángela Rivero - Google Sheets + Slack Script',
        area: 'Automation',
        kind: 'ChatOps / Scripting',
        stack: ['Google Apps Script', 'Slack API'],
        country: 'Ecuador',
        flag: '🇪🇨',
      },
      {
        title: 'Pevgrow - QA Consulting',
        area: 'E-commerce',
        kind: 'QA / Consulting',
        stack: ['Playwright/Jest', 'CI/CD'],
        country: 'Spain',
        flag: '🇪🇸',
      },
      {
        title: 'Proaxdata - GIS',
        area: 'Data / Analytics',
        kind: 'GIS / Mapping',
        stack: ['Mapbox', 'Node.js', 'React'],
        country: 'Mexico',
        flag: '🇲🇽',
      },
      {
        title: 'Adlyceum - Node.js & React Performance',
        area: 'Technology',
        kind: 'Performance Tuning',
        stack: ['Node.js', 'React', 'Profiling/Tracing'],
        country: 'Costa Rica',
        flag: '🇨🇷',
      },
      {
        title: 'Javeriana - Mobile App',
        area: 'Education',
        kind: 'Mobile App',
        stack: ['React Native', 'Node.js'],
        country: 'Colombia',
        flag: '🇨🇴',
      },
      {
        title: 'Kuno Digital - Make & CRM Integrations',
        area: 'Marketing',
        kind: 'CRM / Automation',
        stack: ['Make (Integromat)', 'REST APIs', 'Webhook Workers'],
        country: 'Panama',
        flag: '🇵🇦',
      },
      {
        title: 'Freelaw - Docker Implementation',
        area: 'Legal',
        kind: 'DevOps / Containerization',
        stack: ['Docker', 'CI/CD'],
        country: 'Chile',
        flag: '🇨🇱',
      },
      {
        title: 'Expelled from Workana for integrity stance',
        area: 'Career',
        kind: 'Milestone',
        stack: [],
      },
    ],

    '2024': [
      {
        title: 'Joseph Cook - AWS Implementation',
        area: 'Cloud / Consulting',
        kind: 'Cloud Implementation',
        stack: ['AWS (API Gateway, Lambda, S3, RDS)', 'Node.js'],
        country: 'United States',
        flag: '🇺🇸',
      },
      {
        title: 'Torc - Codealike Interview',
        area: 'Recognition',
        kind: 'Interview',
        stack: [],
        country: 'United States',
        flag: '🇺🇸',
      },
      {
        title: 'Pizzaamericana - Salesmanago Integration',
        area: 'E-commerce / Restaurants',
        kind: 'Marketing Automation',
        stack: ['Salesmanago API', 'Node.js'],
        country: 'Panama',
        flag: '🇺🇵🇦',
      },
      {
        title: 'El Hornero - Salesmanago Consultancy',
        area: 'E-commerce / Restaurants',
        kind: 'Marketing Automation / Consultancy',
        stack: ['Salesmanago', 'Data Mapping'],
        country: 'Panama',
        flag: '🇺🇵🇦',
      },
      {
        title: 'Caribescorts - Web App',
        area: 'Personal Services',
        kind: 'CMS/Website',
        stack: ['Next.js', 'Node.js'],
        country: 'Dominican Republic',
        flag: '🇩🇴',
      },
      {
        title: 'Bachillerato en Casa - EdTech',
        area: 'Education',
        kind: 'Learning Platform',
        stack: ['Next.js', 'Node.js', 'PostgreSQL'],
        country: 'Colombia',
        flag: '🇨🇴',
      },
      {
        title: 'Usermuse - SaaS Contributions',
        area: 'SaaS',
        kind: 'Feature Development',
        stack: ['Node.js', 'React', 'AWS'],
        country: 'Israel',
        flag: '🇮🇱',
      },
    ],

    '2025': [
      {
        title: 'Open Source: Audiobaked Platform',
        area: 'Media',
        kind: 'Audio Processing / CMS',
        stack: ['Next.js', 'Node.js', 'PostgreSQL', 'FFmpeg'],
      },
      {
        title: 'Open Source: Personal Portfolio',
        area: 'Portfolio',
        kind: 'Website',
        stack: ['Vite', 'React', 'TypeScript', 'shadcn/ui', 'Tailwind'],
      },
      {
        title: 'Next one…',
        area: 'Career',
        kind: 'Milestone',
        stack: [],
      },
    ],
  },
};
