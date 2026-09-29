'use client';

import { processingActivities } from '@/lib/portal-data';
import { GlassCard } from '@/components/site/section';
import { Reveal } from '@/components/motion/reveal';
import { Network, CheckCircle2, AlertTriangle, PlayCircle, Eye, User, Timer } from 'lucide-react';

export function ProcessingActivity() {
  return (
    <section id="processing-activity" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Network className="h-4.5 w-4.5 text-primary" />
          Ingestion & Processing Activity Log
        </h3>
        <p className="text-xs text-muted-foreground">
          Audit trails tracking dataset syncs, validation status checks, PII scans, and compilation times.
        </p>
      </div>

      <GlassCard className="p-6 md:p-8 border-border/80 bg-card/40 shadow-glow">
        <div className="relative border-l border-border/70 pl-6 ml-3 space-y-8">
          
          {processingActivities.map((log, idx) => {
            const isCompleted = log.status === 'Completed';
            const isWarning = log.status === 'Warning';
            const isRunning = log.status === 'Running';

            return (
              <Reveal key={log.id} direction="left" delay={idx * 0.05} duration={0.5} amount={0.1}>
                <div className="relative group">
                  
                  {/* Timeline bullet */}
                  <span className={`absolute -left-[31px] top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full border bg-background shadow-soft transition-colors ${
                    isCompleted
                      ? 'border-primary text-primary'
                      : isWarning
                      ? 'border-amber-400 text-amber-400'
                      : 'border-sky-400 text-sky-400'
                  }`}>
                    {isCompleted && <CheckCircle2 className="h-3 w-3 fill-current text-background" />}
                    {isWarning && <AlertTriangle className="h-3 w-3" />}
                    {isRunning && <PlayCircle className="h-3 w-3 text-sky-400 animate-spin" />}
                  </span>

                  {/* Activity Details Card */}
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-secondary/20 hover:bg-secondary/30 transition-colors border border-border/60 p-4 rounded-xl">
                    <div className="flex-1">
                      <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors leading-relaxed">
                        {log.activity}
                      </h4>
                      <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-muted-foreground font-mono">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          Operator: {log.operator}
                        </span>
                        {log.processingTime !== 'N/A' && (
                          <span className="flex items-center gap-1">
                            <Timer className="h-3 w-3" />
                            Elapsed: {log.processingTime}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-left md:text-right shrink-0">
                      <span className="text-[10px] font-mono text-muted-foreground block">
                        {log.timestamp}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[9px] font-mono font-bold mt-1 uppercase ${
                        isCompleted
                          ? 'text-primary'
                          : isWarning
                          ? 'text-amber-400'
                          : 'text-sky-400'
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  </div>

                </div>
              </Reveal>
            );
          })}

        </div>
      </GlassCard>
    </section>
  );
}
