/**
 * Simulated AI Applications responses for demo mode.
 */

import type { ChatResponse, DiscoveryResult } from './ai-types';

const AGRITEX_RESULT: DiscoveryResult = {
  dataset_id: 'ds_agritex_crop_production',
  title: 'Crop Production Statistics',
  institution: 'AGRITEX',
  description:
    'District-level crop production including maize and sorghum in Masvingo, Chiredzi, and Gutu.',
  similarity_score: 0.96,
  quality_score: 0.94,
  ai_readiness: 0.91,
  pricing_tier: 'Free',
  license: 'Open',
  api_endpoint: '/v1/datasets/ds_agritex_crop_production/records',
  formats: ['CSV', 'GeoJSON'],
  preview_endpoint: '/datasets/ds_agritex_crop_production/preview',
  tags: ['agriculture', 'crops', 'masvingo'],
  category: 'Agriculture',
  record_count: 500,
};

const RAINFALL_RESULT: DiscoveryResult = {
  dataset_id: 'ds_msd_rainfall_observations',
  title: 'Rainfall Observations',
  institution: 'Meteorological Services Department',
  description: 'Daily rainfall observations supporting agricultural planning in Masvingo.',
  similarity_score: 0.87,
  quality_score: 0.98,
  ai_readiness: 0.95,
  pricing_tier: 'Subscription',
  license: 'Open',
  api_endpoint: '/v1/datasets/ds_msd_rainfall_observations/records',
  formats: ['Parquet', 'CSV'],
  preview_endpoint: '/datasets/ds_msd_rainfall_observations/preview',
  tags: ['climate', 'rainfall', 'masvingo'],
  category: 'Climate',
  record_count: 1000,
};

function baseResponse(partial: Partial<ChatResponse> & Pick<ChatResponse, 'text' | 'response_type'>): ChatResponse {
  return {
    session_id: 'demo_session',
    message: '',
    intent: 'demo',
    api_recommendations: [],
    architecture: [],
    explanations: [],
    results: [],
    ...partial,
  };
}

export function getDemoChatResponse(message: string): ChatResponse {
  const lower = message.toLowerCase();
  const isAgriculture =
    lower.includes('agricult') || lower.includes('crop') || lower.includes('masvingo');
  const isApi = lower.includes('api') || lower.includes('python') || lower.includes('sdk');
  const isRag = lower.includes('rag') || lower.includes('embedding');

  if (isApi) {
    return baseResponse({
      session_id: 'demo_session_api',
      text: 'Here is a Python example to access AGRITEX crop production data for Masvingo via the ZimGuide API gateway.',
      response_type: 'code',
      sdk_language: 'python',
      sdk_code: `import requests

BASE_URL = "https://api.zimguide.local/v1"
headers = {"X-API-Key": "zg_free_demo0001"}

response = requests.get(
    f"{BASE_URL}/datasets/ds_agritex_crop_production/records",
    headers=headers,
    params={"province": "Masvingo", "limit": 100},
)
data = response.json()
print(f"Retrieved {len(data['data'])} crop records")`,
      rest_example: `GET /v1/datasets/ds_agritex_crop_production/records?province=Masvingo&limit=100
Headers:
  X-API-Key: zg_free_demo0001`,
      graphql_example: `query CropData {
  dataset(id: "ds_agritex_crop_production") {
    title
    records(filter: { province: "Masvingo" }, limit: 100) {
      crop_type
      yield_tonnes
      district
    }
  }
}`,
      api_recommendations: [
        {
          method: 'GET',
          path: '/v1/datasets/ds_agritex_crop_production/records',
          description: 'Fetch crop production records',
          example: 'GET /v1/datasets/ds_agritex_crop_production/records?province=Masvingo',
        },
      ],
    });
  }

  if (isRag) {
    return baseResponse({
      session_id: 'demo_session_rag',
      text: 'These datasets are well-suited for RAG pipelines — structured metadata, high quality scores, and multilingual tags.',
      response_type: 'readiness',
      results: [AGRITEX_RESULT, RAINFALL_RESULT],
    });
  }

  if (isAgriculture) {
    return baseResponse({
      session_id: 'demo_session_agri',
      text: 'I found agricultural datasets covering Masvingo province. AGRITEX crop production data is the best match for district-level yield analysis.',
      response_type: 'dataset',
      results: [AGRITEX_RESULT, RAINFALL_RESULT],
      explanations: [
        {
          dataset_id: 'ds_agritex_crop_production',
          why_this_dataset:
            'Contains Masvingo district crop yields with seasonal metadata — ideal for agricultural dashboards and policy research.',
          strengths: ['High quality score', 'District-level granularity', 'CSV and GeoJSON formats'],
          weaknesses: ['Synthetic demonstration data'],
          suggested_use_cases: ['Policy dashboards', 'RAG knowledge bases', 'Yield forecasting'],
          recommended_models: ['GPT-4', 'Claude', 'Llama 3'],
          suggested_visualizations: ['Choropleth by district', 'Seasonal yield trends'],
          license_recommendation: 'CC-BY-4.0 with attribution to AGRITEX',
          ai_readiness_explanation: 'Structured tabular fields with complete metadata and data dictionary.',
        },
      ],
      api_recommendations: [
        {
          method: 'GET',
          path: '/v1/datasets/ds_agritex_crop_production/records',
          description: 'Access crop records via REST API',
          example: 'curl -H "X-API-Key: zg_free_demo0001" .../records?province=Masvingo',
        },
      ],
    });
  }

  return baseResponse({
    text: 'I can help you discover Zimbabwean datasets, generate API examples, and recommend AI-ready assets. Try: "Find agricultural datasets for Masvingo".',
    response_type: 'text',
  });
}
