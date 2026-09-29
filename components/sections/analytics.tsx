'use client';

import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  apiUsageData,
  datasetGrowthData,
  categoryDistribution,
} from '@/lib/mock-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.75rem',
  fontSize: '0.8rem',
  color: 'hsl(var(--foreground))',
};

export function Analytics() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Live Insights"
            title={
              <>
                Observability across the{' '}
                <span className="gradient-text">sovereign catalog</span>
              </>
            }
            subtitle="Real-time telemetry on dataset curation, API consumption, and category distribution — the same dashboards institutions use to govern their data."
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-5 lg:grid-cols-3" stagger={0.1}>
          {/* API usage */}
          <StaggerItem className="lg:col-span-2">
            <GlassCard className="h-full p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold">API requests</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Billions of requests / month across all subscribers
                  </p>
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  +38% MoM
                </span>
              </div>
              <div className="mt-6 h-[18rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={apiUsageData} margin={{ left: -16, right: 8, top: 8 }}>
                    <defs>
                      <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00C6A7" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#00C6A7" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      cursor={{ stroke: 'hsl(var(--border))' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="requests"
                      stroke="#00C6A7"
                      strokeWidth={2}
                      fill="url(#reqGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </StaggerItem>

          {/* Category distribution */}
          <StaggerItem>
            <GlassCard className="h-full p-6">
              <h3 className="text-base font-semibold">Catalog by category</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Share of curated datasets
              </p>
              <div className="mt-4 h-[12rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={48}
                      outerRadius={72}
                      paddingAngle={3}
                      stroke="none"
                    >
                      {categoryDistribution.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {categoryDistribution.map((c) => (
                  <div key={c.name} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
                    {c.name}
                    <span className="ml-auto text-foreground/70">{c.value}%</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </StaggerItem>

          {/* Dataset growth */}
          <StaggerItem className="lg:col-span-3">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold">Dataset growth</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Curated vs. actively subscribed datasets, by quarter
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-[#0EA5E9]" /> Curated
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-[#2563EB]" /> Subscribed
                  </span>
                </div>
              </div>
              <div className="mt-6 h-[14rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={datasetGrowthData} margin={{ left: -16, right: 8, top: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis
                      dataKey="quarter"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      cursor={{ fill: 'hsl(var(--secondary) / 0.4)' }}
                    />
                    <Bar dataKey="curated" fill="#0EA5E9" radius={[6, 6, 0, 0]} maxBarSize={48} />
                    <Bar dataKey="subscribed" fill="#2563EB" radius={[6, 6, 0, 0]} maxBarSize={48} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
