'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Chart as ChartJS, ChartData, ChartOptions } from 'chart.js/auto';
import { evaluate } from 'mathjs';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

interface ChartComponentProps {
  chartRef: React.RefObject<HTMLCanvasElement>;
  data: ChartData;
  options: ChartOptions;
}

// Create a wrapper component for the chart
const ChartComponent = dynamic(
  () => import('chart.js/auto').then((mod) => {
    const { Chart } = mod;
    return function ChartWrapper({ chartRef, data, options }: ChartComponentProps) {
      useEffect(() => {
        let chartInstance: ChartJS | null = null;
        if (chartRef.current) {
          const ctx = chartRef.current.getContext('2d');
          if (ctx) {
            chartInstance = new Chart(ctx, { type: 'line', data, options });
          }
        }
        return () => {
          if (chartInstance) {
            chartInstance.destroy();
          }
        };
      }, [chartRef, data, options]);

      return <canvas ref={chartRef} />;
    };
  }),
  { ssr: false }
);

const SimpsonsRuleCalculator = () => {
  const [functionInput, setFunctionInput] = useState<string>('x^2'); // Default function
  const [lowerLimit, setLowerLimit] = useState<string>('0');
  const [upperLimit, setUpperLimit] = useState<string>('2');
  const [intervals, setIntervals] = useState<string>('2'); // Must be even
  const [result, setResult] = useState<number | null>(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [chartOptions, setChartOptions] = useState<ChartOptions | null>(null);

  // Function to evaluate the user input function safely
  const evaluateFunction = (func: string, x: number): number => {
    try {
      return evaluate(func, { x });
    } catch {
      return NaN;
    }
  };

  const calculateSimpsonsRule = useCallback(() => {
    const a = parseFloat(lowerLimit);
    const b = parseFloat(upperLimit);
    let n = parseInt(intervals);

    if (isNaN(a) || isNaN(b) || isNaN(n)) {
      alert('Please enter valid numerical values.');
      return;
    }

    if (n % 2 !== 0) {
      alert('Number of intervals must be even for Simpson&apos;s Rule.');
      return;
    }

    const h = (b - a) / n;
    let sum = evaluateFunction(functionInput, a) + evaluateFunction(functionInput, b);

    for (let i = 1; i < n; i++) {
      const x = a + i * h;
      const fx = evaluateFunction(functionInput, x);
      if (isNaN(fx)) {
        alert('Invalid function input.');
        return;
      }
      sum += (i % 2 === 0 ? 2 : 4) * fx;
    }

    const integral = (h / 3) * sum;
    setResult(integral);

    // Prepare data for chart visualization
    const points = 100;
    const step = (b - a) / points;
    const xValues: number[] = [];
    const yValues: number[] = [];

    for (let i = 0; i <= points; i++) {
      const x = a + i * step;
      const y = evaluateFunction(functionInput, x);
      if (!isNaN(y)) {
        xValues.push(x);
        yValues.push(y);
      }
    }

    setChartData({
      labels: xValues,
      datasets: [
        {
          label: 'f(x)',
          data: yValues,
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
          tension: 0.1
        }
      ]
    });

    setChartOptions({
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            color: 'white',
            font: {
              size: 12,
              weight: 'bold'
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        x: {
          ticks: {
            color: 'white',
            font: {
              size: 12,
              weight: 'bold'
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'white',
            font: {
              size: 12,
              weight: 'bold'
            }
          }
        }
      }
    });
  }, [functionInput, lowerLimit, upperLimit, intervals]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-green-900 to-indigo-900 rounded-2xl shadow-2xl text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Simpson&apos;s Rule Calculator</h1>
      
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-green-200">Numerical Integration Made Easy</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Welcome to our Simpson&apos;s Rule Calculator! Use this tool to approximate the definite integral of a function over a specified interval using Simpson&apos;s Rule, a powerful method in numerical integration.
        </p>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Simpson&apos;s Rule is particularly effective for polynomials and smooth functions, providing a more accurate approximation compared to other numerical methods like the Trapezoidal Rule.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-green-200 mb-2">Enter Function f(x)</label>
            <input
              type="text"
              value={functionInput}
              onChange={(e) => setFunctionInput(e.target.value)}
              className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              placeholder="e.g., x^2, sin(x), exp(x)"
            />
          </div>
          <div>
            <label className="block text-green-200 mb-2">Lower Limit (a)</label>
            <input
              type="text"
              value={lowerLimit}
              onChange={(e) => setLowerLimit(e.target.value)}
              className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              placeholder="e.g., 0"
            />
          </div>
          <div>
            <label className="block text-green-200 mb-2">Upper Limit (b)</label>
            <input
              type="text"
              value={upperLimit}
              onChange={(e) => setUpperLimit(e.target.value)}
              className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              placeholder="e.g., 2"
            />
          </div>
          <div>
            <label className="block text-green-200 mb-2">Number of Intervals (n, even)</label>
            <input
              type="text"
              value={intervals}
              onChange={(e) => setIntervals(e.target.value)}
              className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              placeholder="e.g., 2"
            />
          </div>
          <button
            onClick={calculateSimpsonsRule}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Calculate Integral
          </button>
          {result !== null && (
            <div className="mt-4 p-4 bg-white bg-opacity-10 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-green-200">Approximate Integral:</h3>
              <p className="text-lg">{result.toFixed(6)}</p>
            </div>
          )}
        </div>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg">
          {chartData && chartOptions && (
            <ChartComponent chartRef={chartRef} data={chartData} options={chartOptions} />
          )}
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-4 text-green-200">Understanding Simpson&apos;s Rule</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Simpson&apos;s Rule is a method for numerical integration, the numerical approximation of definite integrals. It provides a way to estimate the area under a curve by dividing the area into parabolic segments, offering greater accuracy than methods like the Trapezoidal Rule.
        </p>
        <h3 className="text-2xl font-semibold mb-2 text-green-200">The Simpson&apos;s Rule Formula</h3>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          For an even number of intervals <InlineMath math="n" />, Simpson&apos;s Rule is given by:
        </p>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center mb-4">
          <p className="text-xl">
            <InlineMath math="Integral \approx \frac{h}{3} \left[ f(a) + 4f(a+h) + 2f(a+2h) + \dots + 4f(b-h) + f(b) \right]" />
          </p>
        </div>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Where <InlineMath math="h = \frac{b - a}{n}" />, <InlineMath math="a" /> and <InlineMath math="b" /> are the lower and upper limits of integration, respectively. Simpson&apos;s Rule assumes that the function can be approximated by a second-degree polynomial within each subinterval.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-4 text-green-200">Additional Resources</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          To further enhance your mathematical computations, explore our other calculators in the <strong>Mathematics</strong> category:
        </p>
        <ul className="list-disc list-inside text-xl text-gray-300 mb-4 leading-relaxed">
          <li>
            <Link href="/midpoint-calculator" className="text-green-300 hover:text-green-200 underline">
              Midpoint Calculator
            </Link>
          </li>
          {/* You can add more relevant calculators here if needed */}
        </ul>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          These tools are designed to assist you with a wide range of mathematical problems, ensuring accurate and efficient solutions every time.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-400 text-lg">
        <p>&copy; {new Date().getFullYear()} Simpson&apos;s Rule Calculator. All rights reserved.</p>
        <p>Approximating integrals with precision and ease 📐</p>
      </footer>
    </div>
  );
}

export default SimpsonsRuleCalculator;
