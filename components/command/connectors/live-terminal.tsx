'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { GlassCard } from '@/components/site/section';
import type { TerminalLog } from '@/lib/connector-types';
import { cn } from '@/lib/utils';

interface LiveTerminalProps {
  logs: TerminalLog[];
}

export function LiveTerminal({ logs }: LiveTerminalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <GlassCard className="overflow-hidden border-border/80" hover={false}>
      <div className="flex items-center gap-2 border-b border-border/60 bg-[#0a0e14] px-4 py-2.5">
        <Terminal className="h-3.5 w-3.5 text-emerald-400" />
        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
          Live Terminal
        </span>
        <div className="ml-auto flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="h-56 overflow-y-auto bg-[#060a10] p-4 font-mono text-[11px] leading-relaxed"
      >
        {logs.length === 0 ? (
          <p className="text-muted-foreground/60">
            Waiting for connector activity...
          </p>
        ) : (
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="mb-1"
              >
                <span className="text-slate-500">[{log.timestamp}]</span>{' '}
                <span
                  className={cn(
                    log.level === 'success' && 'text-emerald-400',
                    log.level === 'error' && 'text-red-400',
                    log.level === 'warning' && 'text-amber-400',
                    log.level === 'info' && 'text-slate-300',
                  )}
                >
                  {log.message}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </GlassCard>
  );
}
