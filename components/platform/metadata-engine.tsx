'use client';

import { schemaFields } from '@/lib/platform-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Database, Shield, Fingerprint, Lock } from 'lucide-react';

export function MetadataEngine() {
  return (
    <section id="metadata-engine" className="relative py-24 lg:py-32 overflow-hidden bg-secondary/5">
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Metadata Engine"
            title={
              <>
                Automated Schema & <span className="gradient-text">Metadata Profiling</span>
              </>
            }
            subtitle="Our metadata scanner automatically structures incoming feeds, assigning typings, data classifications, georeferenced identifiers, and lineage tags."
          />
        </Reveal>

        <div className="mt-16 flex flex-col gap-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
            <span>Standard Ingestion Model Structure</span>
            <span className="font-mono text-primary flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5" />
              12 Schema Fields Auto-Mapped
            </span>
          </div>

          <StaggerGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" stagger={0.04}>
            {schemaFields.map((field) => {
              const isConfidential = field.classification === 'Confidential';
              const isRestricted = field.classification === 'Restricted';

              return (
                <StaggerItem key={field.name}>
                  <GlassCard className="group h-full p-5 hover:border-primary/45 hover:shadow-glow flex flex-col justify-between">
                    <div>
                      {/* Name & Type */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          {field.name}
                        </span>
                        <span className="font-mono text-[9px] font-semibold bg-secondary/80 text-muted-foreground px-2 py-0.5 rounded border border-border/80">
                          {field.type}
                        </span>
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                        {field.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs">
                      {/* Classification */}
                      <span className="flex items-center gap-1.5">
                        <Shield className={`h-3.5 w-3.5 ${
                          isConfidential ? 'text-rose-400' : isRestricted ? 'text-amber-400' : 'text-emerald-400'
                        }`} />
                        <span className={`text-[10px] font-semibold ${
                          isConfidential ? 'text-rose-400' : isRestricted ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          {field.classification}
                        </span>
                      </span>

                      {/* Sample Value */}
                      <div className="text-right overflow-hidden max-w-[120px]">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground block">
                          Sample Value
                        </span>
                        <code className="text-[10px] font-mono text-foreground font-medium truncate block">
                          {field.sampleValue}
                        </code>
                      </div>
                    </div>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
