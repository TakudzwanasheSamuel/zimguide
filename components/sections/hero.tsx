'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Database,
  Building2,
  Cable,
  Workflow,
  Store,
  Webhook,
  Sparkles,
  Check,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Aurora } from '@/components/motion/aurora';
import { GridOverlay } from '@/components/motion/aurora';
import { Reveal } from '@/components/motion/reveal';
import { heroFlow } from '@/lib/mock-data';

const trustIndicators = ['AI Ready', 'Privacy First', 'Institution Owned', 'Regulatory Compliant'];

const flowIcons: Record<string, LucideIcon> = {
  Building2,
  Cable,
  Workflow,
  Store,
  Webhook,
  Sparkles,
};

/* Network visualization — animated connecting nodes */
function NetworkViz() {
  const reduce = useReducedMotion();
  const nodes = [
    { x: 50, y: 50, r: 5, delay: 0 },
    { x: 18, y: 28, r: 3, delay: 0.3 },
    { x: 82, y: 22, r: 3, delay: 0.6 },
    { x: 14, y: 72, r: 3, delay: 0.9 },
    { x: 86, y: 76, r: 3, delay: 1.2 },
    { x: 50, y: 12, r: 2.5, delay: 0.4 },
    { x: 50, y: 88, r: 2.5, delay: 0.7 },
  ];
  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 5], [3, 6], [4, 6],
  ];

  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-40"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="url(#netGrad)"
          strokeWidth={0.2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={reduce ? {} : { pathLength: 1, opacity: [0, 0.6, 0.3] }}
          transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, repeatType: 'reverse' }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill="#00C6A7"
          initial={{ opacity: 0 }}
          animate={reduce ? { opacity: 0.6 } : { opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 3, delay: n.delay, repeat: Infinity }}
        />
      ))}
      <defs>
        <linearGradient id="netGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00C6A7" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* Floating particles */
function Particles() {
  const reduce = useReducedMotion();
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary/40"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={reduce ? {} : { y: [0, -30, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* 3D-style dashboard flow card */
function DashboardFlow() {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      {/* Glow behind card */}
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-brand opacity-20 blur-3xl" />
      <motion.div
        initial={{ rotateY: 8, rotateX: 4, opacity: 0 }}
        animate={{ rotateY: 0, rotateX: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
        className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-soft-lg backdrop-blur-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            data-core / pipeline
          </span>
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            live
          </span>
        </div>

        {/* Flow steps */}
        <div className="mt-4 space-y-2">
          {heroFlow.map((step, i) => {
            const Icon = flowIcons[step.icon] ?? Database;
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                className="group relative"
              >
                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-secondary/30 px-3 py-2.5 transition-all hover:border-primary/30 hover:bg-secondary/50">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-brand/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-medium">{step.label}</div>
                    <div className="text-[11px] text-muted-foreground">{step.metric}</div>
                  </div>
                  {/* Flow indicator */}
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                    animate={reduce ? {} : { scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                  />
                </div>
                {i < heroFlow.length - 1 && (
                  <div className="ml-[1.1rem] h-2 w-px bg-gradient-to-b from-primary/40 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <Aurora />
      <GridOverlay />
      <NetworkViz />
      <Particles />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        {/* Left side */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="text-sm">🇿🇼</span>
              Zimbabwe&apos;s Sovereign AI Infrastructure
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              Building Zimbabwe&apos;s Trusted{' '}
              <span className="relative inline-block">
                <span className="gradient-text text-glow">AI Data Infrastructure</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-brand"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                  style={{ originX: 0 }}
                />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground lg:text-lg">
              ZimGuide Data Core enables trusted institutions to transform
              fragmented data into secure, AI-ready datasets through compliant
              data curation, anonymization and intelligent data engineering.
              Powering the next generation of Zimbabwean AI innovation.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="group gap-2" asChild>
                <Link href="#datasets">
                  Browse Data Assets
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-secondary/30" asChild>
                <Link href="#contact">Become a Data Partner</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
              {trustIndicators.map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  {t}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right side — 3D dashboard */}
        <div className="relative hidden lg:block">
          <Reveal direction="left" duration={0.9} delay={0.1}>
            <DashboardFlow />
          </Reveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex h-9 w-5.5 items-start justify-center rounded-full border border-border/60 p-1">
          <span className="h-1.5 w-1 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
}
