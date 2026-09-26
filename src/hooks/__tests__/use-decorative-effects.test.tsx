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
