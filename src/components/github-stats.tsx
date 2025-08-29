// src/components/oss/github-stats.tsx
import * as React from 'react';

type Stats = { stars: number; forks: number };

function parseRepo(url: string): { owner: string; name: string } | null {
  try {
    const u = new URL(url);
    const [, owner, name] = u.pathname.split('/');
    if (owner && name) return { owner, name };
  } catch {
    /* empty */
  }
  return null;
}

export function useGitHubStats(repoUrl?: string) {
  const [stats, setStats] = React.useState<Stats | null>(null);

  React.useEffect(() => {
    if (!repoUrl) return;
    const parsed = parseRepo(repoUrl);
    if (!parsed) return;

    const key = `gh:${parsed.owner}/${parsed.name}`;
    const cached = sessionStorage.getItem(key);
    if (cached) {
      try {
        setStats(JSON.parse(cached));
      } catch {
        /* empty */
      }
    }

    fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.name}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!json) return;
        const s = {
          stars: json.stargazers_count ?? 0,
          forks: json.forks_count ?? 0,
        };
        setStats(s);
        sessionStorage.setItem(key, JSON.stringify(s));
      })
      .catch(() => {});
  }, [repoUrl]);

  return stats;
}
