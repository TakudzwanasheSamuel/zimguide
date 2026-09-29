'use client';

import { aiInsights } from '@/lib/portal-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Sparkles, AlertCircle, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconMap = {
  warning: AlertCircle,
  info: HelpCircle,
  success: CheckCircle2,
};

export function AIInsights() {
  return (
    <section id="ai-insights" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Sparkles className="h-4.5 w-4.5 text-primary" />
          Data Core AI Analytics Insights
        </h3>
        <p className="text-xs text-muted-foreground">
          Sovereign recommendation engine output suggesting schema tweaks, duplicates filtering, and upload opportunities.
        </p>
      </div>

      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" stagger={0.05}>
        {aiInsights.map((insight) => {
          const Icon = iconMap[insight.type] || HelpCircle;
          
          return (
            <StaggerItem key={insight.id}>
              <GlassCard className="group h-full p-5 flex flex-col justify-between hover:border-primary/45 hover:shadow-glow relative overflow-hidden">
                {/* AI sparkles glow in corner */}
                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/5 blur-xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

                <div className="flex flex-col gap-4">
                  {/* Card Icon */}
                  <div className={`grid h-8 w-8 place-items-center rounded-xl border bg-secondary/50 shrink-0 ${
                    insight.type === 'warning'
                      ? 'border-amber-500/30 text-amber-400'
                      : insight.type === 'success'
                      ? 'border-emerald-500/30 text-emerald-400'
                      : 'border-sky-500/30 text-sky-400'
                  }`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>

                  <p className="text-xs leading-relaxed text-foreground/95">
                    {insight.message}
                  </p>
                </div>

                {/* Action button */}
                <div className="mt-6 pt-4 border-t border-border/40">
                  <Button size="sm" variant="outline" className="w-full text-[10px] font-semibold h-8 rounded-lg glass border-border/60 hover:bg-secondary/40">
                    {insight.action}
                  </Button>
                </div>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
