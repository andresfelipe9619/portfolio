
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { QuoteIcon } from 'lucide-react';

const ProjectDialog = ({ open, onOpenChange, project }) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="text-xs text-white/50">{project.year}</div>
          <div className="text-xs text-white/60">
            {project.area && <span>{project.area}</span>}
            {project.kind && project.area && <span> · </span>}
            {project.kind && <span>{project.kind}</span>}
          </div>
          <p className="mt-4">{project.description}</p>
          {project.stack?.length ? (
            <div className="mt-4">
              <h4 className="font-medium">Stack:</h4>
              <ul className="list-disc list-inside">
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {project.testimonial && (
            <div className="mt-4">
              <QuoteIcon className="h-5 w-5 text-blue-300" />
              <blockquote className="mt-2 text-sm italic leading-relaxed text-white/80">
                {project.testimonial}
              </blockquote>
            </div>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
