import { DATA } from '@/data/resume.tsx';
import { logEvent } from '@/lib/ga';
import { Dock, DockIcon } from '@/components/magicui/dock.tsx';
import { Icons } from '@/components/icons.tsx';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <section id="footer" className="bg-gray-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-white/60">
          © {new Date().getFullYear()} {DATA.name}. All rights reserved.
        </div>
        <Dock className="border-white/10 bg-white/5">
          <motion.a
            href={DATA.contact.social.LinkedIn.url}
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              logEvent('Footer', 'LinkedIn Click', DATA.contact.social.LinkedIn.url)
            }
          >
            <DockIcon className="p-2 text-white/70 hover:text-white">
              <Icons.linkedin className="h-5 w-5" />
            </DockIcon>
          </motion.a>
          <motion.a
            href={DATA.contact.social.GitHub.url}
            aria-label="GitHub"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              logEvent('Footer', 'GitHub Click', DATA.contact.social.GitHub.url)
            }
          >
            <DockIcon className="p-2 text-white/70 hover:text-white">
              <Icons.github className="h-5 w-5" />
            </DockIcon>
          </motion.a>
          <motion.a
            href={DATA.contact.social.Instagram.url}
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              logEvent('Footer', 'Instagram Click', DATA.contact.social.Instagram.url)
            }
          >
            <DockIcon className="p-2 text-white/70 hover:text-white">
              <Icons.instagram className="h-5 w-5" />
            </DockIcon>
          </motion.a>
        </Dock>
      </div>
    </section>
  );
}
