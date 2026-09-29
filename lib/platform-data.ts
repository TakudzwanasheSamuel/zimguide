export interface Institution {
  id: string;
  name: string;
  category: string;
  status: 'online' | 'syncing' | 'idle' | 'offline';
  connectorType: string;
  records: string;
  health: number;
}

export interface Connector {
  id: string;
  name: string;
  auth: string;
  encryption: string;
  syncStatus: string;
  latency: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  purpose: string;
  technology: string;
  input: string;
  output: string;
  processingTime: string;
}

export interface ExtractionCard {
  id: string;
  name: string;
  input: string;
  output: string;
  formats: string[];
}

export interface PrivacyCard {
  id: string;
  name: string;
  purpose: string;
  processing: string;
  output: string;
}

export interface ProvenanceNode {
  id: string;
  title: string;
  timestamp: string;
  operator: string;
  status: 'Completed' | 'Verified' | 'Pending';
  signature: string;
  qualityScore: number;
  version: string;
  owner: string;
}

export interface SchemaField {
  name: string;
  type: string;
  description: string;
  classification: 'Public' | 'Restricted' | 'Confidential';
  sampleValue: string;
}

export const institutions: Institution[] = [
  {
    id: 'inst_01',
    name: 'National Archives of Zimbabwe',
    category: 'Archives',
    status: 'syncing',
    connectorType: 'OCR Scan Connector',
    records: '1.2K historical records',
    health: 99.8,
  },
  {
    id: 'inst_02',
    name: 'University of Zimbabwe (ALLEX Project)',
    category: 'Universities',
    status: 'online',
    connectorType: 'REST API Gateway',
    records: '38K linguistic tokens',
    health: 100.0,
  },
  {
    id: 'inst_03',
    name: 'Ministry of Lands & Agriculture',
    category: 'Agriculture',
    status: 'online',
    connectorType: 'GIS / Shapefile Sync',
    records: '4.8K cadastral boundaries',
    health: 98.4,
  },
  {
    id: 'inst_04',
    name: 'National Museums & Monuments',
    category: 'Museums',
    status: 'idle',
    connectorType: 'SFTP Secure Ingestion',
    records: '184K high-res images',
    health: 99.2,
  },
  {
    id: 'inst_05',
    name: 'Scientific & Industrial Research Centre',
    category: 'Research',
    status: 'online',
    connectorType: 'Database Replica Sync',
    records: '840K patent files',
    health: 99.9,
  },
  {
    id: 'inst_06',
    name: 'Ministry of Health & Child Care',
    category: 'Hospitals',
    status: 'syncing',
    connectorType: 'FHIR Secure Connector',
    records: '2.1K health records',
    health: 99.6,
  },
  {
    id: 'inst_07',
    name: 'National Library Services',
    category: 'Libraries',
    status: 'idle',
    connectorType: 'Document Parser Connector',
    records: '640K local literature volumes',
    health: 97.8,
  },
  {
    id: 'inst_08',
    name: 'Central Statistical Office (ZIMSTAT)',
    category: 'Government',
    status: 'online',
    connectorType: 'Database API Pull',
    records: '14.2K census data rows',
    health: 100.0,
  },
];

