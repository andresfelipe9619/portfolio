import { DATA } from '@/data/resume.tsx';
import { logEvent } from '@/lib/ga';

export function Footer() {
  return (
    <section id="footer" className="bg-gray-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-white/60">
          © {new Date().getFullYear()} {DATA.name}. All rights reserved.
        </div>
        <div className="flex gap-4 text-sm text-white/70">
          <a
            href={DATA.contact.social.LinkedIn.url}
            className="hover:text-white"
            onClick={() => logEvent('Footer', 'LinkedIn Click', DATA.contact.social.LinkedIn.url)}
          >
            LinkedIn
          </a>
          <a href={DATA.contact.social.GitHub.url} className="hover:text-white"             onClick={() => logEvent('Footer', 'GitHub Click', DATA.contact.social.GitHub.url)}>
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
