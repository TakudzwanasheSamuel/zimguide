'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { analyticsData } from '@/lib/platform-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal } from '@/components/motion/reveal';
import { Activity, BarChart4, TrendingUp, Cpu, Database, Eye } from 'lucide-react';

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.75rem',
  fontSize: '0.8rem',
  color: 'hsl(var(--foreground))',
};

type AnalyticsTab = 'throughput' | 'volume' | 'api' | 'distribution';

export function PlatformAnalytics() {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('throughput');

  return (
    <section id="platform-analytics" className="relative py-24 lg:py-32 overflow-hidden bg-secondary/5">
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[30rem] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Platform Metrics"
            title={
              <>
                Live Technology <span className="gradient-text">Telemetry</span>
              </>
            }
            subtitle="Inspect live performance analytics: tracking dataset compiling volumes, ingestion pipelines throughput, average api processing latencies, and categories footprint."
          />
        </Reveal>

        {/* Tab Controls */}
        <div className="mt-16 flex flex-wrap justify-center gap-3 border-b border-border/60 pb-5">
          <button
            onClick={() => setActiveTab('throughput')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-semibold font-mono tracking-tight transition-all ${
              activeTab === 'throughput'
                ? 'bg-primary/10 border-primary/45 text-primary shadow-glow'
                : 'border-border/60 text-muted-foreground hover:text-foreground'
            }`}
          >
            <Activity className="h-4 w-4" />
            Throughput & Processing
          </button>

          <button
            onClick={() => setActiveTab('volume')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-semibold font-mono tracking-tight transition-all ${
              activeTab === 'volume'
                ? 'bg-primary/10 border-primary/45 text-primary shadow-glow'
                : 'border-border/60 text-muted-foreground hover:text-foreground'
            }`}
          >
            <Database className="h-4 w-4" />
            Data Growth & Volumes
          </button>

          <button
            onClick={() => setActiveTab('api')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-semibold font-mono tracking-tight transition-all ${
              activeTab === 'api'
                ? 'bg-primary/10 border-primary/45 text-primary shadow-glow'
                : 'border-border/60 text-muted-foreground hover:text-foreground'
            }`}
          >
            <Cpu className="h-4 w-4" />
            API Latency & Errors
          </button>

          <button
            onClick={() => setActiveTab('distribution')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-semibold font-mono tracking-tight transition-all ${
              activeTab === 'distribution'
                ? 'bg-primary/10 border-primary/45 text-primary shadow-glow'
                : 'border-border/60 text-muted-foreground hover:text-foreground'
            }`}
          >
            <BarChart4 className="h-4 w-4" />
            Data Category & Quality
          </button>
        </div>

        {/* Dynamic Analytics Display Panel */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'throughput' && (
                <div className="grid gap-6 lg:grid-cols-2">
                  <GlassCard className="p-6 h-[22rem]" hover={false}>
                    <h4 className="text-sm font-semibold tracking-tight text-foreground">
                      Daily Processing Volume
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Records ingested and scrubbed by day
                    </p>
                    <div className="h-[15rem] mt-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analyticsData.dailyProcessing}>
                          <defs>
                            <linearGradient id="recordsGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#00C6A7" stopOpacity={0.4} />
                              <stop offset="100%" stopColor="#00C6A7" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Area type="monotone" dataKey="records" stroke="#00C6A7" strokeWidth={2} fill="url(#recordsGrad)" name="Records Ingested" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6 h-[22rem]" hover={false}>
                    <h4 className="text-sm font-semibold tracking-tight text-foreground">
                      Pipeline Ingestion Latency (ms)
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Average processing latency from ingestion to indexing
                    </p>
                    <div className="h-[15rem] mt-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData.dailyProcessing}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Line type="monotone" dataKey="latency" stroke="#0EA5E9" strokeWidth={2.5} name="Latency (ms)" activeDot={{ r: 6 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>
                </div>
              )}

              {activeTab === 'volume' && (
                <div className="grid gap-6 lg:grid-cols-2">
                  <GlassCard className="p-6 h-[22rem]" hover={false}>
                    <h4 className="text-sm font-semibold tracking-tight text-foreground">
                      Cumulative Platform Capacity (M Records)
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Raw records ingested vs. structured vector DB footprints
                    </p>
                    <div className="h-[15rem] mt-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analyticsData.dataVolume}>
                          <defs>
                            <linearGradient id="rawGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.4} />
                              <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="vectorGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.4} />
                              <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Area type="monotone" dataKey="rawText" stroke="#0EA5E9" strokeWidth={2} fill="url(#rawGrad)" name="Raw Records (M)" />
                          <Area type="monotone" dataKey="vectorDb" stroke="#2563EB" strokeWidth={2} fill="url(#vectorGrad)" name="Vectorized (M)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6 h-[22rem]" hover={false}>
                    <h4 className="text-sm font-semibold tracking-tight text-foreground">
                      Onboarded Institutions Growth
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Partner count vs. active ingestion pipeline buffers
                    </p>
                    <div className="h-[15rem] mt-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData.institutionGrowth}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Bar dataKey="count" fill="#00C6A7" radius={[4, 4, 0, 0]} name="Onboarded Partners" />
                          <Bar dataKey="capacity" fill="#2563EB" radius={[4, 4, 0, 0]} name="Active Pipelines" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>
                </div>
              )}

              {activeTab === 'api' && (
                <div className="grid gap-6 lg:grid-cols-2">
                  <GlassCard className="p-6 h-[22rem]" hover={false}>
                    <h4 className="text-sm font-semibold tracking-tight text-foreground">
                      API Gateway Demand (Requests/min)
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Query metrics monitored across security gateway
                    </p>
                    <div className="h-[15rem] mt-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analyticsData.apiUsage}>
                          <defs>
                            <linearGradient id="apiGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.4} />
                              <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Area type="monotone" dataKey="requests" stroke="#2563EB" strokeWidth={2} fill="url(#apiGrad)" name="Gateway Requests" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6 h-[22rem]" hover={false}>
                    <h4 className="text-sm font-semibold tracking-tight text-foreground">
                      Gateway Operational Error Rates
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      4xx and 5xx exception telemetry
                    </p>
                    <div className="h-[15rem] mt-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData.apiUsage}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Line type="monotone" dataKey="errors" stroke="#EF4444" strokeWidth={2} name="Exceptions Caught" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>
                </div>
              )}

              {activeTab === 'distribution' && (
                <div className="grid gap-6 lg:grid-cols-2">
                  <GlassCard className="p-6 h-[22rem]" hover={false}>
                    <h4 className="text-sm font-semibold tracking-tight text-foreground">
                      Data Types Ingested
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Distribution of parsed information modes
                    </p>
                    <div className="h-[15rem] mt-6 flex justify-center items-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analyticsData.dataTypes}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="name"
                          >
                            {analyticsData.dataTypes.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={tooltipStyle} />
                          <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6 h-[22rem]" hover={false}>
                    <h4 className="text-sm font-semibold tracking-tight text-foreground">
                      Dataset Quality Score Distribution
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Active datasets categorized by composite score levels
                    </p>
                    <div className="h-[15rem] mt-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData.qualityDistribution}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                          <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Bar dataKey="datasets" fill="#00C6A7" radius={[4, 4, 0, 0]} name="Active Datasets" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
