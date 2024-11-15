"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation.js'; 
import Header from './components/Header';
import { categories, calculators } from '@/lib/calculator-data';
import CalculatorGrid from './components/CalculatorGrid';

const h1Title = "Free Online Calculators: Mathematics, Finance, Health & Engineering Tools";

const metaDescription = "Access our comprehensive collection of 150+ free online calculators for mathematics, finance, health, engineering, and everyday calculations. Get precise results instantly with our user-friendly tools.";

const faqs = [
  {
    question: "What types of calculators are available on House of Calculators?",
    answer: "House of Calculators offers a wide range of tools across multiple categories including Mathematics (like RREF, Cross Product, Taylor Series), Finance (CPM, Mortgage), Health (BMI, A1C), Engineering (Bottleneck), and many more specialized calculators for everyday use."
  },
  {
    question: "Are the calculators free to use?",
    answer: "Yes, all calculators on our platform are completely free to use. We believe in providing accessible tools for everyone to solve their calculation needs without any cost barriers."
  },
  {
    question: "How accurate are the calculations?",
    answer: "Our calculators are designed with precision in mind, using industry-standard formulas and algorithms. Each calculator is thoroughly tested to ensure accurate results for your calculations."
  },
  {
    question: "Can I use these calculators on my mobile device?",
    answer: "Absolutely! Our website is fully responsive and optimized for all devices. Whether you're using a smartphone, tablet, or desktop computer, you'll have a seamless experience."
  },
  {
    question: "Do I need to create an account to use the calculators?",
    answer: "No account is required to use any of our calculators. Simply visit the website and start using the tools immediately without any registration process."
  }
];

export default function HomeContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayCount, setDisplayCount] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category') || 
      (typeof window !== 'undefined' ? window.location.pathname.slice(1) : null);
    setSelectedCategory(category);
    setSearchTerm('');
  }, [searchParams]);

  const filteredCalculators = calculators.filter(calc => 
    (selectedCategory ? 
      calc.category === categories.find(c => c.slug === selectedCategory)?.name : true) &&
    (calc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     calc.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const displayedCalculators = searchTerm || selectedCategory ? filteredCalculators : calculators.slice(0, displayCount);

  const loadMore = () => {
    setDisplayCount(prevCount => Math.min(prevCount + 12, calculators.length));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="relative overflow-hidden mb-16">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h1 className="text-5xl font-extrabold mb-4 text-white">
              {h1Title}
            </h1>
            <div className="text-3xl font-bold mb-4 text-white">
              Your Trusted Calculation Platform
            </div>
            
            <div className="max-w-3xl mx-auto mt-8 text-gray-300">
              <p className="text-lg mb-4">
                Welcome to House of Calculators, your trusted destination for precise calculations and problem-solving tools. We offer a comprehensive suite of calculators designed to simplify complex calculations across various fields.
              </p>
              <p className="text-lg mb-4">
                Whether you're a student tackling mathematics, a professional managing finances, or someone looking for everyday calculation tools, we've got you covered with our user-friendly and accurate calculators.
              </p>
            </div>

            <div className="relative max-w-md mx-auto mb-4">
              <input
                type="text"
                placeholder="Search calculators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 py-2 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-md border border-gray-700 rounded-md text-white placeholder-gray-400"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {selectedCategory && (
            <h2 className="text-3xl font-bold mb-8 text-center">{selectedCategory} Calculators</h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCalculators.map(calc => (
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
          {!searchTerm && !selectedCategory && displayCount < calculators.length && (
            <div className="mt-8 text-center">
              <button
                onClick={loadMore}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Load More
              </button>
            </div>
          )}
        </div>

        <section className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-gray-800 rounded-lg"
              >
                <summary className="flex justify-between items-center cursor-pointer p-6 text-lg font-medium">
                  {faq.question}
                  <span className="transform group-open:rotate-180 transition-transform duration-200">
                    ▼
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-300">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <footer className="bg-gray-800 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Calculator Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/${category.slug}`}
                        className={`text-gray-400 hover:text-white transition-colors ${
                          selectedCategory === category.slug ? 'text-white font-semibold' : ''
                        }`}
                      >
                        {category.name} Calculators
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Popular Calculators</h3>
                <ul className="space-y-2">
                  {calculators.slice(0, 5).map(calc => (
                    <li key={calc.id}>
                      <Link 
                        href={`/${calc.slug}`}
                        className={`text-gray-400 hover:text-white transition-colors ${
                          selectedCategory === calc.slug ? 'text-white font-semibold' : ''
                        }`}
                      >
                        {calc.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">About</h3>
                <p className="text-gray-400">
                  House of Calculators provides free online calculation tools to help users solve complex problems quickly and accurately.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Contact</h3>
                <p className="text-gray-400">
                  Have suggestions or feedback? We'd love to hear from you.
                </p>
                <Link 
                  href="/contact"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} House of Calculators. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

            