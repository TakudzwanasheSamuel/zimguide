export interface RevenueKpi {
  label: string;
  value: string;
  change: string;
  sparkline: number[];
  iconName: 'Coins' | 'TrendingUp' | 'Landmark' | 'FileCheck' | 'Users' | 'Activity';
}

export interface RevenueSource {
  name: string;
  value: number;
  amount: string;
  color: string;
}

export interface PartnerRank {
  name: string;
  royalties: string;
  growth: string;
  topDataset: string;
  downloads: string;
}

export interface DatasetRevenueItem {
  name: string;
  institution: string;
  downloads: number;
  apiCalls: string;
  licenses: number;
  revenue: string;
  royalty: string;
  trend: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  calls: string;
  downloads: string;
  storage: string;
  support: string;
  rights: string;
  sla: string;
}

export interface CurationService {
  name: string;
  desc: string;
  delivery: string;
  price: string;
  industries: string[];
}

export interface LicenseType {
  name: string;
  desc: string;
  uses: string;
  restrictions: string;
  pricing: string;
}

export const revenueKpis: RevenueKpi[] = [
  {
    label: 'Total Platform Revenue',
    value: 'US$48.4K',
    change: '+14.2% YoY',
    sparkline: [32, 35, 38, 40, 42, 44, 45, 46, 47, 48.4],
    iconName: 'Coins',
  },
  {
    label: 'Monthly Recurring Revenue',
    value: 'US$4.8K',
    change: '+8.6% MoM',
    sparkline: [3.2, 3.5, 3.8, 4.0, 4.2, 4.4, 4.5, 4.6, 4.7, 4.8],
    iconName: 'TrendingUp',
  },
  {
    label: 'Institution Royalties Paid',
    value: 'US$28.4K',
    change: '+18.4% YoY',
    sparkline: [18, 20, 22, 23, 24, 25, 26, 27, 28, 28.4],
    iconName: 'Landmark',
  },
  {
    label: 'Active Enterprise Licenses',
    value: '46',
    change: '+4 this quarter',
    sparkline: [32, 34, 35, 38, 40, 41, 43, 44, 45, 46],
    iconName: 'FileCheck',
  },
  {
    label: 'Developer Subscriptions',
    value: '2,481',
    change: '+142 this week',
    sparkline: [1900, 2050, 2100, 2180, 2250, 2300, 2380, 2410, 2450, 2,481],
    iconName: 'Users',
  },
  {
    label: 'Marketplace Transactions',
    value: '18,642',
    change: '+12.5% MoM',
    sparkline: [14000, 14800, 15300, 15900, 16400, 17000, 17400, 17900, 18200, 18642],
    iconName: 'Activity',
  },
];

export const revenueSources: RevenueSource[] = [
  { name: 'Data Curation Services', value: 30, amount: 'US$852K', color: '#0EA5E9' },
  { name: 'Enterprise Licensing', value: 25, amount: 'US$710K', color: '#00C6A7' },
  { name: 'API Subscriptions', value: 20, amount: 'US$568K', color: '#10B981' },
  { name: 'Dataset Purchases', value: 12, amount: 'US$340K', color: '#F59E0B' },
  { name: 'Government Contracts', value: 8, amount: 'US$227K', color: '#D946EF' },
  { name: 'Premium APIs', value: 3, amount: 'US$85K', color: '#EC4899' },
  { name: 'Professional Services', value: 2, amount: 'US$57K', color: '#6366F1' },
];

export const monthlyRevenueTrend24m = [
  { month: 'Jul 24', revenue: 2.8, royalties: 2.0 },
  { month: 'Aug 24', revenue: 3.0, royalties: 2.1 },
  { month: 'Sep 24', revenue: 3.2, royalties: 2.2 },
  { month: 'Oct 24', revenue: 3.3, royalties: 2.3 },
  { month: 'Nov 24', revenue: 3.5, royalties: 2.4 },
  { month: 'Dec 24', revenue: 3.6, royalties: 2.5 },
  { month: 'Jan 25', revenue: 3.8, royalties: 2.7 },
  { month: 'Feb 25', revenue: 3.9, royalties: 2.7 },
  { month: 'Mar 25', revenue: 4.0, royalties: 2.8 },
  { month: 'Apr 25', revenue: 4.1, royalties: 2.9 },
  { month: 'May 25', revenue: 4.2, royalties: 2.9 },
  { month: 'Jun 25', revenue: 4.3, royalties: 3.0 },
  { month: 'Jul 25', revenue: 4.4, royalties: 3.1 },
  { month: 'Aug 25', revenue: 4.4, royalties: 3.1 },
  { month: 'Sep 25', revenue: 4.5, royalties: 3.2 },
  { month: 'Oct 25', revenue: 4.5, royalties: 3.2 },
  { month: 'Nov 25', revenue: 4.6, royalties: 3.2 },
  { month: 'Dec 25', revenue: 4.6, royalties: 3.2 },
  { month: 'Jan 26', revenue: 4.7, royalties: 3.3 },
  { month: 'Feb 26', revenue: 4.7, royalties: 3.3 },
  { month: 'Mar 26', revenue: 4.7, royalties: 3.3 },
  { month: 'Apr 26', revenue: 4.8, royalties: 3.4 },
  { month: 'May 26', revenue: 4.8, royalties: 3.4 },
  { month: 'Jun 26', revenue: 4.8, royalties: 3.4 },
];

