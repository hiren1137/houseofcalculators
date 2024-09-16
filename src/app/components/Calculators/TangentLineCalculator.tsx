'use client';

import React, { useState } from 'react';
import { evaluate, derivative } from 'mathjs';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend);

const TangentLineCalculator = () => {
  const [functionInput, setFunctionInput] = useState<string>('x^2');
  const [pointInput, setPointInput] = useState<string>('1');
  const [tangentLine, setTangentLine] = useState<string>('');
  const [error, setError] = useState<string>('');

  const calculateTangentLine = () => {
    try {
      const xValue = parseFloat(pointInput);
      if (isNaN(xValue)) {
        setError('Please enter a valid number for the point of tangency.');
        return;
      }

      // Evaluate the function at xValue
      const scope = { x: xValue };
      const yValue = evaluate(functionInput, scope);

      // Calculate derivative at xValue
      const derivativeFunction = derivative(functionInput, 'x').toString();
      const slope = evaluate(derivativeFunction, scope);

      // Equation of tangent line: y = m(x - x0) + y0
      const tangentLineEquation = `${slope} * (x - ${xValue}) + ${yValue}`;

      setTangentLine(tangentLineEquation);
      setError('');
    } catch (err) {
      setError('There was an error parsing the function. Please ensure it is valid.');
    }
  };

  const handleReset = () => {
    setFunctionInput('x^2');
    setPointInput('1');
    setTangentLine('');
    setError('');
  };

  // Prepare data for graph
  const generateGraphData = () => {
    if (!tangentLine) return null;

    const xValues = [];
    const yValues = [];
    const tangentYValues = [];

    for (let x = -10; x <= 10; x += 0.1) {
      xValues.push(x);
      try {
        yValues.push(evaluate(functionInput, { x }));
        tangentYValues.push(evaluate(tangentLine, { x }));
      } catch {
        yValues.push(null);
        tangentYValues.push(null);
      }
    }

    return {
      labels: xValues,
      datasets: [
        {
          label: 'Function',
          data: yValues,
          borderColor: 'blue',
          fill: false,
          tension: 0.1,
        },
        {
          label: 'Tangent Line',
          data: tangentYValues,
          borderColor: 'red',
          borderDash: [5, 5],
          fill: false,
          tension: 0.1,
        },
      ],
    };
  };

  const graphData = generateGraphData();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">Tangent Line Calculator</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Find the Equation of a Tangent Line</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Enter a function and a point to calculate the equation of the tangent line at that point.
        </p>
      </section>

      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Function, f(x):</label>
            <input
              type="text"
              value={functionInput}
              onChange={(e) => setFunctionInput(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., x^2"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Point of Tangency (x-value):</label>
            <input
              type="text"
              value={pointInput}
              onChange={(e) => setPointInput(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 1"
            />
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <div className="flex space-x-4">
            <button
              onClick={calculateTangentLine}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Calculate
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Reset
            </button>
          </div>
        </div>

        {tangentLine && (
          <div className="bg-indigo-50 p-6 rounded-lg mt-6 border border-indigo-200">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Tangent Line Equation</h3>
            <p className="text-lg text-gray-800">
              The equation of the tangent line at x = {pointInput} is:
            </p>
            <p className="text-lg text-gray-800 font-mono mt-2">y = {tangentLine}</p>
          </div>
        )}
      </div>

      {graphData && (
        <div className="mt-10" style={{ height: '400px' }}>
          <h3 className="text-2xl font-semibold mb-4 text-center text-indigo-600">Graph</h3>
          <Line
            data={graphData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  type: 'linear',
                  position: 'bottom',
                  title: {
                    display: true,
                    text: 'x',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'y',
                  },
                },
              },
            }}
          />
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Understanding Tangent Lines</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          A tangent line to a curve at a given point is a straight line that just touches the curve at that point. It has the same slope as the curve at that point and represents the instantaneous rate of change of the function.
        </p>
        <h3 className="text-xl font-semibold mb-2">Calculating the Tangent Line</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          To find the equation of the tangent line to the function f(x) at x = a:
        </p>
        <ol className="list-decimal list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>Compute f(a), the value of the function at x = a.</li>
          <li>Find f&#x27;(a), the derivative of the function evaluated at x = a. This is the slope of the tangent line.</li>
          <li>Use the point-slope form of a line: y - f(a) = f&#x27;(a)(x - a).</li>
        </ol>
        <h3 className="text-xl font-semibold mb-2">Applications of Tangent Lines</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Tangent lines are used in various fields such as physics for motion analysis, in economics for marginal analysis, and in engineering for approximations.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Tangent Line Calculator. All rights reserved.</p>
        <p>Enhancing your mathematical understanding one calculation at a time 📈</p>
      </footer>
    </div>
  );
};

export default TangentLineCalculator;