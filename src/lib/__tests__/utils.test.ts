import { cn, projectEmoji } from '../utils';

describe('cn', () => {
  it('joins plain class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('drops falsy values', () => {
    const hidden = false as boolean;
    expect(cn('a', hidden && 'b', undefined, null, 'c')).toBe('a c');
  });

  it('lets the last conflicting Tailwind utility win', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('keeps non-conflicting utilities together', () => {
    expect(cn('px-2', 'py-4')).toBe('px-2 py-4');
  });

  it('handles conditional object syntax', () => {
    expect(cn({ active: true, hidden: false })).toBe('active');
  });

  it('flattens arrays', () => {
    expect(cn(['a', 'b'], 'c')).toBe('a b c');
  });
});

describe('projectEmoji', () => {
  it.each([
    ['Car Booking App', '🚗'],
    ['Booking Engine', '🚗'],
    ['Audio Mixer', '🎧'],
    ['Baked Goods', '🎧'],
    ['Prophet Forecasting', '📈'],
    ['Sales Forecast', '📈'],
    ['SES Notifications', '☁️'],
    ['AWS Lambda Worker', '☁️'],
    ['Battleship Game', '🚢'],
    ['Java Playground', '🚢'],
    ['Developer Portfolio', '👨‍💻'],
  ])('maps %s to %s', (title, emoji) => {
    expect(projectEmoji(title)).toBe(emoji);
  });

  it('is case insensitive', () => {
    expect(projectEmoji('CAR RENTAL')).toBe('🚗');
    expect(projectEmoji('aWs LaMbDa')).toBe('☁️');
  });

  it('falls back to the puzzle piece for anything unrecognised', () => {
    expect(projectEmoji('Something Entirely New')).toBe('🧩');
    expect(projectEmoji('')).toBe('🧩');
  });
});
