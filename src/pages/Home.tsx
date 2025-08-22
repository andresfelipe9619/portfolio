import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { DATA } from '@/data/resume';
import { TIMELINE_DATA } from '@/data/timeline';
import BlurFade from '@/components/magicui/blur-fade';
import BlurFadeText from '@/components/magicui/blur-fade-text';
import { GridBeams } from '@/components/magicui/grid-beams';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { Globe } from '@/components/magicui/globe';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Globe2, Stars, Timer } from 'lucide-react';
import { TimelineCard } from '@/components/timeline-card';

const BLUR_FADE_DELAY = 0.04;

const PLANETS = [
  {
    key: 'earth',
    label: 'Earth',
    dotClass: 'bg-gradient-to-r from-blue-600 to-green-500',
    accent: 'from-blue-500 via-purple-500 to-cyan-400',
    wrapper: '',
  },
  {
    key: 'mars',
    label: 'Mars',
    dotClass: 'bg-gradient-to-r from-red-600 to-orange-500',
    accent: 'from-red-500 via-orange-500 to-rose-500',
    wrapper: '[--ring:#f97316]',
  },
  {
    key: 'venus',
    label: 'Venus',
    dotClass: 'bg-gradient-to-r from-yellow-500 to-orange-400',
    accent: 'from-amber-400 via-yellow-400 to-orange-400',
    wrapper: '[--ring:#fbbf24]',
  },
] as const;

