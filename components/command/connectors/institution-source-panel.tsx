'use client';

import { Building2, Database, RefreshCw, FileType, Hash } from 'lucide-react';
import { GlassCard } from '@/components/site/section';
import { getInstitutionSource } from '@/lib/demo-story';
import type { Connector } from '@/lib/connector-types';

interface InstitutionSourcePanelProps {
  connector: Connector | undefined;
  connectorId: string | null;
}

export function InstitutionSourcePanel({ connector, connectorId }: InstitutionSourcePanelProps) {
  const profile = getInstitutionSource(connectorId ?? connector?.id);

  if (!profile && !connector) {
    return (
      <GlassCard className="p-5 border-border/60 bg-card/30" hover={false}>
        <p className="text-xs text-muted-foreground font-mono">
          Select an institution connector to view data source details.
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-5 border-primary/20 bg-primary/5" hover={false}>
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
          <Building2 className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
            Institution → Data Source
          </p>
          <h4 className="text-base font-bold text-foreground mt-1 truncate">
            {profile?.institution ?? connector?.institution}
          </h4>
          <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5">
            <Database className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="truncate">{profile?.dataSource ?? 'Institutional dataset'}</span>
          </p>
        </div>
      </div>

      {profile && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-lg border border-border/50 bg-secondary/30 px-3 py-2">
            <span className="text-[8px] font-mono uppercase text-muted-foreground flex items-center gap-1">
              <FileType className="h-3 w-3" /> Format
            </span>
            <p className="text-xs font-semibold mt-0.5">{profile.format}</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-secondary/30 px-3 py-2">
            <span className="text-[8px] font-mono uppercase text-muted-foreground flex items-center gap-1">
              <Hash className="h-3 w-3" /> Records
            </span>
            <p className="text-xs font-semibold mt-0.5">{profile.recordCount.toLocaleString()}</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-secondary/30 px-3 py-2">
            <span className="text-[8px] font-mono uppercase text-muted-foreground flex items-center gap-1">
              <RefreshCw className="h-3 w-3" /> Refresh
            </span>
            <p className="text-xs font-semibold mt-0.5">{profile.refreshCycle}</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-secondary/30 px-3 py-2">
            <span className="text-[8px] font-mono uppercase text-muted-foreground">Sector</span>
            <p className="text-xs font-semibold mt-0.5 truncate">{profile.sector}</p>
          </div>
        </div>
      )}

      <p className="text-[10px] text-muted-foreground mt-4 font-mono border-t border-border/40 pt-3">
        Step 1–2 of platform flow: connect the institution, then extract from the registered data source via the connector.
      </p>
    </GlassCard>
  );
}
