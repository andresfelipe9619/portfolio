// src/sections/experience-roulette.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { TIMELINE_DATA } from '@/data/timeline';
import {
  COUNTRY_COORDS,
  flattenTimeline,
  focusGlobe,
  type FlattenedItem,
} from '@/lib/timeline';
import TimelineGlobe from '@/components/timeline-globe';
import { cn } from '@/lib/utils';
import ProjectDialog from '@/components/project-dialog';

export default function ExperienceRoulette() {
  const items = useMemo<FlattenedItem[]>(
    () => flattenTimeline(TIMELINE_DATA.timeline),
    [],
  );
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<FlattenedItem | null>(
    null,
  );

  // Observe the list’s own scroll to pick the item closest to the vertical center
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = el.scrollTop + el.clientHeight / 2;

        // each row is measured from its offsetTop; find the closest to mid
        let best = 0;
        let bestDist = Infinity;
        for (let i = 0; i < el.children.length; i++) {
          const li = el.children[i] as HTMLElement;
          const center = li.offsetTop + li.offsetHeight / 2;
          const dist = Math.abs(center - mid);
          if (dist < bestDist) {
            best = i;
            bestDist = dist;
          }
        }

        if (best !== active) {
          setActive(best);
          const it = items[best];
          if (it.country && COUNTRY_COORDS[it.country]) {
            const { lat, lon } = COUNTRY_COORDS[it.country];
            focusGlobe(lat, lon);
          }
        }
      });
    };

    // run once so the first item focuses the globe
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
    };
  }, [items, active]);

  const handleProjectClick = (project: FlattenedItem) => {
    setSelectedProject(project);
    setShowProjectDialog(true);
  };

  return (
    <section id="experience" className="bg-gray-950 text-white py-16">
      <ProjectDialog
        open={showProjectDialog}
        onOpenChange={setShowProjectDialog}
        project={selectedProject}
      />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-2">
        {/* LEFT: Timeline — fixed height, inner scroll only when hovered */}
        <div>
          <h2 className="mb-2 text-2xl md:text-4xl font-semibold">Timeline</h2>
          <p className="mb-4 max-w-prose text-white/70">
            Hover left column to scroll it — the globe on the right follows.
          </p>

          <ul
            ref={listRef}
            className={cn(
              // fixed viewport for the list:
              'relative w-full rounded-2xl bg-transparent select-none',
              // height: slightly taller on desktop
              'h-[480px] sm:h-[520px] md:h-[560px]',
              // inner scroll always on, but hidden scrollbar visual:
              'overflow-y-auto [&::-webkit-scrollbar]:hidden',
              // make the wheel stay inside the list while hovered:
              'overscroll-contain',
              // optional: nice stepping feel
              'scroll-smooth snap-y snap-mandatory',
              // allow edges to snap into the center
              'scroll-pt-[240px] scroll-pb-[240px] sm:scroll-pt-[260px] sm:scroll-pb-[260px] md:scroll-pt-[280px] md:scroll-pb-[280px]',
            )}
          >
            {items.map((it, i) => {
              const isActive = i === active;
              const near = Math.abs(i - active) === 1;
              return (
                <li
                  key={`${it.year}-${i}-${it.title}`}
                  className={cn(
                    'snap-center grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl px-3 transition-all cursor-pointer select-none',
                    'min-h-[96px] py-2', // row height
                    isActive
                      ? 'bg-white/5 ring-1 ring-white/10 opacity-100 scale-[1.00]'
                      : near
                        ? 'opacity-60 scale-[0.985]'
                        : 'opacity-30 scale-[0.975]',
                  )}
                  onClick={() => handleProjectClick(it)}
                >
                  <span className="relative mr-1 block size-2 rounded-full bg-white/70" />
                  <div className="text-left">
                    <div className="text-xs text-white/50">{it.year}</div>
                    <div className="font-medium">{it.title}</div>
                    <div className="text-xs text-white/60">
                      {it.area && <span>{it.area}</span>}
                      {it.kind && it.area && <span> · </span>}
                      {it.kind && <span>{it.kind}</span>}
                      {it.stack?.length ? (
                        <>
                          <span> · </span>
                          <span className="text-white/50">
                            {it.stack.slice(0, 3).join(', ')}
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="text-right text-sm text-white/70">
                    {it.flag ?? ''} {it.country ?? ''}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-center mt-4">
            <a
              href="/projects"
              className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md"
            >
              View All Projects
            </a>
          </div>
        </div>

        {/* RIGHT: Globe — fixed height; ignore wheel so it never captures scroll */}
        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(80,80,120,0.25),transparent_60%)]" />
          <div className="mx-auto h-[480px] sm:h-[520px] md:h-[560px] pointer-events-none">
            {/* pointer-events-none ensures hover/scroll never sticks here */}
            <TimelineGlobe className="h-full w-full" />
          </div>
          <p className="mt-3 text-center text-sm text-white/60">
            11 countries (and counting)
          </p>
        </div>
      </div>
    </section>
  );
}
