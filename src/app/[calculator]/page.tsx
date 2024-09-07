import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Header from '../components/Header';

// Dynamic imports for all calculators
const SnowDayCalculator = dynamic(() => import('../components/Calculators/SnowDayCalculator'), { ssr: false });
const MidpointCalculator = dynamic(() => import('../components/Calculators/MidpointCalculator'), { ssr: false });
const A1CCalculator = dynamic(() => import('../components/Calculators/A1CCalculator'), { ssr: false });
const BottleneckCalculator = dynamic(() => import('../components/Calculators/BottleneckCalculator'), { ssr: false });
const CrossProductCalculator = dynamic(() => import('../components/Calculators/CrossProductCalculator'), { ssr: false });
const ACFTCalculator = dynamic(() => import('../components/Calculators/ACFTCalculator'), { ssr: false });
const TI84Calculator = dynamic(() => import('../components/Calculators/TI84Calculator'), { ssr: false });
const RREFCalculator = dynamic(() => import('../components/Calculators/RREFCalculator'), { ssr: false });
const TaylorSeriesCalculator = dynamic(() => import('../components/Calculators/TaylorSeriesCalculator'), { ssr: false });

// Placeholder component remains the same
const PlaceholderCalculator = ({ name }: { name: string }) => (
  <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-xl">
    <h1 className="text-3xl font-bold text-white mb-4">{name}</h1>
    <p className="text-gray-300">This calculator is coming soon. Check back later!</p>
  </div>
);

const calculators: { [key: string]: React.ComponentType<any> } = {
  'snow-day-calculator': SnowDayCalculator,
  'midpoint-calculator': MidpointCalculator,
  'a1c-calculator': A1CCalculator,
  'bottleneck-calculator': BottleneckCalculator,
  'cross-product-calculator': CrossProductCalculator,
  'rref-calculator': RREFCalculator,
  'acft-calculator': ACFTCalculator,
  'ti-84-calculator': TI84Calculator,
  'taylor-series-calculator': TaylorSeriesCalculator,
};

export default function CalculatorPage({ params }: { params: { calculator: string } }) {
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