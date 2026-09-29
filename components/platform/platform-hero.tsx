'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Network, Database, Cpu, Lock, Shield, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Aurora } from '@/components/motion/aurora';
import { GridOverlay } from '@/components/motion/aurora';
import { Reveal } from '@/components/motion/reveal';

function NetworkMesh() {
  const reduce = useReducedMotion();
  const nodes = [
    { x: 30, y: 20, size: 6, label: 'Archives', icon: Database, delay: 0 },
    { x: 70, y: 15, size: 5, label: 'University', icon: Cpu, delay: 0.4 },
    { x: 85, y: 45, size: 5.5, label: 'Government', icon: Server, delay: 0.8 },
    { x: 15, y: 55, size: 5, label: 'Museums', icon: Network, delay: 1.2 },
    { x: 40, y: 80, size: 6, label: 'Health Core', icon: Shield, delay: 1.6 },
    { x: 75, y: 75, size: 5.5, label: 'API Gateway', icon: Lock, delay: 2.0 },
    { x: 50, y: 45, size: 8, label: 'Data Core', icon: Database, delay: 0.2 },
  ];

  const connections = [
    [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6],
    [0, 1], [1, 2], [2, 5], [4, 5], [3, 4], [0, 3]
  ];

  return (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden opacity-30">
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {connections.map(([a, b], idx) => (
          <motion.line
            key={idx}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="url(#heroNetGrad)"
            strokeWidth={0.25}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={reduce ? { pathLength: 1, opacity: 0.4 } : { pathLength: 1, opacity: [0.1, 0.5, 0.1] }}
            transition={{
              duration: 4,
              delay: idx * 0.15,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
        <defs>
          <linearGradient id="heroNetGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#BC5E2B" />
            <stop offset="50%" stopColor="#D47A43" />
            <stop offset="100%" stopColor="#C1B09C" />
          </linearGradient>
        </defs>
      </svg>

      {/* Render floating nodes */}
      {nodes.map((node, idx) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={idx}
            className="absolute z-10 flex flex-col items-center gap-1.5"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              reduce
                ? { opacity: 0.7, scale: 1 }
                : {
                    opacity: [0.6, 0.9, 0.6],
                    scale: 1,
                    y: [0, -6, 0],
                  }
            }
            transition={{
              duration: 5,
              delay: node.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div
              className="grid place-items-center rounded-xl border border-border/80 bg-secondary/80 text-primary shadow-glow transition-all hover:scale-110 hover:border-primary/60"
              style={{
                width: `${node.size * 7}px`,
                height: `${node.size * 7}px`,
              }}
            >
              <Icon style={{ width: `${node.size * 3}px`, height: `${node.size * 3}px` }} />
            </div>
            <span className="hidden text-[10px] font-semibold uppercase tracking-widest text-muted-foreground md:inline-block">
              {node.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

function HeroParticles() {
  const reduce = useReducedMotion();
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.8,
    duration: Math.random() * 10 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gradient-brand opacity-0"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={reduce ? {} : { y: [0, -40, 0], opacity: [0, 0.7, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export function PlatformHero() {
  const handleScroll = () => {
    const el = document.getElementById('architecture-overview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-32 md:py-40">
      <Aurora className="opacity-35" />
      <GridOverlay className="opacity-20" />
      <NetworkMesh />
      <HeroParticles />

      {/* Radial overlay to dim the network mesh at edges */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
        <Reveal direction="up" duration={0.8}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Sovereign Technology Core
          </span>
        </Reveal>

        <Reveal direction="up" delay={0.15} duration={0.8}>
          <h1 className="mt-8 text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl lg:leading-[1.05]">
            The Technology Behind Zimbabwe&apos;s{' '}
            <span className="bg-gradient-brand bg-clip-text text-transparent text-glow">
              Sovereign AI Infrastructure
            </span>
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.3} duration={0.8}>
          <p className="mx-auto mt-6 max-w-3xl text-balance text-base leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
            A secure, federated platform that enables institutions to transform fragmented information
            into AI-ready datasets while preserving ownership, privacy, and national compliance.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.45} duration={0.8}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-12 px-6 text-[15px] font-medium gap-2" onClick={handleScroll}>
              Explore Architecture
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-6 text-[15px] font-medium glass hover:bg-secondary/40" asChild>
              <a href="#pipeline-visualization">View Live Pipeline</a>
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Floating scroll down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-10 flex flex-col items-center gap-1 text-xs tracking-widest text-muted-foreground uppercase"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        onClick={handleScroll}
      >
        <span>Scroll</span>
        <ArrowDown className="h-3 w-3 text-primary" />
      </motion.div>
    </section>
  );
}
