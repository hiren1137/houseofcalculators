import React from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Header from '../components/Header';

// Define a more specific type for the calculator components
type CalculatorProps = {
  // Add any common props your calculators might use
  // For example:
  // initialValue?: number;
};

type CalculatorComponent = React.ComponentType<CalculatorProps>;

// Dynamic imports for all calculators
const SnowDayCalculator = dynamic(() => import('../components/Calculators/SnowDayCalculator'), { ssr: false }) as CalculatorComponent;
const MidpointCalculator = dynamic(() => import('../components/Calculators/MidpointCalculator'), { ssr: false }) as CalculatorComponent;
const A1CCalculator = dynamic(() => import('../components/Calculators/A1CCalculator'), { ssr: false }) as CalculatorComponent;
const BottleneckCalculator = dynamic(() => import('../components/Calculators/BottleneckCalculator'), { ssr: false }) as CalculatorComponent;
const CrossProductCalculator = dynamic(() => import('../components/Calculators/CrossProductCalculator'), { ssr: false }) as CalculatorComponent;
const ACFTCalculator = dynamic(() => import('../components/Calculators/ACFTCalculator'), { ssr: false }) as CalculatorComponent;
const TI84Calculator = dynamic(() => import('../components/Calculators/TI84Calculator'), { ssr: false }) as CalculatorComponent;
const RREFCalculator = dynamic(() => import('../components/Calculators/RREFCalculator'), { ssr: false }) as CalculatorComponent;
const TaylorSeriesCalculator = dynamic(() => import('../components/Calculators/TaylorSeriesCalculator'), { ssr: false }) as CalculatorComponent;
const BoardFootCalculator = dynamic(() => import('../components/Calculators/BoardFootCalculator'), { ssr: false }) as CalculatorComponent;
const VoriciChromaticCalculator = dynamic(() => import('../components/Calculators/VoriciChromaticCalculator'), { ssr: false }) as CalculatorComponent;

const calculators: Record<string, CalculatorComponent> = {
  'snow-day-calculator': SnowDayCalculator,
  'midpoint-calculator': MidpointCalculator,
  'a1c-calculator': A1CCalculator,
  'bottleneck-calculator': BottleneckCalculator,
  'cross-product-calculator': CrossProductCalculator,
  'rref-calculator': RREFCalculator,
  'acft-calculator': ACFTCalculator,
  'ti-84-calculator': TI84Calculator,
  'taylor-series-calculator': TaylorSeriesCalculator,
  'board-foot-calculator': BoardFootCalculator,
  'vorici-chromatic-calculator': VoriciChromaticCalculator,
};

interface CalculatorPageProps {
  params: { calculator: string };
}

export default function CalculatorPage({ params }: CalculatorPageProps): JSX.Element {
  const CalculatorComponent = calculators[params.calculator];

  if (!CalculatorComponent) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow">
        <CalculatorComponent />
      </main>
    </div>
  );
}