// src/pages/OpenSource.tsx
import * as React from 'react';
import { GitBranch } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

import { OPEN_SOURCE_HIGHLIGHTS } from '@/data/resume';
import { OssCard } from '@/components/oss-card';

// Magic UI
import { InteractiveGridPattern } from '@/components/magicui/interactive-grid-pattern';

// -------------------------------
// Config: narrativa + secciones
// -------------------------------
type Section = {
  key: string;
  title: string;
  description: string;
  // decides si un item pertenece a esta sección (por badges)
  belongs: (badges: ReadonlyArray<string>) => boolean;
};

// 3 capítulos para contar historia:
// - Platforms (productos/experimentos grandes)
// - Dev Tools & Infra (plantillas, infraestructura, SaaS/Strapi/etc)
// - Experiments (ideas juguetonas/innovación)
const SECTIONS: Section[] = [
  {
    key: 'platforms',
    title: 'Platforms',
    description:
      'Production-grade apps that feel like products: real-time features, mobile, media pipelines y más.',
    belongs: (badges) =>
      badges.some((b) =>
        ['Real-time', 'React Native', 'Audio', 'Media', 'Streaming'].includes(
          b,
        ),
      ),
  },
  {
    key: 'devtools',
    title: 'Dev Tools & Infra',
    description:
      'Plantillas, infra y utilidades que otros equipos pueden forkear para mover más rápido.',
    belongs: (badges) =>
      badges.some((b) =>
        ['Next.js', 'Portfolio', 'SaaS', 'AWS', 'Strapi', 'Scraping'].includes(
          b,
        ),
      ),
  },
  {
    key: 'experiments',
    title: 'Experiments',
    description:
      'Pequeñas ideas con gran actitud. Experimentación abierta y divertida para aprender y compartir.',
    // catch-all para lo que no cayó en las anteriores
    belongs: () => true,
  },
];

// -------------------------------
// Helpers de animación
// -------------------------------
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

// item: usa cubic-bezier (o literal 'easeOut' as const)
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      // Opción 1 (recomendada): cubic-bezier suave
      ease: [0.16, 1, 0.3, 1], // <- compatible con tipos
      // Opción 2: literal
      // ease: 'easeOut' as const,
    },
  },
};

// -------------------------------
// Página
// -------------------------------
export default function OpenSourcePage() {
  // Pre-categorizamos los proyectos por secciones (en orden)
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
      // mantener orden original de aparición
      return bucket.reverse();
    };

    const result = SECTIONS.map((s, idx) => {
      // la última sección es catch-all para lo que quede
      const items =
        idx === SECTIONS.length - 1 ? [...remaining] : pick(s.belongs);
      return { section: s, items };
    }).filter((g) => g.items.length > 0);

    return result;
  }, []);

  return (
    <main className="relative mx-auto max-w-6xl px-6 py-12">
      {/* Magic UI layering */}
      <InteractiveGridPattern
        className="pointer-events-none absolute inset-0 opacity-20"
        squares={[42, 42]}
      />

      {/* Encabezado narrativo */}
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

      {/* Grupos/Capítulos con animación */}
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
                  <OssCard {...item} />
                </motion.div>
              ))}

              {/* Si quieres asegurar 6 tarjetas exactas, puedes mostrar placeholders elegantes: */}
              {Array.from({ length: Math.max(0, 6 - items.length) }).map((_, i) => (
                <motion.div key={`ghost-${i}-${i}`} variants={itemVariants}>
                  <div className="h-full rounded-2xl border border-dashed border-white/10 p-5 text-sm text-muted-foreground">
                    Coming soon — a new experiment is brewing…
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        ))}
      </div>

      {/* Cierre comunitario */}
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
            className="underline underline-offset-4 hover:opacity-100 opacity-80"
          >
            github.com/andresfelipe9619
          </a>
        </div>
      </footer>
    </main>
  );
}
