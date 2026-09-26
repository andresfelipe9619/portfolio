import { useEffect, useState } from 'react';

export interface DecorativeEffects {
  particles: boolean;
  globe: boolean;
}

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

/**
 * True when WebGL would be drawn by a GPU. Without one, browsers fall back to
 * software renderers (SwiftShader, llvmpipe, "Microsoft Basic Render Driver"),
 * where every frame of the globe lands on the main thread. That's the
 * difference between a pretty planet and a frozen page.
 */
export function hasHardwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl', {
      failIfMajorPerformanceCaveat: true,
    });
    if (!gl) return false;

    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = info
      ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL))
      : '';
    gl.getExtension('WEBGL_lose_context')?.loseContext();

    return !/swiftshader|llvmpipe|software|basic render/i.test(renderer);
  } catch {
    return false;
  }
}

/**
 * The hero's globe and particles are decoration, so they wait their turn:
 * nothing starts until the page has loaded and the browser is idle, nothing
 * starts for visitors who asked to save data, and the globe only spins where
 * a GPU will draw it. Before this, a GPU-less machine spent tens of seconds of
 * main thread on them while the page was still trying to become usable.
 */
export function useDecorativeEffects(): DecorativeEffects {
  const [effects, setEffects] = useState<DecorativeEffects>({
    particles: false,
    globe: false,
  });

  useEffect(() => {
    let cancelled = false;
    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;

    const decide = () => {
      if (cancelled) return;
      const saveData =
        (navigator as NavigatorWithConnection).connection?.saveData === true;
      setEffects({
        particles: !saveData,
        globe: !saveData && hasHardwareWebGL(),
      });
    };

    const whenIdle = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleHandle = window.requestIdleCallback(decide, { timeout: 2000 });
      } else {
        timeoutHandle = setTimeout(decide, 200);
      }
    };

    if (document.readyState === 'complete') whenIdle();
    else window.addEventListener('load', whenIdle, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', whenIdle);
      if (idleHandle !== undefined) window.cancelIdleCallback?.(idleHandle);
      if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
    };
  }, []);

  return effects;
}
