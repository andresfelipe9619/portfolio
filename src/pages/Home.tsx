import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DATA } from '@/data/resume';
import { GridBeams } from '@/components/magicui/grid-beams';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowUpRight, Quote as QuoteIcon } from 'lucide-react';
import { Globe } from '@/components/magicui/globe';
import { Terminal } from '@/components/magicui/terminal';
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

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-[100dvh] overflow-hidden bg-gray-950 text-white">
      <section id="hero" className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-10">
          <GridBeams>
            <div />
          </GridBeams>
          <DotPattern className="opacity-20" />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-none flex-col items-center px-6">
          <div className="mx-auto max-w-4xl text-center">
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
              isView={true}
              delay={
                mainPhrase.reduce((sum, s) => s.length + sum, 0) * 100 + 800
              }
            >
              <TypingAnimation
                delay={(mainPhrase[0].length + mainPhrase[1].length) * 100}
                className="text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
              >
                Can't
              </TypingAnimation>
            </Highlighter>
            <p className="mx-auto mt-4 max-w-4xl text-balance text-white/70 md:text-lg">
              {professionalTitle}
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
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
          </div>
          <div className="mt-10 flex w-full flex-col items-center gap-6 ">
            <div className="relative flex items-center justify-center overflow-hidden max-h-[30vh] pt-[40%]">
              <Globe className={"top-1/3"}  config={GLOBE_CONFIG} />
            </div>
            <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />

            <p className="mt-3 text-center text-sm text-white/70">
              Building digital experiences{' '}
              <span className="text-blue-400">across the globe</span>
            </p>
            {/* Quote + Terminal */}
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="border-white/10 bg-white/5">
                <CardContent className="relative p-6">
                  <div className="mb-3 flex items-center gap-2 text-blue-300">
                    <QuoteIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Favorite Quote</span>
                  </div>
                  <blockquote className="text-lg italic leading-relaxed">
                    "One man's crappy software is another man's full‑time job."
                  </blockquote>
                  <div className="mt-2 text-sm text-white/60">
                    — Jessica Gaston
                  </div>
                </CardContent>
              </Card>

              <div className="rounded-2xl ring-1 ring-white/10">
                <Terminal>
                  <p style={{ color: 'green' }}>{`>`} npx create-saas-app</p>
                  <p style={{ color: 'cyan' }}>
                    {`✔`} Scaffolding Next.js + tRPC + shadcn/ui
                  </p>
                  <p style={{ color: 'green' }}>{`>`} pnpm run dev</p>
                  <p style={{ color: 'yellow' }}>
                    {`ℹ`} Ready on http://localhost:5173
                  </p>
                </Terminal>
              </div>
            </div>
          </div>

          <svg
            className="pointer-events-none mt-16 w-full"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64 C240,160 480,0 720,64 C960,128 1200,96 1440,48 L1440,120 L0,120 Z"
              fill="currentColor"
              className="text-white"
            />
          </svg>
        </div>
      </section>

      {/* PROJECTS anchor for dock */}
      <span id="projects" />

      {/* EXPERT */}
      <section id="expert" className="bg-white text-gray-900 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl md:text-5xl font-semibold">
            JavaScript Expert — Building
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            Innovation and versatility in full‑stack development. Each project
            carried out meticulously with the best tools.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">
                  Right tools, right solutions
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  React, Next.js, Node, Python, AWS, PostgreSQL, Redis
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">Design & DX</h3>
                <p className="mt-2 text-sm text-gray-600">
                  shadcn/ui · Magic UI · Tailwind · clean APIs
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">Cloud & Automation</h3>
                <p className="mt-2 text-sm text-gray-600">
                  IaC, CI/CD, event‑driven, serverless, observability
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PROJECT LINKS */}
      <section id="projects-links" className="bg-white text-gray-900 py-10">
        <div className="mx-auto max-w-5xl px-6 grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-4">
          {['G-SOFT', 'FalconEye', 'TodoSurf', 'Factoring'].map((p) => (
            <a
              key={p}
              href="#projects"
              className="group flex items-center gap-2 text-lg font-medium"
            >
              {p}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-gray-950 text-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl md:text-4xl font-semibold">
            Delivering strong solutions
            <br />
            to my clients.
          </h2>
          <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-white/10">
            <div className="grid grid-cols-[60px_1fr_1fr] divide-y divide-white/10">
              {[
                [
                  '01',
                  'Full‑stack Web / Architecture',
                  'Design systems, scalable apps, quality gates',
                ],
                ['02', 'Mobile Development', 'React Native, Expo, app stores'],
                [
                  '03',
                  'Audit & Consulting',
                  'Code reviews, migrations, performance',
                ],
                ['04', 'Mentoring', 'Team enablement, best practices'],
              ].map(([n, t, d]) => (
                <div key={n} className="contents">
                  <div className="bg-white/5 p-4 text-center font-mono">
                    {n}
                  </div>
                  <div className="p-4 font-medium">{t}</div>
                  <div className="p-4 text-white/70">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="bg-gray-950 text-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="text-xl font-semibold">
            See what my clients say about
          </h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Card key={i} className="border-white/10 bg-white/5">
                <CardContent className="p-6">
                  <p className="text-sm text-white/80 italic">
                    “Andrés delivered beyond expectations. Great communication,
                    robust code, on time.”
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-gray-950 text-white py-8">
        <div className="mx-auto max-w-5xl px-6">
          <h3 className="text-xl font-semibold">{faqTitle}</h3>

          <Accordion type="single" collapsible className="mt-4">
            {FAQ_ITEMS.map((item, idx) => (
              <AccordionItem
                key={item.id ?? idx}
                value={item.id ?? `item-${idx + 1}`}
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <OssHighlights />

      {/* FINAL CTA */}
      <section id="ready" className="bg-gray-950 text-white py-16">
        <div className="mx-auto max-w-5xl px-6 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-3xl font-semibold">{CTATitle}</h3>
            <div className="mt-6 flex gap-3">
              <ShimmerButton className="rounded-full px-6 py-3">
                Let's talk
              </ShimmerButton>
              <Button
                variant="outline"
                className="rounded-full border-white/20 bg-white/5"
              >
                View portfolio
              </Button>
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

      <Footer />
    </main>
  );
}
