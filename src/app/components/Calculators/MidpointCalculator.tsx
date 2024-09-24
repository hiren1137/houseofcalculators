'use client';

import React, { useState, useRef } from 'react';
import { Chart, ChartConfiguration, ScatterController, LineController, PointElement, LineElement, LinearScale } from 'chart.js';

Chart.register(ScatterController, LineController, PointElement, LineElement, LinearScale);

interface Point {
  x: string;
  y: string;
}

export default function MidpointCalculator() {
  const [point1, setPoint1] = useState<Point>({ x: '', y: '' });
  const [point2, setPoint2] = useState<Point>({ x: '', y: '' });
  const [midpoint, setMidpoint] = useState<{ x: number; y: number } | null>(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  const calculateMidpoint = () => {
    const x1 = parseFloat(point1.x);
    const y1 = parseFloat(point1.y);
    const x2 = parseFloat(point2.x);
    const y2 = parseFloat(point2.y);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
      setMidpoint(null);
      alert('Please enter valid numbers for all coordinates.');
      return;
    }

    const mid = {
      x: (x1 + x2) / 2,
      y: (y1 + y2) / 2,
    };
    setMidpoint(mid);
    updateChart(x1, y1, x2, y2, mid);
  };

  const updateChart = (x1: number, y1: number, x2: number, y2: number, mid: { x: number; y: number }) => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const config: ChartConfiguration = {
          type: 'scatter',
          data: {
            datasets: [
              {
                label: 'Points',
                data: [
                  { x: x1, y: y1 },
                  { x: x2, y: y2 },
                ],
                backgroundColor: 'rgb(255, 99, 132)',
              },
              {
                label: 'Midpoint',
                data: [mid],
                backgroundColor: 'rgb(75, 192, 192)',
              },
              {
                type: 'line',
                label: 'Line',
                data: [
                  { x: x1, y: y1 },
                  { x: x2, y: y2 },
                ],
                borderColor: 'rgb(75, 192, 192)',
                fill: false,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
                ticks: {
                  color: 'white',
                  font: {
                    size: 14,
                    weight: 'bold',
                  },
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
              },
              y: {
                type: 'linear',
                position: 'left',
                ticks: {
                  color: 'white',
                  font: {
                    size: 14,
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
                    size: 14,
                    weight: 'bold',
                  },
                },
              },
            },
          },
        };

        chartInstance.current = new Chart(ctx, config);
      }
    }
  };

  const handleInputChange = (point: 'point1' | 'point2', coord: 'x' | 'y', value: string) => {
    if (point === 'point1') {
      setPoint1((prev) => ({ ...prev, [coord]: value }));
    } else {
      setPoint2((prev) => ({ ...prev, [coord]: value }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl shadow-2xl text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Midpoint Calculator</h1>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-purple-200">Find the Middle Ground</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Welcome to our Midpoint Calculator! This tool helps you find the exact center point between any two coordinates on a 2D plane. Whether you're working on geometry homework or planning the perfect meeting spot between two locations, our calculator has got you covered.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-purple-200 mb-2">Point 1</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="X1"
                value={point1.x}
                onChange={(e) => handleInputChange('point1', 'x', e.target.value)}
                className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              />
              <input
                type="number"
                placeholder="Y1"
                value={point1.y}
                onChange={(e) => handleInputChange('point1', 'y', e.target.value)}
                className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-purple-200 mb-2">Point 2</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="X2"
                value={point2.x}
                onChange={(e) => handleInputChange('point2', 'x', e.target.value)}
                className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              />
              <input
                type="number"
                placeholder="Y2"
                value={point2.y}
                onChange={(e) => handleInputChange('point2', 'y', e.target.value)}
                className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              />
            </div>
          </div>
          <button
            onClick={calculateMidpoint}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Calculate Midpoint
          </button>
          {midpoint && (
            <div className="mt-4 p-4 bg-white bg-opacity-10 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-200">Midpoint:</h3>
              <p className="text-lg">
                ({midpoint.x.toFixed(2)}, {midpoint.y.toFixed(2)})
              </p>
            </div>
          )}
        </div>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg">
          <canvas ref={chartRef} />
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-4 text-purple-200">The Magic of Midpoints</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          In mathematics, the midpoint is the point that divides a line segment into two equal parts. It's a fundamental concept in geometry with numerous practical applications.
        </p>
        <h3 className="text-2xl font-semibold mb-2 text-purple-200">The Midpoint Formula</h3>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          To find the midpoint (x, y) between two points (x₁, y₁) and (x₂, y₂), we use the following formulas:
        </p>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center mb-4">
          <p className="text-xl">x = (x₁ + x₂) / 2</p>
          <p className="text-xl">y = (y₁ + y₂) / 2</p>
        </div>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          This formula calculates the average of the x-coordinates and y-coordinates separately, giving us the exact center point between the two original points.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-400 text-lg">
        <p>© 2024 Midpoint Calculator. All rights reserved.</p>
        <p>Empowering mathematical discoveries, one point at a time ✨</p>
      </footer>
    </div>
  );
}