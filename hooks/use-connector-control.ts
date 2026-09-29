'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { connectorApi } from '@/lib/connector-api';
import type {
  ActivityItem,
  Connector,
  ConnectorDetail,
  ConnectorState,
  ConnectorStatus,
  DatasetDiscovery,
  HealthReport,
  SyncStage,
  TerminalLog,
} from '@/lib/connector-types';
import { formatTime, mapProgressToStage } from '@/lib/connector-utils';

function makeLog(
  message: string,
  level: TerminalLog['level'] = 'info',
): TerminalLog {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: formatTime(),
    message,
    level,
  };
}

function makeActivity(
  title: string,
  description: string,
  type: ActivityItem['type'],
): ActivityItem {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    title,
    description,
    type,
  };
}

export function useConnectorControl() {
  const queryClient = useQueryClient();
  const [activeConnectorId, setActiveConnectorId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [discoveredDatasets, setDiscoveredDatasets] = useState<DatasetDiscovery[]>([]);
  const [syncStage, setSyncStage] = useState<SyncStage>('connecting');
  const [displayProgress, setDisplayProgress] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [filesDownloaded, setFilesDownloaded] = useState(0);
  const [recordsExtracted, setRecordsExtracted] = useState(0);
  const [transferSpeed, setTransferSpeed] = useState(0);

  const prevStateRef = useRef<ConnectorState | null>(null);
  const prevMessageRef = useRef<string>('');
  const syncStartRef = useRef<number>(0);
  const progressFrameRef = useRef<number>();
  const targetProgressRef = useRef(0);

  const connectorsQuery = useQuery({
    queryKey: ['connectors'],
    queryFn: connectorApi.list,
  });

  const statusQuery = useQuery({
    queryKey: ['connectors', 'status'],
    queryFn: connectorApi.status,
    refetchInterval: isSyncing ? 350 : false,
  });

  const healthQuery = useQuery({
    queryKey: ['connectors', 'health'],
    queryFn: connectorApi.health,
    refetchInterval: isSyncing ? 800 : 30_000,
  });

  const dashboardQuery = useQuery({
    queryKey: ['connectors', 'dashboard'],
    queryFn: connectorApi.dashboard,
    refetchInterval: isSyncing ? 800 : 30_000,
  });

  const detailQuery = useQuery({
    queryKey: ['connectors', 'detail', activeConnectorId],
    queryFn: () => connectorApi.detail(activeConnectorId!),
    enabled: !!activeConnectorId,
  });

  const activeStatus: ConnectorStatus | undefined = statusQuery.data?.find(
    (s: ConnectorStatus) => s.connector_id === activeConnectorId,
  );

  const activeHealth = healthQuery.data?.find(
    (h: HealthReport) => h.connector_id === activeConnectorId,
  );

  const appendLog = useCallback((message: string, level: TerminalLog['level'] = 'info') => {
    setLogs((prev) => [...prev, makeLog(message, level)]);
  }, []);

  const prependActivity = useCallback((item: ActivityItem) => {
    setActivities((prev) => [item, ...prev].slice(0, 20));
  }, []);

  // Smooth progress animation toward backend target
  useEffect(() => {
    if (!isSyncing) return;
    targetProgressRef.current = activeStatus?.progress ?? displayProgress;

    const animate = () => {
      setDisplayProgress((current) => {
        const target = targetProgressRef.current;
        const diff = target - current;
        if (Math.abs(diff) < 0.2) return target;
        return current + diff * 0.18;
      });
      progressFrameRef.current = requestAnimationFrame(animate);
    };

    progressFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (progressFrameRef.current) cancelAnimationFrame(progressFrameRef.current);
    };
  }, [activeStatus?.progress, isSyncing, displayProgress]);

  // Elapsed timer during sync
  useEffect(() => {
    if (!isSyncing) return;
    const interval = setInterval(() => {
      setElapsedMs(Date.now() - syncStartRef.current);
    }, 200);
    return () => clearInterval(interval);
  }, [isSyncing]);

  // React to status changes -> logs, stage, stats
  useEffect(() => {
    if (!activeStatus || !isSyncing) return;

    const state = activeStatus.state;
    const message = activeStatus.message;
    const progress = activeStatus.progress;

    setSyncStage(mapProgressToStage(progress, state));

    if (prevStateRef.current !== state) {
      if (prevStateRef.current === 'Authenticating' && state === 'Discovering') {
        prependActivity(
          makeActivity('Authentication Complete', 'Institutional credentials verified', 'auth'),
        );
      }
      const stateLogs: Partial<Record<ConnectorState, string>> = {
        Connecting: 'Connecting to institution endpoint...',
        Authenticating: 'Authentication successful',
        Discovering: 'Discovering datasets...',
        Downloading: 'Downloading dataset files...',
        Completed: 'Extraction complete — synchronization finished',
        Failed: `Connector failed: ${activeStatus.last_error ?? 'Unknown error'}`,
      };
      if (stateLogs[state]) {
        appendLog(
          stateLogs[state]!,
          state === 'Failed' ? 'error' : state === 'Completed' ? 'success' : 'info',
        );
      }
      prevStateRef.current = state;
    }

    if (message && message !== prevMessageRef.current && state === 'Downloading') {
      appendLog(message);
      prevMessageRef.current = message;
      const match = message.match(/for (.+)$/);
      if (match) setCurrentFile(`${match[1]}.csv`);
    }

    if (state === 'Discovering' && activeStatus.datasets_discovered > 0) {
      appendLog(`Found ${activeStatus.datasets_discovered} datasets`, 'success');
    }
  }, [activeStatus, isSyncing, appendLog, prependActivity]);

  const connectMutation = useMutation({
    mutationFn: connectorApi.connect,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['connectors'] });
      setActiveConnectorId(id);
      appendLog(`Connected to ${id.replace(/_/g, ' ')}`, 'success');
    },
    onError: (err: Error) => {
      setError(err.message);
      appendLog(err.message, 'error');
    },
  });

  const disconnectMutation = useMutation({
    mutationFn: connectorApi.disconnect,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connectors'] });
      appendLog('Connector disconnected', 'warning');
    },
  });

  const syncMutation = useMutation({
    mutationFn: connectorApi.sync,
    onSuccess: (data, id) => {
      setDiscoveredDatasets(data.datasets);
      setFilesDownloaded(
        data.extractions.reduce((sum, e) => sum + e.files_copied.length, 0),
      );
      setRecordsExtracted(data.statistics.records_extracted);
      setDisplayProgress(100);
      setSyncStage('complete');
      appendLog('Synchronization complete', 'success');
      prependActivity(
        makeActivity(
          'Synchronization Finished',
          `${data.statistics.records_extracted.toLocaleString()} records extracted`,
          'complete',
        ),
      );
      if (data.extractions.length > 0) {
        data.extractions.forEach((ext) => {
          ext.files_copied.forEach((file) => {
            appendLog(`Downloaded ${file.split(/[/\\]/).pop()}`, 'success');
          });
          prependActivity(
            makeActivity(
              'Dataset Downloaded',
              ext.dataset_slug,
              'download',
            ),
          );
        });
        prependActivity(
          makeActivity('Metadata Generated', 'Extraction metadata written', 'metadata'),
        );
      }
      queryClient.invalidateQueries({ queryKey: ['connectors'] });
      setActiveConnectorId(id);
    },
    onError: (err: Error) => {
      setError(err.message);
      appendLog(err.message, 'error');
      prependActivity(
        makeActivity('Connector Failed', err.message, 'error'),
      );
    },
    onSettled: () => {
      setIsSyncing(false);
      queryClient.invalidateQueries({ queryKey: ['connectors', 'status'] });
      queryClient.invalidateQueries({ queryKey: ['connectors', 'health'] });
      queryClient.invalidateQueries({ queryKey: ['connectors', 'dashboard'] });
    },
  });

  const runConnector = useCallback(
    async (connectorId: string, institutionName: string) => {
      setActiveConnectorId(connectorId);
      setIsSyncing(true);
      setError(null);
      setLogs([]);
      setDiscoveredDatasets([]);
      setFilesDownloaded(0);
      setRecordsExtracted(0);
      setDisplayProgress(0);
      setElapsedMs(0);
      setCurrentFile(null);
      setTransferSpeed(0);
      prevStateRef.current = null;
      prevMessageRef.current = '';
      syncStartRef.current = Date.now();

      appendLog(`Starting ${institutionName} connector...`);
      prependActivity(
        makeActivity('Connector Started', institutionName, 'start'),
      );

      try {
        await syncMutation.mutateAsync(connectorId);
      } catch {
        // handled in onError
      }
    },
    [appendLog, prependActivity, syncMutation],
  );

  const connect = useCallback(
    (connectorId: string) => {
      setActiveConnectorId(connectorId);
      connectMutation.mutate(connectorId);
    },
    [connectMutation],
  );

  const disconnect = useCallback(
    (connectorId: string) => {
      disconnectMutation.mutate(connectorId);
    },
    [disconnectMutation],
  );

  const retry = useCallback(() => {
    if (activeConnectorId) {
      const connector = connectorsQuery.data?.find((c: Connector) => c.id === activeConnectorId);
      if (connector) runConnector(activeConnectorId, connector.institution);
    }
  }, [activeConnectorId, connectorsQuery.data, runConnector]);

  const viewDetails = useCallback((connectorId: string) => {
    setActiveConnectorId(connectorId);
    queryClient.invalidateQueries({ queryKey: ['connectors', 'detail', connectorId] });
  }, [queryClient]);

  // Estimate transfer speed from records / elapsed
  useEffect(() => {
    if (!isSyncing || elapsedMs < 500) return;
    const records = activeStatus?.datasets_extracted
      ? recordsExtracted
      : Math.floor((displayProgress / 100) * (recordsExtracted || 200));
    setTransferSpeed(Math.round((records / (elapsedMs / 1000)) * 10) / 10);
  }, [isSyncing, elapsedMs, displayProgress, recordsExtracted, activeStatus]);

  const activeDetail: ConnectorDetail | undefined = detailQuery.data;
  const datasets =
    discoveredDatasets.length > 0
      ? discoveredDatasets
      : activeDetail?.datasets ?? [];

  return {
    connectors: connectorsQuery.data ?? [],
    statuses: statusQuery.data ?? [],
    healthReports: healthQuery.data ?? [],
    dashboard: dashboardQuery.data,
    activeConnectorId,
    activeStatus,
    activeHealth,
    activeDetail,
    isSyncing,
    isLoading: connectorsQuery.isLoading,
    isApiError: connectorsQuery.isError,
    logs,
    activities,
    datasets,
    syncStage,
    displayProgress,
    elapsedMs,
    error,
    currentFile,
    filesDownloaded,
    recordsExtracted,
    transferSpeed,
    runConnector,
    connect,
    disconnect,
    retry,
    viewDetails,
    refetch: () => {
      connectorsQuery.refetch();
      statusQuery.refetch();
      healthQuery.refetch();
      dashboardQuery.refetch();
    },
  };
}
