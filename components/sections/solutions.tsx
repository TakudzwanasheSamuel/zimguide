'use client';

import {
  GraduationCap,
  Landmark,
  FlaskConical,
  Building2,
  Factory,
  Cpu,
  type LucideIcon,
} from 'lucide-react';
import { solutions } from '@/lib/mock-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Landmark,
  FlaskConical,
  Building2,
  Factory,
  Cpu,
};

export function Solutions() {
  return (
    <section id="solutions" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Solutions"
            title={
              <>
                Built for the institutions that{' '}
                <span className="gradient-text">hold the data</span>
              </>
            }
            subtitle="From universities to government ministries, each solution preserves sovereignty, attribution, and compliance — without the integration burden."
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {solutions.map((s) => {
            const Icon = iconMap[s.icon] ?? Building2;
            return (
              <StaggerItem key={s.title}>
                <GlassCard className="group h-full p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-border/60 bg-secondary/60 text-primary transition-all group-hover:scale-110 group-hover:border-primary/40">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold tracking-tight">{s.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
