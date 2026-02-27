import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/loading-screen';
import OpenSourcePage from '@/pages/OpenSource';
import { Header } from '@/components/ui/navbar/header.tsx';
import { DraggableExplorer } from '@/components/ui/navbar/draggable-explorer.tsx';
import { useKeyListener } from '@/hooks/useKeyListener.tsx';
import { useHackAttemptEasterEgg } from '@/hooks/use-easter-egg';
import { logPageView } from './lib/ga';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import CaseStudy from './pages/CaseStudy';
import ErrorBoundary from '@/components/error-boundary';

export default function App() {
  const [isLoading, setIsLoading] = useState(
    import.meta.env.VITE_LOADING_SCREEN_ENABLED === 'true',
  );
  const [explorerOpen, setExplorerOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useKeyListener(setExplorerOpen);
  useHackAttemptEasterEgg(
    location.pathname,
    t('easterEggs.hackPathTitle'),
    t('easterEggs.hackDesc'),
    t('easterEggs.hackShortcutTitle'),
  );

  useEffect(() => {
    logPageView();
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <Toaster position="top-center" richColors theme="dark" closeButton />
      <TooltipProvider delayDuration={0}>
        <div className={cn('min-h-screen bg-background font-sans antialiased')}>
          {isLoading ? (
            <LoadingScreen onSkip={() => setIsLoading(false)} />
          ) : (
            <ErrorBoundary>
              <Header onClick={() => setExplorerOpen((v) => !v)} />
              <DraggableExplorer
                open={explorerOpen}
                onClose={() => setExplorerOpen(false)}
              />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/oss" element={<OpenSourcePage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/case-studies/:id" element={<CaseStudy />} />
              </Routes>
            </ErrorBoundary>
          )}
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