export const topPartnersList: PartnerRank[] = [
  { name: 'National Archives of Zimbabwe', royalties: 'US$8.4K', growth: '+18.2%', topDataset: 'Shona Oral Histories', downloads: '4.8K' },
  { name: 'Midlands State University', royalties: 'US$6.6K', growth: '+15.4%', topDataset: 'Linguistic Archives', downloads: '3.9K' },
  { name: 'ZIMSTAT Central Census', royalties: 'US$5.9K', growth: '+12.8%', topDataset: 'Census Ingestion Tables', downloads: '3.2K' },
  { name: 'National Gallery of Zimbabwe', royalties: 'US$3.4K', growth: '+9.5%', topDataset: 'Art Exhibit Metadata', downloads: '2.1K' },
  { name: 'AGRITEX Agriculture Agency', royalties: 'US$2.9K', growth: '+22.4%', topDataset: 'Crop Land Boundaries', downloads: '1.8K' },
];

export const datasetRevenuesList: DatasetRevenueItem[] = [
  { name: 'Shona Oral Histories Archive', institution: 'National Archives', downloads: 1242, apiCalls: '4.8K', licenses: 12, revenue: 'US$4,825', royalty: 'US$3,378', trend: '+14.2%' },
  { name: 'Cadastral & Land Boundaries', institution: 'Ministry of Lands', downloads: 842, apiCalls: '3.2K', licenses: 8, revenue: 'US$3,425', royalty: 'US$2,398', trend: '+18.6%' },
  { name: 'Ndebele Linguistic Corpus', institution: 'University of Zimbabwe', downloads: 912, apiCalls: '2.8K', licenses: 10, revenue: 'US$2,980', royalty: 'US$2,086', trend: '+9.4%' },
  { name: 'National Museums Exhibit Catalog', institution: 'Museums & Monuments', downloads: 412, apiCalls: '1.8K', licenses: 4, revenue: 'US$1,840', royalty: 'US$1,288', trend: '+11.5%' },
  { name: 'Health Outbreaks Synthetic Cohort', institution: 'Ministry of Health', downloads: 382, apiCalls: '1.1K', licenses: 6, revenue: 'US$1,560', royalty: 'US$1,092', trend: '+4.2%' },
  { name: 'CSO National Census Profiling', institution: 'CSO (ZIMSTAT)', downloads: 1842, apiCalls: '9.2K', licenses: 18, revenue: 'US$8,920', royalty: 'US$6,244', trend: '+22.8%' },
];

export const pricingPlansList: PricingPlan[] = [
  {
    name: 'Developer',
    price: 'US$10 / mo',
    calls: '1,000 API calls / month',
    downloads: 'Included with plan',
    storage: 'Shared API access',
    support: 'Community support',
    rights: 'Non-commercial prototyping',
    sla: 'Best effort',
  },
  {
    name: 'Research',
    price: 'US$50 / mo',
    calls: '10,000 API calls / month',
    downloads: 'Included with plan',
    storage: 'Priority API access',
    support: 'Email support',
    rights: 'Academic research only',
    sla: '99.5% availability',
  },
  {
    name: 'Institutional',
    price: 'US$250 / mo',
    calls: '100,000 API calls / month',
    downloads: 'Included with plan',
    storage: 'Team governance & quotas',
    support: 'Priority support',
    rights: 'Institutional commercial use',
    sla: '99.9% availability',
  },
  {
    name: 'Enterprise',
    price: 'US$2,000+ / year',
    calls: 'Custom call volume',
    downloads: 'Bespoke Parquet exports',
    storage: 'Dedicated delivery pipeline',
    support: 'Dedicated support',
    rights: 'Custom commercial license',
    sla: 'Negotiated SLA',
  },
  {
    name: 'Data Curation',
    price: 'US$1,500–$2,000 / project',
    calls: 'Scoped per engagement',
    downloads: 'AI-ready project delivery',
    storage: 'Curation workspace included',
    support: 'Contact Sales',
    rights: 'Project deliverables ownership',
    sla: 'Agreed project timeline',
  },
];

