'use client';

import { useState } from 'react';
import { walletTransactions } from '@/lib/revenue-data';
import { GlassCard } from '@/components/site/section';
import { Wallet, ShieldCheck, Download, ArrowRight, Landmark, Receipt, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function InstitutionWallet() {
  const [withdrawing, setWithdrawing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleWithdraw = () => {
    setWithdrawing(true);
    setSuccess(false);
    setTimeout(() => {
      setWithdrawing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1200);
  };

  return (
    <section id="institution-wallet" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Wallet className="h-4.5 w-4.5 text-primary" />
          Institutional Royalty Wallet Console
        </h3>
        <p className="text-xs text-muted-foreground">
          Track balances, request withdrawals, and audit payouts settled under the sovereign data sharing agreements.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        
        {/* Wallet Balances Column */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-primary/20 bg-[#0b1329]/50 shadow-glow" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3">
                Wallet Balance Ledger
              </h4>

              <div className="space-y-4 mt-6 text-xs">
                {/* Available Balance */}
                <div className="bg-secondary/30 p-4 rounded-xl border border-primary/30">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">Available Payout Balance</span>
                  <div className="text-2xl font-extrabold text-primary mt-1 font-mono">US$4,285</div>
                </div>

                {/* Pending Payout */}
                <div className="bg-secondary/20 p-4.5 rounded-xl border border-border/60">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">Pending Allocation</span>
                  <div className="text-sm font-bold text-foreground mt-1 font-mono">US$1,240</div>
                </div>

                {/* Lifetime Earned */}
                <div className="bg-secondary/20 p-4.5 rounded-xl border border-border/60">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">Lifetime Royalties Received</span>
                  <div className="text-sm font-bold text-foreground mt-1 font-mono">US$8,400</div>
                </div>
              </div>
            </div>

            {/* Withdraw Button */}
            <div className="mt-8 pt-4 border-t border-border/50">
              <Button
                onClick={handleWithdraw}
                disabled={withdrawing}
                className="w-full h-10 text-xs font-semibold gap-2 shadow-glow hover:shadow-primary/30"
              >
                <Landmark className="h-4 w-4" />
                {withdrawing ? 'Settling Bank Wire...' : success ? 'Wire Transferred!' : 'Withdraw Funds'}
              </Button>
              {success && (
                <div className="text-[10px] text-emerald-400 font-mono text-center mt-2 flex items-center justify-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Sent to National Archives replication bank account.
                </div>
              )}
            </div>

          </GlassCard>
        </div>

        {/* Transaction History Column */}
        <div className="lg:col-span-8 flex flex-col">
          <GlassCard className="border-border/80 bg-card/40 overflow-hidden shadow-glow h-full flex flex-col justify-between" hover={false}>
            
            <div className="overflow-x-auto w-full flex-1">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border/60 bg-secondary/35 text-[10px] font-mono uppercase tracking-widest text-muted-foreground select-none">
                    <th className="py-4 px-5 font-semibold">Date</th>
                    <th className="py-4 px-4 font-semibold">Customer App</th>
                    <th className="py-4 px-4 font-semibold">Dataset Consumed</th>
                    <th className="py-4 px-4 font-semibold text-right">Licensing Fee</th>
                    <th className="py-4 px-4 font-semibold text-right">Royalty (70%)</th>
                    <th className="py-4 px-4 font-semibold text-center">Status</th>
                    <th className="py-4 px-5 font-semibold text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 font-medium font-mono text-[11px] leading-relaxed">
                  {walletTransactions.map((tx) => {
                    const isSettled = tx.status === 'Settled';
                    
                    return (
                      <tr key={tx.date + tx.dataset} className="hover:bg-secondary/15 transition-colors">
                        
                        <td className="py-4 px-5 text-slate-400">
                          {tx.date}
                        </td>

                        <td className="py-4 px-4 text-foreground font-semibold">
                          {tx.customer}
                        </td>

                        <td className="py-4 px-4 text-slate-300">
                          {tx.dataset}
                        </td>

                        <td className="py-4 px-4 text-right text-slate-400">
                          {tx.amount}
                        </td>

                        <td className="py-4 px-4 text-right text-emerald-400 font-bold">
                          {tx.royalty}
                        </td>

                        <td className="py-4 px-4 text-center">
                          <span className={`inline-flex items-center gap-1 text-[9px] font-mono font-semibold uppercase ${
                            isSettled ? 'text-emerald-400' : 'text-amber-400'
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${isSettled ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                            {tx.status}
                          </span>
                        </td>

                        <td className="py-4 px-5 text-right">
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded hover:bg-secondary text-muted-foreground hover:text-foreground" title="Download Invoice">
                            <Receipt className="h-3.5 w-3.5" />
                          </Button>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Verification Footer */}
            <div className="px-5 py-3 bg-secondary/20 border-t border-border/60 text-[10px] text-muted-foreground font-mono flex items-center justify-between">
              <span>Automatic wire withdrawals settle within 24 hours.</span>
              <span className="flex items-center gap-1 text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                Ledger Verified
              </span>
            </div>

          </GlassCard>
        </div>

      </div>
    </section>
  );
}
