'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/site/section';
import { Button } from '@/components/ui/button';
import { Terminal, Play, Check, Copy, Settings2, KeyRound } from 'lucide-react';
import { resolveDemoApiResponse } from '@/lib/demo-api-responses';

const ENDPOINTS = [
  { value: '/v1/datasets/search', method: 'GET' as const, label: 'Search datasets' },
  { value: '/v1/datasets/ds_agritex_crop_production/records', method: 'GET' as const, label: 'Crop records (AGRITEX)' },
  { value: '/v1/datasets/ds_naz_historical_documents_catalogue/schema', method: 'GET' as const, label: 'Dataset schema (NAZ)' },
  { value: '/v1/vectors/search', method: 'POST' as const, label: 'Vector semantic search' },
];

export function APIPlayground() {
  const [endpoint, setEndpoint] = useState(ENDPOINTS[0].value);
  const [method, setMethod] = useState<'GET' | 'POST'>('GET');
  const [paramLang, setParamLang] = useState('English');
  const [paramCategory, setParamCategory] = useState('Agriculture');
  const [paramProvince, setParamProvince] = useState('Masvingo');

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<unknown>(null);
  const [copied, setCopied] = useState(false);

  const handleEndpointChange = (value: string) => {
    setEndpoint(value);
    const ep = ENDPOINTS.find((e) => e.value === value);
    if (ep) setMethod(ep.method);
  };

  const handleRun = () => {
    setLoading(true);
    setResponse(null);
    setTimeout(() => {
      setLoading(false);
      const base = resolveDemoApiResponse(endpoint);
      if (endpoint.includes('search') && !endpoint.includes('vector')) {
        setResponse({
          ...(base as object),
          query: { language: paramLang, category: paramCategory, province: paramProvince },
        });
      } else {
        setResponse(base);
      }
    }, 700);
  };

  const displayResponse = response ?? resolveDemoApiResponse(endpoint);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(displayResponse, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api-playground" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Terminal className="h-4.5 w-4.5 text-primary" />
          API Sandbox — Simulated Gateway Responses
        </h3>
        <p className="text-xs text-muted-foreground">
          Execute representative API calls against ZimGuide institutional datasets. Responses are simulated for demo purposes.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-5 flex flex-col">
          <GlassCard className="h-full border-border/80 bg-card/40 p-6 flex flex-col justify-between" hover={false}>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                <Settings2 className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-muted-foreground">
                  Request Configuration
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Target Endpoint
                </label>
                <div className="flex gap-2">
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value as 'GET' | 'POST')}
                    className="bg-secondary/40 border border-border/80 rounded-lg text-xs font-mono font-bold text-primary p-2"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                  </select>
                  <select
                    value={endpoint}
                    onChange={(e) => handleEndpointChange(e.target.value)}
                    className="flex-1 bg-secondary/40 border border-border/80 rounded-lg text-xs font-mono font-semibold text-foreground p-2"
                  >
                    {ENDPOINTS.map((ep) => (
                      <option key={ep.value} value={ep.value}>
                        {ep.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Authentication Header
                </label>
                <div className="flex items-center bg-secondary/20 border border-border/80 rounded-lg p-2.5 text-xs font-mono">
                  <KeyRound className="h-4 w-4 text-primary shrink-0 mr-2" />
                  <span className="text-slate-300 font-semibold">Bearer</span>
                  <span className="ml-1.5 font-bold text-[10px] uppercase text-emerald-400">zg_free_demo0001</span>
                </div>
              </div>

              {endpoint.includes('/search') && !endpoint.includes('vector') && (
                <div className="flex flex-col gap-3.5 border-t border-border/40 pt-4">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    Query Parameters
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono uppercase text-muted-foreground">Language</span>
                      <input value={paramLang} onChange={(e) => setParamLang(e.target.value)} className="bg-secondary/40 border border-border/80 rounded-lg text-xs p-2" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono uppercase text-muted-foreground">Category</span>
                      <input value={paramCategory} onChange={(e) => setParamCategory(e.target.value)} className="bg-secondary/40 border border-border/80 rounded-lg text-xs p-2" />
                    </div>
                    <div className="flex flex-col gap-1 sm:col-span-2">
                      <span className="text-[9px] font-mono uppercase text-muted-foreground">Province</span>
                      <input value={paramProvince} onChange={(e) => setParamProvince(e.target.value)} className="bg-secondary/40 border border-border/80 rounded-lg text-xs p-2" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 border-t border-border/60 pt-5">
              <Button onClick={handleRun} disabled={loading} className="w-full h-11 text-xs font-semibold gap-2 shadow-glow">
                <Play className="h-3.5 w-3.5 fill-black" />
                {loading ? 'Executing Query...' : 'Send Simulated Request'}
              </Button>
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-7 flex flex-col">
          <GlassCard className="h-full border-border/80 bg-black/40 flex flex-col overflow-hidden shadow-glow" hover={false}>
            <div className="flex items-center justify-between px-4 py-3 bg-secondary/40 border-b border-border/60 text-xs font-mono text-muted-foreground">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                <span>Simulated Response</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleCopy} className="flex items-center gap-1 py-1 px-2.5 rounded bg-secondary/80 border border-border/60">
                  {copied ? <><Check className="h-3 w-3 text-primary" /><span>Copied</span></> : <><Copy className="h-3 w-3" /><span>Copy</span></>}
                </button>
                <span className="text-[10px] text-emerald-400 font-bold">200 OK</span>
              </div>
            </div>
            <div className="p-5 font-mono text-xs text-sky-400/90 leading-relaxed overflow-y-auto max-h-[30rem] min-h-[22rem] flex-1">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-3">
                  <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>Simulating API gateway...</span>
                </div>
              ) : (
                <code>{JSON.stringify(displayResponse, null, 2)}</code>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
