import { render, screen, fireEvent, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { vi, beforeEach } from 'vitest';
import { ThemeProvider, useTheme } from '../theme-provider';

const STORAGE_KEY = 'vite-ui-theme';

/** Exposes the theme context so tests can read and drive it. */
const ThemeProbe = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme('light')}>go light</button>
      <button onClick={() => setTheme('dark')}>go dark</button>
      <button onClick={() => setTheme('system')}>go system</button>
    </div>
  );
};

const mockPrefersDark = (matches: boolean) => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    })),
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    mockPrefersDark(false);
  });

  it('falls back to the provided default theme', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('applies the theme as a class on the html element', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('restores a previously stored theme', () => {
    localStorage.setItem(STORAGE_KEY, 'light');

    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('persists a theme change to localStorage', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeProbe />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('go light'));

    expect(localStorage.getItem(STORAGE_KEY)).toBe('light');
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('swaps the html class rather than stacking themes', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeProbe />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('go light'));

    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('resolves "system" to dark when the OS prefers dark', () => {
    mockPrefersDark(true);

    render(
      <ThemeProvider defaultTheme="system">
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('resolves "system" to light when the OS prefers light', () => {
    mockPrefersDark(false);

    render(
      <ThemeProvider defaultTheme="system">
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('honours a custom storage key', () => {
    render(
      <ThemeProvider defaultTheme="dark" storageKey="custom-key">
        <ThemeProbe />
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.click(screen.getByText('go light'));
    });

    expect(localStorage.getItem('custom-key')).toBe('light');
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});

describe('useTheme', () => {
  it('returns the initial state when used outside a provider', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('system');
  });
});
