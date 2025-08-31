'use client';

import createGlobe, { type COBEOptions } from 'cobe';
import { useEffect, useMemo, useRef } from 'react';
import { useInView } from 'motion/react';
import { cn } from '@/lib/utils';

const MOVEMENT_DAMPING = 1400;

const BASE_CONFIG: COBEOptions = {
  width: 600, // valor base, se ajusta luego con ResizeObserver
  height: 600,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 1.0, // ↓ menos costoso que 3
  mapSamples: 900, // 600–1000 es buen sweet spot
  mapBrightness: 1.1,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [],
  onRender: () => {},
};

export function Globe({
  className,
  scaled = false,
  config = BASE_CONFIG,
}: {
  className?: string;
  scaled?: boolean;
  config?: COBEOptions;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);

  const isInView = useInView(wrapperRef, { margin: '100px', amount: 0.1 });

  const DPR = useMemo(() => Math.min(window.devicePixelRatio || 1, 1.5), []);
  const prefersReducedMotion = useMemo(
    () =>
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
    [],
  );

  // track interaction without bloquear scroll
  const pointerStartX = useRef<number | null>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const rafRotateSpeed = scaled ? 0.0012 : 0.0045; // más bajo que antes

  // Init/Destroy sólo cuando está visible
  useEffect(() => {
    if (!isInView || !canvasRef.current) {
      // si sale de vista, destruye y libera GPU
      globeRef.current?.destroy();
      globeRef.current = null;
      return;
    }

    // medir tamaño del contenedor (una vez)
    const measure = () => {
      const w = wrapperRef.current?.offsetWidth ?? 600;
      const h = scaled ? Math.round(w * 0.8) : w; // relación distinta si quieres “panorámico”
      widthRef.current = w;
      heightRef.current = h;
    };
    measure();

    // crear globo con tamaño fijo (no cambiar en cada frame)
    globeRef.current = createGlobe(canvasRef.current, {
      ...config,
      width: Math.round(widthRef.current),
      height: Math.round(heightRef.current),
      devicePixelRatio: DPR,
      diffuse: config.diffuse ?? 1.0,
      onRender: (state) => {
        if (!prefersReducedMotion && pointerStartX.current === null) {
          phiRef.current += rafRotateSpeed;
        }
        state.phi = phiRef.current;
        // NO tocar width/height aquí (costoso)
      },
    });

    // fade-in sin relayouts fuertes
    canvasRef.current.style.opacity = '1';

    // ResizeObserver: actualizar **sólo** al cambiar tamaño
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      const newW = Math.round(cr.width);
      const newH = Math.round(scaled ? cr.width * 0.8 : cr.width);
      if (newW !== widthRef.current || newH !== heightRef.current) {
        widthRef.current = newW;
        heightRef.current = newH;
        // recrear con nuevo tamaño (cobe no expone resize oficial)
        globeRef.current?.destroy();
        globeRef.current = createGlobe(canvasRef.current!, {
          ...config,
          width: newW,
          height: newH,
          devicePixelRatio: DPR,
          diffuse: config.diffuse ?? 1.0,
          onRender: (state) => {
            if (!prefersReducedMotion && pointerStartX.current === null) {
              phiRef.current += rafRotateSpeed;
            }
            state.phi = phiRef.current;
          },
        });
      }
    });
    if (wrapperRef.current) ro.observe(wrapperRef.current);

    // touchmove pasivo para no bloquear scroll
    const el = canvasRef.current;
    const onTouchMove = (e: TouchEvent) => {
      if (pointerStartX.current !== null && e.touches[0]) {
        const delta = e.touches[0].clientX - pointerStartX.current;
        phiRef.current += delta / MOVEMENT_DAMPING;
        pointerStartX.current = e.touches[0].clientX;
      }
    };
    el.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      el.removeEventListener('touchmove', onTouchMove);
      ro.disconnect();
      globeRef.current?.destroy();
      globeRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, DPR, scaled]);

  // pointer handlers (no preventDefault, no bloqueo de scroll)
  const onPointerDown = (x: number) => (pointerStartX.current = x);
  const onPointerUp = () => (pointerStartX.current = null);
  const onPointerMove = (x: number) => {
    if (pointerStartX.current !== null) {
      const delta = x - pointerStartX.current;
      phiRef.current += delta / MOVEMENT_DAMPING;
      pointerStartX.current = x;
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={cn(
        // escalar visualmente sin subir resolución de render
        scaled
          ? 'mx-auto w-[90vw] md:w-[70vw] [transform:scale(1.05)]'
          : 'mx-auto w-[90vw] md:w-[70vw]',
        'aspect-square',
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="size-full opacity-0 transition-opacity duration-400 [contain:layout_paint_size]"
        onPointerDown={(e) => onPointerDown(e.clientX)}
        onPointerUp={onPointerUp}
        onPointerOut={onPointerUp}
        onMouseMove={(e) => onPointerMove(e.clientX)}
        // No usamos onTouchMove de React (agregamos el nativo pasivo)
      />
    </div>
  );
}
