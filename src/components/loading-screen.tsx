'use client';

import { Terminal, TypingAnimation } from '@/components/magicui/terminal';
import type { MouseEventHandler } from 'react';
import { useEffect, useState } from 'react';
import BlurFade from '@/components/magicui/blur-fade.tsx';
import { ShimmerButton } from '@/components/magicui/shimmer-button.tsx';
import { useTranslation } from 'react-i18next';

type LoadingScreenProps = {
  site?: string; // dominio simulado
  useH3?: boolean; // true = HTTP/3 (h3), false = HTTP/2 (h2)
  onSkip?: MouseEventHandler<HTMLButtonElement>;
};

const r = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;

const LoadingScreen = ({
  site = 'andressuarez.dev',
  useH3 = false,
  onSkip,
}: LoadingScreenProps) => {
  const { i18n, t } = useTranslation();
  const detectedLangCode = i18n.language?.substring(0, 2) || 'en';

  const [ipData, setIpData] = useState<{ ip: string; location: string }>({
    ip: '127.0.0.1',
    location: 'locating...',
  });

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        setIpData({
          ip: data.ip || '192.168.1.1',
          location: data.city && data.country_name
            ? `${data.city}, ${data.country_name}`
            : 'Unknown Location',
        });
      })
      .catch(() => {
        // Fallback silently
        setIpData({
          ip: '192.168.1.24',
          location: 'Proxy / VPN Detected',
        });
      });
  }, []);

  const langs: Record<string, { label: string; location: string }> = {
    en: { label: 'English', location: '[US/UK/GLOBAL]' },
    es: { label: 'Español', location: '[LATAM/ES]' },
    fr: { label: 'Français', location: '[FR/CA]' },
    de: { label: 'Deutsch', location: '[DE/AT/CH]' },
  };

  const langMatch = langs[detectedLangCode] || langs['en'];

  // tiempos pseudo-reales
  const timeMap = {
    dns: r(12, 28),
    tcp: r(15, 42),
    tls: r(18, 60),
    i18n: r(30, 90),
    geo: r(120, 240),
    ttfb: r(80, 160),
    fcp: r(240, 520),
    lcp: r(520, 1200),
    parse: r(18, 44),
    css: r(16, 36),
    jsCompile: r(12, 28),
    layout: r(14, 40),
    paint: r(8, 22),
    sw: r(20, 60),
    idb: r(8, 20),
    img: r(40, 120),
    ws: r(14, 32),
  };

  const alpn = useH3 ? 'h3' : 'h2';

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black">
      <BlurFade duration={0.2} blur={'0px'} yOffset={0} inView>
        <div className="relative z-10 w-[90vw] h-[80vh] md:w-[60vw] md:h-[60vh]">
          <Terminal className="text-green-300 font-mono text-sm h-full w-full">
            <TypingAnimation className="text-zinc-400">
              {`$ boot renderer --target=${site} --secure --${useH3 ? 'h3' : 'h2'} --gpu --measure`}
            </TypingAnimation>
            {/* === 1. BROWSER ID === */}
            <TypingAnimation className="text-blue-400">{t('loading.ua')}</TypingAnimation>
            {/* === 2. NETWORK RESOLUTION === */}
            <TypingAnimation className="text-cyan-400">{t('loading.dns', { site, dns: timeMap.dns })}</TypingAnimation>
            <TypingAnimation className="text-cyan-500">{t('loading.tcp', { tcp: timeMap.tcp })}</TypingAnimation>
            {/* === 3. SECURITY & I18N HACK === */}
            <TypingAnimation className="text-purple-400">{t('loading.tls', { alpn, tls: timeMap.tls })}</TypingAnimation>
            <TypingAnimation className="text-yellow-400">{t('loading.exec', { geo: timeMap.geo })}</TypingAnimation>
            <TypingAnimation className="text-yellow-500">{t('loading.geo', { ip: ipData.ip, location: ipData.location })}</TypingAnimation>
            <TypingAnimation className="text-orange-400">{t('loading.i18n', { langLabel: langMatch.label, langCode: detectedLangCode, i18n: timeMap.i18n })}</TypingAnimation>
            {/* === 4. REQUEST / RESPONSE === */}
            <TypingAnimation className="text-green-400">{t('loading.req', { ttfb: timeMap.ttfb })}</TypingAnimation>
            <TypingAnimation className="text-zinc-500">{t('loading.sec')}</TypingAnimation>
            {/* === 5. RENDERING STAGE === */}
            <TypingAnimation className="text-pink-400">{t('loading.dom', { parse: timeMap.parse, css: timeMap.css, jsCompile: timeMap.jsCompile })}</TypingAnimation>
            <TypingAnimation className="text-indigo-400">{t('loading.render', { layout: timeMap.layout, paint: timeMap.paint })}</TypingAnimation>
            <TypingAnimation className="text-teal-400">{t('loading.metrics', { fcp: timeMap.fcp, lcp: timeMap.lcp })}</TypingAnimation>
            {/* === 6. BACKGROUND GOODIES === */}
            <TypingAnimation className="text-orange-500">{t('loading.stor', { idb: timeMap.idb })}</TypingAnimation>
            <TypingAnimation className="text-red-400">{t('loading.worker', { sw: timeMap.sw })}</TypingAnimation>
            <TypingAnimation className="text-fuchsia-400">{t('loading.wss', { ws: timeMap.ws })}</TypingAnimation>
            {/* === 7. FINAL READY === */}
            <TypingAnimation className="text-emerald-400 font-bold">{t('loading.ready', { site })}</TypingAnimation>
            {/* === EXTRA PUNCHLINES === */}
            <TypingAnimation className="text-slate-300">{t('loading.fact1')}</TypingAnimation>
            <TypingAnimation className="text-slate-300">{t('loading.fact2')}</TypingAnimation>{' '}
          </Terminal>
        </div>
        {/* Footer with the skip action */}
        <div className="flex w-[90vw] md:w-[60vw] items-center justify-between border-t border-white/10 px-4 py-2">
          <ShimmerButton className="text-sm text-white" onClick={onSkip}>
            {t('loading.skipBtn')}
          </ShimmerButton>
        </div>
      </BlurFade>
    </div>
  );
};

export default LoadingScreen;
