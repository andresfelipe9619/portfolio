import { Link } from 'react-router-dom';
import { DATA } from '@/data/resume.tsx';
import { Dock, DockIcon } from '@/components/magicui/dock.tsx';
import { Terminal } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet.tsx';
import { Button } from '@/components/ui/button.tsx';
import { MobileNavFileTree } from './mobilenav-file-tree';
import { Breadcrumb } from './breadcrumb';

export function Header(props: { onClick: () => void }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gray-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-3">
          <span className="text-sm font-semibold">{DATA.name}</span>
        </Link>
        <Breadcrumb />
        {/* Desktop dock nav */}
        <div className="hidden md:block">
          <Dock>
            <DockIcon>
              <button
                aria-label="Toggle Explorer"
                onClick={props.onClick}
                className="px-2 py-1 cursor-pointer"
              >
                <Terminal className="h-4 w-4" />
              </button>
            </DockIcon>
          </Dock>
        </div>
        {/* Global hamburger: mobile opens Sheet, desktop opens draggable Explorer */}
        {/* Mobile (Sheet) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Terminal className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-gray-950 text-white border-white/10 w-[90vw] max-w-sm p-0"
            >
              <SheetHeader className="p-4">
                <SheetTitle className="text-white">Explorer</SheetTitle>
              </SheetHeader>
              <div className="px-2 pb-4">
                <MobileNavFileTree />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop (Draggable/Resizable window like WebStorm) */}
        {/* Removed duplicate explorer toggle button, now in Dock */}
      </div>
    </header>
  );
}
