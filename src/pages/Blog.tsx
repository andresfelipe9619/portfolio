import { AuroraText } from '@/components/magicui/aurora-text';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BlurFade from '@/components/magicui/blur-fade';
import { Helmet } from 'react-helmet-async';

export default function Blog() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Blog | Andrés Suárez</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 text-center">
        <BlurFade delay={0.1}>
          <div className="inline-block rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-500 mb-6">
            Coming Soon
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            My <AuroraText>Thoughts & Writings</AuroraText>
          </h1>
        </BlurFade>

        <BlurFade delay={0.3}>
          <p className="max-w-2xl text-lg text-white/60 mb-10 leading-relaxed">
            I'm currently setting up my technical blog. Soon, I'll be sharing
            deep dives into Software Architecture, Node.js performance, Web
            Scraping strategies, and Cloud Infrastructure. Stay tuned!
          </p>
        </BlurFade>

        <BlurFade delay={0.4}>
          <ShimmerButton
            className="rounded-full px-6 py-3"
            onClick={() => navigate('/')}
          >
            <span className="flex items-center gap-2">
              <MoveLeft className="h-4 w-4" />
              Back to Home
            </span>
          </ShimmerButton>
        </BlurFade>
      </div>
    </>
  );
}
