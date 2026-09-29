'use client';

import { Treemap, Tooltip, ResponsiveContainer } from 'recharts';
import { dataCoverageSectors } from '@/lib/command-data';
import { GlassCard } from '@/components/site/section';
import { Database, TrendingUp, Sparkles, FolderHeart } from 'lucide-react';

const tooltipStyle = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: '0.75rem',
  fontSize: '0.8rem',
  color: 'hsl(var(--foreground))',
};

// Customized content renderer for Treemap cells
function CustomizedContent({
  root,
  depth,
  x,
  y,
  width,
  height,
  index,
  colors,
  name,
  datasets,
  coverage,
}: any) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: colors[index % colors.length],
          stroke: 'hsl(var(--card))',
          strokeWidth: 1.5,
          opacity: 0.85,
        }}
      />
      {width > 60 && height > 40 && (
        <text
          x={x + 8}
          y={y + 18}
          fill="#ffffff"
          fontSize={10}
          fontWeight="bold"
          className="select-none font-sans"
        >
          {name}
        </text>
      )}
      {width > 60 && height > 55 && (
        <text
          x={x + 8}
          y={y + 32}
          fill="rgba(255, 255, 255, 0.7)"
          fontSize={9}
          className="select-none font-mono"
        >
          {datasets} sets ({coverage}%)
        </text>
      )}
    </g>
  );
}

export function DataCoverage() {
  const colors = ['#0ea5e9', '#00C6A7', '#10B981', '#F59E0B', '#D946EF', '#EC4899', '#6366F1'];

  return (
    <section id="data-coverage" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <FolderHeart className="h-4.5 w-4.5 text-primary" />
          Sector Data Coverage Treemap
        </h3>
        <p className="text-xs text-muted-foreground">
          Proportional representation of datasets compiled across national development priorities (NDS1 sectors).
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        
        {/* Treemap Column */}
        <div className="lg:col-span-8 flex flex-col">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-border/80 bg-card/40 shadow-glow" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3">
                NDS1 Sector Data Weights
              </h4>
            </div>

            <div className="h-[16rem] mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={dataCoverageSectors}
                  dataKey="value"
                  stroke="#fff"
                  fill="#8884d8"
                  content={<CustomizedContent colors={colors} />}
                >
                  <Tooltip contentStyle={tooltipStyle} />
                </Treemap>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Details Column */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-primary/20 bg-[#0b1329]/50 shadow-glow" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Sector Coverage Metrics
              </h4>
              
              <div className="mt-4 space-y-3">
                {dataCoverageSectors.slice(0, 4).map((sect) => (
                  <div key={sect.name} className="flex items-center justify-between bg-secondary/30 p-2.5 rounded-lg border border-border/60 text-xs font-mono">
                    <span className="text-slate-300 font-bold">{sect.name}</span>
                    <span className="text-muted-foreground">{sect.datasets} datasets</span>
                    <span className="text-emerald-400 font-bold flex items-center">
                      <TrendingUp className="h-3 w-3 mr-0.5" />
                      {sect.growth}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
