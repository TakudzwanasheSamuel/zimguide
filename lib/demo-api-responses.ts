/**
 * Simulated API responses for the Developer Portal demo.
 */

export const DEMO_API_RESPONSES = {
  datasetRecords: {
    status: 'success',
    latency_ms: 48,
    dataset_id: 'ds_agritex_crop_production',
    title: 'Crop Production Statistics',
    institution: 'AGRITEX',
    record_count: 500,
    page: 1,
    limit: 3,
    data: [
      {
        record_id: 'AGRITEX-CP-0001',
        province: 'Masvingo',
        district: 'Chiredzi',
        crop_type: 'Maize',
        season: '2024/25 Summer',
        area_hectares: 1250.5,
        yield_tonnes: 3200,
        input_programme: 'Pfumvudza/Intwasa',
      },
      {
        record_id: 'AGRITEX-CP-0002',
        province: 'Masvingo',
        district: 'Gutu',
        crop_type: 'Sorghum',
        season: '2024/25 Summer',
        area_hectares: 890.2,
        yield_tonnes: 1450,
        input_programme: 'Self-Financed',
      },
      {
        record_id: 'AGRITEX-CP-0003',
        province: 'Midlands',
        district: 'Gweru',
        crop_type: 'Maize',
        season: '2024/25 Summer',
        area_hectares: 2100,
        yield_tonnes: 5400,
        input_programme: 'Command Agriculture',
      },
    ],
  },

  datasetSearch: {
    status: 'success',
    latency_ms: 62,
    results_count: 3,
    query: { province: 'Masvingo', category: 'Agriculture', language: 'English' },
    data: [
      {
        dataset_id: 'ds_agritex_crop_production',
        title: 'Crop Production Statistics',
        institution: 'AGRITEX',
        quality_score: 0.94,
        ai_readiness_score: 0.91,
        record_count: 500,
        formats: ['CSV', 'GeoJSON'],
        coverage: 'Masvingo, Chiredzi, Gutu',
      },
      {
        dataset_id: 'ds_msd_rainfall_observations',
        title: 'Rainfall Observations',
        institution: 'Meteorological Services',
        quality_score: 0.98,
        ai_readiness_score: 0.95,
        record_count: 1000,
        formats: ['Parquet', 'CSV'],
        coverage: 'Masvingo Province',
      },
    ],
  },

  datasetSchema: {
    status: 'success',
    dataset_id: 'ds_naz_historical_documents_catalogue',
    primary_key: 'document_id',
    fields: [
      { name: 'document_id', type: 'string', required: true },
      { name: 'title', type: 'string', required: true },
      { name: 'province', type: 'string', required: true },
      { name: 'language', type: 'string', required: true },
      { name: 'digitization_status', type: 'string', required: true },
    ],
  },

  vectorSearch: {
    status: 'success',
    latency_ms: 95,
    query: 'agricultural datasets Masvingo province',
    matches: [
      { id: 'vec_agritex_001', score: 0.94, dataset: 'Crop Production Statistics', institution: 'AGRITEX' },
      { id: 'vec_msd_042', score: 0.87, dataset: 'Rainfall Observations', institution: 'MSD' },
      { id: 'vec_zimstat_018', score: 0.79, dataset: 'Population Statistics', institution: 'ZIMSTAT' },
    ],
  },
};

export function resolveDemoApiResponse(endpoint: string): unknown {
  if (endpoint.includes('records')) return DEMO_API_RESPONSES.datasetRecords;
  if (endpoint.includes('schema')) return DEMO_API_RESPONSES.datasetSchema;
  if (endpoint.includes('vector')) return DEMO_API_RESPONSES.vectorSearch;
  return DEMO_API_RESPONSES.datasetSearch;
}
