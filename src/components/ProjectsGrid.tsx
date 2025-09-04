
import { useMemo, useState } from 'react';
import { TIMELINE_DATA } from '@/data/timeline';
import { flattenTimeline } from '@/lib/timeline';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import ProjectDialog from '@/components/project-dialog';

export default function ProjectsGrid() {
  const items = useMemo(() => flattenTimeline(TIMELINE_DATA.timeline), []);
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
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
          <Card
            key={`${it.year}-${i}-${it.title}`}
            className={cn(
              'transform-gpu cursor-pointer select-none rounded-xl p-3 ring-1 ring-white/10 transition-all hover:bg-white/5',
            )}
            onClick={() => handleProjectClick(it)}
          >
            <CardContent className="p-0">
              <div className="text-left">
                <div className="text-xs text-white/50">{it.year}</div>
                <div className="font-medium">{it.title}</div>
                <div className="text-xs text-white/60">
                  {it.area && <span>{it.area}</span>}
                  {it.kind && it.area && <span> · </span>}
                  {it.kind && <span>{it.kind}</span>}
                  {it.stack?.length ? (
                    <>
                      <span> · </span>
                      <span className="text-white/50">
                        {it.stack.slice(0, 3).join(', ')}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
