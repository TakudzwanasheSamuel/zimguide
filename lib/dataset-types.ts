/** API types for the ZimGuide Dataset Registry. */

export interface DatasetScores {
  popularity: number;
  quality: number;
  freshness: number;
  ai_readiness: number;
  commercial_value: number;
  marketplace_score: number;
}

export interface RegistryDataset {
  uuid: string;
  id: string;
  slug: string;
  title: string;
  description: string;
  institution: string;
  source_key: string;
  category: string;
  subcategory: string;
  tags: string[];
  keywords: string[];
  languages: string[];
  province_coverage: string[];
  temporal_coverage: string[];
  version: string;
  created_at: string;
  updated_at: string;
  owner: string;
  formats: string[];
  record_count: number;
  file_size_bytes: number;
  quality_score: number;
  ai_readiness: number;
  license: string;
  commercial_status: string;
  pricing_tier: string;
  price_amount: number;
  api_endpoint: string | null;
  download_endpoint: string | null;
  preview_endpoint: string | null;
  thumbnail: string;
  status: string;
  downloads: number;
  api_calls: number;
  favorites: number;
  rating: number;
  reviews: number;
  featured: boolean;
  trending: boolean;
  scores: DatasetScores;
}

export interface DatasetPreview {
  dataset_id: string;
  sample_rows: Record<string, unknown>[];
  column_statistics: Array<{
    name: string;
    dtype: string;
    null_count: number;
    null_pct: number;
    unique_count: number;
    sample_values: unknown[];
  }>;
  data_schema: Record<string, unknown>;
  metadata: Record<string, unknown>;
  quality: Record<string, unknown>;
  ai_readiness: Record<string, unknown>;
  license: string;
}

export interface MarketplaceStatistics {
  total_datasets: number;
  total_institutions: number;
  categories: Record<string, number>;
  languages: Record<string, number>;
  total_downloads: number;
  total_api_calls: number;
  revenue_estimate: number;
  ai_ready_percent: number;
  average_quality_score: number;
  average_marketplace_score: number;
}
