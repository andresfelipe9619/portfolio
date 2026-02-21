
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Highlighter } from '@/components/magicui/highlighter';
import { type FlattenedItem } from '@/lib/timeline';
import { ExternalLink, QuoteIcon } from 'lucide-react';

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: FlattenedItem | null;
}

const ProjectDialog = ({ open, onOpenChange, project }: ProjectDialogProps) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {project.flag && <span>{project.flag}</span>}
            <Highlighter delay={200} iterations={2} action={"underline"}>{project.title}</Highlighter>
          </DialogTitle>
          <DialogDescription className="text-sm text-white/60">
            {project.year}
            {project.area && <span> · {project.area}</span>}
            {project.kind && <span> · {project.kind}</span>}
            {project.country && <span> · {project.country}</span>}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4 text-sm leading-relaxed">
          {project.summary && <p>{project.summary}</p>}
          {project.stack?.length ? (
            <div>
              <h4 className="font-medium">Tech Stack</h4>
              <div className="mt-1 flex flex-wrap gap-1">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
          {project.objectives && project.objectives.length > 0 && (
            <div>
              <h4 className="font-medium">Objectives</h4>
              <ul className="mt-1 list-disc list-inside space-y-1">
                {project.objectives.map((obj) => (
                  <li key={obj}>{obj}</li>
                ))}
              </ul>
            </div>
          )}
          {project.achievements && project.achievements.length > 0 && (
            <div>
              <h4 className="font-medium">Achievements</h4>
              <ul className="mt-1 list-disc list-inside space-y-1">
                {project.achievements.map((ach) => (
                  <li key={ach}>{ach}</li>
                ))}
              </ul>
            </div>
          )}
          {project.links && project.links.length > 0 && (
            <div>
              <h4 className="font-medium">Links</h4>
              <ul className="mt-1 space-y-1">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-blue-400 hover:underline"
                      onClick={() => {
                        import('@/lib/ga').then(({ logEvent }) => {
                          logEvent('Projects', 'External Link Click', link.href);
                        });
                      }}
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {project.testimonial && (
            <div className="border-l-2 border-white/20 pl-4 italic">
              <QuoteIcon className="mb-1 h-4 w-4 text-blue-300" />
              {project.testimonial}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
