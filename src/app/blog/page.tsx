import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog - House of Calculators</title>
        <meta name="description" content="Explore our upcoming blog for insights on calculations, mathematics, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
          <div className="text-center">
            <p className="text-2xl mb-4">Coming Soon!</p>
            <p className="text-xl mb-4">We're working on bringing you interesting articles and insights.</p>
            <p className="text-lg">Check back soon for updates!</p>
          </div>
        </main>
        <footer className="bg-gray-800 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400">
            <p>&copy; 2024 Houseofcalculators.com. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}