'use client';

import {
  Filter,
  ShieldCheck,
  Lock,
  Network,
  Search,
  GitBranch,
  type LucideIcon,
} from 'lucide-react';
import { platformFeatures } from '@/lib/mock-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';

const iconMap: Record<string, LucideIcon> = {
  Filter,
  ShieldCheck,
  Lock,
  Network,
  Search,
  GitBranch,
};

export function Platform() {
  return (
    <section id="platform" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="The Platform"
            title={
              <>
                One infrastructure for the entire{' '}
                <span className="gradient-text">data lifecycle</span>
              </>
            }
            subtitle="From raw institutional records to AI-ready, API-consumable datasets — every stage is governed, auditable, and sovereign by default."
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {platformFeatures.map((f) => {
            const Icon = iconMap[f.icon] ?? Filter;
            return (
              <StaggerItem key={f.title}>
                <GlassCard className="h-full p-6">
                  <div className="relative">
                    <div className="grid h-11 w-11 place-items-center rounded-xl border border-border/60 bg-secondary/60 text-primary transition-colors group-hover:border-primary/40">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">
                      {f.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {f.description}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {f.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <span className="h-1 w-1 rounded-full bg-gradient-brand" />
                          {p}
                        </li>
                      ))}
                    </ul>
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
