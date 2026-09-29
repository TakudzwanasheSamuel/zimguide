'use client';

import { healthStatuses } from '@/lib/developer-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Activity, ShieldCheck, Timer } from 'lucide-react';

export function APIHealth() {
  return (
    <section id="api-health" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Activity className="h-4.5 w-4.5 text-primary" />
          API Gateway Microservices Health Status
        </h3>
        <p className="text-xs text-muted-foreground">
          Real-time trace monitors reporting connectivity ping times and system availability.
        </p>
      </div>

      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.04}>
        {healthStatuses.map((serv) => {
          const isOperational = serv.status === 'operational';
          
          return (
            <StaggerItem key={serv.name}>
              <GlassCard className="group p-5 flex flex-col justify-between hover:border-primary/40 h-full">
                <div>
                  <div className="flex items-start justify-between border-b border-border/60 pb-3">
                    <h5 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                      {serv.name}
                    </h5>
                    
                    <span className="flex items-center gap-1.5 font-mono text-[9px] font-bold">
                      {isOperational ? (
                        <>
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                          </span>
                          <span className="text-emerald-400">ACTIVE</span>
                        </>
                      ) : (
                        <>
                          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                          <span className="text-amber-400">DEGRADED</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-[10px] font-mono text-slate-300">
                  <span className="flex items-center gap-1">
                    <Timer className="h-3.5 w-3.5 text-muted-foreground" />
                    Ping Latency
                  </span>
                  <span className="font-bold text-foreground">{serv.latency}</span>
                </div>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
