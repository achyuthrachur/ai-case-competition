import type { Metadata } from 'next';
import './globals.css';

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
        {children}
      </body>
    </html>
  );
}
