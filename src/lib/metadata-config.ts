export interface MetadataConfig {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
}

const BASE_URL = 'https://www.houseofcalculators.com';

export const homeMetadata: MetadataConfig = {
  title: "Free Online Calculators for Math, Finance & Engineering | House of Calculators",
  description: "Access our comprehensive collection of free online calculators...",
  canonical: BASE_URL
};
  
  // Category metadata
  export const categoryMetadata: Record<string, MetadataConfig> = {
    'mathematics-calculators': {
      title: "Mathematics Calculators | Free Math Tools & Solvers - House of Calculators",
      description: "Access our comprehensive collection of mathematics calculators. Tools for algebra, calculus, geometry, trigonometry, and more. Get instant solutions with step-by-step explanations.",
      canonical: `${BASE_URL}/mathematics-calculators`,
    },
    'finance-calculators': {
      title: "Financial Calculators | Free Finance Tools - House of Calculators",
      description: "Free financial calculators for loans, investments, mortgages, and budgeting. Make informed financial decisions with our comprehensive suite of finance tools.",
      canonical: `${BASE_URL}/finance-calculators`,
    },
    'health-calculators': {
      title: "Health & Fitness Calculators | Free Health Tools - House of Calculators",
      description: "Calculate BMI, body fat, nutrition, and other health metrics with our free health calculators. Evidence-based tools for managing your health and fitness goals.",
      canonical: `${BASE_URL}/health-calculators`,
    },
    'engineering-calculators': {
      title: "Engineering Calculators | Free Technical Tools - House of Calculators",
      description: "Professional engineering calculators for mechanical, electrical, civil, and computer engineering. Free tools for technical calculations and analysis.",
      canonical: `${BASE_URL}/engineering-calculators`,
    },
    'everyday-calculators': {
      title: "Everyday Use Calculators | Practical Tools - House of Calculators",
      description: "Free calculators for everyday calculations. Unit conversions, measurement tools, and practical calculators for daily use. Simple, accurate, and easy to use.",
      canonical: `${BASE_URL}/everyday-calculators`,
    },
    'gaming-calculators': {
      title: "Gaming Calculators | Game Stats & Tools - House of Calculators",
      description: "Free gaming calculators and tools for various games. Calculate stats, optimize builds, and enhance your gaming experience with our specialized calculators.",
      canonical: `${BASE_URL}/gaming-calculators`,
    },
    'science-calculators': {
      title: "Science Calculators | Free Scientific Tools - House of Calculators",
      description: "Free scientific calculators for physics, chemistry, and biology. Calculate formulas, convert units, and solve complex scientific problems with our tools.",
      canonical: `${BASE_URL}/science-calculators`,
    },
    'lifestyle-spirituality-calculators': {
      title: "Lifestyle & Spirituality Calculators | Free Tools - House of Calculators",
      description: "Access our free lifestyle and spirituality calculators. Tools for personal growth, spiritual insights, and lifestyle planning to enhance your daily life.",
      canonical: `${BASE_URL}/lifestyle-spirituality-calculators`,
    }
  };
