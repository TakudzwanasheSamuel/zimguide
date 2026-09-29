'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Building2,
  Cable,
  Download,
  BadgeCheck,
  ShieldCheck,
  Workflow,
  Gauge,
  Database,
  Store,
  Webhook,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { pipelineSteps } from '@/lib/mock-data';
import { SectionHeading } from '@/components/site/section';
import { Reveal } from '@/components/motion/reveal';

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Cable,
  Download,
  BadgeCheck,
  ShieldCheck,
  Workflow,
  Gauge,
  Database,
  Store,
  Webhook,
  Sparkles,
};

export function CurationPipeline() {
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Data Curation Pipeline"
            title={
              <>
                From institution to{' '}
                <span className="gradient-text">AI innovation</span>
              </>
            }
            subtitle="A governed, fully auditable path — eleven stages that transform raw institutional records into consumable, model-ready datasets."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={scrollRef}
            className="mask-fade-edges mt-16 overflow-x-auto pb-4 [scrollbar-width:thin]"
          >
            <div className="flex min-w-max items-stretch gap-0">
              {pipelineSteps.map((step, i) => {
                const Icon = iconMap[step.icon] ?? Database;
                const isLast = i === pipelineSteps.length - 1;
                return (
                  <div key={step.title} className="flex items-stretch">
                    <div className="group relative w-44 shrink-0">
                      <div className="flex h-full flex-col items-center rounded-2xl border border-border/60 bg-card/50 p-5 text-center backdrop-blur-xl transition-all hover:border-primary/40 hover:bg-card/70 hover:shadow-soft">
                        <div className="grid h-12 w-12 place-items-center rounded-xl border border-border/60 bg-secondary/60 text-primary transition-all group-hover:scale-110 group-hover:border-primary/40 group-hover:shadow-glow">
                          <Icon className="h-5.5 w-5.5" />
                        </div>
                        <h3 className="mt-4 text-sm font-semibold tracking-tight">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                        <span className="mt-3 text-[10px] font-medium text-muted-foreground/50">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Connecting line */}
                    {!isLast && (
                      <div className="relative flex w-8 items-center justify-center">
                        <div className="h-px w-full bg-border/60" />
                        <motion.div
                          className="absolute h-2 w-2 rounded-full bg-primary shadow-glow"
                          animate={reduce ? {} : { x: [-16, 16], opacity: [0, 1, 0] }}
                          transition={{
                            duration: 1.8,
                            delay: i * 0.15,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Every stage is logged, versioned, and reproducible — built for audit and peer review.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
