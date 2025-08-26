import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { MobileNavFileTree } from '@/components/ui/navbar/mobilenav-file-tree.tsx';

export function DraggableExplorer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const resizing = useRef<null | 'right' | 'bottom' | 'corner'>(null);
  const pos = useRef({ x: 24, y: 96, w: 360, h: 480 });
  const [, force] = useState(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      if (dragging.current) {
        pos.current.x += e.movementX;
        pos.current.y += e.movementY;
        force((n) => n + 1);
      } else if (resizing.current) {
        if (resizing.current === 'right' || resizing.current === 'corner') {
          pos.current.w = Math.max(260, pos.current.w + e.movementX);
        }
        if (resizing.current === 'bottom' || resizing.current === 'corner') {
          pos.current.h = Math.max(240, pos.current.h + e.movementY);
        }
        force((n) => n + 1);
      }
    };
    const onUp = () => {
      dragging.current = false;
      resizing.current = null;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  if (!open) return null;

  const style: React.CSSProperties = {
    position: 'fixed',
    left: pos.current.x,
    top: pos.current.y,
    width: pos.current.w,
    height: pos.current.h,
  };

  return (
    <div
      ref={ref}
      style={style}
      className="z-[100] rounded-lg border border-white/10 bg-gray-950/95 backdrop-blur shadow-2xl"
    >
      {/* Titlebar */}
      <div
        className="flex items-center gap-2 border-b border-white/10 px-2 py-1 cursor-move select-none"
        onMouseDown={() => (dragging.current = true)}
      >
        <div className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-red-500/80" />
          <span className="size-2 rounded-full bg-yellow-500/80" />
          <span className="size-2 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-2 text-xs text-white/70">Explorer — src/app</span>
        <div className="ml-auto">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-white/80"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-32px)] overflow-hidden">
        <div className="h-full overflow-auto p-2 text-sm">
          <MobileNavFileTree />
        </div>
      </div>

      {/* Resize handles */}
      <div
        className="absolute right-0 top-0 h-full w-1 cursor-e-resize"
        onMouseDown={() => (resizing.current = 'right')}
      />
      <div
        className="absolute bottom-0 left-0 h-1 w-full cursor-ns-resize"
        onMouseDown={() => (resizing.current = 'bottom')}
      />
      <div
        title="Resize"
        className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize"
        onMouseDown={() => (resizing.current = 'corner')}
      />
    </div>
  );
}
