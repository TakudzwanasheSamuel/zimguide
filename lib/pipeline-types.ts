/** TypeScript types for the ZimGuide processing pipeline API. */

export type PipelineRunState = 'idle' | 'running' | 'completed' | 'failed';

export type StageState = 'pending' | 'running' | 'completed' | 'failed' | 'skipped';

export type PipelineStageId =
  | 'validation'
  | 'cleaning'
  | 'pii_detection'
  | 'anonymization'
  | 'standardization'
  | 'metadata'
  | 'quality'
  | 'ai_readiness'
  | 'packaging';

export interface PipelineStageStatus {
  stage_id: PipelineStageId;
  name: string;
  state: StageState;
  progress: number;
  started_at: string | null;
  completed_at: string | null;
  duration_ms: number | null;
  records_processed: number;
  output_path: string | null;
  message: string;
  warnings: number;
  errors: number;
}

export interface PipelineLogEntry {
  timestamp: string;
  stage: string;
  level: string;
  message: string;
  records_processed: number;
  output_path: string | null;
}

export interface PipelineStatus {
  run_id: string | null;
  state: PipelineRunState;
  current_stage: PipelineStageId | null;
  current_stage_name: string;
  current_dataset: string | null;
  source_key: string | null;
  slug: string | null;
  progress: number;
  started_at: string | null;
  completed_at: string | null;
  elapsed_ms: number;
  estimated_completion_ms: number | null;
  records_processed: number;
  artifacts_generated: string[];
  quality_score: number | null;
  ai_readiness_score: number | null;
  stages: PipelineStageStatus[];
  message: string;
  last_error: string | null;
}

export interface PipelineRunRequest {
  source_key?: string;
  slug?: string;
  auto_triggered?: boolean;
}

export const PROCESSING_STAGES: { id: PipelineStageId; label: string; storyStep: number }[] = [
  { id: 'validation', label: 'Validation', storyStep: 5 },
  { id: 'cleaning', label: 'Data Cleaning', storyStep: 5 },
  { id: 'pii_detection', label: 'PII Detection', storyStep: 6 },
  { id: 'anonymization', label: 'Anonymization', storyStep: 7 },
  { id: 'standardization', label: 'Standardization', storyStep: 8 },
  { id: 'metadata', label: 'Metadata Generation', storyStep: 9 },
  { id: 'quality', label: 'Quality Assessment', storyStep: 10 },
  { id: 'ai_readiness', label: 'AI Readiness Assessment', storyStep: 11 },
  { id: 'packaging', label: 'Data Asset Published', storyStep: 12 },
];
