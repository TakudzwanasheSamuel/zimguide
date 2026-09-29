'use client';

import { GlassCard } from '@/components/site/section';
import { ArrowRight, Coins, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export function RoyaltyFlow() {
  const steps = [
    { label: 'Developer Payments', desc: 'API Subscriptions & download fees.', amount: 'US$18.4K', status: 'Invoiced' },
    { label: 'Platform Revenue', desc: 'Gross compiled accounts logs.', amount: 'US$48.4K', status: 'Calculated' },
    { label: 'Revenue Sharing Engine', desc: 'Sovereign split execution node.', amount: '70% / 30%', status: 'Processed' },
    { label: 'Partner Institutions', desc: 'Allocated royalty ledger logs.', amount: 'US$33.9K', status: 'Assigned' },
    { label: 'Royalty Payments', desc: 'Bank payouts & settlements.', amount: 'US$28.4K', status: 'Settled' },
    { label: 'Institution Wallets', desc: 'Settled available balances.', amount: 'Active Wallets', status: 'Operational' },
  ];

  return (
    <section id="royalty-flow" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Coins className="h-4.5 w-4.5 text-primary" />
          Ecosystem Royalty Flow Pipeline
        </h3>
        <p className="text-xs text-muted-foreground">
          Step-by-step transaction pathway routing consumer subscription payments into partner institution wallets.
        </p>
      </div>

      <GlassCard className="p-6 md:p-8 border-border/80 bg-card/40 shadow-glow" hover={false}>
        {/* Responsive horizontal/vertical flow */}
        <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-6 relative">
          
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;

            return (
              <div key={step.label} className="relative flex flex-col justify-between bg-secondary/20 border border-border/60 p-4 rounded-xl h-full">
                
                {/* Connecting arrow for desktop */}
                {!isLast && (
                  <div className="hidden xl:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 bg-background border border-border/80 p-1.5 rounded-full shadow-soft text-primary">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-primary font-bold">
                      Step 0{idx + 1}
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">
                      {step.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-foreground mt-3 leading-tight group-hover:text-primary transition-colors">
                    {step.label}
                  </h4>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-normal pr-1">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border/40 text-xs font-mono font-bold text-slate-300">
                  {step.amount}
                </div>

              </div>
            );
          })}

        </div>

        {/* Verification banner */}
        <div className="mt-8 flex items-center gap-3 bg-primary/5 border border-primary/25 rounded-lg p-3">
          <ShieldCheck className="h-4.5 w-4.5 text-primary shrink-0" />
          <span className="text-[11px] text-muted-foreground">
            Royalty flow runs automatically on cryptographic ledgers, securing transparent split records.
          </span>
        </div>
      </GlassCard>
    </section>
  );
}
