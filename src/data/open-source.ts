// types for SEO/cards
export type HighContentItem = {
  title: string;
  href: string;
  subtitle: string; // short description
  badges: string[];
  year: string;
  active: boolean;
};

const openSource = [
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
];

export const OPEN_SOURCE_HIGHLIGHTS: HighContentItem[] = openSource.map(
  (p) => ({
    title: p.title,
    href: p.href,
    subtitle: p.description,
    badges: [...p.badges],
    year: p.dates,
    active: p.active,
  }),
);

export default openSource;
