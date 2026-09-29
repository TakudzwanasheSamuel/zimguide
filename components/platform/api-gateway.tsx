'use client';

import { useState } from 'react';
import { apiExamples } from '@/lib/platform-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal } from '@/components/motion/reveal';
import { Code, Terminal, Play, Check, Copy } from 'lucide-react';

type LangTab = 'curl' | 'python' | 'javascript' | 'rest' | 'graphql';

export function APIGateway() {
  const [activeTab, setActiveTab] = useState<LangTab>('python');
  const [copied, setCopied] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [showResponse, setShowResponse] = useState(true);

  const getCode = () => {
    return apiExamples[activeTab] || '';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = () => {
    setExecuting(true);
    setShowResponse(false);
    setTimeout(() => {
      setExecuting(false);
      setShowResponse(true);
    }, 800);
  };

  return (
    <section id="api-gateway" className="relative py-24 lg:py-32 overflow-hidden bg-secondary/5">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="API Gateway"
            title={
              <>
                Engineered for <span className="gradient-text">Developers</span>
              </>
            }
            subtitle="Integrate verified datasets directly into your Large Language Models, search indexes, or analytics pipelines with simple, unified endpoint SDKs."
          />
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Code Window Column */}
          <div className="lg:col-span-7 flex flex-col">
            <GlassCard className="h-full border-border/80 bg-black/40 flex flex-col justify-between overflow-hidden shadow-glow">
              <div>
                {/* Tabs bar */}
                <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-secondary/40 border-b border-border/60 text-xs text-muted-foreground">
                  <div className="flex gap-2.5">
                    {(['python', 'javascript', 'curl', 'rest', 'graphql'] as LangTab[]).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-2 px-1 font-mono hover:text-foreground border-b-2 transition-all capitalize ${
                          activeTab === tab ? 'border-primary text-primary font-bold' : 'border-transparent'
                        }`}
                      >
                        {tab === 'rest' ? 'REST' : tab === 'curl' ? 'cURL' : tab === 'javascript' ? 'JS SDK' : tab === 'python' ? 'Python SDK' : 'GraphQL'}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 py-1 px-2.5 rounded bg-secondary/80 border border-border/60 hover:bg-secondary transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-primary" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Editor Content */}
                <div className="p-5 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto whitespace-pre min-h-[18rem]">
                  <code>{getCode()}</code>
                </div>
              </div>

              {/* Console run trigger */}
              <div className="p-4 border-t border-border/60 bg-secondary/25 flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted-foreground">
                  endpoint: GET /v1/datasets/search
                </span>
                <button
                  onClick={handleExecute}
                  disabled={executing}
                  className="flex items-center gap-1.5 px-4 py-2 bg-primary text-black font-semibold text-xs rounded-lg hover:bg-primary/95 transition-all shadow-glow hover:shadow-primary/30"
                >
                  <Play className="h-3 w-3 fill-black" />
                  {executing ? 'Requesting...' : 'Run Query'}
                </button>
              </div>
            </GlassCard>
          </div>

          {/* Response Window Column */}
          <div className="lg:col-span-5 flex flex-col">
            <GlassCard className="h-full border-border/80 bg-black/40 flex flex-col overflow-hidden shadow-glow">
              {/* Response Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-secondary/40 border-b border-border/60 text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  <span>Output Response Stream</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-emerald-400 font-bold">200 OK (21ms)</span>
                </div>
              </div>

              {/* Response Content JSON */}
              <div className="p-5 font-mono text-xs text-sky-400/90 leading-relaxed overflow-y-auto whitespace-pre max-h-[25rem] flex-1">
                {executing ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-3">
                    <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span>Processing Secure Gateway Authentication...</span>
                  </div>
                ) : showResponse ? (
                  <code>{JSON.stringify(apiExamples.response, null, 2)}</code>
                ) : (
                  <span className="text-muted-foreground">Run query to inspect active response payload.</span>
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
