export interface DevStat {
  label: string;
  value: string;
  change: string;
  sparkline: number[];
  iconName: 'Users' | 'Activity' | 'Layers' | 'Timer' | 'Server' | 'Download';
}

export interface ApiCategory {
  id: string;
  name: string;
  desc: string;
  latency: string;
  popularity: string;
}

export interface ExplorerItem {
  name: string;
  institution: string;
  records: string;
  api: 'REST' | 'GraphQL' | 'REST & GraphQL';
  latency: string;
  quality: number;
  status: 'online' | 'degraded' | 'maintenance';
}

export interface HealthStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  latency: string;
}

export interface WebhookLog {
  event: string;
  endpoint: string;
  status: number;
  deliveries: number;
  retries: number;
}

export interface ExampleApp {
  id: string;
  name: string;
  desc: string;
  architecture: string;
  apiUsed: string;
  datasets: string[];
}

export const devStats: DevStat[] = [
  {
    label: 'Registered Developers',
    value: '2,481',
    change: '+142 this week',
    sparkline: [1900, 2050, 2100, 2180, 2250, 2300, 2380, 2410, 2450, 2481],
    iconName: 'Users',
  },
  {
    label: 'API Requests Today',
    value: '470K',
    change: '+8.4% vs yesterday',
    sparkline: [380, 410, 400, 420, 450, 430, 460, 450, 470, 470],
    iconName: 'Activity',
  },
  {
    label: 'Available Datasets',
    value: '126',
    change: '+12 new packages',
    sparkline: [102, 105, 108, 112, 114, 116, 120, 122, 124, 126],
    iconName: 'Layers',
  },
  {
    label: 'Average Response Time',
    value: '98 ms',
    change: '-4ms compression',
    sparkline: [108, 105, 102, 104, 99, 101, 98, 97, 99, 98],
    iconName: 'Timer',
  },
  {
    label: 'Platform Uptime',
    value: '99.98%',
    change: 'All systems online',
    sparkline: [99.98, 99.99, 99.97, 99.98, 99.98, 99.99, 99.98, 99.98, 99.98, 99.98],
    iconName: 'Server',
  },
  {
    label: 'SDK Downloads',
    value: '13,420',
    change: '+1.2K npm installs',
    sparkline: [11000, 11300, 11700, 12000, 12200, 12500, 12800, 13100, 13300, 13420],
    iconName: 'Download',
  },
];

export const apiCategories: ApiCategory[] = [
  {
    id: 'api_dataset',
    name: 'Dataset API',
    desc: 'Retrieve metadata and raw content payloads for compiled institutional datasets.',
    latency: '85ms',
    popularity: '94%',
  },
  {
    id: 'api_meta',
    name: 'Metadata API',
    desc: 'Query province, district, language classifications, and quality flags on active sets.',
    latency: '45ms',
    popularity: '78%',
  },
  {
    id: 'api_search',
    name: 'Search API',
    desc: 'Perform lightning-fast elastic keyword queries across the entire sovereign data catalog.',
    latency: '62ms',
    popularity: '88%',
  },
  {
    id: 'api_embed',
    name: 'Embedding API',
    desc: 'Generate 768-dimensional text embeddings tailored for Shona, Ndebele, and local English.',
    latency: '140ms',
    popularity: '92%',
  },
  {
    id: 'api_vector',
    name: 'Vector Search API',
    desc: 'Execute semantic similarity queries against vectorized document indices with high recall.',
    latency: '95ms',
    popularity: '89%',
  },
  {
    id: 'api_gis',
    name: 'Geospatial API',
    desc: 'Extract boundaries, parcel shapes, coordinates and provincial vectors.',
    latency: '110ms',
    popularity: '64%',
  },
  {
    id: 'api_analytics',
    name: 'Analytics API',
    desc: 'Retrieve usage telemetry, query metrics, error rates, and quality score distributions.',
    latency: '105ms',
    popularity: '42%',
  },
  {
    id: 'api_stream',
    name: 'Streaming API',
    desc: 'Establish low-latency server-sent events (SSE) for real-time repository updates.',
    latency: '12ms (initial)',
    popularity: '55%',
  },
];

