'use client';

import { motion } from 'framer-motion';
import {
  Database, BadgeCheck, Star, Download, Heart, Star as StarIcon,
  ArrowUpRight, Eye, Zap, TrendingUp, Sparkles, type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { MarketplaceDataset } from '@/lib/marketplace-data';

const pricingStyle: Record<string, string> = {
  Free: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
  Premium: 'text-sky-300 border-sky-500/30 bg-sky-500/10',
  Enterprise: 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10',
  Subscription: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
  'Pay Per Download': 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
};

const classStyle: Record<string, string> = {
  Public: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
  Restricted: 'text-sky-300 border-sky-500/30 bg-sky-500/10',
  Internal: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
  Sensitive: 'text-rose-300 border-rose-500/30 bg-rose-500/10',
};

function QualityBadge({ score }: { score: number }) {
  const color = score >= 95 ? 'text-emerald-400' : score >= 90 ? 'text-sky-400' : 'text-amber-400';
  return (
    <div className="flex items-center gap-1.5">
      <div className="relative h-1.5 w-14 overflow-hidden rounded-full bg-secondary">
        <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-brand" style={{ width: `${score}%` }} />
      </div>
      <span className={cn('text-xs font-medium tabular-nums', color)}>{score}</span>
    </div>
  );
}

export function DatasetCard({
  dataset,
  onPreview,
  index = 0,
}: {
  dataset: MarketplaceDataset;
  onPreview: (d: MarketplaceDataset) => void;
  index?: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl transition-all hover:border-primary/30 hover:shadow-soft-lg"
    >
      {/* Thumbnail / Cover */}
      <div className={cn('relative h-28 overflow-hidden bg-gradient-to-br', dataset.coverGradient)}>
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {dataset.isNew && (
            <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary backdrop-blur">
              New
            </span>
          )}
          {dataset.trending && (
            <span className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-300 backdrop-blur">
              <TrendingUp className="h-2.5 w-2.5" /> Trending
            </span>
          )}
        </div>
        <div className="absolute right-3 top-3">
          <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-medium backdrop-blur', pricingStyle[dataset.pricing])}>
            {dataset.pricing}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg border border-border/60 bg-card/80 backdrop-blur">
            <Database className="h-4 w-4 text-primary" />
          </div>
          <div className="text-xs">
            <div className="flex items-center gap-1 font-medium text-foreground">
              {dataset.institution}
              <BadgeCheck className="h-3 w-3 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold leading-snug tracking-tight">
          {dataset.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {dataset.description}
        </p>

        {/* Formats */}
        <div className="mt-3 flex flex-wrap gap-1">
          {dataset.formats.slice(0, 4).map((f) => (
            <span key={f} className="rounded-md border border-border/60 bg-secondary/40 px-1.5 py-0.5 text-[10px] text-muted-foreground">
              {f}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            {dataset.downloads.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-3 w-3" />
            {dataset.favorites.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <StarIcon className="h-3 w-3 text-amber-400" />
            {dataset.rating}
          </span>
          <span className="ml-auto">{dataset.updated}</span>
        </div>

        {/* Quality + classification */}
        <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-3">
          <QualityBadge score={dataset.quality} />
          <span className={cn('rounded-full border px-1.5 py-0.5 text-[10px] font-medium', classStyle[dataset.classification])}>
            {dataset.classification}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 gap-1.5 bg-secondary/30 text-xs" asChild>
            <a href="#datasets">View Details<ArrowUpRight className="h-3 w-3" /></a>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="gap-1.5 text-xs text-primary"
            onClick={() => onPreview(dataset)}
          >
            <Eye className="h-3 w-3" />Preview
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
