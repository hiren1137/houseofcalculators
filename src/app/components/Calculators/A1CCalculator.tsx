'use client';

import React, { useState } from 'react';

type CalculationType = 'a1c' | 'glucose';

export default function A1CCalculator() {
  const [calculationType, setCalculationType] = useState<CalculationType>('a1c');
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult('Please enter a valid number');
      return;
    }

    if (calculationType === 'a1c') {
      const glucoseResult = (28.7 * value - 46.7).toFixed(0);
      setResult(`Estimated Average Glucose: ${glucoseResult} mg/dL`);
    } else {
      const a1cResult = ((value + 46.7) / 28.7).toFixed(1);
      setResult(`Estimated A1C: ${a1cResult}%`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gray-900 rounded-2xl shadow-2xl text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-400">A1C & Glucose Calculator</h1>
      
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-teal-400">Your Path to Better Health</h2>
        <p className="text-xl mb-4 leading-relaxed">
          Understanding your A1C and average glucose levels is a powerful step towards managing your health. This calculator helps you convert between A1C percentages and estimated average glucose levels, giving you valuable insights into your long-term blood sugar control.
        </p>
      </section>

      <div className="space-y-6">
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setCalculationType('a1c')}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-300 ${
              calculationType === 'a1c' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            Calculate from A1C
          </button>
          <button
            onClick={() => setCalculationType('glucose')}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-300 ${
              calculationType === 'glucose' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            Calculate from Glucose
          </button>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={calculationType === 'a1c' ? "Enter A1C percentage" : "Enter average glucose (mg/dL)"}
            className="w-full max-w-md p-3 bg-gray-800 rounded-lg text-white placeholder-gray-500 text-center text-lg"
          />
          <button
            onClick={calculate}
            className="w-full max-w-md bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-lg"
          >
            Calculate
          </button>
        </div>

        {result && (
          <div className="mt-8 p-6 bg-gray-800 rounded-lg text-center">
            <h3 className="text-2xl font-semibold mb-2 text-teal-400">Result:</h3>
            <p className="text-xl">{result}</p>
          </div>
        )}
      </div>

      <section className="mt-12 space-y-6">
        <h2 className="text-3xl font-semibold mb-4 text-teal-400">Understanding Your Results</h2>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-2 text-indigo-400">A1C Levels</h3>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Below 5.7%: Within the normal range</li>
            <li>5.7% to 6.4%: Prediabetes range</li>
            <li>6.5% or above: Diabetes range</li>
          </ul>
          <p className="mt-4 text-lg">Remember, these are general guidelines. Your target A1C may vary based on individual factors and your healthcare provider&apos;s recommendations.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-2 text-indigo-400">Tips for Improving Your Numbers</h3>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Maintain a balanced diet rich in whole foods</li>
            <li>Engage in regular physical activity</li>
            <li>Stay hydrated and manage stress levels</li>
            <li>Get adequate sleep and maintain a consistent sleep schedule</li>
            <li>Work closely with your healthcare team for personalized advice</li>
          </ul>
        </div>
      </section>

      <footer className="mt-12 text-center text-gray-400 text-lg">
        <p>© 2024 A1C & Glucose Calculator. Empowering your health journey.</p>
        <p className="mt-2">Remember: This calculator provides estimates. Always consult with your healthcare provider for medical advice.</p>
      </footer>
    </div>
  );
}