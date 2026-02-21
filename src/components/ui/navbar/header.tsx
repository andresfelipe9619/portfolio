import { Link } from 'react-router-dom';
import { DATA } from '@/data/resume.tsx';
import { Dock, DockIcon } from '@/components/magicui/dock.tsx';
import { Folder, Terminal } from 'lucide-react';
import { Breadcrumb } from './breadcrumb';
import { LanguageSelector } from './language-selector';
import { useTranslation } from 'react-i18next';

export function Header(props: { onClick: () => void }) {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gray-950/80 backdrop-blur font-mono">
      <div className="bg-yellow-500/10 py-1 text-center text-xs text-yellow-200">
        🚧 {t('underConstruction')}
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-6 py-3">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold">
          <Terminal className="h-4 w-4 text-green-400" />
          <span>{DATA.name}</span>
        </Link>
        <div className="justify-self-center">
          <Breadcrumb />
        </div>
        <div className="flex items-center gap-4 justify-self-end">
          <LanguageSelector />
          <Dock>
            <DockIcon>
              <button
                aria-label="Toggle Explorer"
                onClick={() => {
                  import('@/lib/ga').then(({ logEvent }) => {
                    logEvent('Navigation', 'Toggle File Explorer');
                  });
                  props.onClick();
                }}
                className="px-2 py-1 cursor-pointer"
              >
                <Folder className="h-4 w-4" />
              </button>
            </DockIcon>
          </Dock>
        </div>
      </div>
    </header>
  );
}
