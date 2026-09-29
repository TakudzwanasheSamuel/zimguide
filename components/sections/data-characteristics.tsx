'use client';

import {
  Braces,
  FileCode,
  FileText,
  ShieldCheck,
  BadgeCheck,
  Cpu,
  Tags,
  GitBranch,
  Webhook,
  Lock,
  type LucideIcon,
} from 'lucide-react';
import { dataCharacteristics } from '@/lib/mock-data';
import { SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';

const iconMap: Record<string, LucideIcon> = {
  Braces,
  FileCode,
  FileText,
  ShieldCheck,
  BadgeCheck,
  Cpu,
  Tags,
  GitBranch,
  Webhook,
  Lock,
};

export function DataCharacteristics() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Data Characteristics"
            title={
              <>
                AI-Ready <span className="gradient-text">by Design</span>
              </>
            }
            subtitle="Every dataset that leaves the platform carries these guarantees — engineered for models, auditable for institutions."
          />
        </Reveal>

        <StaggerGroup
          className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5"
          stagger={0.05}
        >
          {dataCharacteristics.map((c) => {
            const Icon = iconMap[c.icon] ?? BadgeCheck;
            return (
              <StaggerItem key={c.label}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-xl transition-all hover:border-primary/30 hover:bg-card/60">
                  {/* animated gradient border on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                  </div>
                  <div className="relative">
                    <div className="grid h-10 w-10 place-items-center rounded-lg border border-border/60 bg-secondary/60 text-primary transition-all group-hover:scale-110 group-hover:border-primary/40">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold tracking-tight">
                      {c.label}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {c.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
