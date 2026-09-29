'use client';

import { institutions, stats } from '@/lib/mock-data';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';

export function LogoMarquee() {
  const row = [...institutions, ...institutions];
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by institutions across Zimbabwe
          </p>
        </Reveal>

        <div className="mask-fade-edges relative mt-8 overflow-hidden">
          <div className="marquee flex w-max gap-10">
            {row.map((name, i) => (
              <div
                key={i}
                className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-muted-foreground/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
                {name}
              </div>
            ))}
          </div>
        </div>

        <StaggerGroup className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4" stagger={0.1}>
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="text-center">
                <div className="gradient-text text-3xl font-semibold tracking-tight md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1.5 text-sm text-muted-foreground">{s.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
