import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Meridian Financial — AI Case Competition',
  description: 'Competition portal for the Meridian Financial AI Case Competition',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className="bg-page"
        style={{ fontFamily: "Arial, 'Helvetica Neue', Helvetica, system-ui, sans-serif" }}
      >
        <Navbar />
        <div className="pt-16">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
