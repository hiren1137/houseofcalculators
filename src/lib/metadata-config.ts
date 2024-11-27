export interface MetadataConfig {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
}

const BASE_URL = 'https://www.houseofcalculators.com';

export const homeMetadata: MetadataConfig = {
  title: "Free Online Calculators for Math, Finance & Engineering | House of Calculators",
  description: "Explore free online calculators for math, finance, and engineering at House of Calculators. Simplify your calculations with our easy-to-use tools!",
  canonical: BASE_URL
};
  
// Category metadata
export const categoryMetadata: Record<string, MetadataConfig> = {
  'math-calculators': {
    title: "Mathematics Calculators | Free Math Tools & Solvers - House of Calculators",
    description: "Explore free math calculators for algebra, calculus, geometry, and more. Solve problems with instant results and step-by-step explanations.",
    canonical: `${BASE_URL}/math-calculators`,
  },
  'finance-calculators': {
    title: "Financial Calculators | Free Finance Tools - House of Calculators",
    description: "Access free calculators for loans, mortgages, and investments. Make smart financial decisions with simple, accurate, and efficient tools.",
    canonical: `${BASE_URL}/finance-calculators`,
  },
  'health-calculators': {
    title: "Health & Fitness Calculators | Free Health Tools - House of Calculators",
    description: "Discover health calculators for BMI, body fat, and nutrition. Manage your health and fitness goals with reliable and user-friendly tools.",
    canonical: `${BASE_URL}/health-calculators`,
  },
  'engineering-calculators': {
    title: "Engineering Calculators | Free Technical Tools - House of Calculators",
    description: "Explore free calculators for civil, mechanical, and electrical engineering. Perform technical calculations with ease and precision.",
    canonical: `${BASE_URL}/engineering-calculators`,
  },
  'everyday-calculators': {
    title: "Everyday Use Calculators | Practical Tools - House of Calculators",
    description: "Find free calculators for daily tasks, unit conversions, and measurements. Simple, practical tools for everyday calculations.",
    canonical: `${BASE_URL}/everyday-calculators`,
  },
  'gaming-calculators': {
    title: "Gaming Calculators | Game Stats & Tools - House of Calculators",
    description: "Access gaming calculators to optimize stats, builds, and strategies. Enhance your gameplay with free, accurate tools for gamers.",
    canonical: `${BASE_URL}/gaming-calculators`,
  },
  'science-calculators': {
    title: "Science Calculators | Free Scientific Tools - House of Calculators",
    description: "Use scientific calculators for physics, chemistry, and biology. Solve complex problems with user-friendly tools and detailed results.",
    canonical: `${BASE_URL}/science-calculators`,
  },
  'lifestyle-spirituality-calculators': {
    title: "Lifestyle & Spirituality Calculators | Free Tools - House of Calculators",
    description: "Access calculators for personal growth and spirituality. Plan your lifestyle and explore insights with accurate, easy-to-use tools.",
    canonical: `${BASE_URL}/lifestyle-spirituality-calculators`,
  }
};

