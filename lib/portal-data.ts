export interface ExecutiveStat {
  label: string;
  value: string;
  change: string;
  trendingUp: boolean;
  sparkline: number[];
  iconName: 'Database' | 'Layers' | 'Fingerprint' | 'Cpu' | 'Coins' | 'Award';
}

export interface ConnectedSource {
  id: string;
  name: string;
  status: 'online' | 'syncing' | 'idle' | 'offline';
  health: number;
  lastSync: string;
  records: string;
  connectorType: string;
  latency: string;
  errors: number;
}

export interface DataAssetItem {
  id: string;
  name: string;
  version: string;
  records: string;
  quality: number;
  classification: 'Public' | 'Restricted' | 'Confidential';
  downloads: number;
  revenue: string;
  status: 'Published' | 'Processing' | 'Draft';
}

export interface ProcessingLog {
  id: string;
  activity: string;
  timestamp: string;
  status: 'Completed' | 'Warning' | 'Running' | 'Error';
  operator: string;
  processingTime: string;
}

export interface QualityIndicator {
  name: string;
  score: number;
  color: string;
}

export interface APIRequestLog {
  id: string;
  consumer: string;
  endpoint: string;
  requests: number;
  status: number;
  responseTime: string;
  country: string;
  timestamp: string;
}

export interface AIInsightItem {
  id: string;
  type: 'info' | 'warning' | 'success';
  message: string;
  action: string;
}

export const execStats: ExecutiveStat[] = [
  {
    label: 'Connected Data Sources',
    value: '12',
    change: '+2 this month',
    trendingUp: true,
    sparkline: [30, 45, 35, 50, 40, 60, 55, 70, 65, 80],
    iconName: 'Database',
  },
  {
    label: 'Data Assets Published',
    value: '37',
    change: '+5 this quarter',
    trendingUp: true,
    sparkline: [20, 25, 22, 28, 30, 32, 29, 34, 35, 37],
    iconName: 'Layers',
  },
  {
    label: 'Records Managed',
    value: '380K',
    change: '+42K new records',
    trendingUp: true,
    sparkline: [2.5, 2.7, 2.9, 3.0, 3.1, 3.3, 3.4, 3.6, 3.7, 3.8],
    iconName: 'Fingerprint',
  },
  {
    label: 'Monthly API Requests',
    value: '140K',
    change: '+18% vs last month',
    trendingUp: true,
    sparkline: [1.0, 1.1, 0.95, 1.05, 1.2, 1.15, 1.3, 1.25, 1.35, 1.4],
    iconName: 'Cpu',
  },
  {
    label: 'Total Royalties Earned',
    value: 'US$8,425',
    change: '+$1,248 this month',
    trendingUp: true,
    sparkline: [5000, 5300, 5800, 6200, 6500, 6800, 7100, 7500, 7800, 8425],
    iconName: 'Coins',
  },
  {
    label: 'Average Quality Score',
    value: '97.4%',
    change: '+0.8% auto-heal',
    trendingUp: true,
    sparkline: [95.2, 95.8, 96.0, 96.2, 96.5, 96.8, 97.0, 97.1, 97.3, 97.4],
    iconName: 'Award',
  },
];

export const connectedSources: ConnectedSource[] = [
  {
    id: 'src_01',
    name: 'Historical Archives Database',
    status: 'online',
    health: 99.8,
    lastSync: '12 mins ago',
    records: '120K records',
    connectorType: 'SQL Agent Gateway',
    latency: '14ms',
    errors: 0,
  },
  {
    id: 'src_02',
    name: 'National Library Collection',
    status: 'idle',
    health: 98.4,
    lastSync: '4 hours ago',
    records: '640K records',
    connectorType: 'Document Parser SFTP',
    latency: '180ms',
    errors: 1,
  },
  {
    id: 'src_03',
    name: 'Research Repository Index',
    status: 'syncing',
    health: 100.0,
    lastSync: 'Just now',
    records: '380K tokens',
    connectorType: 'REST Webhook Sync',
    latency: '8ms',
    errors: 0,
  },
  {
    id: 'src_04',
    name: 'Image Archive Storage',
    status: 'online',
    health: 99.2,
    lastSync: '1 hour ago',
    records: '184K files',
    connectorType: 'Object Storage Sync',
    latency: '34ms',
    errors: 0,
  },
  {
    id: 'src_05',
    name: 'Government Records Vault',
    status: 'online',
    health: 99.9,
    lastSync: '22 mins ago',
    records: '142K rows',
    connectorType: 'mTLS DB Replica',
    latency: '11ms',
    errors: 0,
  },
  {
    id: 'src_06',
    name: 'GIS Mapping Repository',
    status: 'idle',
    health: 97.8,
    lastSync: 'Yesterday',
    records: '480K vectors',
    connectorType: 'Shapefile Ingestion WFS',
    latency: '95ms',
    errors: 3,
  },
];

