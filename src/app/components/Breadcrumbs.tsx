import Link from 'next/link';

interface BreadcrumbsProps {
  category: {
    name: string;
    slug: string;
  };
}

export default function Breadcrumbs({ category }: BreadcrumbsProps) {
  return (
    <nav className="flex mb-8 text-gray-400">
      <Link href="/" className="hover:text-white transition-colors">
        Home
      </Link>
      <span className="mx-2">/</span>
      <span className="text-white">{category.name} Calculators</span>
    </nav>
  );
} 