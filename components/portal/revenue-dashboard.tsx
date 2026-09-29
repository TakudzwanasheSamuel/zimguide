'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  financialStats,
  monthlyRoyaltiesData,
  topRevenueDatasets,
} from '@/lib/portal-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Coins, TrendingUp, BarChart3, Receipt, ArrowUpRight } from 'lucide-react';

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.75rem',
  fontSize: '0.8rem',
  color: 'hsl(var(--foreground))',
};

export function RevenueDashboard() {
  return (
    <section id="revenue-dashboard" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Coins className="h-4.5 w-4.5 text-emerald-400" />
          Financial & Revenue Analytics
        </h3>
        <p className="text-xs text-muted-foreground">
          Track royalties generated from dataset downloads, research subscriptions, and commercial LLM API routing.
        </p>
      </div>

      {/* Financial Cards Grid */}
      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
        
        {/* Total Revenue */}
        <StaggerItem>
          <GlassCard className="p-5 flex flex-col justify-between hover:border-emerald-500/40">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">Cumulative Earnings</span>
                <Receipt className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold tracking-tight text-foreground font-mono mt-4">
                {financialStats.totalRevenue}
              </div>
            </div>
            <div className="mt-4 pt-3.5 border-t border-border/50 text-[10px] text-muted-foreground font-mono flex items-center gap-1">
              <span className="text-emerald-400 font-bold flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                +14.8%
              </span>
              growth rate
            </div>
          </GlassCard>
        </StaggerItem>

        {/* Royalties This Month */}
        <StaggerItem>
          <GlassCard className="p-5 flex flex-col justify-between hover:border-emerald-500/40">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">Monthly Royalties</span>
                <Coins className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold tracking-tight text-foreground font-mono mt-4">
                {financialStats.monthlyRoyalties}
              </div>
            </div>
            <div className="mt-4 pt-3.5 border-t border-border/50 text-[10px] text-muted-foreground font-mono flex items-center gap-1">
              <span className="text-emerald-400 font-bold flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                +18.2%
              </span>
              vs last month
            </div>
          </GlassCard>
        </StaggerItem>

        {/* Projected Earnings */}
        <StaggerItem>
          <GlassCard className="p-5 flex flex-col justify-between hover:border-emerald-500/40">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">Projected Run Rate</span>
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold tracking-tight text-foreground font-mono mt-4">
                {financialStats.projectedEarnings}
              </div>
            </div>
            <div className="mt-4 pt-3.5 border-t border-border/50 text-[10px] text-muted-foreground font-mono">
              Annual forecast metrics
            </div>
          </GlassCard>
        </StaggerItem>

        {/* Most Valuable Dataset */}
        <StaggerItem>
          <GlassCard className="p-5 flex flex-col justify-between hover:border-emerald-500/40">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">Highest Performing Asset</span>
                <BarChart3 className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-xs font-bold text-foreground mt-4 leading-tight truncate">
                {financialStats.mostValuableDataset}
              </div>
            </div>
            <div className="mt-4 pt-3.5 border-t border-border/50 text-[10px] text-emerald-400 font-mono font-bold">
              US$34,250 total earned
            </div>
          </GlassCard>
        </StaggerItem>

      </StaggerGroup>

      {/* Revenue Charts Grid */}
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        
        {/* Monthly Royalties LineChart */}
        <GlassCard className="p-6 h-[20rem]" hover={false}>
          <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 border-b border-border/50 pb-3">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
            Monthly Royalties Growth (US$)
          </h4>
          <div className="h-[13rem] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRoyaltiesData} margin={{ left: -22, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="royalties" stroke="#10B981" strokeWidth={2.5} name="Earnings" activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Top Revenue Generating Datasets BarChart */}
        <GlassCard className="p-6 h-[20rem]" hover={false}>
          <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 border-b border-border/50 pb-3">
            <BarChart3 className="h-3.5 w-3.5 text-emerald-400" />
            Royalties by Dataset (US$)
          </h4>
          <div className="h-[13rem] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topRevenueDatasets} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" fill="#00C6A7" radius={[4, 4, 0, 0]} name="Royalties">
                  {topRevenueDatasets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

      </div>
    </section>
  );
}
