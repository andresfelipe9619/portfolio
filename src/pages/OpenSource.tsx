// src/pages/OpenSource.tsx
import * as React from 'react';
import { GitBranch } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

import openSource from '@/data/open-source';
import { OssCard } from '@/components/oss-card';

import { DotPattern } from '@/components/magicui/dot-pattern';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

// Anim variants

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
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
};

export default function OpenSourcePage() {
  const { t } = useTranslation();

  // Agrupamos por secciones (sin cambiar tamaños)
  const groups = React.useMemo(() => {
    const SECTIONS: Section[] = [
      {
        key: 'products',
        title: t('ossPage.productsTitle'),
        description: t('ossPage.productsDesc'),
        color: 'from-fuchsia-500/25',
      },
      {
        key: 'cloud',
        title: t('ossPage.cloudTitle'),
        description: t('ossPage.cloudDesc'),
        color: 'from-cyan-400/25',
      },
      {
        key: 'playground',
        title: t('ossPage.playgroundTitle'),
        description: t('ossPage.playgroundDesc'),
        color: 'from-violet-400/25',
      },
    ];

    const result = SECTIONS.map((section) => ({
      section,
      items: openSource.filter((item) => item.section === section.key),
    })).filter((g) => g.items.length > 0);

    return result;
  }, [t]);

  return (
    <main className="relative px-6 py-16 sm:px-8 lg:px-10">
      {/* Fondo más sutil (baja opacidad) */}
      <DotPattern
        glow
        className={cn(
          'pointer-events-none absolute inset-0 opacity-[0.5]',
          '[mask-image:radial-gradient(50vw_circle_at_center,white,transparent)]',
        )}
      />

      {/* Header */}
      <header className="relative z-10 mb-12 space-y-3 text-center">
        <div className="mx-auto flex w-fit items-center justify-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs opacity-80">
          <GitBranch className="h-3.5 w-3.5" />
          <span>OSS</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight font-dev">
          {t('ossPage.title')}
        </h1>

        <p className="mx-auto max-w-2xl text-muted-foreground">
          {t('ossPage.subtitle')}
        </p>
      </header>

      {/* Sections */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="relative z-10 space-y-14"
      >
        {groups.map(({ section, items }) => (
          <motion.section
            key={section.key}
            variants={itemVariants}
            className="space-y-4"
          >
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
                <h2 className="text-xl font-bold font-dev">{section.title}</h2>
                <p className="max-w-3xl text-sm mb-4">{section.description}</p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <OssCard
                  key={p.title}
                  title={p.title}
                  href={p.href}
                  subtitle={p.subtitle}
                  badges={p.badges}
                  year={p.year}
                  active={p.active}
                  enableModal
                  details={p.details}
                  variants={itemVariants}
                />
              ))}
            </div>
          </motion.section>
        ))}
      </motion.div>

      {/* Outro */}
      <footer className="relative z-10 mt-16 text-center">
        <p className="text-muted-foreground">
          {t('ossPage.outro')}
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
