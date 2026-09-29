'use client';

import { GlassCard } from '@/components/site/section';
import { Button } from '@/components/ui/button';
import { KeyRound, Sparkles } from 'lucide-react';

export function DeveloperCTA() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="developer-cta" className="py-12 border-t border-border/60 mt-12 bg-secondary/15 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <GlassCard className="p-8 md:p-12 border-primary/20 bg-[#0b1329]/60 shadow-glow relative overflow-hidden" hover={false}>
          
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between relative z-10">
            <div className="max-w-xl text-left">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                Ingestion API Gateway
              </span>
              <h3 className="text-xl font-bold tracking-tight text-foreground mt-2 md:text-2xl">
                Build Zimbabwe&apos;s Next Generation of AI
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Get started today by provisioning credentials or reading through our API reference guides to integrate databases into vector spaces.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button size="lg" className="h-11 px-5 text-xs font-semibold gap-2 shadow-glow hover:shadow-primary/30" onClick={() => handleScroll('api-keys')}>
                <KeyRound className="h-4.5 w-4.5" />
                Generate API Key
              </Button>
              <Button size="lg" variant="outline" className="h-11 px-5 text-xs font-semibold gap-2 glass hover:bg-secondary/40" onClick={() => handleScroll('api-playground')}>
                <Sparkles className="h-4.5 w-4.5 text-primary" />
                Start Building
              </Button>
            </div>
          </div>

        </GlassCard>
      </div>
    </section>
  );
}
