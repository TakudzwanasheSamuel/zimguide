'use client';

import { GlassCard } from '@/components/site/section';
import { Landmark, Cable, FileText, CheckCircle2, ShieldAlert, Tag, Layers, Store, Webhook, Users, Cpu, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function NationalPipeline() {
  const steps = [
    { label: 'Institution', icon: Landmark },
    { label: 'Connector', icon: Cable },
    { label: 'Extraction', icon: FileText },
    { label: 'Validation', icon: CheckCircle2 },
    { label: 'Anonymization', icon: ShieldAlert },
    { label: 'Metadata', icon: Tag },
    { label: 'Dataset Registry', icon: Layers },
    { label: 'Marketplace', icon: Store },
    { label: 'API Gateway', icon: Webhook },
    { label: 'Developers', icon: Users },
    { label: 'AI Applications', icon: Cpu },
    { label: 'Economic Impact', icon: TrendingUp },
  ];

  return (
    <section id="national-pipeline" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Layers className="h-4.5 w-4.5 text-primary" />
          National Sovereign Data Pipeline
        </h3>
        <p className="text-xs text-muted-foreground">
          Telemetry cycle routing raw files through extraction, privacy filters, registry logs, and API fine-tunings.
        </p>
      </div>

      <GlassCard className="p-6 md:p-8 border-border/80 bg-card/40 shadow-glow" hover={false}>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 relative">
          
          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div key={step.label} className="flex flex-col items-center text-center gap-3 relative">
                
                {/* Connecting particle flows */}
                {!isLast && (
                  <div className="hidden lg:block absolute top-[16px] left-[60%] right-[-40%] h-[2px] bg-secondary/80 overflow-hidden">
                    <motion.div
                      className="h-full w-2.5 bg-primary"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: idx * 0.3 }}
                    />
                  </div>
                )}

                <div className="grid h-9.5 w-9.5 place-items-center rounded-xl border border-primary/25 bg-[#0b1329]/80 text-primary z-10 shadow-glow animate-pulse">
                  <StepIcon className="h-4.5 w-4.5" />
                </div>

                <div>
                  <span className="text-[10px] font-mono font-bold text-foreground">
                    {step.label}
                  </span>
                  <span className="text-[8px] font-mono text-muted-foreground block mt-0.5 uppercase tracking-wider">
                    Step 0{idx + 1}
                  </span>
                </div>

              </div>
            );
          })}

        </div>
      </GlassCard>
    </section>
  );
}
