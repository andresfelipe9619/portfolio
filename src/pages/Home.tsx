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
import { Globe } from '@/components/magicui/globe';
import { GLOBE_CONFIG } from '@/components/constants';
import { Footer } from '@/sections/footer.tsx';

import {
  CTATitle,
  FAQ_ITEMS,
  faqTitle,
  mainPhrase,
  professionalTitle,
} from '@/data/copy.ts';
import { OssHighlights } from '@/sections/oss-highlights.tsx';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { Highlighter } from '@/components/magicui/highlighter.tsx';
import { useEffect, useState, useMemo } from 'react';
import BlurFade from '@/components/magicui/blur-fade.tsx';
import FunnyVirusScanDialog from '@/components/virus-scan-dialog.tsx';
import JokeDialog from '@/components/joke-dialog.tsx';
import { RainbowButton } from '@/components/magicui/rainbow-button.tsx';
import { Particles } from '@/components/magicui/particles';
import ReactGA from 'react-ga4';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import ExperienceRoulette from '@/sections/experience-roulette.tsx';
import { TESTIMONIALS, TIMELINE_DATA } from '@/data/timeline';
import { flattenTimeline, type FlattenedItem } from '@/lib/timeline';
import { Marquee } from '@/components/magicui/marquee';
import ProjectDialog from '@/components/project-dialog';

export default function Home() {
  const [completed, setCompleted] = useState(false);
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
  const navigate = useNavigate();
  const typingDelay =
    mainPhrase.reduce((sum, s) => s.length + sum, 0) * 100 + 600;

  useEffect(() => {
    setTimeout(() => {
      setCompleted(true);
    }, typingDelay + 1500);
    return () => {
      setCompleted(false);
    };
    //eslint-disable-next-line
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
      navigate('/contact');
    }, 1000);
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
      <FunnyVirusScanDialog
        open={showVirusScan}
        onOpenChange={setShowVirusScan}
      />
      <JokeDialog open={showJokeDialog} onOpenChange={setShowJokeDialog} />
      <ProjectDialog
        open={showProjectDialog}
        onOpenChange={setShowProjectDialog}
        project={selectedProject}
      />
      <section id="hero" className="relative overflow-hidden py-24">
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={80}
          color={'#fff'}
          refresh
        />
        <div className="relative z-10 mx-auto flex w-full max-w-none flex-col items-center px-6">
          <div className="mx-auto max-w-4xl text-center h-60">
            <TypingAnimation className="text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
              {mainPhrase[0]}
            </TypingAnimation>

            <TypingAnimation
              delay={mainPhrase[0].length * 100}
              className="text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
            >
              {mainPhrase[1]}
            </TypingAnimation>
            <Highlighter
              iterations={3}
              action={'underline'}
              inView={true}
              delay={typingDelay}
            >
              <TypingAnimation
                delay={(mainPhrase[0].length + mainPhrase[1].length) * 100}
                className="text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
              >
                Can't
              </TypingAnimation>
            </Highlighter>
            {completed && (
              <>
                <BlurFade delay={0.1} inView>
                  <p className="mx-auto mt-10 max-w-4xl text-balance text-white/70 md:text-lg">
                    {professionalTitle}
                  </p>
                </BlurFade>
                <div className="mt-8 flex items-center justify-center gap-3">
                  <BlurFade delay={0.25} inView>
                    <ShimmerButton
                      className="rounded-full px-6 py-3"
                      onClick={() => setShowJokeDialog(true)}
                    >
                      Explore My Universe
                    </ShimmerButton>
                  </BlurFade>
                  <BlurFade delay={0.25} inView>
                    <RainbowButton
                      className="rounded-full px-6 py-3"
                      onClick={handleResumeDownloadClick}
                    >
                      Download Resume
                    </RainbowButton>
                  </BlurFade>
                </div>
              </>
            )}
          </div>
          <div className="mt-28 flex w-full flex-col items-center gap-6 ">
            <div className="relative flex items-center justify-center overflow-hidden max-h-[30vh] pt-[32%]">
              <Globe config={GLOBE_CONFIG} />
            </div>
            <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
            <BlurFade delay={0.75} inView>
              <p className="mt-3 text-center text-sm text-white/70">
                Building digital experiences{' '}
                <span className="text-blue-400">across the globe</span>
              </p>
            </BlurFade>
            {completed && (
              <BlurFade delay={1} inView>
                <div className="flex w-full justify-center">
                  <Card className="border-white/10 bg-white/5 max-w-md">
                    <CardContent className="p-6">
                      <div className="mb-3 flex items-center gap-2 text-blue-300">
                        <QuoteIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Favorite Quote
                        </span>
                      </div>
                      <blockquote className="text-lg italic leading-relaxed">
                        "One man's crappy software is another man's full‑time job."
                      </blockquote>
                      <div className="mt-2 text-sm text-white/60">
                        — Jessica Gaston
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </BlurFade>
            )}
          </div>

        </div>
      </section>

      {completed && (
        <BlurFade delay={0.25} inView>
          <ExperienceRoulette />
        </BlurFade>
      )}

      {/* TESTIMONIALS */}
      {completed && (
        <BlurFade delay={0.25} inView>
          <section id="testimonials" className="bg-gray-950 text-white py-16">
            <div className="mx-auto max-w-6xl px-6">
              <h3 className="text-xl font-semibold">
                What folks I've built for say
              </h3>
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
                          <span className="text-sm font-medium">{t.client}</span>
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

      {/* FAQ */}
      {completed && (
        <BlurFade delay={0.25} inView>
          <section id="faq" className="bg-gray-950 text-white py-8">
            <div className="mx-auto max-w-5xl px-6">
              <h3 className="text-xl font-semibold">{faqTitle}</h3>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Accordion type="single" collapsible className="w-full">
                  {FAQ_ITEMS.slice(0, FAQ_ITEMS.length / 2).map((item, idx) => (
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
                  {FAQ_ITEMS.slice(FAQ_ITEMS.length / 2).map((item, idx) => (
                    <AccordionItem
                      key={item.id ?? idx}
                      value={
                        item.id ?? `item-${idx + 1 + FAQ_ITEMS.length / 2}`
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
      {completed && (
        <BlurFade delay={0.25} inView>
          <OssHighlights />
        </BlurFade>
      )}

      {/* FINAL CTA */}
      {completed && (
        <BlurFade delay={0.25} inView>
          <section id="ready" className="bg-gray-950 text-white py-16">
            <div className="mx-auto max-w-5xl px-6 grid items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-2xl sm:text-3xl font-medium text-white">
                  {CTATitle[0]}
                  <br />
                  <span className="text-lg italic text-gray-400">
                    {CTATitle[1]}
                  </span>
                </h3>
                <div className="mt-6 flex gap-3">
                  <RainbowButton
                    className="rounded-full px-6 py-3"
                    onClick={handleLetsTalkClick}
                  >
                    Let's talk
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

      <Footer />
    </main>
  );
}
