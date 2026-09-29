'use client';

import { motion } from 'framer-motion';
import {
  Archive,
  BarChart3,
  GraduationCap,
  Map,
  Wheat,
  Activity,
  Clock,
  Database,
  KeyRound,
  Loader2,
} from 'lucide-react';
import { GlassCard } from '@/components/site/section';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Connector, ConnectorStatus, HealthReport } from '@/lib/connector-types';
import { STATUS_COLORS, formatDuration } from '@/lib/connector-utils';

const ICONS = {
  national_archives: Archive,
  zimstat: BarChart3,
  agritex: Wheat,
  msu: GraduationCap,
  geospatial: Map,
} as const;

interface ConnectorCardProps {
  connector: Connector;
  status?: ConnectorStatus;
  health?: HealthReport;
  isActive: boolean;
  isSyncing: boolean;
  onConnect: () => void;
  onRun: () => void;
  onDisconnect: () => void;
  onViewDetails: () => void;
}

export function ConnectorCard({
  connector,
  status,
  health,
  isActive,
  isSyncing,
  onConnect,
  onRun,
  onDisconnect,
  onViewDetails,
}: ConnectorCardProps) {
  const Icon = ICONS[connector.id as keyof typeof ICONS] ?? Database;
  const state = status?.state ?? 'Disconnected';
  const colors = STATUS_COLORS[state];
  const busy = isActive && isSyncing;

  return (
    <GlassCard
      className={cn(
        'p-4 transition-all duration-300',
        isActive && 'border-primary/50 shadow-glow ring-1 ring-primary/20',
        colors.border,
      )}
      glow={isActive}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'grid h-10 w-10 shrink-0 place-items-center rounded-xl border bg-secondary/60',
            colors.border,
          )}
        >
          <Icon className={cn('h-5 w-5', colors.text)} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="truncate text-xs font-bold text-foreground">{connector.institution}</h4>
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span
                className={cn(
                  'absolute inline-flex h-full w-full rounded-full opacity-75',
                  colors.dot,
                  state !== 'Disconnected' && state !== 'Completed' && 'animate-ping',
                )}
              />
              <span className={cn('relative inline-flex h-2.5 w-2.5 rounded-full', colors.dot)} />
            </span>
          </div>

          <p className="mt-1 text-[10px] text-muted-foreground line-clamp-2">
            {connector.description}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2 text-[9px] font-mono">
            <div className={cn('rounded-md px-2 py-1', colors.bg)}>
              <span className="text-muted-foreground block uppercase tracking-wider">Status</span>
              <span className={cn('font-semibold', colors.text)}>{state}</span>
            </div>
            <div className="rounded-md bg-secondary/50 px-2 py-1">
              <span className="text-muted-foreground block uppercase tracking-wider">Health</span>
              <span className="font-semibold text-emerald-400">
                {health ? `${Math.round(health.health_score * 100)}%` : '--'}
              </span>
            </div>
            <div className="rounded-md bg-secondary/50 px-2 py-1">
              <span className="text-muted-foreground block uppercase tracking-wider">Datasets</span>
              <span className="font-semibold text-foreground">
                {status?.datasets_discovered ?? health?.dataset_count ?? '--'}
              </span>
            </div>
            <div className="rounded-md bg-secondary/50 px-2 py-1">
              <span className="text-muted-foreground block uppercase tracking-wider">Last Sync</span>
              <span className="font-semibold text-foreground truncate block">
                {health?.last_sync
                  ? new Date(health.last_sync).toLocaleDateString()
                  : 'Never'}
              </span>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-[9px] text-muted-foreground font-mono">
            <KeyRound className="h-3 w-3 text-primary" />
            {connector.auth_method}
          </div>

          {busy && (
            <div className="mt-3">
              <div className="flex justify-between text-[9px] font-mono text-muted-foreground mb-1">
                <span className="flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Syncing
                </span>
                <span>{status?.progress?.toFixed(0) ?? 0}%</span>
              </div>
              <div className="h-1 w-full rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-cyan-500"
                  animate={{ width: `${status?.progress ?? 0}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button
          size="sm"
          variant="outline"
          className="h-8 text-[10px] font-semibold"
          onClick={onConnect}
          disabled={busy}
        >
          Connect
        </Button>
        <Button
          size="sm"
          className="h-8 text-[10px] font-semibold shadow-glow"
          onClick={onRun}
          disabled={busy}
        >
          {busy ? (
            <>
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Running...
            </>
          ) : (
            'Run Connector'
          )}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 text-[10px] text-muted-foreground"
          onClick={onDisconnect}
          disabled={busy}
        >
          Disconnect
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 text-[10px] text-muted-foreground"
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </div>

      {status?.duration_ms != null && status.duration_ms > 0 && (
        <div className="mt-2 flex items-center gap-1 text-[9px] font-mono text-muted-foreground">
          <Clock className="h-3 w-3" />
          Duration: {formatDuration(status.duration_ms)}
        </div>
      )}
    </GlassCard>
  );
}
