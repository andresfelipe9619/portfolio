import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { File, Folder, Tree } from '@/components/magicui/file-tree.tsx';
import { LinkIcon } from 'lucide-react';

// Pull the repo tree straight from GitHub because hardcoding is so last commit.
const OWNER = 'andresfelipe9619';
const REPO = 'portfolio';
const BRANCH = 'master';

interface GitHubTreeItem {
  path: string;
  type: 'blob' | 'tree';
}

interface Node {
  name: string;
  path: string;
  type: 'file' | 'dir';
  children?: Record<string, Node>;
}

const PAGE_ROUTES: Record<string, string> = {
  Contact: '/contact',
  Home: '/',
  OpenSource: '/oss',
  Projects: '/projects',
  Blog: '/blog',
};

export function MobileNavFileTree() {
  const [tree, setTree] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`,
        );

        if (!res.ok) {
          throw new Error(`GitHub API responded with status: ${res.status}`);
        }

        const data: { tree: GitHubTreeItem[] } = await res.json();

        if (!data.tree) {
          throw new Error('GitHub API response missing tree datastructure');
        }

        const root: Record<string, Node> = {};

        for (const item of data.tree) {
          if (!item.path.startsWith('src')) continue;
          const parts = item.path.split('/');
          let current = root;

          parts.forEach((part, idx) => {
            const currentPath = parts.slice(0, idx + 1).join('/');
            const isFile = idx === parts.length - 1 && item.type === 'blob';
            if (isFile) {
              current[part] = {
                name: part,
                path: currentPath,
                type: 'file',
              };
            } else {
              current[part] = current[part] ?? {
                name: part,
                path: currentPath,
                type: 'dir',
                children: {},
              };
              current = current[part].children!;
            }
          });
        }

        const toArray = (obj: Record<string, Node>): Node[] =>
          Object.values(obj).sort((a, b) => {
            if (a.type === b.type) return a.name.localeCompare(b.name);
            return a.type === 'dir' ? -1 : 1;
          });

        setTree(toArray(root));
        setLoading(false);
      } catch (err) {
        // If the API call fails or rate limited, gracefully fallback to a hardcoded tree for the essential pages
        console.error('Failed to fetch tree from GitHub:', err);
        const fallbackTree: Node[] = [
          {
            name: 'src',
            path: 'src',
            type: 'dir',
            children: {
              pages: {
                name: 'pages',
                path: 'src/pages',
                type: 'dir',
                children: Object.keys(PAGE_ROUTES).reduce(
                  (acc, key) => {
                    const fileName = `${key}.tsx`;
                    acc[fileName] = {
                      name: fileName,
                      path: `src/pages/${fileName}`,
                      type: 'file',
                    };
                    return acc;
                  },
                  {} as Record<string, Node>,
                ),
              },
            },
          },
        ];

        // We set the fallback tree similar to the toArray(root) format used above
        const formattedFallback: Node[] = [
          {
            name: 'src',
            path: 'src',
            type: 'dir',
            children: fallbackTree[0].children,
          },
        ];

        setTree(formattedFallback);
        setLoading(false);
      }
    };

    fetchTree();
  }, []);

  const renderNodes = (nodes: Node[]): React.ReactNode =>
    nodes.map((node) =>
      node.type === 'dir' ? (
        <Folder key={node.path} element={node.name} value={node.path}>
          {node.children ? renderNodes(Object.values(node.children)) : null}
        </Folder>
      ) : (
        <File key={node.path} value={node.path}>
          {node.path.startsWith('src/pages/') &&
            PAGE_ROUTES[node.name.replace(/\.tsx$/, '')] ? (
            <Link
              to={PAGE_ROUTES[node.name.replace(/\.tsx$/, '')]}
              className="block px-1 py-0.5 flex items-center gap-1"
            >
              <LinkIcon className="w-3 h-3" />
              {node.name}
            </Link>
          ) : (
            <span className="block px-1 py-0.5">{node.name}</span>
          )}
        </File>
      ),
    );

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      {loading ? (
        <div className="p-4 text-sm font-mono text-muted-foreground animate-pulse flex items-center gap-2">
          <span className="animate-spin">🌀</span>
          Asking the Octocat for directions...
        </div>
      ) : (
        <Tree
          className="overflow-auto p-2 text-sm select-none font-mono"
          initialSelectedId="src/pages"
          initialExpandedItems={['src', 'src/pages']}
          aria-label="Site sections explorer"
        >
          {renderNodes(tree)}
        </Tree>
      )}
    </div>
  );
}
