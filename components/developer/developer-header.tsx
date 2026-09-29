'use client';

import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { KeyRound, Terminal, BookOpen } from 'lucide-react';

export function DeveloperHeader() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 text-center overflow-hidden border-b border-border/60">
      {/* Background aurora */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[25rem] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <Reveal direction="up" duration={0.8}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Developer Hub & Console
          </span>
        </Reveal>

        <Reveal direction="up" delay={0.15} duration={0.8}>
          <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Sovereign AI{' '}
            <span className="bg-gradient-brand bg-clip-text text-transparent text-glow">
              Developer Platform
            </span>
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.3} duration={0.8}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-sm leading-relaxed text-muted-foreground md:text-lg">
            Build AI applications using trusted Zimbabwean datasets — APIs, SDKs, and the AI Applications Assistant.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.4} duration={0.8}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-11 px-5 text-xs font-semibold gap-2 shadow-glow hover:shadow-primary/30" onClick={() => handleScroll('api-keys')}>
              <KeyRound className="h-4 w-4" />
              Get API Key
            </Button>
            <Button size="lg" variant="outline" className="h-11 px-5 text-xs font-semibold gap-2 glass hover:bg-secondary/40" onClick={() => handleScroll('api-playground')}>
              <Terminal className="h-4 w-4 text-primary" />
              Explore APIs
            </Button>
            <Button size="lg" variant="ghost" className="h-11 px-5 text-xs font-semibold gap-2 text-muted-foreground hover:text-foreground" onClick={() => handleScroll('api-documentation')}>
              <BookOpen className="h-4 w-4 text-accent" />
              View Documentation
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
