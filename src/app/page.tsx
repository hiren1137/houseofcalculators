// src/app/page.tsx
import { Suspense } from 'react';
import HomeContent from './HomeContent';
import type { Metadata } from 'next/types';  // Changed this line
import { homeMetadata } from '@/lib/metadata-config';

export const metadata: Metadata = {
  title: homeMetadata.title,
  description: homeMetadata.description,
  alternates: {
    canonical: homeMetadata.canonical,
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function HomePage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}