'use client';

import { Terminal, TypingAnimation } from '@/components/magicui/terminal';
import type { MouseEventHandler } from 'react';
import BlurFade from '@/components/magicui/blur-fade.tsx';
import { ShimmerButton } from '@/components/magicui/shimmer-button.tsx';

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
      {/*<InteractiveGridPattern*/}
      {/*  width={20}*/}
      {/*  height={20}*/}
      {/*  squares={[80, 80]}*/}
      {/*  squaresClassName="hover:fill-green-500"*/}
      {/*/>*/}

      <BlurFade duration={0.2} blur={'0px'} yOffset={0} inView>
        <div className="relative z-10 w-[90vw] h-[80vh] md:w-[60vw] md:h-[60vh]">
          <Terminal className="text-green-300 font-mono text-sm h-full w-full">
            <TypingAnimation className="text-zinc-400">
              {`$ boot renderer --target=${site} --secure --${useH3 ? 'h3' : 'h2'} --gpu --measure`}
            </TypingAnimation>
            {/* === 1. BROWSER ID === */}
            <TypingAnimation>{`🌐 UA: Mozilla/5.0 (Win64; x64)… [the classic "totally not a bot" disguise]`}</TypingAnimation>
            {/* === 2. NETWORK RESOLUTION === */}
            <TypingAnimation>{`🔎 DNS lookup ${site} → 93.184.216.34 (${t.dns}ms) [faster than your ex texting back]`}</TypingAnimation>
            <TypingAnimation>{`⇄ TCP handshake (${t.tcp}ms): [SYN → SYN-ACK → ACK] [world’s most awkward handshake, completed]`}</TypingAnimation>
            {/* === 3. SECURITY LAYER === */}
            <TypingAnimation>{`🔐 TLS 1.3 (ALPN=${alpn}, cipher=TLS_AES_128_GCM_SHA256) (${t.tls}ms) [basically Fort Knox with emojis]`}</TypingAnimation>
            <TypingAnimation>{`${proto} CONNECTED | SETTINGS: max_streams=∞ | window=legendary`}</TypingAnimation>
            {/* === 4. REQUEST / RESPONSE === */}
            <TypingAnimation>{`GET / → 200 OK  content-type:text/html; charset=utf-8  TTFB=${t.ttfb}ms [Google envies this speed]`}</TypingAnimation>
            <TypingAnimation>{`Cache: MISS | HSTS: enabled | CSP: "trust me bro"`}</TypingAnimation>
            <TypingAnimation>{`Preload: fonts.css, app.bundle.js, hero.jpg [priority hints applied like VIP passes]`}</TypingAnimation>
            {/* === 5. RENDERING STAGE === */}
            <TypingAnimation>{`HTML parse=${t.parse}ms  CSSOM=${t.css}ms  JS compile=${t.jsCompile}ms [done while sipping ☕️]`}</TypingAnimation>
            <TypingAnimation>{`🎨 Layout=${t.layout}ms  Paint=${t.paint}ms [pixels aligned with OCD precision]`}</TypingAnimation>
            <TypingAnimation>{`FCP=${t.fcp}ms  LCP=${t.lcp}ms  CLS=0.01 [smoother than your favorite playlist]`}</TypingAnimation>
            {/* === 6. BACKGROUND GOODIES === */}
            <TypingAnimation>{`IndexedDB: opened in ${t.idb}ms → settings, cache, secrets [don’t tell the NSA]`}</TypingAnimation>
            <TypingAnimation>{`ServiceWorker registered in ${t.sw}ms [silent ninja engaged]`}</TypingAnimation>
            <TypingAnimation>{`WebSocket alive (${t.ws}ms) [heartbeat steady, not a Tamagotchi]`}</TypingAnimation>
            {/* === 7. FINAL READY === */}
            <TypingAnimation className="text-blue-400">{`🚀 READY: ${site} is live. Respect the drip.`}</TypingAnimation>
            {/* === EXTRA PUNCHLINES === */}
            <TypingAnimation>{`👾 Fun fact: This portfolio loads faster than microwave popcorn.`}</TypingAnimation>
            <TypingAnimation>{`🥷 Pro tip: Hire this dev before Netflix makes a docuseries.`}</TypingAnimation>{' '}
          </Terminal>
        </div>
        {/* Footer with the skip action */}
        <div className="flex w-[90vw] md:w-[60vw] items-center justify-between border-t border-white/10 px-4 py-2">
          <ShimmerButton className="text-sm text-white" onClick={onSkip}>
            🤖 I’m not here for logs, show me the code →
          </ShimmerButton>
        </div>
      </BlurFade>
    </div>
  );
};

export default LoadingScreen;
