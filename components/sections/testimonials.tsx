'use client';

import { Quote } from 'lucide-react';
import { testimonials } from '@/lib/mock-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';

export function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Voices"
            title={
              <>
                Trusted by the institutions{' '}
                <span className="gradient-text">building Zimbabwe&apos;s AI future</span>
              </>
            }
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-5 md:grid-cols-3" stagger={0.12}>
          {testimonials.map((t) => (
            <StaggerItem key={t.author}>
              <GlassCard className="flex h-full flex-col p-6">
                <Quote className="h-7 w-7 text-primary/40" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-xs font-semibold text-white">
                    {t.author.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role} · {t.org}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
