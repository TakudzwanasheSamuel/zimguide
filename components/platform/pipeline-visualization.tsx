'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { pipelineStages, type PipelineStage } from '@/lib/platform-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal } from '@/components/motion/reveal';
import { Cpu, Terminal, ArrowRight, Zap, RefreshCw, Layers, ShieldCheck, Tag } from 'lucide-react';

export function PipelineVisualization() {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(2); // Default to Extraction stage
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const activeStage = pipelineStages[activeStageIdx];

  // Scroll to active stage if it moves off-screen
  useEffect(() => {
    const activeEl = document.getElementById(`pipeline-node-${activeStageIdx}`);
    const container = scrollContainerRef.current;
    if (activeEl && container) {
      const elOffset = activeEl.offsetLeft;
      const elWidth = activeEl.offsetWidth;
      const containerWidth = container.offsetWidth;
      const containerScroll = container.scrollLeft;

      if (elOffset < containerScroll || elOffset + elWidth > containerScroll + containerWidth) {
        container.scrollTo({
          left: elOffset - containerWidth / 2 + elWidth / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [activeStageIdx]);

  return (
    <section id="pipeline-visualization" className="relative py-24 lg:py-32 overflow-hidden bg-secondary/15">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute bottom-0 right-1/4 w-[50rem] h-[25rem] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Centerpiece Engine"
            title={
              <>
                Sovereign Processing <span className="gradient-text">Pipeline</span>
              </>
            }
            subtitle="Follow the step-by-step lifecycle of institutional data as it streams through security, extraction, validation, privacy sanitization, and packaging layers."
          />
        </Reveal>

        {/* Centerpiece Container */}
        <div className="mt-16 relative">
          {/* Legend/Info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 px-2">
            <span>Scroll horizontally to explore stages</span>
            <span className="flex items-center gap-1 text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Pipeline Active & Audited
            </span>
          </div>

          {/* Horizontal Pipeline Track */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-0 overflow-x-auto pb-8 pt-4 px-4 mask-fade-edges scrollbar-thin select-none"
            style={{ scrollbarWidth: 'thin' }}
          >
            {pipelineStages.map((stage, idx) => {
              const isActive = activeStageIdx === idx;
              const isPast = idx < activeStageIdx;

              return (
                <div key={stage.id} className="flex items-center shrink-0">
                  {/* Pipeline Node */}
                  <div
                    id={`pipeline-node-${idx}`}
                    onClick={() => setActiveStageIdx(idx)}
                    onMouseEnter={() => setActiveStageIdx(idx)}
                    className="cursor-pointer"
                  >
                    <motion.div
                      className={`relative flex flex-col items-center justify-center w-28 h-28 rounded-2xl border transition-all duration-300 ${
                        isActive
                          ? 'bg-[#0b1329] border-primary shadow-glow text-primary'
                          : isPast
                          ? 'border-primary/40 bg-secondary/20 text-primary/80'
                          : 'border-border/60 bg-card/40 text-muted-foreground'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <div className="text-[10px] font-mono opacity-60">STAGE {idx + 1}</div>
                      <div className="text-xs font-semibold tracking-tight text-center px-1.5 mt-2.5 text-foreground leading-tight">
                        {stage.name}
                      </div>

                      {/* Micro latency badge */}
                      {isActive && (
                        <div className="absolute -bottom-2.5 bg-primary text-black font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-glow">
                          {stage.processingTime}
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Flow Connection Link */}
                  {idx < pipelineStages.length - 1 && (
                    <div className="relative w-16 h-8 flex items-center justify-center">
                      <div className="absolute h-[1.5px] w-full bg-border/50" />
                      
                      {/* Flowing particle animation */}
                      {!reduce && (
                        <motion.div
                          className="absolute h-1.5 w-1.5 rounded-full bg-gradient-brand shadow-glow"
                          initial={{ left: '0%' }}
                          animate={{ left: '100%' }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: idx * 0.15,
                            ease: 'linear',
                          }}
                        />
                      )}
                      
                      {/* Arrow marker */}
                      <ArrowRight className="absolute right-0 h-3.5 w-3.5 text-border/60" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Stage Monitor Panel */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <GlassCard className="border-primary/30 p-6 md:p-8 bg-[#0b1329]/80 shadow-glow relative">
                {/* Accent glow line at top */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-brand" />

                <div className="grid gap-6 md:grid-cols-12 items-start">
                  <div className="md:col-span-5 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-1 rounded bg-primary/10 text-primary font-bold border border-primary/20">
                        STAGE {activeStageIdx + 1} OF 13
                      </span>
                      <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                        <Zap className="h-3 w-3 text-accent" />
                        Latency: {activeStage.processingTime}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight text-foreground mt-1">
                      {activeStage.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {activeStage.purpose}
                    </p>
                  </div>

                  <div className="md:col-span-7 grid gap-4 sm:grid-cols-2 bg-secondary/20 p-5 rounded-xl border border-border/60">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground flex items-center gap-1.5">
                        <Cpu className="h-3.5 w-3.5 text-primary" />
                        Active Technology
                      </span>
                      <span className="text-sm text-foreground font-semibold font-mono">
                        {activeStage.technology}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5 text-primary" />
                        Pipeline Boundary
                      </span>
                      <span className="text-sm text-foreground font-semibold">
                        Sovereign Encrypted Cloud
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 border-t border-border/40 pt-3 mt-1 sm:col-span-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground">
                        Payload Input
                      </span>
                      <code className="text-xs text-emerald-400 font-mono mt-1 bg-black/40 p-2 rounded border border-border/30 overflow-x-auto whitespace-nowrap">
                        {activeStage.input}
                      </code>
                    </div>

                    <div className="flex flex-col gap-1 border-t border-border/40 pt-3 mt-1 sm:col-span-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground">
                        Payload Output
                      </span>
                      <code className="text-xs text-sky-400 font-mono mt-1 bg-black/40 p-2 rounded border border-border/30 overflow-x-auto whitespace-nowrap">
                        {activeStage.output}
                      </code>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
