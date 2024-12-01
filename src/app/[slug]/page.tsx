import React from 'react';
import { notFound } from 'next/navigation.js';  
import { isCategory, isCalculator, categories } from '@/lib/calculator-data';
import { getMetadata, categoryMetadata, calculatorMetadata } from '@/lib/metadata-config';
import CategoryPage from './CategoryPage';
import CalculatorPage from './CalculatorPage';
import type { Metadata } from 'next/types';  

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;

  if (isCategory(slug)) {
    const metadata = getMetadata('category', slug);
    return {
      title: metadata.title,
      description: metadata.description,
      alternates: {
        canonical: metadata.canonical
      },
      openGraph: {
        title: metadata.title,
        description: metadata.description,
        url: metadata.canonical,
      }
    };
  }

  if (isCalculator(slug)) {
    const metadata = getMetadata('calculator', slug);
    return {
      title: metadata.title,
      description: metadata.description,
      alternates: {
        canonical: metadata.canonical
      },
      openGraph: {
        title: metadata.title,
        description: metadata.description,
        url: metadata.canonical,
      }
    };
  }

  return notFound();
}

export async function generateStaticParams() {
  const categoryPages = categories.map((category) => ({
    slug: category.slug,
  }));

  const calculatorPages = Object.keys(calculatorMetadata).map((slug) => ({
    slug: slug,
  }));

  return [...categoryPages, ...calculatorPages];
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  if (isCategory(slug)) {
    return <CategoryPage slug={slug} />;
  }

  if (isCalculator(slug)) {
    return <CalculatorPage slug={slug} />;
  }

  return notFound();
}