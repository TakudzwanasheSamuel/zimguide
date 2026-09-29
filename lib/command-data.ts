export interface CommandKpi {
  label: string;
  value: string;
  change: string;
  sparkline: number[];
  iconName: 'Building2' | 'Database' | 'Layers' | 'Users' | 'GraduationCap' | 'Cpu' | 'Coins' | 'Award';
}

export interface ProvinceDetails {
  name: string;
  institutions: number;
  datasets: number;
  developers: number;
  apiRequests: string;
  researchProjects: number;
  revenue: string;
  readinessScore: number;
  fillColor: string;
}

export interface ConnectedInstCard {
  name: string;
  count: number;
  repos: number;
  datasets: number;
  health: number;
}

export interface SectorCoverage {
  name: string;
  value: number; // size in treemap
  datasets: number;
  growth: string;
  coverage: number;
  color: string;
}

export interface LanguageItem {
  name: string;
  percentage: number;
  datasets: number;
}

export interface ImpactCard {
  name: string;
  value: string;
  growth: string;
  trend: string;
  iconName: string;
}

export const nationalKpis: CommandKpi[] = [
  {
    label: 'Connected Institutions',
    value: '86',
    change: '+14 this year',
    sparkline: [62, 65, 68, 70, 72, 75, 78, 80, 84, 86],
    iconName: 'Building2',
  },
  {
    label: 'AI-Ready Datasets',
    value: '1,284',
    change: '+180 new packs',
    sparkline: [980, 1020, 1050, 1080, 1120, 1150, 1190, 1220, 1250, 1284],
    iconName: 'Database',
  },
  {
    label: 'Total Records Managed',
    value: '428K',
    change: '+24K this month',
    sparkline: [350, 360, 370, 380, 390, 400, 410, 415, 420, 428],
    iconName: 'Layers',
  },
  {
    label: 'Registered Developers',
    value: '12,480',
    change: '+1.2K installs',
    sparkline: [9200, 9500, 9900, 10200, 10500, 10800, 11200, 11600, 12000, 12480],
    iconName: 'Users',
  },
  {
    label: 'Research Papers Supported',
    value: '742',
    change: '+84 academic citations',
    sparkline: [580, 600, 620, 640, 660, 680, 700, 715, 730, 742],
    iconName: 'GraduationCap',
  },
  {
    label: 'Enterprise AI Solutions',
    value: '216',
    change: '+18 deployed',
    sparkline: [160, 170, 175, 180, 185, 192, 200, 205, 210, 216],
    iconName: 'Cpu',
  },
  {
    label: 'Total Royalties Paid',
    value: 'US$28.4K',
    change: '+14% YoY',
    sparkline: [18, 20, 22, 23, 24, 25, 26, 27, 28, 28.4],
    iconName: 'Coins',
  },
  {
    label: 'National AI Readiness Score',
    value: '91%',
    change: 'Grade A rating',
    sparkline: [82, 84, 85, 86, 88, 89, 90, 90.5, 91, 91],
    iconName: 'Award',
  },
];

