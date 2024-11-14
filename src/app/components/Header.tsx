"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/calculator-data';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-800/80 backdrop-blur-lg' : 'bg-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center group">
            <Image
              src="/calculator-logo.png"
              alt="House of Calculators Logo"
              width={40}
              height={40}
              className="mr-2 transition-transform duration-300 group-hover:scale-110"
            />
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:from-pink-600 hover:to-purple-400 transition-all duration-300">
              House of Calculators
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="relative group">
                <button className="text-gray-300 hover:text-white transition-colors focus:outline-none">
                  Categories ▼
                </button>
                <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                  <div className="py-1">
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/${category.slug}`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="text-2xl">☰</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="space-y-2">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
              >
                Home
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
              >
                Blog
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;