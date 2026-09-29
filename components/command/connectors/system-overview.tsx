'use client';

import { Building2, Cable, Database, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { GlassCard } from '@/components/site/section';
import { useAnimatedNumber } from '@/hooks/use-animated-number';
import type { DashboardStatistics } from '@/lib/connector-types';

interface SystemOverviewProps {
  dashboard?: DashboardStatistics;
}

function OverviewCard({
  icon: Icon,
  label,
  value,
  suffix = '',
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  suffix?: string;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-secondary/30 p-3 text-center">
      <Icon className="h-4 w-4 text-primary mx-auto mb-1.5" />
      <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono mb-1">
        {label}
      </p>
      <p className="text-xl font-bold text-foreground font-mono">
        {value}
        {suffix}
      </p>
    </div>
  );
}

export function SystemOverview({ dashboard }: SystemOverviewProps) {
  const connected = useAnimatedNumber(dashboard?.connected ?? 0);
  const online = useAnimatedNumber(dashboard?.connected ?? 0);
  const discovered = useAnimatedNumber(dashboard?.total_datasets_discovered ?? 0);
  const records = useAnimatedNumber(dashboard?.total_records_extracted ?? 0);
  const successRate = dashboard
    ? Math.round(
        ((dashboard.total_connectors - dashboard.failed) / dashboard.total_connectors) * 100,
      )
    : 100;

  return (
    <GlassCard className="p-4 border-border/80 bg-card/40" hover={false}>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        System Overview
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <OverviewCard icon={Building2} label="Connected Institutions" value={connected} />
        <OverviewCard icon={Cable} label="Online Connectors" value={online} />
        <OverviewCard icon={Database} label="Datasets Discovered" value={discovered} />
        <OverviewCard
          icon={TrendingUp}
          label="Records Extracted Today"
          value={records.toLocaleString()}
        />
        <OverviewCard icon={Clock} label="Avg Sync Time" value="~4.2s" />
        <OverviewCard
          icon={CheckCircle2}
          label="Extraction Success Rate"
          value={successRate}
          suffix="%"
        />
      </div>
    </GlassCard>
  );
}
