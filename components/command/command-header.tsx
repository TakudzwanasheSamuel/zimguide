'use client';

import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { Shield, FileText, Sparkles, Download } from 'lucide-react';

export function CommandHeader() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-16 text-center border-b border-border/60 overflow-hidden">
      {/* Glow aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[25rem] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        
        <Reveal direction="up" duration={0.8}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary shadow-glow">
            <Shield className="h-3.5 w-3.5" />
            Sovereign Command Console
          </span>
        </Reveal>

        <Reveal direction="up" delay={0.15} duration={0.8}>
          <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            National AI{' '}
            <span className="bg-gradient-brand bg-clip-text text-transparent text-glow">
              Command Centre
            </span>
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.3} duration={0.8}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-sm leading-relaxed text-muted-foreground md:text-lg">
            Real-time insights into Zimbabwe&apos;s sovereign AI data ecosystem, institutional participation, AI readiness, and national innovation impact.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.4} duration={0.8}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-11 px-5 text-xs font-semibold gap-2 shadow-glow hover:shadow-primary/30" onClick={() => handleScroll('connected-institutions')}>
              <FileText className="h-4 w-4" />
              Export National Report
            </Button>
            <Button size="lg" variant="outline" className="h-11 px-5 text-xs font-semibold gap-2 glass hover:bg-secondary/40" onClick={() => handleScroll('ai-insights')}>
              <Sparkles className="h-4 w-4 text-primary" />
              Generate AI Insights
            </Button>
            <Button size="lg" variant="ghost" className="h-11 px-5 text-xs font-semibold gap-2 text-muted-foreground hover:text-foreground" onClick={() => handleScroll('readiness-index')}>
              <Download className="h-4 w-4 text-accent" />
              Download Dashboard
            </Button>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
