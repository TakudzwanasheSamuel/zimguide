import type {
  Connector,
  ConnectorDetail,
  ConnectorStatus,
  DashboardStatistics,
  HealthReport,
  SyncResponse,
} from './connector-types';

const API_BASE =
  process.env.NEXT_PUBLIC_CONNECTOR_API_URL ?? 'http://127.0.0.1:8000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => res.statusText);
    throw new Error(detail || `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export const connectorApi = {
  list: () => request<Connector[]>('/connectors'),

  detail: (id: string) => request<ConnectorDetail>(`/connectors/${id}`),

  status: () => request<ConnectorStatus[]>('/connectors/status'),

  health: () => request<HealthReport[]>('/connectors/health'),

  dashboard: () => request<DashboardStatistics>('/connectors/dashboard'),

  connect: (id: string) =>
    request<ConnectorStatus>(`/connectors/${id}/connect`, { method: 'POST' }),

  disconnect: (id: string) =>
    request<ConnectorStatus>(`/connectors/${id}/disconnect`, { method: 'POST' }),

  sync: (id: string) =>
    request<SyncResponse>(`/connectors/${id}/sync`, { method: 'POST' }),

  syncAll: () =>
    request<{ results: SyncResponse[]; statistics: DashboardStatistics }>(
      '/connectors/sync-all',
      { method: 'POST' },
    ),
};

export function getApiBaseUrl() {
  return API_BASE;
}
