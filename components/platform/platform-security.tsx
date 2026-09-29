'use client';

import { securityControls } from '@/lib/platform-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Shield, Key, Eye, Lock, FileLock, Users, Cpu, Activity } from 'lucide-react';

const iconMap = [
  Shield,
  Users,
  Eye,
  FileLock,
  Lock,
  Key,
  Cpu,
  Activity,
];

export function PlatformSecurity() {
  return (
    <section id="platform-security" className="relative py-24 lg:py-32 overflow-hidden bg-secondary/5">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Security & Compliance"
            title={
              <>
                Military-Grade <span className="gradient-text">Enterprise Security</span>
              </>
            }
            subtitle="Zimbabwe's sovereign data core operates under a strict Zero Trust model, protecting every transition, state log, and external query session."
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {securityControls.map((control, idx) => {
            const Icon = iconMap[idx % iconMap.length];

            return (
              <StaggerItem key={control.title}>
                <GlassCard className="group h-full p-6 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-glow">
                  <div>
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-border/80 bg-secondary/50 text-muted-foreground group-hover:text-primary transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="mt-5 text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {control.title}
                    </h4>
                    <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                      {control.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground pt-4 border-t border-border/40">
                    <span>Active Control</span>
                    <span className="text-emerald-400 font-bold">ENFORCED</span>
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
