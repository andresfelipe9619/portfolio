import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { TypingAnimation } from '../typing-animation';

vi.mock('motion/react', async (importOriginal) => ({
  ...(await importOriginal<typeof import('motion/react')>()),
  useReducedMotion: () => true,
}));

describe('TypingAnimation for reduced-motion visitors', () => {
  it('shows the whole text at once, with no typing at all', () => {
    render(<TypingAnimation duration={10}>Hello</TypingAnimation>);

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
