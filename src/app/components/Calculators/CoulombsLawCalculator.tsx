'use client';

import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const CoulombsLawCalculator: React.FC = () => {
  const [charge1Value, setCharge1Value] = useState<string>('');
  const [charge1Unit, setCharge1Unit] = useState<string>('C');
  const [charge2Value, setCharge2Value] = useState<string>('');
  const [charge2Unit, setCharge2Unit] = useState<string>('C');
  const [distanceValue, setDistanceValue] = useState<string>('');
  const [distanceUnit, setDistanceUnit] = useState<string>('m');
  const [force, setForce] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  // Define unit options with conversion factors to base units
  const chargeUnits = [
    { label: 'Coulombs (C)', value: 'C', factor: 1 },
    { label: 'Microcoulombs (μC)', value: 'μC', factor: 1e-6 },
    { label: 'Nanocoulombs (nC)', value: 'nC', factor: 1e-9 },
    { label: 'Millicoulombs (mC)', value: 'mC', factor: 1e-3 },
  ];

  const distanceUnits = [
    { label: 'Meters (m)', value: 'm', factor: 1 },
    { label: 'Kilometers (km)', value: 'km', factor: 1000 },
    { label: 'Centimeters (cm)', value: 'cm', factor: 0.01 },
    { label: 'Millimeters (mm)', value: 'mm', factor: 0.001 },
  ];

  // Handlers for input changes
  const handleCharge1ValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharge1Value(e.target.value);
  };

  const handleCharge1UnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCharge1Unit(e.target.value);
  };

  const handleCharge2ValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharge2Value(e.target.value);
  };

  const handleCharge2UnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCharge2Unit(e.target.value);
  };

  const handleDistanceValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistanceValue(e.target.value);
  };

  const handleDistanceUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDistanceUnit(e.target.value);
  };

  // Function to perform the calculation
  const calculateForce = () => {
    setError('');
    setForce(null);

    // Retrieve conversion factors
    const q1Factor = chargeUnits.find(unit => unit.value === charge1Unit)?.factor || 1;
    const q2Factor = chargeUnits.find(unit => unit.value === charge2Unit)?.factor || 1;
    const rFactor = distanceUnits.find(unit => unit.value === distanceUnit)?.factor || 1;

    // Convert inputs to base units
    const q1 = parseFloat(charge1Value) * q1Factor;
    const q2 = parseFloat(charge2Value) * q2Factor;
    const r = parseFloat(distanceValue) * rFactor;

    // Validate inputs
    if (isNaN(q1) || isNaN(q2) || isNaN(r)) {
      setError('Please enter valid numerical values for all inputs.');
      return;
    }

    if (r === 0) {
      setError('Distance cannot be zero.');
      return;
    }

    // Coulomb's constant (N·m²/C²)
    const k = 8.988e9;

    // Calculate electric force using Coulomb's Law: F = k * |q1 * q2| / r²
    const F = (k * Math.abs(q1 * q2)) / (r * r);

    // Format the force in scientific notation with appropriate precision
    const formattedForce = F.toExponential(9); // 9 decimal places

    setForce(formattedForce);
  };

  // Function to reset the calculator
  const handleReset = () => {
    setCharge1Value('');
    setCharge1Unit('C');
    setCharge2Value('');
    setCharge2Unit('C');
    setDistanceValue('');
    setDistanceUnit('m');
    setForce(null);
    setError('');
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
        Coulomb's Law Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Calculate Electric Force Between Charges
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Enter the values of the two charges and the distance between them to calculate the electric force using Coulomb's Law.
        </p>
      </section>

      <div className="space-y-6">
        {/* Input Fields with Unit Selection */}
        <div className="space-y-6">
          {/* Charge 1 */}
          <div className="flex flex-col">
            <label className="block mb-1 font-semibold text-gray-700">Charge 1:</label>
            <input
              type="number"
              name="charge1"
              value={charge1Value}
              onChange={handleCharge1ValueChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 1e-6"
            />
            <select
              value={charge1Unit}
              onChange={handleCharge1UnitChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {chargeUnits.map(unit => (
                <option key={unit.value} value={unit.value}>{unit.label}</option>
              ))}
            </select>
          </div>

          {/* Charge 2 */}
          <div className="flex flex-col">
            <label className="block mb-1 font-semibold text-gray-700">Charge 2:</label>
            <input
              type="number"
              name="charge2"
              value={charge2Value}
              onChange={handleCharge2ValueChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., -2e-6"
            />
            <select
              value={charge2Unit}
              onChange={handleCharge2UnitChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {chargeUnits.map(unit => (
                <option key={unit.value} value={unit.value}>{unit.label}</option>
              ))}
            </select>
          </div>

          {/* Distance */}
          <div className="flex flex-col">
            <label className="block mb-1 font-semibold text-gray-700">Distance:</label>
            <input
              type="number"
              name="distance"
              value={distanceValue}
              onChange={handleDistanceValueChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 0.05"
            />
            <select
              value={distanceUnit}
              onChange={handleDistanceUnitChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {distanceUnits.map(unit => (
                <option key={unit.value} value={unit.value}>{unit.label}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={calculateForce}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Calculate
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Reset
          </button>
        </div>

        {/* Results */}
        {force !== null && (
          <div className="bg-blue-50 p-6 rounded-lg mt-6 border border-blue-200">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600 text-center">Results</h3>
            <p className="text-lg text-gray-800 mb-2 text-center">
              <InlineMath math={`\\text{Electric Force (F)} = ${force} \, \\text{N}`} />
            </p>
          </div>
        )}
      </div>

      {/* Content Below the Calculator */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-blue-600 text-center">
          Understanding Coulomb's Law
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Introduction</h3>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Coulomb's Law describes the electrostatic interaction between electrically charged particles. It quantifies the amount of force between two stationary, electrically charged particles.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Coulomb's Law Formula</h3>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              The magnitude of the electric force (F) between two point charges is directly proportional to the product of the magnitudes of the charges and inversely proportional to the square of the distance between them. The formula is given by:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
              <BlockMath math="F = k \cdot \frac{|q_1 \cdot q_2|}{r^2}" />
            </div>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Where:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
              <li><strong>F</strong> is the magnitude of the electric force between the charges.</li>
              <li><strong>k</strong> is Coulomb's constant, approximately <InlineMath math="8.988 \times 10^9 \, \text{N} \cdot \text{m}^2/\text{C}^2" />.</li>
              <li><strong>q₁</strong> and <strong>q₂</strong> are the amounts of the charges.</li>
              <li><strong>r</strong> is the distance between the centers of the two charges.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Example Calculation</h3>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Let's calculate the electric force between two charges:
            </p>
            <ul className="list-decimal list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
              <li>
                <strong>Given:</strong>
                <p>
                  <InlineMath math="q_1 = 4 \, \text{C}" />, <InlineMath math="q_2 = 4 \, \text{C}" />, and <InlineMath math="r = 4 \, \text{m}" />.
                </p>
              </li>
              <li>
                <strong>Apply Coulomb's Law:</strong>
                <p>
                  <InlineMath math="F = 8.988 \times 10^9 \cdot \frac{|4 \cdot 4|}{4^2}" />
                </p>
              </li>
              <li>
                <strong>Calculate:</strong>
                <p>
                  <InlineMath math="F = 8.988 \times 10^9 \cdot \frac{16}{16}" />  
                  <InlineMath math="F = 8.988 \times 10^9 \, \text{N}" />
                </p>
              </li>
            </ul>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Therefore, the electric force between the two charges is approximately <InlineMath math="8.988 \times 10^9 \, \text{N}" />.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Applications of Coulomb's Law</h3>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Coulomb's Law is fundamental in understanding electrostatic interactions and is widely used in various fields, including:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
              <li>Physics and Engineering</li>
              <li>Chemistry and Molecular Biology</li>
              <li>Electrical Engineering and Electronics</li>
              <li>Material Science and Nanotechnology</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>

            <h4 className="text-lg font-semibold mb-2">
              1. What is Coulomb's Law used for?
            </h4>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Coulomb's Law is used to calculate the electric force between two charged particles. It is essential for understanding electrostatic interactions in various scientific and engineering applications.
            </p>

            <h4 className="text-lg font-semibold mb-2">
              2. How does distance affect the electric force between charges?
            </h4>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              According to Coulomb's Law, the electric force between two charges is inversely proportional to the square of the distance between them. This means that as the distance increases, the force decreases rapidly.
            </p>

            <h4 className="text-lg font-semibold mb-2">
              3. Can Coulomb's Law be used for charges in motion?
            </h4>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Coulomb's Law applies to stationary charges. For charges in motion, electromagnetic forces become more complex and are described by the full set of Maxwell's equations.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Conclusion</h3>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Coulomb's Law is a cornerstone in the study of electrostatics, providing a quantitative measure of the electric force between charged particles. Understanding and applying this law is essential for advancements in physics, engineering, and various technological fields.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Try It Yourself</h3>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Use the calculator above to compute the electric force between different sets of charges. Input various charge values and distances to see how the electric force changes, enhancing your understanding of electrostatic interactions.
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Coulomb's Law Calculator. All rights reserved.</p>
        <p>Empowering your electrostatic calculations ⚡</p>
      </footer>
    </div>
  );
};

export default CoulombsLawCalculator;