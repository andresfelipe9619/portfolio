import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import {
  hasHardwareWebGL,
  useDecorativeEffects,
} from '../use-decorative-effects';

const UNMASKED_RENDERER_WEBGL = 0x9246;

/** Makes every canvas hand out a WebGL context reporting this renderer. */
const stubWebGL = (renderer: string | null) =>
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation((() =>
    renderer === null
      ? null
      : {
          getExtension: (name: string) =>
            name === 'WEBGL_debug_renderer_info'
              ? { UNMASKED_RENDERER_WEBGL }
              : { loseContext: () => undefined },
          getParameter: (p: number) =>
            p === UNMASKED_RENDERER_WEBGL ? renderer : null,
        }) as unknown as HTMLCanvasElement['getContext']);

describe('hasHardwareWebGL', () => {
  afterEach(() => vi.restoreAllMocks());

  it('is false when the browser won’t give us WebGL without a big caveat', () => {
    const getContext = stubWebGL(null);

    expect(hasHardwareWebGL()).toBe(false);
    expect(getContext).toHaveBeenCalledWith('webgl', {
      failIfMajorPerformanceCaveat: true,
    });
  });

  it.each([
    'Google SwiftShader',
    'ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)), SwiftShader driver)',
    'llvmpipe (LLVM 15.0.7, 256 bits)',
    'Microsoft Basic Render Driver',
  ])('is false for a software renderer: %s', (renderer) => {
    stubWebGL(renderer);

    expect(hasHardwareWebGL()).toBe(false);
  });

  it('is true for a real GPU', () => {
    stubWebGL('ANGLE (Apple, ANGLE Metal Renderer: Apple M1 Pro, Unspecified)');

    expect(hasHardwareWebGL()).toBe(true);
  });

  it('is false, not a crash, when asking for WebGL throws', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
      () => {
        throw new Error('WebGL is disabled by policy');
      },
    );

    expect(hasHardwareWebGL()).toBe(false);
  });
});

describe('useDecorativeEffects', () => {
  beforeEach(() => vi.useFakeTimers());

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('starts with everything off, so none of it competes with the first paint', () => {
    stubWebGL('Some GPU');

    const { result } = renderHook(() => useDecorativeEffects());

    expect(result.current).toEqual({ particles: false, globe: false });
  });

  it('switches on once the loaded page goes idle, the globe only with a GPU', () => {
    stubWebGL('Google SwiftShader');

    const { result } = renderHook(() => useDecorativeEffects());
    act(() => vi.advanceTimersByTime(250));

    expect(result.current).toEqual({ particles: true, globe: false });
  });

  it('turns the globe on when a GPU will draw it', () => {
    stubWebGL('ANGLE (NVIDIA GeForce RTX 3060)');

    const { result } = renderHook(() => useDecorativeEffects());
    act(() => vi.advanceTimersByTime(250));

    expect(result.current).toEqual({ particles: true, globe: true });
  });

  // "After load" means after load: a page that's still arriving has better
  // things to spend its main thread on.
  it('waits for the page to finish loading before anything starts', () => {
    stubWebGL('ANGLE (NVIDIA GeForce RTX 3060)');
    vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading');

    const { result } = renderHook(() => useDecorativeEffects());
    act(() => vi.advanceTimersByTime(5_000));
    expect(result.current).toEqual({ particles: false, globe: false });

    act(() => {
      window.dispatchEvent(new Event('load'));
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toEqual({ particles: true, globe: true });
  });

  it('asks for an idle moment where the browser offers one', () => {
    stubWebGL('ANGLE (NVIDIA GeForce RTX 3060)');
    let idle: () => void = () => undefined;
    const requestIdleCallback = vi.fn((callback: () => void) => {
      idle = callback;
      return 7;
    });
    vi.stubGlobal('requestIdleCallback', requestIdleCallback);

    const { result } = renderHook(() => useDecorativeEffects());
    expect(requestIdleCallback).toHaveBeenCalledWith(expect.any(Function), {
      timeout: 2000,
    });

    act(() => idle());
    expect(result.current).toEqual({ particles: true, globe: true });
  });

  it('cancels the idle callback if Home unmounts before it runs', () => {
    const cancelIdleCallback = vi.fn();
    vi.stubGlobal('requestIdleCallback', () => 7);
    vi.stubGlobal('cancelIdleCallback', cancelIdleCallback);

    const { unmount } = renderHook(() => useDecorativeEffects());
    unmount();

    expect(cancelIdleCallback).toHaveBeenCalledWith(7);
  });

  it('leaves both off for visitors saving data', () => {
    stubWebGL('ANGLE (NVIDIA GeForce RTX 3060)');
    vi.stubGlobal('navigator', {
      ...navigator,
      connection: { saveData: true },
    });

    const { result } = renderHook(() => useDecorativeEffects());
    act(() => vi.advanceTimersByTime(250));

    expect(result.current).toEqual({ particles: false, globe: false });
  });
});
