'use client';

import { businessInsightsList } from '@/lib/revenue-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Sparkles, TrendingUp, Lightbulb } from 'lucide-react';

export function BusinessInsights() {
  return (
    <section id="business-insights" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Sparkles className="h-4.5 w-4.5 text-primary" />
          AI Business & Monetization Insights
        </h3>
        <p className="text-xs text-muted-foreground">
          Platform telemetry suggesting highest performing sectors, catalog opportunities, and licensing optimizations.
        </p>
      </div>

      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" stagger={0.05}>
        {businessInsightsList.map((ins) => {
          return (
            <StaggerItem key={ins.id}>
              <GlassCard className="group h-full p-5 flex flex-col justify-between hover:border-primary/45 hover:shadow-glow relative overflow-hidden">
                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/5 blur-xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

                <div className="flex flex-col gap-4">
                  <div className="grid h-8 w-8 place-items-center rounded-xl border border-primary/20 bg-primary/5 text-primary shrink-0">
                    <Lightbulb className="h-4.5 w-4.5" />
                  </div>

                  <div>
                    <h4 className="text-xs font-bold leading-normal text-foreground group-hover:text-primary transition-colors">
                      {ins.title}
                    </h4>
                    <p className="text-[11px] leading-relaxed text-muted-foreground mt-2">
                      {ins.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-border/40 text-[9px] font-mono text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-primary" />
                  Verified Telemetry
                </div>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
