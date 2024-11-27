import { MetadataRoute } from 'next';
import { calculatorMetadata, categoryMetadata } from '../lib/metadata-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.houseofcalculators.com';
  const currentDate = new Date().toISOString();

  const calculatorUrls = Object.keys(calculatorMetadata).map((key) => ({
    url: `${baseUrl}/${key}`,
    lastModified: currentDate,
    changeFreq: 'weekly',
    priority: 0.8,
  }));

  const categoryUrls = Object.keys(categoryMetadata).map((category) => ({
    url: `${baseUrl}/${category}`,
    lastModified: currentDate,
    changeFreq: 'weekly',
    priority: 0.9,
  }));

  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFreq: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFreq: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFreq: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFreq: 'monthly',
      priority: 0.5,
    },
  ] as const;

  return [...staticPages, ...categoryUrls, ...calculatorUrls];
}