import type { TimelineByYear, TimelineItem } from '@/data/timeline';

export type FlattenedItem = TimelineItem & {
  year: string;
  index: number; // stable positional index for roulette
};

export function flattenTimeline(timeline: TimelineByYear): FlattenedItem[] {
  const years = Object.keys(timeline).sort(); // ascending
  const out: FlattenedItem[] = [];
  let k = 0;
  for (const y of years) {
    for (const it of timeline[y]) out.push({ ...it, year: y, index: k++ });
  }
  return out;
}

// Country centroids (rough but great for camera focus)
export const COUNTRY_COORDS: Record<string, { lat: number; lon: number }> = {
  'United States': { lat: 39.0, lon: -98.0 },
  Spain: { lat: 40.4, lon: -3.7 },
  Chile: { lat: -35.7, lon: -71.5 },
  Brazil: { lat: -14.2, lon: -51.9 },
  Mexico: { lat: 23.6, lon: -102.5 },
  Colombia: { lat: 4.6, lon: -74.1 },
  Ecuador: { lat: -0.2, lon: -78.5 },
  'Costa Rica': { lat: 9.9, lon: -84.1 },
  Panama: { lat: 8.98, lon: -79.52 },
  'Dominican Republic': { lat: 18.9, lon: -70.4 },
  'United Kingdom': { lat: 55.0, lon: -3.0 },
  Israel: { lat: 31.0, lon: 34.8 },
};

export function focusGlobe(lat: number, lon: number) {
  window.dispatchEvent(
    new CustomEvent('globe:focus', { detail: { lat, lon } }),
  );
}