// Calculator metadata
export const calculatorMetadata: Record<string, MetadataConfig> = {
    'snow-day-calculator': {
      title: 'Snow Day Calculator - Predict School Closures - House of Calculators',
      description: 'Use our free Snow Day Calculator to estimate the likelihood of school closures due to winter weather. Input local weather data and get accurate predictions for snow days.',
      canonical: `${BASE_URL}/snow-day-calculator`
    },
    'bottleneck-calculator': {
      title: 'CPU & GPU Bottleneck Calculator - Optimize PC Performance - House of Calculators',
      description: 'Identify and resolve PC performance issues with our Bottleneck Calculator. Analyze your CPU and GPU combination to maximize gaming and work efficiency. Free and easy to use.',
      canonical: `${BASE_URL}/bottleneck-calculator`
    },
    'rref-calculator': {
      title: 'RREF Calculator - Reduced Row Echelon Form - House of Calculators',
      description: 'Simplify matrix calculations with our free RREF (Reduced Row Echelon Form) Calculator. Solve linear equations, find inverse matrices, and more. Step-by-step solutions included.',
      canonical: `${BASE_URL}/rref-calculator`
    },
    'cross-product-calculator': {
      title: '3D Cross Product Calculator - Vector Mathematics - House of Calculators',
      description: 'Calculate cross products of 3D vectors easily with our free Cross Product Calculator. Ideal for physics, engineering, and mathematics. Includes visual representation and step-by-step explanation.',
      canonical: `${BASE_URL}/cross-product-calculator`
    },
    'acft-calculator': {
      title: 'ACFT Score Calculator - Army Combat Fitness Test - House of Calculators',
      description: 'Accurately calculate your Army Combat Fitness Test (ACFT) score with our free ACFT Calculator. Input your performance for each event and get instant results. Updated for current Army standards.',
      canonical: `${BASE_URL}/acft-calculator`
    },
    'ti-84-calculator': {
      title: 'Free Online TI-84 Calculator - Graphing & Scientific - House of Calculators',
      description: 'Access a free online version of the TI-84 calculator. Perform complex calculations, graph functions, and solve equations with this powerful tool. No download required.',
      canonical: `${BASE_URL}/ti-84-calculator`
    },
    'a1c-calculator': {
      title: 'A1C Calculator - Estimate Average Blood Glucose - House of Calculators',
      description: 'Convert between A1C and estimated average glucose (eAG) with our free A1C Calculator. Understand your blood sugar levels better and track your diabetes management progress.',
      canonical: `${BASE_URL}/a1c-calculator`
    },
    'midpoint-calculator': {
      title: 'Midpoint Calculator - Find Center Points - House of Calculators',
      description: 'Easily calculate the midpoint between two points with our free Midpoint Calculator. Perfect for geometry, coordinate systems, and map reading. Includes 2D and 3D calculations.',
      canonical: `${BASE_URL}/midpoint-calculator`
    },
    'taylor-series-calculator': {
      title: 'Taylor Series Calculator - Function Approximation - House of Calculators',
      description: 'Compute Taylor series expansions for various functions with our free calculator. Adjust the center point and number of terms. Ideal for calculus and mathematical analysis.',
      canonical: `${BASE_URL}/taylor-series-calculator`
    },
    'vorici-chromatic-calculator': {
      title: 'Vorici Calculator - Optimize Your PoE Chromatic Orb Usage',
      description: 'Use our Vorici Calculator to maximize efficiency in Path of Exile. Compare chromatic orb costs, success rates, and Vorici crafting methods. Optimize your socket coloring strategy with this essential PoE tool.',
      canonical: `${BASE_URL}/vorici-chromatic-calculator`
    },
    'board-foot-calculator': {
      title: 'Board Foot Calculator - House of Calculators',
      description: 'Calculate lumber volume and cost with our free Board Foot Calculator. Easily determine board feet for any wood project or purchase.',
      canonical: `${BASE_URL}/board-foot-calculator`
    },
    'army-body-fat-calculator': {
      title: 'Army Body Fat Calculator - Official U.S. Military Standards - House of Calculators',
      description: 'Use our accurate Army Body Fat Calculator to measure your body composition against official U.S. military standards. Get instant results, personalized tips, and prepare for ACFT. Ideal for soldiers and recruits.',
      canonical: `${BASE_URL}/army-body-fat-calculator`
    },
    'dot-product-calculator': {
      title: 'Dot Product Calculator - Vector Mathematics - House of Calculators',
      description: 'Calculate dot products of vectors easily with our free Dot Product Calculator. Ideal for physics, engineering, and mathematics. Includes visual representation and step-by-step explanation.',
      canonical: `${BASE_URL}/dot-product-calculator`
    },
    'mean-absolute-deviation-calculator': {
      title: 'Mean Absolute Deviation Calculator - Measure Data Dispersion - House of Calculators',
      description: 'Calculate and visualize Mean Absolute Deviation (MAD) with our free online tool. Perfect for statistics, data analysis, and understanding data spread. Includes graphical representation.',
      keywords: 'mean absolute deviation, MAD calculator, data dispersion, statistics calculator, data analysis tool',
      canonical: `${BASE_URL}/mean-absolute-deviation-calculator`
    },
    'bra-size-calculator': {
      title: 'Bra Size Calculator - Find Your Perfect Fit - House of Calculators',
      description: 'Use our accurate Bra Size Calculator for US, UK, Australian, and Indian sizes. Get your perfect fit with easy measurements and expert tips. Free, instant results!',
      keywords: 'bra size calculator, bra fitting, US bra sizes, UK bra sizes, Australian bra sizes, Indian bra sizes, perfect fit',
      canonical: `${BASE_URL}/bra-size-calculator`
    },
'simpsons-rule-calculator': {
    title: 'Simpsons Rule Calculator - House of Calculators',
    description: "Use our Simpson's Rule Calculator to approximate definite integrals with ease. Accurate numerical integration for your mathematical needs.",
    keywords: "Simpson's Rule Calculator, simpson rule calculator, simpson's approximation calculator, simpsons rule calc",
    canonical: `${BASE_URL}/simpsons-rule-calculator`
  },
  'quadratic-equation-solver': {
    title: 'Quadratic Equation Solver - House of Calculators',
    description: 'Solve quadratic equations easily with our Quadratic Equation Solver. Find roots and visualize graphs quickly.',
    canonical: `${BASE_URL}/quadratic-equation-solver`
  },
  'cpm-calculator': {
    title: 'CPM Calculator - Cost Per Mile Calculation - House of Calculators',
    description: 'Easily calculate your Cost Per Mille (CPM) with our professional CPM Calculator. Optimize your advertising spend and maximize campaign efficiency today.',
    canonical: `${BASE_URL}/cpm-calculator`
  },
  'point-buy-calculator': {
    title: 'Point Buy Calculator - House of Calculators',
    description: "Customize your character's attributes with our Point Buy Calculator. Allocate points strategically to create the perfect character for your adventure.",
    canonical: `${BASE_URL}/point-buy-calculator`
  },
  'motorcycle-loan-calculator': {
    title: 'Motorcycle Loan Calculator - Estimate Your Monthly Payments - House of Calculators',
    description: 'Use our free Motorcycle Loan Calculator to estimate your monthly payments and total interest. Plan your purchase and understand your financing options today.',
    canonical: `${BASE_URL}/motorcycle-loan-calculator`
  },
  'bmi-calculator': {
    title: 'BMI Calculator - Calculate Your Body Mass Index - House of Calculators',
    description: 'Calculate your Body Mass Index (BMI) with our free BMI Calculator. Understand your weight category and take steps towards a healthier lifestyle today.',
    canonical: `${BASE_URL}/bmi-calculator`
  },
  'angel-number-calculator': {
    title: 'Angel Number Calculator - Discover Your Spiritual Message - House of Calculators',
    description: 'Unveil your angel number with our free Angel Number Calculator. Enter your birth date or any significant number to find its spiritual meaning and guidance.',
    canonical: `${BASE_URL}/angel-number-calculator`
  },
  'tangent-line-calculator': {
    title: 'Tangent Line Calculator - Find the Equation of a Tangent Line - House of Calculators',
    description: 'Calculate the equation of a tangent line to a function at a given point with our free Tangent Line Calculator. Visualize the function and its tangent line on a graph.',
    canonical: `${BASE_URL}/tangent-line-calculator`
  },
  'maryland-paycheck-calculator': {
    title: 'Maryland Paycheck Calculator - Estimate Your Net Pay - House of Calculators',
    description: 'Use our Maryland Paycheck Calculator to estimate your net paycheck after federal and state taxes, Social Security, and Medicare deductions. Plan your finances effectively.',
    canonical: `${BASE_URL}/maryland-paycheck-calculator`
  },
  'interpolation-calculator': {
    title: 'Interpolation Calculator - Estimate a Value Using Linear Interpolation - House of Calculators',
    description: 'Estimate a value using linear interpolation with our free Interpolation Calculator. Input known points and calculate the interpolated value instantly.',
    canonical: `${BASE_URL}/interpolation-calculator`
  },
  'riemann-sum-calculator': {
    title: 'Riemann Sum Calculator - Approximate Integrals Using Riemann Sums - House of Calculators',
    description: 'Approximate the area under a curve using Riemann sums with our free Riemann Sum Calculator. Choose from Left, Right, Midpoint, or Trapezoidal methods.',
    canonical: `${BASE_URL}/riemann-sum-calculator`
  },
  'partial-fraction-decomposition-calculator': {
    title: 'Partial Fraction Decomposition Calculator - Decompose Rational Functions - House of Calculators',
    description: 'Perform partial fraction decomposition on rational functions with our free Partial Fraction Decomposition Calculator. Input your function and get the decomposed form instantly.',
    canonical: `${BASE_URL}/partial-fraction-decomposition-calculator`
  },
  'waspi-compensation-calculator': {
    title: 'WASPI Compensation Calculator - Estimate Your Pension Compensation - House of Calculators',
    description: 'Use our free WASPI Compensation Calculator to estimate potential compensation for women affected by state pension age changes. Input your birth date and get an instant estimate.',
    keywords: 'WASPI, Women Against State Pension Inequality, pension compensation, UK state pension, retirement calculator',
    canonical: `${BASE_URL}/waspi-compensation-calculator`
  },
  'roblox-tax-calculator': {
    title: 'Roblox Tax Calculator - House of Calculators',
    description: 'Calculate Roblox marketplace fees and estimate your earnings with our Roblox Tax Calculator. Perfect for Roblox developers and users.',
    canonical: `${BASE_URL}/roblox-tax-calculator`
  },
  'null-space-calculator': {
    title: 'Null Space Calculator - House of Calculators',
    description: 'Efficiently calculate the null space (kernel) of matrices with our accurate null space calculator. Solve linear algebra problems with ease.',
    canonical: `${BASE_URL}/null-space-calculator`
  },
  'iowa-paycheck-calculator': {
    title: 'Iowa Paycheck Calculator - House of Calculators',
    description: 'Calculate your net pay after federal and Iowa state taxes, Social Security, and Medicare deductions using our Iowa Paycheck Calculator. Perfect for Iowa residents.',
    keywords: 'Iowa paycheck calculator, net pay estimator, Iowa taxes, federal taxes, Social Security, Medicare, finance calculator',
    canonical: `${BASE_URL}/iowa-paycheck-calculator`
  },
  'jacobian-calculator': {
    title: 'Jacobian Calculator - House of Calculators',
    description: 'Compute the Jacobian matrix of a set of functions using our accurate Jacobian Calculator. Perfect for students and professionals.',
    keywords: 'Jacobian calculator, Jacobian matrix, partial derivatives, multivariable calculus, mathematics calculator',
    canonical: `${BASE_URL}/jacobian-calculator`
  },
  'electron-configuration-calculator': {
    title: 'Electron Configuration Calculator - House of Calculators',
    description: 'Determine the electron configuration of elements using our easy-to-use Electron Configuration Calculator. Ideal for students and chemistry enthusiasts.',
    keywords: 'electron configuration calculator, chemistry calculator, electron shells, periodic table, element electron configuration',
    canonical: `${BASE_URL}/electron-configuration-calculator`
  },
  'convolution-calculator': {
    title: 'Convolution Calculator - House of Calculators',
    description: 'Compute the convolution of two sequences using our easy-to-use Convolution Calculator. Ideal for students and engineers.',
    keywords: 'convolution calculator, math calculator, signal processing, discrete convolution, sequences convolution',
    canonical: `${BASE_URL}/convolution-calculator`
  },
  'jump-calculator-5e': {
    title: 'Jump Calculator 5e - House of Calculators',
    description: 'Determine your jump distance using the Dungeons & Dragons 5th Edition Jump Calculator. Perfect for players and dungeon masters.',
    keywords: 'jump calculator 5e, D&D jump calculator, role-playing game tools, Dungeons and Dragons, gaming calculator',
    canonical: `${BASE_URL}/jump-calculator-5e`
  },
  'arkansas-child-support-calculator': {
    title: 'Arkansas Child Support Calculator - House of Calculators',
    description: 'Calculate your child support obligations accurately using our Arkansas Child Support Calculator. Ideal for parents and legal professionals.',
    keywords: 'Arkansas child support calculator, child support obligations, legal calculator, family law, Arkansas legal tools',
    canonical: `${BASE_URL}/arkansas-child-support-calculator`
  },
  'cd-ladder-calculator': {
    title: 'CD Ladder Calculator - House of Calculators',
    description: 'Optimize your investment strategy with our CD Ladder Calculator. Plan your Certificate of Deposit ladder to maximize returns while maintaining liquidity.',
    keywords: 'CD ladder calculator, certificate of deposit ladder, investment calculator, finance tools, CD investment strategy',
    canonical: `${BASE_URL}/cd-ladder-calculator`
  },
  'linear-independence-calculator': {
    title: 'Linear Independence Calculator - House of Calculators',
    description: 'Determine if your set of vectors is linearly independent or dependent with our easy-to-use calculator. Enhance your understanding of linear algebra concepts.',
    keywords: 'linear independence calculator, vector independence, linear algebra tools, math calculators, linear dependence',
    canonical: `${BASE_URL}/linear-independence-calculator`
  },
  'square-root-curve-calculator': {
    title: 'Square Root Curve Calculator - House of Calculators',
    description: 'Calculate adjusted values using the square root curve with our intuitive calculator. Visualize the impact with interactive graphs.',
    keywords: 'square root curve calculator, value adjustment tool, mathematical calculator, square root curve graph, data transformation',
    canonical: `${BASE_URL}/square-root-curve-calculator`
  },
  'circumference-to-diameter-calculator': {
    title: 'Circumference to Diameter Calculator - House of Calculators',
    description: 'Easily convert the circumference of a circle to its diameter with our intuitive calculator. Understand the relationship between circumference and diameter.',
    keywords: 'circumference to diameter calculator, circle calculations, circ to diameter, geometry calculator, circle circumference diameter',
    canonical: `${BASE_URL}/circumference-to-diameter-calculator`
  },
  'double-angle-formula-calculator': {
    title: 'Double Angle Formula Calculator - House of Calculators',
    description: 'Compute double angle trigonometric values using our intuitive calculator. Learn about double angle formulas with detailed explanations.',
    keywords: 'double angle formula calculator, trigonometry calculator, sin 2A, cos 2A, tan 2A, trigonometric identities, math tools',
    canonical: `${BASE_URL}/double-angle-formula-calculator`
  },
  'round-to-nearest-cent-calculator': {
    title: 'Round to the Nearest Cent Calculator - House of Calculators',
    description: 'Quickly round any monetary amount to the nearest cent with our precise calculator. Essential for financial accuracy in transactions and accounting.',
    canonical: `${BASE_URL}/round-to-nearest-cent-calculator`
  },
  'productivity-calculator': {
    title: 'Productivity Calculator - House of Calculators',
    description: 'Optimize your work schedule and calculate your perfect end time with our productivity calculator. Enhance efficiency and manage time effectively.',
    canonical: `${BASE_URL}/productivity-calculator`
  },
  'circumcenter-calculator': {
    title: 'Circumcenter Calculator - House of Calculators',
    description: 'Use Circumcenter Calculator to determine the circumcenter and circumradius of any triangle by inputting the coordinates of its vertices. Perfect for geometry students and enthusiasts.',
    canonical: `${BASE_URL}/circumcenter-calculator`
  },
  'mm-to-inches-converter-calculator': {
    title: 'mm to Inches Converter Calculator - House of Calculators',
    description: 'Use our mm to Inches Converter Calculator to easily convert millimeters to inches. Perfect for engineers, students, and professionals needing precise length conversions.',
    canonical: `${BASE_URL}/mm-to-inches-converter-calculator`
  },
  'coulombs-law-calculator': {
    title: "Coulomb's Law Calculator - Electric Force Between Charges - House of Calculators",
    description: "Use our Coulomb's Law Calculator to easily compute the electric force between two charges. Perfect for physics students, engineers, and scientists working with electrostatics.",
    canonical: `${BASE_URL}/coulombs-law-calculator`
  },
  'contact-lens-vertex-calculator': {
    title: 'Contact Lens Vertex Calculator - Adjust Eyeglass Prescription - House of Calculators',
    description: 'Use our Contact Lens Vertex Calculator to accurately adjust your eyeglass prescription for contact lenses. Simplify your vision correction process today.',
    canonical: `${BASE_URL}/contact-lens-vertex-calculator`
  },
  'chebyshevs-theorem-calculator': {
    title: "Chebyshev's Theorem Calculator - Statistical Probability - House of Calculators",
    description: "Use our Chebyshev's Theorem Calculator to determine the minimum probability that a value lies within a specified number of standard deviations from the mean. Ideal for statistics students and professionals.",
    canonical: `${BASE_URL}/chebyshevs-theorem-calculator`
  },
  'cartesian-to-polar-calculator': {
    title: 'Cartesian to Polar Calculator - Coordinate Converter - House of Calculators',
    description: 'Use our Cartesian to Polar Calculator to easily convert Cartesian (x, y) coordinates to Polar (r, θ) coordinates. Perfect for students and professionals dealing with trigonometry and vector calculations.',
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
        ? metadata.title.replace(' - House of Calculators', '') + ' | Free Online Calculator'
        : metadata.title + ' | Free Online Calculator',
      canonical: `${BASE_URL}/${slug}`
    };
  }
  
  return notFoundMetadata;
}

export function generateCanonicalUrl(path: string): string {
  return path.startsWith('/') ? `${BASE_URL}${path}` : `${BASE_URL}/${path}`;
}