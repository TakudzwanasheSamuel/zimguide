'use client';

import {
  FileText,
  Image,
  Map,
  Table2,
  AudioLines,
  type LucideIcon,
} from 'lucide-react';
import { dataTypes } from '@/lib/mock-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';

const iconMap: Record<string, LucideIcon> = {
  FileText,
  Image,
  Map,
  Table2,
  AudioLines,
};

export function DataTypes() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Supported Data Types"
            title={
              <>
                Multi-Modal <span className="gradient-text">AI Data Assets</span>
              </>
            }
            subtitle="One platform for every modality — from text corpora to satellite imagery, all curated into AI-ready formats."
          />
        </Reveal>

        <StaggerGroup
          className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {dataTypes.map((dt) => {
            const Icon = iconMap[dt.icon] ?? FileText;
            return (
              <StaggerItem key={dt.title}>
                <GlassCard className="group relative h-full overflow-hidden p-6">
                  {/* hover gradient border */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, ${dt.accent}22, transparent 60%)`,
                    }}
                  />
                  <div className="relative">
                    <div
                      className="grid h-12 w-12 place-items-center rounded-xl border transition-all group-hover:scale-110"
                      style={{
                        borderColor: `${dt.accent}40`,
                        backgroundColor: `${dt.accent}12`,
                        color: dt.accent,
                      }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">
                      {dt.title}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {dt.examples.map((ex) => (
                        <span
                          key={ex}
                          className="rounded-lg border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>
            );
          })}

          {/* CTA card */}
          <StaggerItem>
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/30 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Need a custom data format?
              </p>
              <p className="mt-3 text-base font-medium">
                We support additional modalities on request.
              </p>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
