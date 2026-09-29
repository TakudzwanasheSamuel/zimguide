'use client';

import { PortalNav } from '@/components/portal/portal-nav';
import { RevenueHeader } from '@/components/revenue/revenue-header';
import { RevenueKPIs } from '@/components/revenue/revenue-kpis';
import { RevenueCharts } from '@/components/revenue/revenue-charts';
import { RoyaltyFlow } from '@/components/revenue/royalty-flow';
import { TopPartners } from '@/components/revenue/top-partners';
import { DatasetRevenueTable } from '@/components/revenue/dataset-revenue-table';
import { SubscriptionPricing } from '@/components/revenue/subscription-pricing';
import { CurationServices } from '@/components/revenue/curation-services';
import { LicenseMarketplace } from '@/components/revenue/license-marketplace';
import { PaymentFlowAnimation } from '@/components/revenue/payment-flow-animation';
import { RoyaltyEngineInfo } from '@/components/revenue/royalty-engine-info';
import { InstitutionWallet } from '@/components/revenue/institution-wallet';
import { RevenueForecasting } from '@/components/revenue/revenue-forecasting';
import { BusinessInsights } from '@/components/revenue/business-insights';
import { RevenueCTA } from '@/components/revenue/revenue-cta';
import { Footer } from '@/components/site/footer';

export default function RevenuePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <PortalNav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-6">
        <RevenueHeader />
        <RevenueKPIs />
        
        {/* Revenue charts & flows */}
        <RevenueCharts />
        <RoyaltyFlow />

        {/* Top partners and dataset specific ledger auditing */}
        <TopPartners />
        <DatasetRevenueTable />

        {/* Subscription pricing tiers */}
        <SubscriptionPricing />

        {/* Preparation services and license templates */}
        <CurationServices />
        <LicenseMarketplace />

        {/* Ingestion & Wallet transactions logs */}
        <PaymentFlowAnimation />
        <RoyaltyEngineInfo />
        <InstitutionWallet />

        {/* AI Forecasting & business suggestions */}
        <RevenueForecasting />
        <BusinessInsights />

        <RevenueCTA />
      </main>

      <Footer />
    </div>
  );
}
