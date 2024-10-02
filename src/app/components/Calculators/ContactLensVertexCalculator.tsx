'use client';

import React, { useState } from 'react';

export default function ContactLensVertexCalculator() {
  const [spherePower, setSpherePower] = useState('');
  const [vertexDistance, setVertexDistance] = useState(12); // Default eyeglass vertex distance in mm
  const [contactLensPower, setContactLensPower] = useState<number | null>(null);

  const calculateContactLensPower = () => {
    const sphere = parseFloat(spherePower);
    const vertex = vertexDistance / 1000; // Convert mm to meters

    if (isNaN(sphere)) {
      alert('Please enter a valid sphere power.');
      return;
    }

    // Apply the vertex formula for powers above +/-4.00D
    if (Math.abs(sphere) > 4) {
      const contactPower = sphere / (1 - vertex * sphere);
      setContactLensPower(Math.round(contactPower * 100) / 100); // Round to two decimal places
    } else {
      // For low powers, the difference is negligible
      setContactLensPower(sphere);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-md text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
        Contact Lens Vertex Calculator
      </h1>
      <p className="text-lg text-center mb-6">
        Easily adjust your eyeglass prescription for contact lenses.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Calculate Accurate Contact Lens Power</h2>
        <p className="text-base mb-4 leading-relaxed">
          Use our <strong>contact lens vertex calculator</strong> to convert your eyeglass
          prescription to the correct contact lens power. This tool ensures precise adjustment
          for optimal vision and comfort.
        </p>
      </section>

      <div className="space-y-6">
        <div>
          <label className="block mb-2">Sphere Power (D):</label>
          <input
            type="number"
            value={spherePower}
            onChange={(e) => setSpherePower(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g., -5.25"
            step="0.25"
          />
        </div>
        <div>
          <label className="block mb-2">Vertex Distance (mm):</label>
          <input
            type="number"
            value={vertexDistance}
            onChange={(e) => setVertexDistance(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
            min="10"
            max="15"
            step="0.5"
          />
          <p className="text-sm text-gray-500 mt-1">Typical values range from 10mm to 15mm.</p>
        </div>
        <button
          onClick={calculateContactLensPower}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
        >
          Calculate Contact Lens Power
        </button>

        {contactLensPower !== null && (
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Your Contact Lens Power:</h3>
            <p className="text-2xl font-bold text-center text-blue-700">
              {contactLensPower > 0 ? '+' : ''}
              {contactLensPower.toFixed(2)} D
            </p>
          </div>
        )}
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Why Vertex Conversion Matters</h2>
        <p className="text-base mb-4 leading-relaxed">
          The vertex distance is the space between the back of your eyeglass lens and your eye.
          When switching to contact lenses, which sit directly on the eye, adjustments are necessary—especially for prescriptions stronger than +/-4.00 diopters.
        </p>
        <h3 className="text-lg font-semibold mb-2">Key Points:</h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Accurate vertex conversion ensures optimal vision correction.</li>
          <li>Helps in selecting the correct contact lens power.</li>
          <li>Reduces the risk of over- or under-correction.</li>
        </ul>
        <p className="text-base mb-4 leading-relaxed">
          Our <strong>contact lens vertex calculator</strong> simplifies this process, providing you with the adjusted power needed for your contact lenses.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">How to Use the Calculator</h2>
        <ol className="list-decimal list-inside space-y-2 mb-4">
          <li>Enter your current eyeglass sphere power (in diopters).</li>
          <li>Input the vertex distance (default is 12mm if unknown).</li>
          <li>Click on "Calculate Contact Lens Power" to get your adjusted prescription.</li>
        </ol>
        <p className="text-base mb-4 leading-relaxed">
          Always consult with your eye care professional to confirm the final prescription.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>© 2024 Contact Lens Vertex Calculator. All rights reserved.</p>
        <p>Enhancing your vision with precise calculations.</p>
      </footer>
    </div>
  );
}
