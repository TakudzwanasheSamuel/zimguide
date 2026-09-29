'use client';

import { billingUsage } from '@/lib/developer-data';
import { GlassCard } from '@/components/site/section';
import { CreditCard, HardDrive, Download, Cpu, Coins, DownloadCloud, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';

export function UsageBilling() {
  return (
    <section id="usage-billing" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <CreditCard className="h-4.5 w-4.5 text-primary" />
          Usage & Subscription Billing
        </h3>
        <p className="text-xs text-muted-foreground">
          Monitor your active subscription allocations, monthly API calls, storage bandwidth, and generated invoices.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        
        {/* Left: Usage Progress bars */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-border/80 bg-card/40" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3 flex items-center justify-between">
                <span>Resource Allocation Limits</span>
                <span className="text-primary font-bold text-[10px]">{billingUsage.plan}</span>
              </h4>

              <div className="space-y-6 mt-6 text-xs">
                {/* API Calls */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 font-medium">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Cpu className="h-3.5 w-3.5 text-primary" />
                      Monthly API Calls
                    </span>
                    <span className="font-semibold text-foreground font-mono">{billingUsage.apiCalls}</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary/80 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-brand"
                      initial={{ width: 0 }}
                      whileInView={{ width: '28.4%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>

                {/* Storage */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 font-medium">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <HardDrive className="h-3.5 w-3.5 text-primary" />
                      Vector Storage Bandwidth
                    </span>
                    <span className="font-semibold text-foreground font-mono">{billingUsage.storageUsed}</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary/80 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-brand"
                      initial={{ width: 0 }}
                      whileInView={{ width: '42.8%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1 }}
                    />
                  </div>
                </div>

                {/* Downloads */}
                <div>
                  <div className="flex justify-between items-center mb-1.5 font-medium">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Download className="h-3.5 w-3.5 text-primary" />
                      Bulk Set Downloads
                    </span>
                    <span className="font-semibold text-foreground font-mono">{billingUsage.downloadsUsed}</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary/80 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-brand"
                      initial={{ width: 0 }}
                      whileInView={{ width: '42%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>

              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right: Spent & Invoices */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-primary/20 bg-[#0b1329]/50 shadow-glow" hover={false}>
            <div>
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                  <Coins className="h-3.5 w-3.5 text-primary" />
                  Monthly Accumulation
                </h4>
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  {billingUsage.spendingMonth}
                </span>
              </div>

              {/* Invoices list */}
              <div className="mt-6 space-y-3.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block">
                  Recent Invoices
                </span>
                
                <div className="space-y-2">
                  {billingUsage.invoices.map((inv) => (
                    <div key={inv.id} className="flex items-center justify-between bg-secondary/20 border border-border/80 rounded-lg p-2.5 text-xs font-mono">
                      <span className="text-slate-300 flex items-center gap-1.5 font-bold">
                        <Receipt className="h-3.5 w-3.5 text-muted-foreground" />
                        {inv.id}
                      </span>
                      <span className="text-slate-400">{inv.date}</span>
                      <span className="font-bold text-foreground">{inv.amount}</span>
                      <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                        {inv.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
