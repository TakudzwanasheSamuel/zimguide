'use client';

import { Check, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { pricingTiers } from '@/lib/mock-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title={
              <>
                Start at $10.{' '}
                <span className="gradient-text">Scale sovereign.</span>
              </>
            }
            subtitle="Transparent pricing for developers, researchers, institutions, and enterprise partners."
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" stagger={0.1}>
          {pricingTiers.map((tier) => (
            <StaggerItem key={tier.name}>
              <GlassCard
                className={cn(
                  'relative h-full p-6',
                  tier.highlighted && 'border-primary/40 shadow-glow',
                )}
                glow={tier.highlighted}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-brand px-3 py-1 text-xs font-medium text-white shadow-glow">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
                  {tier.cadence && (
                    <span className="text-sm text-muted-foreground">{tier.cadence}</span>
                  )}
                </div>

                <Button
                  className="mt-6 w-full gap-2"
                  variant={tier.highlighted ? 'default' : 'outline'}
                  asChild
                >
                  <Link href="#contact">
                    {tier.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <ul className="mt-6 space-y-3 border-t border-border/60 pt-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.15}>
          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            All plans include sovereign residency and immutable lineage.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