export const connectors: Connector[] = [
  {
    id: 'conn_01',
    name: 'REST API',
    auth: 'OAuth2 + JWT Claims',
    encryption: 'TLS 1.3 / AES-256-GCM',
    syncStatus: 'Real-time Webhook',
    latency: '8ms - 15ms',
  },
  {
    id: 'conn_02',
    name: 'Database Connector',
    auth: 'mTLS Client Certificates',
    encryption: 'SSL/TLS Tunneling',
    syncStatus: 'CDC / Debezium Streaming',
    latency: '12ms - 22ms',
  },
  {
    id: 'conn_03',
    name: 'SFTP Connector',
    auth: 'SSH Key Pairs (Ed25519)',
    encryption: 'SFTP Protocol',
    syncStatus: 'Hourly CRON Check',
    latency: '120ms - 240ms',
  },
  {
    id: 'conn_04',
    name: 'CSV Import Gateway',
    auth: 'Pre-Signed Encrypted URLs',
    encryption: 'Symmetric KMS Key encryption',
    syncStatus: 'Manual Upload Triggered',
    latency: 'N/A (Batch)',
  },
  {
    id: 'conn_05',
    name: 'Cloud Storage Bucket',
    auth: 'IAM Role Delegation',
    encryption: 'AES-256 Customer-Managed Keys',
    syncStatus: 'Object Ingestion Trigger',
    latency: '30ms - 45ms',
  },
  {
    id: 'conn_06',
    name: 'Document Scanner Engine',
    auth: 'Local Gateway Agent Token',
    encryption: 'Encrypted Local Disk Buffer',
    syncStatus: 'Daily Ingestion Window',
    latency: '400ms - 800ms',
  },
  {
    id: 'conn_07',
    name: 'IoT / Telemetry Stream',
    auth: 'HMAC-SHA256 Signatures',
    encryption: 'MQTT over TLS',
    syncStatus: 'Constant Sub-second Stream',
    latency: '5ms - 10ms',
  },
  {
    id: 'conn_08',
    name: 'GIS Vector Sync',
    auth: 'OIDC Provider Integration',
    encryption: 'WFS-T HTTPS Post',
    syncStatus: 'Weekly Delta Pull',
    latency: '80ms - 110ms',
  },
];

export const pipelineStages: PipelineStage[] = [
  {
    id: 'stage_01',
    name: 'Institution',
    purpose: 'System of record holding raw, uncurated data.',
    technology: 'Legacy DBs, Physical Archives, CSVs',
    input: 'Varies by provider',
    output: 'Raw bytes / documents',
    processingTime: '0ms (Source)',
  },
  {
    id: 'stage_02',
    name: 'Connector',
    purpose: 'Secure transit boundary separating source networks from Data Core.',
    technology: 'mTLS tunnels, API gateways, Local Agents',
    input: 'Raw bytes / documents',
    output: 'Encrypted stream payload',
    processingTime: '12ms',
  },
  {
    id: 'stage_03',
    name: 'Extraction',
    purpose: 'Extract clean text and structural metrics from raw binary data.',
    technology: 'Tesseract OCR, custom LLM Parsers, Whisper',
    input: 'Encrypted stream payload',
    output: 'Raw JSON representations',
    processingTime: '145ms',
  },
  {
    id: 'stage_04',
    name: 'Aggregation',
    purpose: 'Unify and assemble fragmented inputs into a standard pipeline stream.',
    technology: 'Apache Kafka, Celery Workers',
    input: 'Raw JSON representations',
    output: 'Batched stream payload',
    processingTime: '8ms',
  },
  {
    id: 'stage_05',
    name: 'Validation',
    purpose: 'Enforce schema types and structure rules, rejecting garbage.',
    technology: 'Pydantic, DuckDB Validators',
    input: 'Batched stream payload',
    output: 'Validated raw datasets',
    processingTime: '15ms',
  },
  {
    id: 'stage_06',
    name: 'PII Detection',
    purpose: 'Locate national IDs, phone numbers, names, and medical identifiers.',
    technology: 'Custom Spacy NER, Presidio Privacy Engine',
    input: 'Validated raw datasets',
    output: 'PII map annotations',
    processingTime: '65ms',
  },
  {
    id: 'stage_07',
    name: 'Anonymization',
    purpose: 'Scrub marked PII fields using hashing, masking, or tokenization.',
    technology: 'K-Anonymity (k=11), SHA-256 hashing',
    input: 'PII map annotations & datasets',
    output: 'Scrubbed/Anonymized records',
    processingTime: '22ms',
  },
  {
    id: 'stage_08',
    name: 'ETL / ELT',
    purpose: 'Reshape, clean, and normalise dates, encodings, and coordinates.',
    technology: 'dbt, DuckDB / Apache Arrow',
    input: 'Scrubbed/Anonymized records',
    output: 'Normalized relational tables',
    processingTime: '110ms',
  },
  {
    id: 'stage_09',
    name: 'Metadata',
    purpose: 'Auto-generate descriptive tags, geographic domains, and quality indexes.',
    technology: 'Gemini Metadata Profiler',
    input: 'Normalized relational tables',
    output: 'Enriched metadata schemas',
    processingTime: '78ms',
  },
  {
    id: 'stage_10',
    name: 'Vectorization',
    purpose: 'Generate dense embeddings from text sections for semantic searching.',
    technology: 'Gemini Text Embeddings v2',
    input: 'Enriched metadata schemas',
    output: 'Embeddings arrays (768-dim)',
    processingTime: '190ms',
  },
  {
    id: 'stage_11',
    name: 'AI Dataset',
    purpose: 'Final packaging as vector datasets, structured relational logs, or graphs.',
    technology: 'Apache Parquet, HDF5, JSONL',
    input: 'Embeddings arrays & tables',
    output: 'HuggingFace-compatible datasets',
    processingTime: '35ms',
  },
  {
    id: 'stage_12',
    name: 'Marketplace',
    purpose: 'Catalogue indexing, permission rules, licensing models.',
    technology: 'Data Core Registry Engine',
    input: 'HuggingFace-compatible datasets',
    output: 'Published Catalog Items',
    processingTime: '5ms',
  },
  {
    id: 'stage_13',
    name: 'API',
    purpose: 'Provide low-latency search and query capabilities for developers.',
    technology: 'FastAPI, Vector Index (Qdrant)',
    input: 'Published Catalog Items',
    output: 'JSON endpoints, Python library access',
    processingTime: '4ms',
  },
];

