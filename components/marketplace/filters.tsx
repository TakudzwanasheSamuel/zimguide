'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { quickFilters, sidebarFilters } from '@/lib/marketplace-data';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export type FilterState = {
  quickFilter: string;
  sidebar: Record<string, string[]>;
  qualityMin: number;
};

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
  defaultOpen = true,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/40 py-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-medium">{title}</span>
        <ChevronDown
          className={cn('h-4 w-4 text-muted-foreground transition-transform', open && 'rotate-180')}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-2">
              {options.map((opt) => (
                <label
                  key={opt}
                  className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span
                    className={cn(
                      'grid h-4 w-4 shrink-0 place-items-center rounded border transition-all',
                      selected.includes(opt)
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border/60 bg-transparent',
                    )}
                  >
                    {selected.includes(opt) && (
                      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <input
                    type="checkbox"
                    checked={selected.includes(opt)}
                    onChange={() => onToggle(opt)}
                    className="sr-only"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FilterSidebar({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = (group: string, val: string) => {
    const current = filters.sidebar[group] ?? [];
    const next = current.includes(val)
      ? current.filter((v) => v !== val)
      : [...current, val];
    onChange({ ...filters, sidebar: { ...filters.sidebar, [group]: next } });
  };

  const sidebarContent = (
    <div className="space-y-0">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Filter className="h-4 w-4 text-primary" />
          Filters
        </h3>
        <button
          onClick={() => onChange({ quickFilter: 'All', sidebar: {}, qualityMin: 0 })}
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Reset all
        </button>
      </div>

      <FilterGroup
        title="Dataset Type"
        options={sidebarFilters.datasetType}
        selected={filters.sidebar.datasetType ?? []}
        onToggle={(v) => toggleSidebar('datasetType', v)}
      />
      <FilterGroup
        title="Data Structure"
        options={sidebarFilters.dataStructure}
        selected={filters.sidebar.dataStructure ?? []}
        onToggle={(v) => toggleSidebar('dataStructure', v)}
      />
      <FilterGroup
        title="Institution Type"
        options={sidebarFilters.institutionType}
        selected={filters.sidebar.institutionType ?? []}
        onToggle={(v) => toggleSidebar('institutionType', v)}
      />
      <FilterGroup
        title="License"
        options={sidebarFilters.license}
        selected={filters.sidebar.license ?? []}
        onToggle={(v) => toggleSidebar('license', v)}
      />
      <FilterGroup
        title="Languages"
        options={sidebarFilters.languages}
        selected={filters.sidebar.languages ?? []}
        onToggle={(v) => toggleSidebar('languages', v)}
      />

      {/* Quality Score Slider */}
      <div className="border-b border-border/40 py-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Quality Score</span>
          <span className="text-xs text-primary">{filters.qualityMin}+</span>
        </div>
        <div className="mt-4 px-1">
          <Slider
            value={[filters.qualityMin]}
            max={100}
            min={0}
            step={5}
            onValueChange={(v) => onChange({ ...filters, qualityMin: v[0] })}
          />
          <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
            <span>0</span><span>80+</span><span>90+</span><span>95+</span><span>100</span>
          </div>
        </div>
      </div>

      <FilterGroup
        title="Data Freshness"
        options={sidebarFilters.dataFreshness}
        selected={filters.sidebar.dataFreshness ?? []}
        onToggle={(v) => toggleSidebar('dataFreshness', v)}
        defaultOpen={false}
      />
      <FilterGroup
        title="Pricing"
        options={sidebarFilters.pricing}
        selected={filters.sidebar.pricing ?? []}
        onToggle={(v) => toggleSidebar('pricing', v)}
        defaultOpen={false}
      />
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur-xl">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile filter button + drawer */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-secondary/30"
          onClick={() => setMobileOpen(true)}
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="glass-strong fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] overflow-y-auto border-r border-border/60 p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-base font-semibold">Filters</h3>
                  <button onClick={() => setMobileOpen(false)} className="rounded-lg p-1 text-muted-foreground">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                {sidebarContent}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export function QuickFilters({
  active,
  onChange,
}: {
  active: string;
  onChange: (f: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {quickFilters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={cn(
            'rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
            active === f
              ? 'border-primary/40 bg-primary/10 text-primary'
              : 'border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground',
          )}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
