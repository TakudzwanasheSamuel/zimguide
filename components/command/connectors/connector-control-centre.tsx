'use client';

import { Cable, AlertTriangle, RefreshCw } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { useConnectorControl } from '@/hooks/use-connector-control';
import { ConnectorCard } from './connector-card';
import { LivePipeline } from './live-pipeline';
import { LiveTerminal } from './live-terminal';
import { ConnectorHealthCard } from './connector-health-card';
import { ExtractionStats } from './extraction-stats';
import { DatasetDiscoveryTable } from './dataset-discovery-table';
import { ActivityTimeline } from './activity-timeline';
import { SystemOverview } from './system-overview';
import { ProcessingPipeline } from './processing-pipeline';
import { InstitutionSourcePanel } from './institution-source-panel';
import { getApiBaseUrl } from '@/lib/connector-api';
import type { Connector, ConnectorStatus, HealthReport } from '@/lib/connector-types';

export function ConnectorControlCentre() {
  const {
    connectors,
    statuses,
    healthReports,
    dashboard,
    activeConnectorId,
    activeStatus,
    activeHealth,
    isSyncing,
    isLoading,
    isApiError,
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
    refetch,
  } = useConnectorControl();

  const activeConnector = connectors.find((c: Connector) => c.id === activeConnectorId);
  const currentDataset = datasets.find((d) => d.extractable)?.title;
  const extractableSlug = datasets.find((d) => d.extractable)?.slug;
  const showProcessingPipeline = syncStage === 'complete' && !error && activeConnectorId && extractableSlug;

  return (
    <section id="connector-control-centre" className="py-10">
      <Reveal direction="up">
        <div className="flex flex-col gap-2 mb-6 px-2">
          <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
            <Cable className="h-4.5 w-4.5 text-primary" />
            Connector Control Centre
          </h3>
          <p className="text-xs text-muted-foreground max-w-3xl">
            Real-time institutional data ingestion visualization. Connectors authenticate,
            discover datasets, and extract raw files into the ZimGuide extraction layer before
            ETL processing.
          </p>
        </div>
      </Reveal>

      {isApiError && (
        <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-300">Backend API Unavailable</p>
            <p className="text-xs text-muted-foreground mt-1">
              Cannot reach the Connector Engine at {getApiBaseUrl()}. Start the backend with{' '}
              <code className="text-primary">python -m uvicorn api.main:app --port 8000</code>
            </p>
            <Button size="sm" variant="outline" className="mt-2 h-8 text-xs" onClick={() => refetch()}>
              <RefreshCw className="h-3 w-3 mr-1" />
              Retry Connection
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-300">Connector Error</p>
              <p className="text-xs text-muted-foreground mt-1 font-mono">{error}</p>
              <p className="text-[10px] text-muted-foreground mt-2">
                Recovery: Verify the institution endpoint is reachable, confirm authentication
                credentials, and retry the sync operation.
              </p>
              <Button size="sm" className="mt-2 h-8 text-xs" onClick={retry}>
                <RefreshCw className="h-3 w-3 mr-1" />
                Retry Sync
              </Button>
            </div>
          </div>
        </div>
      )}

      {syncStage === 'complete' && !error && (
        <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2">
          <div className="flex items-center gap-2 flex-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-semibold text-emerald-300">
              Extraction Complete — Processing Pipeline Starting
            </span>
            <span className="text-xs text-muted-foreground">
              Validation → PII Detection → Anonymization → Data Asset
            </span>
          </div>
        </div>
      )}

      {/* Institution → Data Source context */}
      <div className="mb-6">
        <InstitutionSourcePanel connector={activeConnector} connectorId={activeConnectorId} />
      </div>

      {/* System overview strip */}
      <div className="mb-6">
        <SystemOverview dashboard={dashboard} />
      </div>

      {/* Three-column split layout */}
      <div className="grid gap-6 xl:grid-cols-12">
        {/* LEFT — Institution Connector Panel */}
        <div className="xl:col-span-3 space-y-3">
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-1">
            Institution Connectors
          </h4>
          {isLoading ? (
            <p className="text-xs text-muted-foreground font-mono p-4">Loading connectors...</p>
          ) : (
            connectors.map((connector: Connector) => {
              const status = statuses.find((s: ConnectorStatus) => s.connector_id === connector.id);
              const health = healthReports.find((h: HealthReport) => h.connector_id === connector.id);
              return (
                <ConnectorCard
                  key={connector.id}
                  connector={connector}
                  status={status}
                  health={health}
                  isActive={activeConnectorId === connector.id}
                  isSyncing={isSyncing && activeConnectorId === connector.id}
                  onConnect={() => connect(connector.id)}
                  onRun={() => runConnector(connector.id, connector.institution)}
                  onDisconnect={() => disconnect(connector.id)}
                  onViewDetails={() => viewDetails(connector.id)}
                />
              );
            })
          )}
        </div>

        {/* CENTER — Live Pipeline + Extraction */}
        <div className="xl:col-span-5 space-y-4">
          <LivePipeline
            syncStage={syncStage}
            progress={displayProgress}
            elapsedMs={elapsedMs}
            institutionName={activeConnector?.institution}
            isSyncing={isSyncing}
          />
          <ExtractionStats
            datasetsFound={datasets.length}
            filesDownloaded={filesDownloaded}
            recordsExtracted={
              recordsExtracted ||
              activeStatus?.datasets_extracted ||
              0
            }
            transferSpeed={transferSpeed}
            progress={displayProgress}
            elapsedMs={elapsedMs}
            currentDataset={currentDataset}
            currentFile={currentFile}
            currentSizeBytes={datasets.find((d) => d.extractable)?.size_bytes}
          />

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1">
              Discovered Datasets
            </h4>
            <DatasetDiscoveryTable
              datasets={datasets}
              isSyncing={isSyncing}
              onExtract={(id) => {
                const ds = datasets.find((d) => d.dataset_id === id);
                if (ds && activeConnectorId) {
                  runConnector(activeConnectorId, activeConnector?.institution ?? '');
                }
              }}
            />
          </div>
        </div>

        {/* RIGHT — Logs, Metrics, Health */}
        <div className="xl:col-span-4 space-y-4">
          <LiveTerminal logs={logs} />
          <ConnectorHealthCard health={activeHealth} />
          <ActivityTimeline activities={activities} />
        </div>
      </div>

      {/* Phase 3 — Intelligent Processing Pipeline (auto-starts after sync) */}
      {showProcessingPipeline && (
        <div className="mt-8 border-t border-border/40 pt-8">
          <ProcessingPipeline
            sourceKey={activeConnectorId}
            slug={extractableSlug}
            autoStart
            institutionName={activeConnector?.institution}
          />
        </div>
      )}
    </section>
  );
}
