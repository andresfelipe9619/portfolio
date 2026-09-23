import { vi } from 'vitest';
import { COUNTRY_COORDS, flattenTimeline, focusGlobe } from '../timeline';
import type { TimelineByYear } from '@/data/timeline';

const timeline: TimelineByYear = {
  '2022': [{ title: 'Second year, first item' }, { title: 'Second year, two' }],
  '2020': [{ title: 'Earliest item' }],
} as TimelineByYear;

describe('flattenTimeline', () => {
  it('flattens every year into a single list', () => {
    expect(flattenTimeline(timeline)).toHaveLength(3);
  });

  it('sorts years ascending regardless of object key order', () => {
    const years = flattenTimeline(timeline).map((item) => item.year);
    expect(years).toEqual(['2020', '2022', '2022']);
  });

  it('assigns stable, gapless positional indexes', () => {
    const indexes = flattenTimeline(timeline).map((item) => item.index);
    expect(indexes).toEqual([0, 1, 2]);
  });

  it('carries the original item fields through', () => {
    const [first] = flattenTimeline(timeline);
    expect(first.title).toBe('Earliest item');
    expect(first.year).toBe('2020');
  });

  it('returns an empty list for an empty timeline', () => {
    expect(flattenTimeline({} as TimelineByYear)).toEqual([]);
  });

  it('does not mutate the source data', () => {
    const snapshot = JSON.stringify(timeline);
    flattenTimeline(timeline);
    expect(JSON.stringify(timeline)).toBe(snapshot);
  });
});

describe('COUNTRY_COORDS', () => {
  it('keeps every latitude and longitude inside real-world bounds', () => {
    for (const [name, { lat, lon }] of Object.entries(COUNTRY_COORDS)) {
      expect(lat, `${name} latitude`).toBeGreaterThanOrEqual(-90);
      expect(lat, `${name} latitude`).toBeLessThanOrEqual(90);
      expect(lon, `${name} longitude`).toBeGreaterThanOrEqual(-180);
      expect(lon, `${name} longitude`).toBeLessThanOrEqual(180);
    }
  });
});

describe('focusGlobe', () => {
  it('dispatches a globe:focus event carrying the coordinates', () => {
    const listener = vi.fn();
    window.addEventListener('globe:focus', listener);

    focusGlobe(4.6, -74.1);

    expect(listener).toHaveBeenCalledTimes(1);
    const event = listener.mock.calls[0][0] as CustomEvent;
    expect(event.detail).toEqual({ lat: 4.6, lon: -74.1 });

    window.removeEventListener('globe:focus', listener);
  });
});
