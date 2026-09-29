/** TypeScript types matching the ZimGuide Connector Engine API. */

export type ConnectorState =
  | 'Disconnected'
  | 'Connecting'
  | 'Authenticating'
  | 'Connected'
  | 'Discovering'
  | 'Downloading'
  | 'Completed'
  | 'Failed'
  | 'Retrying';

export type AuthMethod = 'OAuth2' | 'API Key' | 'Token' | 'Institution Credentials';

export interface Connector {
  id: string;
  name: string;
  institution: string;
  description: string;
  auth_method: AuthMethod;
  base_url: string;
  source_key: string;
  enabled: boolean;
  tags: string[];
}

export interface ConnectorStatus {
  connector_id: string;
  state: ConnectorState;
  progress: number;
  message: string;
  started_at: string | null;
  updated_at: string | null;
  completed_at: string | null;
  duration_ms: number | null;
  authenticated: boolean;
  datasets_discovered: number;
  datasets_extracted: number;
  last_error: string | null;
}

export interface DatasetDiscovery {
  dataset_id: string;
  title: string;
  description: string;
  record_count: number;
  size_bytes: number;
  formats: string[];
  last_updated: string;
  license: string;
  category: string;
  slug: string;
  extractable: boolean;
  source_files: string[];
}

export interface ExtractionResult {
  connector_id: string;
  dataset_id: string;
  dataset_slug: string;
  status: string;
  started_at: string;
  completed_at: string;
  duration_ms: number;
  records: number;
  checksum: string;
  source_path: string;
  destination_path: string;
  files_copied: string[];
  message: string;
}

export interface HealthReport {
  connector_id: string;
  availability: number;
  latency_ms: number;
  throughput_records_per_sec: number;
  authentication_status: string;
  dataset_count: number;
  last_sync: string | null;
  health_score: number;
  state: ConnectorState;
  messages: string[];
}

export interface DashboardStatistics {
  total_connectors: number;
  connected: number;
  syncing: number;
  failed: number;
  total_datasets_discovered: number;
  total_records_extracted: number;
  last_sync: string | null;
  average_health_score: number;
  connectors: Array<{
    id: string;
    name: string;
    institution: string;
    state: string;
    progress: number;
    message: string;
    authenticated: boolean;
    datasets_discovered: number;
    datasets_extracted: number;
    health_score: number;
    last_sync: string | null;
  }>;
}

export interface ConnectorDetail {
  connector: Connector;
  status: ConnectorStatus;
  health: HealthReport;
  datasets: DatasetDiscovery[];
  extractions: ExtractionResult[];
  statistics: {
    datasets_discovered: number;
    datasets_extracted: number;
    records_extracted: number;
  };
}

export interface SyncResponse {
  connector_id: string;
  state: string;
  progress: number;
  message: string;
  datasets: DatasetDiscovery[];
  extractions: ExtractionResult[];
  statistics: {
    datasets_discovered: number;
    datasets_extracted: number;
    records_extracted: number;
    completed_at: string;
  };
}

export interface TerminalLog {
  id: string;
  timestamp: string;
  message: string;
  level: 'info' | 'success' | 'warning' | 'error';
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: 'start' | 'auth' | 'download' | 'metadata' | 'complete' | 'error';
}

export type SyncStage =
  | 'connecting'
  | 'authenticating'
  | 'discovering'
  | 'downloading'
  | 'metadata'
  | 'copying'
  | 'logging'
  | 'complete';

export const SYNC_STAGES: { id: SyncStage; label: string }[] = [
  { id: 'connecting', label: 'Connecting' },
  { id: 'authenticating', label: 'Authenticating' },
  { id: 'discovering', label: 'Discovering Datasets' },
  { id: 'downloading', label: 'Downloading Files' },
  { id: 'metadata', label: 'Extracting Metadata' },
  { id: 'copying', label: 'Copying Raw Dataset' },
  { id: 'logging', label: 'Generating Extraction Log' },
  { id: 'complete', label: 'Synchronization Complete' },
];

export const PIPELINE_STAGES = [
  'Institution',
  'Connector',
  'Authentication',
  'Discovery',
  'Extraction',
  'Raw Dataset',
  'Extraction Layer',
] as const;

export type PipelineStageName = (typeof PIPELINE_STAGES)[number];
