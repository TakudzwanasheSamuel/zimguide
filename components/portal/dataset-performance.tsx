'use client';

import { datasetPerformanceAwards } from '@/lib/portal-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Trophy, TrendingUp, Sparkles, Star, Database, Search, Award } from 'lucide-react';

const iconMap = [
  Trophy,
  TrendingUp,
  Sparkles,
  Star,
  Database,
  Search,
];

export function DatasetPerformance() {
  return (
    <section id="dataset-performance" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Award className="h-4.5 w-4.5 text-primary" />
          Data Asset Performance Accolades
        </h3>
        <p className="text-xs text-muted-foreground">
          Monthly highlights reflecting developer adoption, search requests, and growth velocities.
        </p>
      </div>

      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
        {datasetPerformanceAwards.map((award, idx) => {
          const Icon = iconMap[idx % iconMap.length];

          return (
            <StaggerItem key={award.label}>
              <GlassCard className="group h-full p-5 hover:border-primary/45 hover:shadow-glow flex items-start gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-border/80 bg-secondary/50 text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-primary font-bold">
                    {award.label}
                  </span>
                  <h4 className="mt-1.5 text-xs font-bold leading-relaxed text-foreground group-hover:text-primary transition-colors">
                    {award.value}
                  </h4>
                  <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mt-1 block">
                    Verified Performance
                  </span>
                </div>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
