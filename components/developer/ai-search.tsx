'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/site/section';
import { Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { aiApi } from '@/lib/ai-api';
import type { SemanticSearchResponse } from '@/lib/ai-types';

const DEFAULT_PROMPT = 'Find all agricultural datasets collected after 2023 in Shona.';

export function AISearch() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SemanticSearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRun = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await aiApi.search(prompt, 5);
      setResult(data);
    } catch {
      setError('Unable to reach the AI search API. Ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-search" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Sparkles className="h-4.5 w-4.5 text-primary" />
          Sovereign AI NL Search Agent
        </h3>
        <p className="text-xs text-muted-foreground">
          Translate natural language instructions into semantic dataset discovery queries.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-5 flex flex-col">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-primary/20 bg-[#0b1329]/50 shadow-glow" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Prompt Parser Ingestion
              </h4>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                Input any research question. The pipeline embeds your prompt, runs semantic search, and ranks results.
              </p>
              <div className="mt-6 bg-secondary/35 border border-border/80 rounded-xl p-4 flex flex-col gap-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-primary">Natural Language Input</span>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="text-xs font-semibold text-foreground leading-relaxed bg-transparent border-none resize-none focus:outline-none min-h-[4rem]"
                  rows={3}
                />
              </div>
            </div>
            <Button onClick={handleRun} disabled={loading || !prompt.trim()} className="mt-8 w-full h-10 text-xs font-semibold gap-2 shadow-glow">
              <Sparkles className="h-4 w-4" />
              {loading ? 'Running Search Pipeline...' : 'Execute Semantic Search'}
            </Button>
          </GlassCard>
        </div>

        <div className="lg:col-span-7 flex flex-col">
          <GlassCard className="p-6 h-full border-border/80 bg-card/40 flex flex-col shadow-glow" hover={false}>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3 flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-primary" />
              Semantic Query Pipeline Output
            </h4>

            <div className="flex-1 mt-5 flex flex-col justify-center min-h-[16rem]">
              {loading ? (
                <div className="flex flex-col items-center justify-center text-muted-foreground gap-3">
                  <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-mono">Embedding → Semantic Search → Metadata Ranking...</span>
                </div>
              ) : error ? (
                <div className="text-center text-amber-400 text-xs p-6 border border-dashed border-amber-500/30 rounded-xl">{error}</div>
              ) : result ? (
                <div className="space-y-4">
                  <div className="bg-black/35 border border-border/60 p-3.5 rounded-lg font-mono text-[11px] leading-relaxed text-sky-400">
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-wider mb-1">Pipeline Stages</span>
                    {result.pipeline.join(' → ')}
                  </div>
                  {result.parsed.category && (
                    <div className="text-[10px] font-mono text-muted-foreground">
                      Detected: category={result.parsed.category}
                      {result.parsed.province && `, province=${result.parsed.province}`}
                      {result.parsed.language && `, language=${result.parsed.language}`}
                    </div>
                  )}
                  <div className="space-y-3">
                    {result.results.map((r) => (
                      <div key={r.dataset_id} className="flex items-start justify-between gap-3 bg-secondary/20 p-3 rounded-lg border border-border/60">
                        <div>
                          <h5 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                            {r.title}
                          </h5>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            {r.institution} · {r.category} · Quality {Math.round(r.quality_score * 100)}%
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] font-bold text-primary font-mono block">
                            {(r.similarity_score * 100).toFixed(1)}% Match
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">Similarity</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground text-xs p-6 border border-dashed border-border/80 rounded-xl">
                  Click &quot;Execute Semantic Search&quot; to run the discovery pipeline.
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
