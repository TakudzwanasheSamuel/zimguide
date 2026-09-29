'use client';

import { extractionEngine } from '@/lib/platform-data';
import { GlassCard, SectionHeading } from '@/components/site/section';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { ScanText, FileText, Mic, Tags, Map, ImageIcon } from 'lucide-react';

const iconMap = {
  ext_ocr: ScanText,
  ext_doc: FileText,
  ext_speech: Mic,
  ext_meta: Tags,
  ext_gis: Map,
  ext_image: ImageIcon,
};

export function ExtractionEngine() {
  return (
    <section id="extraction-engine" className="relative py-24 lg:py-32 overflow-hidden bg-secondary/5">
      <div className="absolute top-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Extraction Engine"
            title={
              <>
                AI-Powered <span className="gradient-text">Structured Extraction</span>
              </>
            }
            subtitle="Converts scanned records, audio streams, and map assets into indexed formats. Powered by optimized neural nets configured for local languages and formatting."
          />
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {extractionEngine.map((card) => {
            const Icon = iconMap[card.id as keyof typeof iconMap] || FileText;

            return (
              <StaggerItem key={card.id}>
                <GlassCard className="group h-full p-6 flex flex-col justify-between hover:border-primary/40 hover:shadow-glow">
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3.5 pb-4 border-b border-border/50">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border/60 bg-secondary/50 text-muted-foreground group-hover:text-primary transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {card.name}
                      </h4>
                    </div>

                    <div className="mt-5 space-y-4">
                      {/* Input */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                          Raw Input Stream
                        </span>
                        <p className="text-xs leading-relaxed text-foreground/90 font-medium">
                          {card.input}
                        </p>
                      </div>

                      {/* Output */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                          Extracted Output
                        </span>
                        <p className="text-xs leading-relaxed text-foreground/90 font-medium">
                          {card.output}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Formats Footer */}
                  <div className="mt-6 border-t border-border/50 pt-4">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">
                      Supported Formats
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {card.formats.map((f) => (
                        <span
                          key={f}
                          className="font-mono text-[9px] font-semibold border border-border/80 bg-secondary/60 text-muted-foreground px-2 py-0.5 rounded"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
