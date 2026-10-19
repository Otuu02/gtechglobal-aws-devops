import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'GTECHGLOBAL · Internal Portal',
  description: 'The operating system for GTECHGLOBAL.',
  applicationName: 'GTECHGLOBAL OS',
};

export const viewport: Viewport = {
  themeColor: '#010102',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-canvas text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
