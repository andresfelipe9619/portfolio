// Estructura alineada 1:1 con OssCardProps (sin adapters)
export type OssCardDetails = {
  longDescription?: string;
  topics?: string[];
  coverUrl?: string; // optional image
};

export type OssCardProps = {
  title: string;
  href: string; // GitHub link
  subtitle: string;
  badges: ReadonlyArray<string>;
  year: string;
  active: boolean;
  enableModal?: boolean;
  details?: OssCardDetails;
};

export type OpenSourceProject = {
  title: string;
  href: string;
  subtitle: string;
  badges: string[];
  year: string;
  active: boolean;
  section: string;
  enableModal?: boolean;
  details?: OssCardDetails;
};

const openSource: OpenSourceProject[] = [
  {
    title: 'Car Booking App',
    href: 'https://github.com/andresfelipe9619/car-booking-app',
    year: '2018-11',
    active: true,
    subtitle: 'Uber-like booking flows with maps, routing, and clean state.',
    badges: ['React Native', 'Redux', 'Google Maps', 'Mobile'],
    section: 'products',
    details: {
      longDescription:
        'Production-ready booking flows that mirror real ride-hailing UX: map-driven pick-up/drop-off, route cost estimation, and robust state handling. Showcases product thinking for mobile—business logic and UX synchronization first, pixel polish second. The codebase is modular, testable, and demonstrates a practical approach to navigation, permissions, and error boundaries for iOS/Android.',
      topics: [
        'Ride Hailing',
        'Booking UX',
        'State Management',
        'Real-time',
      ],
      // coverUrl: '/images/oss/car-booking.jpg',
    },
  },
  {
    title: 'AudioBaked (CLI)',
    href: 'https://github.com/andresfelipe9619/AudioBaked',
    year: '2025-08',
    active: true,
    subtitle: 'Transcribe, diarize, subtitle, and summarize from the CLI.',
    badges: ['Python', 'WhisperX', 'ffmpeg', 'OpenAI API'],
    section: 'products',
    details: {
      longDescription:
        'A battle-tested command-line tool for media processing: accurate transcription (WhisperX), speaker diarization, subtitle tracks (SRT/VTT), and automated summaries for notes/action items/budgets. Designed for repeatability and large batches: deterministic flags, resumable runs, and clear logs. Extensible pipeline with FFmpeg preprocessing and optional GPT analysis.',
      topics: ['AI/ML', 'Transcription', 'CLI', 'Audio'],
      // coverUrl: '/images/oss/audiobaked.jpg',
    },
  },
  {
    title: 'Prophet Playground',
    href: 'https://github.com/andresfelipe9619/prophet-playground',
    year: '2024',
    active: true,
    subtitle: 'Forecasting sandbox with Prophet/ARIMA/XGBoost + metrics.',
    badges: ['Python', 'Prophet', 'ARIMA', 'XGBoost', 'Matplotlib'],
    section: 'playground',
    details: {
      longDescription:
        'Hands-on forecasting lab: load series, compare Prophet/ARIMA/XGBoost, and inspect error metrics (MAE/RMSE). Includes simple cross-validation, quick plots, and baseline heuristics to avoid overfitting. Great for selecting a pragmatic model that balances signal vs. complexity before productionizing.',
      topics: ['Data', 'Forecasting', 'Analytics'],
      // coverUrl: '/images/oss/prophet.jpg',
    },
  },
  {
    title: 'SES Bounce Dynamo',
    href: 'https://github.com/andresfelipe9619/ses-bounce-dynamo',
    year: '2022-06',
    active: true,
    subtitle: 'Lambda to capture SES bounces/complaints → DynamoDB events.',
    badges: ['Node.js', 'AWS Lambda', 'AWS SES', 'DynamoDB'],
    section: 'cloud',
    details: {
      longDescription:
        'Serverless microservice for email deliverability ops: consumes SES notifications (bounces/complaints), validates payloads, and persists normalized events in DynamoDB for audit and dashboards. Includes IAM-scoped resources, idempotency guards, and retry/backoff. Ideal for compliance and data pipelines around sender reputation.',
      topics: ['Serverless', 'Email', 'DevOps'],
      // coverUrl: '/images/oss/ses-dynamo.jpg',
    },
  },
  {
    title: 'Java Battleship',
    href: 'https://github.com/andresfelipe9619/Java-Battleship',
    year: '2017-11',
    active: false,
    subtitle: 'Classic Battleship in pure Java + MySQL.',
    badges: ['Java', 'MySQL'],
    section: 'playground',
    details: {
      longDescription:
        'A throwback project that still demonstrates fundamentals: state management, simple I/O, and persistence with MySQL. Useful for teaching deterministic game rules, grid modeling, and basic MVC organization without frameworks.',
      topics: ['Classic', 'Game'],
      // coverUrl: '/images/oss/battleship.jpg',
    },
  },
  {
    title: 'Personal Portfolio',
    href: 'https://github.com/andresfelipe9619/portfolio',
    year: '2025-08',
    active: true,
    subtitle: 'Developer-first portfolio (Vite + React) with Magic UI/shadcn.',
    badges: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Vercel'],
    section: 'products',
    details: {
      longDescription:
        'Minimal, fast, and elegant portfolio focused on DX and performance. Uses Vite + React, Tailwind, Magic UI (neon/aurora/grid patterns) y shadcn UI. Clean routing, componentized sections, and sensible content data modeling—meant to be forked and personalized by senior devs.',
      topics: ['Open Source', 'Portfolio', 'Frontend'],
      // coverUrl: '/images/oss/portfolio.jpg',
    },
  },
];

export default openSource;
