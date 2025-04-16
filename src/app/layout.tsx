import '@/app/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import SolaceLogo from '@/app/components/solace_logo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Solace Candidate Assignment',
  description: 'Show us what you got',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main style={{ margin: '24px' }}>
          <div className="header">
            <SolaceLogo />
          </div>

          { children }
        </main>
      </body>
    </html>
  );
}
