import Link from 'next/link';
import { calculators } from '@/lib/calculator-data';
import { categories } from '@/lib/calculator-data';

export default function SitemapLinks() {
  return (
    <div aria-hidden="true" className="hidden" style={{display: 'none'}}>
      <nav>
        {categories.map((category) => (
          <Link 
            key={category.slug} 
            href={`/${category.slug}`}
            tabIndex={-1}
          >
            {category.name} Calculators
          </Link>
        ))}
        {calculators.map((calculator) => (
          <Link 
            key={calculator.slug} 
            href={`/${calculator.slug}`}
            tabIndex={-1}
          >
            {calculator.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}