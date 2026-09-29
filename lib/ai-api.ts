import type {
  ChatResponse,
  DiscoveryResult,
  SemanticSearchResponse,
  VectorSearchResponse,
  WorkspaceState,
} from './ai-types';

const API_BASE =
  process.env.NEXT_PUBLIC_CONNECTOR_API_URL ?? 'http://127.0.0.1:8000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => res.statusText);
    throw new Error(detail || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const aiApi = {
  search: (prompt: string, limit = 10) =>
    request<SemanticSearchResponse>('/ai/search', {
      method: 'POST',
      body: JSON.stringify({ prompt, limit }),
    }),

  chat: (message: string, sessionId?: string, limit = 5) =>
    request<ChatResponse>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, session_id: sessionId, limit }),
    }),

  vectors: (query: string, limit = 6) =>
    request<VectorSearchResponse>(`/ai/vectors?query=${encodeURIComponent(query)}&limit=${limit}`),

  workspace: () => request<WorkspaceState>('/ai/workspace'),

  saveDataset: (datasetId: string) =>
    request<WorkspaceState>(`/ai/workspace/datasets/${datasetId}`, { method: 'POST' }),

  exportWorkspace: () => request<{ workspace: WorkspaceState; exported_at: string }>('/ai/workspace/export'),

  notebookUrl: (datasetIds: string[]) => {
    const ids = datasetIds.join(',');
    return `${API_BASE}/ai/notebook/download?dataset_ids=${encodeURIComponent(ids)}`;
  },
};

export function toAssistantCard(result: DiscoveryResult): import('./ai-types').AssistantDatasetCard {
  return {
    id: result.dataset_id,
    name: result.title,
    provider: result.institution,
    desc: result.description,
    qualityScore: Math.round(result.quality_score * 100),
    records: `${result.record_count.toLocaleString()} records`,
    languages: result.tags.filter((t) => /shona|ndebele|english/i.test(t)).length
      ? result.tags.filter((t) => /shona|ndebele|english/i.test(t))
      : ['English'],
    formats: result.formats,
    license: result.license,
    price: result.pricing_tier,
    apiAvailable: !!result.api_endpoint,
    llmScore: Math.round(result.ai_readiness * 100),
    similarityScore: Math.round(result.similarity_score * 100),
    category: result.category,
  };
}
