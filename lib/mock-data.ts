export type Dataset = {
  id: string;
  name: string;
  provider: string;
  category: 'Cultural' | 'Government' | 'Research' | 'Linguistic' | 'Geospatial' | 'Health';
  description: string;
  records: string;
  format: string[];
  license: string;
  updated: string;
  subscribers: number;
  compliance: string[];
  trending?: boolean;
};

export const datasets: Dataset[] = [
  {
    id: 'ds_001',
    name: 'Shona Oral Histories Archive',
    provider: 'National Archives of Zimbabwe',
    category: 'Cultural',
    description:
      'Transcribed and anonymized oral histories spanning 12 provinces, with metadata in English and Shona.',
    records: '120K records',
    format: ['JSONL', 'Parquet', 'CSV'],
    license: 'CC BY-NC 4.0',
    updated: '2 days ago',
    subscribers: 148,
    compliance: ['POPIA', 'GDPR'],
    trending: true,
  },
  {
    id: 'ds_002',
    name: 'Cadastral & Land Tenure Index',
    provider: 'Ministry of Lands',
    category: 'Government',
    description:
      'Georeferenced land parcels with tenure type, anonymized ownership clusters, and boundary vectors.',
    records: '480K parcels',
    format: ['GeoJSON', 'Parquet'],
    license: 'Open Government',
    updated: '5 hours ago',
    subscribers: 92,
    compliance: ['ISO 27001'],
  },
  {
    id: 'ds_003',
    name: 'Ndebele Linguistic Corpus',
    provider: 'University of Zimbabwe — ALLEX',
    category: 'Linguistic',
    description:
      'Curated Ndebele text corpus for language modeling, with sentence-level alignment and diacritic normalization.',
    records: '380K tokens',
    format: ['JSONL', 'TXT'],
    license: 'Research Use',
    updated: '1 week ago',
    subscribers: 211,
    compliance: ['POPIA'],
    trending: true,
  },
  {
    id: 'ds_004',
    name: 'Climate & Hydrology Timeseries',
    provider: 'Meteorological Services Dept.',
    category: 'Geospatial',
    description:
      'Daily climate observations across 412 stations from 1950–present, gap-filled and quality-flagged.',
    records: '740K readings',
    format: ['Parquet', 'NetCDF'],
    license: 'CC BY 4.0',
    updated: '1 day ago',
    subscribers: 64,
    compliance: ['ISO 27001', 'POPIA'],
  },
  {
    id: 'ds_005',
    name: 'Health Outcomes Synthetic Cohort',
    provider: 'Ministry of Health & Child Care',
    category: 'Health',
    description:
      'Differentially-private synthetic cohort for epidemiological modeling. k-anonymity ≥ 11.',
    records: '210K records',
    format: ['Parquet', 'FHIR'],
    license: 'Restricted Research',
    updated: '3 days ago',
    subscribers: 47,
    compliance: ['HIPAA', 'POPIA', 'GDPR'],
  },
  {
    id: 'ds_006',
    name: 'Cultural Artifacts Image Set',
    provider: 'National Museums & Monuments',
    category: 'Cultural',
    description:
      'Annotated multi-angle imagery of 18,400 artifacts with provenance metadata and conservation notes.',
    records: '184K images',
    format: ['COCO', 'WebDataset'],
    license: 'CC BY-NC 4.0',
    updated: '6 days ago',
    subscribers: 73,
    compliance: ['POPIA'],
  },
];

export const stats = [
  { label: 'Datasets curated', value: '2,400+' },
  { label: 'Records processed', value: '1.8B' },
  { label: 'Institutions onboarded', value: '47' },
  { label: 'API uptime', value: '99.98%' },
];

export const institutions = [
  'University of Zimbabwe',
  'National Archives',
  'Ministry of Lands',
  'Meteorological Services',
  'NUST',
  'National Museums',
  'Ministry of Health',
  'ALLEX Project',
];

