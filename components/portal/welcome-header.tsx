'use client';

import { ShieldCheck, Calendar, RefreshCw, BadgeCheck } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';

export function WelcomeHeader() {
  return (
    <section className="relative py-6 border-b border-border/60">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Welcome Text */}
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Institution Workspace
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mt-1.5 md:text-4xl">
            Good Morning, <br className="sm:hidden" />
            <span className="gradient-text text-glow">National Archives of Zimbabwe</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Manage your data assets, monitor processing pipelines, and track royalty distributions from your institutional datasets.
          </p>
        </div>

        {/* Status Dashboard Meta */}
        <div className="grid grid-cols-2 gap-4 shrink-0 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 bg-secondary/25 border border-border/60 p-4 rounded-xl">
          
          {/* Status */}
          <div className="flex flex-col gap-1 min-w-[120px]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1">
              <BadgeCheck className="h-3 w-3 text-primary" />
              Status
            </span>
            <span className="text-xs font-bold text-primary flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Verified Partner
            </span>
          </div>

          {/* Compliance */}
          <div className="flex flex-col gap-1 min-w-[120px]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              Compliance
            </span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Compliant
            </span>
          </div>

          {/* Connected Since */}
          <div className="flex flex-col gap-1 min-w-[120px]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3 text-sky-400" />
              Connected Since
            </span>
            <span className="text-xs font-semibold text-foreground mt-0.5">
              March 12, 2025
            </span>
          </div>

          {/* Last Sync */}
          <div className="flex flex-col gap-1 min-w-[120px]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1">
              <RefreshCw className="h-3 w-3 text-amber-400" />
              Last Ingestion
            </span>
            <span className="text-xs font-semibold text-foreground mt-0.5">
              12 minutes ago
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
