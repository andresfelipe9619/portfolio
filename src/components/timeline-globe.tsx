// src/components/magicui/timeline-globe.tsx
'use client';

import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';

type Props = { className?: string };
export default function TimelineGlobe({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phi = useRef(0);
  const theta = useRef(0);
  const target = useRef({ phi: 0, theta: 0 });
  const markers = useRef<{ location: [number, number]; size: number }[]>([]);

  useEffect(() => {
    let globe: ReturnType<typeof createGlobe> | null = null;
    const canvas = canvasRef.current!;
    if (!canvas) return;

    let width = 0;
    let height = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Cobe centering formula mapping lat/lon coordinates to phi/theta angles.
    const locationToAngles = (lat: number, lon: number) => {
      return [
        Math.PI - ((lon * Math.PI) / 180 - Math.PI / 2),
        (lat * Math.PI) / 180,
      ];
    };

    const ro = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const { width: newW, height: newH } = entries[0].contentRect;
      if (newW === 0 || newH === 0) return;

      if (width !== newW || height !== newH) {
        width = newW;
        height = newH;

        if (globe) globe.destroy();

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;

        globe = createGlobe(canvas, {
          devicePixelRatio: dpr,
          width: width * dpr,
          height: height * dpr,
          phi: phi.current,
          theta: theta.current,
          dark: 1,
          diffuse: 0.5,
          mapSamples: 16000,
          glowColor: [1.0, 0.82, 0.58],
          mapBrightness: 1.2,
          baseColor: [1, 1, 1],
          markerColor: [251 / 255, 100 / 255, 21 / 255],
          markers: markers.current,
          onRender: (s) => {
            phi.current = lerp(phi.current, target.current.phi, 0.06);
            theta.current = lerp(theta.current, target.current.theta, 0.06);
            s.phi = phi.current;
            s.theta = theta.current;
            s.markers = markers.current;
          },
        });
      }
    });

    if (canvas.parentElement) {
      ro.observe(canvas.parentElement);
    } else {
      ro.observe(canvas);
    }

    const onFocus = (e: CustomEvent<{ lat: number; lon: number }>) => {
      const angles = locationToAngles(e.detail.lat, e.detail.lon);
      target.current.phi = angles[0];
      target.current.theta = angles[1] - 0.1; // Slight aesthetic pitch offset to not obscure the very center
      markers.current = [
        { location: [e.detail.lat, e.detail.lon], size: 0.12 },
      ];
    };
    window.addEventListener('globe:focus', onFocus as EventListener);

    return () => {
      window.removeEventListener('globe:focus', onFocus as EventListener);
      ro.disconnect();
      if (globe) globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block' }}
    />
  );
}
