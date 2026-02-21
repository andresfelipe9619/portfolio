import { DATA } from '@/data/resume';
import BlurFade from '@/components/magicui/blur-fade';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import {
    Server,
    Monitor,
    Cloud,
    Database,
    Layers,
    Bot,
} from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
    'Backend & APIs': <Server className="w-5 h-5 text-blue-400" />,
    'Frontend': <Monitor className="w-5 h-5 text-purple-400" />,
    'Cloud & DevOps': <Cloud className="w-5 h-5 text-sky-400" />,
    'Database & Storage': <Database className="w-5 h-5 text-emerald-400" />,
    'Architecture & CMS': <Layers className="w-5 h-5 text-amber-400" />,
    'Automation & Scraping': <Bot className="w-5 h-5 text-rose-400" />,
};

export function SkillsSection() {
    const { t } = useTranslation();

    return (
        <section id="skills" className="py-16 bg-gray-950 text-white">
            <div className="mx-auto max-w-5xl px-6">
                <BlurFade delay={0.25}>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                            {t('home.skillsTitle', 'Technical Arsenal')}
                        </h2>
                        <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            {t('home.skillsSubtitle', 'A categorized view of the technologies I use to build scalable systems and beautiful interfaces.')}
                        </p>
                    </div>
                </BlurFade>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(DATA.categorizedSkills).map(([category, skills], index) => (
                        <BlurFade key={category} delay={0.25 + index * 0.05}>
                            <Card className="h-full border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                                    <div className="p-2 rounded-lg bg-white/5">
                                        {categoryIcons[category] || <Layers className="w-5 h-5 text-gray-400" />}
                                    </div>
                                    <CardTitle className="text-lg font-medium tracking-tight">
                                        {category}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {skills.map((skill) => (
                                            <Badge
                                                key={skill}
                                                variant="secondary"
                                                className="bg-white/10 hover:bg-white/20 text-white/90 border-transparent text-xs py-1 px-2.5 rounded-full font-medium transition-colors"
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
}
