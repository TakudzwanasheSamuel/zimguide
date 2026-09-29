'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { readinessIndexRadar } from '@/lib/command-data';
import { GlassCard } from '@/components/site/section';
import { ShieldCheck, Award, Timer, Activity } from 'lucide-react';

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.75rem',
  fontSize: '0.8rem',
  color: 'hsl(var(--foreground))',
};

export function ReadinessIndex() {
  return (
    <section id="readiness-index" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Award className="h-4.5 w-4.5 text-primary" />
          National AI Readiness Radar
        </h3>
        <p className="text-xs text-muted-foreground">
          Evaluation index assessing standard quality layers required for sovereign LLM fine-tuning deployments.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        
        {/* Radar Chart Column */}
        <div className="lg:col-span-8 flex flex-col">
          <GlassCard className="p-6 h-[22rem] md:h-full flex flex-col justify-between border-border/80 bg-card/40 shadow-glow" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3">
                Readiness Index Projections
              </h4>
            </div>

            <div className="h-[16rem] mt-6 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={readinessIndexRadar}>
                  <PolarGrid stroke="hsl(var(--border) / 0.5)" />
                  <PolarAngleAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" fontSize={9} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={8} />
                  <Radar name="Readiness Index" dataKey="A" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.35} />
                  <Tooltip contentStyle={tooltipStyle} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-4 flex flex-col">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-primary/20 bg-[#0b1329]/50 shadow-glow" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3 flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-primary" />
                Index Scoring Audit
              </h4>
              
              <div className="mt-8 flex flex-col items-center justify-center text-center">
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-primary text-3xl font-extrabold font-mono shadow-glow">
                  91%
                </div>
                <span className="text-xs text-emerald-400 font-semibold mt-4">
                  GRADE A: Production Prepared
                </span>
              </div>
            </div>

            {/* Verification message */}
            <div className="mt-8 flex items-center gap-2.5 bg-primary/5 border border-primary/25 rounded-lg p-3">
              <ShieldCheck className="h-4.5 w-4.5 text-primary shrink-0" />
              <span className="text-[10px] text-muted-foreground leading-normal">
                Radar indexes are audited on daily compiler iterations to ensure accuracy.
              </span>
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
