'use client';

import { GlassCard } from '@/components/site/section';
import { Network, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface NetworkNode {
  label: string;
  cx: number;
  cy: number;
  color: string;
}

export function PartnershipNetwork() {
  const nodes: NetworkNode[] = [
    { label: 'Universities', cx: 120, cy: 80, color: '#0ea5e9' },
    { label: 'Government', cx: 380, cy: 80, color: '#00C6A7' },
    { label: 'Datasets', cx: 100, cy: 220, color: '#10B981' },
    { label: 'APIs', cx: 400, cy: 220, color: '#F59E0B' },
    { label: 'Developers', cx: 200, cy: 280, color: '#D946EF' },
    { label: 'Companies', cx: 300, cy: 280, color: '#EC4899' },
    { label: 'Research', cx: 250, cy: 60, color: '#6366F1' },
  ];

  const centerNode = { label: 'ZimGuide Core', cx: 250, cy: 180 };

  return (
    <section id="partnership-network" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Network className="h-4.5 w-4.5 text-primary" />
          Sovereign Partnership Network Graph
        </h3>
        <p className="text-xs text-muted-foreground">
          Real-time network node map depicting active integrations between academic units, companies, and database replication nodes.
        </p>
      </div>

      <GlassCard className="p-6 md:p-8 border-border/80 bg-card/40 shadow-glow" hover={false}>
        <div className="flex justify-center items-center h-[24rem] bg-secondary/15 rounded-xl border border-border/60 overflow-hidden relative">
          
          <svg className="w-full h-full max-w-[500px]" viewBox="0 0 500 350">
            {/* Connecting lines */}
            {nodes.map((node) => (
              <line
                key={`line-${node.label}`}
                x1={centerNode.cx}
                y1={centerNode.cy}
                x2={node.cx}
                y2={node.cy}
                stroke="hsl(var(--border) / 0.8)"
                strokeWidth={1.5}
                strokeDasharray="5 3"
              />
            ))}

            {/* Orbiting Nodes circles */}
            {nodes.map((node) => (
              <g key={node.label}>
                {/* Glow ring */}
                <circle cx={node.cx} cy={node.cy} r={12} fill="none" stroke={node.color} strokeWidth={2} className="opacity-40 animate-ping" style={{ transformOrigin: `${node.cx}px ${node.cy}px` }} />
                <circle cx={node.cx} cy={node.cy} r={7} fill={node.color} />
                
                {/* Label text */}
                <text
                  x={node.cx}
                  y={node.cy + 18}
                  fill="rgba(255, 255, 255, 0.7)"
                  fontSize={8}
                  fontWeight="bold"
                  textAnchor="middle"
                  className="select-none font-mono"
                >
                  {node.label.toUpperCase()}
                </text>
              </g>
            ))}

            {/* Center Core Node */}
            <circle cx={centerNode.cx} cy={centerNode.cy} r={14} fill="hsl(var(--primary))" />
            <circle cx={centerNode.cx} cy={centerNode.cy} r={20} fill="none" stroke="hsl(var(--primary))" strokeWidth={2} className="animate-pulse" style={{ transformOrigin: `${centerNode.cx}px ${centerNode.cy}px` }} />
            <text
              x={centerNode.cx}
              y={centerNode.cy + 30}
              fill="#ffffff"
              fontSize={9}
              fontWeight="bold"
              textAnchor="middle"
              className="select-none font-sans"
            >
              DATA CORE
            </text>
          </svg>

          {/* Validation legend */}
          <div className="absolute bottom-3 right-3 bg-primary/5 border border-primary/25 rounded-lg p-2.5 flex items-center gap-2 select-none">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0 animate-pulse" />
            <span className="text-[9px] font-mono text-muted-foreground">All connections mTLS secured.</span>
          </div>

        </div>
      </GlassCard>
    </section>
  );
}
