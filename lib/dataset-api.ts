import type { RegistryDataset, DatasetPreview, MarketplaceStatistics } from './dataset-types';

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

export const datasetApi = {
  list: () => request<RegistryDataset[]>('/datasets'),

  get: (id: string) => request<RegistryDataset>(`/datasets/${id}`),

  search: (params: Record<string, string | number | boolean | undefined>) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') query.set(k, String(v));
    });
    return request<{ total: number; datasets: RegistryDataset[] }>(
      `/datasets/search?${query.toString()}`,
    );
  },

  featured: (limit = 4) =>
    request<RegistryDataset[]>(`/datasets/featured?limit=${limit}`),

  latest: (limit = 6) =>
    request<RegistryDataset[]>(`/datasets/latest?limit=${limit}`),

  categories: () => request<Record<string, number>>('/datasets/categories'),

  stats: () => request<MarketplaceStatistics>('/datasets/stats'),

  preview: (id: string) => request<DatasetPreview>(`/datasets/${id}/preview`),

  related: (id: string) =>
    request<{ dataset_id: string; related: RegistryDataset[] }>(
      `/datasets/${id}/related`,
    ),
};

export type { RegistryDataset, DatasetPreview, MarketplaceStatistics };
