"use client";

import React, { Suspense, FC } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getCalculator, categories } from '@/lib/calculator-data';
import Header from '@/app/components/Header';

interface CalculatorPageProps {
  slug: string;
}

const CalculatorPage: FC<CalculatorPageProps> = ({ slug }) => {
  const calculator = getCalculator(slug);
  if (!calculator) return null;

  const category = categories.find(c => c.name === calculator.category);
  if (!category) return null;

  // Enhanced conversion function to handle special cases
  const getComponentName = (slug: string): string => {
    // Special cases mapping
    const specialCases: Record<string, string> = {
      'ti-84-calculator': 'TI84Calculator',
      'rref-calculator': 'RREFCalculator',
      'acft-calculator': 'ACFTCalculator',
      'a1c-calculator': 'A1CCalculator',
      'cpm-calculator': 'CPMCalculator',
      'bmi-calculator': 'BMICalculator',
      'waspi-compensation-calculator': 'WaspiCompensationCalculator',
      'cd-ladder-calculator': 'CDLadderCalculator'
    };

    // Check if it's a special case
    if (specialCases[slug]) {
      return specialCases[slug];
    }

    // Default conversion for other cases
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  };

  const componentName = getComponentName(slug);
  console.log('Loading component:', componentName); // Debug log

  const CalculatorComponent = dynamic(
    () => import(`@/app/components/Calculators/${componentName}`).catch(err => {
      console.error('Failed to load calculator:', err);
      return () => (
        <div className="bg-gray-800 p-6 rounded-lg text-white">
          <h2 className="text-xl font-semibold mb-4">Error Loading Calculator</h2>
          <p>We're having trouble loading this calculator. Please try again later.</p>
        </div>
      );
    }),
    {
      loading: () => (
        <div className="flex items-center justify-center h-32 bg-gray-800 rounded-lg">
          <div className="text-center text-white">
            <div className="mb-2">Loading calculator...</div>
            <div className="text-sm text-gray-400">Please wait while we prepare your calculator</div>
          </div>
        </div>
      ),
      ssr: false
    }
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex mb-8 text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link 
            href={`/${category.slug}`}
            className="hover:text-white transition-colors"
          >
            {category.name} Calculators
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{calculator.title}</span>
        </nav>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{calculator.icon}</span>
            <h1 className="text-3xl font-bold text-white">
              {calculator.title}
            </h1>
          </div>
          <p className="text-gray-400">{calculator.description}</p>
        </div>

        <Suspense 
          fallback={
            <div className="flex items-center justify-center h-32 bg-gray-800 rounded-lg">
              <div className="text-center text-white">
                <div className="mb-2">Loading...</div>
                <div className="text-sm text-gray-400">Setting up your calculator</div>
              </div>
            </div>
          }
        >
          <CalculatorComponent />
        </Suspense>
      </main>
    </div>
  );
};

CalculatorPage.displayName = 'CalculatorPage';

export default CalculatorPage;