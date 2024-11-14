import { calculators, categories } from '@/lib/calculator-data';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Calculator Categories */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Calculator Categories</h3>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category.slug}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    {category.name} Calculators
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Popular Calculators */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Popular Calculators</h3>
            <ul className="space-y-2">
              {calculators.slice(0, 5).map(calc => (
                <li key={calc.id}>
                  <Link 
                    href={`/calculator/${calc.slug}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {calc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">About</h3>
            <p className="text-gray-400">
              House of Calculators provides free online calculation tools to help users solve complex problems quickly and accurately.
            </p>
          </div>

          {/* Contact */}
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
  );
}