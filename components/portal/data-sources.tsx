'use client';

import { connectedSources } from '@/lib/portal-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Activity, ShieldCheck, RefreshCw, AlertTriangle, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export function DataSourceHealth() {
  return (
    <section id="data-sources" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Activity className="h-4.5 w-4.5 text-primary" />
          Connected Repositories & Agent Health
        </h3>
        <p className="text-xs text-muted-foreground">
          Real-time status check logs from active extraction agents running on institutional networks.
        </p>
      </div>

      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
        {connectedSources.map((source) => {
          const isOnline = source.status === 'online';
          const isSyncing = source.status === 'syncing';
          const isIdle = source.status === 'idle';
          const hasErrors = source.errors > 0;

          return (
            <StaggerItem key={source.id}>
              <GlassCard className="group h-full p-5 hover:border-primary/45 hover:shadow-glow flex flex-col justify-between">
                <div>
                  {/* Title & Status */}
                  <div className="flex items-start justify-between border-b border-border/60 pb-3.5">
                    <h4 className="text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors truncate pr-2">
                      {source.name}
                    </h4>

                    {/* Status Dot badge */}
                    <span className="flex items-center gap-1 shrink-0 font-mono text-[9px] font-bold">
                      {isOnline && (
                        <>
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                          </span>
                          <span className="text-emerald-400">ACTIVE</span>
                        </>
                      )}
                      {isSyncing && (
                        <>
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                          </span>
                          <span className="text-amber-400">SYNCING</span>
                        </>
                      )}
                      {isIdle && (
                        <>
                          <span className="h-2 w-2 rounded-full bg-sky-400" />
                          <span className="text-sky-400">IDLE</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Core Metrics */}
                  <div className="mt-4 grid grid-cols-2 gap-3.5 text-[11px] leading-relaxed">
                    <div>
                      <span className="text-muted-foreground block text-[9px] uppercase tracking-wider font-mono">Connector Type</span>
                      <span className="font-semibold text-foreground">{source.connectorType}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[9px] uppercase tracking-wider font-mono">Managed Records</span>
                      <span className="font-semibold text-foreground">{source.records}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[9px] uppercase tracking-wider font-mono">Network Latency</span>
                      <span className="font-semibold text-foreground font-mono">{source.latency}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[9px] uppercase tracking-wider font-mono">Sync Interval</span>
                      <span className="font-semibold text-foreground font-mono">Real-time CDC</span>
                    </div>
                  </div>
                </div>

                {/* Agent Health indicators */}
                <div className="mt-6 pt-4 border-t border-border/60">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Cpu className="h-3.5 w-3.5 text-primary" />
                      Agent Connectivity & Errors
                    </span>
                    <span className={`font-mono font-bold ${hasErrors ? 'text-amber-400' : 'text-primary'}`}>
                      {source.health}% health {hasErrors && `(${source.errors} err)`}
                    </span>
                  </div>
                  {/* Progress health bar */}
                  <div className="h-1 w-full bg-secondary/80 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${hasErrors ? 'bg-amber-400' : 'bg-gradient-brand'}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${source.health}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.15 }}
                    />
                  </div>

                  {/* Sync status footer */}
                  <div className="mt-3.5 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                    <span className="flex items-center gap-1">
                      <RefreshCw className="h-3 w-3" />
                      Last Ingest: {source.lastSync}
                    </span>
                    {hasErrors && (
                      <span className="text-amber-400 flex items-center gap-1 font-semibold">
                        <AlertTriangle className="h-3 w-3" />
                        Warning Flagged
                      </span>
                    )}
                  </div>
                </div>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
