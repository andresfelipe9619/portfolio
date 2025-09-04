import { Link } from 'react-router-dom';
import { File, Folder, Tree } from '@/components/magicui/file-tree.tsx';
import { LinkIcon } from 'lucide-react';

export function MobileNavFileTree() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <Tree
        className="overflow-auto p-2 text-sm select-none font-mono"
        initialSelectedId="pages"
        initialExpandedItems={['src', 'pages']}
        aria-label="Site sections explorer"
      >
        <Folder element="src" value="src">
          <Folder element="assets" value="assets" />
          <Folder element="components" value="components">
              <Folder element="magicui" value="magicui">
                <File value="f_animated-grid-pattern">
                  <span className="block px-1 py-0.5">animated-grid-pattern.tsx</span>
                </File>
                <File value="f_aurora-text">
                  <span className="block px-1 py-0.5">aurora-text.tsx</span>
                </File>
                <File value="f_blur-fade-text">
                  <span className="block px-1 py-0.5">blur-fade-text.tsx</span>
                </File>
                <File value="f_blur-fade">
                  <span className="block px-1 py-0.5">blur-fade.tsx</span>
                </File>
                <File value="f_confetti">
                  <span className="block px-1 py-0.5">confetti.tsx</span>
                </File>
                <File value="f_cool-mode">
                  <span className="block px-1 py-0.5">cool-mode.tsx</span>
                </File>
                <File value="f_dock">
                  <span className="block px-1 py-0.5">dock.tsx</span>
                </File>
                <File value="f_dot-pattern">
                  <span className="block px-1 py-0.5">dot-pattern.tsx</span>
                </File>
                <File value="f_file-tree">
                  <span className="block px-1 py-0.5">file-tree.tsx</span>
                </File>
                <File value="f_flickering-grid">
                  <span className="block px-1 py-0.5">flickering-grid.tsx</span>
                </File>
                <File value="f_globe">
                  <span className="block px-1 py-0.5">globe.tsx</span>
                </File>
                <File value="f_grid-beams">
                  <span className="block px-1 py-0.5">grid-beams.tsx</span>
                </File>
                <File value="f_grid-pattern">
                  <span className="block px-1 py-0.5">grid-pattern.tsx</span>
                </File>
                <File value="f_highlighter">
                  <span className="block px-1 py-0.5">highlighter.tsx</span>
                </File>
                <File value="f_interactive-grid-pattern">
                  <span className="block px-1 py-0.5">interactive-grid-pattern.tsx</span>
                </File>
                <File value="f_marquee">
                  <span className="block px-1 py-0.5">marquee.tsx</span>
                </File>
                <File value="f_neon-gradient-card">
                  <span className="block px-1 py-0.5">neon-gradient-card.tsx</span>
                </File>
                <File value="f_particles">
                  <span className="block px-1 py-0.5">particles.tsx</span>
                </File>
                <File value="f_rainbow-button">
                  <span className="block px-1 py-0.5">rainbow-button.tsx</span>
                </File>
                <File value="f_retro-grid">
                  <span className="block px-1 py-0.5">retro-grid.tsx</span>
                </File>
                <File value="f_ripple">
                  <span className="block px-1 py-0.5">ripple.tsx</span>
                </File>
                <File value="f_scratch-to-reveal">
                  <span className="block px-1 py-0.5">scratch-to-reveal.tsx</span>
                </File>
                <File value="f_shimmer-button">
                  <span className="block px-1 py-0.5">shimmer-button.tsx</span>
                </File>
                <File value="f_terminal">
                  <span className="block px-1 py-0.5">terminal.tsx</span>
                </File>
                <File value="f_typing-animation">
                  <span className="block px-1 py-0.5">typing-animation.tsx</span>
                </File>
                <File value="f_warp-background">
                  <span className="block px-1 py-0.5">warp-background.tsx</span>
                </File>
              </Folder>
              <Folder element="ui" value="ui">
                <Folder element="navbar" value="navbar">
                  <File value="f_breadcrumb">
                    <span className="block px-1 py-0.5">breadcrumb.tsx</span>
                  </File>
                  <File value="f_draggable-explorer">
                    <span className="block px-1 py-0.5">draggable-explorer.tsx</span>
                  </File>
                  <File value="f_header">
                    <span className="block px-1 py-0.5">header.tsx</span>
                  </File>
                  <File value="f_mobilenav-file-tree">
                    <span className="block px-1 py-0.5">mobilenav-file-tree.tsx</span>
                  </File>
                </Folder>
                <File value="f_accordion">
                  <span className="block px-1 py-0.5">accordion.tsx</span>
                </File>
                <File value="f_avatar">
                  <span className="block px-1 py-0.5">avatar.tsx</span>
                </File>
                <File value="f_badge">
                  <span className="block px-1 py-0.5">badge.tsx</span>
                </File>
                <File value="f_button">
                  <span className="block px-1 py-0.5">button.tsx</span>
                </File>
                <File value="f_card">
                  <span className="block px-1 py-0.5">card.tsx</span>
                </File>
                <File value="f_dialog">
                  <span className="block px-1 py-0.5">dialog.tsx</span>
                </File>
                <File value="f_input">
                  <span className="block px-1 py-0.5">input.tsx</span>
                </File>
                <File value="f_label">
                  <span className="block px-1 py-0.5">label.tsx</span>
                </File>
                <File value="f_popover">
                  <span className="block px-1 py-0.5">popover.tsx</span>
                </File>
                <File value="f_progress">
                  <span className="block px-1 py-0.5">progress.tsx</span>
                </File>
                <File value="f_scroll-area">
                  <span className="block px-1 py-0.5">scroll-area.tsx</span>
                </File>
                <File value="f_separator">
                  <span className="block px-1 py-0.5">separator.tsx</span>
                </File>
                <File value="f_sheet">
                  <span className="block px-1 py-0.5">sheet.tsx</span>
                </File>
                <File value="f_textarea">
                  <span className="block px-1 py-0.5">textarea.tsx</span>
                </File>
                <File value="f_tooltip">
                  <span className="block px-1 py-0.5">tooltip.tsx</span>
                </File>
              </Folder>
              <File value="f_constants">
                <span className="block px-1 py-0.5">constants.ts</span>
              </File>
              <File value="f_error-boundary">
                <span className="block px-1 py-0.5">error-boundary.tsx</span>
              </File>
              <File value="f_icons">
                <span className="block px-1 py-0.5">icons.tsx</span>
              </File>
              <File value="f_joke-dialog">
                <span className="block px-1 py-0.5">joke-dialog.tsx</span>
              </File>
              <File value="f_loading-screen">
                <span className="block px-1 py-0.5">loading-screen.tsx</span>
              </File>
              <File value="f_mode-toggle">
                <span className="block px-1 py-0.5">mode-toggle.tsx</span>
              </File>
              <File value="f_oss-card">
                <span className="block px-1 py-0.5">oss-card.tsx</span>
              </File>
              <File value="f_theme-provider">
                <span className="block px-1 py-0.5">theme-provider.tsx</span>
              </File>
              <File value="f_timeline-card">
                <span className="block px-1 py-0.5">timeline-card.tsx</span>
              </File>
              <File value="f_timeline-globe">
                <span className="block px-1 py-0.5">timeline-globe.tsx</span>
              </File>
              <File value="f_timeline-roulette">
                <span className="block px-1 py-0.5">timeline-roulette.tsx</span>
              </File>
              <File value="f_virus-scan-dialog">
                <span className="block px-1 py-0.5">virus-scan-dialog.tsx</span>
              </File>
          </Folder>
          <Folder element="data" value="data">
            <File value="f_copy">
              <span className="block px-1 py-0.5">copy.ts</span>
            </File>
            <File value="f_open-source">
              <span className="block px-1 py-0.5">open-source.ts</span>
            </File>
            <File value="f_resume">
              <span className="block px-1 py-0.5">resume.tsx</span>
            </File>
            <File value="f_timeline">
              <span className="block px-1 py-0.5">timeline.ts</span>
            </File>
            <File value="f_work">
              <span className="block px-1 py-0.5">work.ts</span>
            </File>
          </Folder>
          <Folder element="hooks" value="hooks">
            <File value="f_github-stats">
              <span className="block px-1 py-0.5">github-stats.tsx</span>
            </File>
            <File value="f_useKeyListener">
              <span className="block px-1 py-0.5">useKeyListener.tsx</span>
            </File>
          </Folder>
          <Folder element="lib" value="lib">
            <File value="f_utils">
              <span className="block px-1 py-0.5">utils.ts</span>
            </File>
          </Folder>
            <Folder element="pages" value="pages">
              <File value="f_Contact">
                <Link to="/contact" className="block px-1 py-0.5 flex items-center gap-1">
                  <LinkIcon className="w-3 h-3" />
                  Contact.tsx
                </Link>
              </File>
              <File value="f_Home">
                <Link to="/" className="block px-1 py-0.5 flex items-center gap-1">
                  <LinkIcon className="w-3 h-3" />
                  Home.tsx
                </Link>
              </File>
              <File value="f_OpenSource">
                <Link to="/oss" className="block px-1 py-0.5 flex items-center gap-1">
                  <LinkIcon className="w-3 h-3" />
                  OpenSource.tsx
                </Link>
              </File>
            </Folder>
            <Folder element="sections" value="sections">
              <File value="f_experience-roulette">
                <span className="block px-1 py-0.5">experience-roulette.tsx</span>
              </File>
              <File value="f_footer">
                <span className="block px-1 py-0.5">footer.tsx</span>
              </File>
              <File value="f_oss-highlights">
                <span className="block px-1 py-0.5">oss-highlights.tsx</span>
              </File>
            </Folder>
          <File value="f_App">
            <span className="block px-1 py-0.5">App.tsx</span>
          </File>
          <File value="f_index.css">
            <span className="block px-1 py-0.5">index.css</span>
          </File>
          <File value="f_logo.svg">
            <span className="block px-1 py-0.5">logo.svg</span>
          </File>
          <File value="f_main">
            <span className="block px-1 py-0.5">main.tsx</span>
          </File>
          <File value="f_vite-env.d">
            <span className="block px-1 py-0.5">vite-env.d.ts</span>
          </File>
        </Folder>
      </Tree>
    </div>
  );
}
