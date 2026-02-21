import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MoveLeft, Calendar, Globe, Building2, QuoteIcon } from 'lucide-react';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import BlurFade from '@/components/magicui/blur-fade';
import { Badge } from '@/components/ui/badge';
import { Particles } from '@/components/magicui/particles';
import { Helmet } from 'react-helmet-async';
import { TIMELINE_DATA } from '@/data/timeline';

export default function CaseStudy() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Find exact metadata from timeline
    const project = Object.values(TIMELINE_DATA.timeline)
        .flat()
        .find((item) => item.caseStudyId === id);

    return (
        <div className="relative min-h-screen bg-gray-950 text-white font-sans overflow-hidden">
            <Particles
                className="absolute inset-0 z-0 opacity-40 mix-blend-screen"
                quantity={60}
                ease={80}
                color="#ffffff"
                refresh
            />

            <Helmet>
                <title>{project?.title ? `${project.title} | Deep Dive` : 'Deep Dive Case Study'}</title>
            </Helmet>

            {/* Floating Back Button */}
            <div className="fixed top-24 left-4 md:left-8 z-40">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white/70 hover:text-white hover:bg-black/60 transition-all group"
                >
                    <MoveLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back</span>
                </button>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
                {!project ? (
                    <div className="text-center py-32">
                        <h2 className="text-3xl font-bold mb-4">Case Study Not Found</h2>
                        <p className="text-white/60 mb-8">
                            We couldn't find the deep dive data for "{id}".
                        </p>
                        <ShimmerButton className="mx-auto px-6 py-2" onClick={() => navigate('/')}>
                            Return Home
                        </ShimmerButton>
                    </div>
                ) : (
                    <>
                        {/* HERO SECTION */}
                        <BlurFade delay={0.1}>
                            <header className="mb-16">
                                <div className="flex items-center gap-3 mb-6">
                                    {project.kind && (
                                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-none px-3 py-1">
                                            {project.kind}
                                        </Badge>
                                    )}
                                    {project.area && (
                                        <span className="text-sm text-white/50 tracking-wider font-medium uppercase">
                                            {project.area}
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
                                    {project.title}
                                </h1>

                                <div className="flex flex-wrap gap-4 md:gap-8 items-center text-white/60 text-sm md:text-base mb-10 pb-10 border-b border-white/10">
                                    {project.client && (
                                        <div className="flex items-center gap-2">
                                            <Building2 className="w-5 h-5 text-emerald-400" />
                                            <span>{project.client}</span>
                                        </div>
                                    )}
                                    {project.country && (
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-5 h-5 text-blue-400" />
                                            <span>{project.country} {project.flag}</span>
                                        </div>
                                    )}
                                    {project.date && (
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-purple-400" />
                                            <span>{project.date}</span>
                                        </div>
                                    )}
                                </div>

                                {project.stack && project.stack.length > 0 && (
                                    <div className="mb-12">
                                        <h3 className="text-sm text-white/40 uppercase tracking-widest font-semibold mb-4">Tech Stack</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.stack.map(tech => (
                                                <Badge key={tech} className="bg-white/5 hover:bg-white/10 text-white/80 border-white/10 px-3 py-1.5 rounded-md">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </header>
                        </BlurFade>

                        {/* DYNAMIC CONTENT STRUCTURE from timeline.ts */}
                        <div className="mt-16 space-y-12 sm:space-y-16">

                            {/* DESCRIPTION & SUMMARY */}
                            {(project.description || project.summary) && (
                                <BlurFade delay={0.2} inView>
                                    <section>
                                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white/90 mb-6 pb-4 border-b border-white/10">
                                            Project Description
                                        </h2>
                                        <div className="space-y-4 text-white/80 leading-relaxed text-lg">
                                            {project.summary && <p>{project.summary}</p>}
                                            {project.description && project.description !== project.summary && <p>{project.description}</p>}
                                        </div>
                                    </section>
                                </BlurFade>
                            )}

                            {/* OBJECTIVES */}
                            {project.objectives && project.objectives.length > 0 && (
                                <BlurFade delay={0.25} inView>
                                    <section>
                                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white/90 mb-6 pb-4 border-b border-white/10">
                                            Objectives and Scope
                                        </h2>
                                        <ul className="list-disc pl-5 space-y-3 text-white/80 leading-relaxed text-lg">
                                            {project.objectives.map((obj, i) => (
                                                <li key={i}>{obj}</li>
                                            ))}
                                        </ul>
                                    </section>
                                </BlurFade>
                            )}

                            {/* ACHIEVEMENTS */}
                            {project.achievements && project.achievements.length > 0 && (
                                <BlurFade delay={0.3} inView>
                                    <section>
                                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white/90 mb-6 pb-4 border-b border-white/10">
                                            Achievements and Results
                                        </h2>
                                        <ul className="list-disc pl-5 space-y-3 text-white/80 leading-relaxed text-lg">
                                            {project.achievements.map((ach, i) => (
                                                <li key={i}>{ach}</li>
                                            ))}
                                        </ul>
                                    </section>
                                </BlurFade>
                            )}

                            {/* CHALLENGES & SOLUTIONS */}
                            {((project.challenges && project.challenges.length > 0) || (project.solutions && project.solutions.length > 0)) && (
                                <BlurFade delay={0.35} inView>
                                    <section>
                                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white/90 mb-6 pb-4 border-b border-white/10">
                                            Challenges and Solutions
                                        </h2>
                                        <div className="space-y-6 text-white/80 leading-relaxed text-lg">
                                            {project.challenges?.map((challenge, i) => (
                                                <div key={`c-${i}`}>
                                                    <p className="font-semibold text-white/95 mb-2">Challenge: <span className="font-normal text-white/80">{challenge}</span></p>
                                                    {project.solutions && project.solutions[i] && (
                                                        <ul className="list-[circle] pl-8 mt-2 space-y-1 text-white/60">
                                                            <li><strong>Solution:</strong> {project.solutions[i]}</li>
                                                        </ul>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </BlurFade>
                            )}

                            {/* TESTIMONIAL */}
                            {project.testimonial && (
                                <BlurFade delay={0.4} inView>
                                    <div className="relative my-16 py-8 md:py-12 pl-8 sm:pl-16 pr-6 md:pr-10 border-l-4 border-blue-500 bg-gradient-to-r from-blue-500/10 to-transparent rounded-r-3xl shadow-lg">
                                        <QuoteIcon className="absolute top-8 left-4 sm:left-6 md:left-8 w-10 h-10 text-blue-500/20 -translate-x-1/2 -translate-y-1/2 rotate-180" />
                                        <blockquote className="text-lg sm:text-2xl font-medium italic text-white/90 leading-relaxed relative z-10 m-0 border-none p-0">
                                            “{project.testimonial.replace(/^["“”]/, '').replace(/["“”]$/, '')}”
                                        </blockquote>
                                    </div>
                                </BlurFade>
                            )}

                        </div>

                        <div className="mt-24 pt-12 border-t border-white/10 flex justify-center">
                            <ShimmerButton className="px-8 py-3" onClick={() => navigate(-1)}>
                                <span className="flex items-center gap-2">
                                    <MoveLeft className="h-4 w-4" />
                                    Back to Portfolio
                                </span>
                            </ShimmerButton>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
