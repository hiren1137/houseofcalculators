import React from 'react';
import { notFound } from 'next/navigation.js';  // 
import dynamic from 'next/dynamic';
import Header from '@/app/components/Header';
import { calculators } from '@/lib/calculator-data';

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const calculator = calculators.find(c => c.slug === params.slug);
  if (!calculator) return notFound();

  const CalculatorComponent = dynamic(() => 
    import(`@/app/components/Calculators/${capitalizeSlug(calculator.slug)}`)
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <CalculatorComponent />
      </main>
    </div>
  );
}

// Helper function to capitalize the first letter (optional, based on your file naming)
function capitalizeSlug(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
} 