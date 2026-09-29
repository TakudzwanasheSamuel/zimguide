'use client';

import { apiActivities } from '@/lib/portal-data';
import { GlassCard } from '@/components/site/section';
import { Terminal, Globe, Activity, Timer } from 'lucide-react';

export function RecentAPIActivity() {
  return (
    <section id="recent-api-activity" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Terminal className="h-4.5 w-4.5 text-primary" />
          Recent Developer API Query Activity
        </h3>
        <p className="text-xs text-muted-foreground">
          Real-time trace logs detailing API requests processed through security boundaries.
        </p>
      </div>

      <GlassCard className="border-border/80 bg-card/40 overflow-hidden shadow-glow">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/60 bg-secondary/35 text-[10px] font-mono uppercase tracking-widest text-muted-foreground select-none">
                <th className="py-4 px-5 font-semibold">API Consumer / Application</th>
                <th className="py-4 px-4 font-semibold">Routed Endpoint</th>
                <th className="py-4 px-4 font-semibold text-center">Requests (24h)</th>
                <th className="py-4 px-4 font-semibold text-center">Gateway Status</th>
                <th className="py-4 px-4 font-semibold text-center">Response Latency</th>
                <th className="py-4 px-4 font-semibold text-center">Origination Region</th>
                <th className="py-4 px-5 font-semibold text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-medium">
              {apiActivities.map((act) => {
                const is2xx = act.status === 200;
                
                return (
                  <tr key={act.id} className="hover:bg-secondary/15 transition-colors">
                    
                    {/* Consumer */}
                    <td className="py-4 px-5">
                      <span className="font-semibold text-foreground hover:text-primary transition-colors block font-mono">
                        {act.consumer}
                      </span>
                      <span className="text-[9px] font-mono text-muted-foreground mt-0.5 block">
                        TraceID: {act.id}
                      </span>
                    </td>

                    {/* Endpoint */}
                    <td className="py-4 px-4 font-mono text-foreground/80">
                      {act.endpoint}
                    </td>

                    {/* Requests count */}
                    <td className="py-4 px-4 text-center font-mono text-foreground font-semibold">
                      {act.requests.toLocaleString()}
                    </td>

                    {/* Status Code badge */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold ${
                        is2xx ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${is2xx ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                        {act.status} {is2xx ? 'OK' : 'DENIED'}
                      </span>
                    </td>

                    {/* Response Latency */}
                    <td className="py-4 px-4 text-center">
                      <span className="flex items-center justify-center gap-1 font-mono text-slate-300">
                        <Timer className="h-3.5 w-3.5 text-muted-foreground" />
                        {act.responseTime}
                      </span>
                    </td>

                    {/* Origin Region */}
                    <td className="py-4 px-4 text-center">
                      <span className="flex items-center justify-center gap-1 font-mono">
                        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                        {act.country}
                      </span>
                    </td>

                    {/* Timestamp */}
                    <td className="py-4 px-5 text-right font-mono text-muted-foreground">
                      {act.timestamp}
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
