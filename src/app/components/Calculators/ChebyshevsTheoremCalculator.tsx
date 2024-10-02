'use client';

import React, { useState } from 'react';

export default function ChebyshevsTheoremCalculator() {
  const [kValue, setKValue] = useState('');
  const [probability, setProbability] = useState<number | null>(null);

  const calculateProbability = () => {
    const k = parseFloat(kValue);

    if (isNaN(k) || k <= 1) {
      alert('Please enter a valid k-value greater than 1.');
      return;
    }

    // Chebyshev's Theorem Formula: P(|X - μ| < kσ) ≥ 1 - 1 / k²
    const prob = 1 - 1 / (k * k);
    setProbability(Math.round(prob * 10000) / 100); // Round to two decimal places
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-md text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-center text-purple-600">
        Chebyshev&apos;s Theorem Calculator
      </h1>
      <p className="text-lg text-center mb-6">
        Determine the minimum probability within k standard deviations.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Calculate Probability Using Chebyshev&apos;s Theorem
        </h2>
        <p className="text-base mb-4 leading-relaxed">
          Use our <strong>Chebyshev&apos;s Theorem Calculator</strong> to find the minimum probability that a data point lies within a specified number of standard deviations from the mean. This tool is essential for understanding statistical distributions and variability.
        </p>
      </section>

      <div className="space-y-6">
        <div>
          <label className="block mb-2">Enter k-value (k &gt; 1):</label>
          <input
            type="number"
            value={kValue}
            onChange={(e) => setKValue(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g., 2"
            step="0.01"
            min="1.01"
          />
        </div>
        <button
          onClick={calculateProbability}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
        >
          Calculate Probability
        </button>

        {probability !== null && (
          <div className="mt-4 p-4 bg-purple-50 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Minimum Probability:</h3>
            <p className="text-2xl font-bold text-center text-purple-700">
              {probability}% 
            </p>
            <p className="text-base mt-2 leading-relaxed">
              According to <strong>Chebyshev&apos;s Theorem</strong>, at least {probability}% of the data lies within &plusmn;{kValue} standard deviations from the mean.
            </p>
          </div>
        )}
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Understanding Chebyshev&apos;s Theorem</h2>
        <p className="text-base mb-4 leading-relaxed">
          Chebyshev&apos;s Theorem is a fundamental concept in statistics that provides a minimum probability for a random variable lying within a certain number of standard deviations from the mean, regardless of the distribution&apos;s shape.
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Chebyshev&apos;s Theorem Formula:</h3>
          <p className="text-base leading-relaxed">
            The theorem states that for any real number <em>k</em> &gt; 1:
          </p>
          <p className="text-xl font-bold text-center my-4">
            P(|X - μ| &lt; kσ) ≥ 1 - (1 / k²)
          </p>
          <p className="text-base leading-relaxed">
            Where:
            <ul className="list-disc list-inside mt-2">
              <li><strong>P</strong> = Probability</li>
              <li><strong>X</strong> = Random variable</li>
              <li><strong>μ</strong> = Mean of the distribution</li>
              <li><strong>σ</strong> = Standard deviation</li>
              <li><strong>k</strong> = Number of standard deviations from the mean (k &gt; 1)</li>
            </ul>
          </p>
        </div>
        <h3 className="text-lg font-semibold mb-2 mt-8">Key Points:</h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Applies to all distributions with a finite mean and variance.</li>
          <li>Helps in understanding the spread and dispersion of data.</li>
          <li>Useful when the distribution type is unknown.</li>
        </ul>
        <p className="text-base mb-4 leading-relaxed">
          Our <strong>Chebyshev&apos;s Theorem Calculator</strong> simplifies this process, providing quick and accurate results for your statistical analysis.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">How to Use the Calculator</h2>
        <ol className="list-decimal list-inside space-y-2 mb-4">
          <li>Enter the k-value (number of standard deviations) greater than 1.</li>
          <li>Click on &quot;Calculate Probability&quot; to compute the minimum probability.</li>
          <li>Use the result to interpret your statistical data.</li>
        </ol>
        <p className="text-base mb-4 leading-relaxed">
          Remember, Chebyshev&apos;s Theorem provides a conservative estimate; actual probabilities may be higher depending on the data distribution.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>© 2024 Chebyshev&apos;s Theorem Calculator. All rights reserved.</p>
        <p>Empowering your statistical computations.</p>
      </footer>
    </div>
  );
}
