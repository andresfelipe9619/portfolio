import * as React from 'react';
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Github } from 'lucide-react';
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

export type OssCardDetails = {
  longDescription?: string;
  topics?: string[];
  repoUrl?: string;      // GitHub link
  coverUrl?: string;     // optional image/cover for modal
};

export type OssCardProps = {
  title: string;
  href: string;
  subtitle: string;
  badges: ReadonlyArray<string>;
  year: string;
  active: boolean;
  /** enable modal on click (default: false) */
  enableModal?: boolean;
  /** extra content for the modal */
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
  const isExternal = href?.startsWith('http');
  const [open, setOpen] = React.useState(false);

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!enableModal) return; // behave like a link
    // Respect Ctrl/Cmd-click and middle click to open in new tab
    if (e.metaKey || e.ctrlKey || e.button === 1) return;
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
        className="group block h-full focus:outline-none"
        onClick={handleClick}
      >
        <NeonGradientCard
          className={cn(
            'h-full rounded-2xl p-[1px] transition-transform duration-200 group-hover:-translate-y-0.5',
            'group-hover:opacity-100 opacity-60 transition'
          )}
          borderClassName="rounded-2xl"
          // typo fix: opacity
          glowClassName="rounded-2xl opacity-80"
        >
          {/* Shared element feel: wrap content for subtle scale on hover */}
          <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-5">
            <div className="mb-2 flex items-center justify-between text-xs opacity-70">
              <span>{year}</span>
              <ArrowUpRight className="h-4 w-4 transition-opacity group-hover:opacity-100" />
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

      {/* Modal (zoom in) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop fade */}
              <motion.div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Content zoom-in */}
              <DialogContent
                // Keep Dialog structure for a11y; animate inner wrapper:
                className="z-50 border-white/10 bg-background/90 p-0 shadow-2xl sm:max-w-2xl"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden rounded-xl"
                >
                  {/* Optional cover */}
                  {details?.coverUrl ? (
                    <div className="relative h-44 w-full overflow-hidden">
                      <img
                        src={details.coverUrl}
                        alt=""
                        className="h-full w-full object-cover opacity-90"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                    </div>
                  ) : null}

                  <div className="space-y-4 p-6">
                    <DialogHeader>
                      <DialogTitle className="text-xl">{title}</DialogTitle>
                      <DialogDescription className="flex items-center gap-2 text-xs">
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
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
                      <p className="opacity-90">{details?.longDescription ?? subtitle}</p>

                      {details?.topics && details.topics.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {details.topics.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-foreground/80"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <DialogFooter className="mt-4 flex items-center justify-between gap-3">
                      <div className="text-xs opacity-70">
                        Built in public. Contributions welcome.
                      </div>
                      <div className="flex items-center gap-2">
                        {details?.repoUrl && (
                          <Button
                            asChild
                            variant="secondary"
                            className="gap-2"
                          >
                            <a href={details.repoUrl} target="_blank" rel="noreferrer">
                              <Github className="h-4 w-4" />
                              GitHub
                            </a>
                          </Button>
                        )}
                        <Button asChild className="gap-2">
                          <a href={href} target="_blank" rel="noreferrer">
                            Open Project
                            <ArrowUpRight className="h-4 w-4" />
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