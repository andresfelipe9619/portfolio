import { useEffect } from 'react';

export function useKeyListener(setExplorerOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Cmd/Ctrl + E toggles Explorer
      const meta = e.metaKey || e.ctrlKey;
      if (meta && (e.key === 'e' || e.key === 'E')) {
        e.preventDefault();
        setExplorerOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    //eslint-disable-next-line
  }, []);
}