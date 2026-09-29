'use client';

import { useState } from 'react';
import { apiKeysList } from '@/lib/developer-data';
import { GlassCard } from '@/components/site/section';
import { KeyRound, Check, Copy, RefreshCw, Trash2, ShieldCheck, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function APIKeys() {
  const [keys, setKeys] = useState(apiKeysList);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (keyText: string, idx: number) => {
    navigator.clipboard.writeText(keyText);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleRotate = (idx: number) => {
    const nextKeys = [...keys];
    const rand = Math.random().toString(16).substring(2, 10);
    const prefix = keys[idx].type === 'Production' ? 'zgd_live_sk_' : keys[idx].type === 'Development' ? 'zgd_test_sk_' : 'zgd_sand_sk_';
    nextKeys[idx].key = `${prefix}${rand}1e8201b17dcf82ab`;
    setKeys(nextKeys);
  };

  const handleToggleStatus = (idx: number) => {
    const nextKeys = [...keys];
    nextKeys[idx].status = nextKeys[idx].status === 'Active' ? 'Inactive' : 'Active';
    setKeys(nextKeys);
  };

  return (
    <section id="api-keys" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
            <KeyRound className="h-4.5 w-4.5 text-primary" />
            API Gateway Keys Credentials
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Generate and manage your secret authentication bearer keys for sandbox and production workloads.
          </p>
        </div>
        <Button size="sm" className="w-full sm:w-auto h-9 text-xs font-semibold mt-3 sm:mt-0 shadow-glow">
          Generate New Key
        </Button>
      </div>

      <GlassCard className="p-6 md:p-8 border-border/80 bg-card/40 shadow-glow" hover={false}>
        <div className="space-y-4">
          
          {keys.map((k, idx) => {
            const isActive = k.status === 'Active';
            
            return (
              <div key={k.name} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-secondary/20 hover:bg-secondary/30 transition-colors border border-border/60 p-4.5 rounded-xl">
                
                {/* Details */}
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                    <h4 className="text-xs font-bold text-foreground truncate">{k.name}</h4>
                    <span className="text-[9px] font-mono font-bold bg-primary/10 border border-primary/20 text-primary px-1.5 py-0.5 rounded uppercase">
                      {k.type}
                    </span>
                  </div>

                  {/* Masked Key */}
                  <div className="mt-2.5 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <Key className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="truncate max-w-[200px] sm:max-w-none text-slate-300">
                      {k.key.substring(0, 16)}...
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(k.key, idx)}
                    className="h-8 text-[10px] font-semibold gap-1 glass"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="h-3 w-3 text-primary" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRotate(idx)}
                    className="h-8 text-[10px] font-semibold gap-1 glass hover:text-primary"
                    title="Rotate Key"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Rotate</span>
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleToggleStatus(idx)}
                    className={`h-8 text-[10px] font-semibold gap-1 ${
                      isActive ? 'text-rose-400 hover:bg-rose-500/10' : 'text-emerald-400 hover:bg-emerald-500/10'
                    }`}
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>{isActive ? 'Revoke' : 'Activate'}</span>
                  </Button>
                </div>

              </div>
            );
          })}

        </div>
      </GlassCard>
    </section>
  );
}
