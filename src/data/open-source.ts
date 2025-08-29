// src/data/resume.ts (or wherever you build OPEN_SOURCE_HIGHLIGHTS)

export type HighContentItem = {
  title: string;
  href: string;
  subtitle: string; // short description for the card
  badges: string[];
  year: string;
  active: boolean;
};

export type OpenSourceProject = {
  title: string;
  href: string; // GitHub URL
  repo?: { owner: string; name: string }; // optional; auto-parsed if omitted
  dates: string; // e.g. '2025-08'
  active: boolean;
  shortDesc: string; // for the card
  longDesc: string; // for the dialog (professional + detailed)
  technologies: string[];
  badges: string[];
  coverUrl?: string; // optional image for dialog
};

const openSource: OpenSourceProject[] = [
  {
    title: 'Car Booking App (React Native)',
    href: 'https://github.com/andresfelipe9619/car-booking-app',
    dates: '2018-11',
    active: true,
    shortDesc: 'Uber-like booking flows with maps, routing, and clean state.',
    longDesc:
      'Production-ready booking flows that mirror real ride-hailing UX: map-driven pick-up/drop-off, route cost estimation, and robust state handling. Showcases product thinking for mobile—business logic and UX synchronization first, pixel polish second. The codebase is modular, testable, and demonstrates a practical approach to navigation, permissions, and error boundaries for iOS/Android.',
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
    shortDesc: 'Transcribe, diarize, subtitle, and summarize from the CLI.',
    longDesc:
      'A battle-tested command-line tool for media processing: accurate transcription (WhisperX), speaker diarization, subtitle tracks (SRT/VTT), and automated summaries for notes/action items/budgets. Designed for repeatability and large batches: deterministic flags, resumable runs, and clear logs. Extensible pipeline with FFmpeg preprocessing and optional GPT analysis.',
    technologies: ['Python', 'WhisperX', 'ffmpeg', 'OpenAI API'],
    badges: ['AI/ML', 'Transcription', 'CLI', 'Audio'],
  },
  {
    title: 'Prophet Playground',
    href: 'https://github.com/andresfelipe9619/prophet-playground',
    dates: '2024',
    active: true,
    shortDesc: 'Forecasting sandbox with Prophet/ARIMA/XGBoost + metrics.',
    longDesc:
      'Hands-on forecasting lab: load series, compare Prophet/ARIMA/XGBoost, and inspect error metrics (MAE/RMSE). Includes simple cross-validation, quick plots, and baseline heuristics to avoid overfitting. Great for selecting a pragmatic model that balances signal vs. complexity before productionizing.',
    technologies: ['Python', 'Prophet', 'ARIMA', 'XGBoost', 'Matplotlib'],
    badges: ['Data', 'Forecasting', 'Analytics'],
  },
  {
    title: 'SES Bounce Dynamo',
    href: 'https://github.com/andresfelipe9619/ses-bounce-dynamo',
    dates: '2022-06',
    active: true,
    shortDesc: 'Lambda to capture SES bounces/complaints → DynamoDB events.',
    longDesc:
      'Serverless microservice for email deliverability ops: consumes SES notifications (bounces/complaints), validates payloads, and persists normalized events in DynamoDB for audit and dashboards. Includes IAM-scoped resources, idempotency guards, and retry/backoff. Ideal for compliance and data pipelines around sender reputation.',
    technologies: ['Node.js', 'AWS Lambda', 'AWS SES', 'DynamoDB'],
    badges: ['Serverless', 'Email', 'DevOps'],
  },
  {
    title: 'Java Battleship',
    href: 'https://github.com/andresfelipe9619/Java-Battleship',
    dates: '2017-11',
    active: false,
    shortDesc: 'Classic Battleship in pure Java + MySQL.',
    longDesc:
      'A throwback project that still demonstrates fundamentals: state management, simple I/O, and persistence with MySQL. Useful for teaching deterministic game rules, grid modeling, and basic MVC organization without frameworks.',
    technologies: ['Java', 'MySQL'],
    badges: ['Classic', 'Game'],
  },
  {
    title: 'Personal Portfolio (Open Source)',
    href: 'https://github.com/andresfelipe9619/portfolio',
    dates: '2025-08',
    active: true,
    shortDesc: 'Developer-first portfolio (Vite + React) with Magic UI/shadcn.',
    longDesc:
      'Minimal, fast, and elegant portfolio focused on DX and performance. Uses Vite + React, Tailwind, Magic UI (neon/aurora/grid patterns) y shadcn UI. Clean routing, componentized sections, and sensible content data modeling—meant to be forked and personalized by senior devs.',
    technologies: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Vercel'],
    badges: ['Open Source', 'Portfolio', 'Frontend'],
  },
];

export const OPEN_SOURCE_HIGHLIGHTS: HighContentItem[] = openSource.map(
  (p) => ({
    title: p.title,
    href: p.href,
    subtitle: p.shortDesc,
    badges: [...p.badges],
    year: p.dates,
    active: p.active,
  }),
);

export default openSource;
