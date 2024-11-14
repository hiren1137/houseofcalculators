import type { Metadata } from 'next/types'; 
import { notFound } from 'next/navigation.js';  
import { calculators, categories } from '../../../lib/calculator-data';
import Link from 'next/link';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import Header from '@/app/components/Header';

interface CategoryPageProps {
  params: {
    category: string;
  }
}
export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find(c => c.slug === params.category);
  
  if (!category) {
    console.log('Category not found:', params.category);
    return notFound();
  }

  const categoryCalculators = calculators.filter(calc => 
    calc.category === category.name
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs category={category} />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            {category.name} Calculators
          </h1>
          <p className="text-xl font-medium text-gray-300 max-w-3xl mx-auto">
            {category.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryCalculators.map(calc => (
            <Link
              key={calc.id}
              href={`/calculator/${calc.slug}`}
              className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`h-2 bg-gradient-to-r ${calc.color}`} />
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl">{calc.icon}</span>
                  <h2 className="text-white text-xl font-bold">{calc.title}</h2>
                </div>
                <p className="text-gray-400">{calc.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

// Add displayName to the component
CategoryPage.displayName = "CategoryPage";