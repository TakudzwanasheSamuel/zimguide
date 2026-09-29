'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PipelineStageName } from '@/lib/connector-types';

interface PipelineStageProps {
  label: PipelineStageName;
  index: number;
  activeIndex: number;
  isLast?: boolean;
}

export function PipelineStage({ label, index, activeIndex, isLast }: PipelineStageProps) {
  const completed = index < activeIndex;
  const active = index === activeIndex;
  const pending = index > activeIndex;

  return (
    <div className="flex flex-col items-center text-center gap-2 relative flex-1 min-w-0">
      {!isLast && (
        <div className="absolute top-4 left-[55%] right-[-45%] h-[2px] bg-secondary/80 overflow-hidden hidden md:block">
          {completed && <div className="h-full w-full bg-emerald-500/80" />}
          {active && (
            <motion.div
              className="h-full w-3 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
              animate={{ x: ['-100%', '400%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </div>
      )}

      <motion.div
        className={cn(
          'relative z-10 grid h-8 w-8 place-items-center rounded-xl border text-[10px] font-bold',
          completed && 'border-emerald-500/50 bg-emerald-500/15 text-emerald-400',
          active && 'border-cyan-400/60 bg-cyan-500/15 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.35)]',
          pending && 'border-border/60 bg-secondary/40 text-muted-foreground',
        )}
        animate={active ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 1.2, repeat: active ? Infinity : 0 }}
      >
        {completed ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : active ? (
          <motion.span
            className="h-2 w-2 rounded-full bg-cyan-400"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        ) : (
          <Circle className="h-3.5 w-3.5 opacity-40" />
        )}
      </motion.div>

      <span
        className={cn(
          'text-[9px] font-mono font-semibold leading-tight',
          completed && 'text-emerald-400',
          active && 'text-cyan-300',
          pending && 'text-muted-foreground',
        )}
      >
        {label}
      </span>
    </div>
  );
}
