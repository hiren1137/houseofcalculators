import React from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import { Metadata } from 'next'
import { calculatorMetadata } from '../calculatorMetadata'

type Props = {
  params: { calculator: string }
}

export function generateMetadata({ params }: Props): Metadata {
  const metadata = calculatorMetadata[params.calculator]
  if (!metadata) {
    return {
      title: 'Calculator Not Found',
      description: 'The requested calculator does not exist.',
    }
  }
  return metadata
}

const calculators: { [key: string]: () => Promise<{ default: React.ComponentType }> } = {
  'snow-day-calculator': () => import('../components/Calculators/SnowDayCalculator'),
  'bottleneck-calculator': () => import('../components/Calculators/BottleneckCalculator'),
  'rref-calculator': () => import('../components/Calculators/RREFCalculator'),
  'cross-product-calculator': () => import('../components/Calculators/CrossProductCalculator'),
  'acft-calculator': () => import('../components/Calculators/ACFTCalculator'),
  'ti-84-calculator': () => import('../components/Calculators/TI84Calculator'),
  'a1c-calculator': () => import('../components/Calculators/A1CCalculator'),
  'midpoint-calculator': () => import('../components/Calculators/MidpointCalculator'),
  'taylor-series-calculator': () => import('../components/Calculators/TaylorSeriesCalculator'),
  'vorici-chromatic-calculator': () => import('../components/Calculators/VoriciChromaticCalculator'),
  'board-foot-calculator': () => import('../components/Calculators/BoardFootCalculator'),
  'army-body-fat-calculator': () => import('../components/Calculators/ArmyBodyFatCalculator'),
  'dot-product-calculator': () => import('../components/Calculators/DotProductCalculator'),
  'mean-absolute-deviation-calculator': () => import('../components/Calculators/MeanAbsoluteDeviationCalculator'),
  'bra-size-calculator': () => import('../components/Calculators/BraSizeCalculator'),
  'simpsons-rule-calculator': () => import('../components/Calculators/SimpsonsRuleCalculator'),
  'quadratic-equation-solver': () => import('../components/Calculators/QuadraticEquationSolver'),
  'cpm-calculator': () => import('../components/Calculators/CPMCalculator'),
  'point-buy-calculator': () => import('../components/Calculators/PointBuyCalculator'),
  'motorcycle-loan-calculator': () => import('../components/Calculators/MotorcycleLoanCalculator'),
  'bmi-calculator': () => import('../components/Calculators/BMICalculator'),
  'angel-number-calculator': () => import('../components/Calculators/AngelNumberCalculator'),
  'tangent-line-calculator': () => import('../components/Calculators/TangentLineCalculator'),
  'maryland-paycheck-calculator': () => import('../components/Calculators/MarylandPaycheckCalculator'),
  'interpolation-calculator': () => import('../components/Calculators/InterpolationCalculator'),
  'riemann-sum-calculator': () => import('../components/Calculators/RiemannSumCalculator'),
  'partial-fraction-decomposition-calculator': () => import('../components/Calculators/PartialFractionDecompositionCalculator'),
  'waspi-compensation-calculator': () => import('../components/Calculators/WASPICompensationCalculator'),
  'roblox-tax-calculator': () => import('../components/Calculators/RobloxTaxCalculator'),
  'null-space-calculator': () => import('../components/Calculators/NullSpaceCalculator'),
  'iowa-paycheck-calculator': () => import('../components/Calculators/IowaPaycheckCalculator'),
  'jacobian-calculator': () => import('../components/Calculators/JacobianCalculator'),
  'electron-configuration-calculator':() => import ('../components/Calculators/ElectronConfigurationCalculator'),
  'convolution-calculator': () => import('../components/Calculators/ConvolutionCalculator'),
  'jump-calculator-5e': () => import('../components/Calculators/JumpCalculator5e'),
  'arkansas-child-support-calculator': () => import('../components/Calculators/ArkansasChildSupportCalculator'),
  'cd-ladder-calculator': () => import('../components/Calculators/CDLadderCalculator'),
  'linear-independence-calculator': () => import('../components/Calculators/LinearIndependenceCalculator'),
  'square-root-curve-calculator': () => import('../components/Calculators/SquareRootCurveCalculator'),
  'circumference-to-diameter-calculator': () => import('../components/Calculators/CircumferenceToDiameterCalculator'),
  'double-angle-formula-calculator': () => import('../components/Calculators/DoubleAngleFormulaCalculator'),
  'round-to-nearest-cent-calculator': () => import('../components/Calculators/RoundToNearestCentCalculator'),
  'productivity-calculator': () => import('../components/Calculators/ProductivityCalculator'), // Fixed typo in 'ProductyvityCalculator'
  'circumcenter-calculator': () => import('../components/Calculators/CircumcenterCalculator'),
  'mm-to-inches-converter-calculator': () => import('../components/Calculators/MmToInchesConverterCalculator'),
  'coulombs-law-calculator': () => import('../components/Calculators/CoulombsLawCalculator'),
  'contact-lens-vertex-calculator': () => import('../components/Calculators/ContactLensVertexCalculator'),
  'chebyshevs-theorem-calculator': () => import ('../components/Calculators/ChebyshevsTheoremCalculator'),
};


export default function CalculatorPage({ params }: Props): JSX.Element {
  const CalculatorComponent = dynamic(calculators[params.calculator] || (() => Promise.resolve(() => notFound())));

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <CalculatorComponent />
        </div>
      </main>
    </div>
  );
}