export const extractionEngine: ExtractionCard[] = [
  {
    id: 'ext_ocr',
    name: 'OCR Engine',
    input: 'Scanned PDFs, JPG documents, handwritten letters',
    output: 'UTF-8 raw string transcripts & layout boxes',
    formats: ['PDF', 'PNG', 'JPEG', 'TIFF'],
  },
  {
    id: 'ext_doc',
    name: 'Document Parsing',
    input: 'Structured Word docs, emails, HTML records',
    output: 'Structured paragraphs, lists, tabular data extracts',
    formats: ['DOCX', 'TXT', 'HTML', 'RTF'],
  },
  {
    id: 'ext_speech',
    name: 'Speech to Text',
    input: 'Recorded oral histories, interviews, speeches (Shona/Ndebele/English)',
    output: 'Time-stamped transcripts, speaker tags, language classifications',
    formats: ['MP3', 'WAV', 'M4A', 'FLAC'],
  },
  {
    id: 'ext_meta',
    name: 'Metadata Extraction',
    input: 'System files, document headers, scanned metadata',
    output: 'Standardized key-value metadata schemas',
    formats: ['XML', 'JSON', 'YAML', 'EXIF'],
  },
  {
    id: 'ext_gis',
    name: 'GIS Parsing',
    input: 'Land maps, boundary coordinates, satellite records',
    output: 'Valid GeoJSON, shape vectors, coordinate reference mappings',
    formats: ['SHP', 'KML', 'GeoJSON', 'GeoTIFF'],
  },
  {
    id: 'ext_image',
    name: 'Image Analysis',
    input: 'Historical archive photos, artifacts, crop images',
    output: 'Object descriptions, catalog numbers, conservation flags',
    formats: ['JPG', 'PNG', 'WebP', 'RAW'],
  },
];

