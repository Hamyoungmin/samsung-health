import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Samsung Health Home Screen',
  description: 'Samsung Health home screen redesign focused on personalized health categories, quick guidance, and editable content order.',
  keywords: ['Samsung Health', 'home screen', 'health app', 'redesign', 'Next.js'],
  openGraph: {
    title: 'Samsung Health Home Screen',
    description: 'A redesigned Samsung Health home screen experience with personalized categories and guided discovery.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ height: '100%' }}
    >
      <body style={{ height: '100%', overflow: 'hidden' }}>{children}</body>
    </html>
  );
}
