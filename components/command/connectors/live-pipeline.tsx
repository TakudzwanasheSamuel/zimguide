'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/site/section';
import { PIPELINE_STAGES } from '@/lib/connector-types';
import { mapPipelineActiveIndex } from '@/lib/connector-utils';
import { PipelineStage } from './pipeline-stage';
import type { SyncStage } from '@/lib/connector-types';
import { SYNC_STAGES } from '@/lib/connector-types';
import { cn } from '@/lib/utils';
import { formatDuration, formatEta } from '@/lib/connector-utils';

interface LivePipelineProps {
  syncStage: SyncStage;
  progress: number;
  elapsedMs: number;
  institutionName?: string;
  isSyncing: boolean;
}

export function LivePipeline({
  syncStage,
  progress,
  elapsedMs,
  institutionName,
  isSyncing,
}: LivePipelineProps) {
  const activePipelineIndex = mapPipelineActiveIndex(syncStage);
  const stageIndex = SYNC_STAGES.findIndex((s) => s.id === syncStage);

  return (
    <div className="flex flex-col gap-4">
      <GlassCard className="p-5 md:p-6 border-border/80 bg-card/40" hover={false}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Live Pipeline
            </h4>
            {institutionName && (
              <p className="text-[10px] text-primary font-mono mt-0.5">{institutionName}</p>
            )}
          </div>
          {isSyncing && (
            <div className="text-right text-[10px] font-mono">
              <span className="text-muted-foreground">Elapsed </span>
              <span className="text-foreground font-semibold">{formatDuration(elapsedMs)}</span>
              <span className="text-muted-foreground mx-2">|</span>
              <span className="text-muted-foreground">ETA </span>
              <span className="text-cyan-400 font-semibold">{formatEta(elapsedMs, progress)}</span>
            </div>
          )}
        </div>

        <div className="flex items-start justify-between gap-1 md:gap-2">
          {PIPELINE_STAGES.map((stage, idx) => (
            <PipelineStage
              key={stage}
              label={stage}
              index={idx}
              activeIndex={isSyncing ? activePipelineIndex : -1}
              isLast={idx === PIPELINE_STAGES.length - 1}
            />
          ))}
        </div>

        {/* Particle flow overlay */}
        {isSyncing && (
          <div className="relative mt-4 h-1 rounded-full bg-secondary/60 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-cyan-400 to-emerald-400"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute top-0 h-full w-8 bg-white/30 blur-sm"
              animate={{ left: ['0%', `${Math.max(progress - 8, 0)}%`] }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}
      </GlassCard>

      {/* Stage progress list */}
      <GlassCard className="p-4 border-border/80 bg-card/30" hover={false}>
        <div className="space-y-2">
          {SYNC_STAGES.map((stage, idx) => {
            const done = idx < stageIndex || syncStage === 'complete';
            const current = idx === stageIndex && syncStage !== 'complete';
            const pending = idx > stageIndex && syncStage !== 'complete';

            return (
              <motion.div
                key={stage.id}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-[10px] font-mono transition-colors',
                  done && 'bg-emerald-500/10 text-emerald-400',
                  current && 'bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/30',
                  pending && 'text-muted-foreground',
                )}
                animate={current ? { opacity: [0.7, 1, 0.7] } : {}}
                transition={{ duration: 1.5, repeat: current ? Infinity : 0 }}
              >
                <span className="w-4 text-center font-bold">
                  {done ? '✓' : current ? '›' : '·'}
                </span>
                <span className="flex-1">{stage.label}</span>
                {current && isSyncing && (
                  <span className="text-cyan-400">{progress.toFixed(0)}%</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
