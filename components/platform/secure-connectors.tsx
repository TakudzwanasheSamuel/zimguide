'use client';

import { connectors } from '@/lib/platform-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { KeyRound, ShieldAlert, Zap, RefreshCw } from 'lucide-react';

export function SecureConnectors() {
  return (
    <section id="secure-connectors" className="relative py-24 lg:py-32 overflow-hidden bg-secondary/5">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Secure Boundary Gateways"
            title={
              <>
                Hardened Connectors for <span className="gradient-text">Any Data Environment</span>
              </>
            }
            subtitle="Connect arbitrary database types, API feeds, object vaults, and telemetry interfaces with military-grade transport encryption and zero local-agent configuration."
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {connectors.map((c) => {
            return (
              <StaggerItem key={c.id}>
                <GlassCard className="group h-full p-6 hover:border-accent/40 hover:shadow-glow">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h4 className="text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {c.name}
                      </h4>
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        Gateway Connector Config
                      </p>
                    </div>

                    <div className="mt-6 space-y-3.5 border-t border-border/50 pt-4">
                      {/* Auth */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground flex items-center gap-1.5">
                          <KeyRound className="h-3 w-3 text-primary" />
                          Authentication
                        </span>
                        <span className="text-xs text-foreground font-medium">{c.auth}</span>
                      </div>

                      {/* Encryption */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground flex items-center gap-1.5">
                          <ShieldAlert className="h-3 w-3 text-primary" />
                          Encryption
                        </span>
                        <span className="text-xs text-foreground font-medium">{c.encryption}</span>
                      </div>

                      {/* Sync Status */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground flex items-center gap-1.5">
                          <RefreshCw className="h-3 w-3 text-primary" />
                          Sync Pattern
                        </span>
                        <span className="text-xs text-foreground font-medium">{c.syncStatus}</span>
                      </div>

                      {/* Latency */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground flex items-center gap-1.5">
                          <Zap className="h-3 w-3 text-primary" />
                          Ingestion Latency
                        </span>
                        <span className="text-xs font-mono font-bold text-accent">{c.latency}</span>
                      </div>
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
