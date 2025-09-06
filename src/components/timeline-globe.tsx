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
    const canvas = canvasRef.current!;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: canvas.width,
      height: canvas.height,
      phi: 0,
      theta: 0,
      dark: 0,
      diffuse: 0.4,
      mapSamples: 16000,
      glowColor: [0, 0, 0],
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [0.98, 0.38, 0.55],
      markers: [],
      onRender: (s) => {
        phi.current = lerp(phi.current, target.current.phi, 0.06);
        theta.current = lerp(theta.current, target.current.theta, 0.06);
        s.phi = phi.current;
        s.theta = theta.current;
        s.markers = markers.current;
      },
    });

    const onFocus = (e: CustomEvent<{ lat: number; lon: number }>) => {
      target.current.phi = (e.detail.lon * Math.PI) / 180;
      target.current.theta = (e.detail.lat * Math.PI) / 180;
      markers.current = [
        { location: [e.detail.lat, e.detail.lon], size: 0.12 },
      ];
    };
    window.addEventListener('globe:focus', onFocus as EventListener);

    return () => {
      window.removeEventListener('globe:focus', onFocus as EventListener);
      ro.disconnect();
      globe.destroy();
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
