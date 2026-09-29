'use client';

import { useState } from 'react';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { MarketplaceHeader } from '@/components/marketplace/marketplace-header';
import { FilterSidebar, type FilterState } from '@/components/marketplace/filters';
import { FeaturedDatasets } from '@/components/marketplace/featured-datasets';
import { DatasetGrid } from '@/components/marketplace/dataset-grid';
import { DatasetPreviewModal } from '@/components/marketplace/preview-modal';
import {
  QualityScore, SchemaPreview, ApiAccess, MarketplaceAnalytics,
  TrustCompliance, MarketplacePricing, RecentlyAdded, PopularDatasets,
} from '@/components/marketplace/marketplace-sections';
import type { MarketplaceDataset } from '@/lib/marketplace-data';
import { useMarketplace } from '@/hooks/use-marketplace';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    quickFilter: 'All',
    sidebar: {},
    qualityMin: 0,
  });
  const [previewDataset, setPreviewDataset] = useState<MarketplaceDataset | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { datasets, featured, latest, stats, isLoading, isError, isDemoMode } = useMarketplace(searchQuery);

  const handlePreview = (d: MarketplaceDataset) => {
    setPreviewDataset(d);
    setModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <MarketplaceHeader onSearch={setSearchQuery} />

        {isDemoMode && (
          <div className="mx-auto max-w-7xl px-6 py-3 text-center text-xs text-muted-foreground font-mono border-b border-border/40">
            Demo mode — showcasing institutional datasets aligned to the ZimGuide platform story
          </div>
        )}

        {isError && !isDemoMode && (
          <div className="mx-auto max-w-7xl px-6 py-4 text-center text-sm text-amber-400">
            Unable to load datasets from the registry API. Ensure the backend is running on port 8000.
          </div>
        )}

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-8">
            <FilterSidebar filters={filters} onChange={setFilters} />
            <div className="min-w-0 flex-1">
              <FeaturedDatasets datasets={featured} onPreview={handlePreview} isLoading={isLoading} />
              <DatasetGrid
                datasets={datasets}
                filters={filters}
                onFiltersChange={setFilters}
                searchQuery={searchQuery}
                onPreview={handlePreview}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>

        <QualityScore stats={stats} />
        <SchemaPreview />
        <ApiAccess />
        <MarketplaceAnalytics stats={stats} />
        <TrustCompliance />
        <MarketplacePricing />
        <RecentlyAdded datasets={latest} onPreview={handlePreview} />
        <PopularDatasets datasets={datasets} onPreview={handlePreview} />
      </main>
      <Footer />

      <DatasetPreviewModal
        dataset={previewDataset}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
