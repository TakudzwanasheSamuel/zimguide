'use client';

import { privacyCards } from '@/lib/platform-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { EyeOff, ShieldCheck, Lock, Binary, RefreshCcw } from 'lucide-react';

export function PrivacyEngine() {
  return (
    <section id="privacy-engine" className="relative py-24 lg:py-32 overflow-hidden bg-secondary/5">
      <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Privacy Core"
            title={
              <>
                Privacy by Design: <span className="gradient-text">Zero Trust Sanitization</span>
              </>
            }
            subtitle="To safeguard individuals, Data Core scrubs institutional records using advanced name-matching transformers, selective hashing, and differential privacy controls."
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {privacyCards.map((card) => {
            return (
              <StaggerItem key={card.id}>
                <GlassCard className="group h-full p-6 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-glow">
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3.5 pb-4 border-b border-border/50">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border/60 bg-secondary/50 text-muted-foreground group-hover:text-emerald-400 transition-colors">
                        <EyeOff className="h-4.5 w-4.5" />
                      </div>
                      <h4 className="text-sm font-semibold tracking-tight text-foreground group-hover:text-emerald-400 transition-colors">
                        {card.name}
                      </h4>
                    </div>

                    <div className="mt-5 space-y-4">
                      {/* Purpose */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                          System Purpose
                        </span>
                        <p className="text-xs leading-relaxed text-foreground/90">
                          {card.purpose}
                        </p>
                      </div>

                      {/* Processing */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                          Algorithmic Process
                        </span>
                        <p className="text-xs leading-relaxed text-muted-foreground font-medium">
                          {card.processing}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Output Footer */}
                  <div className="mt-6 border-t border-border/50 pt-4 bg-emerald-500/[0.02] -mx-6 -mb-6 p-6 rounded-b-2xl border-t-0">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 block mb-1.5 flex items-center gap-1.5">
                      <Lock className="h-3 w-3" />
                      Output Signature
                    </span>
                    <code className="text-[11px] text-muted-foreground font-mono bg-black/40 px-2 py-1 rounded border border-border/40 block overflow-x-auto whitespace-nowrap">
                      {card.output}
                    </code>
                  </div>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
