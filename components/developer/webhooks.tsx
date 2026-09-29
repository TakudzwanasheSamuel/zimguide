'use client';

import { webhooksLogs } from '@/lib/developer-data';
import { GlassCard } from '@/components/site/section';
import { Radio, ShieldCheck, Link2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Webhooks() {
  return (
    <section id="webhooks" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
            <Radio className="h-4.5 w-4.5 text-primary" />
            Asynchronous Webhooks Ingestion Logs
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time webhook notification feeds routing pipeline status completions to registered listener endpoints.
          </p>
        </div>
        <Button size="sm" variant="outline" className="w-full sm:w-auto h-9 text-xs font-semibold mt-3 sm:mt-0 glass">
          Add Webhook Listener
        </Button>
      </div>

      <GlassCard className="border-border/80 bg-card/40 overflow-hidden shadow-glow" hover={false}>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/60 bg-secondary/35 text-[10px] font-mono uppercase tracking-widest text-muted-foreground select-none">
                <th className="py-4 px-5 font-semibold">Event Identifier</th>
                <th className="py-4 px-4 font-semibold">Target Listener Endpoint</th>
                <th className="py-4 px-4 font-semibold text-center">HTTP Status</th>
                <th className="py-4 px-4 font-semibold text-center">Deliveries</th>
                <th className="py-4 px-4 font-semibold text-center">Retry Attempts</th>
                <th className="py-4 px-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-medium font-mono text-[11px] leading-relaxed">
              {webhooksLogs.map((log) => {
                const is2xx = log.status === 200;

                return (
                  <tr key={log.event} className="hover:bg-secondary/15 transition-colors">
                    
                    {/* Event name */}
                    <td className="py-4 px-5 font-semibold text-foreground hover:text-primary transition-colors">
                      {log.event}
                    </td>

                    {/* Endpoint URL */}
                    <td className="py-4 px-4 text-muted-foreground font-semibold flex items-center gap-1.5 max-w-xs truncate">
                      <Link2 className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                      {log.endpoint}
                    </td>

                    {/* HTTP Status */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 font-bold ${
                        is2xx ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${is2xx ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                        {log.status}
                      </span>
                    </td>

                    {/* Deliveries */}
                    <td className="py-4 px-4 text-center text-foreground/90 font-semibold">
                      {log.deliveries}
                    </td>

                    {/* Retries */}
                    <td className="py-4 px-4 text-center">
                      <span className={`font-semibold ${log.retries > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                        {log.retries}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded hover:bg-secondary text-muted-foreground hover:text-primary" title="Test Webhook Endpoint">
                          <RefreshCw className="h-3.5 w-3.5" />
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
