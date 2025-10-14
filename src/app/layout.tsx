import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { initializeApp } from './init';

// Initialize the application (including database setup)
initializeApp().catch(error => {
  console.error('Failed to initialize app:', error);
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Randevu - Doctor Appointment Booking',
  description: 'Book doctor appointments online. Find verified doctors, view availability, and schedule appointments instantly.',
  applicationName: 'Randevu',
  authors: [{ name: 'Randevu' }],
  generator: 'Next.js',
  keywords: ['doctor', 'appointment', 'booking', 'healthcare', 'medical', 'randevu', 'consultation'],
  referrer: 'origin-when-cross-origin',
  creator: 'Randevu',
  publisher: 'Randevu',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Randevu - Doctor Appointment Booking',
    description: 'Book doctor appointments online. Find verified doctors, view availability, and schedule appointments instantly.',
    url: '/',
    siteName: 'Randevu',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Randevu - Doctor Appointment Booking',
    description: 'Book doctor appointments online. Find verified doctors, view availability, and schedule appointments instantly.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Randevu',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}