import { cn } from '@/lib/utils';
import { type ComponentPropsWithoutRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pause, Play } from 'lucide-react';

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
}

/**
 * Pointing at the content, or focusing something in it, holds the strip
 * still. "The content" is the tracks, the group's direct div children, and not
 * the pause button: a click leaves the pointer and focus on the button, and
 * when those counted, "resume" changed the label but left the strip frozen.
 */
const HOLD_WHILE_ENGAGED =
  '[@media(hover:hover)]:group-has-[>div:hover]/marquee:[animation-play-state:paused] group-has-[>div:focus-within]/marquee:[animation-play-state:paused]';

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const { t } = useTranslation();
  // WCAG 2.2.2: anything that moves on its own for more than five seconds
  // needs a way to stop it, and pausing on hover leaves out keyboards and
  // touchscreens.
  const [paused, setPaused] = useState(false);
  const label = t(paused ? 'marquee.resume' : 'marquee.pause');

  return (
    <div
      {...props}
      // max-w-full: in a centring flex column, like the logo strip's, the
      // strip grew as wide as all four copies (8,000 px and more) and put its
      // pause button off-screen, where no visitor could see or reach it.
      className={cn(
        'group/marquee relative flex max-w-full overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
        {
          'flex-row': !vertical,
          'flex-col': vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            // The copies must stay as alive as the original: for much of every
            // loop, they're what's on screen. Marking them inert once left the
            // logos a visitor could see ignoring the mouse.
            className={cn(
              'flex shrink-0 justify-around [gap:var(--gap)] motion-reduce:[animation-play-state:paused]',
              {
                'animate-marquee flex-row': !vertical,
                'animate-marquee-vertical flex-col': vertical,
                [HOLD_WHILE_ENGAGED]: pauseOnHover,
                '[animation-play-state:paused]': paused,
                '[animation-direction:reverse]': reverse,
              },
            )}
          >
            {children}
          </div>
        ))}
      {/* Hidden for reduced motion, where the marquee never moves at all. */}
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-label={label}
        title={label}
        className="absolute right-2 top-2 z-10 flex size-7 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 opacity-70 backdrop-blur transition-opacity hover:opacity-100 focus-visible:opacity-100 motion-reduce:hidden"
      >
        {paused ? (
          <Play className="size-3.5" aria-hidden="true" />
        ) : (
          <Pause className="size-3.5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
