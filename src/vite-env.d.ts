/// <reference types="vite/client" />

/**
 * Every environment variable this app reads, in one place. If it isn't declared
 * here, it doesn't exist — which is exactly the guardrail that would have caught
 * the REACT_APP_ prefix that silently resolved to undefined for months.
 */
interface ImportMetaEnv {
  /** Google Analytics 4 measurement ID. Analytics stay off when unset. */
  readonly VITE_GA_TRACKING_ID?: string;
  /** Microsoft Clarity project ID. Clarity stays off when unset. */
  readonly VITE_CLARITY_PROJECT_ID?: string;
  /** Web3Forms access key backing the contact form. */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  /** Set to 'true' to play the cinematic boot sequence on load. */
  readonly VITE_LOADING_SCREEN_ENABLED?: string;
  /** Set to 'true' to show the under-construction ribbon in the header. */
  readonly VITE_UNDER_CONSTRUCTION_ENABLED?: string;
  /** Sentry DSN, from .env.production. Sentry stays silent when unset. */
  readonly VITE_SENTRY_DSN?: string;
  /**
   * Set by Vercel on its own builds: 'production', 'preview' or 'development'.
   * Absent anywhere else, which is how local builds know they're local.
   */
  readonly VITE_VERCEL_ENV?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** JSON Schema shape accepted by WebMCP tool registration. */
type JsonSchemaProperty = {
  type: string;
  description?: string;
  enum?: readonly string[];
  items?: JsonSchemaProperty;
  properties?: Record<string, JsonSchemaProperty>;
};

interface ModelContextTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties?: Record<string, JsonSchemaProperty>;
    required?: string[];
  };
  execute: (args: never) => Promise<unknown> | unknown;
}

interface WebModelContext {
  registerTool: (tool: ModelContextTool) => void | Promise<void>;
}

interface Navigator {
  modelContext?: WebModelContext;
}
