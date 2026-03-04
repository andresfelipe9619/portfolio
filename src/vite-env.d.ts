/// <reference types="vite/client" />

interface ModelContextTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties?: Record<string, any>;
    required?: string[];
    [key: string]: any;
  };
  execute: (args: any) => Promise<any> | any;
}

interface WebModelContext {
  registerTool: (tool: ModelContextTool) => void | Promise<void>;
}

interface Navigator {
  modelContext?: WebModelContext;
}