export const privacyCards: PrivacyCard[] = [
  {
    id: 'priv_pii',
    name: 'PII Detection Scanner',
    purpose: 'Scans text patterns and names to flag sensitive fields.',
    processing: 'Pre-trained NER models tailored for Zimbabwean naming and national ID patterns.',
    output: 'Highlighted sensitive offsets and bounding brackets.',
  },
  {
    id: 'priv_ner',
    name: 'Entity Recognition & Masking',
    purpose: 'Replaces specific entity instances with general place-holder tokens.',
    processing: 'Scrubbing names, phone codes, and addresses into tokens like [PERSON_1], [PHONE_REDACTED].',
    output: 'De-identified text strings.',
  },
  {
    id: 'priv_hash',
    name: 'Cryptographic Hashing',
    purpose: 'Maps permanent IDs to unique identifiers that cannot be reversed.',
    processing: 'SHA-256 hashing coupled with customer-managed cryptographic salts.',
    output: '64-character deterministic index identifiers.',
  },
  {
    id: 'priv_mask',
    name: 'Selective Field Masking',
    purpose: 'Hides portions of fields while retaining query characteristics.',
    processing: 'Replacing parts of digits or characters (e.g. National ID: 63-228741-B-23 becomes 63-******-B-**).',
    output: 'Partially-masked data strings.',
  },
  {
    id: 'priv_gen',
    name: 'Data Generalization',
    purpose: 'Reduces precision of numeric, geographical, or temporal attributes.',
    processing: 'Rounding ages to brackets (e.g. 24 -> 20-29), truncating coordinates to 2 decimal places.',
    output: 'Coarsened datasets that maintain group statistics.',
  },
  {
    id: 'priv_tok',
    name: 'Dynamic Tokenization',
    purpose: 'Replaces live tokens during API queries with ephemeral tags.',
    processing: 'Mapping private database indices to transient API request handles.',
    output: 'Safe external-facing APIs with no permanent storage leak risk.',
  },
  {
    id: 'priv_dp',
    name: 'Differential Privacy (DP)',
    purpose: 'Injects mathematical noise to protect individual outlier records.',
    processing: 'Laplace noise distribution added during aggregate query compilation.',
    output: 'Statistically accurate group counts with zero individual data leakage.',
  },
  {
    id: 'priv_comp',
    name: 'Compliance Validation',
    purpose: 'Validates that processed datasets satisfy regulatory legal metrics.',
    processing: 'Automated test suite checking k-anonymity (k>=11) and l-diversity compliance matrices.',
    output: 'Signed audit reports verifying GDPR / POPIA readiness.',
  },
];

