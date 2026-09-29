'use client';

import { topPartnersList } from '@/lib/revenue-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Award, Landmark, TrendingUp, Download, CheckCircle2 } from 'lucide-react';

export function TopPartners() {
  return (
    <section id="top-partners" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Award className="h-4.5 w-4.5 text-primary" />
          Top Earning Sovereign Partners
        </h3>
        <p className="text-xs text-muted-foreground">
          Ranking partner institutions compiling the highest royalty allocations from commercial model training sets.
        </p>
      </div>

      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5" stagger={0.04}>
        {topPartnersList.map((partner, idx) => {
          return (
            <StaggerItem key={partner.name}>
              <GlassCard className="group h-full p-5 hover:border-primary/45 hover:shadow-glow flex flex-col justify-between relative overflow-hidden">
                {/* Ranking number badge */}
                <div className="absolute right-3 top-3 font-mono text-[22px] font-extrabold text-border/20 group-hover:text-primary/10 select-none">
                  #0{idx + 1}
                </div>

                <div>
                  {/* Title */}
                  <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                    <div className="grid h-8 w-8 place-items-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
                      <Landmark className="h-4 w-4" />
                    </div>
                    <h4 className="text-xs font-bold leading-tight text-foreground group-hover:text-primary transition-colors max-w-[110px] truncate">
                      {partner.name.replace('of Zimbabwe', '').trim()}
                    </h4>
                  </div>

                  {/* Core Metrics */}
                  <div className="mt-4 space-y-1">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block">Royalties Received</span>
                    <span className="text-xl font-bold font-mono text-emerald-400 block group-hover:text-primary transition-colors">
                      {partner.royalties}
                    </span>
                  </div>

                  {/* Metadata */}
                  <div className="mt-4 space-y-2 text-[10px] leading-relaxed">
                    <div>
                      <span className="text-slate-400 block font-mono text-[9px] uppercase tracking-wider">Top Dataset</span>
                      <span className="font-semibold text-foreground truncate block">{partner.topDataset}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-border/40 flex items-center justify-between text-[9px] font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                    <TrendingUp className="h-3 w-3" />
                    {partner.growth}
                  </span>
                  <span className="text-slate-400 flex items-center gap-0.5">
                    <Download className="h-3 w-3" />
                    {partner.downloads} downloads
                  </span>
                </div>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
