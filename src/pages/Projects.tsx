
import { Footer } from '@/sections/footer';
import ProjectsGrid from '@/components/ProjectsGrid';
import { Badge } from '@/components/ui/badge';

export default function Projects() {
  return (
    <main className="relative flex flex-col min-h-[100dvh] overflow-hidden bg-gray-950 text-white">
      <section id="projects" className="relative py-24">
        <div className="relative z-10 mx-auto flex w-full max-w-none flex-col items-center px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4 text-sm font-mono">
              /projects
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
              Projects
            </h1>
            <p className="mx-auto mt-10 max-w-4xl text-balance text-white/70 md:text-lg">
              Here are some of the projects I've worked on.
            </p>
          </div>
          <ProjectsGrid />
        </div>
      </section>
      <Footer />
    </main>
  );
}
