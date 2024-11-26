import Link from 'next/link';
import { calculators, categories } from '@/lib/calculator-data';

export default function SitemapLinks() {
  return (
    <div style={{ display: 'none' }} aria-hidden="true">
      <footer>
        <div>
          <h2>Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/${category.slug}`}>
                  {category.name} Calculators
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Calculators</h2>
          <ul>
            {calculators.map((calculator) => (
              <li key={calculator.slug}>
                <Link href={`/${calculator.slug}`}>
                  {calculator.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
