"use client";
import Header from '../components/Header';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">About House of Calculators</h1>
          <p className="text-xl mb-6">
            Welcome to House of Calculators, your one-stop destination for all your calculation needs. We provide a wide range of online calculators to help you solve complex problems quickly and accurately.
          </p>
          <p className="text-xl mb-6">
            Our mission is to make calculations accessible and easy for everyone, from students to professionals. Whether you&apos;re working on a school project, solving a work-related problem, or just curious about numbers, we&apos;ve got you covered.
          </p>
          <p className="text-xl">
            Explore our vast collection of calculators and simplify your calculations today!
          </p>
        </div>
      </main>

      <footer className="bg-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400">
          <p>&copy; 2024 House of Calculators. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}