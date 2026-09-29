'use client';

import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { ShieldCheck, Award, Calendar, CheckSquare, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function ComplianceOverview() {
  const complianceItems = [
    { title: 'Privacy Compliance', desc: 'Conforms to Zimbabwe Cyber Security & Data Protection rules.', score: 99 },
    { title: 'Audit Status', desc: 'Weekly cryptographic audit sweeps processed.', score: 100 },
    { title: 'mTLS Encryption', desc: 'Strict mutual TLS security layers protecting nodes.', score: 98 },
    { title: 'PII Protection', desc: 'Automated entity anonymization cleans private logs.', score: 99 },
    { title: 'Metadata Standards', desc: 'Auto-tagging matches NDS1 classifications.', score: 96 },
    { title: 'Institution Agreements', desc: 'All connected entities bind under 70/30 MOUs.', score: 100 },
    { title: 'Access Policies', desc: 'Bearer key tokens govern query scopes.', score: 98 },
    { title: 'Retention Policies', desc: 'Replication files deleted upon MOU expirations.', score: 97 },
  ];

  return (
    <section id="compliance-overview" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <ShieldCheck className="h-4.5 w-4.5 text-primary" />
          Sovereign Compliance & Auditing
        </h3>
        <p className="text-xs text-muted-foreground">
          Audit dashboard verifying encryption levels, privacy masking, and standard compliance.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        
        {/* Compliance score card */}
        <div className="lg:col-span-4 flex flex-col">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-primary/20 bg-[#0b1329]/50 shadow-glow" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3">
                Overall Compliance Score
              </h4>
              
              <div className="mt-8 flex flex-col items-center justify-center text-center">
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-primary text-3xl font-extrabold font-mono shadow-glow animate-pulse">
                  98.6%
                </div>
                <span className="text-xs text-emerald-400 font-semibold mt-4">
                  GRADE A: Audit Approved
                </span>
              </div>
            </div>

            {/* Audit details */}
            <div className="mt-8 space-y-3 bg-secondary/35 p-4 rounded-xl border border-border/60 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center gap-1.5 font-mono">
                  <Calendar className="h-3.5 w-3.5" />
                  Last Audit
                </span>
                <span className="font-semibold text-foreground font-mono">July 20, 2026</span>
              </div>
              <div className="flex justify-between items-center border-t border-border/40 pt-3">
                <span className="text-slate-400 flex items-center gap-1.5 font-mono">
                  <Calendar className="h-3.5 w-3.5" />
                  Next Audit
                </span>
                <span className="font-semibold text-foreground font-mono">August 20, 2026</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Compliance checklist details */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground px-2 flex items-center gap-1.5">
            <CheckSquare className="h-3.5 w-3.5 text-primary" />
            Core Ingestion Auditing Tasks
          </h4>

          <StaggerGroup className="grid gap-4 sm:grid-cols-2" stagger={0.04}>
            {complianceItems.map((item) => (
              <StaggerItem key={item.title}>
                <GlassCard className="p-5 flex flex-col justify-between hover:border-primary/40 h-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-foreground leading-tight">{item.title}</h5>
                      <span className="text-[9px] font-mono font-bold bg-primary/10 border border-primary/20 text-primary px-1.5 py-0.5 rounded">
                        {item.score}% pass
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-muted-foreground mt-2.5">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/40 text-[9px] font-mono text-muted-foreground flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-primary" />
                    Verified compliant
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

      </div>
    </section>
  );
}
