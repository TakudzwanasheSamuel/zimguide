'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Sparkles,
  Package,
  Brain,
  FileSearch,
  Eraser,
  Eye,
  Lock,
  Layers,
  Tags,
  BarChart3,
  CheckCircle2,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { GlassCard } from '@/components/site/section';
import { Button } from '@/components/ui/button';
import { usePipelineControl } from '@/hooks/use-pipeline-control';
import { PROCESSING_STAGES } from '@/lib/pipeline-types';
import type { PipelineStageId } from '@/lib/pipeline-types';
import { formatDuration, formatEta } from '@/lib/connector-utils';
import { cn } from '@/lib/utils';
import { getInstitutionSource } from '@/lib/demo-story';

const STAGE_ICONS: Record<PipelineStageId, React.ElementType> = {
  validation: ShieldCheck,
  cleaning: Eraser,
  pii_detection: Eye,
  anonymization: Lock,
  standardization: Layers,
  metadata: Tags,
  quality: BarChart3,
  ai_readiness: Brain,
  packaging: Package,
};

interface ProcessingPipelineProps {
  sourceKey?: string;
  slug?: string;
  autoStart?: boolean;
  institutionName?: string;
}

export function ProcessingPipeline({
  sourceKey,
  slug,
  autoStart = false,
  institutionName,
}: ProcessingPipelineProps) {
  const {
    status,
    isProcessing,
    displayProgress,
    elapsedMs,
    quality,
    aiReadiness,
    startPipeline,
    getStageState,
    isComplete,
    isFailed,
    error,
  } = usePipelineControl();

  const triggeredRef = useRef(false);

  useEffect(() => {
    if (autoStart && sourceKey && slug && !triggeredRef.current) {
      triggeredRef.current = true;
      startPipeline(sourceKey, slug, true);
    }
  }, [autoStart, sourceKey, slug, startPipeline]);

  const currentIndex = status?.current_stage
    ? PROCESSING_STAGES.findIndex((s) => s.id === status.current_stage)
    : isComplete
      ? PROCESSING_STAGES.length
      : -1;

  return (
    <div className="flex flex-col gap-4">
      <GlassCard className="p-4 border-cyan-500/20 bg-cyan-500/5" hover={false}>
        <p className="text-[9px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
          Platform Flow — Steps 5–12
        </p>
        <p className="text-[10px] text-muted-foreground mt-1 font-mono">
          Connector &amp; extraction complete → Validation → PII Detection → Anonymization →
          Standardization → Metadata → Quality → AI Readiness → Data Asset
        </p>
      </GlassCard>

      <GlassCard className="p-5 border-border/80 bg-card/40" hover={false}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Data Processing Pipeline
            </h4>
            {institutionName && (
              <p className="text-[10px] font-mono text-primary mt-0.5">{institutionName}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!isProcessing && !isComplete && (
              <Button
                size="sm"
                className="h-8 text-[10px] shadow-glow"
                onClick={() => startPipeline(sourceKey, slug)}
              >
                <FileSearch className="h-3 w-3 mr-1" />
                Run Pipeline
              </Button>
            )}
            {isProcessing && (
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400">
                <Loader2 className="h-3 w-3 animate-spin" />
                Processing
              </span>
            )}
          </div>
        </div>

        {(isProcessing || isComplete) && (
          <div className="mb-4 flex justify-between text-[10px] font-mono text-muted-foreground">
            <span>
              Elapsed: <span className="text-foreground">{formatDuration(elapsedMs)}</span>
            </span>
            <span>
              ETA: <span className="text-cyan-400">{formatEta(elapsedMs, displayProgress)}</span>
            </span>
            <span>
              Progress: <span className="text-primary">{displayProgress.toFixed(0)}%</span>
            </span>
          </div>
        )}

        <div className="relative h-1.5 rounded-full bg-secondary/80 overflow-hidden mb-5">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-purple-500 to-emerald-400"
            animate={{ width: `${displayProgress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="grid gap-2">
          {PROCESSING_STAGES.map((stage, idx) => {
            const stageStatus = getStageState(stage.id);
            const Icon = STAGE_ICONS[stage.id];
            const done = stageStatus?.state === 'completed' || idx < currentIndex;
            const active = stageStatus?.state === 'running' || idx === currentIndex;
            const failed = stageStatus?.state === 'failed';

            return (
              <motion.div
                key={stage.id}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 border text-[10px] font-mono transition-all',
                  done && 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
                  active && !done && 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.15)]',
                  failed && 'border-red-500/30 bg-red-500/10 text-red-400',
                  !done && !active && !failed && 'border-border/40 bg-secondary/20 text-muted-foreground',
                )}
                animate={active && !done ? { opacity: [0.7, 1, 0.7] } : {}}
                transition={{ duration: 1.5, repeat: active && !done ? Infinity : 0 }}
              >
                <div
                  className={cn(
                    'grid h-7 w-7 shrink-0 place-items-center rounded-lg border',
                    done && 'border-emerald-500/40 bg-emerald-500/15',
                    active && 'border-cyan-500/40 bg-cyan-500/15',
                  )}
                >
                  {done ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : active ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Icon className="h-3.5 w-3.5 opacity-60" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold block">{stage.label}</span>
                  {stageStatus?.message && (
                    <span className="text-[9px] opacity-70 truncate block">
                      {stageStatus.message}
                    </span>
                  )}
                </div>
                {stageStatus?.output_path && done && (
                  <span className="text-[8px] text-muted-foreground truncate max-w-[120px]">
                    {stageStatus.output_path.split('/').pop()}
                  </span>
                )}
                {active && (
                  <span className="text-cyan-400 font-bold">
                    {stageStatus?.progress?.toFixed(0) ?? displayProgress.toFixed(0)}%
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </GlassCard>

      {isComplete && (
        <GlassCard className="p-4 border-primary/25 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3" hover={false}>
          <div>
            <p className="text-sm font-semibold text-foreground">Data Asset Published</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">
              Ready for Marketplace discovery, API access, and AI Applications
            </p>
          </div>
          <Button asChild size="sm" className="h-8 text-[10px] shadow-glow shrink-0">
            <Link href={`/marketplace${sourceKey ? `?highlight=${getInstitutionSource(sourceKey)?.datasetId ?? ''}` : ''}`}>
              View in Marketplace →
            </Link>
          </Button>
        </GlassCard>
      )}

      {(isComplete || quality || aiReadiness) && (
        <div className="grid sm:grid-cols-2 gap-3">
          <GlassCard className="p-4 border-emerald-500/20 bg-emerald-500/5" hover={false}>
            <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">
              Quality Score
            </p>
            <p className="text-3xl font-bold text-emerald-400 font-mono mt-1">
              {((status?.quality_score ?? (quality as { overall_quality_score?: number })?.overall_quality_score ?? 0) * 100).toFixed(0)}%
            </p>
          </GlassCard>
          <GlassCard className="p-4 border-purple-500/20 bg-purple-500/5" hover={false}>
            <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono">
              AI Readiness
            </p>
            <p className="text-3xl font-bold text-purple-400 font-mono mt-1">
              {((status?.ai_readiness_score ?? (aiReadiness as { overall_ai_readiness_score?: number })?.overall_ai_readiness_score ?? 0) * 100).toFixed(0)}%
            </p>
          </GlassCard>
        </div>
      )}

      {isComplete && status?.artifacts_generated && status.artifacts_generated.length > 0 && (
        <GlassCard className="p-4 border-border/60" hover={false}>
          <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono mb-2">
            Output Artifacts ({status.artifacts_generated.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {status.artifacts_generated.map((artifact: string) => (
              <span
                key={artifact}
                className="rounded-md border border-border/50 bg-secondary/40 px-2 py-1 text-[8px] font-mono text-muted-foreground"
              >
                {artifact.split(/[/\\]/).pop()}
              </span>
            ))}
          </div>
        </GlassCard>
      )}

      {isFailed && error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-400 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-300">Pipeline Failed</p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">{error}</p>
            <Button
              size="sm"
              className="mt-2 h-8 text-xs"
              onClick={() => startPipeline(sourceKey, slug)}
            >
              Retry Pipeline
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