export const provincesData: ProvinceDetails[] = [
  { name: 'Harare', institutions: 28, datasets: 482, developers: 5800, apiRequests: '22.4K', researchProjects: 240, revenue: 'US$18.4K', readinessScore: 95, fillColor: 'rgba(14, 165, 233, 0.7)' },
  { name: 'Bulawayo', institutions: 18, datasets: 290, developers: 3200, apiRequests: '12.8K', researchProjects: 180, revenue: 'US$11.0K', readinessScore: 93, fillColor: 'rgba(0, 198, 167, 0.7)' },
  { name: 'Manicaland', institutions: 8, datasets: 120, developers: 920, apiRequests: '3.4K', researchProjects: 65, revenue: 'US$3.4K', readinessScore: 88, fillColor: 'rgba(16, 185, 129, 0.6)' },
  { name: 'Midlands', institutions: 10, datasets: 164, developers: 1200, apiRequests: '4.8K', researchProjects: 92, revenue: 'US$4.8K', readinessScore: 91, fillColor: 'rgba(245, 158, 11, 0.6)' },
  { name: 'Masvingo', institutions: 6, datasets: 98, developers: 480, apiRequests: '2.1K', researchProjects: 45, revenue: 'US$2.1K', readinessScore: 87, fillColor: 'rgba(217, 70, 239, 0.5)' },
  { name: 'Mashonaland Central', institutions: 5, datasets: 45, developers: 220, apiRequests: '1.2K', researchProjects: 32, revenue: 'US$1.2K', readinessScore: 84, fillColor: 'rgba(99, 102, 241, 0.5)' },
  { name: 'Mashonaland East', institutions: 4, datasets: 38, developers: 180, apiRequests: '980', researchProjects: 28, revenue: 'US$900', readinessScore: 83, fillColor: 'rgba(236, 72, 153, 0.4)' },
  { name: 'Mashonaland West', institutions: 5, datasets: 42, developers: 340, apiRequests: '1.4K', researchProjects: 38, revenue: 'US$1.3K', readinessScore: 85, fillColor: 'rgba(14, 165, 233, 0.4)' },
  { name: 'Matabeleland North', institutions: 1, datasets: 3, developers: 80, apiRequests: '320', researchProjects: 14, revenue: 'US$200', readinessScore: 78, fillColor: 'rgba(245, 158, 11, 0.3)' },
  { name: 'Matabeleland South', institutions: 1, datasets: 2, developers: 60, apiRequests: '210', researchProjects: 8, revenue: 'US$100', readinessScore: 76, fillColor: 'rgba(217, 70, 239, 0.3)' },
];

export const connectedInstitutionsList: ConnectedInstCard[] = [
  { name: 'National Archives', count: 1, repos: 4, datasets: 48, health: 99.8 },
  { name: 'Universities', count: 12, repos: 36, datasets: 284, health: 98.4 },
  { name: 'Hospitals & Health', count: 18, repos: 54, datasets: 190, health: 94.2 },
  { name: 'Museum & Monuments', count: 8, repos: 16, datasets: 65, health: 95.8 },
  { name: 'Research Institutes', count: 6, repos: 12, datasets: 92, health: 99.2 },
  { name: 'Government Ministries', count: 14, repos: 42, datasets: 320, health: 98.9 },
  { name: 'Agriculture Agencies', count: 10, repos: 28, datasets: 140, health: 99.4 },
  { name: 'Local Authorities', count: 12, repos: 24, datasets: 80, health: 90.2 },
  { name: 'National Libraries', count: 3, repos: 6, datasets: 45, health: 96.5 },
  { name: 'State Media Houses', count: 2, repos: 4, datasets: 20, health: 98.0 },
];

export const dataCoverageSectors: SectorCoverage[] = [
  { name: 'Health', value: 300, datasets: 190, growth: '+14.2%', coverage: 94, color: '#0ea5e9' },
  { name: 'Agriculture', value: 250, datasets: 140, growth: '+22.4%', coverage: 99, color: '#00C6A7' },
  { name: 'Education', value: 200, datasets: 284, growth: '+15.6%', coverage: 92, color: '#10B981' },
  { name: 'Culture', value: 120, datasets: 113, growth: '+9.4%', coverage: 95, color: '#F59E0B' },
  { name: 'Transport', value: 80, datasets: 62, growth: '+4.2%', coverage: 82, color: '#D946EF' },
  { name: 'Finance', value: 70, datasets: 48, growth: '+8.6%', coverage: 88, color: '#EC4899' },
  { name: 'Mining', value: 60, datasets: 32, growth: '+11.5%', coverage: 85, color: '#6366F1' },
  { name: 'Tourism', value: 50, datasets: 25, growth: '+12.0%', coverage: 90, color: '#0ea5e9' },
];

