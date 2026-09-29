import { formatDistanceToNow } from 'date-fns';
import type { RegistryDataset } from './dataset-types';
import type {
  InstitutionType,
  LicenseType,
  MarketplaceDataset,
  PricingTier,
} from './marketplace-data';

const INSTITUTION_TYPES: Record<string, InstitutionType> = {
  national_archives: 'Archives',
  zimstat: 'Government',
  agritex: 'Government',
  msu: 'University',
  geospatial: 'Government',
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  'Cultural Heritage': 'from-amber-500/30 via-orange-500/20 to-yellow-500/30',
  'Government Statistics': 'from-sky-500/30 via-blue-500/20 to-indigo-500/30',
  Agriculture: 'from-emerald-500/30 via-green-500/20 to-lime-500/30',
  Research: 'from-violet-500/30 via-purple-500/20 to-fuchsia-500/30',
  Geospatial: 'from-cyan-500/30 via-teal-500/20 to-blue-500/30',
};

const PRICING_MAP: Record<string, PricingTier> = {
  free: 'Free',
  research: 'Premium',
  commercial: 'Enterprise',
  enterprise: 'Enterprise',
  government: 'Subscription',
};

const LICENSE_MAP: Record<string, LicenseType> = {
  open: 'Open',
  research_only: 'Research',
  commercial: 'Commercial',
  restricted: 'Restricted',
};

function mapCategory(category: string): string {
  const map: Record<string, string> = {
    'Cultural Heritage': 'Culture',
    'Government Statistics': 'Government',
    Agriculture: 'Agriculture',
    Research: 'Education',
    Geospatial: 'Geospatial',
  };
  return map[category] ?? category;
}

export function toMarketplaceDataset(entry: RegistryDataset): MarketplaceDataset {
  const updated = formatDistanceToNow(new Date(entry.updated_at), { addSuffix: true });
  return {
    id: entry.id,
    name: entry.title,
    institution: entry.institution,
    institutionType: INSTITUTION_TYPES[entry.source_key] ?? 'Government',
    category: mapCategory(entry.category),
    description: entry.description,
    records: `${entry.record_count.toLocaleString()} records`,
    recordCount: entry.record_count,
    updated,
    formats: entry.formats,
    quality: Math.round(entry.quality_score * 100),
    structure: 'Structured',
    classification: entry.commercial_status === 'restricted' ? 'Sensitive' : 'Public',
    api: !!entry.api_endpoint,
    downloads: entry.downloads,
    favorites: entry.favorites,
    rating: entry.rating,
    reviews: entry.reviews,
    pricing: PRICING_MAP[entry.pricing_tier] ?? 'Free',
    license: LICENSE_MAP[entry.commercial_status] ?? 'Open',
    languages: entry.languages,
    coverage: entry.province_coverage.join(', ') || 'Zimbabwe',
    owner: entry.owner,
    featured: entry.featured,
    trending: entry.trending,
    isNew: Date.now() - new Date(entry.created_at).getTime() < 30 * 86400000,
    coverGradient: CATEGORY_GRADIENTS[entry.category] ?? 'from-primary/30 via-accent/20 to-secondary/30',
  };
}
