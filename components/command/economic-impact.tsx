'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Landmark, Users, Cpu, Coins, ShieldCheck, TrendingUp } from 'lucide-react';

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.75rem',
  fontSize: '0.8rem',
  color: 'hsl(var(--foreground))',
};

const financialQuarterlyData = [
  { quarter: 'Q1 2025', savings: 120, royalties: 340 },
  { quarter: 'Q2 2025', savings: 150, royalties: 480 },
  { quarter: 'Q3 2025', savings: 180, royalties: 680 },
  { quarter: 'Q4 2025', savings: 210, royalties: 920 },
  { quarter: 'Q1 2026', savings: 240, royalties: 1100 },
  { quarter: 'Q2 2026', savings: 290, royalties: 1350 },
];

export function EconomicImpact() {
  const econCards = [
    { label: 'Institution Revenue', val: 'US$48.0K', change: '+14% YoY', icon: Coins },
    { label: 'Developer Spending', val: 'US$18.4K', change: '+22% growth', icon: Users },
    { label: 'Government Savings', val: 'US$12.0K', change: 'Open-source routes', icon: Landmark },
    { label: 'Research Funding', val: 'US$840K', change: 'Academic grants', icon: Cpu },
    { label: 'Jobs Created', val: '340+', change: 'Data curators', icon: Users },
    { label: 'Assets Preserved', val: '48.2K', change: 'Oral tape records', icon: ShieldCheck },
  ];

  return (
    <section id="economic-impact" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Coins className="h-4.5 w-4.5 text-primary" />
          Sovereign Economic Impact
        </h3>
        <p className="text-xs text-muted-foreground">
          Financial dashboard auditing royalty distributions, administrative savings, and regional employment indices.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        
        {/* KPI Grid Column */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-5">
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.04}>
            {econCards.map((card) => {
              const CardIcon = card.icon;

              return (
                <StaggerItem key={card.label}>
                  <GlassCard className="p-4.5 flex flex-col justify-between hover:border-primary/40 h-full">
                    <div>
                      <div className="flex items-center justify-between border-b border-border/60 pb-2">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                          Economic metric
                        </span>
                        <CardIcon className="h-4 w-4 text-primary shrink-0" />
                      </div>
                      <div className="text-lg font-extrabold text-foreground mt-3 font-mono">
                        {card.val}
                      </div>
                      <h4 className="text-[10px] text-muted-foreground mt-1.5 leading-normal">
                        {card.label}
                      </h4>
                    </div>
                    <div className="mt-3.5 text-[8px] font-mono text-emerald-400">
                      {card.change}
                    </div>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>

        {/* Savings & Royalties AreaChart Column */}
        <div className="lg:col-span-5 flex flex-col">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-border/80 bg-card/40 shadow-glow" hover={false}>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 border-b border-border/50 pb-3">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              Sovereign Savings & Royalties growth (US$ Thousands)
            </h4>

            <div className="h-[10rem] mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={financialQuarterlyData} margin={{ left: -22, right: 8, top: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="royaltiesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00C6A7" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#00C6A7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                  <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" fontSize={9} axisLine={false} tickLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={9} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="savings" stroke="#0ea5e9" strokeWidth={2} fill="url(#savingsGrad)" name="Gov Savings" />
                  <Area type="monotone" dataKey="royalties" stroke="#00C6A7" strokeWidth={2} fill="url(#royaltiesGrad)" name="Royalties Paid" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
