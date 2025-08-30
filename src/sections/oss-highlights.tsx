import { Link } from 'react-router-dom';
import openSource from '@/data/open-source';
import { OssCard } from '@/components/oss-card';

export function OssHighlights() {
  const featured = openSource.slice(0, 3);
  return (
    <section className="relative mx-auto mt-10 max-w-6xl px-6 py-8">
      <div className="relative z-10 mb-6 flex items-baseline justify-between">
        <h2 className="text-xl font-semibold">Open Source Highlights</h2>
        <Link
          to="/oss"
          className="text-sm opacity-80 underline-offset-4 hover:underline hover:opacity-100"
        >
          View all →
        </Link>
      </div>

      <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((f) => (
          <OssCard key={f.title} {...f} />
        ))}
      </div>
    </section>
  );
}
