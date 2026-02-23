import { Footer } from '@/sections/footer';
import ProjectsGrid from '@/components/ProjectsGrid';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

export default function Projects() {
  const { t } = useTranslation();
  return (
    <main className="relative flex flex-col min-h-[100dvh] overflow-hidden bg-gray-950 text-white">
      <section id="projects" className="relative py-24">
        <div className="relative z-10 mx-auto flex w-full max-w-none flex-col items-center px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4 text-sm font-mono">
              /projects
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
              {t('projectsTitle')}
            </h1>
            <p className="mx-auto mt-10 max-w-4xl text-balance text-white/70 md:text-lg">
              {t('projectsSubtitle')}
            </p>
          </div>
          <ProjectsGrid />
        </div>
      </section>
      <Footer />
    </main>
  );
}
