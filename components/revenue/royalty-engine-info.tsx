'use client';

import { GlassCard } from '@/components/site/section';
import { ShieldCheck, Coins, Timer, HelpCircle, Server } from 'lucide-react';
import { motion } from 'framer-motion';

export function RoyaltyEngineInfo() {
  const allocation = [
    { label: 'Institutional Share', pct: 70, color: 'bg-emerald-400', desc: 'Sent directly to the wallets of the datatset owners (e.g. National Archives).' },
    { label: 'Platform Infrastructure Fee', pct: 20, color: 'bg-primary', desc: 'Retained for database replication, cleaning, mTLS security, and OCR tasks.' },
    { label: 'Ecosystem & Marketplace Fund', pct: 10, color: 'bg-amber-400', desc: 'Allocated for developer grants, API credits, and startup accelerators.' },
  ];

  return (
    <section id="royalty-engine-info" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Server className="h-4.5 w-4.5 text-primary" />
          Sovereign Royalty Allocation Infographic
        </h3>
        <p className="text-xs text-muted-foreground">
          Detailed overview of how gross revenues are split and managed under our legal MOU guidelines.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        
        {/* Left Column: Progress allocations */}
        <div className="lg:col-span-7 flex flex-col">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-border/80 bg-card/40" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3 flex items-center gap-1.5">
                <Coins className="h-3.5 w-3.5 text-primary" />
                Ecosystem Revenue Splits
              </h4>

              <div className="space-y-6 mt-6">
                {allocation.map((item) => (
                  <div key={item.label} className="text-xs">
                    <div className="flex justify-between items-center mb-1.5 font-medium">
                      <span className="text-foreground font-bold">{item.label}</span>
                      <span className="font-bold text-primary font-mono">{item.pct}%</span>
                    </div>
                    
                    <div className="h-1.5 w-full bg-secondary/80 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${item.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    
                    <p className="text-[10px] text-muted-foreground mt-1.5 leading-normal pr-1.5">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Visual infocard */}
        <div className="lg:col-span-5 flex flex-col">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-primary/20 bg-[#0b1329]/50 shadow-glow" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3 flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-primary" />
                Ecosystem Royalty Principles
              </h4>
              <p className="text-xs leading-relaxed text-muted-foreground mt-4">
                Zimbabwe&apos;s sovereign AI data ecosystem is built on the core principle of **fair reward and transparent allocation**.
              </p>
              
              <div className="mt-6 space-y-3.5 text-xs font-mono">
                <div className="bg-secondary/35 p-3 rounded-lg border border-border/80 flex items-center justify-between">
                  <span className="text-slate-400">Platform base commission:</span>
                  <span className="text-foreground font-bold">30% Max</span>
                </div>
                <div className="bg-secondary/35 p-3 rounded-lg border border-border/80 flex items-center justify-between">
                  <span className="text-slate-400">Institutional owner share:</span>
                  <span className="text-emerald-400 font-bold">70% Min</span>
                </div>
                <div className="bg-secondary/35 p-3 rounded-lg border border-border/80 flex items-center justify-between">
                  <span className="text-slate-400">Smart ledger sync cycles:</span>
                  <span className="text-foreground font-bold">Every 24h</span>
                </div>
              </div>
            </div>

            {/* Validation pass banner */}
            <div className="mt-8 flex items-center gap-2.5 bg-primary/5 border border-primary/25 rounded-lg p-3">
              <ShieldCheck className="h-4.5 w-4.5 text-primary shrink-0" />
              <span className="text-[10px] text-muted-foreground leading-normal">
                Ledger allocations are signed cryptographically by National Treasury replication nodes.
              </span>
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
