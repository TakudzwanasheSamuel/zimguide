'use client';

import { datasetRevenuesList } from '@/lib/revenue-data';
import { GlassCard } from '@/components/site/section';
import { Landmark, Download, BarChart3, TrendingUp, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DatasetRevenueTable() {
  return (
    <section id="dataset-revenue" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
            <Landmark className="h-4.5 w-4.5 text-primary" />
            Dataset Revenue & Royalty Audit Ledgers
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Historical transaction allocations calculated across downloads, queries, and commercial licensing models.
          </p>
        </div>
        <Button size="sm" className="w-full sm:w-auto h-9 text-xs font-semibold mt-3 sm:mt-0 shadow-glow">
          Export Financial PDF
        </Button>
      </div>

      <GlassCard className="border-border/80 bg-card/40 overflow-hidden shadow-glow" hover={false}>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/60 bg-secondary/35 text-[10px] font-mono uppercase tracking-widest text-muted-foreground select-none">
                <th className="py-4 px-5 font-semibold">Dataset Identifier</th>
                <th className="py-4 px-4 font-semibold">Institution Partner</th>
                <th className="py-4 px-4 font-semibold text-center">Downloads</th>
                <th className="py-4 px-4 font-semibold text-center">API Calls</th>
                <th className="py-4 px-4 font-semibold text-center">Active Licenses</th>
                <th className="py-4 px-4 font-semibold text-right">Gross Revenue</th>
                <th className="py-4 px-4 font-semibold text-right">Paid Royalties</th>
                <th className="py-4 px-4 font-semibold text-center">YoY Trend</th>
                <th className="py-4 px-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-medium">
              {datasetRevenuesList.map((item) => {
                return (
                  <tr key={item.name} className="hover:bg-secondary/15 transition-colors">
                    
                    {/* Dataset name */}
                    <td className="py-4 px-5">
                      <span className="font-semibold text-foreground hover:text-primary transition-colors block max-w-xs truncate">
                        {item.name}
                      </span>
                    </td>

                    {/* Institution */}
                    <td className="py-4 px-4 text-muted-foreground">
                      {item.institution}
                    </td>

                    {/* Downloads */}
                    <td className="py-4 px-4 text-center font-mono text-foreground/80 flex items-center justify-center gap-1 mt-1 border-none">
                      <Download className="h-3 w-3 text-muted-foreground" />
                      {item.downloads.toLocaleString()}
                    </td>

                    {/* API Calls */}
                    <td className="py-4 px-4 text-center font-mono text-foreground/80">
                      {item.apiCalls}
                    </td>

                    {/* Licenses */}
                    <td className="py-4 px-4 text-center font-mono text-foreground/80">
                      {item.licenses}
                    </td>

                    {/* Gross revenue */}
                    <td className="py-4 px-4 text-right font-mono text-foreground/90">
                      {item.revenue}
                    </td>

                    {/* Royalty (70% split) */}
                    <td className="py-4 px-4 text-right font-bold text-emerald-400 font-mono">
                      {item.royalty}
                    </td>

                    {/* Trend */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-mono text-emerald-400 font-bold">
                        <TrendingUp className="h-3 w-3" />
                        {item.trend}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
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
