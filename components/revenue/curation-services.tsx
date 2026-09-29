'use client';

import { curationServicesList } from '@/lib/revenue-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { ShieldCheck, Calendar, ArrowRight, Cog } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CurationServices() {
  return (
    <section id="curation-services" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Cog className="h-4.5 w-4.5 text-primary" />
          Data Curation & Preparation Services
        </h3>
        <p className="text-xs text-muted-foreground">
          Transform raw institutional data into AI-ready datasets. Projects are scoped at US$1,500–$2,000 — contact Sales to begin.
        </p>
      </div>

      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.04}>
        {curationServicesList.map((service) => {
          return (
            <StaggerItem key={service.name}>
              <GlassCard className="group h-full p-5 flex flex-col justify-between hover:border-primary/45 hover:shadow-glow">
                <div>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors border-b border-border/60 pb-3">
                    {service.name}
                  </h4>
                  
                  <p className="text-[11px] leading-relaxed text-muted-foreground mt-3 leading-normal">
                    {service.desc}
                  </p>

                  {/* Service parameters */}
                  <div className="mt-4 grid grid-cols-2 gap-3 text-[10px] leading-relaxed border-t border-border/40 pt-4 font-mono">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Delivery Estimate</span>
                      <span className="font-semibold text-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-primary shrink-0" />
                        {service.delivery}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Starting Price</span>
                      <span className="font-semibold text-primary">{service.price}</span>
                    </div>
                  </div>

                  {/* Target industries tags */}
                  <div className="mt-4 flex flex-wrap gap-1">
                    {service.industries.map((ind) => (
                      <span key={ind} className="bg-secondary/40 border border-border/80 text-[9px] text-muted-foreground px-2 py-0.5 rounded-lg font-medium">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Request Button */}
                <div className="mt-6 pt-4 border-t border-border/40">
                  <Button size="sm" variant="outline" className="w-full text-[10px] font-semibold h-8 rounded-lg glass hover:bg-secondary/40 gap-1">
                    Request Curation
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
