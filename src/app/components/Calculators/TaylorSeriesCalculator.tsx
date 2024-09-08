'use client';

import React, { useState } from 'react';
import { evaluate, derivative, parse } from 'mathjs';

export default function TaylorSeriesCalculator() {
  const [function_, setFunction] = useState('sin(x)');
  const [variable, setVariable] = useState('x');
  const [point, setPoint] = useState('0');
  const [order, setOrder] = useState('5');
  const [result, setResult] = useState<string | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '0' || value.match(/^0\./)) {
      setter(value);
    } else {
      setter(value.replace(/^0+/, ''));
    }
  };

  const calculateTaylorSeries = () => {
    try {
      let series = '';
      const parsedFunction = parse(function_);
      const centerValue = point === 'pi' ? Math.PI : parseFloat(point);

      for (let n = 0; n <= parseInt(order); n++) {
        let term = parsedFunction;
        for (let i = 0; i < n; i++) {
          term = derivative(term, variable);
        }
        const coefficient = evaluate(term.toString(), { [variable]: centerValue }) / factorial(n);
        if (Math.abs(coefficient) > 1e-10) { // Ignore very small coefficients
          if (series !== '') series += ' + ';
          if (n === 0) {
            series += coefficient.toFixed(4);
          } else if (n === 1) {
            series += `${coefficient === 1 ? '' : (coefficient === -1 ? '-' : coefficient.toFixed(4) + '*')}${variable}`;
          } else {
            const coefStr = coefficient === 1 ? '' : (coefficient === -1 ? '-' : (coefficient === -1/factorial(n) ? '-1/' : (coefficient === 1/factorial(n) ? '1/' : coefficient.toFixed(4) + '/')));
            series += `${coefStr}${factorial(n)}*${variable}^${n}`;
          }
        }
      }

      setResult(series);
    } catch (error) {
      setResult('Error: Invalid function or parameters');
    }
  };

  const factorial = (n: number): number => {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-green-900 to-teal-900 rounded-2xl shadow-2xl text-white">
      <h1 className="text-4xl font-bold mb-2 text-center text-green-300">Taylor Series Calculator</h1>
      <p className="text-xl text-center mb-6 text-gray-300">Approximate Functions with Polynomial Series</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-green-200 mb-2">Enter function (Write exp() as exponential function):</label>
          <input
            type="text"
            value={function_}
            onChange={handleInputChange(setFunction)}
            className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
            placeholder="e.g., sin(x)"
          />
        </div>
        <div>
          <label className="block text-green-200 mb-2">Enter variable:</label>
          <input
            type="text"
            value={variable}
            onChange={handleInputChange(setVariable)}
            className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-green-200 mb-2">Enter point (write pi for π):</label>
          <input
            type="text"
            value={point}
            onChange={handleInputChange(setPoint)}
            className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-green-200 mb-2">Enter order:</label>
          <input
            type="text"
            value={order}
            onChange={handleInputChange(setOrder)}
            className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
          />
        </div>
        <button
          onClick={calculateTaylorSeries}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Calculate Taylor Series
        </button>
        
        {result && (
          <div className="mt-4 p-4 bg-white bg-opacity-10 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-green-200">Taylor Series:</h3>
            <p className="text-lg break-words">{result}</p>
          </div>
        )}
      </div>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-4 text-green-200">Understanding Taylor Series</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          A Taylor series is a representation of a function as an infinite sum of terms calculated from the values of its derivatives at a single point. It&apos;s a powerful tool in mathematical analysis, allowing us to approximate complex functions with polynomials.
        </p>
        <h3 className="text-2xl font-semibold mb-2 text-green-200">Taylor Series Formula:</h3>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg mb-4">
          <p className="text-lg text-gray-200 mb-2">f(x) = f(a) + f&apos;(a)(x-a) + f&apos;&apos;(a)(x-a)²/2! + f&apos;&apos;&apos;(a)(x-a)³/3! + ...</p>
          <p className="text-lg text-gray-200">= Σ (f⁽ⁿ⁾(a) * (x-a)ⁿ / n!) from n=0 to ∞</p>
          <p className="text-sm text-gray-300 mt-2">Where &apos;a&apos; is the center point and f⁽ⁿ⁾(a) is the nth derivative of f at point a.</p>
        </div>
        <h3 className="text-2xl font-semibold mb-2 text-green-200">Key Concepts:</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
          <li>Center point: The point around which the series is expanded</li>
          <li>Order: The highest power in the polynomial approximation</li>
          <li>Remainder: The difference between the true function value and the approximation</li>
        </ul>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Our calculator uses the general form of the Taylor series to compute the expansion up to the specified number of terms.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-semibold mb-4 text-green-200">Applications of Taylor Series</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Taylor series have numerous applications in mathematics and physics:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
          <li>Approximating complex functions</li>
          <li>Solving differential equations</li>
          <li>Numerical analysis and computer algorithms</li>
          <li>Error estimation in calculations</li>
          <li>Physics simulations and modeling</li>
        </ul>
      </section>

      <footer className="mt-12 text-center text-gray-400 text-lg">
        <p>© 2024 Taylor Series Calculator. All rights reserved.</p>
        <p>Expanding functions, one term at a time 📈</p>
      </footer>
    </div>
  );
}