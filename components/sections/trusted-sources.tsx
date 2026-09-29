'use client';

import {
  Archive,
  GraduationCap,
  BarChart3,
  Landmark,
  Building2,
  Users,
  Radio,
  FlaskConical,
  type LucideIcon,
} from 'lucide-react';
import { dataPartners } from '@/lib/mock-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Archive,
  GraduationCap,
  BarChart3,
  Landmark,
  Building2,
  Users,
  Radio,
  FlaskConical,
};

const statusStyle: Record<string, string> = {
  Active: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
  Verified: 'text-sky-300 border-sky-500/30 bg-sky-500/10',
  Onboarding: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
};

export function TrustedSources() {
  return (
    <section id="trusted-sources" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Trusted Data Sources"
            title={
              <>
                Trusted Institutional{' '}
                <span className="gradient-text">Data Partners</span>
              </>
            }
            subtitle="Building Zimbabwe&apos;s AI ecosystem through secure partnerships."
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {dataPartners.map((p) => {
            const Icon = iconMap[p.icon] ?? Building2;
            return (
              <StaggerItem key={p.name}>
                <GlassCard className="h-full p-5">
                  <div className="flex items-start justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-xl border border-border/60 bg-secondary/60 text-primary transition-all group-hover:scale-110 group-hover:border-primary/40">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={cn(
                        'rounded-full border px-2 py-0.5 text-[11px] font-medium',
                        statusStyle[p.status],
                      )}
                    >
                      {p.status}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold tracking-tight">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
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
