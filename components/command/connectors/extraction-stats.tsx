'use client';

import { motion } from 'framer-motion';
import { FileDown, Files, Gauge, HardDrive, Timer, Database } from 'lucide-react';
import { GlassCard } from '@/components/site/section';
import { useAnimatedNumber } from '@/hooks/use-animated-number';
import { formatBytes, formatEta } from '@/lib/connector-utils';

interface ExtractionStatsProps {
  datasetsFound: number;
  filesDownloaded: number;
  recordsExtracted: number;
  transferSpeed: number;
  progress: number;
  elapsedMs: number;
  currentDataset?: string;
  currentFile?: string | null;
  currentSizeBytes?: number;
}

function StatBlock({
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
    <div className="rounded-xl border border-border/50 bg-secondary/30 p-3">
      <div className="flex items-center gap-2 text-muted-foreground mb-1">
        <Icon className="h-3.5 w-3.5 text-primary" />
        <span className="text-[9px] uppercase tracking-wider font-mono">{label}</span>
      </div>
      <motion.span
        key={String(value)}
        className="text-lg font-bold text-foreground font-mono"
        initial={{ opacity: 0.5, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {value}
        {suffix}
      </motion.span>
    </div>
  );
}

export function ExtractionStats({
  datasetsFound,
  filesDownloaded,
  recordsExtracted,
  transferSpeed,
  progress,
  elapsedMs,
  currentDataset,
  currentFile,
  currentSizeBytes = 0,
}: ExtractionStatsProps) {
  const animatedRecords = useAnimatedNumber(recordsExtracted);
  const animatedFiles = useAnimatedNumber(filesDownloaded);
  const animatedDatasets = useAnimatedNumber(datasetsFound);

  return (
    <GlassCard className="p-4 border-border/80 bg-card/40" hover={false}>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Extraction Panel
      </h4>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        <StatBlock icon={Database} label="Datasets Found" value={animatedDatasets} />
        <StatBlock icon={Files} label="Files Downloaded" value={animatedFiles} />
        <StatBlock icon={FileDown} label="Records Extracted" value={animatedRecords.toLocaleString()} />
        <StatBlock icon={Gauge} label="Transfer Speed" value={transferSpeed} suffix=" rec/s" />
        <StatBlock icon={Timer} label="Est. Remaining" value={formatEta(elapsedMs, progress)} />
        <StatBlock
          icon={HardDrive}
          label="Current Size"
          value={currentSizeBytes > 0 ? formatBytes(currentSizeBytes) : '--'}
        />
      </div>

      {(currentDataset || currentFile) && (
        <div className="mt-3 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-2 text-[10px] font-mono">
          {currentDataset && (
            <p>
              <span className="text-muted-foreground">Dataset: </span>
              <span className="text-cyan-300">{currentDataset}</span>
            </p>
          )}
          {currentFile && (
            <p className="mt-0.5">
              <span className="text-muted-foreground">File: </span>
              <span className="text-foreground">{currentFile}</span>
            </p>
          )}
        </div>
      )}
    </GlassCard>
  );
}
