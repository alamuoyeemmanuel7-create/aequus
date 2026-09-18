import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aequus',
  description: 'DBC Curve Presets',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0b0b0f] text-white">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
