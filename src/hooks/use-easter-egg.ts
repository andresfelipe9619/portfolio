import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

// Keep track of which easter eggs have been shown in this session
const shownEasterEggs = new Set<string>();

export const showEasterEggToast = (id: string, title: string, description: string) => {
    if (shownEasterEggs.has(id)) return;

    shownEasterEggs.add(id);
    toast(title, {
        description,
        duration: Number.POSITIVE_INFINITY,
        icon: '🚀',
        action: {
            label: 'Close',
            onClick: () => console.log('Easter egg acknowledged!'),
        },
    });
};

export function useTimeEasterEgg(id: string, title: string, description: string, triggerSeconds: number = 30) {
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
