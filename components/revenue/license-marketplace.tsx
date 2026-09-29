'use client';

import { licensesMarketplaceList } from '@/lib/revenue-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { ShieldAlert, CheckCircle2, Coins, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LicenseMarketplace() {
  return (
    <section id="license-marketplace" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <ShieldCheck className="h-4.5 w-4.5 text-primary" />
          Sovereign Data License Models
        </h3>
        <p className="text-xs text-muted-foreground">
          Review standard legal agreement frameworks governing model training routes and academic research access.
        </p>
      </div>

      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
        {licensesMarketplaceList.map((license) => {
          return (
            <StaggerItem key={license.name}>
              <GlassCard className="group h-full p-5 flex flex-col justify-between hover:border-primary/45 hover:shadow-glow">
                <div>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors border-b border-border/60 pb-3">
                    {license.name}
                  </h4>
                  
                  <p className="text-[11px] leading-relaxed text-muted-foreground mt-3 leading-normal">
                    {license.desc}
                  </p>

                  <div className="mt-4 space-y-3 text-[10px] leading-relaxed border-t border-border/40 pt-4 font-mono">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Permitted Uses</span>
                      <span className="font-semibold text-foreground flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        {license.uses}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Restrictions</span>
                      <span className="font-semibold text-amber-400 flex items-center gap-1">
                        <ShieldAlert className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        {license.restrictions}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Pricing Framework</span>
                      <span className="font-semibold text-primary">{license.pricing}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40">
                  <Button size="sm" variant="outline" className="w-full text-[10px] font-semibold h-8 rounded-lg glass hover:bg-secondary/40 gap-1">
                    Select License Scheme
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
