'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PLATFORM_FLOW } from '@/lib/demo-story';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';

export function PlatformFlow() {
  return (
    <section id="platform-flow" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="End-to-End Platform"
            title={
              <>
                From institution to{' '}
                <span className="gradient-text">AI applications</span>
              </>
            }
            subtitle="Every dataset follows the same sovereign lifecycle — connector ingestion, privacy-safe processing, canonical packaging, marketplace discovery, and developer APIs."
          />
        </Reveal>

        <Reveal delay={0.15}>
          <GlassCard className="mt-12 p-6 lg:p-8 border-border/80 overflow-x-auto" hover={false}>
            <div className="flex flex-wrap items-center justify-center gap-2 min-w-[640px]">
              {PLATFORM_FLOW.map((step, idx) => (
                <div key={step.label} className="flex items-center gap-2">
                  <div className="rounded-lg border border-primary/25 bg-primary/5 px-3 py-2 text-center min-w-[88px]">
                    <p className="text-[9px] font-mono text-primary font-bold">#{step.step}</p>
                    <p className="text-[10px] font-semibold text-foreground mt-0.5">{step.label}</p>
                  </div>
                  {idx < PLATFORM_FLOW.length - 1 && (
                    <span className="text-muted-foreground text-xs hidden sm:inline">→</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] text-muted-foreground mt-6 font-mono">
              Institution → Data Source → Connector → Extraction → Validation → PII → Anonymization →
              Standardization → Metadata → Quality → AI Readiness → Data Asset → Marketplace → API → Developer → AI Apps
            </p>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="shadow-glow">
              <Link href="/command">
                Start Live Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/marketplace">Browse Marketplace</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/developers">Developer Portal</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
