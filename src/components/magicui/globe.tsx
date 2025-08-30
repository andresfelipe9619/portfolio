'use client';

import createGlobe, { type COBEOptions } from 'cobe';
import { useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [],
};

export function Globe({
  className,
  scaled = false,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  scaled?: boolean;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener('resize', onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...(scaled
        ? {
            ...config,
            width: width * 3,
            height: width * 3 * 0.4,
            dark: 0,
            diffuse: 3,
            mapSamples: 16000,
            mapBrightness: 1.2,
            scale: 2.5,
            devicePixelRatio: 2,
            offset: [0.5, width * 2 * 0.4 * 0.6],
            onRender: (state) => {
              // eslint-disable-next-line react-hooks/exhaustive-deps
              if (!pointerInteracting.current) phi += 0.0009;
              state.phi = phi + rs.get();
              state.width = width * 3;
              state.height = width * 3 * 0.4;
            },
          }
        : {
            ...config,
            width: width * 2,
            height: width * 2,
            onRender: (state) => {
              if (!pointerInteracting.current) phi += 0.005;
              state.phi = phi + rs.get();
              state.width = width * 2;
              state.height = width * 2;
            },
          }),
    });

    setTimeout(() => (canvasRef.current!.style.opacity = '1'), 0);
    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [rs, config]);

  return (
    <div className={cn('mx-auto aspect-[1/1]  w-[90vw]', className)}>
      <canvas
        className={cn(
          'size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]',
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
