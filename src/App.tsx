import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/loading-screen';
import OpenSourcePage from '@/pages/OpenSource';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

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
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/open-source" element={<OpenSourcePage />} />
              </Routes>
            </>
          )}
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