export const platformFeatures = [
  {
    icon: 'Filter',
    title: 'Compliant Data Curation',
    description:
      'Schema-aware pipelines ingest heterogeneous institutional formats, normalize metadata, and enforce provenance lineage at every stage.',
    points: ['Automated schema mapping', 'Lineage tracking', 'Quality scoring'],
  },
  {
    icon: 'ShieldCheck',
    title: 'Anonymization Engine',
    description:
      'Differential privacy, k-anonymity, and pseudonymization applied per-field with configurable privacy budgets and audit trails.',
    points: ['Differential privacy', 'k-anonymity ≥ k', 'Re-identification testing'],
  },
  {
    icon: 'Lock',
    title: 'Secure Processing',
    description:
      'Confidential computing enclaves process sensitive records in memory-isolated environments. Data never leaves the sovereign boundary.',
    points: ['TEE enclaves', 'Sovereign residency', 'Hardware attestation'],
  },
  {
    icon: 'Network',
    title: 'API Gateway',
    description:
      'Versioned REST and streaming APIs with per-key quotas, rate shaping, and signed downloadable assets for offline consumption.',
    points: ['REST + Streaming', 'Per-key quotas', 'Signed assets'],
  },
  {
    icon: 'Search',
    title: 'Data Catalog',
    description:
      'Full-text and faceted discovery across the sovereign catalog, with semantic search powered by embedded dataset profiles.',
    points: ['Semantic search', 'Faceted filters', 'Preview endpoints'],
  },
  {
    icon: 'GitBranch',
    title: 'Lineage & Versioning',
    description:
      'Every dataset version is immutable and reproducible. Subscribe to a pin and receive deterministic snapshots downstream.',
    points: ['Immutable versions', 'Reproducible snapshots', 'Diff endpoints'],
  },
];

export const solutions = [
  {
    icon: 'GraduationCap',
    title: 'Universities',
    description:
      'Publish research datasets and corpora with institutional access control and citation-ready DOIs.',
  },
  {
    icon: 'Landmark',
    title: 'Government',
    description:
      'Sovereign residency for public-sector data with inter-ministry sharing governed by policy, not vendor lock-in.',
  },
  {
    icon: 'FlaskConical',
    title: 'Research',
    description:
      'Reproducible, version-pinned datasets for peer-reviewed work, with provenance and ethics compliance baked in.',
  },
  {
    icon: 'Building2',
    title: 'Archives & Museums',
    description:
      'Digitize and annotate cultural heritage collections, exposing them as AI-ready assets with attribution preserved.',
  },
  {
    icon: 'Factory',
    title: 'Enterprises',
    description:
      'Discover and subscribe to licensed datasets, integrate via SDK, and govern consumption with per-team budgets.',
  },
  {
    icon: 'Cpu',
    title: 'Developers',
    description:
      'Type-safe SDKs, streaming endpoints, and a generous free tier so you can build and ship on sovereign data.',
  },
];

export const steps = [
  {
    step: '01',
    title: 'Onboard your institution',
    description:
      'Complete verified onboarding. We establish data residency, compliance scope, and access governance for your organization.',
  },
  {
    step: '02',
    title: 'Curate & anonymize',
    description:
      'Ingest raw data through schema-aware pipelines. Apply differential privacy and field-level anonymization with audit trails.',
  },
  {
    step: '03',
    title: 'Publish to the catalog',
    description:
      'Versioned, immutable datasets become discoverable in the sovereign catalog with semantic search and preview endpoints.',
  },
  {
    step: '04',
    title: 'Subscribe & consume',
    description:
      'Developers and enterprises discover, subscribe, and consume via REST, streaming, or signed downloadable assets.',
  },
];

export const securityFeatures = [
  {
    icon: 'Server',
    title: 'Sovereign residency',
    description:
      'All processing and storage remain within Zimbabwe. No cross-border data transfer without explicit institutional consent.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Confidential computing',
    description:
      'Trusted execution environments isolate sensitive workloads in memory. Attestation verifies enclave integrity.',
  },
  {
    icon: 'FileLock',
    title: 'Audit & lineage',
    description:
      'Every transformation is logged. Immutable provenance graphs reconstruct any dataset state at any point in time.',
  },
  {
    icon: 'KeyRound',
    title: 'Per-key governance',
    description:
      'Granular API keys with scoped permissions, quotas, and IP allowlists. Revoke and rotate without downtime.',
  },
];

export const compliance = ['POPIA', 'GDPR', 'ISO 27001', 'HIPAA', 'SOC 2', 'CCPA'];

