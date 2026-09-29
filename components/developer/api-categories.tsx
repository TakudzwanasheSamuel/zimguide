'use client';

import { apiCategories } from '@/lib/developer-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Database, Tag, Search, Sparkles, Binary, Map, BarChart3, Radio, Zap, Activity } from 'lucide-react';

const iconMap = {
  api_dataset: Database,
  api_meta: Tag,
  api_search: Search,
  api_embed: Sparkles,
  api_vector: Binary,
  api_gis: Map,
  api_analytics: BarChart3,
  api_stream: Radio,
};

export function APICategories() {
  const handleScroll = () => {
    const el = document.getElementById('api-playground');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="api-categories" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Activity className="h-4.5 w-4.5 text-primary" />
          Sovereign API Categories
        </h3>
        <p className="text-xs text-muted-foreground">
          Dedicated, performant microservice APIs serving structured query indexes and vectorized data pipelines.
        </p>
      </div>

      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.04}>
        {apiCategories.map((cat) => {
          const Icon = iconMap[cat.id as keyof typeof iconMap] || Database;

          return (
            <StaggerItem key={cat.id}>
              <GlassCard className="group h-full p-5 flex flex-col justify-between hover:border-primary/45 hover:shadow-glow cursor-pointer" onClick={handleScroll}>
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-3 pb-3 border-b border-border/60">
                    <div className="grid h-9 w-9 place-items-center rounded-xl border border-border/80 bg-secondary/50 text-muted-foreground group-hover:text-primary transition-colors">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h4 className="text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {cat.name}
                    </h4>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/45 flex items-center justify-between text-[10px] font-mono">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                    Latency: <span className="text-foreground font-bold">{cat.latency}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground">Popularity: </span>
                    <span className="text-primary font-bold">{cat.popularity}</span>
                  </div>
                </div>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
