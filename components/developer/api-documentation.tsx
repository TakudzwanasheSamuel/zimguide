'use client';

import { docCategories } from '@/lib/developer-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { BookOpen, KeyRound, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export function APIDocumentation() {
  return (
    <section id="api-documentation" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <BookOpen className="h-4.5 w-4.5 text-primary" />
          API Integration Documentation
        </h3>
        <p className="text-xs text-muted-foreground">
          Detailed standards mapping integration rules, query boundaries, formatting payloads, and response codes.
        </p>
      </div>

      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5" stagger={0.03}>
        {docCategories.map((doc) => (
          <StaggerItem key={doc.name}>
            <GlassCard className="group h-full p-5 flex flex-col justify-between hover:border-primary/45 hover:shadow-glow cursor-pointer">
              <div>
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-border/60">
                  <KeyRound className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {doc.name}
                  </h4>
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                  {doc.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-border/40 flex items-center justify-between text-[10px] text-primary font-semibold">
                <span>Read Reference</span>
                <ArrowRight className="h-3 w-3 text-primary transition-transform group-hover:translate-x-1" />
              </div>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
