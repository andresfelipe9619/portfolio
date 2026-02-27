import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { DATA } from '@/data/resume';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Quote as QuoteIcon } from 'lucide-react';
import { GLOBE_CONFIG } from '@/components/constants';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { Highlighter } from '@/components/magicui/highlighter.tsx';
import { useEffect, useState, useMemo, Suspense, lazy } from 'react';
import BlurFade from '@/components/magicui/blur-fade.tsx';
import { RainbowButton } from '@/components/magicui/rainbow-button.tsx';
import { AuroraText } from '@/components/magicui/aurora-text';
import ReactGA from 'react-ga4';
import { useNavigate } from 'react-router-dom';
import { TESTIMONIALS, TIMELINE_DATA } from '@/data/timeline';
import { flattenTimeline, type FlattenedItem } from '@/lib/timeline';
import { Marquee } from '@/components/magicui/marquee';
import { useTranslation } from 'react-i18next';

const Globe = lazy(() =>
  import('@/components/magicui/globe').then((m) => ({ default: m.Globe })),
);
const Footer = lazy(() =>
  import('@/sections/footer.tsx').then((m) => ({ default: m.Footer })),
);
const OssHighlights = lazy(() =>
  import('@/sections/oss-highlights.tsx').then((m) => ({
    default: m.OssHighlights,
  })),
);
const FunnyVirusScanDialog = lazy(
  () => import('@/components/virus-scan-dialog.tsx'),
);
const JokeDialog = lazy(() => import('@/components/joke-dialog.tsx'));
const Particles = lazy(() =>
  import('@/components/magicui/particles').then((m) => ({
    default: m.Particles,
  })),
);
const ClientMarqueeSection = lazy(() =>
  import('@/sections/client-marquee').then((m) => ({
    default: m.ClientMarqueeSection,
  })),
);
const SkillsSection = lazy(() =>
  import('@/sections/skills').then((m) => ({
    default: m.SkillsSection,
  })),
);
const ExperienceRoulette = lazy(
  () => import('@/sections/experience-roulette.tsx'),
);
const ProjectDialog = lazy(() => import('@/components/project-dialog'));

