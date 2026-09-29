import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ZimGuide Data Core — Zimbabwe\u2019s Sovereign AI Data Infrastructure',
  description:
    'Transform institutional data into AI-ready datasets through compliant curation, anonymization and secure processing. Discover, subscribe to, and consume datasets through APIs.',
  metadataBase: new URL('https://zimguide.data.core'),
  openGraph: {
    title: 'ZimGuide Data Core',
    description:
      "Zimbabwe's Sovereign AI Data Infrastructure Platform for trusted institutions.",
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
