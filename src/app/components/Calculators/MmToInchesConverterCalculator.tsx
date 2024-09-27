'use client';

import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const MmToInchesConverterCalculator: React.FC = () => {
  const [mm, setMm] = useState<string>('');
  const [inches, setInches] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  // Function to handle input changes with proper typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMm(e.target.value);
  };

  // Function to perform the conversion
  const calculateInches = () => {
    setError('');
    setInches(null);

    const mmValue = parseFloat(mm);

    // Validate input
    if (isNaN(mmValue)) {
      setError('Please enter a valid numerical value for millimeters.');
      return;
    }

    // Conversion formula: inches = mm / 25.4
    const convertedInches = mmValue / 25.4;

    setInches(convertedInches);
  };

  // Function to reset the calculator
  const handleReset = () => {
    setMm('');
    setInches(null);
    setError('');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-red-600">
        xncxx mm to Inches Converter Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Convert Millimeters to Inches
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Enter the length in millimeters to convert it to inches accurately.
        </p>
      </section>

      <div className="space-y-6">
        {/* Simplified Single Column Input Fields */}
        <div className="flex flex-col space-y-4">
          {/* Millimeters Input */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Millimeters (mm):</label>
            <input
              type="number"
              name="mm"
              value={mm}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="e.g., 25.4"
            />
          </div>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <div className="flex space-x-4">
          <button
            onClick={calculateInches}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Convert
          </button>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Reset
          </button>
        </div>

        {inches !== null && (
          <div className="bg-red-50 p-6 rounded-lg mt-6 border border-red-200">
            <h3 className="text-2xl font-semibold mb-4 text-red-600">Results</h3>
            <p className="text-lg text-gray-800 mb-2">
              <InlineMath math={`\\text{Inches (in)} = ${inches.toFixed(4)}`} />
            </p>
          </div>
        )}
      </div>

      {/* Content Below the Calculator */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-red-600">
          Understanding Millimeters to Inches Conversion
        </h2>

        <h3 className="text-xl font-semibold mb-4">Introduction</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The millimeter (mm) and inch (in) are units of length commonly used in different regions and industries. Converting between these units is essential for engineers, designers, and hobbyists working on projects that require precise measurements.
        </p>

        <h3 className="text-xl font-semibold mb-4">Conversion Formula</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          To convert millimeters to inches, use the following formula:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <BlockMath math="\text{Inches} = \frac{\text{Millimeters}}{25.4}" />
        </div>

        <h3 className="text-xl font-semibold mb-4">Example Calculation</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Let's convert <InlineMath math="25.4 \text{ mm}" /> to inches.
        </p>
        <ul className="list-decimal list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>
            <strong>Step 1:</strong> Identify the millimeter value.
            <p>
              <InlineMath math="25.4 \text{ mm}" />
            </p>
          </li>
          <li>
            <strong>Step 2:</strong> Apply the conversion formula.
            <p>
              <InlineMath math="\text{Inches} = \frac{25.4}{25.4} = 1 \text{ inch}" />
            </p>
          </li>
        </ul>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Therefore, <InlineMath math="25.4 \text{ mm} = 1 \text{ inch}" />.
        </p>

        <h3 className="text-xl font-semibold mb-4">Applications of mm to Inches Conversion</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Converting millimeters to inches is crucial in various fields, including:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>Engineering and Manufacturing</li>
          <li>Architecture and Design</li>
          <li>Crafts and DIY Projects</li>
          <li>Science and Research</li>
        </ul>

        <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>

        <h4 className="text-lg font-semibold mb-2">
          1. Why are millimeters and inches both used?
        </h4>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Millimeters are part of the metric system, widely used internationally for their simplicity and ease of calculation. Inches are part of the imperial system, commonly used in the United States and some other countries. Both units are prevalent in various industries and applications.
        </p>

        <h4 className="text-lg font-semibold mb-2">
          2. How accurate is the mm to inches conversion?
        </h4>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The conversion from millimeters to inches is exact when using the formula <InlineMath math="1 \text{ inch} = 25.4 \text{ mm}" />. However, rounding may introduce slight inaccuracies, so it's essential to maintain sufficient decimal places for precision in critical applications.
        </p>

        <h4 className="text-lg font-semibold mb-2">
          3. Can I convert inches to millimeters using the same calculator?
        </h4>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Currently, the calculator is designed for converting millimeters to inches. To convert inches to millimeters, you can manually apply the reverse formula: <InlineMath math="\text{Millimeters} = \text{Inches} \times 25.4" />.
        </p>

        <h3 className="text-xl font-semibold mb-4">Conclusion</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The xncxx mm to Inches Converter Calculator is a valuable tool for anyone needing quick and accurate length conversions. Whether you're working on engineering projects, designing, or engaging in crafts, this calculator simplifies the process, ensuring precise measurements every time.
        </p>

        <h3 className="text-xl font-semibold mb-4">Try It Yourself</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Use the calculator above to convert various lengths from millimeters to inches. Enter different values to see how millimeters translate into inches, enhancing your understanding of these essential units of measurement.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} xncxx mm to Inches Converter Calculator. All rights reserved.</p>
        <p>Empowering your length conversions 📏</p>
      </footer>
    </div>
  );
};

export default MmToInchesConverterCalculator;