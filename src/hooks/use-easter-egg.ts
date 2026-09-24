import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

// Keep track of which easter eggs have been shown in this session
const shownEasterEggs = new Set<string>();

export const showEasterEggToast = (
  id: string,
  title: string,
  description: string,
) => {
  if (shownEasterEggs.has(id)) return;

  shownEasterEggs.add(id);
  toast(title, {
    description,
    // Long enough to read and enjoy, short enough that it doesn't become a
    // permanent resident for anyone navigating by keyboard.
    duration: 15000,
    icon: '🚀',
    action: {
      label: 'Close',
      onClick: () => dismissEasterEggToast(id),
    },
  });
};

/** Lets a dismissed easter egg be re-earned later in the session. */
export const dismissEasterEggToast = (id: string) => {
  shownEasterEggs.delete(id);
};

export function useTimeEasterEgg(
  id: string,
  title: string,
  description: string,
  triggerSeconds: number = 30,
) {
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (hasTriggered.current || shownEasterEggs.has(id)) return;

    const timer = setTimeout(() => {
      showEasterEggToast(id, title, description);
      hasTriggered.current = true;
    }, triggerSeconds * 1000);

    return () => clearTimeout(timer);
  }, [id, title, description, triggerSeconds]);
}

const SUSPICIOUS_PATHS = ['/admin', '/wp-admin', '/backdoor', '/.env'];

export function useHackAttemptEasterEgg(
  pathname: string,
  title: string,
  description: string,
  shortcutTitle: string,
) {
  useEffect(() => {
    const looksLikeBackdoorAttempt = SUSPICIOUS_PATHS.some((path) =>
      pathname.toLowerCase().includes(path),
    );

    if (looksLikeBackdoorAttempt) {
      showEasterEggToast('hack-path-attempt', title, description);
    }
  }, [pathname, title, description]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isDevToolsShortcut =
        event.key === 'F12' ||
        ((event.metaKey || event.ctrlKey) &&
          event.shiftKey &&
          ['I', 'J', 'C'].includes(event.key.toUpperCase()));

      if (!isDevToolsShortcut) return;

      showEasterEggToast('hack-shortcut-attempt', shortcutTitle, description);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [description, shortcutTitle]);
}
