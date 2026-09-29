'use client';

import { PortalNav } from '@/components/portal/portal-nav';
import { CommandHeader } from '@/components/command/command-header';
import { CommandKPIs } from '@/components/command/command-kpis';
import { ProvinceMap } from '@/components/command/province-map';
import { ConnectedInstitutions } from '@/components/command/connected-institutions';
import { DataCoverage } from '@/components/command/data-coverage';
import { LanguageCoverage } from '@/components/command/language-coverage';
import { ReadinessIndex } from '@/components/command/readiness-index';
import { EcosystemImpact } from '@/components/command/ecosystem-impact';
import { APIGrowthCharts } from '@/components/command/api-growth-charts';
import { DatasetGrowthTimeline } from '@/components/command/dataset-growth-timeline';
import { ComplianceOverview } from '@/components/command/compliance-overview';
import { PartnershipNetwork } from '@/components/command/partnership-network';
import { NationalPipeline } from '@/components/command/national-pipeline';
import { EconomicImpact } from '@/components/command/economic-impact';
import { AIInsights } from '@/components/command/ai-insights';
import { StrategicRoadmap } from '@/components/command/strategic-roadmap';
import { VisionSection } from '@/components/command/vision-section';
import { ConnectorControlCentre } from '@/components/command/connectors/connector-control-centre';
import { Footer } from '@/components/site/footer';

export default function CommandPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <PortalNav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-6">
        <CommandHeader />

        {/* Connector Control Centre — live demo (ingestion + processing pipeline) */}
        <ConnectorControlCentre />

        <CommandKPIs />
        
        {/* Geographic activity map */}
        <ProvinceMap />

        {/* Institution registrations */}
        <ConnectedInstitutions />

        {/* Sector and Language weightings */}
        <DataCoverage />
        <LanguageCoverage />

        {/* Audit Readiness radar gauge */}
        <ReadinessIndex />

        {/* API metrics & Growth cycles */}
        <EcosystemImpact />
        <APIGrowthCharts />
        
        {/* Compliance checklist, timelines, networks */}
        <DatasetGrowthTimeline />
        <ComplianceOverview />
        <PartnershipNetwork />

        {/* Processing flow & Financial savings */}
        <NationalPipeline />
        <EconomicImpact />

        {/* Recommendations & Roadmaps */}
        <AIInsights />
        <StrategicRoadmap />

        <VisionSection />
      </main>

      <Footer />
    </div>
  );
}