export const provenanceTimeline: ProvenanceNode[] = [
  {
    id: 'prov_node_01',
    title: 'National Archives',
    timestamp: '2026-07-25 08:30:12',
    operator: 'System Agent #391',
    status: 'Completed',
    signature: 'sig_a982f1b8a9d01fcc',
    qualityScore: 100,
    version: '1.0.0 (Raw Ingest)',
    owner: 'National Archives of Zimbabwe',
  },
  {
    id: 'prov_node_02',
    title: 'Secure Connector',
    timestamp: '2026-07-25 08:30:14',
    operator: 'mTLS Tunnel Gateway',
    status: 'Completed',
    signature: 'sig_b3127814cc5a7fde',
    qualityScore: 100,
    version: '1.0.1 (Transit)',
    owner: 'ZimGuide Gateway',
  },
  {
    id: 'prov_node_03',
    title: 'OCR Extraction',
    timestamp: '2026-07-25 08:34:44',
    operator: 'OCR Worker (Tesseract Node 4)',
    status: 'Completed',
    signature: 'sig_f481a89cde99201a',
    qualityScore: 94.2,
    version: '1.1.0 (Transcribed Text)',
    owner: 'Processing Core',
  },
  {
    id: 'prov_node_04',
    title: 'Validation',
    timestamp: '2026-07-25 08:35:10',
    operator: 'DuckDB Schema Validator',
    status: 'Verified',
    signature: 'sig_7182ba8ccb90ff21',
    qualityScore: 98.1,
    version: '1.1.1 (Structured Json)',
    owner: 'Processing Core',
  },
  {
    id: 'prov_node_05',
    title: 'Metadata Enrichment',
    timestamp: '2026-07-25 08:35:45',
    operator: 'Gemini Profiler AI',
    status: 'Completed',
    signature: 'sig_0239cfab812da7b8',
    qualityScore: 99.0,
    version: '1.2.0 (Schema Enriched)',
    owner: 'Metadata Core',
  },
  {
    id: 'prov_node_06',
    title: 'PII Detection',
    timestamp: '2026-07-25 08:36:12',
    operator: 'NER Classifier Node 2',
    status: 'Verified',
    signature: 'sig_cf8372abdc9019aa',
    qualityScore: 100,
    version: '1.2.1 (PII Tagged)',
    owner: 'Privacy Engine',
  },
  {
    id: 'prov_node_07',
    title: 'Anonymization',
    timestamp: '2026-07-25 08:37:01',
    operator: 'Symmetric Masking Unit',
    status: 'Completed',
    signature: 'sig_892ba73cb911aaee',
    qualityScore: 99.8,
    version: '2.0.0 (Scrubbed Dataset)',
    owner: 'Privacy Engine',
  },
  {
    id: 'prov_node_08',
    title: 'Dataset Version 2.1',
    timestamp: '2026-07-25 08:45:00',
    operator: 'Parquet Packager Unit',
    status: 'Verified',
    signature: 'sig_d9283ba8eecf9201',
    qualityScore: 99.8,
    version: '2.1.0 (Stable Relational)',
    owner: 'HuggingFace Core Storage',
  },
  {
    id: 'prov_node_09',
    title: 'Marketplace Publication',
    timestamp: '2026-07-25 09:00:00',
    operator: 'Registry Publisher Web',
    status: 'Completed',
    signature: 'sig_1192aba88fefcca9',
    qualityScore: 99.8,
    version: '2.1.0 (Indexed Public)',
    owner: 'Marketplace Hub',
  },
  {
    id: 'prov_node_10',
    title: 'API Consumption',
    timestamp: '2026-07-25 09:12:30',
    operator: 'External Developer (Tenant ID 19)',
    status: 'Verified',
    signature: 'sig_aa88e0b12fcfcd99',
    qualityScore: 100,
    version: '2.1.0 (Gateway Feed)',
    owner: 'Sovereign LLM App',
  },
];

export const schemaFields: SchemaField[] = [
  {
    name: 'record_id',
    type: 'VARCHAR(64)',
    description: 'Cryptographically hashed unique identifier of the source record.',
    classification: 'Public',
    sampleValue: 'sha256_e814a098cbef34',
  },
  {
    name: 'province',
    type: 'VARCHAR(32)',
    description: 'Zimbabwe province associated with the record (e.g. Mashonaland Central).',
    classification: 'Public',
    sampleValue: 'Matabeleland North',
  },
  {
    name: 'district',
    type: 'VARCHAR(32)',
    description: 'District level location tagging from structured geocoders.',
    classification: 'Public',
    sampleValue: 'Binga District',
  },
  {
    name: 'language',
    type: 'VARCHAR(8)',
    description: 'Primary language of the record in ISO 639-1 code.',
    classification: 'Public',
    sampleValue: 'sn',
  },
  {
    name: 'content_type',
    type: 'VARCHAR(24)',
    description: 'Derived category format (e.g. oral_history, land_deed).',
    classification: 'Public',
    sampleValue: 'oral_history',
  },
  {
    name: 'classification',
    type: 'VARCHAR(16)',
    description: 'Security categorization level.',
    classification: 'Restricted',
    sampleValue: 'Government Public',
  },
  {
    name: 'license',
    type: 'VARCHAR(24)',
    description: 'Regulatory license agreement applying to downstream usages.',
    classification: 'Public',
    sampleValue: 'CC BY-NC 4.0',
  },
  {
    name: 'quality_score',
    type: 'DOUBLE',
    description: 'Computed composite index of completeness, accuracy, and format standards.',
    classification: 'Public',
    sampleValue: '0.9982',
  },
  {
    name: 'created_at',
    type: 'TIMESTAMP',
    description: 'Ingestion timestamp of the initial record transaction.',
    classification: 'Public',
    sampleValue: '2026-07-25 08:30:12',
  },
  {
    name: 'version',
    type: 'VARCHAR(8)',
    description: 'Data model specification version tagging.',
    classification: 'Public',
    sampleValue: '2.1.0',
  },
  {
    name: 'source',
    type: 'VARCHAR(64)',
    description: 'Originating institution descriptor.',
    classification: 'Public',
    sampleValue: 'National Archives of Zimbabwe',
  },
  {
    name: 'processing_stage',
    type: 'VARCHAR(16)',
    description: 'Status indicator of pipeline finalization.',
    classification: 'Public',
    sampleValue: 'APIGatewayReady',
  },
];

