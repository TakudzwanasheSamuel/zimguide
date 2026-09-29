'use client';

import { useState } from 'react';
import { Search, Mic, Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/site/section';

export function SearchDatasets() {
  const [query, setQuery] = useState('');
  const suggestions = ['Shona Language Corpus', 'Geospatial boundary maps', 'Health cohort data', 'FastAPI endpoint specs', 'Python SDK guides'];

  return (
    <section id="search-datasets" className="py-8">
      <GlassCard className="p-6 md:p-8 border-border/80 bg-card/40 shadow-glow" hover={false}>
        <div className="max-w-3xl mx-auto flex flex-col gap-4 text-center">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              Intelligent Sovereign Ingest Catalog Search
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Search datasets, vector indexes, OpenAPI schemas, metadata fields, or client libraries.
            </p>
          </div>

          {/* Search Input Box */}
          <div className="relative mt-4 flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search datasets, endpoints, metadata or documentation..."
              className="w-full rounded-xl border border-border/80 bg-secondary/35 py-3.5 pl-12 pr-28 text-sm text-foreground placeholder-muted-foreground/70 focus:border-primary/50 focus:bg-secondary/50 focus:outline-none transition-all"
            />
            
            {/* Action Tools */}
            <div className="absolute right-3 flex items-center gap-1">
              <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Voice Search">
                <Mic className="h-4 w-4" />
              </button>
              <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-secondary text-muted-foreground hover:text-primary transition-colors" title="AI Assistant Search">
                <Sparkles className="h-4 w-4" />
              </button>
              <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Filter Queries">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Suggestions */}
          <div className="mt-2 flex flex-wrap justify-center items-center gap-2 text-xs">
            <span className="text-muted-foreground font-medium">Suggested searches:</span>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="bg-secondary/40 border border-border/80 px-2.5 py-1 rounded-lg text-muted-foreground hover:text-foreground hover:border-primary/45 transition-colors font-medium text-[11px]"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
