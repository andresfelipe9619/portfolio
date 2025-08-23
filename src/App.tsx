import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/loading-screen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider delayDuration={0}>
        <div className={cn('min-h-screen bg-background font-sans antialiased')}>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </>
          )}
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
