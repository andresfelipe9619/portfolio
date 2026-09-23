import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useKeyListener } from '../useKeyListener';

const press = (init: KeyboardEventInit) => {
  act(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', init));
  });
};

describe('useKeyListener', () => {
  it('toggles on Ctrl+E', () => {
    const setOpen = vi.fn();
    renderHook(() => useKeyListener(setOpen));

    press({ key: 'e', ctrlKey: true });

    expect(setOpen).toHaveBeenCalledTimes(1);
  });

  it('toggles on Cmd+E', () => {
    const setOpen = vi.fn();
    renderHook(() => useKeyListener(setOpen));

    press({ key: 'e', metaKey: true });

    expect(setOpen).toHaveBeenCalledTimes(1);
  });

  it('accepts a capitalised E', () => {
    const setOpen = vi.fn();
    renderHook(() => useKeyListener(setOpen));

    press({ key: 'E', ctrlKey: true });

    expect(setOpen).toHaveBeenCalledTimes(1);
  });

  it('passes an updater that flips the current value', () => {
    const setOpen = vi.fn();
    renderHook(() => useKeyListener(setOpen));

    press({ key: 'e', ctrlKey: true });

    const updater = setOpen.mock.calls[0][0] as (prev: boolean) => boolean;
    expect(updater(false)).toBe(true);
    expect(updater(true)).toBe(false);
  });

  it('ignores a bare E with no modifier', () => {
    const setOpen = vi.fn();
    renderHook(() => useKeyListener(setOpen));

    press({ key: 'e' });

    expect(setOpen).not.toHaveBeenCalled();
  });

  it('ignores other modified keys', () => {
    const setOpen = vi.fn();
    renderHook(() => useKeyListener(setOpen));

    press({ key: 's', ctrlKey: true });

    expect(setOpen).not.toHaveBeenCalled();
  });

  it('stops listening after unmount', () => {
    const setOpen = vi.fn();
    const { unmount } = renderHook(() => useKeyListener(setOpen));

    unmount();
    press({ key: 'e', ctrlKey: true });

    expect(setOpen).not.toHaveBeenCalled();
  });
});
