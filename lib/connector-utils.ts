import type { ConnectorState, SyncStage } from './connector-types';
import { SYNC_STAGES } from './connector-types';

export const STATUS_COLORS: Record<
  ConnectorState,
  { dot: string; text: string; bg: string; border: string }
> = {
  Disconnected: {
    dot: 'bg-slate-500',
    text: 'text-slate-400',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
  },
  Connecting: {
    dot: 'bg-blue-500',
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
  },
  Authenticating: {
    dot: 'bg-amber-500',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
  },
  Connected: {
    dot: 'bg-emerald-500',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
  },
  Discovering: {
    dot: 'bg-purple-500',
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
  },
  Downloading: {
    dot: 'bg-cyan-500',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
  },
  Completed: {
    dot: 'bg-emerald-500',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
  },
  Failed: {
    dot: 'bg-red-500',
    text: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
  },
  Retrying: {
    dot: 'bg-amber-500',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
  },
};

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  const rem = Math.round(seconds % 60);
  return `${minutes}m ${rem}s`;
}

export function formatEta(elapsedMs: number, progress: number): string {
  if (progress <= 0 || progress >= 100) return '--';
  const remaining = (elapsedMs / progress) * (100 - progress);
  return formatDuration(remaining);
}

export function mapProgressToStage(progress: number, state: ConnectorState): SyncStage {
  if (state === 'Failed') return 'connecting';
  if (state === 'Completed' || progress >= 100) return 'complete';
  if (state === 'Connecting' || progress < 15) return 'connecting';
  if (state === 'Authenticating' || progress < 35) return 'authenticating';
  if (state === 'Discovering' || progress < 55) return 'discovering';
  if (state === 'Downloading') {
    if (progress < 70) return 'downloading';
    if (progress < 82) return 'metadata';
    if (progress < 94) return 'copying';
    return 'logging';
  }
  if (progress < 75) return 'authenticating';
  if (progress < 92) return 'discovering';
  if (progress < 96) return 'copying';
  if (progress < 100) return 'logging';
  return 'complete';
}

export function getStageIndex(stage: SyncStage): number {
  return SYNC_STAGES.findIndex((s) => s.id === stage);
}

export function mapPipelineActiveIndex(stage: SyncStage): number {
  const map: Record<SyncStage, number> = {
    connecting: 1,
    authenticating: 2,
    discovering: 3,
    downloading: 4,
    metadata: 4,
    copying: 5,
    logging: 6,
    complete: 7,
  };
  return map[stage];
}

export const INSTITUTION_ICONS: Record<string, string> = {
  national_archives: 'archive',
  zimstat: 'bar-chart',
  agritex: 'wheat',
  msu: 'graduation-cap',
  geospatial: 'map',
};

export function formatTime(date = new Date()): string {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}
