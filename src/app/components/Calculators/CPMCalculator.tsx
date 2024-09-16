'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
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

const CPMCalculator = () => {
  const [cost, setCost] = useState<string>('');
  const [impressions, setImpressions] = useState<string>('');
  const [cpm, setCPM] = useState<number | null>(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [chartOptions, setChartOptions] = useState<ChartOptions | null>(null);

  const calculateCPM = useCallback(() => {
    const costNum = parseFloat(cost);
    const impressionsNum = parseFloat(impressions);

    if (isNaN(costNum) || isNaN(impressionsNum) || impressionsNum === 0) {
      setCPM(null);
      setChartData(null);
      return;
    }

    const cpmValue = (costNum / impressionsNum) * 1000;
    setCPM(cpmValue);

    setChartData({
      labels: ['CPM'],
      datasets: [
        {
          label: 'Cost Per Mille',
          data: [cpmValue],
          backgroundColor: 'rgba(54, 162, 235, 0.6)', // Professional blue
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    });

    setChartOptions({
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'white',
            font: {
              size: 12,
              weight: 600, // Changed from '600' to 600
            },
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
        x: {
          ticks: {
            color: 'white',
            font: {
              size: 12,
              weight: 600, // Changed from '600' to 600
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
              weight: 600, // Changed from '600' to 600
            },
          },
        },
      },
    });
  }, [cost, impressions]);

  const handleReset = () => {
    setCost('');
    setImpressions('');
    setCPM(null);
    setChartData(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">CPM Calculator</h1>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-blue-300">Calculate Cost Per Mille (CPM)</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Welcome to our <strong>CPM Calculator</strong>! Enter your advertising cost and total impressions to calculate the cost per thousand impressions. Understanding your CPM is essential for optimizing your advertising campaigns and maximizing return on investment.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-blue-300 mb-2 font-semibold">Total Cost ($):</label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              placeholder="Enter total advertising cost"
            />
          </div>
          <div>
            <label className="block text-blue-300 mb-2 font-semibold">Total Impressions:</label>
            <input
              type="number"
              value={impressions}
              onChange={(e) => setImpressions(e.target.value)}
              className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              placeholder="Enter total number of impressions"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={calculateCPM}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Calculate CPM
            </button>
            <button
              onClick={handleReset}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Reset
            </button>
          </div>
          {cpm !== null && (
            <div className="mt-4 p-4 bg-white bg-opacity-10 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-blue-300">Result:</h3>
              <p className="text-lg">
                Your CPM is <strong>${cpm.toFixed(2)}</strong>
              </p>
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
        <h2 className="text-3xl font-semibold mb-4 text-blue-300">Understanding CPM</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          <strong>CPM</strong>, or <em>Cost Per Mille</em>, is a critical metric in advertising that represents the cost per thousand impressions of an advertisement. The term "mille" is Latin for "thousand." CPM is widely used to measure the cost-effectiveness and value of online and offline advertising campaigns.
        </p>
        <h3 className="text-2xl font-semibold mb-2 text-blue-300">Why CPM Matters</h3>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Understanding your CPM helps you:
        </p>
        <ul className="list-disc list-inside text-xl text-gray-300 mb-4 leading-relaxed">
          <li>Evaluate the efficiency of your advertising spend.</li>
          <li>Compare costs across different advertising channels and platforms.</li>
          <li>Optimize your budget allocation to maximize reach and engagement.</li>
        </ul>
        <h3 className="text-2xl font-semibold mb-2 text-blue-300">How to Calculate CPM</h3>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center mb-4">
          <p className="text-xl font-semibold">
            CPM = (Total Advertising Cost / Total Impressions) × 1000
          </p>
        </div>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          For example, if you spend <strong>$500</strong> on a campaign that generates <strong>100,000 impressions</strong>, your CPM would be:
        </p>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center mb-4">
          <p className="text-xl font-semibold">
            CPM = ($500 / 100,000) × 1000 = $5.00
          </p>
        </div>
        <h3 className="text-2xl font-semibold mb-2 text-blue-300">Tips for Optimizing CPM</h3>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          To get the most out of your advertising budget, consider the following:
        </p>
        <ul className="list-disc list-inside text-xl text-gray-300 mb-4 leading-relaxed">
          <li><strong>Target Your Audience:</strong> Focus on platforms where your target audience is most active.</li>
          <li><strong>Negotiate Rates:</strong> If possible, negotiate better rates with publishers or platforms.</li>
          <li><strong>Monitor Performance:</strong> Regularly review campaign metrics to identify areas for improvement.</li>
          <li><strong>Optimize Ad Content:</strong> High-quality, engaging ads can improve click-through rates and overall effectiveness.</li>
        </ul>
      </section>

      <footer className="mt-12 text-center text-gray-400 text-lg">
        <p>&copy; {new Date().getFullYear()} CPM Calculator. All rights reserved.</p>
        <p>Optimizing your advertising spend, one calculation at a time 💼</p>
      </footer>
    </div>
  );
};

export default CPMCalculator;