import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Case Competition',
  description: 'Case competition platform powered by Crowe',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
