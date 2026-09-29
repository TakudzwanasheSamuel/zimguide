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
import { Terminal, TrendingUp, Cpu, Globe } from 'lucide-react';

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.75rem',
  fontSize: '0.8rem',
  color: 'hsl(var(--foreground))',
};

const devGrowthData = [
  { month: 'Jan', developers: 9.2, sdks: 11.0 },
  { month: 'Feb', developers: 9.5, sdks: 11.5 },
  { month: 'Mar', developers: 9.9, sdks: 12.0 },
  { month: 'Apr', developers: 10.2, sdks: 12.4 },
  { month: 'May', developers: 10.8, sdks: 12.8 },
  { month: 'Jun', developers: 11.6, sdks: 13.1 },
  { month: 'Jul', developers: 12.48, sdks: 13.42 },
];

const apiTopRequests = [
  { name: 'Dataset API', requests: 4.8, color: '#0ea5e9' },
  { name: 'Vector Search', requests: 3.2, color: '#00C6A7' },
  { name: 'Embeddings', requests: 2.8, color: '#10B981' },
  { name: 'Search API', requests: 1.8, color: '#F59E0B' },
  { name: 'Metadata API', requests: 1.2, color: '#D946EF' },
];

export function APIGrowthCharts() {
  return (
    <section id="api-growth" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Terminal className="h-4.5 w-4.5 text-primary" />
          API Traffic & Growth Metrics
        </h3>
        <p className="text-xs text-muted-foreground">
          Ecosystem queries load averages, developer registration indices, and gateway transactions.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* Developer Growth AreaChart */}
        <GlassCard className="p-6 h-[20rem]" hover={false}>
          <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 border-b border-border/50 pb-3">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            Developer Registrations & SDK Downloads (Thousands)
          </h4>
          <div className="h-[13rem] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={devGrowthData} margin={{ left: -22, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="devsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="sdksGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00C6A7" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#00C6A7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="developers" stroke="#0ea5e9" strokeWidth={2} fill="url(#devsGrad)" name="Developers (K)" />
                <Area type="monotone" dataKey="sdks" stroke="#00C6A7" strokeWidth={2} fill="url(#sdksGrad)" name="SDK Installs (K)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Top APIs BarChart */}
        <GlassCard className="p-6 h-[20rem]" hover={false}>
          <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 border-b border-border/50 pb-3">
            <Cpu className="h-3.5 w-3.5 text-primary" />
            Top API Requests (Millions / Daily)
          </h4>
          <div className="h-[13rem] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={apiTopRequests} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="requests" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Daily Requests (M)">
                  {apiTopRequests.map((entry, index) => (
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
