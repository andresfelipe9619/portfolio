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
      if (item.country && COUNTRY_COORDS[item.country]) {
        const { lat, lon } = COUNTRY_COORDS[item.country];
        focusGlobe(lat, lon);
      }
      onChangeIndex?.(i, item);
    },
    //eslint-disable-next-line
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

      <ul className="relative flex h-full flex-col items-stretch justify-center gap-5">
        {items.map((it, i) => {
          const dist = Math.abs(i - idx);
          const active = i === idx;
          const op = active
            ? 'opacity-100'
            : dist === 1
              ? 'opacity-60'
              : 'opacity-25';
          const scale = active ? 'scale-100' : 'scale-95';
          return (
            <li
              key={`${it.year}-${i}-${it.title}`}
              className={cn(
                'transition-all duration-300 ease-out',
                op,
                active ? 'translate-x-0' : 'translate-x-0',
                scale,
              )}
            >
              <button
                onClick={() => go(i)}
                className={cn(
                  'group grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5',
                  active && 'bg-white/5 ring-1 ring-white/10',
                )}
              >
                {/* dot */}
                <span className="relative mr-1 block size-2 rounded-full bg-white/70" />
                {/* main */}
                <div className="text-left">
                  <div className="text-sm text-white/60">{it.year}</div>
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
                {/* country */}
                <div className="text-right text-sm text-white/70">
                  {it.flag ?? ''} {it.country ?? ''}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
