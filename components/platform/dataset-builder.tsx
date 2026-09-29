'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { FileText, ArrowRight, ShieldCheck, Sparkles, Terminal, Code } from 'lucide-react';

const builderStages = [
  { step: '1', title: 'Raw Documents', desc: 'Unstructured archives, PDFs, audio tapes.' },
  { step: '2', title: 'Structured Dataset', desc: 'Normalized JSON tables with schema typings.' },
  { step: '3', title: 'Embeddings', desc: '768-dimensional semantic context arrays.' },
  { step: '4', title: 'Vector Index', desc: 'Low-latency search layers for semantic matching.' },
  { step: '5', title: 'Knowledge Graph', desc: 'Relational mappings of nodes, locations, events.' },
  { step: '6', title: 'Search Ready', desc: 'Fully indexed database endpoints.' },
  { step: '7', title: 'LLM Ready', desc: 'Compatible with HuggingFace, LlamaIndex, LangChain.' },
];

export function AIDatasetBuilder() {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('after');

  const beforeContent = `---
FILE_NAME: na_oral_hist_1982_09.txt
SOURCE: National Archives of Zimbabwe
STATUS: RAW_UNCHECKED
---
Mudzidzi akataura kuti panguva yainzi [REDACTED NAME] aive mudunhu reGuruve muna 1974 aive nemhuri yakakura... Chiremba akati, "Ini ndinoda kubatsira vanhu vose vekwaMutapa."
Contact Number: 0772184918 (Curator note: Check matching phone for registration).
Owner ID: 63-228741-B-23 (Verify against civil registry status).
GPS: -16.65, 30.70`;

  const afterContent = `{
  "record_id": "sha256_e814a098cbef34",
  "source": "National Archives of Zimbabwe",
  "quality_score": 0.9982,
  "content_anonymized": "Mudzidzi akataura kuti panguva yainzi [PERSON_1] aive mudunhu reGuruve muna 1974 aive nemhuri yakakura... Chiremba akati, \\"Ini ndinoda kubatsira vanhu vose vekwaMutapa.\\"",
  "metadata": {
    "province": "Mashonaland Central",
    "district": "Guruve",
    "language": "sn",
    "content_type": "oral_history",
    "classification": "Government Public",
    "license": "CC BY-NC 4.0",
    "created_at": "2026-07-25T08:30:12Z",
    "gps_coordinates": {
      "lat": -16.65,
      "lng": 30.70
    }
  },
  "privacy_assertions": {
    "pii_detected": ["name", "phone", "national_id"],
    "anonymization_strategy": "NER_MASKING_AND_HASHING",
    "k_anonymity": 12,
    "l_diversity": 4
  },
  "vector_embedding": [0.0128, -0.0451, 0.0882, "...", 0.1204]
}`;

  return (
    <section id="dataset-builder" className="relative py-24 lg:py-32 overflow-hidden bg-secondary/10">
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="absolute bottom-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Dataset Compiler"
            title={
              <>
                AI Dataset Ingestion <span className="gradient-text">Compiler</span>
              </>
            }
            subtitle="Watch how unstructured historical data is systematically parsed, sanitized, structured, and vectorized to compile direct LLM-ready context bases."
          />
        </Reveal>

        {/* Horizontal Compiler Flow Steps */}
        <div className="mt-16 overflow-x-auto pb-6 scrollbar-none select-none">
          <div className="flex items-center gap-4 min-w-[70rem] px-4">
            {builderStages.map((stage, idx) => {
              return (
                <div key={stage.step} className="flex items-center gap-4 flex-1">
                  <GlassCard className="flex-1 p-5 hover:border-primary/50 relative group">
                    <div className="absolute top-2 right-2 text-xs font-mono text-primary/70 font-semibold">
                      STEP {stage.step}
                    </div>
                    <h4 className="text-sm font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {stage.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {stage.desc}
                    </p>
                  </GlassCard>
                  {idx < builderStages.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-border/60 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Before and After Visual Dashboard */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Sovereign Code Compiler
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Click tabs to inspect the transformation from raw document scans containing confidential details to vectorized, clean datasets.
              </p>
            </div>

            <div className="flex gap-3 mt-6 border-b border-border/60 pb-4">
              <button
                onClick={() => setActiveTab('before')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  activeTab === 'before'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    : 'border-border/60 text-muted-foreground hover:text-foreground'
                }`}
              >
                1. Unstructured Input
              </button>
              <button
                onClick={() => setActiveTab('after')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  activeTab === 'after'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'border-border/60 text-muted-foreground hover:text-foreground'
                }`}
              >
                2. AI-Ready Output
              </button>
            </div>

            <div className="mt-6 space-y-3.5 bg-secondary/30 p-5 rounded-xl border border-border/60 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transformation Engine</span>
                <span className="font-mono text-foreground font-semibold">Gemini Ingest Profiler v2</span>
              </div>
              <div className="flex justify-between border-t border-border/40 pt-3">
                <span className="text-muted-foreground">Compiler Rules Applied</span>
                <span className="font-mono text-foreground font-semibold">k-anonymity (k=12), ISO-27001</span>
              </div>
              <div className="flex justify-between border-t border-border/40 pt-3">
                <span className="text-muted-foreground">Metadata Classification</span>
                <span className="text-primary font-semibold font-mono">Government Public Grade</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <GlassCard className="h-full border-border/80 bg-black/40 overflow-hidden shadow-glow flex flex-col">
              {/* Terminal header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-secondary/40 text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  <span>dataset-compiler --compile</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-emerald-400">READY</span>
                </div>
              </div>

              {/* Code display */}
              <div className="p-5 font-mono text-xs overflow-x-auto flex-1 leading-relaxed max-h-[30rem] scrollbar-thin">
                <pre className={activeTab === 'before' ? 'text-rose-300' : 'text-emerald-400/90'}>
                  <code>{activeTab === 'before' ? beforeContent : afterContent}</code>
                </pre>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
