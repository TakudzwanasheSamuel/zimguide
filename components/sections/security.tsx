'use client';

import {
  Server,
  ShieldCheck,
  FileLock,
  KeyRound,
  type LucideIcon,
} from 'lucide-react';
import { securityFeatures, compliance } from '@/lib/mock-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Aurora } from '@/components/motion/aurora';

const iconMap: Record<string, LucideIcon> = {
  Server,
  ShieldCheck,
  FileLock,
  KeyRound,
};

export function Security() {
  return (
    <section id="security" className="relative overflow-hidden py-24 lg:py-32">
      <Aurora className="opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Security & Sovereignty"
            title={
              <>
                Sovereign by design,{' '}
                <span className="gradient-text">compliant by default</span>
              </>
            }
            subtitle="Confidential computing, immutable lineage, and per-key governance — engineered so institutions retain control of their data at every stage."
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-5 md:grid-cols-2" stagger={0.08}>
          {securityFeatures.map((f) => {
            const Icon = iconMap[f.icon] ?? ShieldCheck;
            return (
              <StaggerItem key={f.title}>
                <GlassCard className="flex h-full gap-4 p-6">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border/60 bg-secondary/60 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {f.description}
                    </p>
                  </div>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-muted-foreground">Compliance frameworks:</span>
            {compliance.map((c) => (
              <span
                key={c}
                className="rounded-lg border border-border/60 bg-secondary/40 px-3 py-1.5 text-sm font-medium text-foreground/80 backdrop-blur"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