export const explorerItems: ExplorerItem[] = [
  { name: 'Shona Oral Histories Archive', institution: 'National Archives', records: '1.2K logs', api: 'REST & GraphQL', latency: '92ms', quality: 99.4, status: 'online' },
  { name: 'Cadastral & Land Boundaries', institution: 'Ministry of Lands', records: '4.8K vectors', api: 'REST', latency: '125ms', quality: 98.7, status: 'online' },
  { name: 'Ndebele Linguistic Corpus', institution: 'University of Zimbabwe', records: '38K tokens', api: 'REST & GraphQL', latency: '82ms', quality: 99.8, status: 'online' },
  { name: 'National Museums Exhibit Catalog', institution: 'Museums & Monuments', records: '184K records', api: 'GraphQL', latency: '75ms', quality: 95.2, status: 'online' },
  { name: 'Health Outbreaks Synthetic Cohort', institution: 'Ministry of Health', records: '2.1K logs', api: 'REST', latency: '140ms', quality: 94.6, status: 'degraded' },
  { name: 'CSO National Census Profiling', institution: 'CSO (ZIMSTAT)', records: '14.2K rows', api: 'REST & GraphQL', latency: '98ms', quality: 99.9, status: 'online' },
];

export const sdkExamples = {
  python: {
    auth: `import zimguide

# Authenticate with credentials
client = zimguide.DataCoreClient(
    api_key="zgd_live_sk_948f2bb"
)
print("Connected successfully:", client.verify_key())`,
    
    search: `# Query verified datasets
results = client.datasets.search(
    query="oral histories Shona",
    filters={"province": "Masvingo"},
    limit=5
)

for doc in results.data:
    print(f"[{doc.id}] Source: {doc.source} | Score: {doc.quality_score}")`,
    
    download: `# Download record payloads in Parquet format
dataset_file = client.datasets.download(
    dataset_id="ds_001",
    format="parquet",
    target_path="./shona_history.parquet"
)
print("Saved Parquet package to:", dataset_file.path)`,
    
    streaming: `# Stream real-time delta logs
stream = client.datasets.stream(dataset_id="ds_001")

for delta in stream:
    print(f"Received record update: {delta.record_id}")`,
    
    vector: `# Perform semantic vector search
embeddings = client.embeddings.create(
    text="Mambo Mutapa aive nemhuri yakakura munzvimbo dzeGuruve"
)

vector_matches = client.vectors.search(
    vector=embeddings.vector,
    dataset_id="ds_001",
    top_k=3
)

for match in vector_matches:
    print(f"Match: {match.id} | Score: {match.score}")`,
  },
  
  javascript: {
    auth: `import { DataCore } from '@zimguide/datacore';

// Initialize the API client
const core = new DataCore({ apiKey: 'zgd_live_sk_948f2bb' });

const auth = await core.verifyKey();
console.log('API key is valid:', auth.success);`,
    
    search: `// Search published datasets
const search = await core.datasets.search({
  query: 'oral histories Shona',
  filters: { province: 'Masvingo' },
  limit: 5
});

search.items.forEach(doc => {
  console.log(\`[\${doc.id}] Source: \${doc.source} | Quality: \${doc.qualityScore}%\`);
});`,
    
    download: `// Download bulk data in JSONL format
const dataFile = await core.datasets.download({
  datasetId: 'ds_001',
  format: 'jsonl'
});
console.log('Dataset URL:', dataFile.url);`,
    
    streaming: `// Subscribe to pipeline updates
core.datasets.subscribe('ds_001', (event) => {
  console.log('Received record update:', event.recordId);
});`,
    
    vector: `// Generate embeddings and search vector similarity
const embeddings = await core.embeddings.create({
  text: 'Mambo Mutapa aive nemhuri yakakura munzvimbo dzeGuruve'
});

const vectorMatches = await core.vectors.search({
  vector: embeddings.vector,
  datasetId: 'ds_001',
  topK: 3
});

vectorMatches.forEach(match => {
  console.log(\`Match ID: \${match.id} | Cosine Similarity: \${match.score}\`);
});`,
  },

  typescript: {
    auth: `import { DataCore, ClientResponse } from '@zimguide/datacore';

const core = new DataCore({ apiKey: 'zgd_live_sk_948f2bb' });

const response: ClientResponse = await core.verifyKey();
console.log('Client connected:', response.verified);`,
    
    search: `interface SearchFilters {
  province?: string;
  category?: string;
}

const filters: SearchFilters = { province: 'Masvingo' };

const search = await core.datasets.search({
  query: 'oral histories Shona',
  filters,
  limit: 5
});`,
    
    download: `const fileInfo = await core.datasets.download({
  datasetId: 'ds_001',
  format: 'parquet'
});
console.log(\`File size: \${fileInfo.sizeBytes} bytes\`);`,
    
    streaming: `core.datasets.subscribe('ds_001', (event: { recordId: string }) => {
  console.log(\`Received updates: \${event.recordId}\`);
});`,
    
    vector: `const embeddings = await core.embeddings.create({
  text: 'Mambo Mutapa aive nemhuri'
});

const vectorMatches = await core.vectors.search({
  vector: embeddings.vector,
  datasetId: 'ds_001',
  topK: 3
});`,
  },
  
  go: {
    auth: `package main

import (
	"context"
	"fmt"
	"github.com/zimguide/datacore-go"
)

func main() {
	client := datacore.NewClient("zgd_live_sk_948f2bb")
	verified, err := client.VerifyKey(context.Background())
	if err != nil {
		panic(err)
	}
	fmt.Println("Client verified:", verified)
}`,
    
    search: `results, err := client.Datasets.Search(context.Background(), &datacore.SearchParams{
	Query: "oral histories Shona",
	Filters: map[string]string{"province": "Masvingo"},
	Limit: 5,
})
if err != nil {
	panic(err)
}
for _, doc := range results.Items {
	fmt.Printf("[%s] Source: %s\\n", doc.ID, doc.Source)
}`,
    
    download: `fileInfo, err := client.Datasets.Download(context.Background(), "ds_001", "parquet")
if err != nil {
	panic(err)
}
fmt.Println("File downloaded to path:", fileInfo.Path)`,
    
    streaming: `stream, err := client.Datasets.Stream(context.Background(), "ds_001")
if err != nil {
	panic(err)
}
for delta := range stream.Channel {
	fmt.Println("Update ID:", delta.RecordID)
}`,
    
    vector: `embeddings, err := client.Embeddings.Create(context.Background(), "Mambo Mutapa")
if err != nil {
	panic(err)
}
matches, err := client.Vectors.Search(context.Background(), embeddings.Vector, "ds_001", 3)
if err != nil {
	panic(err)
}
for _, match := range matches {
	fmt.Println("Match ID:", match.ID, "Score:", match.Score)
}`,
  },
  
  java: {
    auth: `import zw.co.zimguide.datacore.DataCoreClient;

DataCoreClient client = new DataCoreClient("zgd_live_sk_948f2bb");
boolean verified = client.verifyKey();
System.out.println("Authenticated: " + verified);`,
    
    search: `List<DatasetRecord> records = client.datasets().search(
    "oral histories Shona",
    Map.of("province", "Masvingo"),
    5
);
for (DatasetRecord doc : records) {
    System.out.println("Doc ID: " + doc.getId());
}`,
    
    download: `DownloadInfo file = client.datasets().download("ds_001", "parquet");
System.out.println("Saved to: " + file.getLocalPath());`,
    
    streaming: `client.datasets().stream("ds_001", (delta) -> {
    System.out.println("Update: " + delta.getRecordId());
});`,
    
    vector: `List<Float> embedding = client.embeddings().create("Mambo Mutapa");
List<VectorMatch> matches = client.vectors().search(embedding, "ds_001", 3);
for (VectorMatch match : matches) {
    System.out.println("Match: " + match.getId() + " Score: " + match.getScore());
}`,
  },
  
  curl: {
    auth: `curl -X GET "https://api.zimguide.co.zw/v1/auth/verify" \\
  -H "Authorization: Bearer zgd_live_sk_948f2bb"`,
    
    search: `curl -X POST "https://api.zimguide.co.zw/v1/datasets/search" \\
  -H "Authorization: Bearer zgd_live_sk_948f2bb" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "oral histories Shona",
    "filters": { "province": "Masvingo" },
    "limit": 5
  }'`,
    
    download: `curl -X GET "https://api.zimguide.co.zw/v1/datasets/ds_001/download?format=parquet" \\
  -H "Authorization: Bearer zgd_live_sk_948f2bb" \\
  -o shona_history.parquet`,
    
    streaming: `curl -N "https://api.zimguide.co.zw/v1/datasets/ds_001/stream" \\
  -H "Authorization: Bearer zgd_live_sk_948f2bb" \\
  -H "Accept: text/event-stream"`,
    
    vector: `curl -X POST "https://api.zimguide.co.zw/v1/vectors/search" \\
  -H "Authorization: Bearer zgd_live_sk_948f2bb" \\
  -H "Content-Type: application/json" \\
  -d '{
    "vector": [0.0128, -0.0451, 0.0882, 0.1204],
    "dataset_id": "ds_001",
    "top_k": 3
  }'`,
  }
};

