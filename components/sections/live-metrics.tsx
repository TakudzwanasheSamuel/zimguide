'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, animate } from 'framer-motion';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  liveMetrics,
  datasetGrowthData,
  institutionGrowthData,
  apiUsageAreaData,
  dataCategoryRadar,
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

function AnimatedCounter({
  value,
  suffix = '',
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  const decimals = value % 1 !== 0 ? 1 : 0;
  return (
    <span ref={ref} className="tabular-nums">
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function LiveMetrics() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Live Platform Metrics"
            title={
              <>
                The sovereign data ecosystem{' '}
                <span className="gradient-text">in numbers</span>
              </>
            }
            subtitle="Real-time telemetry from the ZimGuide Data Core platform — the same dashboard institutions use to track their data footprint."
          />
        </Reveal>

        {/* Metric cards */}
        <StaggerGroup className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6" stagger={0.06}>
          {liveMetrics.map((m) => (
            <StaggerItem key={m.label}>
              <GlassCard className="p-5" hover={true}>
                <div className="gradient-text text-3xl font-semibold tracking-tight">
                  <AnimatedCounter value={m.value} suffix={m.suffix} />
                </div>
                <div className="mt-1.5 text-xs text-muted-foreground">{m.label}</div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Charts */}
        <StaggerGroup className="mt-6 grid gap-5 lg:grid-cols-2" stagger={0.1}>
          {/* Dataset Growth */}
          <StaggerItem>
            <GlassCard className="h-full p-6" hover={false}>
              <h3 className="text-base font-semibold">Dataset Growth</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Curated vs. subscribed datasets by quarter
              </p>
              <div className="mt-6 h-[16rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={datasetGrowthData} margin={{ left: -16, right: 8, top: 8 }}>
                    <defs>
                      <linearGradient id="curatedGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00C6A7" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#00C6A7" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="subscribedGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'hsl(var(--border))' }} />
                    <Area type="monotone" dataKey="curated" stroke="#00C6A7" strokeWidth={2} fill="url(#curatedGrad)" />
                    <Area type="monotone" dataKey="subscribed" stroke="#2563EB" strokeWidth={2} fill="url(#subscribedGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </StaggerItem>

          {/* Institution Growth */}
          <StaggerItem>
            <GlassCard className="h-full p-6" hover={false}>
              <h3 className="text-base font-semibold">Institution Growth</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Partner institutions onboarded per quarter
              </p>
              <div className="mt-6 h-[16rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={institutionGrowthData} margin={{ left: -16, right: 8, top: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'hsl(var(--border))' }} />
                    <Line
                      type="monotone"
                      dataKey="institutions"
                      stroke="#0EA5E9"
                      strokeWidth={2.5}
                      dot={{ fill: '#0EA5E9', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </StaggerItem>

          {/* API Usage */}
          <StaggerItem>
            <GlassCard className="h-full p-6" hover={false}>
              <h3 className="text-base font-semibold">API Usage</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Monthly API requests in thousands
              </p>
              <div className="mt-6 h-[16rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={apiUsageAreaData} margin={{ left: -16, right: 8, top: 8 }}>
                    <defs>
                      <linearGradient id="apiBarGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00C6A7" />
                        <stop offset="100%" stopColor="#0EA5E9" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'hsl(var(--secondary) / 0.4)' }} />
                    <Bar dataKey="requests" fill="url(#apiBarGrad)" radius={[6, 6, 0, 0]} maxBarSize={36} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </StaggerItem>

          {/* Data Categories Radar */}
          <StaggerItem>
            <GlassCard className="h-full p-6" hover={false}>
              <h3 className="text-base font-semibold">Data Categories</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Coverage across modalities
              </p>
              <div className="mt-6 h-[16rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={dataCategoryRadar} outerRadius="70%">
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" fontSize={10} angle={90} />
                    <Radar
                      dataKey="value"
                      stroke="#00C6A7"
                      fill="#00C6A7"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
