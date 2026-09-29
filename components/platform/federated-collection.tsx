'use client';

import { motion } from 'framer-motion';
import { institutions } from '@/lib/platform-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Activity, ShieldCheck, RefreshCw, Eye } from 'lucide-react';

export function FederatedCollection() {
  return (
    <section id="federated-collection" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Federated Collection"
            title={
              <>
                Connect Institutions <span className="gradient-text">Without Moving</span> Their Data
              </>
            }
            subtitle="ZimGuide Data Core connects directly to institutional systems through secure API boundaries. Institutions retain ownership and custody; only approved, scrubbed datasets enter the platform."
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {institutions.map((inst) => {
            const isOnline = inst.status === 'online';
            const isSyncing = inst.status === 'syncing';
            const isIdle = inst.status === 'idle';

            return (
              <StaggerItem key={inst.id}>
                <GlassCard className="group relative flex h-full flex-col justify-between p-6 hover:border-primary/40">
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <span className="rounded-lg border border-border/80 bg-secondary/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {inst.category}
                      </span>
                      
                      {/* Status indicator */}
                      <span className="flex items-center gap-1.5 text-xs font-mono">
                        {isOnline && (
                          <>
                            <span className="relative flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            <span className="text-emerald-400 text-[10px]">ACTIVE</span>
                          </>
                        )}
                        {isSyncing && (
                          <>
                            <span className="relative flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                            </span>
                            <span className="text-amber-400 text-[10px]">SYNCING</span>
                          </>
                        )}
                        {isIdle && (
                          <>
                            <span className="h-2 w-2 rounded-full bg-sky-400" />
                            <span className="text-sky-400 text-[10px]">IDLE</span>
                          </>
                        )}
                      </span>
                    </div>

                    <h4 className="mt-4 text-base font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {inst.name}
                    </h4>

                    <div className="mt-6 space-y-3.5 border-t border-border/50 pt-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <Activity className="h-3.5 w-3.5" />
                          Connector
                        </span>
                        <span className="font-mono text-foreground font-medium">{inst.connectorType}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <Eye className="h-3.5 w-3.5" />
                          Indexed Data
                        </span>
                        <span className="text-foreground font-medium">{inst.records}</span>
                      </div>
                    </div>
                  </div>

                  {/* Health index footer */}
                  <div className="mt-5 border-t border-border/50 pt-4">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                        Trust & Health Index
                      </span>
                      <span className="font-mono text-primary font-bold">{inst.health}%</span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1 w-full bg-secondary/80 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-brand"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${inst.health}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
