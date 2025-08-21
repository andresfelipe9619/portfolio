import Navbar from '@/components/navbar';
import {ThemeProvider} from '@/components/theme-provider';
import {TooltipProvider} from '@/components/ui/tooltip';
import {cn} from '@/lib/utils';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home.jsx';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider delayDuration={0}>
        <div
          className={cn(
            'min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6',
          )}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
