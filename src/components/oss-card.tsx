// src/components/oss-card.tsx
import * as React from 'react';
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card';
import { Badge } from '@/components/ui/badge';
import { Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useGitHubStats } from '@/components/github-stats';

export type OssCardDetails = {
  longDescription?: string;
  topics?: string[];
  repoUrl?: string; // GitHub link
  coverUrl?: string; // optional image
};

export type OssCardProps = {
  title: string;
  href: string; // GitHub link
  subtitle: string;
  badges: ReadonlyArray<string>;
  year: string;
  active: boolean;
  enableModal?: boolean;
  details?: OssCardDetails;
};

export function OssCard({
  title,
  href,
  subtitle,
  badges,
  year,
  enableModal = true,
  details,
}: OssCardProps) {
  const [open, setOpen] = React.useState(false);
  const stats = useGitHubStats(href);

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!enableModal) return;
    if (e.metaKey || e.ctrlKey || e.button === 1) return;
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group block h-full focus:outline-none"
        onClick={handleClick}
      >
        <NeonGradientCard
          className={cn(
            'h-full rounded-2xl p-[1px] transition-transform duration-200 group-hover:-translate-y-0.5',
            'group-hover:opacity-100 opacity-60 transition',
          )}
          borderClassName="rounded-2xl"
          glowClassName="rounded-2xl opacity-80"
        >
          <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-5">
            <div className="mb-2 flex items-center justify-between text-xs opacity-70">
              <span>{year}</span>

              {/* GitHub stats (no arrow icon) */}
              <div className="flex items-center gap-2 rounded-full border border-white/10 px-2 py-0.5">
                <Github className="h-3.5 w-3.5 opacity-80" />
                <span className="tabular-nums">★ {stats?.stars ?? '—'}</span>
                <span className="opacity-60">·</span>
                <span className="tabular-nums">⑂ {stats?.forks ?? '—'}</span>
              </div>
            </div>

            <h3 className="mb-2 text-lg font-medium">{title}</h3>
            <p className="mb-4 line-clamp-3 text-sm opacity-80">{subtitle}</p>

            <div className="flex flex-wrap gap-2">
              {badges.slice(0, 4).map((b) => (
                <Badge key={b} variant="secondary" className="text-[11px]">
                  {b}
                </Badge>
              ))}
            </div>
          </div>
        </NeonGradientCard>
      </a>

      {/* Modal (zoom-in) — professional + crazy dev touch */}
      <Dialog open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <DialogContent className="z-50 w-[90vw] max-w-2xl overflow-hidden border-white/10 bg-background/90 p-0 shadow-2xl">
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden rounded-xl"
                >
                  {/* Terminal-ish header strip */}
                  <div className="flex items-center gap-2 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent px-4 py-2 text-xs">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-500/70" />
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-500/70" />
                    <span className="ml-2 opacity-70">
                      ~/oss/{title.toLowerCase().replace(/\\s+/g, '-')}
                    </span>
                  </div>

                  {/* Optional cover */}
                  {details?.coverUrl && (
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={details.coverUrl}
                        alt=""
                        className="h-full w-full object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                    </div>
                  )}

                  <div className="space-y-4 p-6">
                    <DialogHeader>
                      <DialogTitle className="text-xl">{title}</DialogTitle>
                      <DialogDescription className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded border border-white/10 px-2 py-0.5 text-[11px]">
                          {year}
                        </span>
                        {badges.slice(0, 6).map((b) => (
                          <span
                            key={b}
                            className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-foreground/90"
                          >
                            {b}
                          </span>
                        ))}
                        <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/10 px-2 py-0.5">
                          <Github className="h-3.5 w-3.5 opacity-80" />
                          <span className="tabular-nums">
                            ★ {stats?.stars ?? '—'}
                          </span>
                          <span className="opacity-60">·</span>
                          <span className="tabular-nums">
                            ⑂ {stats?.forks ?? '—'}
                          </span>
                        </span>
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
                      <p className="opacity-90">{details?.longDescription}</p>

                      {/* dev-crazy touch: quickstart block */}
                      <div className="rounded-md border border-white/10 bg-black/40 p-3 font-mono text-[12.5px] leading-6">
                        <div className="mb-1 opacity-70"># quickstart</div>
                        <pre className="whitespace-pre-wrap">
                          {`git clone ${href}
cd ${title.toLowerCase().replace(/\s+/g, '-')}
pnpm i && pnpm dev  # or: npm i && npm run dev`}
                        </pre>
                      </div>

                      {details?.topics && details.topics.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {details.topics.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <DialogFooter className="mt-2 flex items-center justify-between gap-3">
                      <div className="text-xs opacity-70">
                        Built in public. PRs welcome.
                      </div>
                      <div className="flex items-center gap-2">
                        <Button asChild className="gap-2">
                          <a href={href} target="_blank" rel="noreferrer">
                            <Github className="h-4 w-4" />
                            Open on GitHub
                          </a>
                        </Button>
                      </div>
                    </DialogFooter>
                  </div>
                </motion.div>
              </DialogContent>
            </>
          )}
        </AnimatePresence>
      </Dialog>
    </>
  );
}
