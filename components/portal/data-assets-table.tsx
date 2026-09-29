'use client';

import { dataAssets } from '@/lib/portal-data';
import { GlassCard } from '@/components/site/section';
import { Shield, Eye, Download, Coins, BarChart3, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DataAssetsTable() {
  return (
    <section id="data-assets" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
            <Shield className="h-4.5 w-4.5 text-primary" />
            Published Institutional Data Assets
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Data models built, sanitised, and indexed for LLM queries or direct downloading.
          </p>
        </div>
        <Button size="sm" className="w-full sm:w-auto h-9 text-xs mt-3 sm:mt-0 font-medium">
          Create New Asset
        </Button>
      </div>

      <GlassCard className="border-border/80 bg-card/40 overflow-hidden shadow-glow">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/60 bg-secondary/35 text-[10px] font-mono uppercase tracking-widest text-muted-foreground select-none">
                <th className="py-4 px-5 font-semibold">Dataset Identifier</th>
                <th className="py-4 px-4 font-semibold text-center">Version</th>
                <th className="py-4 px-4 font-semibold text-center">Managed Records</th>
                <th className="py-4 px-4 font-semibold text-center">Quality Score</th>
                <th className="py-4 px-4 font-semibold text-center">Classification</th>
                <th className="py-4 px-4 font-semibold text-center">Downloads</th>
                <th className="py-4 px-4 font-semibold text-right">Revenue</th>
                <th className="py-4 px-4 font-semibold text-center">Ingestion Status</th>
                <th className="py-4 px-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-medium">
              {dataAssets.map((asset) => {
                const isConfidential = asset.classification === 'Confidential';
                const isRestricted = asset.classification === 'Restricted';
                const isPublished = asset.status === 'Published';
                const isProcessing = asset.status === 'Processing';

                return (
                  <tr key={asset.id} className="hover:bg-secondary/15 transition-colors">
                    {/* Dataset Name */}
                    <td className="py-4 px-5">
                      <span className="font-semibold text-foreground hover:text-primary transition-colors block max-w-sm truncate">
                        {asset.name}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground mt-0.5 block">
                        ID: {asset.id}
                      </span>
                    </td>

                    {/* Version */}
                    <td className="py-4 px-4 text-center font-mono text-foreground/80">
                      {asset.version}
                    </td>

                    {/* Records */}
                    <td className="py-4 px-4 text-center font-semibold text-foreground/90">
                      {asset.records}
                    </td>

                    {/* Quality Circle */}
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="font-bold font-mono text-primary">{asset.quality}%</span>
                      </div>
                    </td>

                    {/* Classification */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        isConfidential
                          ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                          : isRestricted
                          ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                          : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      }`}>
                        {asset.classification}
                      </span>
                    </td>

                    {/* Downloads */}
                    <td className="py-4 px-4 text-center font-mono text-foreground/80 flex items-center justify-center gap-1">
                      <Download className="h-3 w-3 text-muted-foreground" />
                      {asset.downloads.toLocaleString()}
                    </td>

                    {/* Revenue */}
                    <td className="py-4 px-4 text-right font-bold text-emerald-400 font-mono">
                      {asset.revenue}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-semibold uppercase ${
                        isPublished
                          ? 'text-emerald-400'
                          : isProcessing
                          ? 'text-sky-400'
                          : 'text-muted-foreground'
                      }`}>
                        {isPublished && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                        {isProcessing && <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />}
                        {asset.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded hover:bg-secondary text-muted-foreground hover:text-foreground" title="Manage Dataset">
                          <Shield className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded hover:bg-secondary text-muted-foreground hover:text-foreground" title="Preview Schema">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded hover:bg-secondary text-muted-foreground hover:text-primary" title="Financial Analytics">
                          <BarChart3 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
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
