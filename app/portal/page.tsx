'use client';

import { PortalNav } from '@/components/portal/portal-nav';
import { WelcomeHeader } from '@/components/portal/welcome-header';
import { ExecutiveOverview } from '@/components/portal/executive-overview';
import { DataSourceHealth } from '@/components/portal/data-sources';
import { DataAssetsTable } from '@/components/portal/data-assets-table';
import { ProcessingActivity } from '@/components/portal/processing-activity';
import { QualityDashboard } from '@/components/portal/quality-dashboard';
import { RevenueDashboard } from '@/components/portal/revenue-dashboard';
import { RoyaltyDistribution } from '@/components/portal/royalty-distribution';
import { DatasetPerformance } from '@/components/portal/dataset-performance';
import { ComplianceDashboard } from '@/components/portal/compliance-dashboard';
import { PartnershipAgreement } from '@/components/portal/partnership-agreement';
import { AIInsights } from '@/components/portal/ai-insights';
import { RecentAPIActivity } from '@/components/portal/recent-api-activity';
import { FooterCTA } from '@/components/portal/footer-cta';
import { Footer } from '@/components/site/footer';

export default function PortalPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <PortalNav />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        <WelcomeHeader />
        <ExecutiveOverview />
        <DataSourceHealth />
        <DataAssetsTable />
        <ProcessingActivity />
        
        {/* Quality Section */}
        <QualityDashboard />

        {/* Financial Section */}
        <RevenueDashboard />
        <RoyaltyDistribution />
        
        {/* Performance awards */}
        <DatasetPerformance />

        {/* Auditing and legal */}
        <ComplianceDashboard />
        <PartnershipAgreement />

        {/* AI Recommendations & Live Logs */}
        <AIInsights />
        <RecentAPIActivity />

        <FooterCTA />
      </main>

      <Footer />
    </div>
  );
}
