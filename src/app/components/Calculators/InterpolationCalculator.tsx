'use client';

import React, { useState } from 'react';
import { Chart as ChartJSComponent } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
  LineController,
  ScatterController,
} from 'chart.js';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

ChartJS.register(
  LineController,
  ScatterController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend
);

const InterpolationCalculator = () => {
  const [x1, setX1] = useState<string>('1');
  const [y1, setY1] = useState<string>('2');
  const [x2, setX2] = useState<string>('3');
  const [y2, setY2] = useState<string>('6');
  const [xValue, setXValue] = useState<string>('2');
  const [interpolatedY, setInterpolatedY] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  // Linear Interpolation Function
  const linearInterpolation = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x: number
  ): number => {
    const y = y1 + ((y2 - y1) / (x2 - x1)) * (x - x1);
    return y;
  };

  const calculateInterpolation = () => {
    setError('');
    setInterpolatedY(null);

    const x1Num = parseFloat(x1);
    const y1Num = parseFloat(y1);
    const x2Num = parseFloat(x2);
    const y2Num = parseFloat(y2);
    const xNum = parseFloat(xValue);

    if (
      [x1Num, y1Num, x2Num, y2Num, xNum].some((val) => isNaN(val)) ||
      x1Num === x2Num
    ) {
      setError('Please enter valid numerical values and ensure that X₁ ≠ X₂.');
      return;
    }

    const yInterpolated = linearInterpolation(x1Num, y1Num, x2Num, y2Num, xNum);
    setInterpolatedY(yInterpolated);
  };

  const handleReset = () => {
    setX1('1');
    setY1('2');
    setX2('3');
    setY2('6');
    setXValue('2');
    setInterpolatedY(null);
    setError('');
  };

  // Prepare data for graph
  const generateGraphData = () => {
    if (interpolatedY === null) return null;

    const x1Num = parseFloat(x1);
    const y1Num = parseFloat(y1);
    const x2Num = parseFloat(x2);
    const y2Num = parseFloat(y2);
    const xNum = parseFloat(xValue);

    const xValues = [x1Num, x2Num];
    const yValues = [y1Num, y2Num];

    const minX = Math.min(...xValues, xNum);
    const maxX = Math.max(...xValues, xNum);
    const xRange = maxX - minX;
    const step = xRange / 100;

    const lineData = [];

    for (let x = minX; x <= maxX; x += step) {
      const y = linearInterpolation(x1Num, y1Num, x2Num, y2Num, x);
      lineData.push({ x, y });
    }

    return {
      datasets: [
        {
          type: 'line' as const,
          label: 'Interpolation Line',
          data: lineData,
          borderColor: 'blue',
          fill: false,
          tension: 0,
        },
        {
          type: 'scatter' as const,
          label: 'Known Points',
          data: [
            { x: x1Num, y: y1Num },
            { x: x2Num, y: y2Num },
          ],
          backgroundColor: 'red',
        },
        {
          type: 'scatter' as const,
          label: 'Interpolated Point',
          data: [{ x: xNum, y: interpolatedY }],
          backgroundColor: 'green',
          pointStyle: 'triangle',
          pointRadius: 8,
        },
      ],
    };
  };

  const graphData = generateGraphData();

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">
        Interpolation Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Estimate a Value Using Linear Interpolation
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Enter two known points and an x-value to estimate the corresponding y-value using linear
          interpolation.
        </p>
      </section>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">X₁:</label>
            <input
              type="number"
              value={x1}
              onChange={(e) => setX1(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Y₁:</label>
            <input
              type="number"
              value={y1}
              onChange={(e) => setY1(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">X₂:</label>
            <input
              type="number"
              value={x2}
              onChange={(e) => setX2(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Y₂:</label>
            <input
              type="number"
              value={y2}
              onChange={(e) => setY2(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2 font-semibold text-gray-700">
              X (Value to Interpolate at):
            </label>
            <input
              type="number"
              value={xValue}
              onChange={(e) => setXValue(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex space-x-4">
          <button
            onClick={calculateInterpolation}
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

        {interpolatedY !== null && (
          <div className="bg-indigo-50 p-6 rounded-lg mt-6 border border-indigo-200">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Interpolated Result</h3>
            <p className="text-lg text-gray-800">
              The interpolated y-value at x = {xValue} is:
            </p>
            <p className="text-lg text-gray-800 font-mono mt-2">
              y = {interpolatedY.toFixed(6)}
            </p>
          </div>
        )}
      </div>

      {graphData && (
        <div className="mt-10" style={{ height: '400px' }}>
          <h3 className="text-2xl font-semibold mb-4 text-center text-indigo-600">Graph</h3>
          <ChartJSComponent
            type="scatter"
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
                    text: 'X',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Y',
                  },
                },
              },
            }}
          />
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
          Understanding Linear Interpolation
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Linear interpolation is a method of estimating an unknown value of a function between two
          known values. It assumes that the change between the two values is linear and calculates
          the unknown value accordingly.
        </p>
        <h3 className="text-xl font-semibold mb-2">The Linear Interpolation Formula</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The formula for linear interpolation between two points{' '}
          <InlineMath math="(X_1, Y_1)" /> and <InlineMath math="(X_2, Y_2)" /> is:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <BlockMath math="Y = Y_1 + \frac{Y_2 - Y_1}{X_2 - X_1} \times (X - X_1)" />
        </div>
        <p className="text-lg text-gray-700 my-4 leading-relaxed">Where:</p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>
            <InlineMath math="X" /> is the value at which you want to estimate{' '}
            <InlineMath math="Y" />.
          </li>
          <li>
            <InlineMath math="Y" /> is the interpolated value at <InlineMath math="X" />.
          </li>
          <li>
            <InlineMath math="X_1, Y_1" /> and <InlineMath math="X_2, Y_2" /> are the known data
            points.
          </li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Applications of Linear Interpolation</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Linear interpolation is widely used in engineering, physics, finance, and other fields
          where estimating values within two known points is necessary.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Interpolation Calculator. All rights reserved.</p>
        <p>Enhancing your mathematical understanding one calculation at a time 📈</p>
      </footer>
    </div>
  );
};

export default InterpolationCalculator;