'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/site/section';
import type { HealthReport } from '@/lib/connector-types';
import { cn } from '@/lib/utils';

interface ConnectorHealthCardProps {
  health?: HealthReport;
  connectorVersion?: string;
}

function RadialGauge({
  value,
  label,
  color,
  max = 100,
  suffix = '%',
}: {
  value: number;
  label: string;
  color: string;
  max?: number;
  suffix?: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-20">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="6"
          />
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 6px ${color}55)` }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-sm font-bold text-foreground">
            {typeof value === 'number' && value < 10 ? value.toFixed(1) : Math.round(value)}
            {suffix}
          </span>
        </div>
      </div>
      <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground text-center">
        {label}
      </span>
    </div>
  );
}

export function ConnectorHealthCard({ health, connectorVersion = '2.0.0' }: ConnectorHealthCardProps) {
  const availability = health ? health.availability * 100 : 0;
  const healthScore = health ? health.health_score * 100 : 0;

  return (
    <GlassCard className="p-5 border-border/80 bg-card/40" hover={false}>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        Health Dashboard
      </h4>

      <div className="grid grid-cols-3 gap-3">
        <RadialGauge value={availability} label="Availability" color="#10b981" />
        <RadialGauge
          value={health?.latency_ms ?? 0}
          label="Latency"
          color="#0ea5e9"
          max={500}
          suffix="ms"
        />
        <RadialGauge
          value={health?.throughput_records_per_sec ?? 0}
          label="Throughput"
          color="#a855f7"
          max={500}
          suffix="/s"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-mono">
        <div className="rounded-lg border border-border/50 bg-secondary/30 px-3 py-2 col-span-1 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-primary">
            {Math.round(healthScore)}%
          </span>
          <span className="text-[9px] uppercase text-muted-foreground mt-1">Health Score</span>
        </div>
        <div className="space-y-2">
          <div className="rounded-lg border border-border/50 bg-secondary/30 px-3 py-2">
            <span className="text-muted-foreground block text-[9px] uppercase">Last Sync</span>
            <span className="text-foreground font-semibold text-[10px]">
              {health?.last_sync
                ? new Date(health.last_sync).toLocaleString()
                : 'Not synced'}
            </span>
          </div>
          <div className="rounded-lg border border-border/50 bg-secondary/30 px-3 py-2">
            <span className="text-muted-foreground block text-[9px] uppercase">Connector Version</span>
            <span className="text-primary font-semibold">v{connectorVersion}</span>
          </div>
        </div>
        <div className="col-span-2 rounded-lg border border-border/50 bg-secondary/30 px-3 py-2">
          <span className="text-muted-foreground block text-[9px] uppercase">Auth Status</span>
          <span
            className={cn(
              'font-semibold capitalize',
              health?.authentication_status === 'authenticated'
                ? 'text-emerald-400'
                : 'text-muted-foreground',
            )}
          >
            {health?.authentication_status?.replace(/_/g, ' ') ?? 'Unknown'}
          </span>
        </div>
      </div>
    </GlassCard>
  );
}
