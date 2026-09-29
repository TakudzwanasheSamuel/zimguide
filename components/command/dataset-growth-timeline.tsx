'use client';

import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem, Reveal } from '@/components/motion/reveal';
import { Calendar, Landmark, Database, Users, Coins, Layers, ArrowRight } from 'lucide-react';

export function DatasetGrowthTimeline() {
  const timelineData = [
    { year: '2022', title: 'Foundational Infrastructure', partners: '12', datasets: '82', records: '8.0K', revenue: 'US$500', desc: 'mTLS network replication nodes established at UZ and National Archives.' },
    { year: '2023', title: 'OCR Extraction launch', partners: '28', datasets: '340', records: '18K', revenue: 'US$1.2K', desc: 'Diacritic-correct local language OCR engines process physical archive files.' },
    { year: '2024', title: 'Federated API Gateways', partners: '48', datasets: '650', records: '28K', revenue: 'US$2.2K', desc: ' mTLS credentials keys generated for regional academic researchers.' },
    { year: '2025', title: 'Language Model Fine-tuning', partners: '70', datasets: '980', records: '36K', revenue: 'US$3.8K', desc: 'Linguistic corpora fine-tuning and 768-dimension Shona/Ndebele embeddings.' },
    { year: '2026', title: 'Sovereign Vector Space', partners: '86', datasets: '1,284', records: '48K', revenue: 'US$4.8K', desc: 'Production-ready LLM query search integrations and billing wallet distribution.' },
  ];

  return (
    <section id="growth-timeline" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Calendar className="h-4.5 w-4.5 text-primary" />
          5-Year Ecosystem Growth Timeline
        </h3>
        <p className="text-xs text-muted-foreground">
          Historical growth trajectories tracking partners, ready datasets, and distributed royalties since foundation.
        </p>
      </div>

      <GlassCard className="p-6 md:p-8 border-border/80 bg-card/40 shadow-glow" hover={false}>
        <div className="relative border-l border-border/70 pl-6 ml-3 space-y-8">
          
          {timelineData.map((t, idx) => {
            return (
              <Reveal key={t.year} direction="left" delay={idx * 0.05} duration={0.5}>
                <div className="relative group">
                  
                  {/* Timeline Year Dot */}
                  <span className="absolute -left-[31px] top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full border border-primary bg-background shadow-soft text-primary font-mono text-[9px] font-bold select-none">
                    •
                  </span>

                  {/* Details Card */}
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between bg-secondary/20 hover:bg-secondary/30 transition-colors border border-border/60 p-4.5 rounded-xl">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-primary font-mono select-none">{t.year}</span>
                        <div className="h-3 w-px bg-border/60" />
                        <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                          {t.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed max-w-2xl">
                        {t.desc}
                      </p>
                    </div>

                    {/* Timeline Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px] font-mono text-slate-300 md:w-[20rem] shrink-0 border-t md:border-t-0 md:border-l border-border/40 pt-3.5 md:pt-0 md:pl-5">
                      <div>
                        <span className="text-[8px] uppercase tracking-wider text-slate-400 block">Partners</span>
                        <span className="font-bold text-foreground">{t.partners}</span>
                      </div>
                      <div>
                        <span className="text-[8px] uppercase tracking-wider text-slate-400 block">Datasets</span>
                        <span className="font-bold text-foreground">{t.datasets}</span>
                      </div>
                      <div>
                        <span className="text-[8px] uppercase tracking-wider text-slate-400 block">Records</span>
                        <span className="font-bold text-foreground">{t.records}</span>
                      </div>
                      <div>
                        <span className="text-[8px] uppercase tracking-wider text-slate-400 block">Royalties</span>
                        <span className="font-bold text-emerald-400">{t.revenue}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </Reveal>
            );
          })}

        </div>
      </GlassCard>
    </section>
  );
}
