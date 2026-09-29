'use client';

import { motion } from 'framer-motion';
import {
  Database, BadgeCheck, Star, Download, Zap, ArrowUpRight, Eye, TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { type MarketplaceDataset } from '@/lib/marketplace-data';
import { Reveal } from '@/components/motion/reveal';

const pricingStyle: Record<string, string> = {
  Free: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
  Premium: 'text-sky-300 border-sky-500/30 bg-sky-500/10',
  Enterprise: 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10',
};

export function FeaturedDatasets({
  datasets,
  onPreview,
  isLoading = false,
}: {
  datasets: MarketplaceDataset[];
  onPreview: (d: MarketplaceDataset) => void;
  isLoading?: boolean;
}) {
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
                Featured
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Featured Datasets
              </h2>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground" asChild>
              <a href="#datasets">View all<ArrowUpRight className="h-3.5 w-3.5" /></a>
            </Button>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {isLoading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl border border-border/40 bg-card/30" />
            ))
          ) : (
          datasets.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl transition-all hover:border-primary/30 hover:shadow-soft-lg sm:flex-row"
              >
                {/* Cover */}
                <div className={cn('relative h-32 shrink-0 overflow-hidden bg-gradient-to-br sm:h-auto sm:w-2/5', d.coverGradient)}>
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                  <div className="absolute left-3 top-3">
                    <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-medium backdrop-blur', pricingStyle[d.pricing])}>
                      {d.pricing}
                    </span>
                  </div>
                  {d.trending && (
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-300 backdrop-blur">
                      <TrendingUp className="h-2.5 w-2.5" /> Trending
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-lg border border-border/60 bg-card/80 backdrop-blur">
                      <Database className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {d.institution}
                    <BadgeCheck className="h-3 w-3 text-primary" />
                  </div>
                  <h3 className="mt-1.5 text-base font-semibold leading-snug tracking-tight">
                    {d.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {d.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {d.formats.map((f) => (
                      <span key={f} className="rounded-md border border-border/60 bg-secondary/40 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <div className="relative h-1.5 w-12 overflow-hidden rounded-full bg-secondary">
                        <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-brand" style={{ width: `${d.quality}%` }} />
                      </div>
                      <span className="font-medium text-emerald-400">{d.quality}</span>
                    </span>
                    <span className="flex items-center gap-1"><Download className="h-3 w-3" />{d.downloads.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-400" />{d.rating}</span>
                    {d.api && (
                      <span className="flex items-center gap-1 text-primary"><Zap className="h-3 w-3" />API</span>
                    )}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 gap-1.5 bg-secondary/30 text-xs" asChild>
                      <a href="#datasets">View Details<ArrowUpRight className="h-3 w-3" /></a>
                    </Button>
                    <Button size="sm" variant="ghost" className="gap-1.5 text-xs text-primary" onClick={() => onPreview(d)}>
                      <Eye className="h-3 w-3" />Preview
                    </Button>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))
          )}
        </div>
      </div>
    </section>
  );
}
