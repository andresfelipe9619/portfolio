'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  COUNTRY_COORDS,
  type FlattenedItem,
  flattenTimeline,
  focusGlobe,
} from '@/lib/timeline';
import { cn } from '@/lib/utils';

type Props = {
  data: { timeline: Record<string, any[]> }; // shape compatible with TIMELINE_DATA
  onChangeIndex?: (i: number, item: FlattenedItem) => void;
};

export default function TimelineRoulette({ data, onChangeIndex }: Props) {
  const items = useMemo(() => flattenTimeline(data.timeline), [data]);
  const [idx, setIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const clamp = (n: number) =>
    n < 0 ? 0 : n >= items.length ? items.length - 1 : n;

  const go = useCallback(
    (next: number) => {
      const i = clamp(next);
      setIdx(i);
      const item = items[i];
      const locKey = item.location || item.country;
      if (locKey && COUNTRY_COORDS[locKey]) {
        const { lat, lon } = COUNTRY_COORDS[locKey];
        focusGlobe(lat, lon);
      } else if (item.country && COUNTRY_COORDS[item.country]) {
        const { lat, lon } = COUNTRY_COORDS[item.country];
        focusGlobe(lat, lon);
      }
      onChangeIndex?.(i, item);
    },
    // eslint-disable-next-line
    [items, onChangeIndex],
  );

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') go(idx + 1);
      if (e.key === 'ArrowUp' || e.key === 'PageUp') go(idx - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, go]);

  // wheel (discrete)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let acc = 0;
    const onWheel = (e: WheelEvent) => {
      acc += e.deltaY;
      if (Math.abs(acc) > 60) {
        go(idx + Math.sign(acc));
        acc = 0;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: true });
    return () => el.removeEventListener('wheel', onWheel);
  }, [idx, go]);

  return (
    <div ref={containerRef} className="relative h-[70vh] overflow-hidden">
      {/* thin vertical line */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />

      <div className="relative flex h-full flex-col items-stretch justify-center gap-5">
        {items.map((it, i) => {
          const dist = Math.abs(i - idx);
          const active = i === idx;
          const isFirstOfYear = i === 0 || it.year !== items[i - 1].year;
          const op = active
            ? 'opacity-100'
            : dist === 1
              ? 'opacity-60'
              : 'opacity-25';
          const scale = active ? 'scale-100' : 'scale-95';

          return (
            <div
              key={`${it.year}-${i}-${it.title}`}
              className={cn(
                'transition-all duration-300 ease-out',
                op,
                active ? 'translate-x-0' : 'translate-x-0',
                scale,
              )}
            >
              {isFirstOfYear && (
                <div
                  className={cn(
                    'relative z-10 font-bold tracking-tight text-white/90 transition-opacity duration-300',
                    'text-2xl sm:text-3xl lg:text-4xl pl-4',
                    i === 0 ? 'mb-4 mt-2' : 'mb-4 mt-8',
                    dist <= 1 ? 'opacity-100' : 'opacity-40'
                  )}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-white/40">
                    {it.year}
                  </span>
                </div>
              )}
              <button
                onClick={() => go(i)}
                className={cn(
                  'group grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5',
                  active && 'bg-white/5 ring-1 ring-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] text-left',
                  !active && 'text-left'
                )}
              >
                {/* dot */}
                <span className="relative mr-1 block size-2 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                {/* main */}
                <div className="text-left w-full">
                  <div className="font-semibold text-base tracking-wide text-white/95">{it.title}</div>
                  <div className="text-xs text-white/60 mt-1">
                    {it.area && <span className="text-blue-200/80 uppercase tracking-wider text-[10px]">{it.area}</span>}
                    {it.kind && it.area && <span className="opacity-50 mx-1">·</span>}
                    {it.kind && <span>{it.kind}</span>}
                    {it.stack?.length ? (
                      <>
                        <span className="opacity-50 mx-1">·</span>
                        <span className="text-white/50">
                          {it.stack.slice(0, 3).join(', ')}
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>
                {/* loc */}
                <div className="text-right text-sm text-white/70 font-medium">
                  {it.flag ?? ''} {it.location || it.country || ''}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
