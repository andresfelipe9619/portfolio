import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/loading-screen';
import OpenSourcePage from '@/pages/OpenSource';
import { Header } from '@/components/ui/navbar/header.tsx';
import { DraggableExplorer } from '@/components/ui/navbar/draggable-explorer.tsx';
import { useKeyListener } from '@/hooks/useKeyListener.tsx';

export default function App() {
  const [isLoading, setIsLoading] = useState(
    import.meta.env.VITE_LOADING_SCREEN_ENABLED === 'true',
  );
  const [explorerOpen, setExplorerOpen] = useState(false);

  useKeyListener(setExplorerOpen);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider delayDuration={0}>
        <div className={cn('min-h-screen bg-background font-sans antialiased')}>
          {isLoading ? (
            <LoadingScreen onSkip={() => setIsLoading(false)} />
          ) : (
            <>
              <Header onClick={() => setExplorerOpen((v) => !v)} />
              <DraggableExplorer
                open={explorerOpen}
                onClose={() => setExplorerOpen(false)}
              />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/oss" element={<OpenSourcePage />} />
              </Routes>
            </>
          )}
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
