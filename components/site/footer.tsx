'use client';

import Link from 'next/link';
import { Logo } from '@/components/site/navbar';
import { Twitter, Linkedin, Github, Globe } from 'lucide-react';
import { footerColumns } from '@/lib/mock-data';

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo />
              <span className="text-[15px] font-semibold tracking-tight">
                ZimGuide Data Core
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Zimbabwe&apos;s sovereign AI data infrastructure. Transform
              institutional data into AI-ready datasets — compliant, secure, and
              accessible.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Twitter, Linkedin, Github, Globe].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-medium text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => {
                  const getLinkHref = (label: string) => {
                    switch (label) {
                      case 'Data Marketplace': return '/marketplace';
                      case 'Data Curation': return '/platform#pipeline-visualization';
                      case 'Anonymization': return '/platform#privacy-engine';
                      case 'API Gateway': return '/developers#api-playground';
                      case 'Federated Architecture': return '/platform#federated-collection';
                      case 'Privacy by Design': return '/platform#privacy-engine';
                      case 'Sovereign Infrastructure': return '/platform';
                      case 'Documentation': return '/developers';
                      case 'API Reference': return '/developers#api-documentation';
                      case 'SDKs': return '/developers#sdk-section';
                      case 'Quickstart': return '/developers';
                      case 'Code Examples': return '/developers#sdk-section';
                      case 'Pricing': return '/revenue';
                      case 'Billing': return '/revenue#institution-wallet';
                      case 'Licensing': return '/revenue#license-marketplace';
                      case 'Governance': return '/command';
                      case 'Compliance': return '/command#compliance-overview';
                      case 'Partners': return '/command#connected-institutions';
                      default: return '#';
                    }
                  };
                  return (
                    <li key={l}>
                      <Link
                        href={getLinkHref(l)}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} ZimGuide Data Core. Sovereign by design.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="#" className="transition-colors hover:text-foreground">Privacy</Link>
            <Link href="#" className="transition-colors hover:text-foreground">Terms</Link>
            <Link href="#" className="transition-colors hover:text-foreground">Data Processing</Link>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/60" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