export const languageCoverageList: LanguageItem[] = [
  { name: 'English', percentage: 42, datasets: 540 },
  { name: 'Shona', percentage: 38, datasets: 488 },
  { name: 'Ndebele', percentage: 12, datasets: 154 },
  { name: 'Tonga', percentage: 3, datasets: 38 },
  { name: 'Venda', percentage: 1.5, datasets: 20 },
  { name: 'Kalanga', percentage: 1.2, datasets: 15 },
  { name: 'Nambya', percentage: 1.0, datasets: 12 },
  { name: 'Chewa', percentage: 0.5, datasets: 7 },
  { name: 'Sotho', percentage: 0.5, datasets: 6 },
  { name: 'Xhosa', percentage: 0.3, datasets: 4 },
];

export const readinessIndexRadar = [
  { subject: 'Dataset Quality', A: 94, fullMark: 100 },
  { subject: 'Metadata', A: 88, fullMark: 100 },
  { subject: 'Accessibility', A: 92, fullMark: 100 },
  { subject: 'Coverage', A: 90, fullMark: 100 },
  { subject: 'Compliance', A: 98, fullMark: 100 },
  { subject: 'Standardization', A: 89, fullMark: 100 },
  { subject: 'Machine Readability', A: 91, fullMark: 100 },
  { subject: 'Privacy', A: 95, fullMark: 100 },
];

export const ecosystemImpactList: ImpactCard[] = [
  { name: 'Research Papers Enabled', value: '742', growth: '+14%', trend: 'Upward trajectory', iconName: 'GraduationCap' },
  { name: 'AI Models Trained', value: '184', growth: '+22%', trend: 'Active fine-tuning', iconName: 'Cpu' },
  { name: 'Government Projects', value: '38', growth: '+8%', trend: 'Ministry approvals', iconName: 'Building2' },
  { name: 'Student Projects Completed', value: '1,480', growth: '+45%', trend: 'University labs', iconName: 'Users' },
  { name: 'Startups Supported', value: '42', growth: '+12%', trend: 'Incubators growth', iconName: 'Sparkles' },
  { name: 'Enterprise Solutions', value: '216', growth: '+18%', trend: 'SaaS production', iconName: 'Layers' },
  { name: 'Public APIs Deployed', value: '12', growth: '+10%', trend: 'Active Gateways', iconName: 'Terminal' },
  { name: 'Knowledge Assets Preserved', value: '48.2K', growth: '+15%', trend: 'Archive counts', iconName: 'Database' },
];

export const strategicRoadmapPhases = [
  { phase: 'Phase 1', title: 'Universities Onboarding', status: 'Completed', date: 'Q3 2025' },
  { phase: 'Phase 2', title: 'Government Data Replicas', status: 'In Progress', date: 'Q1 2026' },
  { phase: 'Phase 3', title: 'Museums Digitizations', status: 'Planned', date: 'Q3 2026' },
  { phase: 'Phase 4', title: 'Healthcare Synthetic Cohorts', status: 'Upcoming', date: 'Q1 2027' },
  { phase: 'Phase 5', title: 'Regional SADC Expansion', status: 'Future', date: 'Q3 2027' },
];

export const visionKeyAchievements = [
  { label: 'Knowledge Preserved', desc: 'Oral history transcriptions and ancient archives secured cryptographically.' },
  { label: 'AI Ecosystem Enabled', desc: 'Over 200 local LLM chatbots and RAG agents routed through boundary nodes.' },
  { label: 'Digital Economy Supported', desc: 'Enabling developer keys to provision, test, and buy datasets packages.' },
  { label: 'Research Accelerated', desc: 'Supporting academic researchers with flat rate data sandbox access.' },
  { label: 'National Innovation Strengthened', desc: 'Establishing sovereign computing frameworks to process unstructured files.' },
];
