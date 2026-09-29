'use client';

import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  BadgeCheck, ShieldCheck, Lock, Cpu, GitBranch, Tags,
  FileLock, Sparkles, Code2, Zap, Globe, Terminal, Copy,
  ArrowRight, Download, Heart, Star, TrendingUp, Check,
  type LucideIcon,
} from 'lucide-react';
import { GlassCard } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  qualityMetrics, schemaFields, trustFeatures, marketplacePricing,
  recentlyAdded, popularDatasets, marketplaceGrowthData,
  institutionContributions, categoryDistributionMkt,
  type MarketplaceDataset,
} from '@/lib/marketplace-data';
import type { MarketplaceStatistics } from '@/lib/dataset-types';
import { useState } from 'react';
import { toast } from 'sonner';

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.75rem',
  fontSize: '0.8rem',
  color: 'hsl(var(--foreground))',
};

const trustIconMap: Record<string, LucideIcon> = {
  BadgeCheck, ShieldCheck, Lock, Cpu, GitBranch, Tags, FileLock, Sparkles,
};

/* ── Circular Progress ── */
function CircularProgress({
  value, label, color, size = 110,
}: {
  value: number; label: string; color: string; size?: number;
}) {
  const radius = (size - 14) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="-rotate-90" width={size} height={size}>
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="hsl(var(--secondary))" strokeWidth="6"
          />
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-xl font-semibold tabular-nums">{value}</span>
        </div>
      </div>
      <span className="mt-2 text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export function QualityScore({ stats }: { stats?: MarketplaceStatistics }) {
  const overall = stats
    ? Math.round(stats.average_quality_score * 100)
    : Math.round(qualityMetrics.reduce((a, m) => a + m.value, 0) / qualityMetrics.length);
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" /> Data Quality
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              AI-Ready by <span className="gradient-text">Design</span>
            </h2>
          </div>
        </Reveal>
        <GlassCard hover={false} className="p-8">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-around">
            {/* Overall */}
            <div className="flex flex-col items-center">
              <CircularProgress value={overall} label="Overall Quality Score" color="#00C6A7" size={160} />
            </div>
            {/* Metrics */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {qualityMetrics.map((m) => (
                <CircularProgress key={m.label} value={m.value} label={m.label} color={m.color} />
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

/* ── Schema Preview ── */
export function SchemaPreview() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" /> Schema
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Dataset <span className="gradient-text">Schema Preview</span>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/60">
            <div className="flex items-center justify-between border-b border-border/40 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                <span className="ml-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Code2 className="h-3.5 w-3.5" /> schema.json
                </span>
              </div>
              <span className="text-xs text-muted-foreground">JSON Schema</span>
            </div>
            <div className="overflow-x-auto p-5 font-mono text-sm">
              <div className="text-muted-foreground">{'{'}</div>
              {schemaFields.map((f, i) => (
                <div key={f.name} className="flex gap-2 py-0.5 pl-6">
                  <span className="text-sky-300">&quot;{f.name}&quot;</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-emerald-300">&quot;{f.type}&quot;</span>
                  {i < schemaFields.length - 1 && <span className="text-muted-foreground">,</span>}
                  <span className="ml-4 text-muted-foreground/50">// {f.desc}</span>
                </div>
              ))}
              <div className="text-muted-foreground">{'}'}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── API Access ── */
const apiTabs = [
  { label: 'REST', lang: 'bash', code: `curl https://api.zimguide.co/v1/datasets/ds_001/records \\\n  -H "Authorization: Bearer $ZG_KEY"` },
  { label: 'Python', lang: 'python', code: `from zimguide import ZimGuide\n\nzg = ZimGuide(api_key=os.environ["ZG_KEY"])\nrecords = zg.datasets.records("ds_001")` },
  { label: 'JavaScript', lang: 'js', code: `import { ZimGuide } from "@zimguide/sdk";\n\nconst zg = new ZimGuide({ apiKey: process.env.ZG_KEY });\nconst records = await zg.datasets.records("ds_001");` },
  { label: 'GraphQL', lang: 'graphql', code: `query {\n  dataset(id: "ds_001") {\n    records(limit: 100) {\n      record_id\n      province\n      content\n    }\n  }\n}` },
];

export function ApiAccess() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(apiTabs[active].code);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="developers" className="relative py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                <Zap className="h-3 w-3 text-primary" /> API Access
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Programmatic <span className="gradient-text">Access</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Consume datasets via REST, GraphQL, or SDKs. Type-safe, version-pinned,
                and built for production AI pipelines.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-wrap gap-2">
                {['REST API', 'GraphQL', 'Python SDK', 'JavaScript SDK', 'cURL', 'Streaming'].map((t) => (
                  <span key={t} className="rounded-lg border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs text-foreground/80">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <Button className="mt-6 gap-2" asChild>
                <a href="#developers">View API Documentation <ArrowRight className="h-4 w-4" /></a>
              </Button>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-soft-lg backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">zg-cli</span>
                </div>
                <button onClick={copy} className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
                  {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="flex border-b border-border/60">
                {apiTabs.map((t, i) => (
                  <button
                    key={t.label}
                    onClick={() => setActive(i)}
                    className={cn('border-r border-border/60 px-4 py-2.5 text-xs transition-colors',
                      active === i ? 'bg-secondary/60 text-foreground' : 'text-muted-foreground hover:text-foreground')}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <pre className="overflow-x-auto p-5 text-sm leading-relaxed">
                <code className="font-mono text-muted-foreground">{apiTabs[active].code}</code>
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Analytics ── */
export function MarketplaceAnalytics({ stats }: { stats?: MarketplaceStatistics }) {
  const headlineStats = stats
    ? [
        { label: 'Total Datasets', value: String(stats.total_datasets) },
        { label: 'Institutions', value: String(stats.total_institutions) },
        { label: 'Total Downloads', value: stats.total_downloads.toLocaleString() },
        { label: 'AI Ready', value: `${stats.ai_ready_percent}%` },
      ]
    : null;

  const categoryChartData = stats
    ? Object.entries(stats.categories).map(([name, value], i) => ({
        name,
        value,
        color: ['#00C6A7', '#2563EB', '#8B5CF6', '#F59E0B', '#EC4899'][i % 5],
      }))
    : categoryDistributionMkt;
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" /> Analytics
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Marketplace <span className="gradient-text">Analytics</span>
            </h2>
          </div>
        </Reveal>
        {headlineStats && (
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {headlineStats.map((item) => (
              <GlassCard key={item.label} hover={false} className="p-4 text-center">
                <div className="text-2xl font-semibold gradient-text">{item.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{item.label}</div>
              </GlassCard>
            ))}
          </div>
        )}
        <StaggerGroup className="grid gap-5 lg:grid-cols-2" stagger={0.1}>
          <StaggerItem>
            <GlassCard hover={false} className="h-full p-6">
              <h3 className="text-base font-semibold">Dataset Growth & Downloads</h3>
              <p className="mt-1 text-sm text-muted-foreground">Monthly trends</p>
              <div className="mt-6 h-[16rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={marketplaceGrowthData} margin={{ left: -16, right: 8, top: 8 }}>
                    <defs>
                      <linearGradient id="dsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00C6A7" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#00C6A7" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="dlGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area type="monotone" dataKey="datasets" stroke="#00C6A7" strokeWidth={2} fill="url(#dsGrad)" />
                    <Area type="monotone" dataKey="downloads" stroke="#2563EB" strokeWidth={2} fill="url(#dlGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </StaggerItem>
          <StaggerItem>
            <GlassCard hover={false} className="h-full p-6">
              <h3 className="text-base font-semibold">Institution Contributions</h3>
              <p className="mt-1 text-sm text-muted-foreground">By institution type</p>
              <div className="mt-6 h-[16rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={institutionContributions} margin={{ left: -16, right: 8, top: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'hsl(var(--secondary) / 0.4)' }} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
                      {institutionContributions.map((e) => (
                        <Cell key={e.name} fill={e.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </StaggerItem>
          <StaggerItem className="lg:col-span-2">
            <GlassCard hover={false} className="p-6">
              <h3 className="text-base font-semibold">Dataset Categories</h3>
              <p className="mt-1 text-sm text-muted-foreground">Distribution across the marketplace</p>
              <div className="mt-6 h-[14rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryChartData} layout="vertical" margin={{ left: 20, right: 20, top: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={90} />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'hsl(var(--secondary) / 0.4)' }} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={28}>
                      {categoryChartData.map((e) => (
                        <Cell key={e.name} fill={e.color} />
                      ))}
                    </Bar>
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

/* ── Trust & Compliance ── */
export function TrustCompliance() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              <ShieldCheck className="h-3 w-3 text-primary" /> Trust & Compliance
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Built on <span className="gradient-text">Trust</span>
            </h2>
          </div>
        </Reveal>
        <StaggerGroup className="grid grid-cols-2 gap-4 md:grid-cols-4" stagger={0.05}>
          {trustFeatures.map((t) => {
            const Icon = trustIconMap[t.icon] ?? BadgeCheck;
            return (
              <StaggerItem key={t.title}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-xl transition-all hover:border-primary/30 hover:bg-card/60">
                  <div className="grid h-10 w-10 place-items-center rounded-lg border border-border/60 bg-secondary/60 text-primary transition-all group-hover:scale-110 group-hover:border-primary/40">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold">{t.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{t.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ── Pricing ── */
export function MarketplacePricing() {
  return (
    <section id="pricing" className="relative py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" /> Pricing
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h2>
          </div>
        </Reveal>
        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.06}>
          {marketplacePricing.map((tier) => (
            <StaggerItem key={tier.name}>
              <div className={cn(
                'relative flex h-full flex-col rounded-2xl border bg-card/60 p-5 backdrop-blur-xl transition-all hover:border-primary/30',
                tier.highlighted && 'border-primary/40 shadow-glow',
              )}>
                <h3 className="text-sm font-semibold">{tier.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-semibold">{tier.price}</span>
                  <span className="text-xs text-muted-foreground">{tier.cadence}</span>
                </div>
                <Button size="sm" variant={tier.highlighted ? 'default' : 'outline'} className="mt-4 w-full" asChild>
                  <a href="#contact">{tier.name === 'Data Curation' || tier.name === 'Enterprise' ? 'Contact Sales' : `Choose ${tier.name}`}</a>
                </Button>
                <div className="mt-4 space-y-2 border-t border-border/60 pt-4 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">Downloads</span><span className="font-medium">{tier.downloads}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">API Calls</span><span className="font-medium">{tier.apiCalls}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Support</span><span className="font-medium">{tier.support}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Commercial</span><span className="font-medium">{tier.commercial}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Rate Limit</span><span className="font-medium">{tier.rateLimit}</span></div>
                </div>
                <ul className="mt-4 space-y-1.5 border-t border-border/60 pt-4">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-xs">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" strokeWidth={3} />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ── Recently Added Carousel ── */
export function RecentlyAdded({
  datasets = recentlyAdded,
  onPreview,
}: {
  datasets?: MarketplaceDataset[];
  onPreview: (d: MarketplaceDataset) => void;
}) {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" /> New
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Recently Added</h2>
            </div>
          </div>
        </Reveal>
        <div className="mask-fade-edges overflow-x-auto pb-4">
          <div className="flex gap-4">
            {datasets.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group w-72 shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl transition-all hover:border-primary/30"
              >
                <div className={cn('relative h-24 overflow-hidden bg-gradient-to-br', d.coverGradient)}>
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  <span className="absolute right-3 top-3 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary backdrop-blur">New</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {d.institution} <BadgeCheck className="h-3 w-3 text-primary" />
                  </div>
                  <h3 className="mt-1 text-sm font-semibold">{d.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{d.description}</p>
                  <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Download className="h-3 w-3" />{d.downloads.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-400" />{d.rating}</span>
                    <span className="ml-auto">{d.updated}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="mt-3 w-full gap-1.5 text-xs text-primary" onClick={() => onPreview(d)}>
                    Preview Dataset
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Popular Datasets ── */
export function PopularDatasets({
  datasets = popularDatasets,
  onPreview,
}: {
  datasets?: MarketplaceDataset[];
  onPreview: (d: MarketplaceDataset) => void;
}) {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-primary" /> Trending
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Popular Datasets</h2>
          </div>
        </Reveal>
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-secondary/30 backdrop-blur">
              <tr className="border-b border-border/60">
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Dataset</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Institution</th>
                <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Downloads</th>
                <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Favorites</th>
                <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Rating</th>
                <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Reviews</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {[...datasets].sort((a, b) => b.downloads - a.downloads).slice(0, 5).map((d, i) => (
                <motion.tr
                  key={d.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border/40 transition-colors hover:bg-secondary/20"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-brand/10 text-xs font-bold text-primary">{i + 1}</span>
                      <span className="font-medium">{d.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{d.institution}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">{d.downloads.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">{d.favorites.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right">
                    <span className="flex items-center justify-end gap-1"><Star className="h-3 w-3 text-amber-400" />{d.rating}</span>
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">{d.reviews}</td>
                  <td className="px-5 py-3 text-right">
                    <Button size="sm" variant="ghost" className="gap-1 text-xs text-primary" onClick={() => onPreview(d)}>
                      Preview
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
