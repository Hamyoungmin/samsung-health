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
  title: 'MEP — 더 스마트한 웹&앱 플랫폼',
  description: 'MEP는 현대적인 웹&앱 플랫폼으로, 여러분의 아이디어를 빠르고 안정적으로 현실로 만들어 드립니다.',
  keywords: ['웹', '앱', '플랫폼', 'Next.js', 'Firebase'],
  openGraph: {
    title: 'MEP — 더 스마트한 웹&앱 플랫폼',
    description: '더 빠르고 스마트하게 성장할 수 있도록 돕는 올인원 웹&앱 플랫폼',
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
    >
      <body>{children}</body>
    </html>
  );
}