export const apiExamples = {
  curl: `curl -X GET "https://api.zimguide.co.zw/v1/datasets/search" \\
  -H "Authorization: Bearer zgd_live_sk_948f2bb1e8201b" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "oral histories Shona",
    "filters": {
      "province": "Mashonaland Central",
      "quality_min": 0.95
    },
    "limit": 5
  }'`,

  python: `from zimguide import DataCoreClient

client = DataCoreClient(api_key="zgd_live_sk_948f2bb1e8201b")

results = client.datasets.search(
    query="oral histories Shona",
    filters={
        "province": "Mashonaland Central",
        "quality_min": 0.95
    },
    limit=5
)

for doc in results.data:
    print(f"[{doc.id}] {doc.metadata.source} - Score: {doc.quality_score}")
`,

  javascript: `import { DataCore } from '@zimguide/datacore';

const core = new DataCore({ apiKey: 'zgd_live_sk_948f2bb1e8201b' });

const search = await core.datasets.search({
  query: 'oral histories Shona',
  filters: {
    province: 'Mashonaland Central',
    qualityMin: 0.95
  },
  limit: 5
});

console.log(\`Found \${search.total} matching verified records.\`);
`,

  rest: `GET /v1/datasets/search HTTP/1.1
Host: api.zimguide.co.zw
Authorization: Bearer zgd_live_sk_948f2bb1e8201b
Content-Type: application/json

{
  "query": "oral histories Shona",
  "filters": {
    "province": "Mashonaland Central",
    "quality_min": 0.95
  },
  "limit": 5
}`,

  graphql: `query SearchDatasets {
  datasets(
    query: "oral histories Shona"
    filter: {
      province: "Mashonaland Central"
      qualityScoreMin: 0.95
    }
    limit: 5
  ) {
    total
    items {
      id
      source
      qualityScore
      anonymizedContent
      metadata {
        province
        district
        language
      }
    }
  }
}`,

  response: {
    object: "list",
    total: 391,
    limit: 1,
    data: [
      {
        id: "rec_sha256_e814a098cbef34",
        source: "National Archives of Zimbabwe",
        quality_score: 0.9982,
        anonymized_content: "Chiremba akatsanangura kuti nhoroondo yechiShona inotanga kubva munzvimbo dzeGuruve, uko kwainzi kwaive nemadzishe akasimba ekwaMutapa. [SENSITIVE_CONTENT_REDACTED] ndiye aive mutungamiri panguva iyoyo...",
        metadata: {
          province: "Mashonaland Central",
          district: "Guruve",
          language: "sn",
          content_type: "oral_history",
          classification: "Government Public",
          license: "CC BY-NC 4.0",
          created_at: "2026-07-25T08:30:12Z",
          version: "2.1.0"
        },
        signature: {
          digital_signature: "sig_e814a098cbef34a0981bde8716cc5a",
          checksum_sha256: "982f1b8a9d01fcc51b3127814cc5a7fdef481a89cde99201a7182ba8ccb90ff2",
          custodian: "Department of Archives Curator"
        }
      }
    ]
  }
};

