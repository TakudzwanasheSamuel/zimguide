'use client';

import {
  X, BadgeCheck, Database, Download, Star, Heart, Zap, Globe,
  ShieldCheck, FileText, Code2, Lock, MapPin, Languages,
  Tag, User, Clock, ArrowRight, Loader2,
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { type MarketplaceDataset } from '@/lib/marketplace-data';
import type { DatasetPreview } from '@/lib/dataset-types';
import { useDatasetPreview } from '@/hooks/use-marketplace';

const pricingStyle: Record<string, string> = {
  Free: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
  Premium: 'text-sky-300 border-sky-500/30 bg-sky-500/10',
  Enterprise: 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10',
  Subscription: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
};

const detailItems: { icon: typeof User; label: string; key: keyof MarketplaceDataset }[] = [
  { icon: User, label: 'Owner', key: 'owner' },
  { icon: MapPin, label: 'Coverage', key: 'coverage' },
  { icon: Languages, label: 'Languages', key: 'languages' },
  { icon: Tag, label: 'Category', key: 'category' },
  { icon: Database, label: 'Records', key: 'records' },
  { icon: Clock, label: 'Last Updated', key: 'updated' },
];

const DEMO_PREVIEW_ROWS: Record<string, Record<string, unknown>[]> = {
  ds_agritex_crop_production: [
    { record_id: 'AGRITEX-CP-0001', province: 'Masvingo', district: 'Chiredzi', crop_type: 'Maize', yield_tonnes: 3200 },
    { record_id: 'AGRITEX-CP-0002', province: 'Masvingo', district: 'Gutu', crop_type: 'Sorghum', yield_tonnes: 1450 },
  ],
  ds_naz_historical_documents_catalogue: [
    { document_id: 'NAZ-2024-0001', title: 'Oral History Transcript — Manicaland', province: 'Manicaland', language: 'Shona' },
    { document_id: 'NAZ-2024-0002', title: 'Colonial Correspondence — Harare', province: 'Harare Metropolitan', language: 'English' },
  ],
};

function formatCell(value: unknown): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

export function DatasetPreviewModal({
  dataset,
  open,
  onClose,
}: {
  dataset: MarketplaceDataset | null;
  open: boolean;
  onClose: () => void;
}) {
  const { data: preview, isLoading: previewLoading } = useDatasetPreview(
    open && dataset ? dataset.id : null,
  );

  if (!dataset) return null;

  const schemaFields: DatasetPreview['column_statistics'] = preview?.column_statistics ?? [];
  const sampleRows: Record<string, unknown>[] =
    preview?.sample_rows ?? DEMO_PREVIEW_ROWS[dataset.id] ?? [];
  const sampleColumns = sampleRows.length > 0 ? Object.keys(sampleRows[0]) : [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border/60 bg-card/90 p-0 backdrop-blur-2xl sm:max-w-3xl">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="sr-only">{dataset.name}</DialogTitle>
        </DialogHeader>

        <div className={cn('relative h-32 overflow-hidden bg-gradient-to-br', dataset.coverGradient)}>
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg border border-border/60 bg-card/80 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-border/60 bg-card/80 backdrop-blur">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                {dataset.institution}
                <BadgeCheck className="h-3 w-3 text-primary" />
              </div>
              <h2 className="text-lg font-semibold tracking-tight">{dataset.name}</h2>
            </div>
          </div>
          <div className="absolute bottom-4 right-6 flex gap-2">
            <span className={cn('rounded-full border px-2.5 py-0.5 text-xs font-medium backdrop-blur', pricingStyle[dataset.pricing])}>
              {dataset.pricing}
            </span>
            {dataset.api && (
              <span className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary backdrop-blur">
                <Zap className="h-3 w-3" /> API
              </span>
            )}
          </div>
        </div>

        <div className="p-6 pt-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{dataset.description}</p>

          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Download className="h-4 w-4 text-primary" /> {dataset.downloads.toLocaleString()} downloads
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Heart className="h-4 w-4 text-rose-400" /> {dataset.favorites.toLocaleString()} favorites
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Star className="h-4 w-4 text-amber-400" /> {dataset.rating} ({dataset.reviews} reviews)
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> Quality: {dataset.quality}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {detailItems.map((item) => {
              const Icon = item.icon;
              const val = dataset[item.key];
              return (
                <div key={item.label} className="rounded-xl border border-border/60 bg-secondary/30 p-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon className="h-3 w-3" /> {item.label}
                  </div>
                  <div className="mt-1 text-sm font-medium">
                    {Array.isArray(val) ? val.join(', ') : val}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Available Formats</p>
            <div className="flex flex-wrap gap-2">
              {dataset.formats.map((f) => (
                <span key={f} className="rounded-lg border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs text-foreground/80">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {dataset.api && (
            <div className="mt-6">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <Zap className="h-3 w-3 text-primary" /> API Endpoints
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-secondary/30 px-3 py-2">
                  <span className="rounded px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500/15 text-emerald-300">GET</span>
                  <code className="flex-1 font-mono text-xs text-foreground/80">/datasets/{dataset.id}</code>
                  <span className="text-xs text-muted-foreground">Dataset metadata</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-secondary/30 px-3 py-2">
                  <span className="rounded px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500/15 text-emerald-300">GET</span>
                  <code className="flex-1 font-mono text-xs text-foreground/80">/datasets/{dataset.id}/preview</code>
                  <span className="text-xs text-muted-foreground">Preview sample</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-secondary/30 px-3 py-2">
                  <span className="rounded px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500/15 text-emerald-300">GET</span>
                  <code className="flex-1 font-mono text-xs text-foreground/80">/datasets/{dataset.id}/download</code>
                  <span className="text-xs text-muted-foreground">Download package</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Code2 className="h-3 w-3 text-primary" /> Schema Preview
            </p>
            <div className="overflow-hidden rounded-xl border border-border/60 bg-background/60">
              <div className="border-b border-border/40 px-4 py-2 text-[11px] text-muted-foreground">schema.json</div>
              {previewLoading ? (
                <div className="flex items-center justify-center gap-2 p-8 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading schema…
                </div>
              ) : schemaFields.length === 0 ? (
                <div className="p-4 text-sm text-muted-foreground">No schema available.</div>
              ) : (
                <div className="p-4 font-mono text-xs">
                  {schemaFields.map((f: DatasetPreview['column_statistics'][number], i: number) => (
                    <div key={f.name} className="flex gap-3 py-0.5">
                      <span className="w-4 shrink-0 select-none text-muted-foreground/40">{i + 1}</span>
                      <span className="text-sky-300">{f.name}</span>
                      <span className="text-muted-foreground">:</span>
                      <span className="text-emerald-300">{f.dtype}</span>
                      <span className="ml-auto text-muted-foreground/60">
                        {f.unique_count} unique · {f.null_pct}% null
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <FileText className="h-3 w-3 text-primary" /> Sample Records
            </p>
            {previewLoading ? (
              <div className="flex items-center justify-center gap-2 rounded-xl border border-border/60 p-8 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading samples…
              </div>
            ) : sampleRows.length === 0 ? (
              <div className="rounded-xl border border-border/60 p-4 text-sm text-muted-foreground">
                No sample rows available.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-border/60">
                <table className="w-full text-xs">
                  <thead className="bg-secondary/30">
                    <tr>
                      {sampleColumns.map((col) => (
                        <th key={col} className="px-3 py-2 text-left font-medium text-muted-foreground">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sampleRows.map((row: Record<string, unknown>, idx: number) => (
                      <tr key={idx} className="border-t border-border/40">
                        {sampleColumns.map((col) => (
                          <td key={col} className="max-w-[12rem] truncate px-3 py-2">
                            {formatCell(row[col])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="gap-1.5">
              <Lock className="h-3 w-3" /> License: {preview?.license ?? dataset.license}
            </Badge>
            <Badge variant="outline" className="gap-1.5">
              <Globe className="h-3 w-3" /> {dataset.classification}
            </Badge>
          </div>

          <div className="mt-6 flex gap-3 border-t border-border/60 pt-5">
            <Button className="flex-1 gap-2" asChild>
              <a href="#contact">
                Subscribe & Access
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" className="gap-2 bg-secondary/30" asChild>
              <a href="#developers">
                <FileText className="h-4 w-4" /> Documentation
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
