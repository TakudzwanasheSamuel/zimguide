import type { PipelineLogEntry, PipelineRunRequest, PipelineStatus } from './pipeline-types';

export type { PipelineLogEntry, PipelineRunRequest, PipelineStatus };

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

export const pipelineApi = {
  status: () => request<PipelineStatus>('/pipeline/status'),

  run: (body?: PipelineRunRequest) =>
    request<PipelineStatus>('/pipeline/run', {
      method: 'POST',
      body: JSON.stringify(body ?? {}),
    }),

  logs: () => request<PipelineLogEntry[]>('/pipeline/logs'),

  reports: () => request<Record<string, unknown>>('/pipeline/reports'),

  quality: () => request<Record<string, unknown>>('/pipeline/quality'),

  aiReadiness: () => request<Record<string, unknown>>('/pipeline/ai-readiness'),

  metadata: () => request<Record<string, unknown>>('/pipeline/metadata'),
};
