'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { forecastMRRData } from '@/lib/revenue-data';
import { GlassCard } from '@/components/site/section';
import { Sparkles, TrendingUp, Info } from 'lucide-react';

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.75rem',
  fontSize: '0.8rem',
  color: 'hsl(var(--foreground))',
};

export function RevenueForecasting() {
  return (
    <section id="revenue-forecasting" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Sparkles className="h-4.5 w-4.5 text-primary" />
          Predictive Ingestion Revenue Forecasts
        </h3>
        <p className="text-xs text-muted-foreground">
          AI-generated financial simulations projecting future recurring revenues and partner payouts.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        
        {/* Forecast Line Chart */}
        <div className="lg:col-span-8 flex flex-col">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-border/80 bg-card/40 shadow-glow" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3 flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                6-Month Recurring Revenue Forecast (US$ Thousands)
              </h4>
              <p className="text-xs text-muted-foreground mt-2">
                Actual recurring revenues mapped as solid lines, with ML projections drawn in dotted routes.
              </p>
            </div>

            <div className="h-[14rem] mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastMRRData} margin={{ left: -22, right: 8, top: 8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis domain={[150, 300]} stroke="hsl(var(--muted-foreground))" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="current" stroke="#00C6A7" strokeWidth={2.5} name="Current MRR" activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="projected" stroke="#0EA5E9" strokeWidth={2.5} strokeDasharray="4 4" name="Projected MRR" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="border-t border-border/40 pt-3 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-3 bg-[#00C6A7] rounded" /> Current MRR
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-3 bg-[#0ea5e9] rounded-none border border-dashed border-[#0ea5e9]" /> Projected MRR
                </span>
              </div>
              <span>Confidence Index: 94.6%</span>
            </div>
          </GlassCard>
        </div>

        {/* Forecast details info */}
        <div className="lg:col-span-4 flex flex-col">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-primary/20 bg-[#0b1329]/50 shadow-glow" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3 flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-primary" />
                Forecast Parameters
              </h4>
              <p className="text-xs leading-relaxed text-muted-foreground mt-4">
                Projections are compiled from active API key provisioning logs, startup registration applications, and scheduled dataset curations.
              </p>

              <div className="mt-6 space-y-3.5 text-xs font-mono">
                <div className="bg-secondary/35 p-3 rounded-lg border border-border/80 flex items-center justify-between">
                  <span className="text-slate-400">Marketplace Growth Rate:</span>
                  <span className="text-foreground font-bold">+18.5% YoY</span>
                </div>
                <div className="bg-secondary/35 p-3 rounded-lg border border-border/80 flex items-center justify-between">
                  <span className="text-slate-400">Annual recurring run rate:</span>
                  <span className="text-emerald-400 font-bold">US$22.0K</span>
                </div>
                <div className="bg-secondary/35 p-3 rounded-lg border border-border/80 flex items-center justify-between">
                  <span className="text-slate-400">Projected Royalties (12m):</span>
                  <span className="text-foreground font-bold">US$15.4K</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