export const analyticsData = {
  dailyProcessing: [
    { name: 'Mon', records: 120000, latency: 145 },
    { name: 'Tue', records: 150000, latency: 132 },
    { name: 'Wed', records: 180000, latency: 125 },
    { name: 'Thu', records: 210000, latency: 110 },
    { name: 'Fri', records: 195000, latency: 118 },
    { name: 'Sat', records: 130000, latency: 155 },
    { name: 'Sun', records: 140000, latency: 148 },
  ],
  institutionGrowth: [
    { name: 'Jan', count: 3, capacity: 5 },
    { name: 'Feb', count: 4, capacity: 8 },
    { name: 'Mar', count: 5, capacity: 15 },
    { name: 'Apr', count: 6, capacity: 20 },
    { name: 'May', count: 7, capacity: 35 },
    { name: 'Jun', count: 8, capacity: 55 },
  ],
  dataVolume: [
    { name: 'Q1 25', rawText: 12, vectorDb: 8 },
    { name: 'Q2 25', rawText: 24, vectorDb: 18 },
    { name: 'Q3 25', rawText: 45, vectorDb: 35 },
    { name: 'Q4 25', rawText: 68, vectorDb: 52 },
    { name: 'Q1 26', rawText: 92, vectorDb: 78 },
    { name: 'Q2 26', rawText: 124, vectorDb: 112 },
  ],
  apiUsage: [
    { name: '00:00', requests: 1200, errors: 2 },
    { name: '04:00', requests: 800, errors: 1 },
    { name: '08:00', requests: 4800, errors: 5 },
    { name: '12:00', requests: 8200, errors: 12 },
    { name: '16:00', requests: 7500, errors: 8 },
    { name: '20:00', requests: 3200, errors: 3 },
  ],
  dataTypes: [
    { name: 'Historical Text', value: 45, color: '#00C6A7' },
    { name: 'Linguistic Audio', value: 20, color: '#0EA5E9' },
    { name: 'Geospatial Boundaries', value: 15, color: '#2563EB' },
    { name: 'Government Census', value: 12, color: '#10B981' },
    { name: 'Clinical Case Summaries', value: 8, color: '#6366F1' },
  ],
  qualityDistribution: [
    { range: '99%+', datasets: 18 },
    { range: '95%-98%', datasets: 24 },
    { range: '90%-94%', datasets: 12 },
    { range: '85%-89%', datasets: 4 },
    { range: '<85%', datasets: 0 },
  ]
};

export const securityControls = [
  {
    title: 'AES-256-GCM Encryption',
    description: 'All institutional data is encrypted at rest and in transit using hardware-backed cryptographic keys managed via KMS.',
  },
  {
    title: 'Role-Based Access Control',
    description: 'Fine-grained attribute-based policies (ABAC) restrict dataset access to approved organizations, users, and API tokens.',
  },
  {
    title: 'Immutable Audit Logs',
    description: 'All read, write, and processing actions are cryptographically sealed in an immutable journal log for compliance auditing.',
  },
  {
    title: 'Sovereign Versioning Control',
    description: 'Versioned git-like lineage for datasets allows rollbacks to pre-processing stages to verify algorithmic transparency.',
  },
  {
    title: 'Secure Gateway APIs',
    description: 'Rate-limiting, API keys rotations, and mTLS verification guard endpoints against unauthorized query profiling.',
  },
  {
    title: 'Decentralized IAM Sync',
    description: 'Integrates natively with Active Directory, Keycloak, or government identity vaults to enforce local access rights.',
  },
  {
    title: 'Isolation Containers',
    description: 'Sandbox extraction environments running OCR and PII analysis reside in ephemeral, memory-only execution units.',
  },
  {
    title: 'Continuous Compliance Scans',
    description: 'Automated policy checks continuously screen active datasets against POPIA and national security requirements.',
  },
];
