// next-sitemap.config.js
const categories = [
  'math-calculators',
  'finance-calculators',
  'health-calculators',
  'engineering-calculators',
  'everyday-calculators',
  'gaming-calculators',
  'science-calculators',
  'lifestyle-spirituality-calculators'
];

const calculators = [
  'snow-day-calculator',
  'bottleneck-calculator',
  'rref-calculator',
  'cross-product-calculator',
  'acft-calculator',
  'ti-84-calculator',
  'a1c-calculator',
  'midpoint-calculator',
  'taylor-series-calculator',
  'board-foot-calculator',
  'vorici-chromatic-calculator',
  'army-body-fat-calculator',
  'dot-product-calculator',
  'mean-absolute-deviation-calculator',
  'bra-size-calculator',
  'simpsons-rule-calculator',
  'quadratic-equation-solver',
  'cpm-calculator',
  'point-buy-calculator',
  'motorcycle-loan-calculator',
  'bmi-calculator',
  'angel-number-calculator',
  'tangent-line-calculator',
  'maryland-paycheck-calculator',
  'interpolation-calculator',
  'riemann-sum-calculator',
  'partial-fraction-decomposition-calculator',
  'waspi-compensation-calculator',
  'roblox-tax-calculator',
  'null-space-calculator',
  'iowa-paycheck-calculator',
  'jacobian-calculator',
  'electron-configuration-calculator',
  'convolution-calculator',
  'jump-calculator-5e',
  'arkansas-child-support-calculator',
  'cd-ladder-calculator',
  'linear-independence-calculator',
  'square-root-curve-calculator',
  'circumference-to-diameter-calculator',
  'double-angle-formula-calculator',
  'round-to-nearest-cent-calculator',
  'productivity-calculator',
  'circumcenter-calculator',
  'mm-to-inches-converter-calculator',
  'coulombs-law-calculator',
  'contact-lens-vertex-calculator',
  'chebyshevs-theorem-calculator',
  'cartesian-to-polar-calculator'
];

module.exports = {
  siteUrl: 'https://www.houseofcalculators.com',
  generateRobotsTxt: true,
  outDir: 'public',
  exclude: [],
  transform: async (config, path) => {
    // Return basic configuration for default pages
    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }
  },
  additionalPaths: async (config) => {
    const result = [];
    
    // Add calculator pages (directly at root)
    for (const calculator of calculators) {
      result.push({
        loc: `/${calculator}`, // Remove /calculator/ prefix
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    }

    // Add category pages (directly at root)
    for (const category of categories) {
      result.push({
        loc: `/${category}`, // Remove /categories/ prefix
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    }

    return result;
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://www.houseofcalculators.com/sitemap.xml',
    ],
  },
};