export const curationServicesList: CurationService[] = [
  {
    name: 'Data Curation Services',
    desc: 'End-to-end transformation of raw institutional data into anonymized, AI-ready datasets with quality checks and delivery packaging.',
    delivery: 'Scoped per project',
    price: 'US$1,500–$2,000 / project',
    industries: ['Government', 'Archives', 'Universities', 'Health'],
  },
  {
    name: 'AI Dataset Preparation',
    desc: 'Transform raw textual, database, or document payloads into clean training corpora.',
    delivery: 'Included in project scope',
    price: 'US$1,500–$2,000 / project',
    industries: ['Government', 'Linguistics', 'Agriculture'],
  },
  {
    name: 'Document Digitization & OCR',
    desc: 'Scan, OCR, and catalog physical archives with diacritic-correct local language settings.',
    delivery: 'Included in project scope',
    price: 'US$1,500–$2,000 / project',
    industries: ['National Archives', 'Museums', 'Historical'],
  },
  {
    name: 'Anonymization & Privacy Prep',
    desc: 'Identify and mask PII before model routing, with POPIA-aligned privacy controls.',
    delivery: 'Included in project scope',
    price: 'US$1,500–$2,000 / project',
    industries: ['Health', 'Government Census'],
  },
];

export const licensesMarketplaceList: LicenseType[] = [
  {
    name: 'Commercial License',
    desc: 'Allows startups and enterprise entities to integrate datasets into commercial revenue LLM agents.',
    uses: 'Commercial chatbots, RAG assistants, internal software.',
    restrictions: 'No direct bulk resale of raw underlying data packages.',
    pricing: 'Monthly API routing subscription + transactional usage.',
  },
  {
    name: 'Academic Research License',
    desc: 'Provides low-cost access to linguistic and census data for university researchers.',
    uses: 'Scholarly publications, model testing, thesis drafts.',
    restrictions: 'Zero commercial exploitation or startup production routing.',
    pricing: 'Low flat annual subscription fees.',
  },
  {
    name: 'Sovereign Government License',
    desc: 'Dedicated license mapping government databases to agency portals.',
    uses: 'Inter-agency analytics, land registries, national weather advisors.',
    restrictions: 'Confidentiality boundaries govern replication nodes.',
    pricing: 'Annual state-allocated infrastructure maintenance MOUs.',
  },
];

export const walletTransactions = [
  { date: '2026-07-27', customer: 'Microsoft Research', dataset: 'Shona Oral Histories', amount: 'US$1,200', royalty: 'US$840', status: 'Settled' },
  { date: '2026-07-25', customer: 'AgriTech Startup', dataset: 'Crop Land Boundaries', amount: 'US$850', royalty: 'US$595', status: 'Settled' },
  { date: '2026-07-22', customer: 'University of Zimbabwe', dataset: 'Ndebele Linguistic Corpus', amount: 'US$290', royalty: 'US$203', status: 'Settled' },
  { date: '2026-07-20', customer: 'Harare Tourism AI', dataset: 'Museum Exhibit Catalog', amount: 'US$450', royalty: 'US$315', status: 'Settled' },
  { date: '2026-07-18', customer: 'ZIMSTAT Census Ingest', dataset: 'Census Ingestion Tables', amount: 'US$4,500', royalty: 'US$3,150', status: 'Pending' },
];

export const forecastMRRData = [
  { month: 'Jul 26', current: 184, projected: 184 },
  { month: 'Aug 26', current: null, projected: 195 },
  { month: 'Sep 26', current: null, projected: 210 },
  { month: 'Oct 26', current: null, projected: 228 },
  { month: 'Nov 26', current: null, projected: 245 },
  { month: 'Dec 26', current: null, projected: 268 },
];

export const businessInsightsList = [
  { id: '1', title: 'Agricultural datasets increased revenue by 38%.', desc: 'Driven by high winter wheat yield forecast demands from regional Agrotech startups.' },
  { id: '2', title: 'Demand for geospatial APIs has doubled.', desc: 'High municipal ingestion pings from cadastral and local government land mapping.' },
  { id: '3', title: 'Research licenses continue to grow.', desc: 'High enrollment in computational sciences at local universities (MSU, NUST, UZ).' },
  { id: '4', title: 'Enterprise healthcare datasets have the highest value.', desc: 'Highest revenue margins due to intensive, secure, anonymized clinical cohort compilation demands.' },
  { id: '5', title: 'Recommend onboarding additional universities.', desc: 'Great opportunities for Ndebele and Tonga linguistic corpora digitizations.' },
];
