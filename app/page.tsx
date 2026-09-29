import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { Hero } from '@/components/sections/hero';
import { ProblemStatement } from '@/components/sections/problem-statement';
import { PlatformFlow } from '@/components/sections/platform-flow';
import { Solutions } from '@/components/sections/solutions';
import { TrustedSources } from '@/components/sections/trusted-sources';
import { DataTypes } from '@/components/sections/data-types';
import { DataCharacteristics } from '@/components/sections/data-characteristics';
import { CurationPipeline } from '@/components/sections/curation-pipeline';
import { TechHighlights } from '@/components/sections/tech-highlights';
import { DatasetPreview } from '@/components/sections/dataset-preview';
import { LiveMetrics } from '@/components/sections/live-metrics';
import { PricingPreview } from '@/components/sections/pricing-preview';
import { FinalCTA } from '@/components/sections/final-cta';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <ProblemStatement />
        <PlatformFlow />
        <Solutions />
        <TrustedSources />
        <DataTypes />
        <DataCharacteristics />
        <CurationPipeline />
        <TechHighlights />
        <DatasetPreview />
        <LiveMetrics />
        <PricingPreview />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
