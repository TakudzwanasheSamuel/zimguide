'use client';

import { Network, ShieldCheck, Cpu, Server, type LucideIcon } from 'lucide-react';
import { techHighlights } from '@/lib/mock-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Aurora } from '@/components/motion/aurora';

const iconMap: Record<string, LucideIcon> = {
  Network,
  ShieldCheck,
  Cpu,
  Server,
};

export function TechHighlights() {
  return (
    <section id="technology" className="relative overflow-hidden py-24 lg:py-32">
      <Aurora className="opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Technology Highlights"
            title={
              <>
                Infrastructure engineered for{' '}
                <span className="gradient-text">sovereign AI</span>
              </>
            }
            subtitle="Four architectural principles that make ZimGuide Data Core the trusted foundation for Zimbabwe&apos;s data ecosystem."
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-5 md:grid-cols-2" stagger={0.1}>
          {techHighlights.map((t) => {
            const Icon = iconMap[t.icon] ?? Network;
            return (
              <StaggerItem key={t.title}>
                <GlassCard className="group relative h-full overflow-hidden p-7">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
                  <div className="relative flex items-start gap-5">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-border/60 bg-secondary/60 text-primary transition-all group-hover:scale-110 group-hover:border-primary/40 group-hover:shadow-glow">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{t.title}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                        {t.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
