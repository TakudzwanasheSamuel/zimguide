'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/site/section';
import { Binary, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { aiApi } from '@/lib/ai-api';
import type { VectorNode } from '@/lib/ai-types';

const DEFAULT_QUERY = 'National sovereignty and historical documents';

export function VectorSearch() {
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [loading, setLoading] = useState(false);
  const [nodes, setNodes] = useState<VectorNode[]>([]);
  const [centerLabel, setCenterLabel] = useState(`Query: "${DEFAULT_QUERY}"`);
  const [selectedNode, setSelectedNode] = useState<VectorNode | null>(null);

  const centerNode = { cx: 250, cy: 180 };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await aiApi.vectors(query, 6);
      setNodes(data.nodes);
      setCenterLabel(data.center_label);
      setSelectedNode(null);
    } catch {
      setNodes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="vector-search" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Binary className="h-4.5 w-4.5 text-primary" />
          Semantic Vector Space Visualization
        </h3>
        <p className="text-xs text-muted-foreground">
          Interactive embedding space mapping dataset proximity to search query vectors (cosine similarity).
        </p>
      </div>

      <div className="mb-4 flex gap-2 px-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-secondary/35 border border-border/80 rounded-lg h-9 px-3 text-xs font-mono focus:outline-none focus:border-primary/45"
          placeholder="Enter search query..."
        />
        <Button size="sm" onClick={handleSearch} disabled={loading} className="text-xs h-9">
          {loading ? 'Mapping...' : 'Visualize'}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <GlassCard className="h-full border-border/80 bg-black/35 p-6 flex flex-col shadow-glow" hover={false}>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3">
              Cosine Similarity Space Map
            </h4>

            <div className="relative mt-6 flex justify-center items-center h-[22rem] bg-secondary/15 rounded-xl border border-border/60 overflow-hidden">
              {nodes.length === 0 && !loading ? (
                <span className="text-xs text-muted-foreground font-mono">Run a query to visualize embedding space</span>
              ) : (
                <svg className="w-full h-full max-w-[500px]" viewBox="0 0 500 350">
                  <circle cx={centerNode.cx} cy={centerNode.cy} r={60} fill="none" stroke="hsl(var(--border) / 0.7)" strokeWidth={1} strokeDasharray="3 3" />
                  <circle cx={centerNode.cx} cy={centerNode.cy} r={120} fill="none" stroke="hsl(var(--border) / 0.5)" strokeWidth={1} strokeDasharray="4 4" />
                  <circle cx={centerNode.cx} cy={centerNode.cy} r={180} fill="none" stroke="hsl(var(--border) / 0.3)" strokeWidth={1} strokeDasharray="5 5" />

                  {nodes.map((node) => (
                    <line key={`line-${node.id}`} x1={centerNode.cx} y1={centerNode.cy} x2={node.cx} y2={node.cy}
                      stroke="hsl(var(--border) / 0.8)" strokeWidth={1.5} strokeDasharray="5 3" />
                  ))}

                  <circle cx={centerNode.cx} cy={centerNode.cy} r={14} fill="hsl(var(--primary))" opacity={0.9} />
                  <text x={centerNode.cx} y={centerNode.cy + 30} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize={8} fontFamily="monospace">
                    Query
                  </text>

                  {nodes.map((node) => (
                    <g key={node.id} onClick={() => setSelectedNode(node)} className="cursor-pointer">
                      <circle cx={node.cx} cy={node.cy} r={selectedNode?.id === node.id ? 12 : 9}
                        fill={node.color} opacity={selectedNode?.id === node.id ? 1 : 0.75}
                        stroke={selectedNode?.id === node.id ? '#fff' : 'none'} strokeWidth={2} />
                      <text x={node.cx} y={node.cy - 14} textAnchor="middle" fill="hsl(var(--foreground))" fontSize={7} fontFamily="monospace">
                        {(node.score * 100).toFixed(0)}%
                      </text>
                    </g>
                  ))}
                </svg>
              )}
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <GlassCard className="h-full border-border/80 bg-card/40 p-6 shadow-glow" hover={false}>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Node Inspector
            </h4>
            {selectedNode ? (
              <div className="mt-5 space-y-3">
                <h5 className="text-sm font-bold text-foreground">{selectedNode.name}</h5>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{selectedNode.description}</p>
                <div className="text-[10px] font-mono">
                  <span className="text-muted-foreground">Cosine Similarity: </span>
                  <span className="text-primary font-bold">{(selectedNode.score * 100).toFixed(1)}%</span>
                </div>
              </div>
            ) : (
              <p className="mt-5 text-xs text-muted-foreground">
                {centerLabel || 'Select a node to inspect dataset details and similarity score.'}
              </p>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
