'use client';

import { execStats, type ExecutiveStat } from '@/lib/portal-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Database, Layers, Fingerprint, Cpu, Coins, Award, TrendingUp } from 'lucide-react';

const iconMap = {
  Database,
  Layers,
  Fingerprint,
  Cpu,
  Coins,
  Award,
};

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;
  
  // map data points to fit inside 100x30 SVG box
  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 30 - ((val - min) / range) * 24 - 3; // padding top/bottom
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg className="h-8 w-24 shrink-0" viewBox="0 0 100 30" aria-hidden>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export function ExecutiveOverview() {
  return (
    <section id="executive-overview" className="py-10">
      <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground mb-6 px-2 flex items-center gap-2">
        <TrendingUp className="h-4.5 w-4.5 text-primary" />
        Executive Performance Overview
      </h3>

      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" stagger={0.04}>
        {execStats.map((stat) => {
          const Icon = iconMap[stat.iconName] || Database;
          const isRoyalties = stat.iconName === 'Coins';
          const isQuality = stat.iconName === 'Award';
          const strokeColor = isRoyalties ? '#10B981' : isQuality ? '#00C6A7' : '#0EA5E9';

          return (
            <StaggerItem key={stat.label}>
              <GlassCard className="group h-full p-5 hover:border-primary/45 hover:shadow-glow flex flex-col justify-between">
                <div>
                  {/* Card Header: Icon & Trend */}
                  <div className="flex items-center justify-between">
                    <div className="grid h-9 w-9 place-items-center rounded-lg border border-border/80 bg-secondary/50 text-muted-foreground group-hover:text-primary transition-colors">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                      {stat.change.includes('+') ? stat.change.split(' ')[0] : 'UP'}
                    </span>
                  </div>

                  {/* Value & Label */}
                  <div className="mt-4">
                    <div className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 leading-snug">
                      {stat.label}
                    </div>
                  </div>
                </div>

                {/* Sparkline & Details */}
                <div className="mt-5 pt-4 border-t border-border/45 flex items-center justify-between gap-2">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground truncate max-w-[80px]">
                    {stat.change.replace(stat.change.split(' ')[0], '').trim() || 'Active growth'}
                  </span>
                  <Sparkline data={stat.sparkline} color={strokeColor} />
                </div>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
