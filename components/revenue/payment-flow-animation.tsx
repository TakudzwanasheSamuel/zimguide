'use client';

import { GlassCard } from '@/components/site/section';
import { Landmark, FileText, Users, Cpu, Coins, KeyRound, Wallet, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function PaymentFlowAnimation() {
  const nodes = [
    { label: 'Institution', icon: Landmark },
    { label: 'Dataset Published', icon: FileText },
    { label: 'Developer Sub', icon: Users },
    { label: 'API Usage', icon: Cpu },
    { label: 'Revenue Calc', icon: KeyRound },
    { label: 'Royalty Engine', icon: Coins },
    { label: 'Institution Wallet', icon: Wallet },
  ];

  return (
    <section id="payment-flow" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Coins className="h-4.5 w-4.5 text-primary" />
          Monetization & Payout Cycle
        </h3>
        <p className="text-xs text-muted-foreground">
          Interactive trace mapping dataset ingestion, consumer subscription API usage, and wallet payouts.
        </p>
      </div>

      <GlassCard className="p-6 md:p-8 border-border/80 bg-card/40 shadow-glow" hover={false}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
          
          {nodes.map((node, idx) => {
            const NodeIcon = node.icon;
            const isLast = idx === nodes.length - 1;

            return (
              <div key={node.label} className="flex flex-col items-center text-center gap-3 relative flex-1">
                
                {/* Visual connecting line with animated dot */}
                {!isLast && (
                  <div className="hidden md:block absolute top-[18px] left-[60%] right-[-40%] h-[2px] bg-secondary/80 overflow-hidden">
                    {/* Animating money dot */}
                    <motion.div
                      className="h-full w-2.5 bg-primary"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: idx * 0.35 }}
                    />
                  </div>
                )}

                <div className="grid h-10 w-10 place-items-center rounded-xl border border-primary/25 bg-[#0b1329]/80 text-primary z-10 shadow-glow animate-pulse">
                  <NodeIcon className="h-5 w-5" />
                </div>

                <div>
                  <span className="text-[10px] font-mono font-bold text-foreground">
                    {node.label}
                  </span>
                  <span className="text-[8px] font-mono text-muted-foreground block mt-0.5 uppercase tracking-wider">
                    Stage 0{idx + 1}
                  </span>
                </div>

              </div>
            );
          })}

        </div>
      </GlassCard>
    </section>
  );
}