function useCountUp(target: number, durationMs = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      // easeInOut (cosine)
      const eased = 0.5 - Math.cos(Math.PI * p) / 2;
      setValue(Math.floor(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return value;
}

function ThemePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-white/10"
        >
          <Stars className="h-5 w-5 text-blue-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 border-white/10 bg-white/5 backdrop-blur">
        <div className="space-y-1">
          {PLANETS.map((p) => (
            <Button
              key={p.key}
              variant="ghost"
              className={`w-full justify-start gap-3 ${value === p.key ? 'bg-white/10' : ''}`}
              onClick={() => onChange(p.key)}
            >
              <span className={`h-4 w-4 rounded-full ${p.dotClass}`} />
              <span>{p.label}</span>
              {value === p.key && (
                <Badge className="ml-auto" variant="secondary">
                  Current
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function StatCard({
  label,
  value,
  tintClass,
}: {
  label: string;
  value: number;
  tintClass: string;
}) {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur">
      <CardContent className="p-4 text-center">
        <div className={`text-3xl font-bold tabular-nums ${tintClass}`}>
          {value}
        </div>
        <div className="text-xs text-white/70 uppercase tracking-wide">
          {label}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  // Theme planet
  const [planet, setPlanet] =
    useState<(typeof PLANETS)[number]['key']>('earth');
  const planetConf = useMemo(
    () => PLANETS.find((p) => p.key === planet)!,
    [planet],
  );

  // Animated stats
  const years = useCountUp(Object.keys(TIMELINE_DATA.timeline).length);
  const countries = useCountUp(TIMELINE_DATA.countries.length);
  const categories = useCountUp(TIMELINE_DATA.categories.length);

  return (
    <main
      className={`relative flex min-h-[100dvh] flex-col bg-gray-950 text-white ${planetConf.wrapper}`}
    >
      {/* Top nav-ish header for picker */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-gray-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-none w-full items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400" />
            <span className="text-sm font-semibold">{DATA.initials}</span>
          </div>
          <ThemePicker value={planet} onChange={setPlanet} />
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10">
          <GridBeams />
          <DotPattern className="opacity-20" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-none w-full grid-cols-1 items-center gap-10 px-6 md:grid-cols-[1.1fr_0.9fr]">
          {/* Left: intro */}
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-1 flex-col space-y-2">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                  yOffset={8}
                  text={`Hi, I'm ${DATA.name.split(' ')[0]} 👋`}
                />
                <BlurFadeText
                  className="max-w-[600px] md:text-xl text-white/80"
                  delay={BLUR_FADE_DELAY}
                  text={DATA.description}
                />
              </div>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <Avatar className="size-24 border md:size-28">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </BlurFade>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <ShimmerButton className="rounded-full px-6 py-3">
                Explore My Universe
              </ShimmerButton>
              <Button
                variant="outline"
                className="rounded-full border-white/20 bg-white/5"
              >
                Download Resume
              </Button>
            </div>

            {/* Pretty stat cards */}
            <div className="grid max-w-md grid-cols-3 gap-3 pt-2">
              <StatCard label="Years" value={years} tintClass="text-cyan-400" />
              <StatCard
                label="Countries"
                value={countries}
                tintClass="text-blue-400"
              />
              <StatCard
                label="Categories"
                value={categories}
                tintClass="text-purple-400"
              />
            </div>
          </div>

          {/* Right: Globe + side rail (timeline + countries) */}
          <div className="relative">
            <Card className="border-transparent bg-transparent p-0 shadow-none">
              <CardContent className="relative p-0 md:p-6">
                <div className="mx-auto h-72 w-72 sm:h-80 sm:w-80">
                  <Globe
                    className="h-full w-full"
                    globeConfig={{ glowColor: '#60a5fa' }}
                  />
                </div>
                <p className="mt-4 text-center text-sm text-white/70">
                  Building digital experiences{' '}
                  <span className="text-blue-400">across the globe</span>
                </p>
              </CardContent>
            </Card>

            {/* Right rail only on lg+ */}
            <div className="absolute -right-80 top-0 hidden w-72 lg:block">
              <Card className="mb-4 border-white/10 bg-white/5">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-blue-300">
                    <Timer className="h-4 w-4" />
                    <span className="font-semibold">Career Timeline</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.keys(TIMELINE_DATA.timeline)
                    .sort((a, b) => Number(b) - Number(a))
                    .slice(0, 4)
                    .map((year) => (
                      <div key={year} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                        <div>
                          <div className="font-semibold">{year}</div>
                          <div className="text-xs text-white/60">
                            {TIMELINE_DATA.timeline[year][0]?.title ??
                              'Key role'}
                          </div>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/5">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-purple-300">
                    <Globe2 className="h-4 w-4" />
                    <span className="font-semibold">Global Reach</span>
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                  {TIMELINE_DATA.countries.slice(0, 6).map((c) => (
                    <div
                      key={c}
                      className="rounded-xl bg-white/5 p-3 text-center text-xs text-white/80 hover:bg-white/10"
                    >
                      {c}
                    </div>
                  ))}
                  {TIMELINE_DATA.countries.length > 6 && (
                    <div className="col-span-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-2 text-center text-xs text-blue-300">
                      +{TIMELINE_DATA.countries.length - 6} more
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto w-full max-w-none space-y-4 px-6">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            <Markdown>{TIMELINE_DATA.summary}</Markdown>
          </div>
        </BlurFade>
      </section>

      {/* ASIDES */}
      <section id="asides" className="mx-auto w-full max-w-none px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TIMELINE_DATA.asides.map((aside, index) => (
            <BlurFade key={index} delay={BLUR_FADE_DELAY * 5 + index * 0.05}>
              <div className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
                <Markdown>{aside}</Markdown>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="mx-auto w-full max-w-none px-6">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Timeline</h2>
          </BlurFade>
          {Object.entries(TIMELINE_DATA.timeline).map(([year, items], id) => (
            <BlurFade key={year} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
              <TimelineCard year={year} items={items} />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="w-full bg-gray-900 py-12">
        <div className="mx-auto grid max-w-none w-full items-center justify-center gap-4 px-6 text-center">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-background">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me a DM{' '}
                <Link
                  to={DATA.contact.social.X.url}
                  className="text-blue-500 hover:underline"
                >
                  with a direct question on Twitter
                </Link>{' '}
                and I'll respond whenever I can. I will ignore all soliciting.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <ShimmerButton className="rounded-full px-6 py-3">
                  Say Hi
                </ShimmerButton>
                <Button
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/5"
                >
                  Schedule a Call
                </Button>
              </div>
              <Separator className="mx-auto my-6 w-40 bg-white/10" />
              <div className="flex justify-center gap-6 text-white/70">
                <a
                  href={DATA.contact.social.X.url}
                  className="hover:text-white"
                >
                  Twitter
                </a>
                <a
                  href={DATA.contact.social.LinkedIn.url}
                  className="hover:text-white"
                >
                  LinkedIn
                </a>
                <a
                  href={DATA.contact.social.GitHub.url}
                  className="hover:text-white"
                >
                  GitHub
                </a>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
