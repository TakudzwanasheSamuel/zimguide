'use client';

import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { PlatformHero } from '@/components/platform/platform-hero';
import { ArchitectureOverview } from '@/components/platform/architecture-overview';
import { FederatedCollection } from '@/components/platform/federated-collection';
import { SecureConnectors } from '@/components/platform/secure-connectors';
import { PipelineVisualization } from '@/components/platform/pipeline-visualization';
import { ExtractionEngine } from '@/components/platform/extraction-engine';
import { DataQualityEngine } from '@/components/platform/data-quality';
import { PrivacyEngine } from '@/components/platform/privacy-engine';
import { DataLineage } from '@/components/platform/data-lineage';
import { MetadataEngine } from '@/components/platform/metadata-engine';
import { AIDatasetBuilder } from '@/components/platform/dataset-builder';
import { APIGateway } from '@/components/platform/api-gateway';
import { PlatformAnalytics } from '@/components/platform/platform-analytics';
import { PlatformSecurity } from '@/components/platform/platform-security';
import { TechStack } from '@/components/platform/tech-stack';
import { FinalCTA } from '@/components/platform/final-cta';

export default function PlatformPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <PlatformHero />
        <ArchitectureOverview />
        <FederatedCollection />
        <SecureConnectors />
        <PipelineVisualization />
        <ExtractionEngine />
        <DataQualityEngine />
        <PrivacyEngine />
        <DataLineage />
        <MetadataEngine />
        <AIDatasetBuilder />
        <APIGateway />
        <PlatformAnalytics />
        <PlatformSecurity />
        <TechStack />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
