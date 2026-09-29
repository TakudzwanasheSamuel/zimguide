'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpRight, TrendingUp, Download, Database } from 'lucide-react';
import { datasets, type Dataset } from '@/lib/mock-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const categories = ['All', 'Cultural', 'Government', 'Research', 'Linguistic', 'Geospatial', 'Health'] as const;

const categoryColor: Record<Dataset['category'], string> = {
  Cultural: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
  Government: 'text-sky-300 border-sky-500/30 bg-sky-500/10',
  Research: 'text-blue-300 border-blue-500/30 bg-blue-500/10',
  Linguistic: 'text-teal-300 border-teal-500/30 bg-teal-500/10',
  Geospatial: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
  Health: 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10',
};

export function Datasets() {
  const [active, setActive] = useState<(typeof categories)[number]>('All');
  const filtered = active === 'All' ? datasets : datasets.filter((d) => d.category === active);

  return (
    <section id="datasets" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Data Catalog"
            title={
              <>
                Discover sovereign,{' '}
                <span className="gradient-text">AI-ready datasets</span>
              </>
            }
            subtitle="Browse the curated catalog. Every dataset is versioned, compliance-tagged, and consumable via API or signed download."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-sm transition-all',
                  active === c
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((d) => (
              <motion.div
                key={d.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassCard className="flex h-full flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-lg border border-border/60 bg-secondary/60 text-primary">
                        <Database className="h-4.5 w-4.5" />
                      </div>
                      <span
                        className={cn(
                          'rounded-full border px-2 py-0.5 text-[11px] font-medium',
                          categoryColor[d.category],
                        )}
                      >
                        {d.category}
                      </span>
                    </div>
                    {d.trending && (
                      <Badge variant="outline" className="gap-1 border-primary/30 text-primary">
                        <TrendingUp className="h-3 w-3" />
                        Trending
                      </Badge>
                    )}
                  </div>

                  <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight">
                    {d.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{d.provider}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {d.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {d.format.map((f) => (
                      <span
                        key={f}
                        className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Database className="h-3 w-3" />
                      {d.records}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {d.subscribers} subs
                    </span>
                    <span className="ml-auto">{d.updated}</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
                    <span className="text-xs text-muted-foreground">{d.license}</span>
                    <Button variant="ghost" size="sm" className="gap-1 px-2 text-primary">
                      Explore
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <Button variant="outline" className="gap-2 bg-secondary/30" asChild>
              <a href="#datasets">
                <Search className="h-4 w-4" />
                Browse full catalog
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
