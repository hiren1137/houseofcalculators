
export const categories = [
  {
    name: 'Mathematics',
    slug: 'math-calculators',
    description: 'Advanced mathematical tools for calculations and problem-solving'
  },
  {
    name: 'Finance',
    slug: 'finance-calculators',
    description: 'Financial calculation tools for budgeting and investment'
  },
  {
    name: 'Health',
    slug: 'health-calculators',
    description: 'Health and fitness calculation tools'
  },
  {
    name: 'Engineering',
    slug: 'engineering-calculators',
    description: 'Engineering and technical calculation tools'
  },
  {
    name: 'Everyday Use',
    slug: 'everyday-calculators',
    description: 'Common calculators for daily use'
  },
  {
    name: 'Gaming',
    slug: 'gaming-calculators',
    description: 'Gaming-related calculation tools'
  },
  {
    name: 'Science',
    slug: 'science-calculators',
    description: 'Scientific calculation tools'
  },
  {
    name: 'Lifestyle & Spirituality',
    slug: 'lifestyle-spirituality-calculators',
    description: 'Lifestyle and spiritual calculation tools'
  }
] as const;

export const calculators = [
  {
    id: 1,
    title: 'Snow Day Calculator',
    slug: 'snow-day-calculator',
    description: 'Predict snow day likelihood',
    icon: '❄️',
    color: 'from-blue-500 to-blue-600',
    category: 'Everyday Use'
  },
  {
    id: 2,
    title: 'Bottleneck Calculator',
    slug: 'bottleneck-calculator',
    description: 'Find performance bottlenecks',
    icon: '💻',
    color: 'from-red-500 to-red-600',
    category: 'Engineering'
  },
  {
    id: 3,
    title: 'RREF Calculator',
    slug: 'rref-calculator',
    description: 'Reduced Row Echelon Form',
    icon: '🎓',
    color: 'from-green-500 to-green-600',
    category: 'Mathematics'
  },
  {
    id: 4,
    title: 'Cross Product Calculator',
    slug: 'cross-product-calculator',
    description: 'Calculate vector cross product',
    icon: '📐',
    color: 'from-yellow-500 to-yellow-600',
    category: 'Mathematics'
  },
  {
    id: 5,
    title: 'ACFT Calculator',
    slug: 'acft-calculator',
    description: 'Army Combat Fitness Test',
    icon: '💪',
    color: 'from-pink-500 to-pink-600',
    category: 'Health'
  },
  {
    id: 6,
    title: 'TI-84 Calculator Online',
    slug: 'ti-84-calculator',
    description: 'Simulate TI-84',
    icon: '🖩',
    color: 'from-indigo-500 to-indigo-600',
    category: 'Mathematics'
  },
  {
    id: 7,
    title: 'A1C Calculator',
    slug: 'a1c-calculator',
    description: 'Estimate A1C levels',
    icon: '🩸',
    color: 'from-teal-500 to-teal-600',
    category: 'Health'
  },
  {
    id: 8,
    title: 'Midpoint Calculator',
    slug: 'midpoint-calculator',
    description: 'Find the midpoint between points',
    icon: '📏',
    color: 'from-orange-500 to-orange-600',
    category: 'Mathematics'
  },
  {
    id: 9,
    title: 'Taylor Series Calculator',
    slug: 'taylor-series-calculator',
    description: 'Calculate Taylor Series',
    icon: '📈',
    color: 'from-cyan-500 to-cyan-600',
    category: 'Mathematics'
  },
  {
    id: 10,
    title: 'Board Foot Calculator',
    slug: 'board-foot-calculator',
    description: 'Calculate lumber volume and cost',
    icon: '🪵',
    color: 'from-green-500 to-green-600',
    category: 'Everyday Use'
  },
  {
    id: 11,
    title: 'Vorici Chromatic Calculator',
    slug: 'vorici-chromatic-calculator',
    description: 'Optimize Path of Exile socket coloring',
    icon: '🔮',
    color: 'from-purple-500 to-purple-600',
    category: 'Gaming'
  },
  {
    id: 12,
    title: 'Army Body Fat Calculator',
    slug: 'army-body-fat-calculator',
    description: 'Measure body composition for U.S. military standards',
    icon: '📏',
    color: 'from-red-500 to-red-600',
    category: 'Health'
  },
  {
    id: 13,
    title: 'Dot Product Calculator',
    slug: 'dot-product-calculator',
    description: 'Calculate the dot product of vectors',
    icon: '🔢',
    color: 'from-blue-500 to-blue-600',
    category: 'Mathematics'
  },
  {
    id: 14,
    title: 'Mean Absolute Deviation Calculator',
    slug: 'mean-absolute-deviation-calculator',
    description: 'Calculate the mean absolute deviation of a dataset',
    icon: '📊',
    color: 'from-pink-500 to-pink-600',
    category: 'Mathematics'
  },
  {
    id: 15,
    title: 'Bra Size Calculator',
    slug: 'bra-size-calculator',
    description: 'Estimate your bra size based on measurements',
    icon: '👙',
    color: 'from-purple-500 to-purple-600',
    category: 'Everyday Use'
  },
  {
    id: 16,
    title: 'Simpsons Rule Calculator',
    slug: 'simpsons-rule-calculator',
    description: "Calculate definite integrals using Simpson's Rule",
    icon: '📐',
    color: 'from-blue-500 to-blue-600',
    category: 'Mathematics'
  },
  {
    id: 17,
    title: 'Quadratic Equation Solver',
    slug: 'quadratic-equation-solver',
    description: 'Solve quadratic equations using the quadratic formula',
    icon: '🧮',
    color: 'from-green-500 to-green-600',
    category: 'Mathematics'
  },
  {
    id: 18,
    title: 'CPM Calculator',
    slug: 'cpm-calculator',
    description: 'Calculate cost per mille for advertising',
    icon: '💰',
    color: 'from-yellow-500 to-yellow-600',
    category: 'Finance'
  },
  {
    id: 19,
    title: 'Point Buy Calculator',
    slug: 'point-buy-calculator',
    description: "Customize your character's attributes",
    icon: '🎲',
    color: 'from-green-500 to-green-600',
    category: 'Gaming'
  },
  {
    id: 20,
    title: 'Motorcycle Loan Calculator',
    slug: 'motorcycle-loan-calculator',
    description: 'Estimate your motorcycle loan payments',
    icon: '🏍️',
    color: 'from-blue-500 to-blue-600',
    category: 'Finance'
  },
  {
    id: 21,
    title: 'BMI Calculator',
    slug: 'bmi-calculator',
    description: 'Calculate your Body Mass Index',
    icon: '🧘‍♂️',
    color: 'from-purple-500 to-purple-600',
    category: 'Health'
  },
  {
    id: 22,
    title: 'Angel Number Calculator',
    slug: 'angel-number-calculator',
    description: 'Discover your spiritual message',
    icon: '✨',
    color: 'from-purple-500 to-indigo-600',
    category: 'Lifestyle & Spirituality'
  },
  {
    id: 23,
    title: 'Tangent Line Calculator',
    slug: 'tangent-line-calculator',
    description: 'Find the equation of a tangent line',
    icon: '📈',
    color: 'from-indigo-500 to-blue-600',
    category: 'Mathematics'
  },
  {
    id: 24,
    title: 'Maryland Paycheck Calculator',
    slug: 'maryland-paycheck-calculator',
    description: 'Estimate your net pay after taxes and deductions',
    icon: '💰',
    color: 'from-green-500 to-green-600',
    category: 'Finance'
  },
  {
    id: 25,
    title: 'Interpolation Calculator',
    slug: 'interpolation-calculator',
    description: 'Estimate values using interpolation',
    icon: '📈',
    color: 'from-indigo-500 to-blue-600',
    category: 'Mathematics'
  },
  {
    id: 26,
    title: 'Riemann Sum Calculator',
    slug: 'riemann-sum-calculator',
    description: 'Approximate integrals using Riemann sums',
    icon: '∫',
    color: 'from-indigo-500 to-blue-600',
    category: 'Mathematics'
  },
  {
    id: 27,
    title: 'Partial Fraction Decomposition Calculator',
    slug: 'partial-fraction-decomposition-calculator',
    description: 'Decompose rational functions into partial fractions',
    icon: '➗',
    color: 'from-indigo-500 to-blue-600',
    category: 'Mathematics'
  },
  {
    id: 28,
    title: 'WASPI Compensation Calculator',
    slug: 'waspi-compensation-calculator',
    description: 'Estimate your WASPI compensation',
    icon: '💼',
    color: 'from-green-500 to-green-600',
    category: 'Finance'
  },
  {
    id: 29,
    title: 'Roblox Tax Calculator',
    slug: 'roblox-tax-calculator',
    description: 'Calculate Roblox marketplace fees',
    icon: '🎮',
    color: 'from-red-500 to-red-600',
    category: 'Gaming'
  },
  {
    id: 30,
    title: 'Null Space Calculator',
    slug: 'null-space-calculator',
    description: 'Compute the null space (kernel) of a matrix',
    icon: '🧮',
    color: 'from-purple-500 to-pink-600',
    category: 'Mathematics'
  },
  {
    id: 31,
    title: 'Iowa Paycheck Calculator',
    slug: 'iowa-paycheck-calculator',
    description: 'Estimate your net pay after taxes and deductions in Iowa',
    icon: '💸',
    color: 'from-blue-500 to-blue-600',
    category: 'Finance'
  },
  {
    id: 32,
    title: 'Jacobian Calculator',
    slug: 'jacobian-calculator',
    description: 'Compute the Jacobian matrix of a set of functions',
    icon: '🔢',
    color: 'from-yellow-500 to-yellow-600',
    category: 'Mathematics'
  },
  {
    id: 33,
    title: 'Electron Configuration Calculator',
    slug: 'electron-configuration-calculator',
    description: 'Calculate the electron configuration of elements',
    icon: '🔬',
    color: 'from-green-500 to-green-600',
    category: 'Science'
  },
  {
    id: 34,
    title: 'Convolution Calculator',
    slug: 'convolution-calculator',
    description: 'Compute the convolution of two sequences',
    icon: '🔄',
    color: 'from-blue-500 to-blue-600',
    category: 'Mathematics'
  },
  {
    id: 35,
    title: 'Jump Calculator 5e',
    slug: 'jump-calculator-5e',
    description: 'Calculate your jump distance based on D&D 5th Edition rules',
    icon: '🏃‍♂️',
    color: 'from-purple-500 to-purple-600',
    category: 'Gaming'
  },
  {
    id: 36,
    title: 'Arkansas Child Support Calculator',
    slug: 'arkansas-child-support-calculator',
    description: 'Estimate your child support obligations based on Arkansas state guidelines',
    icon: '👨‍👧‍👦',
    color: 'from-red-500 to-red-600',
    category: 'Finance'
  },
  {
    id: 37,
    title: 'CD Ladder Calculator',
    slug: 'cd-ladder-calculator',
    description: 'Plan your Certificate of Deposit (CD) ladder strategy',
    icon: '📈',
    color: 'from-blue-500 to-blue-600',
    category: 'Finance'
  },
  {
    id: 38,
    title: 'Linear Independence Calculator',
    slug: 'linear-independence-calculator',
    description: 'Determine if a set of vectors is linearly independent',
    icon: '🧮',
    color: 'from-green-500 to-green-600',
    category: 'Mathematics'
  },
  {
    id: 39,
    title: 'Square Root Curve Calculator',
    slug: 'square-root-curve-calculator',
    description: 'Visualize and understand the square root function',
    icon: '√',
    color: 'from-blue-500 to-blue-600',
    category: 'Mathematics'
  },
  {
    id: 40,
    title: 'Circumference to Diameter Calculator',
    slug: 'circumference-to-diameter-calculator',
    description: 'Convert the circumference of a circle to its diameter',
    icon: '⭕',
    color: 'from-green-500 to-green-600',
    category: 'Mathematics'
  },
  {
    id: 41,
    title: 'Double Angle Formula Calculator',
    slug: 'double-angle-formula-calculator',
    description: 'Compute double angle trigonometric values',
    icon: '📐',
    color: 'from-red-500 to-red-600',
    category: 'Mathematics'
  },
  {
    id: 42,
    title: 'Round to the Nearest Cent Calculator',
    slug: 'round-to-nearest-cent-calculator',
    description: 'Round any monetary amount to the nearest cent',
    icon: '💰',
    color: 'from-yellow-500 to-yellow-600',
    category: 'Finance'
  },
  {
    id: 43,
    title: 'Productivity Calculator',
    slug: 'productivity-calculator',
    description: 'Optimize your work schedule and calculate your perfect end time',
    icon: '⏰',
    color: 'from-blue-500 to-blue-600',
    category: 'Everyday Use'
  },
  {
    id: 44,
    title: 'Circumcenter Calculator',
    slug: 'circumcenter-calculator',
    description: 'Calculate the circumcenter and circumradius of a triangle',
    icon: '📐',
    color: 'from-green-500 to-green-600',
    category: 'Mathematics'
  },
  {
    id: 45,
    title: 'MM to Inches Converter Calculator',
    slug: 'mm-to-inches-converter-calculator',
    description: 'Convert millimeters to inches quickly and accurately',
    icon: '📏',
    color: 'from-red-500 to-red-600',
    category: 'Everyday Use'
  },
  {
    id: 46,
    title: "Coulomb's Law Calculator",
    slug: 'coulombs-law-calculator',
    description: 'Calculate the electric force between two charges',
    icon: '⚡',
    color: 'from-blue-500 to-blue-600',
    category: 'Science'
  },
  {
    id: 47,
    title: 'Contact Lens Vertex Calculator',
    slug: 'contact-lens-vertex-calculator',
    description: 'Adjust your eyeglass prescription for contact lenses',
    icon: '👓',
    color: 'from-green-500 to-teal-600',
    category: 'Everyday Use'
  },
  {
    id: 48,
    title: "Chebyshev's Theorem Calculator",
    slug: 'chebyshevs-theorem-calculator',
    description: "Calculate the minimum probability using Chebyshev's Theorem",
    icon: '📊',
    color: 'from-purple-500 to-indigo-600',
    category: 'Mathematics'
  },
  {
    id: 49,
    title: 'Cartesian to Polar Calculator',
    slug: 'cartesian-to-polar-calculator',
    description: 'Convert Cartesian coordinates to Polar coordinates',
    icon: '📐',
    color: 'from-green-500 to-teal-600',
    category: 'Mathematics'
  }
] as const;

export type Category = typeof categories[number];
export type Calculator = typeof calculators[number];

// Add this helper function to filter calculators by category
export function getCalculatorsByCategory(categorySlug: string) {
  const category = categories.find(c => c.slug === categorySlug);
  if (!category) return [];
  
  return calculators.filter(calc => calc.category === category.name);
}

// Add these new helper functions
export function isCategory(slug: string): boolean {
  return categories.some(c => c.slug === slug);
}

export function isCalculator(slug: string): boolean {
  return calculators.some(c => c.slug === slug);
}

// Optional: Add a helper to get single calculator
export function getCalculator(slug: string): Calculator | undefined {
  return calculators.find(c => c.slug === slug);
}

// Optional: Add a helper to get single category
export function getCategory(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}