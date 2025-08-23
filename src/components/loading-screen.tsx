'use client';

import { Terminal, TypingAnimation } from '@/components/magicui/terminal';
import { Button } from '@/components/ui/button.tsx';
import type { MouseEventHandler } from 'react';
import { InteractiveGridPattern } from '@/components/magicui/interactive-grid-pattern.tsx';
import BlurFade from '@/components/magicui/blur-fade.tsx';

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
  // tiempos pseudo-reales
  const t = {
    dns: r(12, 28),
    tcp: r(15, 42),
    tls: r(18, 60),
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

  const proto = useH3 ? 'HTTP/3' : 'HTTP/2';
  const alpn = useH3 ? 'h3' : 'h2';

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black">
      <InteractiveGridPattern
        width={20}
        height={20}
        squares={[80, 80]}
        squaresClassName="hover:fill-green-500"
      />

      <BlurFade duration={0.2} blur={'0px'} yOffset={0}>
        <div className="relative z-10 w-[60vw] h-[60vh]">
          <Terminal className="text-green-300 font-mono text-sm h-full w-[60vw]">
            {/* línea de arranque estilo shell */}
            <TypingAnimation className="text-zinc-400">
              {`$ boot renderer --target=${site} --secure --${useH3 ? 'h3' : 'h2'} --gpu --measure`}
            </TypingAnimation>

            {/* === LÍNEAS TÉCNICAS DEL NAVEGADOR (solo texto/emoji sutil) === */}
            <TypingAnimation>{`🌐 UA: Mozilla/5.0 (Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36`}</TypingAnimation>
            <TypingAnimation>{`🔎 DNS lookup ${site} → 93.184.216.34 (${t.dns}ms) [OK]`}</TypingAnimation>
            <TypingAnimation>{`⇄ TCP handshake : [SYN → SYN-ACK → ACK] (${t.tcp}ms) [OK]`}</TypingAnimation>
            <TypingAnimation>{`🔐 TLS 1.3 (ALPN=${alpn}, cipher=TLS_AES_128_GCM_SHA256, OCSP stapled) (${t.tls}ms) [OK]`}</TypingAnimation>
            <TypingAnimation>{`${proto} CONNECTED | SETTINGS: MAX_CONCURRENT_STREAMS=100, INITIAL_WINDOW=65535`}</TypingAnimation>
            <TypingAnimation>{`GET / → 200 OK  content-type:text/html; charset=utf-8  TTFB=${t.ttfb}ms`}</TypingAnimation>
            <TypingAnimation>{`Cache: MISS | HSTS: enabled | CSP: default-src 'self' https:`}</TypingAnimation>
            <TypingAnimation>{`Preload/Prefetch: fonts.css, app.bundle.js, hero.jpg (priority hints applied)`}</TypingAnimation>
            <TypingAnimation>{`HTML parse=${t.parse}ms  CSSOM=${t.css}ms  JS compile=${t.jsCompile}ms`}</TypingAnimation>
            <TypingAnimation>{`FCP=${t.fcp}ms  LCP=${t.lcp}ms  CLS=0.01  INP=120ms  TBT≈0`}</TypingAnimation>
            <TypingAnimation>{`IndexedDB open "app-db" (${t.idb}ms)  stores: settings, cache, sessions [OK]`}</TypingAnimation>
            <TypingAnimation className="text-blue-400">{`🚀 READY: ${site} loaded successfully`}</TypingAnimation>
          </Terminal>
        </div>
        {/* Footer with the skip action */}
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-2">
          <span className="text-[10px] uppercase tracking-wide text-white/50">
            Boot log (read-only)
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-pink-500 hover:bg-transparent hover:text-pink-600"
            onClick={onSkip}
          >
            😎 Too sexy for this, skip →
          </Button>
        </div>
      </BlurFade>
    </div>
  );
};

export default LoadingScreen;
