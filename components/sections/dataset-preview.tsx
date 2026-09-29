'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, ArrowUpRight, Star, Lock, Globe, ShieldAlert, FileLock } from 'lucide-react';
import { datasetRows, type DatasetRow } from '@/lib/mock-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal } from '@/components/motion/reveal';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const classifications = ['All', 'Public', 'Restricted', 'Internal', 'Sensitive'] as const;

const classStyle: Record<DatasetRow['classification'], { color: string; icon: typeof Globe }> = {
  Public: { color: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10', icon: Globe },
  Restricted: { color: 'text-sky-300 border-sky-500/30 bg-sky-500/10', icon: FileLock },
  Internal: { color: 'text-amber-300 border-amber-500/30 bg-amber-500/10', icon: ShieldAlert },
  Sensitive: { color: 'text-rose-300 border-rose-500/30 bg-rose-500/10', icon: Lock },
};

function QualityBadge({ score }: { score: number }) {
  const color = score >= 95 ? 'text-emerald-400' : score >= 90 ? 'text-sky-400' : 'text-amber-400';
  return (
    <div className="flex items-center gap-1.5">
      <div className="relative h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-brand"
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={cn('text-xs font-medium tabular-nums', color)}>{score}</span>
    </div>
  );
}

export function DatasetPreview() {
  const [filter, setFilter] = useState<(typeof classifications)[number]>('All');
  const [query, setQuery] = useState('');

  const filtered = datasetRows.filter((r) => {
    const matchClass = filter === 'All' || r.classification === filter;
    const matchQuery =
      !query ||
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.institution.toLowerCase().includes(query.toLowerCase());
    return matchClass && matchQuery;
  });

  return (
    <section id="datasets" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Dataset Preview"
            title={
              <>
                Explore the <span className="gradient-text">sovereign catalog</span>
              </>
            }
            subtitle="A live view of curated datasets across partner institutions. Filter by classification, search by name or institution."
          />
        </Reveal>

        {/* Filters */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {classifications.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={cn(
                    'rounded-full border px-3.5 py-1.5 text-sm transition-all',
                    filter === c
                      ? 'border-primary/40 bg-primary/10 text-primary'
                      : 'border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground',
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search datasets..."
                className="w-full rounded-lg border border-border/60 bg-card/60 py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/30"
              />
            </div>
          </div>
        </Reveal>

        {/* Table */}
        <Reveal delay={0.15}>
          <GlassCard className="mt-6 overflow-hidden p-0" hover={false}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-secondary/30">
                    <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Dataset</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Institution</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Records</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Quality</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Classification</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Version</th>
                    <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Format</th>
                    <th className="px-5 py-3.5 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">API</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filtered.map((row) => {
                      const cls = classStyle[row.classification];
                      const ClassIcon = cls.icon;
                      return (
                        <motion.tr
                          key={row.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="group border-b border-border/40 transition-colors hover:bg-secondary/20"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2.5">
                              <div className="grid h-8 w-8 place-items-center rounded-lg border border-border/60 bg-secondary/50 text-primary">
                                <Database className="h-4 w-4" />
                              </div>
                              <span className="font-medium">{row.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-muted-foreground">{row.institution}</td>
                          <td className="px-5 py-4 tabular-nums text-muted-foreground">{row.records}</td>
                          <td className="px-5 py-4">
                            <QualityBadge score={row.quality} />
                          </td>
                          <td className="px-5 py-4">
                            <span className={cn('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium', cls.color)}>
                              <ClassIcon className="h-3 w-3" />
                              {row.classification}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 text-xs text-muted-foreground">
                              {row.version}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-muted-foreground">{row.format}</td>
                          <td className="px-5 py-4 text-center">
                            {row.api ? (
                              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                                <Star className="h-3 w-3" fill="currentColor" />
                              </span>
                            ) : (
                              <span className="text-muted-foreground/40">—</span>
                            )}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-sm text-muted-foreground">
                No datasets match your filters.
              </div>
            )}
          </GlassCard>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="gap-2 bg-secondary/30" asChild>
              <a href="#datasets">
                Browse full marketplace
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
