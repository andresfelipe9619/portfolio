import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button component', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    render(<Button variant="destructive">Delete</Button>);

    expect(screen.getByRole('button', { name: /delete/i }).className).toContain('bg-destructive');
  });
});
