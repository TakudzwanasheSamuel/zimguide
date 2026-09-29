'use client';

import { Check, Terminal, Copy, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/site/section';
import { Reveal } from '@/components/motion/reveal';
import { useState } from 'react';
import { toast } from 'sonner';

const codeBlocks = [
  {
    lang: 'bash',
    label: 'Install',
    code: `npm install @zimguide/sdk`,
  },
  {
    lang: 'typescript',
    label: 'Subscribe',
    code: `import { ZimGuide } from "@zimguide/sdk";

const zg = new ZimGuide({ apiKey: process.env.ZG_KEY });

const ds = await zg.datasets.subscribe(
  "ds_003", // Ndebele Linguistic Corpus
  { version: "v2.1.0" }
);`,
  },
  {
    lang: 'typescript',
    label: 'Stream records',
    code: `const stream = await zg.datasets.stream("ds_003");

for await (const record of stream) {
  // each record is anonymized & lineage-tagged
  console.log(record.text, record.provenance);
}`,
  },
];

export function Developers() {
  const [active, setActive] = useState(1);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(codeBlocks[active].code);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="developers" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Developer Experience"
                title={
                  <>
                    Type-safe SDKs for{' '}
                    <span className="gradient-text">sovereign data</span>
                  </>
                }
                subtitle="Subscribe, stream, and consume datasets in a few lines. Version-pinned snapshots make every result reproducible — for peer review, audit, or production."
              />
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-8 space-y-3">
                {[
                  'TypeScript & Python SDKs',
                  'REST + streaming endpoints',
                  'Version-pinned, reproducible snapshots',
                  'Per-key quotas and rate shaping',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex gap-3">
                <Button className="group gap-2" asChild>
                  <a href="#contact">
                    Read the docs
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Button>
                <Button variant="outline" className="bg-secondary/30" asChild>
                  <a href="#developers">API reference</a>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Code window */}
          <Reveal direction="left" delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-soft-lg backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/70" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <span className="h-3 w-3 rounded-full bg-green-500/70" />
                  <span className="ml-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Terminal className="h-3.5 w-3.5" />
                    zg-cli
                  </span>
                </div>
                <button
                  onClick={copy}
                  className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="flex border-b border-border/60">
                {codeBlocks.map((b, i) => (
                  <button
                    key={b.label}
                    onClick={() => setActive(i)}
                    className={`border-r border-border/60 px-4 py-2.5 text-xs transition-colors ${
                      active === i
                        ? 'bg-secondary/60 text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              <pre className="overflow-x-auto p-5 text-sm leading-relaxed">
                <code className="font-mono">
                  {codeBlocks[active].code.split('\n').map((line, i) => (
                    <div key={i} className="flex">
                      <span className="mr-4 w-6 shrink-0 select-none text-right text-muted-foreground/40">
                        {i + 1}
                      </span>
                      <span
                        className={
                          line.startsWith('import') || line.startsWith('const') || line.startsWith('for')
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                        }
                      >
                        {line || ' '}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
