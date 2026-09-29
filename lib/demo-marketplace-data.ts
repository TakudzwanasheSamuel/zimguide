/**
 * Demo marketplace datasets aligned to connector institutions.
 * Used when NEXT_PUBLIC_DEMO_MODE=true or registry API is unavailable.
 */

import type { MarketplaceDataset } from './marketplace-data';
import type { MarketplaceStatistics } from './dataset-types';

export const DEMO_MARKETPLACE_DATASETS: MarketplaceDataset[] = [
  {
    id: 'ds_naz_historical_documents_catalogue',
    name: 'Historical Documents Catalogue',
    institution: 'National Archives of Zimbabwe',
    institutionType: 'Archives',
    category: 'Culture & Heritage',
    description:
      'Synthetic archival catalogue of historical documents across Zimbabwean provinces — manuscripts, letters, and oral history transcripts for demonstration.',
    records: '250 records',
    recordCount: 250,
    updated: 'Just published',
    formats: ['JSON', 'CSV'],
    quality: 96,
    structure: 'Semi Structured',
    classification: 'Public',
    api: true,
    downloads: 128,
    favorites: 42,
    rating: 4.8,
    reviews: 18,
    pricing: 'Free',
    license: 'Open',
    languages: ['English', 'Shona', 'Ndebele'],
    coverage: 'National',
    owner: 'National Archives of Zimbabwe',
    featured: true,
    isNew: true,
    coverGradient: 'from-amber-500/30 via-orange-500/20 to-yellow-500/30',
  },
  {
    id: 'ds_agritex_crop_production',
    name: 'Crop Production Statistics',
    institution: 'AGRITEX',
    institutionType: 'Government',
    category: 'Agriculture',
    description:
      'District-level crop production statistics including maize, sorghum, and tobacco yields across Zimbabwean provinces.',
    records: '500 records',
    recordCount: 500,
    updated: '3 days ago',
    formats: ['CSV', 'GeoJSON'],
    quality: 94,
    structure: 'Structured',
    classification: 'Public',
    api: true,
    downloads: 890,
    favorites: 210,
    rating: 4.9,
    reviews: 64,
    pricing: 'Free',
    license: 'Open',
    languages: ['English', 'Shona'],
    coverage: 'All provinces',
    owner: 'AGRITEX',
    featured: true,
    trending: true,
    coverGradient: 'from-emerald-500/30 via-green-500/20 to-lime-500/30',
  },
  {
    id: 'ds_zimstat_population_statistics',
    name: 'Population Statistics',
    institution: 'ZIMSTAT',
    institutionType: 'Government',
    category: 'Statistics',
    description: 'Provincial and district population estimates with urban/rural breakdowns from national statistical reporting.',
    records: '400 records',
    recordCount: 400,
    updated: '1 week ago',
    formats: ['CSV', 'Parquet'],
    quality: 97,
    structure: 'Structured',
    classification: 'Public',
    api: true,
    downloads: 1204,
    favorites: 380,
    rating: 4.9,
    reviews: 92,
    pricing: 'Free',
    license: 'Open',
    languages: ['English'],
    coverage: 'National',
    owner: 'ZIMSTAT',
    featured: true,
    coverGradient: 'from-sky-500/30 via-blue-500/20 to-indigo-500/30',
  },
  {
    id: 'ds_moh_health_facility_registry',
    name: 'Health Facility Registry',
    institution: 'Ministry of Health and Child Care',
    institutionType: 'Government',
    category: 'Health',
    description: 'Anonymized registry of clinics, rural health centres, and district hospitals across Zimbabwe.',
    records: '300 records',
    recordCount: 300,
    updated: '5 days ago',
    formats: ['CSV', 'JSON'],
    quality: 92,
    structure: 'Structured',
    classification: 'Restricted',
    api: true,
    downloads: 456,
    favorites: 98,
    rating: 4.7,
    reviews: 31,
    pricing: 'Premium',
    license: 'Research',
    languages: ['English'],
    coverage: 'National',
    owner: 'MoHCC',
    coverGradient: 'from-rose-500/30 via-red-500/20 to-pink-500/30',
  },
  {
    id: 'ds_sg_administrative_boundaries',
    name: 'Administrative Boundaries',
    institution: 'Surveyor General of Zimbabwe',
    institutionType: 'Government',
    category: 'Geospatial',
    description: 'District and provincial administrative boundary polygons for geospatial analysis and mapping applications.',
    records: '150 features',
    recordCount: 150,
    updated: '2 weeks ago',
    formats: ['GeoJSON', 'Parquet'],
    quality: 95,
    structure: 'Structured',
    classification: 'Public',
    api: true,
    downloads: 678,
    favorites: 156,
    rating: 4.8,
    reviews: 44,
    pricing: 'Premium',
    license: 'Commercial',
    languages: ['English'],
    coverage: 'National',
    owner: 'Surveyor General',
    coverGradient: 'from-violet-500/30 via-purple-500/20 to-fuchsia-500/30',
  },
  {
    id: 'ds_msd_rainfall_observations',
    name: 'Rainfall Observations',
    institution: 'Meteorological Services Department',
    institutionType: 'Government',
    category: 'Climate',
    description: 'Daily rainfall and temperature observations from weather stations across Zimbabwe.',
    records: '1,000 records',
    recordCount: 1000,
    updated: '1 day ago',
    formats: ['Parquet', 'CSV'],
    quality: 98,
    structure: 'Structured',
    classification: 'Public',
    api: true,
    downloads: 534,
    favorites: 167,
    rating: 4.9,
    reviews: 56,
    pricing: 'Subscription',
    license: 'Open',
    languages: ['English'],
    coverage: 'National',
    owner: 'MSD',
    trending: true,
    coverGradient: 'from-cyan-500/30 via-teal-500/20 to-blue-500/30',
  },
];

function buildDemoMarketplaceStats(datasets: MarketplaceDataset[]): MarketplaceStatistics {
  const categories: Record<string, number> = {};
  const languages: Record<string, number> = {};
  const institutions = new Set<string>();

  let totalDownloads = 0;
  let qualitySum = 0;
  let aiReadyCount = 0;

  for (const dataset of datasets) {
    institutions.add(dataset.institution);
    categories[dataset.category] = (categories[dataset.category] ?? 0) + 1;
    for (const lang of dataset.languages) {
      languages[lang] = (languages[lang] ?? 0) + 1;
    }
    totalDownloads += dataset.downloads;
    qualitySum += dataset.quality;
    if (dataset.quality >= 85) aiReadyCount += 1;
  }

  const count = datasets.length || 1;
  const averageQuality = qualitySum / count / 100;

  return {
    total_datasets: datasets.length,
    total_institutions: institutions.size,
    categories,
    languages,
    total_downloads: totalDownloads,
    total_api_calls: 12_450,
    revenue_estimate: 2_850,
    ai_ready_percent: Math.round((aiReadyCount / count) * 1000) / 10,
    average_quality_score: Math.round(averageQuality * 1000) / 1000,
    average_marketplace_score: Math.round((averageQuality * 0.96) * 1000) / 1000,
  };
}

export const DEMO_MARKETPLACE_STATS = buildDemoMarketplaceStats(DEMO_MARKETPLACE_DATASETS);