// Calculator metadata
export const calculatorMetadata: Record<string, MetadataConfig> = {
  'snow-day-calculator': {
    title: 'Snow Day Calculator - Predict School Closures - House of Calculators',
    description: 'Find your Snow Day chances with our calculator. Enter your US zip code for accurate school closure predictions due to winter weather.',
    canonical: `${BASE_URL}/snow-day-calculator`
  },
  'bottleneck-calculator': {
    title: 'Bottleneck Calculator - Optimize PC Performance - House of Calculators',
    description: 'Analyze your CPU and GPU combination with our Bottleneck Calculator. Optimize gaming and work performance efficiently.',
    canonical: `${BASE_URL}/bottleneck-calculator`
  },
  'rref-calculator': {
    title: 'RREF Calculator - Reduced Row Echelon Form - House of Calculators',
    description: 'Solve matrices, find inverses, and reduce row echelon forms instantly. Use our free RREF Calculator with step-by-step solutions.',
    canonical: `${BASE_URL}/rref-calculator`
  },
  'cross-product-calculator': {
    title: '3D Cross Product Calculator - Vector Mathematics - House of Calculators',
    description: 'Calculate cross products of 3D vectors instantly. Ideal for engineering and physics, with step-by-step explanations and visualizations.',
    canonical: `${BASE_URL}/cross-product-calculator`
  },
  'acft-calculator': {
    title: 'ACFT Score Calculator - Army Combat Fitness Test - House of Calculators',
    description: 'Calculate your Army Combat Fitness Test score accurately. Input your results for instant, updated scores per Army standards.',
    canonical: `${BASE_URL}/acft-calculator`
  },
  'ti-84-calculator': {
    title: 'Free Online TI-84 Calculator - Graphing & Scientific - House of Calculators',
    description: 'Access a free TI-84 calculator online for graphing, equations, and scientific calculations. No download required.',
    canonical: `${BASE_URL}/ti-84-calculator`
  },
  'a1c-calculator': {
    title: 'A1C Calculator - Estimate Average Blood Glucose - House of Calculators',
    description: 'Convert between A1C and estimated glucose levels. Use our A1C Calculator to manage your health effectively.',
    canonical: `${BASE_URL}/a1c-calculator`
  },
  'midpoint-calculator': {
    title: 'Midpoint Calculator - Find Center Points - House of Calculators',
    description: 'Calculate the midpoint of two points in 2D or 3D spaces instantly. Ideal for geometry and map analysis.',
    canonical: `${BASE_URL}/midpoint-calculator`
  },
  'taylor-series-calculator': {
    title: 'Taylor Series Calculator - Function Approximation - House of Calculators',
    description: 'Compute Taylor series expansions easily. Adjust terms and center points for accurate function approximations.',
    canonical: `${BASE_URL}/taylor-series-calculator`
  },
  'vorici-chromatic-calculator': {
    title: 'Vorici Calculator - Optimize Your PoE Chromatic Orb Usage',
    description: 'Optimize your Path of Exile chromatic orb usage. Use our Vorici Calculator for cost and success rate analysis.',
    canonical: `${BASE_URL}/vorici-chromatic-calculator`
  },
  'board-foot-calculator': {
    title: 'Board Foot Calculator - House of Calculators',
    description: 'Calculate board feet for lumber projects quickly. Use our free Board Foot Calculator for accurate volume measurements.',
    canonical: `${BASE_URL}/board-foot-calculator`
  },
  'army-body-fat-calculator': {
    title: 'Army Body Fat Calculator - Official U.S. Military Standards - House of Calculators',
    description: 'Accurately measure body fat percentage based on U.S. Army standards. Input your measurements for instant, reliable results.',
    canonical: `${BASE_URL}/army-body-fat-calculator`
  },
  'dot-product-calculator': {
    title: 'Dot Product Calculator - Vector Mathematics - House of Calculators',
    description: 'Calculate dot products of vectors easily. Ideal for physics, engineering, and math, with clear explanations and results.',
    canonical: `${BASE_URL}/dot-product-calculator`
  },
  'mean-absolute-deviation-calculator': {
    title: 'Mean Absolute Deviation Calculator - Measure Data Dispersion - House of Calculators',
    description: 'Calculate Mean Absolute Deviation (MAD) instantly. Analyze data dispersion and visualize statistics effectively.',
    canonical: `${BASE_URL}/mean-absolute-deviation-calculator`
  },
  'bra-size-calculator': {
    title: 'Bra Size Calculator - Find Your Perfect Fit - House of Calculators',
    description: 'Find your ideal bra size for US, UK, and more. Use our Bra Size Calculator with accurate measurements and quick results.',
    canonical: `${BASE_URL}/bra-size-calculator`
  },
  'simpsons-rule-calculator': {
    title: 'Simpsons Rule Calculator - House of Calculators',
    description: "Approximate definite integrals using Simpson's Rule. Simplify numerical integration with our free, reliable calculator.",
    canonical: `${BASE_URL}/simpsons-rule-calculator`
  },
  'quadratic-equation-solver': {
    title: 'Quadratic Equation Solver - House of Calculators',
    description: 'Solve quadratic equations instantly. Find roots and visualize graphs with our free and easy-to-use solver.',
    canonical: `${BASE_URL}/quadratic-equation-solver`
  },
  'cpm-calculator': {
    title: 'CPM Calculator - Cost Per Mille Calculation - House of Calculators',
    description: 'Easily calculate CPM for ads. Optimize your campaign spending and measure efficiency with accurate results.',
    canonical: `${BASE_URL}/cpm-calculator`
  },
  'point-buy-calculator': {
    title: 'Point Buy Calculator - House of Calculators',
    description: 'Customize character attributes with our Point Buy Calculator. Perfect for creating balanced stats for RPG adventures.',
    canonical: `${BASE_URL}/point-buy-calculator`
  },
  'motorcycle-loan-calculator': {
    title: 'Motorcycle Loan Calculator - Estimate Monthly Payments - House of Calculators',
    description: 'Estimate monthly payments and interest for your motorcycle loan. Plan financing options with our free calculator.',
    canonical: `${BASE_URL}/motorcycle-loan-calculator`
  },
  'bmi-calculator': {
    title: 'BMI Calculator - Calculate Your Body Mass Index - House of Calculators',
    description: 'Calculate your BMI to understand your health. Enter weight and height for instant results and personalized insights.',
    canonical: `${BASE_URL}/bmi-calculator`
  },
  'angel-number-calculator': {
    title: 'Angel Number Calculator - Discover Spiritual Messages - House of Calculators',
    description: 'Find your angel number with our calculator. Input your birth date or significant numbers for spiritual insights.',
    canonical: `${BASE_URL}/angel-number-calculator`
  },
  'tangent-line-calculator': {
    title: 'Tangent Line Calculator - Find Tangent Line Equations - House of Calculators',
    description: 'Calculate tangent lines to curves at specific points. Visualize functions and their tangents with step-by-step details.',
    canonical: `${BASE_URL}/tangent-line-calculator`
  },
  'maryland-paycheck-calculator': {
    title: 'Maryland Paycheck Calculator - Estimate Net Pay - House of Calculators',
    description: 'Calculate your net pay after taxes for Maryland. Get accurate results for financial planning and payroll estimates.',
    canonical: `${BASE_URL}/maryland-paycheck-calculator`
  },
  'interpolation-calculator': {
    title: 'Interpolation Calculator - Estimate Values - House of Calculators',
    description: 'Estimate values using linear interpolation. Input known points to calculate unknowns instantly and accurately.',
    canonical: `${BASE_URL}/interpolation-calculator`
  },
  'riemann-sum-calculator': {
    title: 'Riemann Sum Calculator - Approximate Integrals - House of Calculators',
    description: 'Approximate integrals using Riemann sums. Choose left, right, midpoint, or trapezoidal methods with detailed visuals.',
    canonical: `${BASE_URL}/riemann-sum-calculator`
  },
  'partial-fraction-decomposition-calculator': {
    title: 'Partial Fraction Decomposition Calculator - House of Calculators',
    description: 'Decompose rational functions into partial fractions. Use our calculator for quick, step-by-step solutions.',
    canonical: `${BASE_URL}/partial-fraction-decomposition-calculator`
  },
  'waspi-compensation-calculator': {
    title: 'WASPI Compensation Calculator - Estimate Pension Compensation - House of Calculators',
    description: 'Estimate pension compensation for WASPI-affected individuals. Input your details for accurate calculations.',
    canonical: `${BASE_URL}/waspi-compensation-calculator`
  },
  'roblox-tax-calculator': {
    title: 'Roblox Tax Calculator - House of Calculators',
    description: 'Calculate your Roblox earnings after marketplace fees. Ideal for developers and users managing in-game earnings.',
    canonical: `${BASE_URL}/roblox-tax-calculator`
  },
  'null-space-calculator': {
    title: 'Null Space Calculator - House of Calculators',
    description: 'Calculate the null space of matrices instantly. Solve linear algebra problems with ease using our free calculator.',
    canonical: `${BASE_URL}/null-space-calculator`
  },
  'iowa-paycheck-calculator': {
    title: 'Iowa Paycheck Calculator - House of Calculators',
    description: 'Calculate your net pay for Iowa. Includes federal taxes, Social Security, and Medicare deductions for accurate results.',
    canonical: `${BASE_URL}/iowa-paycheck-calculator`
  },
  'jacobian-calculator': {
    title: 'Jacobian Calculator - House of Calculators',
    description: 'Calculate Jacobian matrices for multivariable functions. Simplify calculus problems with this free, powerful tool.',
    canonical: `${BASE_URL}/jacobian-calculator`
  },
  'electron-configuration-calculator': {
    title: 'Electron Configuration Calculator - House of Calculators',
    description: 'Determine the electron configuration of elements. Perfect for students and professionals in chemistry.',
    canonical: `${BASE_URL}/electron-configuration-calculator`
  },
  'convolution-calculator': {
    title: 'Convolution Calculator - House of Calculators',
    description: 'Compute convolution of sequences easily. Ideal for signal processing and mathematics.',
    canonical: `${BASE_URL}/convolution-calculator`
  },
  'jump-calculator-5e': {
    title: 'Jump Calculator 5e - House of Calculators',
    description: 'Calculate jump distances for D&D 5th Edition characters. Perfect for players and dungeon masters planning adventures.',
    canonical: `${BASE_URL}/jump-calculator-5e`
  },
  'arkansas-child-support-calculator': {
    title: 'Arkansas Child Support Calculator - House of Calculators',
    description: 'Calculate child support obligations for Arkansas accurately. Ideal for parents and legal professionals.',
    canonical: `${BASE_URL}/arkansas-child-support-calculator`
  },
  'cd-ladder-calculator': {
    title: 'CD Ladder Calculator - House of Calculators',
    description: 'Plan your CD investments with our CD Ladder Calculator. Optimize returns while maintaining liquidity.',
    canonical: `${BASE_URL}/cd-ladder-calculator`
  },
  'linear-independence-calculator': {
    title: 'Linear Independence Calculator - House of Calculators',
    description: 'Determine if vectors are linearly independent. Simplify linear algebra problems with clear and instant results.',
    canonical: `${BASE_URL}/linear-independence-calculator`
  },
  'square-root-curve-calculator': {
    title: 'Square Root Curve Calculator - House of Calculators',
    description: 'Calculate and visualize square root curves easily. Ideal for mathematical transformations and analysis.',
    canonical: `${BASE_URL}/square-root-curve-calculator`
  },
  'circumference-to-diameter-calculator': {
    title: 'Circumference to Diameter Calculator - House of Calculators',
    description: 'Convert circumference to diameter easily. Simplify circle calculations for geometry and math.',
    canonical: `${BASE_URL}/circumference-to-diameter-calculator`
  },
  'double-angle-formula-calculator': {
    title: 'Double Angle Formula Calculator - House of Calculators',
    description: 'Calculate trigonometric values using double angle formulas. Simplify sin, cos, and tan calculations with ease.',
    canonical: `${BASE_URL}/double-angle-formula-calculator`
  },
  'round-to-nearest-cent-calculator': {
    title: 'Round to the Nearest Cent Calculator - House of Calculators',
    description: 'Quickly round monetary amounts to the nearest cent. Essential for financial accuracy and accounting.',
    canonical: `${BASE_URL}/round-to-nearest-cent-calculator`
  },
  'productivity-calculator': {
    title: 'Productivity Calculator - House of Calculators',
    description: 'Optimize your work schedule and manage your time effectively with our Productivity Calculator. Enhance efficiency effortlessly.',
    canonical: `${BASE_URL}/productivity-calculator`
  },
  'circumcenter-calculator': {
    title: 'Circumcenter Calculator - House of Calculators',
    description: 'Determine the circumcenter and circumradius of a triangle. Input vertex coordinates for instant geometric calculations.',
    canonical: `${BASE_URL}/circumcenter-calculator`
  },
  'mm-to-inches-converter-calculator': {
    title: 'mm to Inches Converter Calculator - House of Calculators',
    description: 'Easily convert millimeters to inches with our accurate converter. Perfect for engineers, students, and professionals.',
    canonical: `${BASE_URL}/mm-to-inches-converter-calculator`
  },
  'coulombs-law-calculator': {
    title: "Coulomb's Law Calculator - Electric Force - House of Calculators",
    description: 'Calculate electric force between charges with Coulomb’s Law Calculator. Ideal for physics and electrostatics analysis.',
    canonical: `${BASE_URL}/coulombs-law-calculator`
  },
  'contact-lens-vertex-calculator': {
    title: 'Contact Lens Vertex Calculator - House of Calculators',
    description: 'Adjust your eyeglass prescription for contact lenses easily. Use our free Contact Lens Vertex Calculator for accurate results.',
    canonical: `${BASE_URL}/contact-lens-vertex-calculator`
  },
  'chebyshevs-theorem-calculator': {
    title: "Chebyshev's Theorem Calculator - House of Calculators",
    description: "Calculate probabilities using Chebyshev's Theorem. Analyze data within standard deviations with our statistical calculator.",
    canonical: `${BASE_URL}/chebyshevs-theorem-calculator`
  },
  'cartesian-to-polar-calculator': {
    title: 'Cartesian to Polar Calculator - House of Calculators',
    description: 'Convert Cartesian (x, y) coordinates to Polar (r, θ) instantly. Ideal for trigonometry and vector calculations.',
    canonical: `${BASE_URL}/cartesian-to-polar-calculator`
  }
};

export const notFoundMetadata: MetadataConfig = {
  title: "Page Not Found | House of Calculators",
  description: "The page you're looking for cannot be found...",
  canonical: BASE_URL
};

export function getMetadata(type: 'home' | 'category' | 'calculator', slug?: string): MetadataConfig {
  if (type === 'home') {
    return homeMetadata;
  }
  
  if (type === 'category' && slug) {
    const metadata = categoryMetadata[slug];
    if (!metadata) {
      return notFoundMetadata;
    }
    return {
      ...metadata,
      title: metadata.title.includes('House of Calculators') 
        ? metadata.title 
        : `${metadata.title} | Free Online Tools`,
      canonical: `${BASE_URL}/${slug}`
    };
  }
  
  if (type === 'calculator' && slug) {
    const metadata = calculatorMetadata[slug];
    if (!metadata) {
      return notFoundMetadata;
    }
    return {
      ...metadata,
      title: metadata.title.includes('- House of Calculators') 
        ? metadata.title
        : metadata.title,
      canonical: `${BASE_URL}/${slug}`
    };
  }
  
  return notFoundMetadata;
}

export function generateCanonicalUrl(path: string): string {
  return path.startsWith('/') ? `${BASE_URL}${path}` : `${BASE_URL}/${path}`;
}