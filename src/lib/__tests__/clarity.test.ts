import { vi, beforeEach, afterEach } from 'vitest';

const loadClarity = async (projectId?: string, consent = true) => {
  vi.resetModules();
  vi.stubEnv('VITE_CLARITY_PROJECT_ID', projectId ?? '');
  localStorage.setItem('analytics-consent', consent ? 'granted' : 'denied');
  return import('../clarity');
};

describe('initClarity', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    delete window.clarity;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('injects the tag script when a project id is configured', async () => {
    const { initClarity } = await loadClarity('abc123');
    initClarity();

    const script = document.getElementById(
      'clarity-script',
    ) as HTMLScriptElement | null;

    expect(script).not.toBeNull();
    expect(script?.src).toBe('https://www.clarity.ms/tag/abc123');
    expect(script?.async).toBe(true);
  });

  it('sets up the clarity command queue', async () => {
    const { initClarity } = await loadClarity('abc123');
    initClarity();

    expect(typeof window.clarity).toBe('function');
    window.clarity?.('set', 'key', 'value');
    expect(window.clarity?.q).toEqual([['set', 'key', 'value']]);
  });

  // The old inline script claimed "loads only if set" and then loaded anyway.
  it('stays completely inert when no project id is configured', async () => {
    const { initClarity } = await loadClarity();
    initClarity();

    expect(document.getElementById('clarity-script')).toBeNull();
    expect(window.clarity).toBeUndefined();
  });

  it('is idempotent — calling it twice injects one script', async () => {
    const { initClarity } = await loadClarity('abc123');
    initClarity();
    initClarity();

    expect(document.querySelectorAll('#clarity-script')).toHaveLength(1);
  });

  it('stays inert until the visitor consents', async () => {
    const { initClarity } = await loadClarity('abc123', false);
    initClarity();

    expect(document.getElementById('clarity-script')).toBeNull();
  });
});
