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
import { logEvent } from '@/lib/ga';
import { useNavigate } from 'react-router-dom';
import { TESTIMONIALS, TIMELINE_DATA, type Testimonial } from '@/data/timeline';
import { flattenTimeline, type FlattenedItem } from '@/lib/timeline';
import { Marquee } from '@/components/magicui/marquee';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from 'motion/react';
import { Seo } from '@/components/seo';
import { useDecorativeEffects } from '@/hooks/use-decorative-effects';
import { showEasterEggToast } from '@/hooks/use-easter-egg';

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

/** Milliseconds per character when the hero types. */
const TYPE_MS = 60;

/**
 * Sections below the hero skip style, layout and paint until they near the
 * viewport. They stay in the DOM for search engines and find-in-page, but they
 * no longer cost a phone's CPU while it's still trying to show the headline.
 */
const OFFSCREEN =
  '[content-visibility:auto] [contain-intrinsic-size:auto_800px]';

export default function Home() {
  const { t } = useTranslation();

  const hasSeenHero =
    typeof window !== 'undefined' &&
    sessionStorage.getItem('hasSeenHero') === 'true';
  const prefersReducedMotion = useReducedMotion();
  const skipAnimation = hasSeenHero || prefersReducedMotion === true;
  const decor = useDecorativeEffects();

  const [showVirusScan, setShowVirusScan] = useState(false);
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<FlattenedItem | null>(
    null,
  );
  const items = useMemo<FlattenedItem[]>(
    () => flattenTimeline(TIMELINE_DATA.timeline),
    [],
  );

  const navigate = useNavigate();
  const globalCompanies = t('globalCompanies');
  const toBuildWhatOthers = t('toBuildWhatOthers');
  const cant = t('cant');

  // The headline's first line is there from the first frame: it's the largest
  // thing on the page, so when it appears is when the page feels loaded. The
  // rest types out as setup and punchline in about two seconds. It used to
  // type the whole sentence at 100 ms a letter, hold back everything else and
  // lock scrolling until it finished, which was 6.5 s on a first visit.
  const setupAt = 250;
  const punchlineAt = setupAt + toBuildWhatOthers.length * TYPE_MS + 200;
  const introDoneAt = punchlineAt + cant.length * TYPE_MS + 300;

  const FAQ_ITEMS = t('faq', { returnObjects: true }) as
    | Array<{ id?: string; question: string; answer: string }>
    | string;
  const typedFaqItems = Array.isArray(FAQ_ITEMS) ? FAQ_ITEMS : [];
  const HERO_STATS = t('heroStats', { returnObjects: true }) as
    | Array<{ value: string; label: string }>
    | string;
  const heroStats = Array.isArray(HERO_STATS) ? HERO_STATS : [];

  useEffect(() => {
    if (skipAnimation) return;
    const timer = setTimeout(
      () => sessionStorage.setItem('hasSeenHero', 'true'),
      introDoneAt,
    );
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The joke used to be the whole button: a dialog that said "just scroll
  // down" and went nowhere. Now the button does the scrolling, and the joke
  // rides along as a toast.
  function handleExploreClick() {
    document.getElementById('explore')?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
    showEasterEggToast(
      'explore-universe',
      t('exploreToast.title'),
      t('exploreToast.description'),
    );
  }

  function handleResumeDownloadClick() {
    logEvent('Resume', 'Pre-Download', 'Resume Download Button Click');
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
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
          disableForReducedMotion: true,
        });

        requestAnimationFrame(frame);
      };

      frame();
      setTimeout(() => {
        logEvent('Contact', 'Intent', "Let's Talk Button");
        navigate('/contact');
      }, 1000);
    });
  }

  const handleTestimonialClick = (testimonial: Testimonial) => {
    const project = items.find(
      (item) => item.testimonial === testimonial.quote,
    );
    if (project) {
      setSelectedProject(project);
      setShowProjectDialog(true);
    }
  };

  return (
    <>
      <Seo
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        path="/"
      />
      <main className="relative flex flex-col min-h-[100dvh] overflow-hidden bg-gray-950 text-white">
        <Suspense fallback={null}>
          <FunnyVirusScanDialog
            open={showVirusScan}
            onOpenChange={setShowVirusScan}
          />
        </Suspense>
        <Suspense fallback={null}>
          <ProjectDialog
            open={showProjectDialog}
            onOpenChange={setShowProjectDialog}
            project={selectedProject}
          />
        </Suspense>
        <section id="hero" className="relative overflow-hidden py-24">
          {decor.particles && (
            <Suspense fallback={null}>
              <Particles
                className="absolute inset-0 z-0"
                quantity={100}
                ease={80}
                color={'#fff'}
                refresh
              />
            </Suspense>
          )}
          <div className="relative z-10 mx-auto flex w-full max-w-none flex-col items-center px-6">
            <div className="mx-auto max-w-4xl text-center h-60">
              <TypingAnimation
                disabled
                className="text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
              >
                {globalCompanies}
              </TypingAnimation>

              <TypingAnimation
                disabled={skipAnimation}
                delay={skipAnimation ? 0 : setupAt}
                duration={TYPE_MS}
                className="text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
              >
                {toBuildWhatOthers}
              </TypingAnimation>
              <Highlighter
                iterations={3}
                action={'underline'}
                inView={true}
                delay={skipAnimation ? 0 : introDoneAt}
              >
                <TypingAnimation
                  disabled={skipAnimation}
                  delay={skipAnimation ? 0 : punchlineAt}
                  duration={TYPE_MS}
                  className="text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
                >
                  {cant}
                </TypingAnimation>
              </Highlighter>
              <BlurFade
                delay={skipAnimation ? 0.1 : (introDoneAt + 100) / 1000}
                inView
              >
                <p className="mx-auto mt-10 max-w-4xl text-balance text-white/70 md:text-lg">
                  {t('professionalTitle')}
                </p>
              </BlurFade>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <BlurFade
                  delay={skipAnimation ? 0.25 : (introDoneAt + 250) / 1000}
                  inView
                >
                  <ShimmerButton
                    className="rounded-full px-6 py-3"
                    onClick={handleExploreClick}
                  >
                    {t('exploreUniverse')}
                  </ShimmerButton>
                </BlurFade>
                <BlurFade
                  delay={skipAnimation ? 0.25 : (introDoneAt + 250) / 1000}
                  inView
                >
                  <RainbowButton
                    className="rounded-full px-6 py-3"
                    onClick={handleResumeDownloadClick}
                  >
                    {t('downloadResume')}
                  </RainbowButton>
                </BlurFade>
              </div>
              <BlurFade
                delay={skipAnimation ? 0.4 : (introDoneAt + 400) / 1000}
                inView
              >
                <dl className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
                  {heroStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex min-w-0 flex-col-reverse justify-end"
                    >
                      <dt className="text-balance text-xs uppercase tracking-wider text-white/50">
                        {stat.label}
                      </dt>
                      <dd className="text-2xl font-semibold text-white sm:text-3xl">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </BlurFade>
            </div>
            <div className="mt-56 sm:mt-40 flex w-full flex-col items-center gap-6 ">
              <div className="relative flex items-center justify-center overflow-hidden max-h-[30vh] pt-[32%]">
                {decor.globe ? (
                  <Suspense fallback={<div className="h-[400px]" />}>
                    <Globe config={GLOBE_CONFIG} />
                  </Suspense>
                ) : (
                  <div className="h-[400px]" />
                )}
              </div>
              <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
            </div>
          </div>
        </section>

        {/* 2. Instant Authority (Client Marquee) */}
        <div id="explore" className="scroll-mt-16" />
        <BlurFade delay={0.25} inView className={OFFSCREEN}>
          <Suspense fallback={<div className="h-[200px]" />}>
            <ClientMarqueeSection />
          </Suspense>
        </BlurFade>

        {/* 3. The Journey (Experience Roulette) */}
        <BlurFade delay={0.25} inView className={OFFSCREEN}>
          <Suspense fallback={<div className="h-[400px]" />}>
            <ExperienceRoulette />
          </Suspense>
        </BlurFade>

        {/* 4. The Proof (OSS Highlights) */}
        <BlurFade delay={0.25} inView className={OFFSCREEN}>
          <Suspense fallback={<div className="h-[400px]" />}>
            <OssHighlights />
          </Suspense>
        </BlurFade>

        {/* 5. The Toolbox (Skills Section) */}
        <BlurFade delay={0.25} inView className={OFFSCREEN}>
          <Suspense fallback={<div className="h-[400px]" />}>
            <SkillsSection />
          </Suspense>
        </BlurFade>

        {/* 6. The Validation (Testimonials & Quote) */}
        <BlurFade delay={0.25} inView className={OFFSCREEN}>
          <div className="flex w-full flex-col items-center justify-center px-6 py-24 bg-gray-950">
            <div className="relative max-w-4xl text-center">
              <QuoteIcon className="absolute -top-12 -left-8 md:-left-16 h-24 w-24 text-white/5 -rotate-12 z-0" />
              <QuoteIcon className="absolute -bottom-12 -right-8 md:-right-16 h-24 w-24 text-white/5 rotate-12 z-0" />

              <div className="relative z-10 mb-8 flex items-center justify-center gap-4 text-blue-400/80 uppercase tracking-[0.3em] text-xs font-semibold">
                <span className="h-[1px] w-12 bg-blue-400/30"></span>
                {t('favoriteQuote.label')}
                <span className="h-[1px] w-12 bg-blue-400/30"></span>
              </div>

              <blockquote className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.3] text-white/90">
                {t('favoriteQuote.before')}
                <AuroraText>{t('favoriteQuote.highlight1')}</AuroraText>
                {t('favoriteQuote.middle')}
                <AuroraText>{t('favoriteQuote.highlight2')}</AuroraText>
                {t('favoriteQuote.after')}
              </blockquote>

              <div className="relative z-10 mt-10">
                <div className="inline-block rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm sm:text-base font-medium tracking-[0.2em] text-white/60 uppercase backdrop-blur-sm shadow-2xl">
                  Jessica Gaston
                </div>
              </div>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.25} inView className={OFFSCREEN}>
          <section id="testimonials" className="bg-gray-950 text-white py-16">
            <div className="mx-auto max-w-6xl px-6">
              <h3 className="text-xl font-semibold">{t('testimonialTitle')}</h3>
              <Marquee pauseOnHover className="mt-6">
                {TESTIMONIALS.map((t, i) => (
                  <Card
                    key={i}
                    // A clickable card has to be reachable without a mouse.
                    role="button"
                    tabIndex={0}
                    className="mx-4 w-80 border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white/60"
                    onClick={() => handleTestimonialClick(t)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        handleTestimonialClick(t);
                      }
                    }}
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

        {/* 7. The Climax (CTA) */}
        <BlurFade delay={0.25} inView className={OFFSCREEN}>
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
                  <AvatarImage
                    alt={DATA.name}
                    src={DATA.avatarUrl}
                    srcSet={DATA.avatarSrcSet}
                    sizes="112px"
                    width={112}
                    height={112}
                    decoding="async"
                  />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </section>
        </BlurFade>

        {/* 8. The Post-Credits (FAQ) */}
        <BlurFade delay={0.25} inView className={OFFSCREEN}>
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

        <Suspense fallback={<div className="h-[200px]" />}>
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
