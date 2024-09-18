'use client';

import React, { useState } from 'react';
import Algebrite from 'algebrite';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const PartialFractionDecompositionCalculator = () => {
  const [functionInput, setFunctionInput] = useState<string>('(2x^2 + 3x + 1)/(x^3 - x)');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const decompose = () => {
    setError('');
    setResult(null);

    try {
      // Use Algebrite to perform partial fraction decomposition
      const decomposition = Algebrite.run(`apart(${functionInput})`);

      if (decomposition) {
        setResult(decomposition.toString());
      } else {
        setError('Unable to perform partial fraction decomposition with the given input.');
      }
    } catch (err) {
      setError('There was an error parsing the expression. Please ensure it is a valid rational function.');
    }
  };

  const handleReset = () => {
    setFunctionInput('(2x^2 + 3x + 1)/(x^3 - x)');
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">
        Partial Fraction Decomposition Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Decompose Rational Functions</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Enter a rational function to perform partial fraction decomposition.
        </p>
      </section>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Function:</label>
          <input
            type="text"
            value={functionInput}
            onChange={(e) => setFunctionInput(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., (2x^2 + 3x + 1)/(x^3 - x)"
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex space-x-4">
          <button
            onClick={decompose}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Decompose
          </button>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Reset
          </button>
        </div>

        {result && (
          <div className="bg-indigo-50 p-6 rounded-lg mt-6 border border-indigo-200">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Decomposed Form</h3>
            <p className="text-lg text-gray-800">
              The partial fraction decomposition of your rational function is:
            </p>
            <p className="text-lg text-gray-800 font-mono mt-2">
              <BlockMath math={result} />
            </p>
          </div>
        )}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
          Understanding Partial Fraction Decomposition
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Partial fraction decomposition is a technique used to break down rational functions into a sum
          of simpler fractions. This is especially useful for integrating rational functions in calculus.
        </p>
        <h3 className="text-xl font-semibold mb-2">Example</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Consider the rational function:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <BlockMath math="\frac{2x^2 + 3x + 1}{x^3 - x}" />
        </div>
        <p className="text-lg text-gray-700 my-4 leading-relaxed">
          The partial fraction decomposition would be:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <BlockMath math="\frac{1}{x} + \frac{1}{x - 1} + \frac{2}{x + 1}" />
        </div>
        <p className="text-lg text-gray-700 my-4 leading-relaxed">
          Where the original rational function is expressed as a sum of simpler fractions.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Partial Fraction Decomposition Calculator. All rights reserved.</p>
        <p>Enhancing your mathematical understanding one calculation at a time 📈</p>
      </footer>
    </div>
  );
};

export default PartialFractionDecompositionCalculator;