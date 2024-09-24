'use client';

import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const CircumferenceToDiameterCalculator = () => {
  const [circumference, setCircumference] = useState<string>('');
  const [diameter, setDiameter] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculateDiameter = () => {
    setError('');
    setDiameter(null);

    const circumferenceNum = parseFloat(circumference);

    if (isNaN(circumferenceNum) || circumferenceNum <= 0) {
      setError('Please enter a valid positive numerical value for the circumference.');
      return;
    }

    // Calculate the diameter using the formula D = C / π
    const diameterValue = (circumferenceNum / Math.PI).toFixed(4);
    setDiameter(parseFloat(diameterValue));
  };

  const handleReset = () => {
    setCircumference('');
    setDiameter(null);
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">
        Circumference to Diameter Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Convert Circumference to Diameter
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Enter the circumference of a circle to calculate its diameter using the formula{' '}
          <InlineMath math="D = \dfrac{C}{\pi}" />.
        </p>
      </section>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Circumference (C):</label>
          <input
            type="number"
            value={circumference}
            onChange={(e) => setCircumference(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., 31.4159"
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex space-x-4">
          <button
            onClick={calculateDiameter}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Calculate Diameter
          </button>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Reset
          </button>
        </div>

        {diameter !== null && (
          <div className="bg-indigo-50 p-6 rounded-lg mt-6 border border-indigo-200">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Result</h3>
            <p className="text-lg text-gray-800">The diameter of the circle is:</p>
            <p className="text-3xl text-gray-800 font-bold mt-2">{diameter}</p>
            <p className="text-lg text-gray-800 mt-2">
              (Using <InlineMath math="\pi \approx 3.1416" />)
            </p>
          </div>
        )}
      </div>

      {/* Content Below the Calculator */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-600">
          Understanding Circumference and Diameter
        </h2>

        <h3 className="text-xl font-semibold mb-4">What Is Circumference?</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The circumference of a circle is the distance around its edge or perimeter. It is a linear
          measurement representing the total length of the circle's boundary. The circumference is
          directly proportional to the diameter and can be calculated if the diameter or radius is
          known.
        </p>

        <h3 className="text-xl font-semibold mb-4">What Is Diameter?</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The diameter of a circle is a straight line passing through the center, connecting two
          points on the circumference. It is twice the length of the radius and represents the widest
          distance across the circle.
        </p>

        <h3 className="text-xl font-semibold mb-4">The Relationship Between Circumference and Diameter</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The circumference (<InlineMath math="C" />) and diameter (<InlineMath math="D" />) of a
          circle are related through the mathematical constant pi (<InlineMath math="\pi" />). The
          formula connecting them is:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <BlockMath math="C = \pi D" />
        </div>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          This formula shows that the circumference is equal to pi times the diameter.
        </p>

        <h3 className="text-xl font-semibold mb-4">How to Calculate Diameter from Circumference</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          To find the diameter when you know the circumference, you can rearrange the formula:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <BlockMath math="D = \dfrac{C}{\pi}" />
        </div>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          By dividing the circumference by pi, you obtain the diameter.
        </p>

        <h3 className="text-xl font-semibold mb-4">Example Calculation</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Let's calculate the diameter of a circle with a circumference of 50 units:
        </p>
        <ul className="list-decimal list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>
            <p>
              <strong>Step 1:</strong> Write down the formula: <InlineMath math="D = \dfrac{C}{\pi}" />
            </p>
          </li>
          <li>
            <p>
              <strong>Step 2:</strong> Substitute the known value: <InlineMath math="D = \dfrac{50}{\pi}" />
            </p>
          </li>
          <li>
            <p>
              <strong>Step 3:</strong> Calculate using <InlineMath math="\pi \approx 3.1416" />:
              <InlineMath math="D \approx \dfrac{50}{3.1416} \approx 15.9155" />
            </p>
          </li>
        </ul>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Therefore, the diameter is approximately 15.9155 units.
        </p>

        <h3 className="text-xl font-semibold mb-4">Practical Applications</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Understanding how to convert circumference to diameter is essential in various real-world
          scenarios:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>
            <strong>Engineering and Construction:</strong> Designing circular components like pipes, tanks, and tunnels.
          </li>
          <li>
            <strong>Manufacturing:</strong> Creating wheels, gears, and bearings with precise measurements.
          </li>
          <li>
            <strong>Architecture:</strong> Planning circular layouts for buildings, gardens, or fountains.
          </li>
          <li>
            <strong>Navigation:</strong> Calculating distances around circular paths or tracks.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-4">Common Units of Measurement</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Circumference and diameter can be measured in any unit of length, such as meters, feet,
          inches, or centimeters. It's important to use the same unit for both measurements to ensure
          accuracy.
        </p>

        <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>

        <h4 className="text-lg font-semibold mb-2">
          1. What is pi (<InlineMath math="\pi" />)?
        </h4>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Pi is an irrational mathematical constant approximately equal to 3.1416. It represents the
          ratio of a circle's circumference to its diameter and is constant for all circles.
        </p>

        <h4 className="text-lg font-semibold mb-2">
          2. Can I calculate the radius from the circumference?
        </h4>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Yes. First, calculate the diameter using <InlineMath math="D = \dfrac{C}{\pi}" />, then
          divide the diameter by 2 to get the radius (<InlineMath math="R = \dfrac{D}{2}" />).
        </p>

        <h4 className="text-lg font-semibold mb-2">
          3. Why is understanding circumference and diameter important?
        </h4>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          These measurements are fundamental in geometry and are widely used in science, engineering,
          construction, and various fields that involve circular shapes and motions.
        </p>

        <h3 className="text-xl font-semibold mb-4">Conclusion</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The relationship between circumference and diameter is a foundational concept in geometry.
          By understanding and utilizing the formula <InlineMath math="D = \dfrac{C}{\pi}" />, you
          can easily convert between these two measurements. This calculator simplifies the process,
          allowing for quick and accurate calculations.
        </p>

        <h3 className="text-xl font-semibold mb-4">Try It Yourself</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Use the calculator above to convert different circumference values to diameters. Experiment
          with various units and see how the diameter changes with the circumference. This hands-on
          approach reinforces your understanding of circle geometry.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Circumference to Diameter Calculator. All rights reserved.</p>
        <p>Making circle calculations simple and accessible ⭕</p>
      </footer>
    </div>
  );
};

export default CircumferenceToDiameterCalculator;