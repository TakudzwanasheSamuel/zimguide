'use client';

import { connectedInstitutionsList } from '@/lib/command-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Landmark, Database, Users, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export function ConnectedInstitutions() {
  return (
    <section id="connected-institutions" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Landmark className="h-4.5 w-4.5 text-primary" />
          Connected Institutions Registry
        </h3>
        <p className="text-xs text-muted-foreground">
          Index of institutional databases connected to the sovereign replication networks.
        </p>
      </div>

      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5" stagger={0.04}>
        {connectedInstitutionsList.map((inst) => {
          return (
            <StaggerItem key={inst.name}>
              <GlassCard className="group h-full p-5 flex flex-col justify-between hover:border-primary/45 hover:shadow-glow">
                <div>
                  <h4 className="text-xs font-bold text-slate-100 group-hover:text-primary transition-colors border-b border-border/60 pb-3 truncate max-w-[150px]">
                    {inst.name}
                  </h4>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-[10px] leading-relaxed font-mono">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Partners</span>
                      <span className="font-semibold text-foreground">{inst.count} active</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Replication Replicas</span>
                      <span className="font-semibold text-foreground">{inst.repos} nodes</span>
                    </div>
                    <div className="mt-2.5 col-span-2">
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Ready Datasets</span>
                      <span className="font-semibold text-foreground flex items-center gap-1">
                        <Database className="h-3.5 w-3.5 text-primary shrink-0" />
                        {inst.datasets} packages
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40">
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-1.5">
                    <span>Replication Health</span>
                    <span className="font-bold text-emerald-400">{inst.health}%</span>
                  </div>
                  <div className="h-1 w-full bg-secondary/80 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${inst.health}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    />
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
