'use client';

import { ecosystemImpactList } from '@/lib/command-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { GraduationCap, Cpu, Building2, Users, Sparkles, Layers, Terminal, Database, TrendingUp } from 'lucide-react';

const iconMap: Record<string, any> = {
  GraduationCap,
  Cpu,
  Building2,
  Users,
  Sparkles,
  Layers,
  Terminal,
  Database,
};

export function EcosystemImpact() {
  return (
    <section id="ecosystem-impact" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Sparkles className="h-4.5 w-4.5 text-primary" />
          Ecosystem Innovation Impact
        </h3>
        <p className="text-xs text-muted-foreground">
          Tangible indicators reflecting how the sovereign data pipeline contributes to national AI readiness.
        </p>
      </div>

      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.04}>
        {ecosystemImpactList.map((item) => {
          const Icon = iconMap[item.iconName] || Database;

          return (
            <StaggerItem key={item.name}>
              <GlassCard className="group h-full p-5 hover:border-primary/45 hover:shadow-glow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <div className="grid h-9 w-9 place-items-center rounded-lg border border-border/80 bg-secondary/50 text-muted-foreground group-hover:text-primary transition-colors">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <TrendingUp className="h-3 w-3" />
                      {item.growth}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors tabular-nums">
                      {item.value}
                    </div>
                    <h4 className="text-xs text-muted-foreground mt-1 leading-snug">
                      {item.name}
                    </h4>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-border/40 text-[9px] font-mono text-slate-400">
                  {item.trend}
                </div>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
