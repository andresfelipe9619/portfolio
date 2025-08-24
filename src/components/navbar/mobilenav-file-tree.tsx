import { File, Folder, Tree } from '@/components/magicui/file-tree.tsx';

export function MobileNavFileTree() {
  return (
    <div className="relative flex h-[70vh] flex-col overflow-hidden rounded-lg border border-white/10 bg-background">
      <Tree
        className="overflow-auto rounded-md bg-background p-2 text-sm"
        initialSelectedId="f_home"
        initialExpandedItems={['src', 'app', '(pages)', '(sections)']}
        aria-label="Site sections explorer"
      >
        <Folder element="src" value="src">
          <Folder element="app" value="app">
            <Folder element="(pages)" value="(pages)">
              <File value="f_home">
                <a href="#hero" className="block px-1 py-0.5">
                  home.tsx
                </a>
              </File>
              <File value="f_projects">
                <a href="#projects-links" className="block px-1 py-0.5">
                  projects.tsx
                </a>
              </File>
              <File value="f_content">
                <a href="#content" className="block px-1 py-0.5">
                  content.tsx
                </a>
              </File>
              <File value="f_contact">
                <a href="#ready" className="block px-1 py-0.5">
                  contact.tsx
                </a>
              </File>
            </Folder>

            <Folder element="(sections)" value="(sections)">
              <File value="f_expert">
                <a href="#expert" className="block px-1 py-0.5">
                  expert.tsx
                </a>
              </File>
              <File value="f_services">
                <a href="#services" className="block px-1 py-0.5">
                  services.tsx
                </a>
              </File>
              <File value="f_testimonials">
                <a href="#testimonials" className="block px-1 py-0.5">
                  testimonials.tsx
                </a>
              </File>
              <File value="f_faq">
                <a href="#faq" className="block px-1 py-0.5">
                  faq.tsx
                </a>
              </File>
              <File value="f_footer">
                <a href="#footer" className="block px-1 py-0.5">
                  footer.tsx
                </a>
              </File>
            </Folder>
          </Folder>
        </Folder>
      </Tree>
    </div>
  );
}