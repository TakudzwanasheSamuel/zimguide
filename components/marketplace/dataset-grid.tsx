'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Loader2, Inbox } from 'lucide-react';
import { type MarketplaceDataset } from '@/lib/marketplace-data';
import { DatasetCard } from '@/components/marketplace/dataset-card';
import { QuickFilters, type FilterState } from '@/components/marketplace/filters';
import { Reveal } from '@/components/motion/reveal';

export function DatasetGrid({
  datasets,
  filters,
  onFiltersChange,
  searchQuery,
  onPreview,
  isLoading = false,
}: {
  datasets: MarketplaceDataset[];
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
  searchQuery: string;
  onPreview: (d: MarketplaceDataset) => void;
  isLoading?: boolean;
}) {
  const [sort, setSort] = useState<'newest' | 'downloads' | 'rating'>('newest');

  const filtered = useMemo(() => {
    let result = [...datasets];

    // Quick filter
    const qf = filters.quickFilter;
    if (qf === 'Free') result = result.filter((d) => d.pricing === 'Free');
    else if (qf === 'Premium') result = result.filter((d) => d.pricing === 'Premium');
    else if (qf === 'API Available') result = result.filter((d) => d.api);
    else if (qf === 'Newest') result = result.filter((d) => d.isNew);
    else if (qf === 'Most Downloaded') setSort('downloads');
    else if (qf === 'Highest Rated') setSort('rating');
    else if (['Structured', 'Semi Structured', 'Unstructured'].includes(qf))
      result = result.filter((d) => d.structure === qf);
    else if (['Government', 'Research', 'Health', 'Agriculture', 'Education', 'Culture', 'Finance', 'Transport', 'Environment'].includes(qf))
      result = result.filter((d) => d.category === qf);
    else if (['Text', 'Images', 'Audio', 'Geospatial', 'Tabular'].includes(qf))
      result = result.filter((d) => d.formats.some((f) => f.toLowerCase().includes(qf.toLowerCase())));

    // Sidebar filters
    const sb = filters.sidebar;
    if (sb.dataStructure?.length)
      result = result.filter((d) => sb.dataStructure.includes(d.structure));
    if (sb.institutionType?.length)
      result = result.filter((d) => sb.institutionType.includes(d.institutionType));
    if (sb.license?.length)
      result = result.filter((d) => sb.license.includes(d.license));
    if (sb.pricing?.length)
      result = result.filter((d) => sb.pricing.includes(d.pricing));
    if (sb.languages?.length)
      result = result.filter((d) => d.languages.some((l) => sb.languages.includes(l)));

    // Quality
    if (filters.qualityMin > 0)
      result = result.filter((d) => d.quality >= filters.qualityMin);

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.institution.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q),
      );
    }

    // Sort
    if (sort === 'downloads') result.sort((a, b) => b.downloads - a.downloads);
    else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [datasets, filters, searchQuery, sort]);

  return (
    <section id="datasets" className="relative py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight md:text-3xl">
                <LayoutGrid className="h-6 w-6 text-primary" />
                Browse Datasets
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {filtered.length} datasets available
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="rounded-lg border border-border/60 bg-card/60 px-3 py-1.5 text-xs text-foreground backdrop-blur focus:border-primary/40 focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="downloads">Most Downloaded</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-6">
            <QuickFilters
              active={filters.quickFilter}
              onChange={(f) => onFiltersChange({ ...filters, quickFilter: f })}
            />
          </div>
        </Reveal>

        {/* Grid */}
        {isLoading ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl border border-border/40 bg-card/30" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center gap-3 py-16 text-center">
            <Inbox className="h-12 w-12 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No datasets match your filters.</p>
          </div>
        ) : (
          <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((d, i) => (
                <DatasetCard key={d.id} dataset={d} onPreview={onPreview} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
