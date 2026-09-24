import { render, renderHook, act } from '@testing-library/react';
import { vi, beforeEach, afterEach } from 'vitest';

const toastMock = vi.fn();

vi.mock('sonner', () => ({
  toast: (...args: unknown[]) => toastMock(...args),
}));

/** Fresh module registry per test so the "already shown" set starts empty. */
const loadHook = async () => {
  vi.resetModules();
  return import('../use-easter-egg');
};

describe('showEasterEggToast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('raises a toast the first time an id is seen', async () => {
    const { showEasterEggToast } = await loadHook();

    showEasterEggToast('first', 'Title', 'Description');

    expect(toastMock).toHaveBeenCalledWith(
      'Title',
      expect.objectContaining({ description: 'Description', icon: '🚀' }),
    );
  });

  it('stays quiet on repeat sightings of the same id', async () => {
    const { showEasterEggToast } = await loadHook();

    showEasterEggToast('repeat', 'Title', 'Description');
    showEasterEggToast('repeat', 'Title', 'Description');
    showEasterEggToast('repeat', 'Title', 'Description');

    expect(toastMock).toHaveBeenCalledTimes(1);
  });

  it('treats different ids independently', async () => {
    const { showEasterEggToast } = await loadHook();

    showEasterEggToast('one', 'A', 'a');
    showEasterEggToast('two', 'B', 'b');

    expect(toastMock).toHaveBeenCalledTimes(2);
  });

  // An infinite-duration toast is a permanent obstacle for keyboard users.
  it('uses a finite duration so the toast eventually goes away', async () => {
    const { showEasterEggToast } = await loadHook();

    showEasterEggToast('finite', 'Title', 'Description');

    const options = toastMock.mock.calls[0][1] as { duration: number };
    expect(Number.isFinite(options.duration)).toBe(true);
    expect(options.duration).toBeGreaterThan(0);
  });
});

describe('useTimeEasterEgg', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('fires only after the configured delay', async () => {
    const { useTimeEasterEgg } = await loadHook();

    renderHook(() => useTimeEasterEgg('timed', 'Title', 'Desc', 30));

    act(() => {
      vi.advanceTimersByTime(29_000);
    });
    expect(toastMock).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1_000);
    });
    expect(toastMock).toHaveBeenCalledTimes(1);
  });

  it('cancels the timer when the component unmounts early', async () => {
    const { useTimeEasterEgg } = await loadHook();

    const { unmount } = renderHook(() =>
      useTimeEasterEgg('unmounted', 'Title', 'Desc', 30),
    );

    unmount();

    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(toastMock).not.toHaveBeenCalled();
  });
});

describe('useHackAttemptEasterEgg', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const Harness = ({
    pathname,
    hook,
  }: {
    pathname: string;
    hook: (
      pathname: string,
      title: string,
      description: string,
      shortcutTitle: string,
    ) => void;
  }) => {
    hook(pathname, 'Nice try', 'Caught you', 'Shortcut spotted');
    return null;
  };

  it.each(['/admin', '/wp-admin', '/backdoor', '/.env'])(
    'greets a visit to %s with a toast',
    async (pathname) => {
      const { useHackAttemptEasterEgg } = await loadHook();

      render(<Harness pathname={pathname} hook={useHackAttemptEasterEgg} />);

      expect(toastMock).toHaveBeenCalledWith(
        'Nice try',
        expect.objectContaining({ description: 'Caught you' }),
      );
    },
  );

  it('is case insensitive about suspicious paths', async () => {
    const { useHackAttemptEasterEgg } = await loadHook();

    render(<Harness pathname="/WP-Admin" hook={useHackAttemptEasterEgg} />);

    expect(toastMock).toHaveBeenCalled();
  });

  it('ignores ordinary routes', async () => {
    const { useHackAttemptEasterEgg } = await loadHook();

    render(<Harness pathname="/projects" hook={useHackAttemptEasterEgg} />);

    expect(toastMock).not.toHaveBeenCalled();
  });

  it('responds to the F12 devtools shortcut', async () => {
    const { useHackAttemptEasterEgg } = await loadHook();

    render(<Harness pathname="/" hook={useHackAttemptEasterEgg} />);
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'F12' }));
    });

    expect(toastMock).toHaveBeenCalledWith(
      'Shortcut spotted',
      expect.objectContaining({ description: 'Caught you' }),
    );
  });

  it('responds to Cmd/Ctrl+Shift+I', async () => {
    const { useHackAttemptEasterEgg } = await loadHook();

    render(<Harness pathname="/" hook={useHackAttemptEasterEgg} />);
    act(() => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'i',
          ctrlKey: true,
          shiftKey: true,
        }),
      );
    });

    expect(toastMock).toHaveBeenCalled();
  });

  it('leaves innocent keypresses alone', async () => {
    const { useHackAttemptEasterEgg } = await loadHook();

    render(<Harness pathname="/" hook={useHackAttemptEasterEgg} />);
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    });

    expect(toastMock).not.toHaveBeenCalled();
  });
});
