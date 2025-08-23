import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from '@/components/magicui/terminal';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950">
      <Terminal>
        <AnimatedSpan className="text-green-500">
          [+] Initializing system...
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] Connecting to secure server...
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] Connection established.
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] Bypassing firewalls...
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] Firewall 1... [OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] Firewall 2... [OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] Firewall 3... [OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] Accessing main database...
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] Credentials accepted.
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] Downloading packages:
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] @react/core@18.2.0.....................[OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] @magicui/core@1.0.0....................[OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] @tailwindcss/typography@0.5.9..........[OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] @types/node@20.4.2.....................[OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] @types/react@18.2.15...................[OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] @vitejs/plugin-react@4.0.3.............[OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] autoprefixer@10.4.14...................[OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] eslint@8.45.0..........................[OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] lucide-react@0.263.1...................[OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] postcss@8.4.27.........................[OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] react-dom@18.2.0.......................[OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] react-router-dom@6.14.2................[OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] tailwindcss@3.3.3......................[OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] typescript@5.1.6.......................[OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] vite@4.4.4.............................[OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] All packages downloaded.
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] Compiling modules...
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] Module 1/3... [OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] Module 2/3... [OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] Module 3/3... [OK]
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] Rendering UI...
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] UI rendered successfully.
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] Finalizing setup...
        </AnimatedSpan>
        <AnimatedSpan className="text-green-500">
          [+] Setup complete.
        </AnimatedSpan>
        <TypingAnimation className="text-blue-500">
          [+] Launching application...
        </TypingAnimation>
      </Terminal>
    </div>
  );
};

export default LoadingScreen;
