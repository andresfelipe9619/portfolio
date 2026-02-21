import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'motion/react';

const languages = [
    { code: 'en', label: 'English', icon: '🦅' },
    { code: 'es', label: 'Español', icon: '💃' },
    { code: 'fr', label: 'Français', icon: '🥐' },
    { code: 'de', label: 'Deutsch', icon: '🍺' },
];

export function LanguageSelector() {
    const { i18n } = useTranslation();

    const currentLang = languages.find((l) => i18n.language.startsWith(l.code)) || languages[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                            key={currentLang.code}
                            initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                            whileHover={{
                                scale: 1.2,
                                rotate: [0, -10, 10, -10, 10, 0],
                                transition: { duration: 0.5 }
                            }}
                            whileTap={{ scale: 0.9 }}
                            className="inline-block text-lg origin-center cursor-pointer"
                        >
                            {currentLang.icon}
                        </motion.span>
                    </AnimatePresence>
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => {
                            import('@/lib/ga').then(({ logEvent }) => {
                                logEvent('Language', 'Change', lang.code);
                            });
                            i18n.changeLanguage(lang.code);
                        }}
                        className={`flex items-center gap-2 cursor-pointer ${i18n.language.startsWith(lang.code) ? 'bg-accent font-medium' : ''
                            }`}
                    >
                        <motion.span
                            whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                            className="text-base cursor-pointer"
                        >
                            {lang.icon}
                        </motion.span>
                        <span>{lang.label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
