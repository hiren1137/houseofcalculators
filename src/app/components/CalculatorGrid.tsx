import React from 'react';
import Link from 'next/link';
import { Calculator } from '@/lib/calculator-data';

interface CalculatorGridProps {
  calculators: Calculator[];
}

export default function CalculatorGrid({ calculators }: CalculatorGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {calculators.map(calc => (
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
  );
}