export default function Home() {
  const { t } = useTranslation();

  const hasSeenHero =
    typeof window !== 'undefined' &&
    sessionStorage.getItem('hasSeenHero') === 'true';

  const [completed, setCompleted] = useState(hasSeenHero);
  const [showVirusScan, setShowVirusScan] = useState(false);
  const [showJokeDialog, setShowJokeDialog] = useState(false);
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<FlattenedItem | null>(
    null,
  );
  const items = useMemo<FlattenedItem[]>(
    () => flattenTimeline(TIMELINE_DATA.timeline),
    [],
  );

  useEffect(() => {
    console.log("Flattened items available to ProjectDialog trigger (Home):", items.filter(i => i.title.toLowerCase().includes('benekiva') || i.client?.toLowerCase().includes('benekiva')));
  }, [items]);

  const navigate = useNavigate();
  const globalCompanies = t('globalCompanies');
  const toBuildWhatOthers = t('toBuildWhatOthers');

  const typingDelay =
    (globalCompanies.length + toBuildWhatOthers.length) * 100 + 600;
  const skipAnimation = hasSeenHero;

  const FAQ_ITEMS = t('faq', { returnObjects: true }) as
    | Array<{ id?: string; question: string; answer: string }>
    | string;
  const typedFaqItems = Array.isArray(FAQ_ITEMS) ? FAQ_ITEMS : [];

  useEffect(() => {
    if (skipAnimation) return;
    const timer = setTimeout(() => {
      setCompleted(true);
      sessionStorage.setItem('hasSeenHero', 'true');
    }, typingDelay + 1300);
    return () => {
      clearTimeout(timer);
      setCompleted(skipAnimation);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (completed) {
      document.body.classList.remove('no-scroll');
    } else {
      document.body.classList.add('no-scroll');
    }
  }, [completed]);

  function handleResumeDownloadClick() {
    ReactGA.event({
      category: 'Resume',
      action: 'Pre-Download',
      label: 'Resume Download Button Click',
    });
    setShowVirusScan(true);
  }

  function handleLetsTalkClick() {
    import('canvas-confetti').then((module) => {
      const confetti = module.default;
      const end = Date.now() + 2 * 1000; // 2 seconds
      const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];

      const frame = () => {
        if (Date.now() > end) return;

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });

        requestAnimationFrame(frame);
      };

      frame();
      setTimeout(() => {
        import('@/lib/ga').then(({ logEvent }) => {
          logEvent('Contact', 'Intent', "Let's Talk Button");
        });
        navigate('/contact');
      }, 1000);
    });
  }

  const handleTestimonialClick = (testimonial) => {
    const project = items.find(
      (item) => item.testimonial === testimonial.quote,
    );
    if (project) {
      setSelectedProject(project);
      setShowProjectDialog(true);
    }
  };

  return (
    <main className="relative flex flex-col min-h-[100dvh] overflow-hidden bg-gray-950 text-white">
      <Suspense fallback={null}>
        <FunnyVirusScanDialog
          open={showVirusScan}
          onOpenChange={setShowVirusScan}
        />
      </Suspense>
      <Suspense fallback={null}>
        <JokeDialog open={showJokeDialog} onOpenChange={setShowJokeDialog} />
      </Suspense>
      <Suspense fallback={null}>
        <ProjectDialog
          open={showProjectDialog}
          onOpenChange={setShowProjectDialog}
          project={selectedProject}
        />
      </Suspense>
      <section id="hero" className="relative overflow-hidden py-24">
        <Suspense fallback={null}>
          <Particles
            className="absolute inset-0 z-0"
            quantity={100}
            ease={80}
            color={'#fff'}
            refresh
          />
        </Suspense>
        <div className="relative z-10 mx-auto flex w-full max-w-none flex-col items-center px-6">
          <div className="mx-auto max-w-4xl text-center h-60">
            <TypingAnimation
              disabled={skipAnimation}
              className="text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
            >
              {globalCompanies}
            </TypingAnimation>

            <TypingAnimation
              disabled={skipAnimation}
              delay={skipAnimation ? 0 : globalCompanies.length * 100}
              className="text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
            >
              {toBuildWhatOthers}
            </TypingAnimation>
            <Highlighter
              iterations={3}
              action={'underline'}
              inView={true}
              delay={skipAnimation ? 0 : typingDelay}
            >
              <TypingAnimation
                disabled={skipAnimation}
                delay={
                  skipAnimation
                    ? 0
                    : (globalCompanies.length + toBuildWhatOthers.length) * 100
                }
                className="text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
              >
                {t('cant')}
              </TypingAnimation>
            </Highlighter>
            {completed && (
              <>
                <BlurFade delay={0.1} inView>
                  <p className="mx-auto mt-10 max-w-4xl text-balance text-white/70 md:text-lg">
                    {t('professionalTitle')}
                  </p>
                </BlurFade>
                <div className="mt-8 flex items-center justify-center gap-3">
                  <BlurFade delay={0.25} inView>
                    <ShimmerButton
                      className="rounded-full px-6 py-3"
                      onClick={() => setShowJokeDialog(true)}
                    >
                      {t('exploreUniverse')}
                    </ShimmerButton>
                  </BlurFade>
                  <BlurFade delay={0.25} inView>
                    <RainbowButton
                      className="rounded-full px-6 py-3"
                      onClick={handleResumeDownloadClick}
                    >
                      {t('downloadResume')}
                    </RainbowButton>
                  </BlurFade>
                </div>
              </>
            )}
          </div>
          <div className="mt-28 flex w-full flex-col items-center gap-6 ">
            <div className="relative flex items-center justify-center overflow-hidden max-h-[30vh] pt-[32%]">
              <Suspense fallback={<div className="h-[400px]" />}>
                <Globe config={GLOBE_CONFIG} />
              </Suspense>
            </div>
            <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
          </div>
        </div>
      </section>

      {/* 2. Instant Authority (Client Marquee) */}
      {completed && (
        <BlurFade delay={0.25} inView>
          <Suspense fallback={<div className="h-[200px]" />}>
            <ClientMarqueeSection />
          </Suspense>
        </BlurFade>
      )}

      {/* 3. The Journey (Experience Roulette) */}
      {completed && (
        <BlurFade delay={0.25} inView>
          <Suspense fallback={<div className="h-[400px]" />}>
            <ExperienceRoulette />
          </Suspense>
        </BlurFade>
      )}

      {/* 4. The Proof (OSS Highlights) */}
      {completed && (
        <BlurFade delay={0.25} inView>
          <Suspense fallback={<div className="h-[400px]" />}>
            <OssHighlights />
          </Suspense>
        </BlurFade>
      )}

      {/* 5. The Toolbox (Skills Section) */}
      {completed && (
        <BlurFade delay={0.25} inView>
          <Suspense fallback={<div className="h-[400px]" />}>
            <SkillsSection />
          </Suspense>
        </BlurFade>
      )}

      {/* 6. The Validation (Testimonials & Quote) */}
      {completed && (
        <BlurFade delay={0.25} inView>
          <div className="flex w-full flex-col items-center justify-center px-6 py-24 bg-gray-950">
            <div className="relative max-w-4xl text-center">
              <QuoteIcon className="absolute -top-12 -left-8 md:-left-16 h-24 w-24 text-white/5 -rotate-12 z-0" />
              <QuoteIcon className="absolute -bottom-12 -right-8 md:-right-16 h-24 w-24 text-white/5 rotate-12 z-0" />

              <div className="relative z-10 mb-8 flex items-center justify-center gap-4 text-blue-400/80 uppercase tracking-[0.3em] text-xs font-semibold">
                <span className="h-[1px] w-12 bg-blue-400/30"></span>
                Favorite Quote
                <span className="h-[1px] w-12 bg-blue-400/30"></span>
              </div>

              <blockquote className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.3] text-white/90">
                "One man's <AuroraText>crappy software</AuroraText> is another
                man's <AuroraText>full‑time job</AuroraText>."
              </blockquote>

              <div className="relative z-10 mt-10">
                <div className="inline-block rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm sm:text-base font-medium tracking-[0.2em] text-white/60 uppercase backdrop-blur-sm shadow-2xl">
                  Jessica Gaston
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
      )}

      {completed && (
        <BlurFade delay={0.25} inView>
          <section id="testimonials" className="bg-gray-950 text-white py-16">
            <div className="mx-auto max-w-6xl px-6">
              <h3 className="text-xl font-semibold">{t('testimonialTitle')}</h3>
              <Marquee pauseOnHover className="mt-6">
                {TESTIMONIALS.map((t, i) => (
                  <Card
                    key={i}
                    className="mx-4 w-80 border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => handleTestimonialClick(t)}
                  >
                    <CardContent className="flex h-full flex-col justify-between p-6">
                      <QuoteIcon className="h-5 w-5 text-blue-300" />
                      <p className="mt-4 text-sm leading-relaxed text-white/80">
                        {t.quote}
                      </p>
                      <div className="mt-6 flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-white/10">
                            {t.flag || t.client.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {t.client}
                          </span>
                          {t.country && (
                            <span className="text-xs text-white/60">
                              {t.country}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </Marquee>
            </div>
          </section>
        </BlurFade>
      )}

      {/* 7. The Climax (CTA) */}
      {completed && (
        <BlurFade delay={0.25} inView>
          <section id="ready" className="bg-gray-950 text-white py-16">
            <div className="mx-auto max-w-5xl px-6 grid items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-2xl sm:text-3xl font-medium text-white">
                  {t('ctaTitle1')}
                  <br />
                  <span className="text-lg italic text-gray-400">
                    {t('ctaTitle2')}
                  </span>
                </h3>
                <div className="mt-6 flex gap-3">
                  <RainbowButton
                    className="rounded-full px-6 py-3"
                    onClick={handleLetsTalkClick}
                  >
                    {t('letsTalk')}
                  </RainbowButton>
                </div>
              </div>
              <div className="justify-self-center">
                <Avatar className="size-28 border shadow-xl">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </section>
        </BlurFade>
      )}

      {/* 8. The Post-Credits (FAQ) */}
      {completed && (
        <BlurFade delay={0.25} inView>
          <section id="faq" className="bg-gray-950 text-white py-8">
            <div className="mx-auto max-w-5xl px-6">
              <h3 className="text-xl font-semibold">{t('faqTitle')}</h3>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Accordion type="single" collapsible className="w-full">
                  {typedFaqItems
                    .slice(0, typedFaqItems.length / 2)
                    .map((item, idx) => (
                      <AccordionItem
                        key={item.id ?? idx}
                        value={item.id ?? `item-${idx + 1}`}
                      >
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
                <Accordion type="single" collapsible className="w-full">
                  {typedFaqItems
                    .slice(typedFaqItems.length / 2)
                    .map((item, idx) => (
                      <AccordionItem
                        key={item.id ?? idx}
                        value={
                          item.id ??
                          `item-${idx + 1 + typedFaqItems.length / 2}`
                        }
                      >
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </div>
            </div>
          </section>
        </BlurFade>
      )}

      <Suspense fallback={<div className="h-[200px]" />}>
        <Footer />
      </Suspense>
    </main>
  );
}
