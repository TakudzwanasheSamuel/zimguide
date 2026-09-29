'use client';

import { GlassCard } from '@/components/site/section';
import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { UploadCloud, Database, RefreshCw, FolderPlus } from 'lucide-react';

export function FooterCTA() {
  return (
    <section id="portal-footer-cta" className="py-12 border-t border-border/60 mt-12 bg-secondary/15 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <GlassCard className="p-8 md:p-12 border-primary/20 bg-[#0b1329]/60 shadow-glow relative overflow-hidden" hover={false}>
          
          {/* Background aura blob */}
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between relative z-10">
            <div className="max-w-xl text-left">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                Dataset Orchestrator
              </span>
              <h3 className="text-xl font-bold tracking-tight text-foreground mt-2 md:text-2xl">
                Expand Your Institutional Collection
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Connect new database replicas, upload files directly, or configure ingestion synchronization schedules for existing repositories.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button size="lg" className="h-11 px-5 text-xs font-semibold gap-2 shadow-glow hover:shadow-primary/30">
                <UploadCloud className="h-4.5 w-4.5" />
                Upload New Dataset
              </Button>
              <Button size="lg" variant="outline" className="h-11 px-5 text-xs font-semibold gap-2 glass hover:bg-secondary/40">
                <FolderPlus className="h-4.5 w-4.5 text-primary" />
                Connect Repository
              </Button>
              <Button size="lg" variant="ghost" className="h-11 px-5 text-xs font-semibold gap-2 text-muted-foreground hover:text-foreground">
                <RefreshCw className="h-4.5 w-4.5 text-accent" />
                Schedule Ingestion
              </Button>
            </div>
          </div>

        </GlassCard>
      </div>
    </section>
  );
}
