import React from 'react';

type FaqItem = {
  id?: string; // optional custom id (used for AccordionItem value)
  question: string;
  answer: React.ReactNode; // allows strings or JSX
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'engagement',
    question: "What’s your engagement model?",
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
    id: 'industries',
    question: 'What industries have you worked in?',
    answer:
      'Fintech, SaaS, e-commerce, healthcare, logistics—you name it, I’ve probably scaled it.',
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
    id: 'mentorship',
    question: 'Can you mentor or lead teams?',
    answer:
      'Yes. I’ve led teams across continents. Think Jedi master, but with code reviews.',
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

export const CTATitle = [
  'Ready to turn ideas into software that actually works?',
  'Let’s build brilliance—responsibly (ish) and ship in weeks, not quarters.',
];

export const originStory =
  'From tinkering in Cali to architecting clouds for Fortune 500s—28 projects, 11 countries, zero boring deployments.';

export const mainPhrase = [
  'Global companies trust me to build what others',
  "can't, won't, or haven't imagined yet.",
];
