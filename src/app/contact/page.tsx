"use client";
import Header from '../components/Header';
import Link from 'next/link';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
          <p className="text-xl mb-6">
            Have questions, suggestions, or feedback? We'd love to hear from you! Please feel free to reach out to us at:
          </p>
          <p className="text-xl mb-6 text-blue-400">
            techjits.com(at)gmail(dot)com
          </p>
          <p className="text-xl mb-6">
            We strive to respond to all inquiries within 24-48 hours.
          </p>
        </div>
      </main>

      <footer className="bg-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} House of Calculators. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 