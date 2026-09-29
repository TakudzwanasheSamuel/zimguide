'use client';

import { AlertTriangle, Database, Lock, Unplug } from 'lucide-react';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';

const problems = [
  {
    icon: Unplug,
    title: 'Fragmented institutional data',
    description:
      'Zimbabwean public data lives in silos — archives, ministries, universities, and agencies — with no unified access layer.',
  },
  {
    icon: Lock,
    title: 'Privacy and governance gaps',
    description:
      'Sensitive records lack consistent PII handling, anonymization, and audit trails before AI consumption.',
  },
  {
    icon: Database,
    title: 'Not AI-ready by default',
    description:
      'Raw exports miss metadata, quality scoring, and schema standards required for RAG, analytics, and model training.',
  },
  {
    icon: AlertTriangle,
    title: 'No sovereign marketplace',
    description:
      'Researchers and developers cannot discover, license, and consume trusted Zimbabwean datasets through one platform.',
  },
];

export function ProblemStatement() {
  return (
    <section id="problem" className="relative py-24 lg:py-28 border-y border-border/40 bg-secondary/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="The Challenge"
            title={
              <>
                Institutional data exists — but it is{' '}
                <span className="gradient-text">not connected to AI</span>
              </>
            }
            subtitle="Zimbabwe holds vast public, cultural, agricultural, and statistical data. Without connectors, pipelines, and governance, it cannot power the AI economy."
          />
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {problems.map((p) => (
            <StaggerItem key={p.title}>
              <GlassCard className="h-full p-5 border-amber-500/15 bg-amber-500/5">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold">{p.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.description}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