export const docCategories = [
  { name: 'Authentication', desc: 'Secure mTLS setup and API Bearer credentials structures.' },
  { name: 'Pagination', desc: 'Handling offset and token-based response limits.' },
  { name: 'Rate Limits', desc: 'Review professional tier gateway query limits per second.' },
  { name: 'Errors', desc: 'Details on status codes: 400 bad request, 401 unauth, 429 rate limit.' },
  { name: 'Webhooks', desc: 'Set up endpoints to handle event triggers asynchronously.' },
  { name: 'Filtering', desc: 'Review schema classification operators (e.g. province=Harare).' },
  { name: 'Sorting', desc: 'Order results by relevance score, quality, or timestamp.' },
  { name: 'Batch Requests', desc: 'Perform bulk ingestion checks in multi-payload arrays.' },
  { name: 'GraphQL Endpoint', desc: 'Retrieve custom structures via query schemas.' },
  { name: 'REST Protocol', desc: 'Query documentation on typical JSON-over-HTTP endpoints.' },
];

export const healthStatuses: HealthStatus[] = [
  { name: 'Authentication API', status: 'operational', latency: '9ms' },
  { name: 'Database Connector Sync', status: 'operational', latency: '14ms' },
  { name: 'Marketplace Ingest Portal', status: 'operational', latency: '22ms' },
  { name: 'Search API Gateway', status: 'operational', latency: '65ms' },
  { name: 'Text Embeddings Generator', status: 'operational', latency: '145ms' },
  { name: 'Metadata Autocleaner Engine', status: 'operational', latency: '35ms' },
  { name: 'Streaming Webhooks Feed', status: 'operational', latency: '11ms' },
];

