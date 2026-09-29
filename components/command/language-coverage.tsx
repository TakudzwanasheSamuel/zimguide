'use client';

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { languageCoverageList } from '@/lib/command-data';
import { GlassCard } from '@/components/site/section';
import { Sparkles, MessageSquare, Landmark, Layers } from 'lucide-react';

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.75rem',
  fontSize: '0.8rem',
  color: 'hsl(var(--foreground))',
};

export function LanguageCoverage() {
  const topLanguages = languageCoverageList.slice(0, 3);
  const otherLanguages = languageCoverageList.slice(3);

  const colors = ['#0ea5e9', '#00C6A7', '#10B981', '#F59E0B', '#D946EF', '#EC4899', '#6366F1'];

  return (
    <section id="language-coverage" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <MessageSquare className="h-4.5 w-4.5 text-primary" />
          Sovereign Linguistic Coverage
        </h3>
        <p className="text-xs text-muted-foreground">
          Telemetry profiling the language ratios processed, tagged, and anonymized inside the ingestion gateway.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        
        {/* Left Column: Top Languages Pie Chart */}
        <div className="lg:col-span-5 flex flex-col">
          <GlassCard className="p-6 h-[22rem] md:h-full flex flex-col justify-between border-border/80 bg-card/40 shadow-glow" hover={false}>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-primary" />
              Primary Languages Share
            </h4>

            <div className="h-[12rem] mt-6 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topLanguages}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="percentage"
                    nameKey="name"
                  >
                    {topLanguages.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend info */}
            <div className="mt-4 pt-3.5 border-t border-border/40 text-[10px] font-mono text-slate-300 grid grid-cols-3 gap-2">
              {topLanguages.map((item, idx) => (
                <div key={item.name} className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: colors[idx % colors.length] }} />
                  <span className="truncate">{item.name} ({item.percentage}%)</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Other Languages Bar Chart */}
        <div className="lg:col-span-7 flex flex-col">
          <GlassCard className="p-6 h-[22rem] md:h-full flex flex-col justify-between border-border/80 bg-card/40 shadow-glow" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Minority Languages Datasets Count
              </h4>
            </div>

            <div className="h-[12rem] mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={otherLanguages} margin={{ left: -22, right: 8, top: 8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="datasets" fill="#00C6A7" radius={[4, 4, 0, 0]} name="Datasets">
                    {otherLanguages.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={colors[(idx + 3) % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="border-t border-border/40 pt-3 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span>Includes secondary national linguistic registers.</span>
              <span className="flex items-center gap-1 text-primary">
                <Landmark className="h-3.5 w-3.5" />
                Archive Verified
              </span>
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
