import { act, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { TypingAnimation } from '../typing-animation';

/** Typing starts on a timer and runs on an interval set up once it has. */
const typeFor = (ms: number) => {
  act(() => vi.advanceTimersByTime(0));
  act(() => vi.advanceTimersByTime(ms));
};

describe('TypingAnimation', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('types its text out', () => {
    render(<TypingAnimation duration={10}>Hello</TypingAnimation>);

    typeFor(100);

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  // The bug: motion.create() ran on every render, so React received a new
  // component type per keystroke and rebuilt the element each time.
  it('keeps the same element for the whole animation', () => {
    const { container } = render(
      <TypingAnimation duration={10}>Hello</TypingAnimation>,
    );
    const element = container.firstElementChild;

    typeFor(100);

    expect(container.firstElementChild).toHaveTextContent('Hello');
    expect(container.firstElementChild).toBe(element);
  });

  it('shows everything at once when disabled', () => {
    render(<TypingAnimation disabled>Instant</TypingAnimation>);

    expect(screen.getByText('Instant')).toBeInTheDocument();
  });
});
