'use client';

import { Terminal, TypingAnimation } from '@/components/magicui/terminal';

type LoadingScreenProps = {
  site?: string; // dominio simulado
  useH3?: boolean; // true = HTTP/3 (h3), false = HTTP/2 (h2)
};

const r = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;

const LoadingScreen = ({
  site = 'example.com',
  useH3 = false,
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
    <div className="fixed inset-0 z-50 grid place-items-center bg-gray-950">
      <div className="w-[90vw] max-w-3xl">
        <Terminal className="text-green-300 font-mono text-sm leading-relaxed">
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
          <TypingAnimation>{`HTTP 103 Early Hints : </app.bundle.js>; rel=preload; as=script`}</TypingAnimation>
          <TypingAnimation>{`GET / → 200 OK  content-type:text/html; charset=utf-8  TTFB=${t.ttfb}ms`}</TypingAnimation>
          <TypingAnimation>{`Cache: MISS | HSTS: enabled | CSP: default-src 'self' https:`}</TypingAnimation>
          <TypingAnimation>{`ServiceWorker: register+activate in ${t.sw}ms (scope=/, strategy=network-first) [OK]`}</TypingAnimation>
          <TypingAnimation>{`Preload/Prefetch: fonts.css, app.bundle.js, hero.jpg (priority hints applied)`}</TypingAnimation>
          <TypingAnimation>{`HTML parse=${t.parse}ms  CSSOM=${t.css}ms  JS compile=${t.jsCompile}ms`}</TypingAnimation>
          <TypingAnimation>{`Render tree built → layout=${t.layout}ms → paint=${t.paint}ms → composite`}</TypingAnimation>
          <TypingAnimation>{`Image decode hero.jpg ${t.img}ms  (content-visibility, lazy=below-the-fold)`}</TypingAnimation>
          <TypingAnimation>{`FCP=${t.fcp}ms  LCP=${t.lcp}ms  CLS=0.01  INP=120ms  TBT≈0`}</TypingAnimation>
          <TypingAnimation>{`IndexedDB open "app-db" (${t.idb}ms)  stores: settings, cache, sessions [OK]`}</TypingAnimation>
          <TypingAnimation>{`WebSocket ws://${site}/realtime handshake ${t.ws}ms [CONNECTED]`}</TypingAnimation>
          <TypingAnimation>{`Hydration complete → app mounted (#root)`}</TypingAnimation>
          <TypingAnimation className="text-blue-400">{`🚀 READY: ${site} loaded successfully`}</TypingAnimation>
        </Terminal>
      </div>
    </div>
  );
};

export default LoadingScreen;
