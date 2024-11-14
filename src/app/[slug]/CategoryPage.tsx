"use client";

import React from 'react';
import Link from 'next/link';
import { getCategory, getCalculatorsByCategory } from '@/lib/calculator-data';
import Header from '@/app/components/Header';

interface CategoryPageProps {
  slug: string;
}

export default function CategoryPage({ slug }: CategoryPageProps) {
  const category = getCategory(slug);
  if (!category) return null;

  const categoryCalculators = getCalculatorsByCategory(slug);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <nav className="flex mb-8 text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{category.name} Calculators</span>
        </nav>

        <h1 className="text-3xl font-bold text-white mb-8">
          {category.name} Calculators
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryCalculators.map(calc => (
            <div key={calc.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className={`h-2 bg-gradient-to-r ${calc.color}`}></div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl">{calc.icon}</span>
                  <h3 className="text-white text-xl font-semibold">{calc.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">{calc.description}</p>
                <Link
                  href={`/${calc.slug}`}
                  className="block w-full text-center bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors duration-300"
                >
                  Open Calculator
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}