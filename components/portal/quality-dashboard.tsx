'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { qualityIndicators, qualityTrendData } from '@/lib/portal-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Award, CheckCircle2, TrendingUp, BarChart3 } from 'lucide-react';

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.75rem',
  fontSize: '0.8rem',
  color: 'hsl(var(--foreground))',
};

function CircleProgressMini({
  name,
  score,
  color,
}: {
  name: string;
  score: number;
  color: string;
}) {
  const size = 64;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  const reduce = useReducedMotion();

  return (
    <div className="flex items-center gap-3 bg-secondary/20 p-3.5 rounded-xl border border-border/50">
      <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="transparent" stroke="hsl(var(--border) / 0.8)" strokeWidth={strokeWidth} />
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
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>
        <span className="absolute text-xs font-bold font-mono">{score}%</span>
      </div>
      <div>
        <h5 className="text-xs font-bold text-foreground leading-tight">{name}</h5>
        <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mt-1 block">Active Telemetry</span>
      </div>
    </div>
  );
}

export function QualityDashboard() {
  return (
    <section id="quality-dashboard" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Award className="h-4.5 w-4.5 text-primary" />
          Data Quality Analytics Dashboard
        </h3>
        <p className="text-xs text-muted-foreground">
          Detailed metrics showing validation indices and composite accuracy levels across published sets.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        
        {/* Indicators Column */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground px-2 flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            Core Ingestion Quality Indicators
          </h4>
          <StaggerGroup className="grid gap-4 sm:grid-cols-2" stagger={0.04}>
            {qualityIndicators.map((ind) => (
              <StaggerItem key={ind.name}>
                <CircleProgressMini name={ind.name} score={ind.score} color={ind.color} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* Quality Trend Chart Column */}
        <div className="lg:col-span-5 flex flex-col">
          <GlassCard className="h-full p-6 border-border/80 bg-card/40 flex flex-col justify-between shadow-glow">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 border-b border-border/50 pb-3">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                Sovereign Quality Score Trend
              </h4>
              <p className="text-xs text-muted-foreground mt-2">
                Plotting average composite score improvements after metadata auto-tagging upgrades.
              </p>
            </div>

            <div className="h-[12rem] mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={qualityTrendData} margin={{ left: -22, right: 8, top: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="qualityGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00C6A7" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#00C6A7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                  <YAxis domain={[90, 100]} stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="score" stroke="#00C6A7" strokeWidth={2} fill="url(#qualityGrad)" name="Quality Score" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