export const testimonials = [
  {
    quote:
      'ZimGuide Data Core let us publish our linguistic corpus to researchers worldwide while keeping provenance and attribution intact. The anonymization engine alone saved us months.',
    author: 'Dr. Rumbidzai Nhara',
    role: 'Director, ALLEX Project',
    org: 'University of Zimbabwe',
  },
  {
    quote:
      'Sovereign residency was non-negotiable for our cadastral records. Data Core gave us confidential computing and a catalog our ministries can actually govern.',
    author: 'Tendai Moyo',
    role: 'Chief Data Officer',
    org: 'Ministry of Lands',
  },
  {
    quote:
      'We subscribed to the climate timeseries via streaming API and had a working model in a weekend. The version pinning means our results are reproducible for peer review.',
    author: 'Prof. Farai Chari',
    role: 'Climate Informatics Lab',
    org: 'NUST',
  },
];

export const pricingTiers = [
  {
    name: 'Developer',
    price: '$10',
    cadence: '/ mo',
    description: 'Build and prototype on sovereign data.',
    features: [
      '1,000 API calls / month',
      'REST + streaming access',
      'Community support',
      'Single API key',
    ],
    cta: 'Start building',
    highlighted: false,
  },
  {
    name: 'Research',
    price: '$50',
    cadence: '/ mo',
    description: 'For academic and research teams.',
    features: [
      '10,000 API calls / month',
      'Priority email support',
      'Version pinning',
      'Up to 5 API keys',
    ],
    cta: 'Start research',
    highlighted: false,
  },
  {
    name: 'Institutional',
    price: '$250',
    cadence: '/ mo',
    description: 'For universities, archives, and government departments.',
    features: [
      '100,000 API calls / month',
      'Per-team governance & quotas',
      'Priority support',
      'SAML SSO + audit logs',
    ],
    cta: 'Request access',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$2,000+',
    cadence: '/ year',
    description: 'Bespoke Parquet exports and commercial licensing.',
    features: [
      'Bespoke Parquet exports',
      'Custom commercial license',
      'Dedicated support',
      'Confidential computing options',
    ],
    cta: 'Talk to sales',
    highlighted: false,
  },
  {
    name: 'Data Curation',
    price: '$1,500–$2,000',
    cadence: '/ project',
    description: 'Turn raw institutional data into AI-ready datasets.',
    features: [
      'End-to-end curation pipeline',
      'Anonymization & quality checks',
      'Delivery as AI-ready assets',
      'Contact Sales to scope',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export const faqs = [
  {
    q: 'What does "sovereign" actually mean here?',
    a: 'All data ingestion, processing, and storage occur within Zimbabwe. No record leaves the sovereign boundary without explicit, logged consent from the owning institution. Cross-border transfer is opt-in and policy-governed, not a default.',
  },
  {
    q: 'How does anonymization work?',
    a: 'Each field can be governed by a different technique — differential privacy, k-anonymity, pseudonymization, or generalization. You configure a privacy budget per dataset and the engine produces auditable, re-identification-tested output.',
  },
  {
    q: 'Who can publish datasets?',
    a: 'Verified institutions: universities, government departments, research organizations, archives, museums, and cultural institutions. Each publisher goes through identity verification and signs a data stewardship agreement.',
  },
  {
    q: 'How do developers consume data?',
    a: 'Through versioned REST endpoints, streaming APIs, or signed downloadable assets (Parquet, JSONL, GeoJSON, COCO, WebDataset). SDKs are available for TypeScript and Python. You subscribe to a dataset pin and receive deterministic snapshots.',
  },
  {
    q: 'Which compliance frameworks are supported?',
    a: 'POPIA by default, with optional overlays for GDPR, HIPAA, ISO 27001, SOC 2, and CCPA. Compliance scope is configured per institution and enforced in the curation pipeline.',
  },
  {
    q: 'Can we deploy on-premises?',
    a: 'Yes. Enterprise tier supports dedicated sovereign regions and on-premises deployment for agencies that require it, with the same API surface and governance controls.',
  },
];

export const apiUsageData = [
  { month: 'Jan', requests: 1.2, errors: 0.02 },
  { month: 'Feb', requests: 1.8, errors: 0.01 },
  { month: 'Mar', requests: 2.4, errors: 0.03 },
  { month: 'Apr', requests: 3.1, errors: 0.01 },
  { month: 'May', requests: 4.2, errors: 0.02 },
  { month: 'Jun', requests: 5.6, errors: 0.01 },
  { month: 'Jul', requests: 7.3, errors: 0.02 },
  { month: 'Aug', requests: 9.1, errors: 0.01 },
];

export const datasetGrowthData = [
  { quarter: 'Q1', curated: 180, subscribed: 120 },
  { quarter: 'Q2', curated: 420, subscribed: 310 },
  { quarter: 'Q3', curated: 880, subscribed: 690 },
  { quarter: 'Q4', curated: 1640, subscribed: 1320 },
];

export const categoryDistribution = [
  { name: 'Cultural', value: 28, color: '#00C6A7' },
  { name: 'Government', value: 24, color: '#0EA5E9' },
  { name: 'Research', value: 19, color: '#2563EB' },
  { name: 'Linguistic', value: 14, color: '#14B8A6' },
  { name: 'Geospatial', value: 9, color: '#06B6D4' },
  { name: 'Health', value: 6, color: '#3B82F6' },
];

/* ── Trusted Data Sources ── */
export type DataPartner = {
  name: string;
  description: string;
  status: 'Active' | 'Onboarding' | 'Verified';
  icon: string;
};

export const dataPartners: DataPartner[] = [
  {
    name: 'National Archives',
    description: 'Historical records, oral histories and colonial-era documents.',
    status: 'Active',
    icon: 'Archive',
  },
  {
    name: 'Universities',
    description: 'Research corpora, theses and academic datasets across faculties.',
    status: 'Active',
    icon: 'GraduationCap',
  },
  {
    name: 'ZIMSTAT',
    description: 'National statistics, census data and economic indicators.',
    status: 'Verified',
    icon: 'BarChart3',
  },
  {
    name: 'Museums',
    description: 'Cultural artifacts, annotated imagery and conservation records.',
    status: 'Active',
    icon: 'Landmark',
  },
  {
    name: 'Government',
    description: 'Ministry data, cadastral records and public-sector registries.',
    status: 'Active',
    icon: 'Building2',
  },
  {
    name: 'Community Collections',
    description: 'Indigenous knowledge and community-curated cultural assets.',
    status: 'Onboarding',
    icon: 'Users',
  },
  {
    name: 'Radio Archives',
    description: 'Broadcast recordings, transcriptions and audio heritage assets.',
    status: 'Active',
    icon: 'Radio',
  },
  {
    name: 'Research Institutions',
    description: 'Peer-reviewed datasets, climate and health research outputs.',
    status: 'Verified',
    icon: 'FlaskConical',
  },
];

/* ── Supported Data Types ── */
export type DataTypeCard = {
  title: string;
  icon: string;
  examples: string[];
  accent: string;
};

export const dataTypes: DataTypeCard[] = [
  {
    title: 'Text Data',
    icon: 'FileText',
    examples: ['JSON', 'CSV', 'JSONL', 'Parquet', 'XML'],
    accent: '#00C6A7',
  },
  {
    title: 'Images',
    icon: 'Image',
    examples: ['JPEG', 'PNG', 'TIFF', 'GeoTIFF', 'Medical Images'],
    accent: '#0EA5E9',
  },
  {
    title: 'Geospatial',
    icon: 'Map',
    examples: ['GeoJSON', 'Shapefile', 'Raster', 'Vector', 'Satellite'],
    accent: '#2563EB',
  },
  {
    title: 'Tabular',
    icon: 'Table2',
    examples: ['CSV', 'SQL', 'Parquet', 'XLSX'],
    accent: '#14B8A6',
  },
  {
    title: 'Audio',
    icon: 'AudioLines',
    examples: ['Speech', 'Transcriptions', 'Metadata'],
    accent: '#06B6D4',
  },
];

/* ── Data Characteristics ── */
export const dataCharacteristics = [
  { icon: 'Braces', label: 'Structured Data', description: 'Relational, typed and schema-validated.' },
  { icon: 'FileCode', label: 'Semi Structured', description: 'JSON, XML and nested documents.' },
  { icon: 'FileText', label: 'Unstructured', description: 'Text, audio and imagery assets.' },
  { icon: 'ShieldCheck', label: 'Anonymized', description: 'Differential privacy applied per field.' },
  { icon: 'BadgeCheck', label: 'Validated', description: 'Quality-scored and schema-tested.' },
  { icon: 'Cpu', label: 'Machine Readable', description: 'Tokenized and model-ready formats.' },
  { icon: 'Tags', label: 'Metadata Rich', description: 'Provenance, lineage and tags embedded.' },
  { icon: 'GitBranch', label: 'Version Controlled', description: 'Immutable, reproducible snapshots.' },
  { icon: 'Webhook', label: 'API Ready', description: 'REST, streaming and signed downloads.' },
  { icon: 'Lock', label: 'Privacy Compliant', description: 'POPIA-aligned with audit trails.' },
];

/* ── Curation Pipeline ── */
export const pipelineSteps = [
  { icon: 'Building2', title: 'Institution', description: 'Verified data partner connects.' },
  { icon: 'Cable', title: 'Secure Connector', description: 'Encrypted ingestion channel.' },
  { icon: 'Download', title: 'Extraction', description: 'Schema-aware data pull.' },
  { icon: 'BadgeCheck', title: 'Validation', description: 'Quality and integrity checks.' },
  { icon: 'ShieldCheck', title: 'Anonymization', description: 'Differential privacy applied.' },
  { icon: 'Workflow', title: 'ETL', description: 'Transform and enrich records.' },
  { icon: 'Gauge', title: 'Data Quality', description: 'Scoring and lineage capture.' },
  { icon: 'Database', title: 'Dataset', description: 'Versioned, immutable asset.' },
  { icon: 'Store', title: 'Marketplace', description: 'Published to the catalog.' },
  { icon: 'Webhook', title: 'API', description: 'REST and streaming access.' },
  { icon: 'Sparkles', title: 'AI Innovation', description: 'Developers build on sovereign data.' },
];

/* ── Technology Highlights ── */
export const techHighlights = [
  {
    icon: 'Network',
    title: 'Federated Architecture',
    description: 'Data stays with institutions. Only anonymized, consented derivatives are synchronized — sovereignty by design.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Privacy by Design',
    description: 'Anonymization happens before any synchronization. Differential privacy budgets are enforced at the source.',
  },
  {
    icon: 'Cpu',
    title: 'AI Ready',
    description: 'Structured for LLMs and ML pipelines. Tokenized, metadata-rich, and reproducible across versions.',
  },
  {
    icon: 'Server',
    title: 'Sovereign Infrastructure',
    description: 'Built to support Zimbabwe\u2019s National AI Strategy. Residency, governance and auditability are defaults.',
  },
];

/* ── Dataset Preview Table ── */
export type DatasetRow = {
  id: string;
  name: string;
  institution: string;
  records: string;
  quality: number;
  classification: 'Public' | 'Restricted' | 'Internal' | 'Sensitive';
  version: string;
  format: string;
  api: boolean;
};

export const datasetRows: DatasetRow[] = [
  { id: '1', name: 'Shona Oral Histories', institution: 'National Archives', records: '1.2K', quality: 98, classification: 'Public', version: 'v2.1', format: 'JSONL', api: true },
  { id: '2', name: 'Cadastral Index', institution: 'Ministry of Lands', records: '4.8K', quality: 96, classification: 'Restricted', version: 'v1.4', format: 'GeoJSON', api: true },
  { id: '3', name: 'Ndebele Corpus', institution: 'UZ — ALLEX', records: '38K', quality: 99, classification: 'Public', version: 'v3.0', format: 'JSONL', api: true },
  { id: '4', name: 'Climate Timeseries', institution: 'Met. Services', records: '74K', quality: 94, classification: 'Public', version: 'v5.2', format: 'Parquet', api: true },
  { id: '5', name: 'Health Cohort', institution: 'Ministry of Health', records: '2.1K', quality: 92, classification: 'Sensitive', version: 'v1.0', format: 'Parquet', api: false },
  { id: '6', name: 'Cultural Artifacts', institution: 'National Museums', records: '184K', quality: 95, classification: 'Internal', version: 'v2.3', format: 'COCO', api: true },
  { id: '7', name: 'Census Indicators', institution: 'ZIMSTAT', records: '15.2K', quality: 97, classification: 'Public', version: 'v4.1', format: 'CSV', api: true },
  { id: '8', name: 'Broadcast Archives', institution: 'Radio Archives', records: '62K', quality: 89, classification: 'Internal', version: 'v1.2', format: 'WAV', api: false },
];

/* ── Live Platform Metrics ── */
export const liveMetrics = [
  { label: 'Partner Institutions', value: 18, suffix: '' },
  { label: 'Datasets', value: 126, suffix: '' },
  { label: 'Records', value: 248, suffix: 'K' },
  { label: 'API Requests', value: 47, suffix: 'K' },
  { label: 'Languages', value: 3, suffix: '' },
  { label: 'Coverage', value: 10, suffix: ' Provinces' },
];

export const institutionGrowthData = [
  { quarter: 'Q1', institutions: 4 },
  { quarter: 'Q2', institutions: 9 },
  { quarter: 'Q3', institutions: 14 },
  { quarter: 'Q4', institutions: 18 },
];

export const apiUsageAreaData = [
  { month: 'Jan', requests: 0.8 },
  { month: 'Feb', requests: 1.4 },
  { month: 'Mar', requests: 2.1 },
  { month: 'Apr', requests: 2.8 },
  { month: 'May', requests: 3.5 },
  { month: 'Jun', requests: 4.1 },
  { month: 'Jul', requests: 4.7 },
];

export const dataCategoryRadar = [
  { category: 'Text', value: 92 },
  { category: 'Geospatial', value: 78 },
  { category: 'Tabular', value: 85 },
  { category: 'Audio', value: 64 },
  { category: 'Images', value: 71 },
  { category: 'Health', value: 48 },
];

/* ── Pricing Preview (new tiers) ── */
export const pricingPreview = [
  {
    name: 'Developer',
    price: '$10',
    cadence: '/ mo',
    description: 'Prototype and build on sovereign data.',
    features: ['1,000 API calls / month', 'REST + streaming', 'Community support', '1 API key'],
    limits: { api: '1,000 / month', downloads: 'Included', support: 'Community' },
    cta: 'Start building',
    highlighted: false,
  },
  {
    name: 'Research',
    price: '$50',
    cadence: '/ mo',
    description: 'For academic and research teams.',
    features: ['10,000 API calls / month', 'Priority email support', 'Version pinning', 'Up to 5 API keys'],
    limits: { api: '10,000 / month', downloads: 'Included', support: 'Email' },
    cta: 'Start research',
    highlighted: false,
  },
  {
    name: 'Institutional',
    price: '$250',
    cadence: '/ mo',
    description: 'For universities, archives, and agencies.',
    features: ['100,000 API calls / month', 'Per-team governance', 'Priority support', 'SAML SSO'],
    limits: { api: '100,000 / month', downloads: 'Included', support: 'Priority' },
    cta: 'Request access',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$2,000+',
    cadence: '/ year',
    description: 'Bespoke Parquet exports and commercial licensing.',
    features: ['Bespoke Parquet exports', 'Custom commercial license', 'Dedicated support', 'Confidential computing'],
    limits: { api: 'Custom', downloads: 'Bespoke exports', support: 'Dedicated' },
    cta: 'Talk to sales',
    highlighted: false,
  },
  {
    name: 'Data Curation',
    price: '$1,500–$2,000',
    cadence: '/ project',
    description: 'Turn raw institutional data into AI-ready datasets.',
    features: ['End-to-end curation', 'Anonymization & QA', 'AI-ready delivery', 'Scoped with Sales'],
    limits: { api: 'N/A', downloads: 'Project delivery', support: 'Contact Sales' },
    cta: 'Contact Sales',
    highlighted: false,
  },
];

/* ── Hero dashboard flow ── */
export const heroFlow = [
  { label: 'Connected Institutions', icon: 'Building2', metric: '18 partners' },
  { label: 'Secure Connectors', icon: 'Cable', metric: 'Encrypted' },
  { label: 'AI Data Pipeline', icon: 'Workflow', metric: 'ETL + DP' },
  { label: 'Dataset Marketplace', icon: 'Store', metric: '126 datasets' },
  { label: 'API Platform', icon: 'Webhook', metric: '470K req/mo' },
  { label: 'AI Developers', icon: 'Sparkles', metric: 'Building' },
];

/* ── Footer ── */
export const footerColumns = [
  {
    title: 'Platform',
    links: ['Data Marketplace', 'Data Curation', 'Anonymization', 'API Gateway', 'Data Catalog'],
  },
  {
    title: 'Technology',
    links: ['Federated Architecture', 'Privacy by Design', 'Sovereign Infrastructure', 'Confidential Computing'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'API Reference', 'SDKs', 'Status', 'Changelog'],
  },
  {
    title: 'Developers',
    links: ['Quickstart', 'Code Examples', 'Community', 'Open Source'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Data Processing', 'Compliance'],
  },
];
