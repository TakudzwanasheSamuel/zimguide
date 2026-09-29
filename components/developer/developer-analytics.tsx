'use client';

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { GlassCard } from '@/components/site/section';
import { BarChart3, TrendingUp, Zap, Clock } from 'lucide-react';

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.75rem',
  fontSize: '0.8rem',
  color: 'hsl(var(--foreground))',
};

const dailyRequestsData = [
  { day: 'Mon', requests: 3.8 },
  { day: 'Tue', requests: 4.1 },
  { day: 'Wed', requests: 4.0 },
  { day: 'Thu', requests: 4.2 },
  { day: 'Fri', requests: 4.5 },
  { day: 'Sat', requests: 4.3 },
  { day: 'Sun', requests: 4.7 },
];

const apiLatencyData = [
  { name: 'Dataset', latency: 85, color: '#0EA5E9' },
  { name: 'Metadata', latency: 45, color: '#00C6A7' },
  { name: 'Search', latency: 62, color: '#10B981' },
  { name: 'Embedding', latency: 140, color: '#F59E0B' },
  { name: 'Vector', latency: 95, color: '#D946EF' },
];

export function DeveloperAnalytics() {
  return (
    <section id="developer-analytics" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <BarChart3 className="h-4.5 w-4.5 text-primary" />
          Developer Queries Analytics Telemetry
        </h3>
        <p className="text-xs text-muted-foreground">
          Real-time request metrics compiled across API gateway endpoints and server clusters.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* Daily Requests AreaChart */}
        <GlassCard className="p-6 h-[20rem]" hover={false}>
          <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 border-b border-border/50 pb-3">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            Daily Requests Load (Millions)
          </h4>
          
          <div className="h-[13rem] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyRequestsData} margin={{ left: -22, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="requestsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="requests" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#requestsGrad)" name="Queries (M)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* API Average Latency BarChart */}
        <GlassCard className="p-6 h-[20rem]" hover={false}>
          <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 border-b border-border/50 pb-3">
            <Clock className="h-3.5 w-3.5 text-primary" />
            Average Response Latency (Milliseconds)
          </h4>
          
          <div className="h-[13rem] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={apiLatencyData} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="latency" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Latency (ms)">
                  {apiLatencyData.map((entry, index) => (
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
