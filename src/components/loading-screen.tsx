'use client';

import { Terminal, TypingAnimation } from '@/components/magicui/terminal';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-gray-950">
      <div className="w-[90vw] max-w-xl">
        <Terminal className="text-green-500">
          <TypingAnimation>[+] Initializing system...</TypingAnimation>
          <TypingAnimation>[+] Connecting to secure server...</TypingAnimation>
          <TypingAnimation>[+] Connection established.</TypingAnimation>
          <TypingAnimation>[+] Bypassing firewalls...</TypingAnimation>
          <TypingAnimation>[+] Firewall 1... [OK]</TypingAnimation>
          <TypingAnimation>[+] Firewall 2... [OK]</TypingAnimation>
          <TypingAnimation>[+] Firewall 3... [OK]</TypingAnimation>
          <TypingAnimation>[+] Accessing main database...</TypingAnimation>
          <TypingAnimation>[+] Credentials accepted.</TypingAnimation>
          <TypingAnimation>[+] Downloading packages:</TypingAnimation>
          <TypingAnimation>
            [+] @react/core@18.2.0.....................[OK]
          </TypingAnimation>
          <TypingAnimation>
            [+] @magicui/core@1.0.0....................[OK]
          </TypingAnimation>
          <TypingAnimation>
            [+] @tailwindcss/typography@0.5.9..........[OK]
          </TypingAnimation>
          <TypingAnimation>
            [+] @types/node@20.4.2.....................[OK]
          </TypingAnimation>
          <TypingAnimation>
            [+] @types/react@18.2.15...................[OK]
          </TypingAnimation>
          <TypingAnimation>
            [+] @vitejs/plugin-react@4.0.3.............[OK]
          </TypingAnimation>
          <TypingAnimation>
            [+] autoprefixer@10.4.14...................[OK]
          </TypingAnimation>
          <TypingAnimation>
            [+] eslint@8.45.0..........................[OK]
          </TypingAnimation>
          <TypingAnimation>
            [+] lucide-react@0.263.1...................[OK]
          </TypingAnimation>
          <TypingAnimation>
            [+] postcss@8.4.27.........................[OK]
          </TypingAnimation>
          <TypingAnimation>
            [+] react-dom@18.2.0.......................[OK]
          </TypingAnimation>
          <TypingAnimation>
            [+] react-router-dom@6.14.2................[OK]
          </TypingAnimation>
          <TypingAnimation>
            [+] tailwindcss@3.3.3......................[OK]
          </TypingAnimation>
          <TypingAnimation>
            [+] typescript@5.1.6.......................[OK]
          </TypingAnimation>
          <TypingAnimation>
            [+] vite@4.4.4.............................[OK]
          </TypingAnimation>
          <TypingAnimation>[+] All packages downloaded.</TypingAnimation>
          <TypingAnimation>[+] Compiling modules...</TypingAnimation>
          <TypingAnimation>[+] Module 1/3... [OK]</TypingAnimation>
          <TypingAnimation>[+] Module 2/3... [OK]</TypingAnimation>
          <TypingAnimation>[+] Module 3/3... [OK]</TypingAnimation>
          <TypingAnimation>[+] Rendering UI...</TypingAnimation>
          <TypingAnimation>[+] UI rendered successfully.</TypingAnimation>
          <TypingAnimation>[+] Finalizing setup...</TypingAnimation>
          <TypingAnimation>[+] Setup complete.</TypingAnimation>
          <TypingAnimation className="text-blue-500">
            [+] Launching application...
          </TypingAnimation>
        </Terminal>
      </div>
    </div>
  );
};

export default LoadingScreen;
