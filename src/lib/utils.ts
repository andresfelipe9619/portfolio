import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function projectEmoji(title: string) {
  const t = title.toLowerCase();
  if (t.includes('car') || t.includes('booking')) return '🚗';
  if (t.includes('audio') || t.includes('baked')) return '🎧';
  if (t.includes('prophet') || t.includes('forecast')) return '📈';
  if (t.includes('ses') || t.includes('lambda') || t.includes('aws'))
    return '☁️';
  if (t.includes('battleship') || t.includes('java')) return '🚢';
  if (t.includes('portfolio')) return '🧰';
  return '🧩';
}
