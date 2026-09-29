'use client';

import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { Coins, FileText, Download, Receipt } from 'lucide-react';

export function RevenueHeader() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-16 text-center border-b border-border/60 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[22rem] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        
        <Reveal direction="up" duration={0.8}>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Ecosystem Monetization Engine
          </span>
        </Reveal>

        <Reveal direction="up" delay={0.15} duration={0.8}>
          <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Sovereign{' '}
            <span className="bg-gradient-brand bg-clip-text text-transparent text-glow">
              Revenue & Monetization
            </span>
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.3} duration={0.8}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-sm leading-relaxed text-muted-foreground md:text-lg">
            Monitor platform revenue, institutional royalties, licensing activity, and ecosystem growth across Zimbabwe&apos;s AI data economy.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.4} duration={0.8}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-11 px-5 text-xs font-semibold gap-2 shadow-glow hover:shadow-primary/30" onClick={() => handleScroll('revenue-charts')}>
              <FileText className="h-4 w-4" />
              Revenue Reports
            </Button>
            <Button size="lg" variant="outline" className="h-11 px-5 text-xs font-semibold gap-2 glass hover:bg-secondary/40" onClick={() => handleScroll('dataset-revenue')}>
              <Download className="h-4 w-4 text-primary" />
              Export Financials
            </Button>
            <Button size="lg" variant="ghost" className="h-11 px-5 text-xs font-semibold gap-2 text-muted-foreground hover:text-foreground" onClick={() => handleScroll('institution-wallet')}>
              <Receipt className="h-4 w-4 text-accent" />
              Royalty Statements
            </Button>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
