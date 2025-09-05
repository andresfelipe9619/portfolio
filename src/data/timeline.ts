export type TimelineItem = {
  title: string;
  area?: string;
  kind?: string;
  stack?: string[];
  country?: string;
  description?: string;
  review?: string;
  flag?: string;

  client?: string;
  location?: string;
  date?: string;
  role?: string;
  links?: { label: string; href: string }[];

  summary?: string;
  objectives?: string[];
  scope?: string[];
  achievements?: string[];
  challenges?: string[];
  solutions?: string[];
  testimonial?: string;

  highlight?: boolean;
  tags?: string[];
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
        area: 'Education / Events',
        kind: 'Registration & Access System',
        stack: ['Google Apps Script', 'jQuery', 'Semantic UI'],
        country: 'Colombia',
        flag: '🇨🇴',

        client: 'Universidad del Valle',
        location: 'Colombia',
        date: '2017',
        role: 'Web Application Developer',
        links: [{ label: 'Project Link', href: 'Univalle Alumni Dinner' }],

        summary:
          'Web system for registration and access control of the Univalle alumni dinner with QR codes and automation.',
        objectives: [
          'Provide secure and simple registration.',
          'Automate access control and attendance.',
          'Strengthen the relationship with the alumni community.',
        ],
        achievements: [
          '85% increase in registrations.',
          '250% reduction in processing time.',
          'Higher security and reliability in access.',
        ],
        challenges: [
          'Ensure data security and identity validation.',
          'Smooth integration between registration and access control.',
        ],
        solutions: [
          'Encryption, identity validation, and function-level access control.',
          'Custom API for communication between systems.',
        ],
        description:
          'Web registration and QR code-based access control system for the alumni dinner.',
        tags: ['EventTech', 'QR Codes'],
      },
    ],

    '2018': [
      {
        title: 'Fonvalle - Web App',
        area: 'Education / Events',
        kind: 'Registration & Access System',
        stack: ['Google Apps Script', 'jQuery', 'Semantic UI'],
        country: 'Colombia',
        flag: '🇨🇴',

        client: 'Universidad del Valle',
        location: 'Colombia',
        date: '2018',
        role: 'Web Application Developer',
        links: [{ label: 'Project Link', href: 'Fonvalle Dinner' }],

        summary:
          'Two integrated systems: web registration with QR codes and access control for the Univalle alumni event.',
        objectives: [
          'Offer a smooth and secure registration for alumni.',
          'Facilitate organization and attendance management.',
        ],
        achievements: [
          '85% increase in registrations vs. manual methods.',
          '250% savings in processing time.',
          'Increased security and reliability for access control.',
        ],
        challenges: [
          'Ensure secure registration and access control.',
          'Efficiently integrate both systems.',
        ],
        solutions: [
          'Encryption, identity validation, and secure functions.',
          'Custom API between registration and access control.',
        ],
        description:
          'Registration and access control system for the Univalle alumni dinner.',
        tags: ['EventTech', 'QR Codes', 'Automation'],
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
        title: 'H&R Drywall - WebApp',
        area: 'Construction',
        kind: 'CRM / Job Tracking',
        stack: ['Node.js', 'React', 'PostgreSQL'],
        country: 'United States',
        flag: '🇺🇸',

        client: 'H&R Drywall',
        location: 'United States',
        date: '2018',
        role: 'Full-Stack Developer',

        summary:
          'Web application for client management and job tracking for a construction company in the U.S.',
        description:
          'Custom CRM for H&R Drywall with project and client management.',
        tags: ['CRM', 'Construction'],
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
        title: 'David Alonso - Service Integration',
        area: 'E-commerce',
        kind: 'Integration / Logistics',
        stack: ['Node.js', 'REST APIs', 'Webhook Workers'],
        country: 'Mexico',
        flag: '🇲🇽',

        client: 'David Alonso',
        location: 'Mexico',
        date: '2020',
        role: 'Integration Engineer',

        summary:
          'E-commerce solution integrating a home delivery management system to optimize logistics and enable real-time tracking.',
        achievements: [
          'Optimized online shopping experience.',
          'Improved operational efficiency in logistics.',
          'Increased customer satisfaction.',
        ],
        testimonial:
          '“Andrés is a highly recommended professional. He helped me finish my project on time with additional details for customization.”',
        description:
          'Complete integration of e-commerce with home delivery and real-time tracking.',
        tags: ['E-commerce', 'Integrations'],
      },
      {
        title: 'Sentir Creativo - Web App & CMS',
        area: 'Creative Industry',
        kind: 'CMS/Website',
        stack: ['Strapi', 'Next.js', 'PostgreSQL'],
        country: 'Chile',
        flag: '🇨🇱',

        client: 'Sentir Creativo',
        location: 'Chile',
        date: '2020',
        role: 'Lead Web Developer',

        summary:
          'Platform for managing and selling artistic services: portfolios, e-commerce, and workshops, powered by Strapi CMS.',
        objectives: [
          'Provide artists with a modern tool for online presence and services.',
          'Enable direct sales with secure payments and deliveries.',
          'Foster community interaction and growth.',
        ],
        achievements: [
          'Launched with intuitive interface and appealing design.',
          'Strapi CMS for profiles, galleries, and services.',
          'Initial active community of artists and buyers.',
        ],
        challenges: [
          'Balance aesthetics and functionality.',
          'Promote organic growth of the community.',
        ],
        solutions: [
          'Minimalist responsive design + user testing.',
          'SEO, social campaigns, newsletters, and online events.',
        ],
        testimonial:
          '“Excellent experience: responsibility, empathy, and creativity. Proposed UX and scalability solutions that reduced implementation time.”',
        description:
          'End-to-end platform for managing portfolios, services, sales, and client communication.',
        tags: ['CMS', 'Marketplace', 'Strapi'],
      },
      {
        title: 'Falconeye - GIS',
        area: 'Geospatial',
        kind: 'GIS Dashboard',
        stack: ['Node.js', 'React', 'Mapbox'],
        country: 'Dominican Republic',
        flag: '🇩🇴',

        client: 'Falconeye',
        location: 'Dominican Republic',
        date: '2020',
        role: 'GIS Developer',

        summary:
          'Geographic Information System with dashboard for managing and visualizing internal processes in real-time.',
        objectives: [
          'Monitor and analyze spatial data in real-time.',
          'Facilitate decision-making with dashboards and reports.',
        ],
        achievements: [
          'GIS platform with intuitive visualizations and analytics.',
          'Improved coordination and activity planning.',
        ],
        description:
          'Dashboard GIS for internal processes with spatial analytics tools.',
        tags: ['GIS', 'Analytics'],
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
        title: 'Cinekomuna - Improve Performance',
        area: 'Media / Streaming',
        kind: 'Performance / FinOps / Security',
        stack: [
          'MeteorJS',
          'MongoDB',
          'AWS (EC2, S3, CloudWatch)',
          'Node.js',
          'New Relic',
        ],
        country: 'Mexico',
        flag: '🇲🇽',

        client: 'Cinekomuna',
        location: 'Mexico',
        date: '2022',
        role: 'Lead Backend Developer / DevOps Engineer',
        links: [{ label: 'Website', href: 'https://cinekomuna.com' }],

        summary:
          'Comprehensive MeteorJS optimization on AWS: code refactor, MongoDB tuning, and best practices for performance, scalability, security, and cost reduction (FinOps).',
        achievements: [
          'Notable improvement in response times.',
          'Reduced infrastructure costs.',
          'Strengthened security and scalability.',
        ],
        challenges: [
          'Complex Meteor subscriptions and MongoDB aggregations.',
          'Need to decouple components into serverless.',
          'Insufficient observability.',
        ],
        solutions: [
          'Refactor of pubs/subs; compound indexes and aggregation hints.',
          'Selective migration to Lambda; caching/CDN where applicable.',
          'CloudWatch + New Relic; alerts and dashboards.',
        ],
        description:
          'Architecture review, DB optimization, and AWS practices for sustainable growth.',
        tags: ['Performance', 'FinOps', 'Observability', 'Security'],
        highlight: true,
      },
      {
        title: 'John Daza - WebApp',
        area: 'Business Services',
        kind: 'Mini Web App',
        stack: ['Node.js', 'React', 'PostgreSQL'],
        country: 'Colombia',
        flag: '🇨🇴',

        client: 'John Daza',
        location: 'Colombia',
        date: '2022',
        role: 'Full-Stack Developer',

        summary:
          'Mini application for data telemonitoring and electronic health record (EHR) management.',
        description:
          'Lightweight web app with EHR functionalities for telemonitoring.',
        tags: ['EHR', 'Healthcare'],
      },
    ],

    '2023': [
      {
        title: 'GSOFT - End-to-End SaaS',
        area: 'SaaS / QA',
        kind: 'E2E Testing Platform',
        stack: ['.NET', 'Cypress'],
        country: 'Mexico',
        flag: '🇲🇽',

        client: 'GSOFT',
        location: 'Mexico',
        date: '2023',
        role: 'Software Testing Specialist',
        links: [{ label: 'Website', href: 'https://geniussoft.com.mx/' }],

        summary:
          'Automated end-to-end testing with Cypress to ensure software quality and user experience in a SaaS platform.',
        objectives: [
          'Implement a full E2E suite before launch.',
          'Detect and fix bugs early in the lifecycle.',
        ],
        achievements: [
          'Significant improvement in software quality.',
          'Reduced production bugs.',
          'Better end-user experience.',
        ],
        description: 'Automated E2E testing for GSOFT SaaS platform.',
        tags: ['E2E', 'Testing', 'Automation'],
      },
      {
        title: 'Javier Garaeta - AWS Optimization',
        area: 'Cloud / Consulting',
        kind: 'Cost Optimization / Performance',
        stack: ['AWS (Cost Explorer, Lambda, EC2)', 'Observability'],
        country: 'Spain',
        flag: '🇪🇸',

        client: 'Javier Garaeta',
        location: 'Spain',
        date: '2023',
        role: 'Cloud Consultant',

        summary:
          'Optimization of AWS infrastructure focusing on cost reduction and performance improvements.',
        achievements: [
          'Significant monthly savings.',
          'Smooth communication and alignment with goals.',
        ],
        testimonial:
          '“Andrés helped me optimize AWS, achieving significant savings. He understood the goal and delivered on time with clear communication. Highly recommended.”',
        description:
          'AWS consulting for FinOps and cost-performance improvements.',
        tags: ['AWS', 'FinOps'],
      },
      {
        title: 'Ángela Rivero - Google Sheets + Slack Script',
        area: 'Automation',
        kind: 'ChatOps / Scripting',
        stack: ['Google Apps Script', 'Slack API'],
        country: 'Ecuador',
        flag: '🇪🇨',
        description:
          'Modified a Google Sheets script to send Slack notifications.',
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
        review:
          'We are very grateful to Andrés for his valuable contribution. Thanks to his work, we improved our platform and expanded our services. Highly recommended.',
        description:
          'Evaluation and optimization of a Node.js + React + Dato CMS project, including a training plan for the client team.',
      },
      {
        title: 'Freelaw - Docker Implementation',
        area: 'Legal',
        kind: 'DevOps / Containerization',
        stack: ['Docker', 'Python', 'Selenium', 'Firefox'],
        country: 'Chile',
        flag: '🇨🇱',

        client: 'Guillermo Piedrabuena',
        location: 'Chile',
        date: '2023',
        role: 'DevOps Engineer / Containerization Engineer',
        links: [{ label: 'Website', href: 'http://freelaw.cl' }],

        summary:
          'Containerization of a Python+Selenium scraper using Docker with a custom selenium/standalone-firefox image.',
        achievements: [
          'Reproducible execution across environments.',
          'Solved Selenium ↔ Firefox communication issues in Docker.',
          'Improved scraper performance and efficiency.',
          'Simplified deployment and management.',
        ],
        challenges: [
          'Cross-component communication inside Docker.',
          'Optimizing image size and performance.',
        ],
        testimonial:
          '“Hiring Andrés was a huge help, professional and skilled. Thanks to him, my project reached a more professional level. Highly recommended.”',
        description: 'Dockerized Python+Selenium scraper with optimized image.',
        tags: ['Docker', 'Automation'],
      },
      {
        title: 'Javeriana - Mobile App',
        area: 'Education',
        kind: 'Mobile App',
        stack: ['React Native', 'iOS', 'Android', 'Biometric Authentication'],
        country: 'Colombia',
        flag: '🇨🇴',

        client: 'Pontificia Universidad Javeriana Cali',
        location: 'Colombia',
        date: '2023',
        role: 'Mobile App Developer',
        links: [
          {
            label: 'Android',
            href: 'https://play.google.com/store/apps/details?id=edu.co.javerianacali',
          },
          {
            label: 'iOS',
            href: 'https://apps.apple.com/co/app/javeriana-cali/id6464329823?l=en-GB',
          },
        ],

        summary:
          'Enhancements to React Native app: biometric authentication, tablet UI optimization, and major bug fixes for stability.',
        achievements: [
          'Biometrics integrated on iOS and Android.',
          'Optimized UI for tablets.',
          'Notable reduction in crashes and bugs.',
        ],
        challenges: [
          'Cross-platform biometric integration.',
          'Responsive tablet design.',
          'Debugging legacy codebase.',
        ],
        testimonial:
          '“Andrés, thank you for your support on the Mobile App development, for your commitment, punctuality, organization, and quality.”',
        description:
          'End-to-end improvements of the Javeriana Cali mobile app.',
        tags: ['Mobile', 'React Native'],
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
        flag: '🇵🇦',
      },
      {
        title: 'El Hornero - Salesmanago Consultancy',
        area: 'E-commerce / Restaurants',
        kind: 'Marketing Automation / Consultancy',
        stack: ['Salesmanago', 'Data Mapping'],
        country: 'Panama',
        flag: '🇵🇦',
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

export type Testimonial = {
  quote: string;
  client: string;
  country?: string;
  flag?: string;
};

export const TESTIMONIALS: Testimonial[] = Object.values(TIMELINE_DATA.timeline)
  .flat()
  .filter((item) => item.testimonial)
  .map((item) => ({
    quote: item.testimonial as string,
    client: item.client ?? item.title,
    country: item.country,
    flag: item.flag,
  }));
