'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { provenanceTimeline, type ProvenanceNode } from '@/lib/platform-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal } from '@/components/motion/reveal';
import { ShieldCheck, History, ArrowRight, Eye, User, FileKey, Fingerprint, Award, FileText } from 'lucide-react';

export function DataLineage() {
  const [activeNodeIdx, setActiveNodeIdx] = useState<number>(7); // Default to Dataset Version 2.1
  const activeNode = provenanceTimeline[activeNodeIdx];
  const reduce = useReducedMotion();

  return (
    <section id="data-lineage" className="relative py-24 lg:py-32 overflow-hidden bg-secondary/15">
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="absolute top-0 right-0 w-[45rem] h-[25rem] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Provenance Ledger"
            title={
              <>
                Every Dataset Has a <span className="gradient-text">Verifiable History</span>
              </>
            }
            subtitle="Data Core cryptographically signs every transaction and state change. Auditing lineage is a zero-trust action: track records from ingestion to API deployment with full cryptographic proof."
          />
        </Reveal>

        {/* Large Interactive Provenance Timeline */}
        <div className="mt-16 relative">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 px-2">
            <span>Hover or click nodes to audit state hashes</span>
            <span className="text-primary font-mono flex items-center gap-1.5">
              <History className="h-3.5 w-3.5" />
              Cryptographic Ledger Active
            </span>
          </div>

          {/* Timeline Node Track */}
          <div
            className="flex items-center gap-0 overflow-x-auto pb-6 pt-4 px-4 scrollbar-thin select-none"
            style={{ scrollbarWidth: 'thin' }}
          >
            {provenanceTimeline.map((node, idx) => {
              const isActive = activeNodeIdx === idx;
              const isPast = idx < activeNodeIdx;

              return (
                <div key={node.id} className="flex items-center shrink-0">
                  {/* Timeline Node Point */}
                  <div
                    onClick={() => setActiveNodeIdx(idx)}
                    onMouseEnter={() => setActiveNodeIdx(idx)}
                    className="cursor-pointer"
                  >
                    <motion.div
                      className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${
                        isActive
                          ? 'bg-[#0b1329] border-emerald-400 shadow-glow text-emerald-400 w-44'
                          : 'border-border/60 bg-card/40 text-muted-foreground w-40 hover:border-primary/40'
                      }`}
                      whileHover={{ scale: 1.04 }}
                    >
                      <span className="text-[9px] font-mono opacity-60 uppercase tracking-wider">
                        {node.owner.split(' ')[0]}
                      </span>
                      <h4 className="text-xs font-bold text-foreground mt-1 text-center whitespace-nowrap overflow-hidden text-ellipsis w-full px-1">
                        {node.title}
                      </h4>
                      <span className="text-[9px] font-mono text-muted-foreground mt-1.5 block">
                        {node.timestamp.split(' ')[1]}
                      </span>

                      {/* Status dot */}
                      <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </motion.div>
                  </div>

                  {/* Flow connecting line */}
                  {idx < provenanceTimeline.length - 1 && (
                    <div className="relative w-8 h-[1.5px] bg-border/50 flex items-center shrink-0">
                      {!reduce && isPast && (
                        <motion.div
                          className="absolute h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-glow"
                          initial={{ left: '0%' }}
                          animate={{ left: '100%' }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: idx * 0.15,
                            ease: 'linear',
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Ledger Details Inspector Block */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
          {/* Cryptographic Inspector (resembles blockchain block detail) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <GlassCard className="border-emerald-500/20 bg-[#0b1329]/80 p-6 md:p-8 shadow-glow relative">
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-emerald-400" />

                  {/* Inspector Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
                    <div className="flex items-center gap-3">
                      <Fingerprint className="h-6 w-6 text-emerald-400" />
                      <div>
                        <h3 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
                          Ledger Audit Block
                          <span className="text-xs font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                            VERIFIED
                          </span>
                        </h3>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">
                          TxHash: {activeNode.signature}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block">
                        Record Quality Score
                      </span>
                      <span className="text-lg font-bold text-emerald-400 font-mono">
                        {activeNode.qualityScore}%
                      </span>
                    </div>
                  </div>

                  {/* Block Metadata Grid */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 text-xs">
                    <div className="flex items-center gap-3 bg-secondary/35 p-3 rounded-lg border border-border/50">
                      <User className="h-4 w-4 text-emerald-400 shrink-0" />
                      <div className="flex-1 overflow-hidden">
                        <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground block">
                          Executing Agent / Operator
                        </span>
                        <span className="font-semibold text-foreground font-mono block truncate">
                          {activeNode.operator}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-secondary/35 p-3 rounded-lg border border-border/50">
                      <History className="h-4 w-4 text-emerald-400 shrink-0" />
                      <div className="flex-1 overflow-hidden">
                        <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground block">
                          Timestamp UTC
                        </span>
                        <span className="font-semibold text-foreground font-mono block">
                          {activeNode.timestamp}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-secondary/35 p-3 rounded-lg border border-border/50">
                      <FileKey className="h-4 w-4 text-emerald-400 shrink-0" />
                      <div className="flex-1 overflow-hidden">
                        <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground block">
                          Dataset Version Tag
                        </span>
                        <span className="font-semibold text-foreground font-mono block">
                          {activeNode.version}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-secondary/35 p-3 rounded-lg border border-border/50">
                      <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                      <div className="flex-1 overflow-hidden">
                        <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground block">
                          Institution Owner
                        </span>
                        <span className="font-semibold text-foreground block truncate">
                          {activeNode.owner}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Verification Proof Terminal */}
                  <div className="mt-6 border-t border-border/60 pt-6">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground block mb-2">
                      Ledger Signature Hash Check
                    </span>
                    <div className="bg-black/60 p-4 rounded-xl border border-border/50 font-mono text-[11px] leading-relaxed text-muted-foreground relative overflow-hidden">
                      <div className="flex items-center justify-between text-emerald-400 border-b border-border/40 pb-2 mb-2">
                        <span>sha256sum --check</span>
                        <span>OK</span>
                      </div>
                      <p>
                        <span className="text-foreground font-bold">Signature: </span>
                        {activeNode.signature}e92b8cdbcf22a019ba71f
                      </p>
                      <p className="mt-1">
                        <span className="text-foreground font-bold">State Checksum: </span>
                        f8194a2bcce99d10e82bbacdf9aee401cfb9021e8acdbd22a0918bbcefba201
                      </p>
                      <div className="absolute right-3 bottom-3 opacity-10">
                        <Fingerprint className="h-16 w-16" />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Cryptographic Ledger Cards (Github style combined with Blockchain explorer) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground px-2 flex items-center gap-2">
              <FileText className="h-4.5 w-4.5 text-emerald-400" />
              Sovereign Governance Block
            </h4>

            <GlassCard className="p-5 border-border/80 bg-secondary/20 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground">Source Institution</span>
                <span className="text-xs font-semibold text-foreground">National Archives of Zimbabwe</span>
              </div>
              <div className="flex justify-between items-center border-t border-border/45 pt-3">
                <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground">Ownership Status</span>
                <span className="text-xs font-mono font-bold text-primary">INSTITUTION_OWNED</span>
              </div>
              <div className="flex justify-between items-center border-t border-border/45 pt-3">
                <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground">Data Custodian</span>
                <span className="text-xs font-semibold text-foreground">Archives Curator Node</span>
              </div>
              <div className="flex justify-between items-center border-t border-border/45 pt-3">
                <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground">Privacy Status</span>
                <span className="text-xs font-mono font-bold text-emerald-400">PII_SCRUBBED_GDPR</span>
              </div>
              <div className="flex justify-between items-center border-t border-border/45 pt-3">
                <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground">Validation Status</span>
                <span className="text-xs font-mono font-bold text-primary">PASSED_VALIDATION</span>
              </div>
              <div className="flex justify-between items-center border-t border-border/45 pt-3">
                <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground">Last Audit</span>
                <span className="text-xs font-semibold text-foreground">2026-07-25 09:12:30</span>
              </div>
              <div className="flex justify-between items-center border-t border-border/45 pt-3">
                <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground">Quality Score</span>
                <span className="text-xs font-mono font-bold text-primary">99.82% Composite</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
