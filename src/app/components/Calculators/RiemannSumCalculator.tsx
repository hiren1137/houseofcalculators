'use client';

import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import { Chart as ChartJSComponent } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  PointElement,
  LineElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  LineController,
  BarController,
} from 'chart.js';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

ChartJS.register(
  LineController,
  BarController,
  BarElement,
  PointElement,
  LineElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const RiemannSumCalculator = () => {
  const [functionInput, setFunctionInput] = useState<string>('x^2');
  const [intervalStart, setIntervalStart] = useState<string>('0');
  const [intervalEnd, setIntervalEnd] = useState<string>('1');
  const [numSubintervals, setNumSubintervals] = useState<string>('4');
  const [method, setMethod] = useState<string>('left');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculateRiemannSum = () => {
    setError('');
    setResult(null);

    const a = parseFloat(intervalStart);
    const b = parseFloat(intervalEnd);
    const n = parseInt(numSubintervals);

    if (isNaN(a) || isNaN(b) || isNaN(n) || n <= 0) {
      setError('Please enter valid numerical values for the interval and number of subintervals.');
      return;
    }

    if (a >= b) {
      setError('The start of the interval must be less than the end.');
      return;
    }

    let deltaX = (b - a) / n;
    let sum = 0;

    try {
      for (let i = 0; i < n; i++) {
        let x = 0;
        if (method === 'left') {
          x = a + i * deltaX;
        } else if (method === 'right') {
          x = a + (i + 1) * deltaX;
        } else if (method === 'midpoint') {
          x = a + (i + 0.5) * deltaX;
        } else if (method === 'trapezoidal') {
          x = a + i * deltaX;
        }

        let fx = evaluate(functionInput, { x });
        if (method === 'trapezoidal') {
          let xNext = x + deltaX;
          let fxNext = evaluate(functionInput, { x: xNext });
          sum += ((fx + fxNext) / 2) * deltaX;
        } else {
          sum += fx * deltaX;
        }
      }

      setResult(sum);
    } catch (err) {
      setError('There was an error evaluating the function. Please ensure it is valid.');
      return;
    }
  };

  const handleReset = () => {
    setFunctionInput('x^2');
    setIntervalStart('0');
    setIntervalEnd('1');
    setNumSubintervals('4');
    setMethod('left');
    setResult(null);
    setError('');
  };

  // Prepare data for graph
  const generateGraphData = () => {
    if (result === null) return null;

    const a = parseFloat(intervalStart);
    const b = parseFloat(intervalEnd);
    const n = parseInt(numSubintervals);
    const deltaX = (b - a) / n;

    let xGraphValues: number[] = [];
    let yGraphValues: number[] = [];

    // Generate function graph data
    for (let x = a; x <= b; x += (b - a) / 100) {
      try {
        xGraphValues.push(x);
        yGraphValues.push(evaluate(functionInput, { x }));
      } catch {
        xGraphValues.push(x);
        yGraphValues.push(NaN);
      }
    }

    // Generate rectangles/trapezoids data
    let rectData: { x: number; y: number }[] = [];

    for (let i = 0; i < n; i++) {
      let x0 = a + i * deltaX;
      let x1 = x0 + deltaX;
      let y0, y1;

      if (method === 'left') {
        y0 = evaluate(functionInput, { x: x0 });
        y1 = y0;
      } else if (method === 'right') {
        y1 = evaluate(functionInput, { x: x1 });
        y0 = y1;
      } else if (method === 'midpoint') {
        let xMid = x0 + deltaX / 2;
        y0 = evaluate(functionInput, { x: xMid });
        y1 = y0;
      } else if (method === 'trapezoidal') {
        y0 = evaluate(functionInput, { x: x0 });
        y1 = evaluate(functionInput, { x: x1 });
      }

      rectData.push({ x: x0, y: y0 });
      rectData.push({ x: x1, y: y1 });
    }

    return {
      datasets: [
        {
          type: 'line' as const,
          label: 'Function',
          data: xGraphValues.map((x, index) => ({ x, y: yGraphValues[index] })),
          borderColor: 'blue',
          fill: false,
          tension: 0.1,
        },
        {
          type: 'bar' as const,
          label: 'Approximation',
          data: rectData.map((point) => ({ x: point.x, y: point.y })),
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          barPercentage: 1.0,
          categoryPercentage: 1.0,
        },
      ],
    };
  };

  const graphData = generateGraphData();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">Riemann Sum Calculator</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Approximate Area Under a Curve</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Enter a function, interval, number of subintervals, and select a method to approximate the
          integral using Riemann sums.
        </p>
      </section>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <label className="block mb-2 font-semibold text-gray-700">Interval Start (a):</label>
            <input
              type="text"
              value={intervalStart}
              onChange={(e) => setIntervalStart(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 0"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Interval End (b):</label>
            <input
              type="text"
              value={intervalEnd}
              onChange={(e) => setIntervalEnd(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 1"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Number of Subintervals (n):
            </label>
            <input
              type="number"
              value={numSubintervals}
              onChange={(e) => setNumSubintervals(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 4"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2 font-semibold text-gray-700">Method:</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="left">Left Riemann Sum</option>
              <option value="right">Right Riemann Sum</option>
              <option value="midpoint">Midpoint Riemann Sum</option>
              <option value="trapezoidal">Trapezoidal Rule</option>
            </select>
          </div>
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex space-x-4">
          <button
            onClick={calculateRiemannSum}
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

        {result !== null && (
          <div className="bg-indigo-50 p-6 rounded-lg mt-6 border border-indigo-200">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Approximate Area</h3>
            <p className="text-lg text-gray-800">
              The approximate area under the curve from x = {intervalStart} to x = {intervalEnd} is:
            </p>
            <p className="text-lg text-gray-800 font-mono mt-2">Area ≈ {result.toFixed(6)}</p>
          </div>
        )}
      </div>

      {result !== null && graphData && (
        <div className="mt-10" style={{ height: '400px' }}>
          <h3 className="text-2xl font-semibold mb-4 text-center text-indigo-600">Graph</h3>
          <ChartJSComponent
            type="bar"
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
                    text: 'f(x)',
                  },
                },
              },
            }}
          />
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Understanding Riemann Sums</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Riemann sums are a method of approximating the definite integral of a function over an
          interval. They work by dividing the area under the curve into smaller rectangles (or
          trapezoids) and summing their areas.
        </p>
        <h3 className="text-xl font-semibold mb-2">Methods of Riemann Sums</h3>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>
            <strong>Left Riemann Sum:</strong> Uses the left endpoints of subintervals to calculate the
            height of rectangles.
          </li>
          <li>
            <strong>Right Riemann Sum:</strong> Uses the right endpoints of subintervals for heights.
          </li>
          <li>
            <strong>Midpoint Riemann Sum:</strong> Uses the midpoints of subintervals for heights.
          </li>
          <li>
            <strong>Trapezoidal Rule:</strong> Approximates the area using trapezoids instead of
            rectangles.
          </li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Formula</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">The general formula for a Riemann sum is:</p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <BlockMath math="S = \sum_{i=1}^{n} f(x_i^*) \Delta x" />
        </div>
        <p className="text-lg text-gray-700 my-4 leading-relaxed">Where:</p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>
            <InlineMath math="n" /> is the number of subintervals.
          </li>
          <li>
            <InlineMath math="\Delta x = \frac{b - a}{n}" /> is the width of each subinterval.
          </li>
          <li>
            <InlineMath math="x_i^*" /> is a point in the <InlineMath math="i" />-th subinterval (left
            endpoint, right endpoint, or midpoint).
          </li>
        </ul>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Riemann Sum Calculator. All rights reserved.</p>
        <p>Enhancing your mathematical understanding one calculation at a time 📈</p>
      </footer>
    </div>
  );
};

export default RiemannSumCalculator;