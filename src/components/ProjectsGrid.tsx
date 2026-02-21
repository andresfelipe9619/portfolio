import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TIMELINE_DATA } from '@/data/timeline';
import { type FlattenedItem, flattenTimeline } from '@/lib/timeline';
import { Badge } from '@/components/ui/badge';
import { Ripple } from '@/components/magicui/ripple';
import { cn } from '@/lib/utils';
import ProjectDialog from '@/components/project-dialog';

export default function ProjectsGrid() {
  const items = useMemo<FlattenedItem[]>(
    () => flattenTimeline(TIMELINE_DATA.timeline),
    [],
  );
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<FlattenedItem | null>(
    null,
  );
  const [filter, setFilter] = useState('All');

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const it of items) if (it.area) set.add(it.area);
    return Array.from(set).sort();
  }, [items]);

  const filteredItems = useMemo(
    () =>
      filter === 'All'
        ? items
        : items.filter((it) => it.area === filter),
    [items, filter],
  );

  const handleProjectClick = (project: FlattenedItem) => {
    import('@/lib/ga').then(({ logEvent }) => {
      logEvent('Projects', 'View Detail', project.title);
    });
    setSelectedProject(project);
    setShowProjectDialog(true);
  };

  return (
    <>
      <ProjectDialog
        open={showProjectDialog}
        onOpenChange={setShowProjectDialog}
        project={selectedProject}
      />
      <div className="mt-12 w-full">
        <div className="flex flex-wrap justify-center gap-2">
          <Badge
            variant={filter === 'All' ? 'secondary' : 'outline'}
            onClick={() => setFilter('All')}
            className="cursor-pointer"
          >
            All
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={filter === cat ? 'secondary' : 'outline'}
              onClick={() => setFilter(cat)}
              className="cursor-pointer"
            >
              {cat}
            </Badge>
          ))}
        </div>
        <motion.div
          layout
          className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredItems.map((it) => (
              <motion.div
                layout
                key={it.index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  'relative cursor-pointer select-none rounded-xl p-5 transition-transform',
                )}
                onClick={() => handleProjectClick(it)}
              >
                <Ripple className="opacity-40" />
                <div className="relative z-10 flex flex-col gap-2 text-left">
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>{it.year}</span>
                    {it.flag && (
                      <span className="text-lg leading-none">{it.flag}</span>
                    )}
                  </div>
                  <div className="font-medium">{it.title}</div>
                  <div className="text-xs text-white/60">
                    {it.area && <span>{it.area}</span>}
                    {it.kind && it.area && <span> · </span>}
                    {it.kind && <span>{it.kind}</span>}
                  </div>
                  {it.stack?.length ? (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {it.stack.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
