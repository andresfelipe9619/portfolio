import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROFILE } from '@/data/common';

export function useWebMCP() {
  const navigate = useNavigate();

  useEffect(() => {
    // Safely check if modelContext is available
    if (
      typeof window !== 'undefined' &&
      window.navigator &&
      window.navigator.modelContext
    ) {
      // 1. Tool to navigate the site
      window.navigator.modelContext.registerTool({
        name: 'navigate_to_page',
        description:
          'Navigates the user browser to a specific page on the portfolio (e.g., /, /projects, /contact, /oss, /blog).',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description:
                'The path to navigate to, e.g., "/" for Home, "/projects" for Projects, "/contact" for Contact.',
            },
          },
          required: ['path'],
        },
        execute: async (args: { path: string }) => {
          navigate(args.path);
          return { success: true, message: `Navigated to ${args.path}` };
        },
      });

      // 2. Tool to get basic contact info
      window.navigator.modelContext.registerTool({
        name: 'get_contact_info',
        description:
          'Gets the basic profile and contact information for Andrés Suárez.',
        inputSchema: {
          type: 'object',
          properties: {},
        },
        execute: async () => {
          return {
            name: PROFILE.name,
            location: PROFILE.location,
            url: PROFILE.url,
            summary: PROFILE.summary,
            description: PROFILE.description,
            github: 'https://github.com/andresfelipe9619',
            linkedin: 'https://linkedin.com/in/andresfelipe9619',
          };
        },
      });
    }
  }, [navigate]);
}
