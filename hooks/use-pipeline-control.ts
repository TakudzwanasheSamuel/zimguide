'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { pipelineApi } from '@/lib/pipeline-api';
import type { PipelineLogEntry, PipelineStageId, PipelineStageStatus, PipelineStatus } from '@/lib/pipeline-types';
import { formatTime } from '@/lib/connector-utils';

export function usePipelineControl() {
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<PipelineLogEntry[]>([]);
  const [elapsedMs, setElapsedMs] = useState(0);
  const startRef = useRef<number>(0);
  const prevStageRef = useRef<string | null>(null);
  const progressFrameRef = useRef<number>();

  const statusQuery = useQuery({
    queryKey: ['pipeline', 'status'],
    queryFn: pipelineApi.status,
    refetchInterval: isProcessing ? 350 : false,
  });

  const logsQuery = useQuery({
    queryKey: ['pipeline', 'logs'],
    queryFn: pipelineApi.logs,
    refetchInterval: isProcessing ? 500 : false,
  });

  const qualityQuery = useQuery({
    queryKey: ['pipeline', 'quality'],
    queryFn: pipelineApi.quality,
    enabled: !isProcessing && (statusQuery.data?.state === 'completed'),
  });

  const aiReadinessQuery = useQuery({
    queryKey: ['pipeline', 'ai-readiness'],
    queryFn: pipelineApi.aiReadiness,
    enabled: !isProcessing && (statusQuery.data?.state === 'completed'),
  });

  const status = statusQuery.data;

  useEffect(() => {
    if (!isProcessing) return;
    const interval = setInterval(() => {
      setElapsedMs(Date.now() - startRef.current);
    }, 200);
    return () => clearInterval(interval);
  }, [isProcessing]);

  useEffect(() => {
    const target = status?.progress ?? 0;
    const animate = () => {
      setDisplayProgress((current) => {
        const diff = target - current;
        if (Math.abs(diff) < 0.2) return target;
        return current + diff * 0.15;
      });
      progressFrameRef.current = requestAnimationFrame(animate);
    };
    if (isProcessing) {
      progressFrameRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (progressFrameRef.current) cancelAnimationFrame(progressFrameRef.current);
    };
  }, [status?.progress, isProcessing]);

  useEffect(() => {
    if (logsQuery.data) {
      setTerminalLogs(logsQuery.data);
    }
  }, [logsQuery.data]);

  useEffect(() => {
    if (!status?.current_stage) return;
    if (prevStageRef.current !== status.current_stage) {
      prevStageRef.current = status.current_stage;
    }
  }, [status?.current_stage]);

  useEffect(() => {
    if (status?.state === 'completed' || status?.state === 'failed') {
      setIsProcessing(false);
      queryClient.invalidateQueries({ queryKey: ['pipeline'] });
    }
  }, [status?.state, queryClient]);

  const runMutation = useMutation({
    mutationFn: pipelineApi.run,
    onMutate: () => {
      setIsProcessing(true);
      setDisplayProgress(0);
      setElapsedMs(0);
      startRef.current = Date.now();
      prevStageRef.current = null;
      setTerminalLogs([]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pipeline', 'status'] });
      queryClient.invalidateQueries({ queryKey: ['pipeline', 'logs'] });
    },
    onError: () => {
      setIsProcessing(false);
    },
  });

  const startPipeline = useCallback(
    (sourceKey?: string, slug?: string, autoTriggered = false) => {
      runMutation.mutate({
        source_key: sourceKey,
        slug,
        auto_triggered: autoTriggered,
      });
    },
    [runMutation],
  );

  const getStageState = useCallback(
    (stageId: PipelineStageId) => {
      return status?.stages.find((s: PipelineStageStatus) => s.stage_id === stageId);
    },
    [status],
  );

  return {
    status,
    isProcessing,
    displayProgress,
    elapsedMs,
    terminalLogs,
    quality: qualityQuery.data,
    aiReadiness: aiReadinessQuery.data,
    startPipeline,
    getStageState,
    isComplete: status?.state === 'completed',
    isFailed: status?.state === 'failed',
    error: status?.last_error,
  };
}
