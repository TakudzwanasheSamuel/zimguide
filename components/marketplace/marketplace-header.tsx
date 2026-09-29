'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Mic, SlidersHorizontal, Plus, Handshake, FileText,
  Clock, TrendingUp, X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { searchSuggestions, recentSearches } from '@/lib/marketplace-data';

export function MarketplaceHeader({
  onSearch,
}: {
  onSearch: (q: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filteredSuggestions = query
    ? searchSuggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : searchSuggestions;

  const submit = (q: string) => {
    setQuery(q);
    onSearch(q);
    setShowSuggestions(false);
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Title row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
              Sovereign Data Marketplace
            </span>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight lg:text-5xl">
              AI Data <span className="gradient-text">Marketplace</span>
            </h1>
            <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground lg:text-lg">
              Discover trusted AI-ready datasets curated from verified Zimbabwean
              institutions. Every dataset is validated, anonymized and optimized
              for machine learning, research and enterprise AI.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 bg-secondary/30" asChild>
              <a href="#contact"><FileText className="h-4 w-4" />Request Dataset</a>
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 bg-secondary/30" asChild>
              <a href="#contact"><Handshake className="h-4 w-4" />Become Data Partner</a>
            </Button>
            <Button size="sm" className="gap-1.5" asChild>
              <a href="#contact"><Plus className="h-4 w-4" />Add Dataset</a>
            </Button>
          </div>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
          ref={searchRef}
        >
          <div
            className={cn(
              'relative flex items-center gap-2 rounded-2xl border bg-card/60 p-2 backdrop-blur-xl transition-all',
              focused ? 'border-primary/40 shadow-glow' : 'border-border/60',
            )}
          >
            <Search className="ml-2 h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => {
                setFocused(true);
                setShowSuggestions(true);
              }}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => e.key === 'Enter' && submit(query)}
              placeholder="Search datasets, institutions, keywords or categories..."
              className="flex-1 bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Voice search"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Filters"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
            <Button size="sm" className="gap-1.5" onClick={() => submit(query)}>
              Search
            </Button>
          </div>

          {/* Autocomplete dropdown */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="glass-strong absolute z-40 mt-2 w-full max-w-7xl rounded-2xl border border-border/60 p-4 shadow-soft-lg"
                style={{ left: 0, right: 0 }}
              >
                {query && filteredSuggestions.length > 0 && (
                  <div className="mb-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Suggestions
                    </p>
                    <div className="space-y-1">
                      {filteredSuggestions.slice(0, 5).map((s) => (
                        <button
                          key={s}
                          onClick={() => submit(s)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          <Search className="h-3.5 w-3.5" />
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <Clock className="h-3 w-3" /> Recent searches
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {recentSearches.map((s) => (
                        <button
                          key={s}
                          onClick={() => submit(s)}
                          className="rounded-full border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <TrendingUp className="h-3 w-3" /> Popular searches
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {searchSuggestions.slice(0, 6).map((s) => (
                        <button
                          key={s}
                          onClick={() => submit(s)}
                          className="rounded-full border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