export const billingUsage = {
  plan: 'Institutional',
  apiCalls: '14.2K / 100K monthly calls',
  storageUsed: '42.8 GB / 100 GB',
  downloadsUsed: '84 / 200 datasets',
  spendingMonth: 'US$842.50',
  invoices: [
    { id: 'inv_10492', date: '2026-07-01', amount: 'US$752.40', status: 'Paid' },
    { id: 'inv_10381', date: '2026-06-01', amount: 'US$682.00', status: 'Paid' },
    { id: 'inv_10212', date: '2026-05-01', amount: 'US$590.10', status: 'Paid' },
  ],
};

export const apiKeysList = [
  { name: 'Production Live Key', key: 'zgd_live_sk_948f2bb1e8201b17dcf82ab', type: 'Production', status: 'Active' },
  { name: 'Staging Test Key', key: 'zgd_test_sk_cf2918bb1ee202fba718ef2', type: 'Development', status: 'Active' },
  { name: 'Sandbox Local Key', key: 'zgd_sand_sk_aaee992cf023aa78aee9b99', type: 'Sandbox', status: 'Inactive' },
];

export const webhooksLogs: WebhookLog[] = [
  { event: 'dataset.published', endpoint: 'https://api.archives.gov.zw/zimguide/hook', status: 200, deliveries: 12, retries: 0 },
  { event: 'dataset.synchronized', endpoint: 'https://webhook.agritex.gov.zw/ingest', status: 200, deliveries: 48, retries: 0 },
  { event: 'pipeline.completed', endpoint: 'https://audit.zimstat.co.zw/pipeline-logs', status: 200, deliveries: 120, retries: 1 },
  { event: 'quality.warning', endpoint: 'https://alert.nationalgallery.co.zw/notify', status: 502, deliveries: 4, retries: 3 },
];

