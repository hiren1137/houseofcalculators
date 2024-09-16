'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Chart as ChartJS, ChartData, ChartOptions } from 'chart.js/auto';

interface ChartComponentProps {
  chartRef: React.RefObject<HTMLCanvasElement>;
  data: ChartData;
  options: ChartOptions;
}

// Create a wrapper component for the chart
const ChartComponent = dynamic(
  () =>
    import('chart.js/auto').then((mod) => {
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

const QuadraticEquationSolver = () => {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [chartOptions, setChartOptions] = useState<ChartOptions | null>(null);

  const calculateQuadratic = useCallback(() => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
      setResult('Please enter valid numbers for a, b, and c.');
      setChartData(null);
      return;
    }

    if (aNum === 0) {
      setResult('Coefficient a cannot be zero.');
      setChartData(null);
      return;
    }

    const discriminant = bNum * bNum - 4 * aNum * cNum;

    let rootsMessage = '';

    if (discriminant > 0) {
      const root1 = (-bNum + Math.sqrt(discriminant)) / (2 * aNum);
      const root2 = (-bNum - Math.sqrt(discriminant)) / (2 * aNum);
      rootsMessage = `The roots are real and different:\nx₁ = ${root1}\nx₂ = ${root2}`;
    } else if (discriminant === 0) {
      const root = -bNum / (2 * aNum);
      rootsMessage = `The root is real and repeated:\nx = ${root}`;
    } else {
      const realPart = (-bNum / (2 * aNum)).toFixed(2);
      const imaginaryPart = (Math.sqrt(-discriminant) / (2 * aNum)).toFixed(2);
      rootsMessage = `The roots are complex and different:\nx₁ = ${realPart} + ${imaginaryPart}i\nx₂ = ${realPart} - ${imaginaryPart}i`;
    }

    setResult(rootsMessage);

    // Prepare data for the chart
    const xValues = [];
    const yValues = [];
    for (let x = -10; x <= 10; x += 0.5) {
      xValues.push(x);
      yValues.push(aNum * x * x + bNum * x + cNum);
    }

    setChartData({
      labels: xValues,
      datasets: [
        {
          label: 'y = ax² + bx + c',
          data: yValues,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.4)',
          fill: false,
        },
      ],
    });

    setChartOptions({
      scales: {
        x: {
          title: {
            display: true,
            text: 'x',
            color: 'white',
          },
          ticks: {
            color: 'white',
            font: {
              size: 12,
              weight: 'bold',
            },
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
        y: {
          title: {
            display: true,
            text: 'y',
            color: 'white',
          },
          ticks: {
            color: 'white',
            font: {
              size: 12,
              weight: 'bold',
            },
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: 'white',
            font: {
              size: 12,
              weight: 'bold',
            },
          },
        },
      },
    });
  }, [a, b, c]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-green-900 to-indigo-900 rounded-2xl shadow-2xl text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Quadratic Equation Solver</h1>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-green-200">Solve Quadratic Equations Easily</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Welcome to our Quadratic Equation Solver! Enter the coefficients of your quadratic equation to find the roots and visualize the graph.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-green-200 mb-2">Coefficient a:</label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              placeholder="Enter value for a"
            />
          </div>
          <div>
            <label className="block text-green-200 mb-2">Coefficient b:</label>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              placeholder="Enter value for b"
            />
          </div>
          <div>
            <label className="block text-green-200 mb-2">Coefficient c:</label>
            <input
              type="number"
              value={c}
              onChange={(e) => setC(e.target.value)}
              className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              placeholder="Enter value for c"
            />
          </div>
          <button
            onClick={calculateQuadratic}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Solve Equation
          </button>
          {result && (
            <div className="mt-4 p-4 bg-white bg-opacity-10 rounded-lg whitespace-pre-line">
              <h3 className="text-xl font-semibold mb-2 text-green-200">Result:</h3>
              <p className="text-lg">{result}</p>
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
        <h2 className="text-3xl font-semibold mb-4 text-green-200">Understanding Quadratic Equations</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          A quadratic equation is a second-degree polynomial of the form:
        </p>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center mb-4">
          <p className="text-xl">ax² + bx + c = 0</p>
        </div>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          The solutions to this equation are called the roots and can be found using the quadratic formula:
        </p>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center mb-4">
          <p className="text-xl">
            x = [-b ± √(b² - 4ac)] / (2a)
          </p>
        </div>
      </section>

      <footer className="mt-12 text-center text-gray-400 text-lg">
        <p>&copy; {new Date().getFullYear()} Quadratic Equation Solver. All rights reserved.</p>
        <p>Making math easier, one equation at a time 🧮</p>
      </footer>
    </div>
  );
};

export default QuadraticEquationSolver;