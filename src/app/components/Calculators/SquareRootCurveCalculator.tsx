'use client';

import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

const SquareRootCurveCalculator = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [maxValue, setMaxValue] = useState<string>('');
  const [adjustedValue, setAdjustedValue] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculateAdjustedValue = () => {
    setError('');
    setAdjustedValue(null);

    const inputNum = parseFloat(inputValue);
    const maxNum = parseFloat(maxValue);

    if (
      [inputNum, maxNum].some((val) => isNaN(val)) ||
      inputNum < 0 ||
      maxNum <= 0 ||
      inputNum > maxNum
    ) {
      setError('Please enter valid numerical values. Input value must be between 0 and the maximum value.');
      return;
    }

    // Apply the square root curve formula
    const adjusted = (Math.sqrt(inputNum / maxNum) * maxNum).toFixed(2);
    setAdjustedValue(parseFloat(adjusted));
  };

  const handleReset = () => {
    setInputValue('');
    setMaxValue('');
    setAdjustedValue(null);
    setError('');
  };

  // Generate data for the graph in the content
  const generateGraphData = () => {
    const maxNum = parseFloat(maxValue) || 100; // Default to 100 if maxValue is not set

    const inputValues = [];
    const adjustedValues = [];

    for (let input = 0; input <= maxNum; input += maxNum / 100) {
      const adjusted = Math.sqrt(input / maxNum) * maxNum;
      inputValues.push(input);
      adjustedValues.push(adjusted);
    }

    return {
      labels: inputValues,
      datasets: [
        {
          label: 'Adjusted Value',
          data: adjustedValues,
          borderColor: 'rgba(75,192,192,1)',
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.2)',
          tension: 0.1,
        },
      ],
    };
  };

  const graphData = generateGraphData();

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">
        Square Root Curve Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Calculate Adjusted Values Using the Square Root Curve
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Enter the input value and the maximum possible value to calculate the adjusted value using the square root curve formula.
        </p>
      </section>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Input Value:</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 75"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Maximum Value:</label>
            <input
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 100"
            />
          </div>
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex space-x-4">
          <button
            onClick={calculateAdjustedValue}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Calculate Adjusted Value
          </button>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Reset
          </button>
        </div>

        {adjustedValue !== null && (
          <div className="bg-indigo-50 p-6 rounded-lg mt-6 border border-indigo-200">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Adjusted Value</h3>
            <p className="text-lg text-gray-800">
              The adjusted value is:
            </p>
            <p className="text-3xl text-gray-800 font-bold mt-2">
              {adjustedValue} / {maxValue || 100}
            </p>
          </div>
        )}
      </div>

      {/* Content Below the Calculator */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
          Understanding the Square Root Curve
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The square root curve is a mathematical function that transforms input values using the square root operation. This method applies a square root transformation to the input values, effectively adjusting them in a way that boosts lower values more than higher ones.
        </p>

        <h3 className="text-xl font-semibold mb-2">The Square Root Curve Formula</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The formula used to calculate the adjusted value is:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <BlockMath math="Adjusted\ Value = \sqrt{\dfrac{Input\ Value}{Maximum\ Value}} \times Maximum\ Value" />
        </div>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          This formula ensures that the adjusted value is scaled appropriately between 0 and the maximum value.
        </p>

        <h3 className="text-xl font-semibold mb-2">Impact of the Square Root Curve</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The square root curve increases lower values more significantly than higher values, compressing the range and bringing averages up. Here's how different input values are adjusted:
        </p>
        <div className="overflow-auto">
          <table className="w-full text-left border-collapse mb-4">
            <thead>
              <tr>
                <th className="border-b-2 p-2 font-semibold">Input Value</th>
                <th className="border-b-2 p-2 font-semibold">Adjusted Value</th>
                <th className="border-b-2 p-2 font-semibold">Percentage Increase</th>
              </tr>
            </thead>
            <tbody>
              {[0, 25, 49, 64, 81, 100].map((input) => {
                const adjusted = Math.sqrt(input / 100) * 100;
                const increase = adjusted - input;
                return (
                  <tr key={input}>
                    <td className="border-b p-2">{input}</td>
                    <td className="border-b p-2">{adjusted.toFixed(2)}</td>
                    <td className="border-b p-2">{increase.toFixed(2)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          As you can see, an input value of 49 increases to approximately 70 after adjustment, while an input value of 81 increases to approximately 90. The higher the input value, the smaller the percentage increase.
        </p>

        <h3 className="text-xl font-semibold mb-2">Visual Representation</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The relationship between input values and adjusted values can be visualized with a curve that shows the square root function's effect:
        </p>
        <div className="w-full h-64 mb-4">
          <Line
            data={graphData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  type: 'linear',
                  title: {
                    display: true,
                    text: 'Input Value',
                  },
                  ticks: {
                    stepSize: maxValue ? parseFloat(maxValue) / 10 : 10,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Adjusted Value',
                  },
                  ticks: {
                    stepSize: maxValue ? parseFloat(maxValue) / 10 : 10,
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The graph illustrates how the curve boosts lower values more than higher values, leading to a fairer distribution in various assessments.
        </p>

        <h3 className="text-xl font-semibold mb-2">Example Calculation</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Suppose you have an input value of 36 out of a maximum value of 100. Using the square root curve:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <BlockMath math="Adjusted\ Value = \sqrt{\dfrac{36}{100}} \times 100 = \sqrt{0.36} \times 100 = 0.6 \times 100 = 60" />
        </div>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The adjusted value becomes 60 out of 100, reflecting a significant increase.
        </p>

        <h3 className="text-xl font-semibold mb-2">Try It Yourself</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Use the calculator above to adjust values using the square root curve. Simply input the value and the maximum possible value to see the adjusted result.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Square Root Curve Calculator. All rights reserved.</p>
        <p>Transforming values with mathematical precision 📈</p>
      </footer>
    </div>
  );
};

export default SquareRootCurveCalculator;