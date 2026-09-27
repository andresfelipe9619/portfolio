import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { RouteFallback } from '../route-fallback';

describe('RouteFallback', () => {
  afterEach(() => vi.useRealTimers());

  // React retries a suspended page as low-priority work, and every re-render
  // of its fallback starts that work over. The animated terminal that used to
  // sit here re-rendered every 25 ms, and Home took 5.5 s to appear.
  it('has no heartbeat: no timers, no animation frames', () => {
    vi.useFakeTimers();

    render(<RouteFallback />);

    expect(vi.getTimerCount()).toBe(0);
  });

  it('holds the page open and tells assistive tech it is loading', () => {
    const { container } = render(<RouteFallback />);

    expect(container.firstChild).toHaveAttribute('aria-busy', 'true');
    expect(container.firstChild).toHaveClass('min-h-[100dvh]');
  });
});
