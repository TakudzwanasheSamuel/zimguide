'use client';

import { useState } from 'react';
import { sdkExamples } from '@/lib/developer-data';
import { GlassCard } from '@/components/site/section';
import { Terminal, Copy, Check, Sparkles, BookOpen, KeyRound, Search, Download, Radio, Binary } from 'lucide-react';

type Lang = 'python' | 'javascript' | 'typescript' | 'go' | 'java' | 'curl';
type ActionType = 'auth' | 'search' | 'download' | 'streaming' | 'vector';

export function SDKSection() {
  const [lang, setLang] = useState<Lang>('python');
  const [action, setAction] = useState<ActionType>('auth');
  const [copied, setCopied] = useState(false);

  const languages: { id: Lang; label: string }[] = [
    { id: 'python', label: 'Python' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'go', label: 'Go' },
    { id: 'java', label: 'Java' },
    { id: 'curl', label: 'cURL' },
  ];

  const actions: { id: ActionType; label: string; icon: any }[] = [
    { id: 'auth', label: 'Client Authentication', icon: KeyRound },
    { id: 'search', label: 'Search Datasets', icon: Search },
    { id: 'download', label: 'Download Records', icon: Download },
    { id: 'streaming', label: 'Streaming Delta Logs', icon: Radio },
    { id: 'vector', label: 'Semantic Vector Search', icon: Binary },
  ];

  const currentSnippet = sdkExamples[lang]?.[action] || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="sdk-section" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <BookOpen className="h-4.5 w-4.5 text-primary" />
          Multi-Language Client SDKs
        </h3>
        <p className="text-xs text-muted-foreground">
          Import our lightweight clients directly into your application to verify credentials, fetch rows, or generate embeddings.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        
        {/* Actions Selector Column */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground px-2 mb-1 block">
            Select Operation API
          </span>
          <div className="flex flex-col gap-2">
            {actions.map((act) => {
              const ActionIcon = act.icon;
              const isActive = action === act.id;

              return (
                <button
                  key={act.id}
                  onClick={() => setAction(act.id)}
                  className={`flex items-center gap-3 w-full rounded-xl border p-4 text-xs font-semibold text-left transition-all ${
                    isActive
                      ? 'border-primary bg-primary/10 text-primary shadow-glow'
                      : 'border-border/60 bg-card/40 text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <ActionIcon className="h-4.5 w-4.5 shrink-0" />
                  {act.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Code Snippet Box Column */}
        <div className="lg:col-span-8 flex flex-col">
          <GlassCard className="h-full border-border/80 bg-black/40 flex flex-col justify-between overflow-hidden shadow-glow" hover={false}>
            
            {/* Lang Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 bg-secondary/40 border-b border-border/60 gap-3">
              <div className="flex flex-wrap gap-1">
                {languages.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLang(l.id)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                      lang === l.id
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40 border border-transparent'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              {/* Copy action */}
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 py-1 px-2.5 rounded bg-secondary/80 border border-border/60 hover:bg-secondary transition-colors text-xs font-mono text-muted-foreground self-end sm:self-auto"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-primary" />
                    <span>Copied Code</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Snippet */}
            <div className="p-6 font-mono text-xs text-sky-400/90 leading-relaxed overflow-x-auto min-h-[16rem] flex-1">
              <pre className="whitespace-pre">
                <code>{currentSnippet}</code>
              </pre>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-secondary/20 border-t border-border/60 text-[10px] text-muted-foreground font-mono flex items-center justify-between">
              <span>SDK Version: v1.4.2 stable</span>
              <span className="flex items-center gap-1 text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Tested compliant
              </span>
            </div>

          </GlassCard>
        </div>

      </div>
    </section>
  );
}
