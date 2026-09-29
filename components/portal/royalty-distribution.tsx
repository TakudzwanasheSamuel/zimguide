'use client';

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { royaltyDistributionData } from '@/lib/portal-data';
import { GlassCard } from '@/components/site/section';
import { ShieldCheck, CircleDollarSign, Landmark, Award } from 'lucide-react';

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.75rem',
  fontSize: '0.8rem',
  color: 'hsl(var(--foreground))',
};

export function RoyaltyDistribution() {
  return (
    <section id="royalty-distribution" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <CircleDollarSign className="h-4.5 w-4.5 text-primary" />
          Royalty Allocation & Share Split
        </h3>
        <p className="text-xs text-muted-foreground">
          Detailed overview of revenue shares compiled from subscription licenses, model API searches, and bulk sets.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        
        {/* Pie Chart Column */}
        <div className="lg:col-span-5 flex flex-col">
          <GlassCard className="p-6 h-[20rem] flex flex-col justify-between border-border/80 bg-card/40 shadow-glow" hover={false}>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3">
              Distribution Channels Share
            </h4>

            <div className="h-[13rem] mt-6 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={royaltyDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                    nameKey="name"
                  >
                    {royaltyDistributionData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: 9 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Infographic Split Column */}
        <div className="lg:col-span-7 flex flex-col">
          <GlassCard className="p-6 md:p-8 h-full flex flex-col justify-between border-primary/20 bg-[#0b1329]/50 shadow-glow" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3">
                Sovereign Royalty Allocation MOU
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground mt-4">
                Under the standard ZimGuide sovereign partnership template, institutional owners retain the majority of licensing royalties generated.
              </p>
            </div>

            {/* Split Breakdown */}
            <div className="grid gap-4 sm:grid-cols-2 mt-6">
              
              {/* Institution Share */}
              <div className="flex items-start gap-3 bg-secondary/30 p-5 rounded-xl border border-primary/30 relative">
                <Landmark className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Institutional Share</span>
                  <div className="text-3xl font-extrabold text-primary mt-1 font-mono">70%</div>
                  <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                    Retained directly by National Archives of Zimbabwe for infrastructure and staff.
                  </p>
                </div>
              </div>

              {/* Platform Share */}
              <div className="flex items-start gap-3 bg-secondary/20 p-5 rounded-xl border border-border/80">
                <CircleDollarSign className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">ZimGuide Share</span>
                  <div className="text-3xl font-extrabold text-accent mt-1 font-mono">30%</div>
                  <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                    Allocated to cloud processing engines, security validation, and PII anonymizers.
                  </p>
                </div>
              </div>

            </div>

            {/* Verification message */}
            <div className="mt-6 flex items-center gap-3 bg-primary/5 border border-primary/25 rounded-lg p-3">
              <ShieldCheck className="h-4.5 w-4.5 text-primary shrink-0" />
              <span className="text-[11px] text-muted-foreground">
                Revenue splits are validated cryptographically by smart ledger blocks upon API consumer invoicing cycles.
              </span>
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
