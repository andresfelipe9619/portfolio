import React from 'react';

type FaqItem = {
  id?: string; // optional custom id (used for AccordionItem value)
  question: string;
  answer: React.ReactNode; // allows strings or JSX
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'engagement',
    question: 'What’s your engagement model?',
    answer:
      'Scoped projects or retainers. Async-first, demos weekly. No surprises (except pleasant ones).',
  },
  {
    id: 'quality',
    question: 'How do you ensure quality?',
    answer:
      'CI/CD pipelines, automated tests, linting, perf budgets, observability. Basically, quality with receipts.',
  },
  {
    id: 'stacks',
    question: 'What stacks do you prefer?',
    answer:
      'TypeScript, React/Next.js, Node, Python, AWS, Postgres, Redis, edge functions. Not married to stacks, just committed to excellence.',
  },
  {
    id: 'teams',
    question: 'Do you work solo or with teams?',
    answer:
      'Both. I play well with others but also know how to score when I’m the striker.',
  },
  {
    id: 'legacy',
    question: 'Can you rescue legacy codebases?',
    answer: 'Yes. Like Indiana Jones, but instead of whips, I use git rebase.',
  },
  {
    id: 'deadlines',
    question: 'How do you handle deadlines?',
    answer: 'With respect, caffeine, and ruthless prioritization.',
  },
  {
    id: 'industries',
    question: 'What industries have you worked in?',
    answer:
      'Fintech, SaaS, e-commerce, healthcare, logistics—you name it, I’ve probably scaled it.',
  },
  {
    id: 'architecture',
    question: 'Do you do architecture or just coding?',
    answer: 'Both. Think architect who also isn’t afraid to grab a hammer.',
  },
  {
    id: 'communication',
    question: 'How do you communicate?',
    answer:
      'Async by default, but always clear. Slack, email, Notion, carrier pigeon if required.',
  },
  {
    id: 'difference',
    question: 'What makes you different from other devs?',
    answer:
      'Global experience, obsession with scalability, and humor sharp enough to cut through legacy spaghetti code.',
  },
  {
    id: 'clients',
    question: 'Do you work with startups or enterprises?',
    answer:
      'Both. From scrappy MVPs to Fortune 500 migrations, I’ve seen—and fixed—it all.',
  },
  {
    id: 'cloud',
    question: 'Can you handle cloud infrastructure?',
    answer: 'Absolutely. AWS native. I eat IAM policies for breakfast.',
  },
  {
    id: 'philosophy',
    question: 'What’s your philosophy on software design?',
    answer:
      'Build for humans, optimize for scale, keep future developers from hating you.',
  },
  {
    id: 'automation',
    question: 'Do you do automation?',
    answer:
      'Yes. If it can be automated, I’ll automate it. If it can’t, I’ll try anyway.',
  },
  {
    id: 'skills',
    question: 'How do you keep skills sharp?',
    answer:
      'OSS contributions, side projects, conferences, reading RFCs for fun (don’t judge).',
  },
  {
    id: 'mentorship',
    question: 'Can you mentor or lead teams?',
    answer:
      'Yes. I’ve led teams across continents. Think Jedi master, but with code reviews.',
  },
  {
    id: 'bugs',
    question: 'What’s your attitude toward bugs?',
    answer:
      'They’re just misunderstood features… until I squash them mercilessly.',
  },
  {
    id: 'async',
    question: 'Do you work async with global teams?',
    answer: 'Yes. My calendar is as timezone-friendly as my commits.',
  },
  {
    id: 'delivery',
    question: 'What’s your delivery style?',
    answer:
      'Iterative, transparent, demo-driven. You’ll never wonder “what’s happening?”',
  },
  {
    id: 'whyhire',
    question: 'Why should we hire you?',
    answer:
      'Because I don’t just write code—I build leverage. And I make it fun along the way.',
  },
];

export const faqTitle = 'No question too small, no doubt left hanging.';

export const professionalTitle =
  'Senior Software Engineer — Cloud, Automation & SaaS Architect';

export const CTATitle =
  'Ready to turn your ambitious idea into software that actually works? Let’s build brilliance (and maybe break the internet—responsibly).';

export const mainPhrase = [`Global companies trust me`, `to build what others`]
