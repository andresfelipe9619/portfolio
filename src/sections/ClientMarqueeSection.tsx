import { Marquee } from '@/components/magicui/marquee';
import BlurFade from '@/components/magicui/blur-fade';
import { useTranslation } from 'react-i18next';

const clients = [
    { name: 'Benekiva', src: '/benekiva.jpeg' },
    { name: 'Brooklyn', src: '/brooklyn.jpeg' },
    { name: 'Evermuse', src: '/evermuse.jpeg' },
    { name: 'Kuno Digital', src: '/kunodigital.jpeg' },
    { name: 'Waterloo', src: '/waterloo.png' },
];

export function ClientMarqueeSection() {
    const { t } = useTranslation();

    return (
        <section id="clients">
            <BlurFade delay={0.25 * 3}>
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
                    <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                        {t('home.clientsLabel', 'Trusted by innovative teams worldwide')}
                    </p>
                </div>
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-background">
                    <Marquee pauseOnHover className="[--duration:20s]">
                        {clients.map((client) => (
                            <div
                                key={client.name}
                                className="mx-4 flex h-20 w-32 items-center justify-center grayscale transition-all duration-300 hover:grayscale-0"
                            >
                                <img
                                    src={client.src}
                                    alt={client.name}
                                    className="max-h-12 w-auto object-contain"
                                />
                            </div>
                        ))}
                    </Marquee>

                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
                </div>
            </BlurFade>
        </section>
    );
}
