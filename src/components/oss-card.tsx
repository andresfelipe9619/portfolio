import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';

export type OssCardProps = {
  title: string;
  href: string;
  subtitle: string;
  badges: ReadonlyArray<string>;
  year: string;
  active: boolean;
};

export function OssCard({ title, href, subtitle, badges, year }: OssCardProps) {
  const isExternal = href?.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className="group block h-full"
    >
      <Card className="h-full border-white/10 bg-gradient-to-b from-white/5 to-transparent transition-transform duration-200 group-hover:-translate-y-0.5">
        <CardContent className="p-5">
          <div className="mb-2 flex items-center justify-between text-xs opacity-70">
            <span>{year}</span>
            <ArrowUpRight className="h-4 w-4 transition-opacity group-hover:opacity-100" />
          </div>
          <h3 className="mb-2 text-lg font-medium">{title}</h3>
          <p className="mb-4 line-clamp-3 text-sm opacity-80">{subtitle}</p>
          <div className="flex flex-wrap gap-2">
            {badges.slice(0, 4).map((b) => (
              <Badge key={b} variant="secondary" className="text-[11px]">
                {b}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
