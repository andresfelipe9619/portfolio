import { cva } from 'class-variance-authority';
import type { COBEOptions } from 'cobe';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const dockVariants = cva(
  'mx-auto w-max h-full p-2 flex items-end rounded-full border',
);

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        topic:
          'border-transparent bg-accent text-accent-foreground hover:bg-accent/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.005,
  dark: 1,
  diffuse: 0.5,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1.0, 0.82, 0.58],
  markers: [
    { location: [38.8951, -77.0364], size: 0.1 }, // US
    { location: [40.4168, -3.7038], size: 0.1 }, // Spain
    { location: [-33.45, -70.65], size: 0.1 }, // Chile
    { location: [-15.7942, -47.9297], size: 0.1 }, // Brazil
    { location: [19.4326, -99.1332], size: 0.1 }, // Mexico
    { location: [4.6097, -74.0818], size: 0.1 }, // Colombia
    { location: [-0.2299, -78.5250], size: 0.1 }, // Ecuador
    { location: [9.9347, -84.0875], size: 0.1 }, // Costa Rica
    { location: [8.9936, -79.5197], size: 0.1 }, // Panama
    { location: [18.5001, -69.9886], size: 0.1 }, // Dominican Republic
    { location: [51.5085, -0.1257], size: 0.1 }, // UK
    { location: [31.7720, 35.2170], size: 0.1 }, // Israel
  ],
};

export { badgeVariants, buttonVariants, dockVariants, GLOBE_CONFIG };
