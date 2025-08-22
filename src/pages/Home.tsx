import BlurFadeText from '@/components/magicui/blur-fade-text';

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
} from '@/components/ui/accordion'; // icons
import {
  ArrowUpRight,
  ChevronRight,
  FileText,
  Folder as FolderIcon,
  Menu,
  Quote as QuoteIcon,
} from 'lucide-react';
import { Globe } from '@/components/magicui/globe'; // MagicUI extras
import { Terminal } from '@/components/magicui/terminal';
import { Dock } from '@/components/magicui/dock'; // shadcn sheet for mobile nav
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const BLUR_FADE_DELAY = 0.04;

const PAGES = [
  {
    name: 'app',
    children: [
      { name: 'page.tsx' },
      {
        name: '(marketing)',
        children: [
          { name: 'home.tsx' },
          { name: 'projects.tsx' },
          { name: 'contact.tsx' },
        ],
      },
      {
        name: '(blog)',
        children: [{ name: 'index.tsx' }, { name: '[slug].tsx' }],
      },
    ],
  },
  { name: 'components', children: [{ name: 'ui' }, { name: 'magicui' }] },
];

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-[100dvh] overflow-hidden bg-gray-950 text-white">
      {/* HERO */}
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gray-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400" />
            <span className="text-sm font-semibold">{DATA.initials}</span>
          </div>
          {/* Desktop dock nav */}
          <div className="hidden md:block">
            <Dock
              items={[
                { title: 'Home', href: '#hero' },
                { title: 'Services', href: '#services' },
                { title: 'Projects', href: '#projects-links' },
                { title: 'Content', href: '#content' },
                { title: 'Contact', href: '#ready' },
              ]}
            />
          </div>
          {/* Mobile hamburger showing folder structure */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-gray-950 text-white border-white/10"
            >
              <SheetHeader>
                <SheetTitle className="text-white">Pages</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 space-y-2 text-sm">
                {PAGES.map((entry, i) => (
                  <Folder key={i} entry={entry} depth={0} />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section id="hero" className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-10">
          <GridBeams />
          <DotPattern className="opacity-20" />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-none flex-col items-center px-6">
          <div className="mx-auto max-w-3xl text-center">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl"
              yOffset={8}
              text={`Strong software solutions\nfor all around the world.`}
            />
            <p className="mx-auto mt-4 max-w-2xl text-balance text-white/70 md:text-lg">
              Senior Software Engineer — Cloud & Automation — SaaS Builder
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
          {/* Quote + Terminal */}
          <div className="mt-10 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
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
              <Terminal
                title="andres@portfolio"
                lines={[
                  { prompt: '>', text: 'npx create-saas-app', color: 'green' },
                  {
                    prompt: '✔',
                    text: ' Scaffolding Next.js + tRPC + shadcn/ui',
                    color: 'cyan',
                  },
                  { prompt: '>', text: 'pnpm run dev', color: 'green' },
                  {
                    prompt: 'ℹ',
                    text: ' Ready on http://localhost:5173',
                    color: 'yellow',
                  },
                ]}
              />
            </div>
          </div>

          <div className="mt-12">
            <div className="mx-auto h-80 w-80 sm:h-96 sm:w-96">
              <Globe
                className="h-full w-full"
                globeConfig={{ glowColor: '#60a5fa' }}
              />
            </div>
            <p className="mt-3 text-center text-sm text-white/70">
              Building digital experiences{' '}
              <span className="text-blue-400">across the globe</span>
            </p>
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
          <h3 className="text-xl font-semibold">No space for doubts.</h3>
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What’s your typical engagement model?
              </AccordionTrigger>
              <AccordionContent>
                Scoped projects or monthly retainer; async‑first, weekly demos,
                clear SLAs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do you ensure quality?</AccordionTrigger>
              <AccordionContent>
                Testing pyramid, CI/CD, preview apps, linting, perf budgets,
                observability.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What stacks do you prefer?</AccordionTrigger>
              <AccordionContent>
                TypeScript, React/Next.js, Node, Python, AWS, Postgres/Redis,
                edge functions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CONTENT PILLS */}
      <section id="content" className="bg-gray-950 text-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="text-xl font-semibold">
            High‑quality content for free
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              'React patterns',
              'Serverless tricks',
              'DX tooling',
              'Performance',
              'Testing',
              'Career',
            ].map((t) => (
              <div
                key={t}
                className="rounded-2xl bg-gradient-to-br from-white/5 to-white/10 p-6 ring-1 ring-white/10"
              >
                <div className="text-2xl">🟣</div>
                <div className="mt-2 font-medium">{t}</div>
                <p className="text-sm text-white/70">
                  Short, practical posts with code you can reuse.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="ready" className="bg-gray-950 text-white py-16">
        <div className="mx-auto max-w-5xl px-6 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-3xl font-semibold">
              Ready to level up your next project?
            </h3>
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

      {/* FOOTER */}
      <section id="footer" className="bg-gray-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} {DATA.name}. All rights reserved.
          </div>
          <div className="flex gap-4 text-sm text-white/70">
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
            <a href={DATA.contact.social.X.url} className="hover:text-white">
              Twitter
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

// Simple recursive folder view for the hamburger menu
function Folder({ entry, depth }: { entry: any; depth: number }) {
  const isDir = !!entry.children;
  return (
    <div className="pl-2">
      <div className="flex items-center gap-2 py-1">
        <ChevronRight className="h-3 w-3 opacity-60" />
        {isDir ? (
          <FolderIcon className="h-4 w-4" />
        ) : (
          <FileText className="h-4 w-4" />
        )}
        <span className="opacity-90">{entry.name}</span>
      </div>
      {isDir && (
        <div className="ml-4 border-l border-white/10 pl-3">
          {entry.children.map((c: any, idx: number) => (
            <Folder key={idx} entry={c} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
