import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { lazy, useEffect, useState, Suspense } from 'react';
import LoadingScreen from '@/components/loading-screen';
import { Header } from '@/components/ui/navbar/header.tsx';
import { DraggableExplorer } from '@/components/ui/navbar/draggable-explorer.tsx';
import { useKeyListener } from '@/hooks/useKeyListener.tsx';
import { useHackAttemptEasterEgg } from '@/hooks/use-easter-egg';
import { useWebMCP } from '@/hooks/use-web-mcp';
import { useDocumentLanguage } from '@/hooks/use-document-language';
import { logPageView } from './lib/ga';
import ErrorBoundary from '@/components/error-boundary';
import { ConsentBanner } from '@/components/consent-banner';

// Lazy loaded pages to improve initial load time (LCP, INP)
const Home = lazy(() => import('./pages/Home'));
const OpenSourcePage = lazy(() => import('@/pages/OpenSource'));
const Contact = lazy(() => import('./pages/Contact'));
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const TestError = lazy(() => import('./pages/TestError'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const [isLoading, setIsLoading] = useState(
    import.meta.env.VITE_LOADING_SCREEN_ENABLED === 'true',
  );
  const [explorerOpen, setExplorerOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useWebMCP();
  useDocumentLanguage();
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
              <Suspense fallback={<LoadingScreen onSkip={() => {}} />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/oss" element={<OpenSourcePage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/case-studies/:id" element={<CaseStudy />} />
                  {/* Sentry's panic button. In dev, and on Vercel preview
                      deploys so the whole path (report, issue, alert email)
                      can be checked before a change ships. Never in
                      production, where it's a free way to burn error quota. */}
                  {(import.meta.env.DEV ||
                    import.meta.env.VITE_VERCEL_ENV === 'preview') && (
                    <Route path="/test-error" element={<TestError />} />
                  )}
                  {/* Catches everything else, so unknown URLs stop rendering
                      a blank page behind a cheerful HTTP 200. */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <ConsentBanner />
            </ErrorBoundary>
          )}
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