export const dataAssets: DataAssetItem[] = [
  {
    id: 'ast_01',
    name: 'Shona Oral Histories Transcript Corpus',
    version: 'v2.1.0',
    records: '1.2K logs',
    quality: 99.4,
    classification: 'Public',
    downloads: 1420,
    revenue: 'US$2,480',
    status: 'Published',
  },
  {
    id: 'ast_02',
    name: 'Historical Land Deeds & Boundaries',
    version: 'v1.4.2',
    records: '4.8K shapefiles',
    quality: 98.7,
    classification: 'Restricted',
    downloads: 890,
    revenue: 'US$3,425',
    status: 'Published',
  },
  {
    id: 'ast_03',
    name: 'Ndebele Grammar & Dialectal Corpus',
    version: 'v1.2.0',
    records: '38K tokens',
    quality: 99.8,
    classification: 'Public',
    downloads: 2110,
    revenue: 'US$1,240',
    status: 'Published',
  },
  {
    id: 'ast_04',
    name: 'National Museums Artifact Imagery Metadata',
    version: 'v1.0.1',
    records: '184K objects',
    quality: 95.2,
    classification: 'Public',
    downloads: 512,
    revenue: 'US$480',
    status: 'Published',
  },
  {
    id: 'ast_05',
    name: 'Epidemiological Outbreak Patient Cohort',
    version: 'v0.9.0',
    records: '2.1K logs',
    quality: 94.6,
    classification: 'Confidential',
    downloads: 120,
    revenue: 'US$800',
    status: 'Draft',
  },
];

export const processingActivities: ProcessingLog[] = [
  {
    id: 'prc_01',
    activity: 'Dataset synchronized with Historical Archives Database',
    timestamp: '10 mins ago',
    status: 'Completed',
    operator: 'System Agent #391',
    processingTime: '12s',
  },
  {
    id: 'prc_02',
    activity: 'Schema validation completed for Land Deeds boundaries',
    timestamp: '25 mins ago',
    status: 'Completed',
    operator: 'DuckDB Core Validator 2',
    processingTime: '8s',
  },
  {
    id: 'prc_03',
    activity: 'AI Metadata generated for National Library Collection',
    timestamp: '1 hour ago',
    status: 'Completed',
    operator: 'Gemini Profiler Node',
    processingTime: '45s',
  },
  {
    id: 'prc_04',
    activity: 'PII Detection check completed on Government Records Vault',
    timestamp: '2 hours ago',
    status: 'Warning',
    operator: 'Presidio Scanner Node 4',
    processingTime: '125s',
  },
  {
    id: 'prc_05',
    activity: 'Anonymization strategy applied to Patient Cohort logs',
    timestamp: '4 hours ago',
    status: 'Completed',
    operator: 'K-Anonymity Processor (k=12)',
    processingTime: '18s',
  },
  {
    id: 'prc_06',
    activity: 'Marketplace index published for Shona Oral Histories',
    timestamp: 'Yesterday',
    status: 'Completed',
    operator: 'Registry Publisher Web',
    processingTime: '3s',
  },
  {
    id: 'prc_07',
    activity: 'API Usage Spike detected on Cadastral Boundaries Index',
    timestamp: '2 days ago',
    status: 'Completed',
    operator: 'FastAPI Gateway Monitor',
    processingTime: 'N/A',
  },
];

export const qualityIndicators: QualityIndicator[] = [
  { name: 'Completeness', score: 99.4, color: '#00C6A7' },
  { name: 'Consistency', score: 98.7, color: '#0EA5E9' },
  { name: 'Accuracy', score: 96.8, color: '#2563EB' },
  { name: 'Duplicates (Clean)', score: 99.9, color: '#10B981' },
  { name: 'Metadata Coverage', score: 97.5, color: '#6366F1' },
  { name: 'Privacy Sanitization', score: 99.8, color: '#14B8A6' },
];

export const qualityTrendData = [
  { month: 'Jan', score: 95.2 },
  { month: 'Feb', score: 95.8 },
  { month: 'Mar', score: 96.1 },
  { month: 'Apr', score: 96.5 },
  { month: 'May', score: 96.9 },
  { month: 'Jun', score: 97.2 },
  { month: 'Jul', score: 97.4 },
];

export const financialStats = {
  totalRevenue: 'US$8,425',
  monthlyRoyalties: 'US$1,248',
  projectedEarnings: 'US$14,200',
  mostValuableDataset: 'Historical Land Deeds Boundaries (v1.4.2)',
};

export const monthlyRoyaltiesData = [
  { month: 'Feb', royalties: 820 },
  { month: 'Mar', royalties: 940 },
  { month: 'Apr', royalties: 1010 },
  { month: 'May', royalties: 1120 },
  { month: 'Jun', royalties: 1180 },
  { month: 'Jul', royalties: 1248 },
];

