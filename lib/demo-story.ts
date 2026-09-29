/**
 * Demo narrative data — aligns UI screens to the ZimGuide platform story.
 */

export const PLATFORM_FLOW = [
  { step: 1, label: 'Institution', description: 'Government, university, or archive' },
  { step: 2, label: 'Data Source', description: 'Catalogued institutional dataset' },
  { step: 3, label: 'Connector', description: 'Secure simulated ingestion' },
  { step: 4, label: 'Extraction', description: 'Raw records pulled from source' },
  { step: 5, label: 'Validation', description: 'Schema and business rules' },
  { step: 6, label: 'PII Detection', description: 'Privacy field scan' },
  { step: 7, label: 'Anonymization', description: 'Masking and removal' },
  { step: 8, label: 'Standardization', description: 'Canonical format' },
  { step: 9, label: 'Metadata', description: 'Dictionary and lineage' },
  { step: 10, label: 'Quality Assessment', description: 'Completeness and consistency' },
  { step: 11, label: 'AI Readiness', description: 'RAG and embedding scores' },
  { step: 12, label: 'Data Asset', description: 'Published package' },
  { step: 13, label: 'Marketplace', description: 'Discover and license' },
  { step: 14, label: 'API', description: 'REST and GraphQL gateway' },
  { step: 15, label: 'Developer', description: 'SDKs and documentation' },
  { step: 16, label: 'AI Applications', description: 'Build with sovereign data' },
] as const;

export interface InstitutionSourceProfile {
  connectorId: string;
  institution: string;
  shortName: string;
  dataSource: string;
  sourceType: string;
  format: string;
  recordCount: number;
  refreshCycle: string;
  sector: string;
  datasetId: string;
  marketplaceSlug: string;
}

export const INSTITUTION_SOURCES: Record<string, InstitutionSourceProfile> = {
  national_archives: {
    connectorId: 'national_archives',
    institution: 'National Archives of Zimbabwe',
    shortName: 'NAZ',
    dataSource: 'Historical Documents Catalogue',
    sourceType: 'historical_documents',
    format: 'JSON',
    recordCount: 250,
    refreshCycle: 'Quarterly',
    sector: 'Culture & Heritage',
    datasetId: 'ds_naz_historical_documents_catalogue',
    marketplaceSlug: 'historical-documents-catalogue',
  },
  agritex: {
    connectorId: 'agritex',
    institution: 'AGRITEX',
    shortName: 'AGRITEX',
    dataSource: 'Crop Production Statistics',
    sourceType: 'crop_production',
    format: 'CSV',
    recordCount: 500,
    refreshCycle: 'Seasonal',
    sector: 'Agriculture',
    datasetId: 'ds_agritex_crop_production',
    marketplaceSlug: 'crop-production-statistics',
  },
  zimstat: {
    connectorId: 'zimstat',
    institution: 'Zimbabwe National Statistics Agency',
    shortName: 'ZIMSTAT',
    dataSource: 'Population Statistics',
    sourceType: 'population_statistics',
    format: 'CSV',
    recordCount: 400,
    refreshCycle: 'Annual',
    sector: 'Statistics',
    datasetId: 'ds_zimstat_population_statistics',
    marketplaceSlug: 'population-statistics',
  },
  health: {
    connectorId: 'health',
    institution: 'Ministry of Health and Child Care',
    shortName: 'MoHCC',
    dataSource: 'Health Facility Registry',
    sourceType: 'health_facility_registry',
    format: 'CSV',
    recordCount: 300,
    refreshCycle: 'Monthly',
    sector: 'Health',
    datasetId: 'ds_moh_health_facility_registry',
    marketplaceSlug: 'health-facility-registry',
  },
  surveyor_general: {
    connectorId: 'surveyor_general',
    institution: 'Surveyor General of Zimbabwe',
    shortName: 'SG',
    dataSource: 'Administrative Boundaries',
    sourceType: 'administrative_boundaries',
    format: 'GeoJSON',
    recordCount: 150,
    refreshCycle: 'Biannual',
    sector: 'Geospatial',
    datasetId: 'ds_sg_administrative_boundaries',
    marketplaceSlug: 'administrative-boundaries',
  },
};

export function getInstitutionSource(connectorId: string | null | undefined): InstitutionSourceProfile | null {
  if (!connectorId) return null;
  return INSTITUTION_SOURCES[connectorId] ?? null;
}

/** Demo mode defaults on — set NEXT_PUBLIC_DEMO_MODE=false to use live APIs only */
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE !== 'false';
