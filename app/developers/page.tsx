'use client';

import { useState } from 'react';
import { PortalNav } from '@/components/portal/portal-nav';
import { DeveloperHeader } from '@/components/developer/developer-header';
import { DeveloperOverview } from '@/components/developer/developer-overview';
import { SearchDatasets } from '@/components/developer/search-datasets';
import { APICategories } from '@/components/developer/api-categories';
import { APIPlayground } from '@/components/developer/api-playground';
import { SDKSection } from '@/components/developer/sdk-section';
import { APIDocumentation } from '@/components/developer/api-documentation';
import { DatasetExplorer } from '@/components/developer/dataset-explorer';
import { AISearch } from '@/components/developer/ai-search';
import { VectorSearch } from '@/components/developer/vector-search';
import { DeveloperAnalytics } from '@/components/developer/developer-analytics';
import { APIHealth } from '@/components/developer/api-health';
import { UsageBilling } from '@/components/developer/usage-billing';
import { APIKeys } from '@/components/developer/api-keys';
import { Webhooks } from '@/components/developer/webhooks';
import { ExampleApplications } from '@/components/developer/example-applications';
import { CommunityResources } from '@/components/developer/community-resources';
import { DeveloperCTA } from '@/components/developer/developer-cta';
import { DiscoveryAssistant } from '@/components/developer/discovery-assistant';
import { Footer } from '@/components/site/footer';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DevelopersPage() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <PortalNav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-6">
        <DeveloperHeader />
        <DeveloperOverview />
        
        {/* Core Ingestion Catalog search */}
        <SearchDatasets />
        <APICategories />

        {/* Centerpiece Playground Sandbox */}
        <APIPlayground />

        {/* Client SDK Integration examples */}
        <SDKSection />

        {/* Standard API Rules Reference */}
        <APIDocumentation />

        {/* Ingest Explorer list */}
        <DatasetExplorer />

        {/* AI Applications — sovereign data discovery */}
        <AISearch />
        <VectorSearch />

        {/* Developers telemetry analytics */}
        <DeveloperAnalytics />
        <APIHealth />

        {/* Subscriptions & API Key provision */}
        <UsageBilling />
        <APIKeys />
        <Webhooks />

        {/* Application templates & Discord */}
        <ExampleApplications />
        <CommunityResources />

        <DeveloperCTA />
      </main>

      {/* Floating AI Discovery Assistant Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsAssistantOpen(true)}
          className="h-12 w-12 rounded-full shadow-glow hover:shadow-primary/30 p-0 flex items-center justify-center shrink-0 border border-primary/25"
          title="Open AI Applications Assistant"
        >
          <Bot className="h-5.5 w-5.5 text-primary-foreground animate-pulse" />
        </Button>
      </div>

      {/* AI Applications Assistant */}
      <DiscoveryAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />

      <Footer />
    </div>
  );
}
