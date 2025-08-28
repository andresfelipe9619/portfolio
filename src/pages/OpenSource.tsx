// src/pages/OpenSource.tsx
import * as React from 'react';
import { GitBranch } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

import { OPEN_SOURCE_HIGHLIGHTS } from '@/data/open-source';
import { OssCard } from '@/components/oss-card';

import { DotPattern } from '@/components/magicui/dot-pattern';
import { cn } from '@/lib/utils.ts';

// Anim variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
  },
};

// Grouping model (unchanged)
type Section = {
  key: string;
  title: string;
  description: string;
  belongs: (badges: ReadonlyArray<string>) => boolean;
};

const SECTIONS: Section[] = [
  {
    key: 'applications',
    title: 'Applications',
    description:
      'Full-fledged products and polished apps — from mobile booking flows to media tools built for real-world use.',
    belongs: (badges) =>
      badges.some((b) =>
        ['Maps', 'Audio', 'Media', 'Streaming', 'Portfolio'].includes(b),
      ),
  },
  {
    key: 'infrastructure',
    title: 'Infrastructure & Automation',
    description:
      'Cloud services, serverless pipelines, and automation utilities that keep systems reliable and teams efficient.',
    belongs: (badges) =>
      badges.some((b) => ['AWS', 'Serverless', 'Email', 'DevOps'].includes(b)),
  },
  {
    key: 'experiments',
    title: 'Experiments',
    description:
      'Open exploration — from data forecasting to old-school Java games. Small projects with big lessons.',
    belongs: () => true,
  },
];

export default function OpenSourcePage() {
  const groups = React.useMemo(() => {
    const remaining = [...OPEN_SOURCE_HIGHLIGHTS];
    const pick = (predicate: (badges: ReadonlyArray<string>) => boolean) => {
      const bucket: typeof OPEN_SOURCE_HIGHLIGHTS = [];
      for (let i = remaining.length - 1; i >= 0; i--) {
        const item = remaining[i];
        if (predicate(item.badges)) {
          bucket.push(item);
          remaining.splice(i, 1);
        }
      }
      return bucket.reverse();
    };

    const result = SECTIONS.map((s, idx) => {
      const items =
        idx === SECTIONS.length - 1 ? [...remaining] : pick(s.belongs);
      return { section: s, items };
    }).filter((g) => g.items.length > 0);
    return result;
  }, []);

  return (
    <main className="relative p-12">
      <DotPattern
        glow={true}
        className={cn(
          '[mask-image:radial-gradient(50vw_circle_at_center,white,transparent)]',
        )}
      />
      {/* Header */}
      <header className="relative z-10 mb-12 space-y-3 text-center">
        <div className="mx-auto flex w-fit items-center justify-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs opacity-80">
          <GitBranch className="h-3.5 w-3.5" />
          <span>Open Source</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Open source as a superpower.
        </h1>

        <p className="mx-auto max-w-2xl text-muted-foreground">
          I share code the same way I build systems: scalable, transparent, and
          fun. These aren’t just repos — they’re experiments, collaborations,
          and sparks of community.
        </p>
      </header>

      {/* Sections */}
      <div className="relative z-10 space-y-12">
        {groups.map(({ section, items }) => (
          <section key={section.key} className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="max-w-3xl text-sm text-muted-foreground">
                {section.description}
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((item) => (
                <motion.div key={item.title} variants={itemVariants}>
                  <OssCard
                    {...item}
                    enableModal
                    details={{
                      longDescription:
                        'Deep dive into architecture, modules, and how to run locally. Supports plug-ins and community presets.',
                      repoUrl: 'https://github.com/andresfelipe9619/your-repo',
                      topics: ['Architecture', 'CLI', 'DX', 'Testing'],
                      coverUrl: '/images/oss/your-cover.jpg',
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </section>
        ))}
      </div>

      {/* Outro */}
      <footer className="relative z-10 mt-16 text-center">
        <p className="text-muted-foreground">
          Want to contribute, fork, or just peek under the hood? Every star ⭐
          and pull request means a lot.
        </p>
        <div className="mt-4 text-sm">
          <a
            href="https://github.com/andresfelipe9619"
            target="_blank"
            rel="noreferrer"
            className="opacity-80 underline underline-offset-4 hover:opacity-100"
          >
            github.com/andresfelipe9619
          </a>
        </div>
      </footer>
    </main>
  );
}