export const topRevenueDatasets = [
  { name: 'Land Deeds', value: 3425, color: '#2563EB' },
  { name: 'Shona Oral', value: 2480, color: '#00C6A7' },
  { name: 'Ndebele Grammar', value: 1240, color: '#0EA5E9' },
  { name: 'Patient Cohort', value: 800, color: '#6366F1' },
  { name: 'Artifact Imagery', value: 480, color: '#10B981' },
];

export const royaltyDistributionData = [
  { name: 'API Subscription', value: 35, color: '#2563EB' },
  { name: 'Enterprise Licensing', value: 25, color: '#00C6A7' },
  { name: 'Dataset Downloads', value: 20, color: '#0EA5E9' },
  { name: 'Research Licenses', value: 12, color: '#6366F1' },
  { name: 'Commercial Licenses', value: 8, color: '#10B981' },
];

export const datasetPerformanceAwards = [
  { label: 'Most Downloaded', value: 'Shona Oral Histories Transcript Corpus' },
  { label: 'Most Used API', value: 'Historical Land Deeds & Boundaries' },
  { label: 'Fastest Growing Dataset', value: 'Ndebele Grammar & Dialectal Corpus' },
  { label: 'Highest Rated Dataset', value: 'National Museums Artifact Imagery' },
  { label: 'Largest Dataset', value: 'Government Records Census Log' },
  { label: 'Most Searched Dataset', value: 'Shona Dialectal Mapping' },
];

export const complianceStatusData = {
  score: 98.6,
  items: [
    { title: 'Cyber & Data Protection', status: 'COMPLIANT', desc: 'Satisfies Zimbabwe Cyber Security & Data Protection Act of 2021.' },
    { title: 'Privacy Sanitization', status: 'COMPLIANT', desc: 'Zero unhashed PII leaks. K-anonymity (k>=12) compliance verified.' },
    { title: 'Access Safeguards', status: 'COMPLIANT', desc: 'Attribute-based access control (ABAC) verified on all developer queries.' },
    { title: 'Data Custody & Ownership', status: 'VERIFIED', desc: 'Institution retains permanent copyright and raw data hosting nodes.' },
  ],
};

export const agreementData = {
  status: 'Active / Signed MOU',
  partnerSince: '2025-03-12',
  revenueSharing: '70% Institution / 30% Platform',
  licenseType: 'Non-Exclusive Commercial Ingestion',
  renewalDate: '2027-03-12',
  mouDoc: 'MOU_National_Archives_Core_Signed_v2.pdf',
};

export const aiInsights: AIInsightItem[] = [
  {
    id: 'ins_01',
    type: 'warning',
    message: 'National Library dataset quality score can improve by 4.2% by adding geocoded location tags.',
    action: 'Auto-tag locations',
  },
  {
    id: 'ins_02',
    type: 'info',
    message: 'Duplicate records (0.2%) detected in Government Census Database. System prepared auto-pruning pipeline.',
    action: 'Inspect duplicates',
  },
  {
    id: 'ins_03',
    type: 'success',
    message: 'Global developer demand for Shona linguistic training corpora increased by 28% this week.',
    action: 'Increase API quota',
  },
  {
    id: 'ins_04',
    type: 'success',
    message: 'Researchers are frequently searching for historical agricultural telemetry records. Recommend publishing pending TRB weather charts.',
    action: 'View TRB repository',
  },
  {
    id: 'ins_05',
    type: 'info',
    message: 'Three archived collections ready for validation: Mashonaland East Dialects, Museum Artifacts v3, Land Surveys 1980.',
    action: 'Run Validation pipeline',
  },
];

export const apiActivities: APIRequestLog[] = [
  {
    id: 'api_act_01',
    consumer: 'Sovereign LLM App',
    endpoint: '/v1/datasets/search',
    requests: 14200,
    status: 200,
    responseTime: '14ms',
    country: 'ZW',
    timestamp: '5 mins ago',
  },
  {
    id: 'api_act_02',
    consumer: 'AGRITEX Analytics Engine',
    endpoint: '/v1/datasets/download',
    requests: 8900,
    status: 200,
    responseTime: '45ms',
    country: 'ZW',
    timestamp: '12 mins ago',
  },
  {
    id: 'api_act_03',
    consumer: 'Midlands State Univ. NLP',
    endpoint: '/v1/datasets/search',
    requests: 21000,
    status: 200,
    responseTime: '11ms',
    country: 'ZW',
    timestamp: '30 mins ago',
  },
  {
    id: 'api_act_04',
    consumer: 'African Language Research AI',
    endpoint: '/v1/datasets/search',
    status: 200,
    requests: 4800,
    responseTime: '38ms',
    country: 'ZA',
    timestamp: '1 hour ago',
  },
  {
    id: 'api_act_05',
    consumer: 'Sovereign RAG Portal',
    endpoint: '/v1/datasets/download',
    status: 401,
    requests: 3,
    responseTime: '4ms',
    country: 'US',
    timestamp: '2 hours ago',
  },
];