export const exampleApps: ExampleApp[] = [
  {
    id: 'app_agri',
    name: 'Agricultural Advisor RAG',
    desc: 'Combines AGRITEX soil telemetry with local weather indices to advice crops.',
    architecture: 'LlamaIndex + Vector Similarity search + GPT-4o context synthesis.',
    apiUsed: 'Vector Search API / Dataset API',
    datasets: ['Cadastral & Land Boundaries', 'Climate & Hydrology Timeseries'],
  },
  {
    id: 'app_medical',
    name: 'Clinical Outbreaks Analyser',
    desc: 'Leverages health cohorts to map regional epidemiological outbreaks.',
    architecture: 'Python Pandas + Scikit-Learn classifiers + Anonymized health records.',
    apiUsed: 'Dataset API / Metadata API',
    datasets: ['Health Outcomes Synthetic Cohort', 'CSO National Census Profiling'],
  },
  {
    id: 'app_nlp',
    name: 'Shona & Ndebele Local LLM',
    desc: 'Language models fine-tuned on diacritic-correct grammatical archives.',
    architecture: 'HuggingFace Trainer + PyTorch + Tokenized local language datasets.',
    apiUsed: 'Embedding API / Dataset API',
    datasets: ['Shona Oral Histories Archive', 'Ndebele Linguistic Corpus'],
  },
  {
    id: 'app_tourism',
    name: 'Tourism Travel Companion',
    desc: 'Generates tourist guide books from museum artifact histories.',
    architecture: 'LangChain Agents + Semantic embedding searches.',
    apiUsed: 'Search API / Vector Search API',
    datasets: ['National Museums Exhibit Catalog', 'Shona Oral Histories Archive'],
  },
];

export const communityLinks = [
  { title: 'API Documentation', desc: 'Read deep references on endpoints and parameters.', target: '#api-documentation' },
  { title: 'Client SDKs', desc: 'Download libraries for Python, JS, TS, Go, Java.', target: '#sdk-section' },
  { title: 'GitHub Registry', desc: 'Inspect source codes for connectors and local agents.', target: '#' },
  { title: 'Developer Discord', desc: 'Join other AI builders in Harare and Bulawayo.', target: '#' },
  { title: 'Tutorials & Guides', desc: 'Read guides on setting up RAG with local data.', target: '#' },
  { title: 'Code Templates', desc: 'Download boilerplate apps to boot LLMs in minutes.', target: '#' },
];
