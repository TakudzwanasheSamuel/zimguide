'use client';

import { visionKeyAchievements } from '@/lib/command-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem, Reveal } from '@/components/motion/reveal';
import { Shield, Sparkles, Server, Landmark, Layers, HelpCircle } from 'lucide-react';

const iconMap: Record<string, any> = {
  'Knowledge Preserved': Shield,
  'AI Ecosystem Enabled': Sparkles,
  'Digital Economy Supported': Server,
  'Research Accelerated': Landmark,
  'National Innovation Strengthened': Layers,
};

export function VisionSection() {
  return (
    <section id="vision-section" className="py-12 border-t border-border/60 mt-12 bg-secondary/15 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <GlassCard className="p-8 md:p-12 border-primary/20 bg-[#0b1329]/60 shadow-glow relative overflow-hidden" hover={false}>
          
          {/* Glowing aura */}
          <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between relative z-10">
            <div className="max-w-xl text-left">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                National Vision
              </span>
              <h3 className="text-xl font-bold tracking-tight text-foreground mt-2 md:text-2xl lg:text-3xl">
                Building Zimbabwe&apos;s Sovereign AI Future
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                ZimGuide Data Core aggregates historical records, clinical templates, and agricultural registries into verified training sets.
              </p>
            </div>
          </div>

          {/* Key Achievements Grid */}
          <div className="mt-10 pt-8 border-t border-border/50">
            <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.04}>
              {visionKeyAchievements.map((ach) => {
                const Icon = iconMap[ach.label] || HelpCircle;

                return (
                  <StaggerItem key={ach.label}>
                    <div className="flex items-start gap-3 text-left">
                      <div className="grid h-8 w-8 place-items-center rounded-lg border border-primary/20 bg-primary/5 text-primary shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground">
                          {ach.label}
                        </h4>
                        <p className="text-[10px] leading-relaxed text-muted-foreground mt-1">
                          {ach.desc}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>

        </GlassCard>
      </div>
    </section>
  );
}
