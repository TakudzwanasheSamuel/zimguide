'use client';

import { steps } from '@/lib/mock-data';
import { SectionHeading, GradientDivider } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';

export function HowItWorks() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                From raw records to{' '}
                <span className="gradient-text">consumable intelligence</span>
              </>
            }
            subtitle="A governed path from institutional data to AI-ready, API-accessible datasets — four stages, fully auditable."
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {steps.map((s, i) => (
            <StaggerItem key={s.step}>
              <div className="relative h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-xl transition-colors hover:border-primary/30">
                  <span className="gradient-text text-4xl font-semibold tracking-tight">
                    {s.step}
                  </span>
                  <h3 className="mt-4 text-base font-semibold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 lg:block">
                    <div className="h-px w-6 bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.2}>
          <GradientDivider className="mt-16" />
        </Reveal>
      </div>
    </section>
  );
}
