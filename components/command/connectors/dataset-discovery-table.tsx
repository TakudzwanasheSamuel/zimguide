'use client';

import { motion } from 'framer-motion';
import { Download, FileJson, Tag } from 'lucide-react';
import { GlassCard } from '@/components/site/section';
import { Button } from '@/components/ui/button';
import type { DatasetDiscovery } from '@/lib/connector-types';
import { formatBytes } from '@/lib/connector-utils';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';

interface DatasetDiscoveryTableProps {
  datasets: DatasetDiscovery[];
  onExtract?: (datasetId: string) => void;
  isSyncing?: boolean;
}

export function DatasetDiscoveryTable({
  datasets,
  onExtract,
  isSyncing,
}: DatasetDiscoveryTableProps) {
  if (datasets.length === 0) {
    return (
      <GlassCard className="p-6 text-center border-border/60" hover={false}>
        <p className="text-xs text-muted-foreground font-mono">
          Run a connector to discover institutional datasets
        </p>
      </GlassCard>
    );
  }

  return (
    <StaggerGroup className="grid gap-3 sm:grid-cols-2" stagger={0.05}>
      {datasets.map((ds) => (
        <StaggerItem key={ds.dataset_id}>
          <GlassCard className="p-4 h-full border-border/60 hover:border-primary/40">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-foreground truncate">{ds.title}</h5>
                <p className="mt-1 text-[10px] text-muted-foreground line-clamp-2">
                  {ds.description}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[8px] font-mono uppercase ${
                  ds.extractable
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-500/15 text-slate-400 border border-slate-500/30'
                }`}
              >
                {ds.extractable ? 'Ready' : 'Catalog'}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-[9px] font-mono">
              <div>
                <span className="text-muted-foreground block">Records</span>
                <span className="font-semibold text-foreground">
                  {ds.record_count.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">Size</span>
                <span className="font-semibold text-foreground">{formatBytes(ds.size_bytes)}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Format</span>
                <span className="font-semibold text-foreground flex items-center gap-1">
                  <FileJson className="h-3 w-3 text-primary" />
                  {ds.formats.join(', ')}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">Category</span>
                <span className="font-semibold text-foreground flex items-center gap-1">
                  <Tag className="h-3 w-3 text-accent" />
                  {ds.category}
                </span>
              </div>
            </div>

            <div className="mt-2 text-[9px] font-mono text-muted-foreground">
              Updated: {new Date(ds.last_updated).toLocaleDateString()} · {ds.license}
            </div>

            {ds.extractable && onExtract && (
              <Button
                size="sm"
                variant="outline"
                className="mt-3 h-7 w-full text-[10px] gap-1.5"
                onClick={() => onExtract(ds.dataset_id)}
                disabled={isSyncing}
              >
                <Download className="h-3 w-3" />
                Extract
              </Button>
            )}
          </GlassCard>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
