'use client';

import { agreementData } from '@/lib/portal-data';
import { GlassCard } from '@/components/site/section';
import { Handshake, FileText, Download, Edit3, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PartnershipAgreement() {
  return (
    <section id="partnership-agreement" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Handshake className="h-4.5 w-4.5 text-primary" />
          Partnership Agreement & MOU Status
        </h3>
        <p className="text-xs text-muted-foreground">
          Legally binding data-sharing agreement definitions and revenue sharing frameworks.
        </p>
      </div>

      <GlassCard className="p-6 md:p-8 border-primary/20 bg-[#0b1329]/50 shadow-glow relative" hover={false}>
        {/* Accent glow on top */}
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-brand" />

        <div className="grid gap-8 md:grid-cols-12 items-center">
          
          {/* Agreement details */}
          <div className="md:col-span-8 grid gap-4 sm:grid-cols-2 text-xs">
            <div className="flex flex-col gap-1 bg-secondary/20 p-4 rounded-xl border border-border/60">
              <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground">MOU Agreement Status</span>
              <span className="text-sm font-bold text-primary flex items-center gap-1.5 mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {agreementData.status}
              </span>
            </div>

            <div className="flex flex-col gap-1 bg-secondary/20 p-4 rounded-xl border border-border/60">
              <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground">Partner Since</span>
              <span className="text-sm font-bold text-foreground mt-1 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-sky-400" />
                {agreementData.partnerSince}
              </span>
            </div>

            <div className="flex flex-col gap-1 bg-secondary/20 p-4 rounded-xl border border-border/60">
              <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground">Revenue Sharing Model</span>
              <span className="text-sm font-bold text-foreground mt-1">
                {agreementData.revenueSharing}
              </span>
            </div>

            <div className="flex flex-col gap-1 bg-secondary/20 p-4 rounded-xl border border-border/60">
              <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground">Ingestion License Type</span>
              <span className="text-sm font-bold text-foreground mt-1">
                {agreementData.licenseType}
              </span>
            </div>

            <div className="flex flex-col gap-1 bg-secondary/20 p-4 rounded-xl border border-border/60 sm:col-span-2">
              <span className="text-[9px] uppercase font-mono tracking-widest text-muted-foreground">Current MOU Document</span>
              <span className="text-xs text-foreground font-mono mt-1 font-semibold flex items-center gap-2 truncate">
                <FileText className="h-4 w-4 text-primary shrink-0" />
                {agreementData.mouDoc}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="md:col-span-4 flex flex-col gap-3 justify-center">
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block text-center md:text-left mb-1">
              Agreement Actions
            </div>
            <Button size="sm" className="w-full gap-2 h-9 text-xs font-semibold">
              <FileText className="h-3.5 w-3.5" />
              View Agreement
            </Button>
            <Button size="sm" variant="outline" className="w-full gap-2 h-9 text-xs font-semibold glass">
              <Download className="h-3.5 w-3.5 text-primary" />
              Download MOU PDF
            </Button>
            <Button size="sm" variant="ghost" className="w-full gap-2 h-9 text-xs font-semibold text-muted-foreground hover:text-foreground">
              <Edit3 className="h-3.5 w-3.5 text-accent" />
              Request MOU Changes
            </Button>
          </div>

        </div>
      </GlassCard>
    </section>
  );
}
