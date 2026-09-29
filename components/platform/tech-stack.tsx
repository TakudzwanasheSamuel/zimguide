'use client';

import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { Cpu, Terminal, Database, Shield, Layers, HelpCircle } from 'lucide-react';

interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend API' | 'Storage & Query' | 'DevOps' | 'Data Formats';
  desc: string;
}

const techItems: TechItem[] = [
  { name: 'Next.js', category: 'Frontend', desc: 'React web framework powering our marketplace portals and client consoles.' },
  { name: 'FastAPI', category: 'Backend API', desc: 'Python API framework handling secure OAuth gateway traffic and model ingestion queries.' },
  { name: 'PostgreSQL', category: 'Storage & Query', desc: 'Relational data store containing configuration registries, schemas, and credentials.' },
  { name: 'DuckDB', category: 'Storage & Query', desc: 'High-performance analytical database validating raw files and executing local queries.' },
  { name: 'Apache Arrow', category: 'Data Formats', desc: 'In-memory columnar data structure standardizing memory layouts across loaders.' },
  { name: 'Apache Parquet', category: 'Data Formats', desc: 'Columnar storage layout enabling optimal read performance for large analytical files.' },
  { name: 'Python', category: 'Backend API', desc: 'Language powering our core NLP, Whisper audio extraction, and metadata AI models.' },
  { name: 'Vector Database', category: 'Storage & Query', desc: 'Distributed index database holding dense text embeddings for semantic similarity queries.' },
  { name: 'Docker', category: 'DevOps', desc: 'Isolation containers running extraction modules in immutable, memory-only sandboxes.' },
  { name: 'Kubernetes', category: 'DevOps', desc: 'Orchestrates container scaling, high availability, and isolation boundaries.' },
  { name: 'OpenAPI', category: 'Backend API', desc: 'Standardizes interactive documentation models, enabling auto-generated client SDKs.' },
  { name: 'Redis Cache', category: 'Storage & Query', desc: 'Distributed memory caching securing low-latency API response distributions.' },
];

export function TechStack() {
  return (
    <section id="tech-stack" className="relative py-24 lg:py-32 overflow-hidden bg-secondary/10">
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-[25rem] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Platform Technology Stack"
            title={
              <>
                Engineered with <span className="gradient-text">Open Source Standards</span>
              </>
            }
            subtitle="The Data Core relies on open, highly optimized analytical tools and standards, ensuring zero vendor lock-in and high compatibility with standard models."
          />
        </Reveal>

        <div className="mt-16 flex flex-col gap-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
            <span>ZimGuide Core Technology Specs</span>
            <span className="font-mono text-primary flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              12 Stack Specifications
            </span>
          </div>

          <StaggerGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" stagger={0.04}>
            {techItems.map((item) => {
              return (
                <StaggerItem key={item.name}>
                  <GlassCard className="group h-full p-5 hover:border-primary/45 hover:shadow-glow flex flex-col justify-between">
                    <div>
                      {/* Name & Category */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[9px] font-semibold bg-secondary/80 text-muted-foreground px-2 py-0.5 rounded border border-border/80 uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
