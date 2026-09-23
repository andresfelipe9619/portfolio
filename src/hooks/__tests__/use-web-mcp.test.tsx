import { renderHook } from '@testing-library/react';
import { vi, beforeEach, afterEach } from 'vitest';
import { useWebMCP } from '../use-web-mcp';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => navigateMock };
});

type RegisteredTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: never) => Promise<unknown> | unknown;
};

describe('useWebMCP', () => {
  let registered: RegisteredTool[];

  beforeEach(() => {
    vi.clearAllMocks();
    registered = [];
    (navigator as Navigator).modelContext = {
      registerTool: (tool) => {
        registered.push(tool as RegisteredTool);
      },
    };
  });

  afterEach(() => {
    delete (navigator as Navigator).modelContext;
  });

  it('registers both browser tools when modelContext exists', () => {
    renderHook(() => useWebMCP());

    expect(registered.map((t) => t.name)).toEqual([
      'navigate_to_page',
      'get_contact_info',
    ]);
  });

  it('gives every tool a description and an input schema', () => {
    renderHook(() => useWebMCP());

    for (const tool of registered) {
      expect(tool.description).toBeTruthy();
      expect(tool.inputSchema).toMatchObject({ type: 'object' });
    }
  });

  it('navigate_to_page routes to the requested path', async () => {
    renderHook(() => useWebMCP());

    const navTool = registered.find((t) => t.name === 'navigate_to_page');
    const result = (await navTool?.execute({ path: '/projects' } as never)) as {
      success: boolean;
      message: string;
    };

    expect(navigateMock).toHaveBeenCalledWith('/projects');
    expect(result.success).toBe(true);
    expect(result.message).toContain('/projects');
  });

  it('get_contact_info returns the public profile', async () => {
    renderHook(() => useWebMCP());

    const infoTool = registered.find((t) => t.name === 'get_contact_info');
    const info = (await infoTool?.execute(undefined as never)) as Record<
      string,
      string
    >;

    expect(info).toMatchObject({
      github: expect.stringContaining('github.com'),
      linkedin: expect.stringContaining('linkedin.com'),
    });
    expect(info.name).toBeTruthy();
  });

  it('does nothing at all when modelContext is unavailable', () => {
    delete (navigator as Navigator).modelContext;

    expect(() => renderHook(() => useWebMCP())).not.toThrow();
    expect(registered).toHaveLength(0);
  });
});
