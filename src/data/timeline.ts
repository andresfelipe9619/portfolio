export type TimelineItem = {
  title: string;
  area?: string; // Industry/sector (Education, Finance, SaaS, etc.)
  kind?: string;  // Software class/type (CRM, CMS, GIS, Mobile App, etc.)
  stack?: string[]; // Tech used
  country?: string; // e.g., "Colombia"
  description?: string;
  review?: string;
  flag?: string;

  // --- New (optional) Notion-like structure ---
  client?: string;             // "Cinekomuna"
  location?: string;           // "Mexico"
  role?: string;               // "Lead Backend Developer / DevOps Engineer"
  date?: string;               // "2022" or "2020-05 – 2020-12"
  links?: { label: string; href: string }[];

  // Rich sections (all optional)
  summary?: string;            // 3–5 lines, sales-ready
  objectives?: string[];       // bullets
  scope?: string[];            // if you split scope from objectives
  achievements?: string[];     // bullets, result-focused
  challenges?: string[];       // bullets
  solutions?: string[];        // bullets (if you want to pair with challenges)
  testimonial?: string;        // quote

  // Optional presentation helpers
  highlight?: boolean;         // surface in UI (badge, accent)
  tags?: string[];             // free-form labels, e.g., ["FinOps", "Serverless"]
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
        kind: 'CMS / Marketplace',
        stack: ['React', 'Node.js', 'Strapi'],
        country: 'Chile',
        flag: '🇨🇱',

        // New, richer fields (all optional but useful)
        client: 'Sentir Creativo',
        location: 'Chile',
        date: '2020',
        role: 'Lead Web Developer',
        links: [{ label: 'Website', href: 'https://sentircreativo.com' }],

        summary:
          'Plataforma dinámica para la gestión y venta de servicios artísticos: vitrinas de portafolio, e-commerce de obras y agenda de talleres, con CMS en Strapi.',

        // You can show these only in the expanded dialog/card
        objectives: [
          'Brindar a artistas una herramienta moderna para gestionar presencia online y servicios.',
          'Permitir venta directa con pagos seguros y envíos.',
          'Fomentar interacción con clientes y el crecimiento de la comunidad.'
        ],

        achievements: [
          'Lanzamiento con interfaz intuitiva y diseño visual atractivo.',
          'CMS con Strapi para administrar perfiles, galerías y servicios.',
          'Formación de comunidad activa de artistas y compradores.'
        ],

        challenges: [
          'Equilibrar estética y funcionalidad para artistas y público.',
          'Impulsar el crecimiento orgánico de la comunidad.'
        ],

        solutions: [
          'Diseño minimalista y responsive; pruebas con usuarios para optimizar UX.',
          'SEO, redes sociales y campañas por correo; eventos online y colaboraciones.'
        ],

        testimonial:
          '“Excelente experiencia: responsabilidad, empatía y creatividad. Propuso soluciones orientadas a UX, escalabilidad y organización de la información, reduciendo tiempos de implementación.”',

        description:
          'Gestión de portafolios, servicios, ventas y comunicación con clientes desde un solo lugar.',
        tags: ['CMS', 'Marketplace', 'Strapi']
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
        kind: 'Performance / FinOps / Security',
        stack: ['MeteorJS', 'MongoDB', 'AWS (EC2, S3, CloudWatch)', 'Node.js', 'New Relic'],
        country: 'Mexico',
        flag: '🇲🇽',

        client: 'Cinekomuna',
        location: 'Mexico',
        date: '2022',
        role: 'Lead Backend Developer / DevOps Engineer',
        links: [{ label: 'Website', href: 'https://cinekomuna.com' }],

        summary:
          'Optimización integral de una app MeteorJS en AWS: refactor de código, tuning de consultas MongoDB y mejores prácticas de arquitectura para mejorar rendimiento, escalabilidad y seguridad mientras se reducen costos (FinOps).',

        achievements: [
          'Mejora notable en tiempos de respuesta y experiencia de usuario.',
          'Reducción de costos de infraestructura AWS.',
          'Endurecimiento de seguridad y aumento de la escalabilidad.'
        ],

        challenges: [
          'Suscripciones complejas de Meteor y pipelines de agregación en MongoDB.',
          'Necesidad de desacoplar componentes para serverless.',
          'Observabilidad y trazabilidad insuficientes.'
        ],

        solutions: [
          'Refactor de publicaciones/subs; índices compuestos y hints en agregaciones.',
          'Migración selectiva a AWS Lambda; cache/CDN donde aplica.',
          'Observabilidad con CloudWatch + New Relic; alertas y tableros de monitoreo.'
        ],

        description:
          'Revisión de arquitectura, optimización de base de datos y adopción de mejores prácticas AWS para preparar crecimiento sostenido y confiable.',
        tags: ['Performance', 'FinOps', 'Observability', 'Security'],
        highlight: true
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
        description:
          'Modificación de script en Google Sheets para enviar notificaciones por Slack',
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
        testimonial:
          'Estamos muy agradecidos con Andrés por su valioso aporte a nuestro proyecto. Gracias a su trabajo, hemos podido ordenar, mejorar y expandir nuestros servicios de nuestra plataforma web. Andrés ha demostrado ser un profesional de primer nivel, con una gran dedicación, conocimiento tecnológico, experiencia y compromiso. Sin duda, es un proveedor de confianza y calidad, que recomendamos ampliamente.',
        description:
          'Evaluación y optimización de un proyecto desarrollado en Node.js y React, con integración de Dato CMS, acompañado de un programa de capacitación para el equipo. Este proceso incluye una revisión exhaustiva del código para identificar áreas de mejora, optimizar la performance y asegurar la integración efectiva con Dato CMS. Paralelamente, se implementará un plan de formación personalizado para el personal, centrado en las mejores prácticas de desarrollo, uso avanzado de estas tecnologías y gestión eficiente de contenidos con Dato CMS. El objetivo es elevar la calidad del proyecto, mejorar la eficiencia del equipo y potenciar la entrega de soluciones innovadoras y adaptadas a las necesidades del mercado.',
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
