'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Sparkles, RefreshCw, Lightbulb, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AIInsights() {
  const [loading, setLoading] = useState(false);

  const insights = [
    { title: 'Agricultural datasets demand surge', desc: 'Queries referencing crop yields and AGRITEX telemetry increased by 34% this month.' },
    { title: 'Linguistic request weights', desc: 'Shona language audio corpus files remain the single most requested training source.' },
    { title: 'Provincial onboarding gaps', desc: 'Three provinces (Matabeleland North, Mat South, Mash Central) require additional university connectivity.' },
    { title: 'Seasonal tourism queries', desc: 'Museum APIs show a 2.5x traffic surge during regional travel holidays.' },
    { title: 'Preservation prioritization', desc: 'We recommend immediate digitization of the National Gallery archives.' },
  ];

  const handleRegenerate = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <section id="ai-insights" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Sparkles className="h-4.5 w-4.5 text-primary" />
          AI-Generated Sovereignty Recommendations
        </h3>
        <p className="text-xs text-muted-foreground">
          Insight engines scanning ingestion telemetry to suggest strategic partnerships and preservation targets.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        
        {/* Left Column: List of Insights */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.04}>
            {insights.map((ins) => (
              <StaggerItem key={ins.title}>
                <GlassCard className="p-4.5 flex flex-col justify-between hover:border-primary/40 h-full relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/5 blur-xl pointer-events-none" />
                  
                  <div>
                    <div className="grid h-7 w-7 place-items-center rounded-lg border border-primary/20 bg-primary/5 text-primary shrink-0 mb-3">
                      <Lightbulb className="h-4 w-4" />
                    </div>

                    <h4 className="text-xs font-bold leading-tight text-foreground">
                      {ins.title}
                    </h4>
                    <p className="text-[11px] leading-relaxed text-muted-foreground mt-2">
                      {ins.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/40 text-[9px] font-mono text-slate-400">
                    Confidence: 97.4%
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* Right Column: Console trigger */}
        <div className="lg:col-span-4 flex flex-col">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-primary/20 bg-[#0b1329]/50 shadow-glow" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3">
                Telemetry Analytics Engine
              </h4>
              <p className="text-xs leading-relaxed text-muted-foreground mt-4">
                Our intelligence algorithms process query logs, indexing rates, and replication latency continuously to compile strategic reports.
              </p>
            </div>

            {/* Run Button */}
            <div className="mt-8 pt-4 border-t border-border/50">
              <Button
                onClick={handleRegenerate}
                disabled={loading}
                className="w-full h-10 text-xs font-semibold gap-2 shadow-glow hover:shadow-primary/30"
              >
                <RefreshCw className={`h-4 w-4 ${loading && 'animate-spin'}`} />
                {loading ? 'Compiling Analytics logs...' : 'Regenerate insights'}
              </Button>
              {loading && (
                <div className="text-[9px] font-mono text-slate-400 text-center mt-2">
                  Scanning 1,284 datasets...
                </div>
              )}
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
