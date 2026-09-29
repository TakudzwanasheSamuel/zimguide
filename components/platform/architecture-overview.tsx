'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Database, Cable, Cpu, GitBranch, Layers, Award, Shield, Tag, Sparkles, Store, Webhook, Terminal } from 'lucide-react';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal } from '@/components/motion/reveal';

const architectureLayers = [
  {
    title: '1. Ingestion & Connectors',
    items: [
      {
        id: 'arch_inst',
        name: 'Institution Layer',
        icon: Database,
        glowColor: 'from-[#00C6A7]/20 to-transparent',
        tech: 'Local Database Nodes, Legacy Vaults',
        desc: 'Decentralized source networks storing raw uncurated registries, archives, and files.',
      },
      {
        id: 'arch_conn',
        name: 'Secure Connector Layer',
        icon: Cable,
        glowColor: 'from-[#0EA5E9]/20 to-transparent',
        tech: 'mTLS Tunnels, API Gateways, Secure Agents',
        desc: 'Point-to-point secure tunnels extracting delta snapshots without altering institution custody.',
      },
      {
        id: 'arch_extract',
        name: 'Extraction Layer',
        icon: Cpu,
        glowColor: 'from-[#2563EB]/20 to-transparent',
        tech: 'Tesseract OCR, Whisper STT, AI Parsers',
        desc: 'Converts unstructured documents, speech records, and PDFs into machine-readable JSON structure.',
      },
      {
        id: 'arch_agg',
        name: 'Aggregation Layer',
        icon: GitBranch,
        glowColor: 'from-[#00C6A7]/20 to-transparent',
        tech: 'Apache Kafka, Celery Task Pools',
        desc: 'Streams data feeds asynchronously into high-speed buffers, organizing ingestion order.',
      },
    ],
  },
  {
    title: '2. Processing & Governance',
    items: [
      {
        id: 'arch_etl',
        name: 'ETL / ELT Engine',
        icon: Layers,
        glowColor: 'from-[#0EA5E9]/20 to-transparent',
        tech: 'dbt Core, DuckDB, Apache Arrow',
        desc: 'Cleans, transforms, and standardizes records into unified relational schemas.',
      },
      {
        id: 'arch_quality',
        name: 'Data Quality Engine',
        icon: Award,
        glowColor: 'from-[#2563EB]/20 to-transparent',
        tech: 'Schema Validators, Metric Profilers',
        desc: 'Performs completeness, integrity, accuracy, and format checks, issuing quality flags.',
      },
      {
        id: 'arch_anon',
        name: 'Anonymization Engine',
        icon: Shield,
        glowColor: 'from-[#00C6A7]/20 to-transparent',
        tech: 'K-Anonymity, Presidio NER, Hashing',
        desc: 'Identifies and sanitizes PII fields via hashing, tokenization, or noise additions.',
      },
      {
        id: 'arch_meta',
        name: 'Metadata Engine',
        icon: Tag,
        glowColor: 'from-[#0EA5E9]/20 to-transparent',
        tech: 'Gemini Metadata AI, OpenLineage',
        desc: 'Extracts temporal, geographic, and provenance logs to form searchable, compliant indices.',
      },
    ],
  },
  {
    title: '3. Packaging & Consumption',
    items: [
      {
        id: 'arch_builder',
        name: 'AI Dataset Builder',
        icon: Sparkles,
        glowColor: 'from-[#2563EB]/20 to-transparent',
        tech: 'Vector Databases, HuggingFace Formats',
        desc: 'Compiles clean files into production formats (Parquet, JSONL) and compiles vector databases.',
      },
      {
        id: 'arch_market',
        name: 'Dataset Marketplace',
        icon: Store,
        glowColor: 'from-[#00C6A7]/20 to-transparent',
        tech: 'Data Core Portal, Subscription APIs',
        desc: 'Catalog index allowing verified third-party models or researchers to discover licensed sets.',
      },
      {
        id: 'arch_gateway',
        name: 'API Gateway',
        icon: Webhook,
        glowColor: 'from-[#0EA5E9]/20 to-transparent',
        tech: 'FastAPI, JWT Claims, Rate Limiters',
        desc: 'Delivery layer enforcing credential validations, auditing, and delivering responses.',
      },
      {
        id: 'arch_devs',
        name: 'Developers & Apps',
        icon: Terminal,
        glowColor: 'from-[#2563EB]/20 to-transparent',
        tech: 'Sovereign LLMs, RAG Agents, Data Analysts',
        desc: 'End utilization layer where clean, sovereign data feeds training runs or live models.',
      },
    ],
  },
];

export function ArchitectureOverview() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="architecture-overview" className="relative py-24 lg:py-32 overflow-hidden bg-secondary/10">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[30rem] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Platform Architecture"
            title={
              <>
                Sovereign Data Core <span className="gradient-text">Architecture</span>
              </>
            }
            subtitle="Explore how ZimGuide ingests uncurated institutional systems, refines them through cryptographic governance pipelines, and outputs secure datasets."
          />
        </Reveal>

        {/* Custom SVG Connecting Lines background for Desktop */}
        <div className="absolute inset-0 top-[28rem] bottom-16 hidden xl:block pointer-events-none opacity-20">
          <svg className="h-full w-full" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00C6A7" />
                <stop offset="50%" stopColor="#0EA5E9" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
            {/* Draw arrows from col 1 to col 2 */}
            <path d="M 320 120 L 480 120" stroke="url(#flowGrad)" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M 320 230 L 480 230" stroke="url(#flowGrad)" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M 320 340 L 480 340" stroke="url(#flowGrad)" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M 320 450 L 480 450" stroke="url(#flowGrad)" strokeWidth="2" strokeDasharray="6 6" />
            
            {/* Draw arrows from col 2 to col 3 */}
            <path d="M 720 120 L 880 120" stroke="url(#flowGrad)" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M 720 230 L 880 230" stroke="url(#flowGrad)" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M 720 340 L 880 340" stroke="url(#flowGrad)" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M 720 450 L 880 450" stroke="url(#flowGrad)" strokeWidth="2" strokeDasharray="6 6" />
          </svg>
        </div>

        <div className="mt-16 grid gap-8 xl:grid-cols-3 relative z-10">
          {architectureLayers.map((column, colIdx) => (
            <div key={column.title} className="flex flex-col gap-6">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-primary/80 px-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {column.title}
              </h3>

              <div className="flex flex-col gap-4">
                {column.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  const isHovered = activeItem === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      onHoverStart={() => setActiveItem(item.id)}
                      onHoverEnd={() => setActiveItem(null)}
                      onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
                      layout="position"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="cursor-pointer"
                    >
                      <GlassCard
                        hover={false}
                        className={`group relative transition-all duration-300 border-border/80 ${
                          isHovered ? 'bg-[#0b1329] border-primary/50 shadow-glow' : 'hover:border-border-hover'
                        }`}
                      >
                        {/* Glow indicator at the top corner */}
                        <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${item.glowColor} opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-2xl`} />

                        <div className="p-5 flex flex-col gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border/60 bg-secondary/50 text-muted-foreground group-hover:text-primary transition-colors ${
                              isHovered ? 'text-primary border-primary/30 bg-primary/5' : ''
                            }`}>
                              <Icon className="h-4.5 w-4.5" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                                {item.name}
                              </h4>
                              <p className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground mt-0.5">
                                {item.tech}
                              </p>
                            </div>
                          </div>

                          <AnimatePresence initial={false}>
                            {(isHovered || activeItem === item.id) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <p className="text-xs leading-relaxed text-muted-foreground border-t border-border/60 pt-3 mt-1">
                                  {item.desc}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
