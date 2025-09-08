// src/components/oss-card.tsx
import * as React from 'react';
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card';
import { Badge } from '@/components/ui/badge';
import { Github } from 'lucide-react';
import { cn, projectEmoji } from '@/lib/utils';
import { motion, type Variants } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useGitHubStats } from '@/hooks/useGitHubStats.tsx';
import type { OssCardProps } from '@/data/open-source.ts';
import { logEvent } from '@/lib/ga';

export function OssCard({
  title,
  href,
  subtitle,
  badges,
  year,
  enableModal = true,
  details,
  variants,
}: OssCardProps & { variants?: Variants }) {
  const [open, setOpen] = React.useState(false);
  const stats = useGitHubStats(href);

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!enableModal) return;
    if (e.metaKey || e.ctrlKey || e.button === 1) return;
    e.preventDefault();
    logEvent('OSS Card', 'Open Modal', title);
    setOpen(true);
  };

  return (
    <>
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group block h-full focus:outline-none transition-transform duration-200 group-hover:scale-105 font-dev"
        onClick={handleClick}
        variants={variants}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        <NeonGradientCard
          className={cn(
            'relative h-full rounded-2xl p-[1px]',
            'group-hover:opacity-100 opacity-80 transition',
          )}
          borderClassName="rounded-2xl"
          glowClassName="rounded-2xl opacity-80"
        >
          <div className="relative h-full rounded-2xl p-2">

            <div className="mb-2 flex items-center justify-between text-xs opacity-70">
              <span>{year}</span>

              {/* GitHub stats pill más contrastado */}
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-2 py-0.5 backdrop-blur-sm">
                <Github className="h-3.5 w-3.5 opacity-80" />
                <span className="tabular-nums">★ {stats?.stars ?? '—'}</span>
                <span className="opacity-60">·</span>
                <span className="tabular-nums">⑂ {stats?.forks ?? '—'}</span>
              </div>
            </div>

            <h3 className="mb-2 flex items-center gap-2 text-lg font-medium">
              <span className="text-base">{projectEmoji(title)}</span>
              {title}
            </h3>

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
      </motion.a>

      {/* Modal (zoom-in) — pro + dev-crazy */}
      <Dialog open={open} onOpenChange={setOpen}>
        {open && (
          <>
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur" />

            <DialogContent showCloseButton={false} className="z-50 w-[90vw] max-w-2xl overflow-hidden border-white/10 bg-background/90 p-0 shadow-2xl">
              <div className="overflow-hidden rounded-xl">
                {/* Terminal-ish header strip */}
                <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent px-4 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      onClick={() => setOpen(false)}
                      className="inline-flex h-2.5 w-2.5 cursor-pointer rounded-full bg-red-500/70"
                    />
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-500/70" />
                    <span className="ml-2 opacity-70 font-dev">
                      ~/oss/{title.toLowerCase().replace(/\s+/g, '-')}
                    </span>
                  </div>
                  <span className="rounded border border-white/10 px-2 py-0.5 text-[11px]">
                    {year}
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
                    <DialogTitle className="text-xl font-dev">
                      {projectEmoji(title)} {title}
                    </DialogTitle>
                    <DialogDescription className="flex flex-wrap items-center gap-2 text-xs">
                      {badges.slice(0, 6).map((b) => (
                        <Badge
                          key={b}
                          variant="secondary"
                          className="text-[11px]"
                        >
                          {b}
                        </Badge>
                      ))}
                      <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-2 py-0.5 backdrop-blur-sm">
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

                    {details?.topics && details.topics.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {details.topics.map((t) => (
                          <Badge
                            key={t}
                            variant="topic"
                            className="text-[11px]"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <DialogFooter className="mt-2 flex items-center justify-between gap-3">
                    <div className="text-xs opacity-70">
                      Built in public. PRs welcome.
                    </div>
                    <div className="flex items-center gap-2">
                      <Button asChild className="gap-2" onClick={() => logEvent('OSS Card', 'Open on GitHub', title)}>
                        <a href={href} target="_blank" rel="noreferrer">
                          <Github className="h-4 w-4" />
                          Open on GitHub
                        </a>
                      </Button>
                    </div>
                  </DialogFooter>
                </div>
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
}
