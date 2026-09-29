export interface AssistantDatasetCard {
  name: string;
  provider: string;
  desc: string;
  qualityScore: number;
  records: string;
  languages: string[];
  formats: string[];
  license: string;
  price: string;
  apiAvailable: boolean;
  llmScore: number;
}

export const assistantDatasets: AssistantDatasetCard[] = [
  {
    name: 'AGRITEX Crop Surveys',
    provider: 'Ministry of Agriculture',
    desc: 'Geo-referenced crop yields and seasonal farm surveys from 2023–present.',
    qualityScore: 98,
    records: '14.8K readings',
    languages: ['Shona', 'English'],
    formats: ['Parquet', 'CSV'],
    license: 'Commercial Use',
    price: 'Institutional · US$250/mo',
    apiAvailable: true,
    llmScore: 95,
  },
  {
    name: 'Shona Language Corpus',
    provider: 'Midlands State University',
    desc: 'Linguistic tokens and sentence alignments for NLP fine-tuning.',
    qualityScore: 99,
    records: '38K tokens',
    languages: ['Shona'],
    formats: ['JSONL', 'TXT'],
    license: 'Research Use',
    price: 'Research · US$50/mo',
    apiAvailable: true,
    llmScore: 98,
  },
  {
    name: 'National Archives Collection',
    provider: 'National Archives of Zimbabwe',
    desc: 'Digitized historical manuscripts, letters, and oral transcriptions.',
    qualityScore: 94,
    records: '180K documents',
    languages: ['English', 'Shona', 'Ndebele'],
    formats: ['JSON', 'PDF'],
    license: 'Non-Commercial',
    price: 'Developer · US$10/mo',
    apiAvailable: true,
    llmScore: 91,
  },
  {
    name: 'Zimbabwe Census 2022 Data',
    provider: 'ZIMSTAT',
    desc: 'Anonymized census telemetry records mapping household indicators.',
    qualityScore: 99,
    records: '15.2K records',
    languages: ['English', 'Shona', 'Ndebele'],
    formats: ['Parquet'],
    license: 'Commercial Use',
    price: 'Enterprise · US$2,000+/yr',
    apiAvailable: true,
    llmScore: 96,
  },
  {
    name: 'Tourism Knowledge Base',
    provider: 'Zim Tourism Authority',
    desc: 'Vector-space ready coordinates detailing heritage sites and bookings logs.',
    qualityScore: 95,
    records: '45K records',
    languages: ['English', 'Shona', 'Ndebele'],
    formats: ['JSON', 'GeoJSON'],
    license: 'CC BY 4.0',
    price: 'Research · US$50/mo',
    apiAvailable: true,
    llmScore: 94,
  },
];

export const sdkExamples = {
  python: `import zimguide

client = zimguide.Client(api_key="zg_prod_381fa2")
dataset = client.datasets.retrieve("ds_002_agritex")

# Stream query records
for record in dataset.stream_records():
    print(record["crop_type"], record["yield_kg"])`,
  javascript: `import { ZimGuide } from '@zimguide/sdk';

const client = new ZimGuide({ apiKey: 'zg_prod_381fa2' });
const dataset = await client.datasets.retrieve('ds_002_agritex');

dataset.on('data', (record) => {
  console.log(record.crop_type, record.yield_kg);
});`,
  go: `package main

import (
    "context"
    "fmt"
    "github.com/zimguide/sdk-go"
)

func main() {
    client := zimguide.NewClient("zg_prod_381fa2")
    records, _ := client.StreamRecords(context.Background(), "ds_002_agritex")
    for records.Next() {
        fmt.Println(records.Record())
    }
}`,
};

export const apiExamples = {
  rest: `GET /api/v1/datasets/search?sector=agriculture&province=Masvingo&language=Shona HTTP/1.1
Host: api.zimguide.gov.zw
Authorization: Bearer zg_prod_381fa2`,
  graphql: `query {
  datasets(sector: "agriculture", province: "Masvingo", language: "Shona") {
    name
    records
    qualityScore
    downloadUrl
  }
}`,
};
