
import { useMemo, useState } from 'react';
import { TIMELINE_DATA } from '@/data/timeline';
import { flattenTimeline, type FlattenedItem } from '@/lib/timeline';
import { Badge } from '@/components/ui/badge';
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card';
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

  const handleProjectClick = (project: FlattenedItem) => {
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
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <NeonGradientCard
            key={`${it.year}-${i}-${it.title}`}
            className={cn(
              'relative cursor-pointer select-none rounded-xl p-5 transition-transform hover:scale-[1.02]',
            )}
            onClick={() => handleProjectClick(it)}
          >
            <Ripple className="opacity-40" />
            <div className="relative z-10 flex flex-col gap-2 text-left">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>{it.year}</span>
                {it.flag && <span className="text-lg leading-none">{it.flag}</span>}
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
          </NeonGradientCard>
        ))}
      </div>
    </>
  );
}
