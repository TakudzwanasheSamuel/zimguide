'use client';

import { useState } from 'react';
import { strategicRoadmapPhases } from '@/lib/command-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem, Reveal } from '@/components/motion/reveal';
import { Milestone, CheckCircle2, Timer, HelpCircle, ArrowRight } from 'lucide-react';

export function StrategicRoadmap() {
  const [activePhase, setActivePhase] = useState(strategicRoadmapPhases[1]); // Default to Phase 2 (In Progress)

  const roadmapDetails: Record<string, string> = {
    'Phase 1': 'Connectivity secured across major state universities (UZ, MSU, NUST) providing local storage replication and catalog nodes.',
    'Phase 2': 'Ingesting and cleaning public administrative logs, data protection compliance matrices, and demographic records.',
    'Phase 3': 'Physical digitizations of historical books, gallery arts, and ancient scrolls using diacritic-correct OCR networks.',
    'Phase 4': 'Generating anonymized synthetic cohorts to support medical research while complying with HIPAA/POPIA protocols.',
    'Phase 5': 'Replicating ZimGuide Data Core architectures to SADC regional partner networks (Zambia, Mozambique, Botswana).',
  };

  return (
    <section id="strategic-roadmap" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Milestone className="h-4.5 w-4.5 text-primary" />
          Sovereign Strategic Roadmap
        </h3>
        <p className="text-xs text-muted-foreground">
          Interactive development milestone roadmap tracking ingestion phases and regional expansion plans.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        
        {/* Roadmap milestones row */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-border/80 bg-card/40 shadow-glow" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3">
                Milestone Phases
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-6">
              {strategicRoadmapPhases.map((phaseItem) => {
                const isActive = activePhase.phase === phaseItem.phase;
                const isCompleted = phaseItem.status === 'Completed';
                const isInProgress = phaseItem.status === 'In Progress';
                
                let statusColor = 'text-slate-400 bg-secondary/30 border-border/80';
                if (isCompleted) statusColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
                if (isInProgress) statusColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';

                return (
                  <div
                    key={phaseItem.phase}
                    onClick={() => setActivePhase(phaseItem)}
                    className={`cursor-pointer border p-3.5 rounded-xl transition-all ${
                      isActive ? 'border-primary bg-primary/5 shadow-glow' : 'border-border/60 bg-card/35 hover:border-primary/40'
                    }`}
                  >
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block">
                      {phaseItem.phase}
                    </span>
                    <h5 className="text-[11px] font-bold text-foreground mt-1.5 leading-snug truncate">
                      {phaseItem.title}
                    </h5>

                    <span className={`inline-flex items-center gap-1 text-[8px] font-mono font-semibold uppercase mt-3 px-1.5 py-0.5 rounded border ${statusColor}`}>
                      {phaseItem.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Milestone Detail Inspector */}
        <div className="lg:col-span-4 flex flex-col">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-primary/20 bg-[#0b1329]/50 shadow-glow" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3 flex items-center gap-1.5">
                <Milestone className="h-3.5 w-3.5 text-primary" />
                Phase Details
              </h4>

              <div className="mt-6">
                <span className="text-[9px] font-mono font-bold text-primary uppercase block">
                  Active Inspection: {activePhase.phase}
                </span>
                <h4 className="text-sm font-bold text-foreground mt-1.5">
                  {activePhase.title}
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground mt-3">
                  {roadmapDetails[activePhase.phase]}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border/50 text-[10px] font-mono text-muted-foreground flex items-center justify-between">
              <span>Status: {activePhase.status}</span>
              <span>Est: {activePhase.date}</span>
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
