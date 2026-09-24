import { AuroraText } from '@/components/magicui/aurora-text';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { MoveLeft, Mail } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import BlurFade from '@/components/magicui/blur-fade';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

/**
 * The route that catches everything else.
 *
 * Without this, an unknown URL rendered an empty page and — thanks to the SPA
 * rewrite — still answered HTTP 200, so crawlers happily indexed the blanks.
 * It also means the `/admin` easter egg finally has a page to land on.
 */
export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('notFound.metaTitle')}</title>
        <meta name="description" content={t('notFound.metaDescription')} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <main className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 text-center">
        <BlurFade delay={0.1}>
          <div className="inline-block rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm font-mono font-medium text-red-400 mb-6">
            404
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            {t('notFound.title0')}{' '}
            <AuroraText>{t('notFound.title1')}</AuroraText>
          </h1>
        </BlurFade>

        <BlurFade delay={0.3}>
          <p className="max-w-2xl text-lg text-white/60 mb-4 leading-relaxed">
            {t('notFound.description')}
          </p>
        </BlurFade>

        <BlurFade delay={0.35}>
          <p
            className="max-w-2xl text-sm font-mono text-white/40 mb-10 break-all"
            data-testid="not-found-path"
          >
            {t('notFound.pathLabel')}{' '}
            <span className="text-cyan-400/70">{location.pathname}</span>
          </p>
        </BlurFade>

        <BlurFade delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <ShimmerButton
              className="rounded-full px-6 py-3"
              onClick={() => navigate('/')}
            >
              <span className="flex items-center gap-2">
                <MoveLeft className="h-4 w-4" aria-hidden="true" />
                {t('notFound.backHome')}
              </span>
            </ShimmerButton>

            <button
              onClick={() => navigate('/contact')}
              className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white/70 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {t('notFound.reportIt')}
            </button>
          </div>
        </BlurFade>
      </main>
    </>
  );
}
