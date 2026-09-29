'use client';

import { useQuery } from '@tanstack/react-query';
import { datasetApi } from '@/lib/dataset-api';
import { toMarketplaceDataset } from '@/lib/marketplace-mapper';
import type { MarketplaceDataset } from '@/lib/marketplace-data';
import { DEMO_MARKETPLACE_DATASETS, DEMO_MARKETPLACE_STATS } from '@/lib/demo-marketplace-data';
import { DEMO_MODE } from '@/lib/demo-story';

function filterDemoDatasets(datasets: MarketplaceDataset[], searchQuery?: string): MarketplaceDataset[] {
  if (!searchQuery || searchQuery.length < 2) return datasets;
  const q = searchQuery.toLowerCase();
  return datasets.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.institution.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q),
  );
}

export function useMarketplace(searchQuery?: string) {
  const listQuery = useQuery({
    queryKey: ['datasets', 'list'],
    queryFn: datasetApi.list,
    enabled: !DEMO_MODE,
    retry: false,
  });

  const searchResult = useQuery({
    queryKey: ['datasets', 'search', searchQuery],
    queryFn: () => datasetApi.search({ q: searchQuery, limit: 100 }),
    enabled: !DEMO_MODE && !!searchQuery && searchQuery.length > 1,
    retry: false,
  });

  const featuredQuery = useQuery({
    queryKey: ['datasets', 'featured'],
    queryFn: () => datasetApi.featured(4),
    enabled: !DEMO_MODE,
    retry: false,
  });

  const latestQuery = useQuery({
    queryKey: ['datasets', 'latest'],
    queryFn: () => datasetApi.latest(6),
    enabled: !DEMO_MODE,
    retry: false,
  });

  const statsQuery = useQuery({
    queryKey: ['datasets', 'stats'],
    queryFn: datasetApi.stats,
    enabled: !DEMO_MODE,
    retry: false,
  });

  const useDemoData =
    DEMO_MODE ||
    listQuery.isError ||
    featuredQuery.isError;

  const demoFiltered = filterDemoDatasets(DEMO_MARKETPLACE_DATASETS, searchQuery);
  const demoFeatured = DEMO_MARKETPLACE_DATASETS.filter((d) => d.featured).slice(0, 4);
  const demoLatest = DEMO_MARKETPLACE_DATASETS.filter((d) => d.isNew || d.trending).slice(0, 6);

  const rawDatasets =
    !useDemoData && searchQuery && searchQuery.length > 1
      ? searchResult.data?.datasets ?? []
      : !useDemoData
        ? listQuery.data ?? []
        : [];

  const datasets: MarketplaceDataset[] = useDemoData
    ? demoFiltered
    : rawDatasets.map(toMarketplaceDataset);

  const featured: MarketplaceDataset[] = useDemoData
    ? demoFeatured
    : (featuredQuery.data ?? []).map(toMarketplaceDataset);

  const latest: MarketplaceDataset[] = useDemoData
    ? demoLatest.length > 0
      ? demoLatest
      : DEMO_MARKETPLACE_DATASETS.slice(0, 6)
    : (latestQuery.data ?? []).map(toMarketplaceDataset);

  return {
    datasets,
    featured,
    latest,
    stats: useDemoData ? DEMO_MARKETPLACE_STATS : statsQuery.data,
    isLoading: !useDemoData && (listQuery.isLoading || featuredQuery.isLoading),
    isError: !useDemoData && listQuery.isError,
    isDemoMode: useDemoData,
    refetch: () => {
      listQuery.refetch();
      featuredQuery.refetch();
      latestQuery.refetch();
      statsQuery.refetch();
    },
  };
}

export function useDatasetPreview(datasetId: string | null) {
  return useQuery({
    queryKey: ['datasets', 'preview', datasetId],
    queryFn: () => datasetApi.preview(datasetId!),
    enabled: !!datasetId && !DEMO_MODE,
    retry: false,
  });
}
