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
  () => import('chart.js/auto').then((mod) => {
    const { Chart } = mod;
    return function ChartWrapper({ chartRef, data, options }: ChartComponentProps) {
      useEffect(() => {
        let chartInstance: ChartJS | null = null;
        if (chartRef.current) {
          const ctx = chartRef.current.getContext('2d');
          if (ctx) {
            chartInstance = new Chart(ctx, { type: 'bar', data, options });
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

const MeanAbsoluteDeviationCalculator = () => {
  const [numbers, setNumbers] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [chartOptions, setChartOptions] = useState<ChartOptions | null>(null);

  const calculateMAD = useCallback(() => {
    const values = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    if (values.length === 0) {
      setResult(null);
      setChartData(null);
      return;
    }
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const mad = values.reduce((sum, val) => sum + Math.abs(val - mean), 0) / values.length;
    setResult(mad);

    setChartData({
      labels: values.map((_, index) => `Value ${index + 1}`),
      datasets: [
        {
          label: 'Values',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Mean',
          data: Array(values.length).fill(mean),
          type: 'line' as const,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          fill: false
        }
      ]
    });

    setChartOptions({
      scales: {
        y: {
          beginAtZero: true,
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
  }, [numbers]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl shadow-2xl text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Mean Absolute Deviation Calculator</h1>
      
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-blue-200">Measure Data Dispersion</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Welcome to our Mean Absolute Deviation (MAD) Calculator! This tool helps you calculate the average distance between each data point and the mean, providing a measure of variability in your dataset.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-blue-200 mb-2">Enter Numbers (comma-separated)</label>
            <textarea
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)}
              className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400 h-32"
              placeholder="e.g., 1, 2, 3, 4, 5"
            />
          </div>
          <button
            onClick={calculateMAD}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Calculate MAD
          </button>
          {result !== null && (
            <div className="mt-4 p-4 bg-white bg-opacity-10 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-blue-200">Mean Absolute Deviation:</h3>
              <p className="text-lg">{result.toFixed(4)}</p>
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
        <h2 className="text-3xl font-semibold mb-4 text-blue-200">Understanding Mean Absolute Deviation</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Mean Absolute Deviation (MAD) is a measure of variability in a dataset that calculates the average distance between each data point and the mean.
        </p>
        <h3 className="text-2xl font-semibold mb-2 text-blue-200">The MAD Formula</h3>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          For a set of values X = {'{'}x₁, x₂, ..., xₙ{'}'}, the Mean Absolute Deviation is calculated as:
        </p>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center mb-4">
          <p className="text-xl">MAD = (Σ|xᵢ - μ|) / n</p>
        </div>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Where μ is the mean of the dataset and n is the number of values.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-4 text-blue-200">Additional Resources</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          For more advanced statistical analyses or complex calculations, you might find our{' '}
          <Link href="/ti-84-calculator" className="text-blue-300 hover:text-blue-200 underline">
            online TI-84 graphing calculator
          </Link>{' '}
          helpful. It offers a wide range of functions for in-depth data analysis and visualization.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-400 text-lg">
        <p>&copy; {new Date().getFullYear()} Mean Absolute Deviation Calculator. All rights reserved.</p>
        <p>Unveiling data patterns, one calculation at a time 📊</p>
      </footer>
    </div>
  );
}

export default MeanAbsoluteDeviationCalculator;