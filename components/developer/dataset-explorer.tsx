'use client';

import { explorerItems } from '@/lib/developer-data';
import { GlassCard } from '@/components/site/section';
import { Database, ShieldCheck, Play, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DatasetExplorer() {
  const handleOpenPlayground = () => {
    const el = document.getElementById('api-playground');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="dataset-explorer" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Database className="h-4.5 w-4.5 text-primary" />
          Data Asset Ingestion Explorer
        </h3>
        <p className="text-xs text-muted-foreground">
          Index of premium, high-quality datasets verified for LLM vector models or direct endpoint consumption.
        </p>
      </div>

      <GlassCard className="border-border/80 bg-card/40 overflow-hidden shadow-glow" hover={false}>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/60 bg-secondary/35 text-[10px] font-mono uppercase tracking-widest text-muted-foreground select-none">
                <th className="py-4 px-5 font-semibold">Dataset / Package</th>
                <th className="py-4 px-4 font-semibold">Owner Institution</th>
                <th className="py-4 px-4 font-semibold text-center">Managed Records</th>
                <th className="py-4 px-4 font-semibold text-center">Access API</th>
                <th className="py-4 px-4 font-semibold text-center">API Latency</th>
                <th className="py-4 px-4 font-semibold text-center">Quality score</th>
                <th className="py-4 px-4 font-semibold text-center">Status</th>
                <th className="py-4 px-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-medium">
              {explorerItems.map((item) => {
                const isOnline = item.status === 'online';
                
                return (
                  <tr key={item.name} className="hover:bg-secondary/15 transition-colors">
                    
                    {/* Dataset Name */}
                    <td className="py-4 px-5">
                      <span className="font-semibold text-foreground hover:text-primary transition-colors block max-w-xs truncate">
                        {item.name}
                      </span>
                    </td>

                    {/* Owner Institution */}
                    <td className="py-4 px-4 text-muted-foreground">
                      {item.institution}
                    </td>

                    {/* Records */}
                    <td className="py-4 px-4 text-center font-mono text-foreground/80">
                      {item.records}
                    </td>

                    {/* API Type */}
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-foreground bg-secondary/40 border border-border/80 px-2 py-0.5 rounded text-[10px] font-mono">
                        {item.api}
                      </span>
                    </td>

                    {/* Latency */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-mono text-slate-300">
                        <Zap className="h-3.5 w-3.5 text-primary shrink-0" />
                        {item.latency}
                      </span>
                    </td>

                    {/* Quality */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-mono text-primary font-bold">
                        <Award className="h-3.5 w-3.5 text-primary shrink-0" />
                        {item.quality}%
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase ${
                        isOnline ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                        {item.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-5 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleOpenPlayground}
                        className="h-7 text-[10px] font-semibold gap-1 glass hover:bg-secondary/40"
                      >
                        <Play className="h-2.5 w-2.5 fill-current" />
                        Open Sandbox
                      </Button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </section>
  );
}
