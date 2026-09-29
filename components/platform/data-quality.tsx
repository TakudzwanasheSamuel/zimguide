'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { ShieldCheck, BarChart4, ClipboardCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface QualityMetric {
  name: string;
  score: number;
  description: string;
  color: string;
  weight: string;
}

const qualityMetrics: QualityMetric[] = [
  {
    name: 'Schema Validation',
    score: 100.0,
    description: 'Enforces strict columns, typings, nullability constraints, and format keys.',
    color: '#00C6A7', // primary
    weight: 'Critical',
  },
  {
    name: 'Completeness',
    score: 99.4,
    description: 'Ensures no missing attributes or empty nodes in necessary fields.',
    color: '#0EA5E9', // accent / sky
    weight: 'High',
  },
  {
    name: 'Consistency',
    score: 98.7,
    description: 'Validates records matching logical rules, formats, and relational values across sets.',
    color: '#2563EB', // blue
    weight: 'High',
  },
  {
    name: 'Metadata Coverage',
    score: 97.5,
    description: 'Evaluates the depth and presence of tags, locations, temporal dates, and sources.',
    color: '#10B981', // emerald
    weight: 'Medium',
  },
  {
    name: 'Accuracy',
    score: 96.8,
    description: 'Cross-checks geographic names and records against verified reference registers.',
    color: '#6366F1', // indigo
    weight: 'High',
  },
  {
    name: 'Bias Detection',
    score: 99.2,
    description: 'Checks demographic balances to ensure zero skewing or under-represented categories.',
    color: '#14B8A6', // teal
    weight: 'Medium',
  },
];

function CircularProgress({
  percentage,
  size = 120,
  strokeWidth = 10,
  color = '#00C6A7',
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  const reduce = useReducedMotion();

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="hsl(var(--border) / 0.8)"
          strokeWidth={strokeWidth}
        />
        {/* Active progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          whileInView={reduce ? { strokeDashoffset: offset } : { strokeDashoffset: [circumference, offset] }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-xl font-bold tracking-tight font-mono">{percentage}%</span>
      </div>
    </div>
  );
}

export function DataQualityEngine() {
  const [selectedMetric, setSelectedMetric] = useState<number>(0);
  const activeMetric = qualityMetrics[selectedMetric];

  return (
    <section id="data-quality-engine" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Data Quality Engine"
            title={
              <>
                Cryptographically Guarded <span className="gradient-text">Data Integrity</span>
              </>
            }
            subtitle="Every dataset processed undergoes rigorous schema checking, completeness verification, bias monitoring, and format testing to ensure model readiness."
          />
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Circular Gauges Grid */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground px-2 flex items-center gap-2">
              <BarChart4 className="h-4.5 w-4.5 text-primary" />
              Active Quality Dimension Monitors
            </h3>

            <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
              {qualityMetrics.map((m, idx) => {
                const isSelected = selectedMetric === idx;
                return (
                  <StaggerItem key={m.name}>
                    <GlassCard
                      hover={false}
                      className={`cursor-pointer group relative p-5 flex flex-col items-center justify-center border-border/80 transition-all duration-300 ${
                        isSelected ? 'border-primary/50 bg-[#0b1329] shadow-glow' : 'hover:border-primary/30'
                      }`}
                    >
                      <div
                        onClick={() => setSelectedMetric(idx)}
                        onMouseEnter={() => setSelectedMetric(idx)}
                        className="flex flex-col items-center text-center gap-4 w-full"
                      >
                        <CircularProgress percentage={m.score} size={90} strokeWidth={8} color={m.color} />
                        <div>
                          <h4 className="text-xs font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                            {m.name}
                          </h4>
                          <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mt-1 block">
                            Weight: {m.weight}
                          </span>
                        </div>
                      </div>
                    </GlassCard>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>

          {/* Details Dashboard Card */}
          <div className="lg:col-span-5">
            <GlassCard className="h-full border-primary/20 bg-[#0b1329]/50 p-6 md:p-8 flex flex-col justify-between relative shadow-glow">
              {/* Accent top border */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-brand" />

              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-primary" />
                    <span className="text-xs font-semibold font-mono uppercase tracking-wider text-muted-foreground">
                      Dimension Details
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 rounded">
                    Score: {activeMetric.score}%
                  </span>
                </div>

                <div className="mt-2">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {activeMetric.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {activeMetric.description}
                  </p>
                </div>

                <div className="mt-4 space-y-3.5 bg-secondary/30 p-4 rounded-xl border border-border/60 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Validation Standard</span>
                    <span className="font-mono text-foreground font-semibold">ZimGuide Standard v2</span>
                  </div>
                  <div className="flex justify-between border-t border-border/40 pt-3">
                    <span className="text-muted-foreground">Verification Node</span>
                    <span className="font-mono text-foreground font-semibold">DuckDB Core Validator 4</span>
                  </div>
                  <div className="flex justify-between border-t border-border/40 pt-3">
                    <span className="text-muted-foreground">Auto-Heal Status</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Active (Auto-Format)
                    </span>
                  </div>
                </div>
              </div>

              {/* Aggregated Score Panel */}
              <div className="mt-8 border-t border-border/60 pt-6">
                <div className="flex items-center gap-4 bg-gradient-brand/5 border border-primary/20 rounded-xl p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="h-5 w-5 shadow-glow" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground">
                      Composite Dataset Quality Score
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      99.82% <span className="text-xs text-emerald-400 font-semibold">Grade A (Model Ready)</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
