import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('gives its child text the spotlight', () => {
    render(<Button>Press me</Button>);
    expect(screen.getByRole('button', { name: /press me/i })).toBeInTheDocument();
  });
});
