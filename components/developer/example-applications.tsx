'use client';

import { useState } from 'react';
import { exampleApps, type ExampleApp } from '@/lib/developer-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem, Reveal } from '@/components/motion/reveal';
import { Sparkles, X, Terminal, Cpu, Info, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

export function ExampleApplications() {
  const [activeApp, setActiveApp] = useState<ExampleApp | null>(null);

  return (
    <section id="example-apps" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Cpu className="h-4.5 w-4.5 text-primary" />
          Example Applications & Boilerplates
        </h3>
        <p className="text-xs text-muted-foreground">
          Explore reference architectures and production-ready applications built on top of ZimGuide Data Core.
        </p>
      </div>

      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.04}>
        {exampleApps.map((app) => (
          <StaggerItem key={app.id}>
            <GlassCard className="group h-full p-5 flex flex-col justify-between hover:border-primary/45 hover:shadow-glow cursor-pointer" onClick={() => setActiveApp(app)}>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-primary font-bold">
                  Reference App
                </span>
                <h4 className="mt-2 text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {app.name}
                </h4>
                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                  {app.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/45 flex items-center justify-between text-[10px] text-primary font-semibold">
                <span>View Architecture</span>
                <Info className="h-4 w-4" />
              </div>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Detail Overlay Modal */}
      <AnimatePresence>
        {activeApp && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveApp(null)}
              className="fixed inset-0 z-50 bg-black backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-4 top-[10%] max-w-xl mx-auto z-50 rounded-2xl border border-border/60 bg-card p-6 shadow-soft-lg glass-strong flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between border-b border-border/60 pb-3">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-primary font-bold">Architecture Blueprint</span>
                    <h4 className="text-base font-bold text-foreground mt-1">{activeApp.name}</h4>
                  </div>
                  <button onClick={() => setActiveApp(null)} className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="mt-5 space-y-4 text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Application Description</span>
                    <p className="text-muted-foreground leading-relaxed">{activeApp.desc}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Architecture & Stack</span>
                    <p className="text-foreground leading-relaxed font-semibold">{activeApp.architecture}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">APIs Utilized</span>
                    <div className="flex items-center gap-1.5 text-primary font-mono font-bold mt-1">
                      <Terminal className="h-3.5 w-3.5 shrink-0" />
                      {activeApp.apiUsed}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">Consumed Datasets</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeApp.datasets.map((d) => (
                        <span key={d} className="bg-secondary/40 border border-border/80 text-[10px] text-muted-foreground px-2 py-0.5 rounded-lg font-medium">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom verify footer */}
              <div className="mt-8 pt-4 border-t border-border/60 flex items-center justify-between gap-4">
                <span className="text-[9px] font-mono text-muted-foreground flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  Code template ready
                </span>
                <Button size="sm" onClick={() => setActiveApp(null)} className="h-8 text-xs font-semibold px-4">
                  Close Blueprint
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
