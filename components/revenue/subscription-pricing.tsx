'use client';

import { pricingPlansList } from '@/lib/revenue-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Check, ShieldCheck, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SubscriptionPricing() {
  return (
    <section id="subscription-pricing" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2 text-center max-w-2xl mx-auto">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
          Subscription Tiers
        </span>
        <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl mt-1">
          Ecosystem Access Pricing
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Select the subscription plan that aligns with your query quantities, downloads volume, and support needs.
        </p>
      </div>

      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5" stagger={0.04}>
        {pricingPlansList.map((plan) => {
          const isInstitutional = plan.name === 'Institutional';
          const isEnterprise = plan.name === 'Enterprise';
          const isCuration = plan.name === 'Data Curation';
          
          const highlight = isInstitutional;

          return (
            <StaggerItem key={plan.name}>
              <GlassCard className={`group h-full p-5 flex flex-col justify-between relative overflow-hidden ${
                highlight ? 'border-primary/30 bg-[#0b1329]/50 shadow-glow' : 'border-border/60 bg-card/40'
              }`} hover={false}>
                
                {highlight && (
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-brand animate-pulse" />
                )}

                <div>
                  {/* Header */}
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground block">
                      {isCuration ? 'Professional Services' : 'Subscription Plan'}
                    </span>
                    <h4 className="text-sm font-bold text-foreground mt-1.5 flex items-center justify-between">
                      {plan.name}
                      {highlight && (
                        <span className="text-[8px] font-mono font-bold bg-primary/10 border border-primary/20 text-primary px-1.5 py-0.5 rounded uppercase">
                          POPULAR
                        </span>
                      )}
                    </h4>
                  </div>

                  {/* Price */}
                  <div className="mt-4 pb-4 border-b border-border/45">
                    <span className="text-lg font-bold font-mono text-foreground group-hover:text-primary transition-colors">
                      {plan.price}
                    </span>
                  </div>

                  {/* Checklist parameters */}
                  <div className="mt-5 space-y-3.5 text-[11px] leading-relaxed text-slate-300">
                    <div className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{plan.calls}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{plan.downloads}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{plan.storage}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{plan.rights}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span>SLA: {plan.sla}</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-8 pt-4 border-t border-border/45">
                  <Button
                    size="sm"
                    variant={highlight ? 'default' : 'outline'}
                    className={`w-full text-xs font-semibold h-9 rounded-lg ${
                      !highlight && 'glass hover:bg-secondary/40'
                    }`}
                  >
                    {isCuration || isEnterprise ? 'Contact Sales' : 'Subscribe Tier'}
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
