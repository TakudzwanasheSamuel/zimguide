'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { revenueSources, monthlyRevenueTrend24m } from '@/lib/revenue-data';
import { GlassCard } from '@/components/site/section';
import { Coins, TrendingUp, BarChart3 } from 'lucide-react';

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.75rem',
  fontSize: '0.8rem',
  color: 'hsl(var(--foreground))',
};

export function RevenueCharts() {
  return (
    <section id="revenue-charts" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <BarChart3 className="h-4.5 w-4.5 text-primary" />
          Ecosystem Revenue Breakdown & Growth
        </h3>
        <p className="text-xs text-muted-foreground">
          Analytics tracking historical earnings growth alongside active distribution sectors.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        
        {/* Left Column: Revenue Sources Donut Chart */}
        <div className="lg:col-span-5 flex flex-col">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-border/80 bg-card/40 shadow-glow" hover={false}>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3 flex items-center gap-1.5">
              <Coins className="h-3.5 w-3.5 text-primary" />
              Ecosystem Revenue Sources Share
            </h4>

            <div className="h-[14rem] mt-6 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                  >
                    {revenueSources.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Grid Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] font-mono leading-relaxed border-t border-border/40 pt-4">
              {revenueSources.map((src) => (
                <div key={src.name} className="flex items-center gap-1.5 truncate">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: src.color }} />
                  <span className="text-slate-300 truncate max-w-[80px]">{src.name}</span>
                  <span className="text-foreground font-bold shrink-0">{src.value}%</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column: 24-Month Trend AreaChart */}
        <div className="lg:col-span-7 flex flex-col">
          <GlassCard className="p-6 h-[25rem] md:h-full flex flex-col justify-between border-border/80 bg-card/40 shadow-glow" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3 flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                24-Month Revenue & Royalty Trend (US$ Thousands)
              </h4>
              <p className="text-xs text-muted-foreground mt-2">
                Plotting platform gross revenues alongside aggregate paid out royalties.
              </p>
            </div>

            <div className="h-[14rem] mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenueTrend24m} margin={{ left: -22, right: 8, top: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueTrendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#BC5E2B" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#BC5E2B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="royaltyTrendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D47A43" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#D47A43" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="revenue" stroke="#BC5E2B" strokeWidth={2} fill="url(#revenueTrendGrad)" name="Revenue" />
                  <Area type="monotone" dataKey="royalties" stroke="#D47A43" strokeWidth={2} fill="url(#royaltyTrendGrad)" name="Royalties" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Chart footer */}
            <div className="border-t border-border/40 pt-3 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-3 bg-[#BC5E2B] rounded" /> Gross Revenue
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-3 bg-[#D47A43] rounded" /> Royalties Paid
                </span>
              </div>
              <span>Updated 2 minutes ago</span>
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
