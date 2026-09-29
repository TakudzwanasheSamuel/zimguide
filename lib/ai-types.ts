/** API types for the ZimGuide AI Data Discovery Assistant. */

export interface DiscoveryResult {
  dataset_id: string;
  title: string;
  institution: string;
  description: string;
  similarity_score: number;
  quality_score: number;
  ai_readiness: number;
  pricing_tier: string;
  license: string;
  api_endpoint: string | null;
  formats: string[];
  preview_endpoint: string | null;
  tags: string[];
  category: string;
  record_count: number;
}

export interface DatasetExplanation {
  dataset_id: string;
  why_this_dataset: string;
  strengths: string[];
  weaknesses: string[];
  suggested_use_cases: string[];
  recommended_models: string[];
  suggested_visualizations: string[];
  license_recommendation: string;
  ai_readiness_explanation: string;
}

export interface ApiRecommendation {
  method: string;
  path: string;
  description: string;
  example: string;
}

export interface ArchitectureRecommendation {
  pattern: string;
  title: string;
  description: string;
  components: string[];
  suggested_datasets: string[];
  confidence: number;
}

export interface SemanticSearchResponse {
  prompt: string;
  parsed: {
    raw_prompt: string;
    intent: string;
    search_terms: string[];
    category: string | null;
    province: string | null;
    language: string | null;
    ai_ready: boolean;
  };
  total: number;
  results: DiscoveryResult[];
  pipeline: string[];
}

export interface ChatResponse {
  session_id: string;
  message: string;
  intent: string;
  response_type: string;
  text: string;
  results: DiscoveryResult[];
  explanations: DatasetExplanation[];
  api_recommendations: ApiRecommendation[];
  sdk_code?: string | null;
  sdk_language?: string | null;
  rest_example?: string | null;
  graphql_example?: string | null;
  architecture: ArchitectureRecommendation[];
  notebook_download_url?: string | null;
}

export interface VectorNode {
  id: string;
  name: string;
  score: number;
  cx: number;
  cy: number;
  color: string;
  description: string;
}

export interface VectorSearchResponse {
  query: string;
  center_label: string;
  nodes: VectorNode[];
}

export interface WorkspaceState {
  workspace_id: string;
  saved_searches: Array<{
    id: string;
    prompt: string;
    result_count: number;
    created_at: string;
    dataset_ids: string[];
  }>;
  saved_datasets: string[];
  collections: Array<{
    id: string;
    name: string;
    description: string;
    dataset_ids: string[];
    created_at: string;
    updated_at: string;
  }>;
  updated_at: string;
}

/** UI-friendly dataset card mapped from DiscoveryResult */
export interface AssistantDatasetCard {
  id: string;
  name: string;
  provider: string;
  desc: string;
  qualityScore: number;
  records: string;
  languages: string[];
  formats: string[];
  license: string;
  price: string;
  apiAvailable: boolean;
  llmScore: number;
  similarityScore: number;
  category: string;
}
