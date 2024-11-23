import { MetadataRoute } from 'next';
import { calculatorMetadata, categoryMetadata } from '../lib/metadata-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.houseofcalculators.com';

  // Get all calculator URLs from metadata-config
  const calculatorUrls = Object.keys(calculatorMetadata).map((key) => ({
    url: `${baseUrl}/${key}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Add category pages using categoryMetadata
  const categoryUrls = Object.keys(categoryMetadata).map((category) => ({
    url: `${baseUrl}/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...staticPages, ...categoryUrls, ...calculatorUrls];
}