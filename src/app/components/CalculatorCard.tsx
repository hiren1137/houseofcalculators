import Link from 'next/link';
import { Calculator } from '@/lib/calculator-data';

interface CalculatorCardProps {
  calculator: Calculator;
}

const CalculatorCard = ({ calculator }: CalculatorCardProps) => {
  return (
    <div className="relative p-[1px] rounded-lg bg-gradient-to-r group hover:shadow-lg transition-all duration-300"
         style={{
           backgroundImage: `linear-gradient(to right, ${calculator.color.split(' ')[1]}, ${calculator.color.split(' ')[3]})`
         }}>
      <div className="h-full bg-gray-900 rounded-lg p-4 relative group-hover:bg-gray-800/95 transition-all duration-300">
        <div className="flex items-start space-x-3">
          <span className="text-2xl" role="img" aria-label={calculator.title}>
            {calculator.icon}
          </span>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">
              {calculator.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              {calculator.description}
            </p>
          </div>
        </div>
        <Link 
          href={`/${calculator.slug}`}
          className="block w-full bg-gray-800 hover:bg-gray-700 text-center py-2 rounded-md text-gray-200 transition-colors duration-200"
        >
          Open Calculator
        </Link>
      </div>
    </div>
  );
};

export default CalculatorCard;