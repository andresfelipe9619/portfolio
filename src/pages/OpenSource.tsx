// src/pages/OpenSource.tsx
import * as React from 'react';
import { GitBranch } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

import openSource from '@/data/open-source';
import { OssCard } from '@/components/oss-card';

import { DotPattern } from '@/components/magicui/dot-pattern';
import { cn } from '@/lib/utils';

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

// Grouping model
type Section = {
  key: string;
  title: string;
  description: string;
  color: string; // tailwind gradient start for subtle aura per section
  belongs: (badges: ReadonlyArray<string>) => boolean;
};

const SECTIONS: Section[] = [
  {
    key: 'products',
    title: 'Products & Experiments',
    description: 'Mobile & media tools I actually used in production.',
    color: 'from-fuchsia-500/25',
    belongs: (badges) =>
      badges.some((b) =>
        ['Maps', 'Audio', 'Media', 'Streaming', 'Portfolio'].includes(b),
      ),
  },
  {
    key: 'cloud',
    title: 'Cloud & DevOps Toys',
    description: 'Infra bits I glued together at 3AM — and decided to share.',
    color: 'from-cyan-400/25',
    belongs: (badges) =>
      badges.some((b) => ['AWS', 'Serverless', 'Email', 'DevOps'].includes(b)),
  },
  {
    key: 'playground',
    title: 'Playground & Classics',
    description: 'Open exploration — from forecasting labs to old-school Java.',
    color: 'from-violet-400/25',
    belongs: () => true,
  },
];

export default function OpenSourcePage() {
  // Agrupamos por secciones (sin cambiar tamaños)
  const groups = React.useMemo(() => {
    const remaining = [...openSource];
    const pick = (predicate: (badges: ReadonlyArray<string>) => boolean) => {
      const bucket: typeof openSource = [];
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
    <main className="relative px-6 py-16 sm:px-8 lg:px-10">
      {/* Fondo más sutil (baja opacidad) */}
      <DotPattern
        glow
        className={cn(
          'pointer-events-none absolute inset-0 opacity-[0.05]',
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
          I ship code the way I build systems: opinionated, tested in real
          projects, and open for anyone to fork. These are not demos — they’re
          living tools.
        </p>
      </header>

      {/* Sections */}
      <div className="relative z-10 space-y-14">
        {groups.map(({ section, items }) => (
          <section key={section.key} className="space-y-4">
            {/* Título con aura de color por sección (muy sutil) */}
            <div className="relative mb-1">
              <div
                className={cn(
                  'pointer-events-none absolute -inset-x-6 -top-5 h-12 blur-2xl',
                  `bg-gradient-to-r ${section.color} to-transparent`,
                  'opacity-30',
                )}
              />
              <div className="relative space-y-1">
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <p className="max-w-3xl text-sm text-muted-foreground">
                  {section.description}
                </p>
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((p) => (
                <motion.div key={p.title} variants={itemVariants}>
                  <OssCard
                    title={p.title}
                    href={p.href}
                    subtitle={p.subtitle}
                    badges={p.badges}
                    year={p.year}
                    active={p.active}
                    enableModal
                    details={p.details}
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
