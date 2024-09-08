import React from 'react';
import Link from 'next/link';

interface CategoryDropdownProps {
  allCategories: string[];
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ allCategories }) => {
  return (
    <div className="relative group inline-block">
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Categories
      </button>
      <ul className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-50">
        {allCategories.map((category, index) => (
          <li key={index}>
            <Link 
              href={`/?category=${encodeURIComponent(category)}`}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDropdown;