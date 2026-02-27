import { Marquee } from '@/components/magicui/marquee';
import BlurFade from '@/components/magicui/blur-fade';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const clients = [
  { name: 'Benekiva', src: '/benekiva.jpeg', url: 'https://benekiva.com/' },
  {
    name: 'Brooklyn',
    src: '/brooklyn.jpeg',
    url: 'https://www.brooklynsolutions.ai',
  },
  { name: 'Evermuse', src: '/evermuse.jpeg', url: 'https://evermuse.com/' },
  { name: 'Turnstile', src: '/turnstile.png', url: 'https://turnstile.ai' },
  {
    name: 'Kuno Digital',
    src: '/kuno-digital.png',
    url: 'https://kunodigital.com/',
  },
  { name: 'Klazia', src: '/klazia.jpg', url: 'https://klazia.com/' },
  {
    name: 'Atentamente',
    src: '/atentamente.png',
    url: 'https://atentamente.mx/',
  },
  {
    name: 'Factoring Abogados',
    src: '/factoring-abogados.svg',
    url: 'https://factoringabogados.com/',
  },
  {
    name: 'Universidad del Valle',
    src: '/univalle.jpg',
    url: 'https://www.univalle.edu.co/',
  },
  {
    name: 'Universidad Javeriana de Cali',
    src: '/javeriana.png',
    url: 'https://www.javerianacali.edu.co/',
  },
];

function ClientLogoItem({ client }: { client: (typeof clients)[0] }) {
  const [error, setError] = useState(false);

  const imageContent = !error ? (
    <img
      src={client.src}
      alt={client.name}
      className="max-h-12 w-auto object-contain"
      onError={() => setError(true)}
    />
  ) : (
    <span className="text-xs font-semibold px-2 text-center break-words w-full text-muted-foreground">
      {client.name}
    </span>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {client.url ? (
          <a
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-4 flex h-20 w-32 items-center justify-center grayscale transition-all duration-300 hover:grayscale-0 cursor-pointer"
          >
            {imageContent}
          </a>
        ) : (
          <div className="mx-4 flex h-20 w-32 items-center justify-center grayscale transition-all duration-300 hover:grayscale-0 cursor-default">
            {imageContent}
          </div>
        )}
      </TooltipTrigger>
      <TooltipContent>
        <p>{client.name}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function ClientMarqueeSection() {
  const { t } = useTranslation();

  return (
    <section id="clients">
      <BlurFade delay={0.25 * 3}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
            {t('clientsLabel', 'Trusted by innovative teams worldwide')}
          </p>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-background">
          <Marquee pauseOnHover className="[--duration:30s]">
            {clients.map((client) => (
              <ClientLogoItem key={client.name} client={client} />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </BlurFade>
    </section>
  );
}
