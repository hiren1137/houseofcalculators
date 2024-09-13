'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chart, ChartConfiguration, ScatterController, LineController, PointElement, LineElement, LinearScale } from 'chart.js';

Chart.register(ScatterController, LineController, PointElement, LineElement, LinearScale);

interface Vector {
  x: string;
  y: string;
  z: string;
}

export default function DotProductCalculator() {
  const [vector1, setVector1] = useState<Vector>({ x: '1', y: '2', z: '3' });
  const [vector2, setVector2] = useState<Vector>({ x: '4', y: '5', z: '6' });
  const [dotProduct, setDotProduct] = useState<number | null>(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  const calculateDotProduct = () => {
    const v1 = { x: parseFloat(vector1.x) || 0, y: parseFloat(vector1.y) || 0, z: parseFloat(vector1.z) || 0 };
    const v2 = { x: parseFloat(vector2.x) || 0, y: parseFloat(vector2.y) || 0, z: parseFloat(vector2.z) || 0 };
    const result = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    setDotProduct(result);
  };

  const updateChart = useCallback(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const v1 = { x: parseFloat(vector1.x) || 0, y: parseFloat(vector1.y) || 0 };
        const v2 = { x: parseFloat(vector2.x) || 0, y: parseFloat(vector2.y) || 0 };

        const config: ChartConfiguration = {
          type: 'scatter',
          data: {
            datasets: [
              {
                label: 'Vector 1',
                data: [{ x: v1.x, y: v1.y }],
                backgroundColor: 'rgb(255, 99, 132)',
              },
              {
                label: 'Vector 2',
                data: [{ x: v2.x, y: v2.y }],
                backgroundColor: 'rgb(75, 192, 192)',
              },
              {
                type: 'line',
                label: 'Vector 1',
                data: [{ x: 0, y: 0 }, { x: v1.x, y: v1.y }],
                borderColor: 'rgb(255, 99, 132)',
                fill: false,
              },
              {
                type: 'line',
                label: 'Vector 2',
                data: [{ x: 0, y: 0 }, { x: v2.x, y: v2.y }],
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
                    weight: 'bold'
                  }
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                }
              },
              y: {
                type: 'linear',
                position: 'left',
                ticks: {
                  color: 'white',
                  font: {
                    size: 14,
                    weight: 'bold'
                  }
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                }
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: 'white',
                  font: {
                    size: 14,
                    weight: 'bold'
                  }
                }
              }
            }
          },
        };

        chartInstance.current = new Chart(ctx, config);
      }
    }
  }, [vector1, vector2]);

  useEffect(() => {
    updateChart();
  }, [updateChart]);

  const handleInputChange = (vector: 'vector1' | 'vector2', coord: 'x' | 'y' | 'z', value: string) => {
    if (vector === 'vector1') {
      setVector1(prev => ({ ...prev, [coord]: value }));
    } else {
      setVector2(prev => ({ ...prev, [coord]: value }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl shadow-2xl text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Dot Product Calculator</h1>
      
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-purple-200">Discover Vector Relationships</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Welcome to our Dot Product Calculator! This tool helps you calculate the dot product of two 3D vectors. The dot product is a crucial concept in linear algebra and has various applications in physics and computer graphics.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-purple-200 mb-2">Vector 1</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="X1"
                value={vector1.x}
                onChange={(e) => handleInputChange('vector1', 'x', e.target.value)}
                className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              />
              <input
                type="number"
                placeholder="Y1"
                value={vector1.y}
                onChange={(e) => handleInputChange('vector1', 'y', e.target.value)}
                className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              />
              <input
                type="number"
                placeholder="Z1"
                value={vector1.z}
                onChange={(e) => handleInputChange('vector1', 'z', e.target.value)}
                className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-purple-200 mb-2">Vector 2</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="X2"
                value={vector2.x}
                onChange={(e) => handleInputChange('vector2', 'x', e.target.value)}
                className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              />
              <input
                type="number"
                placeholder="Y2"
                value={vector2.y}
                onChange={(e) => handleInputChange('vector2', 'y', e.target.value)}
                className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              />
              <input
                type="number"
                placeholder="Z2"
                value={vector2.z}
                onChange={(e) => handleInputChange('vector2', 'z', e.target.value)}
                className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              />
            </div>
          </div>
          <button
            onClick={calculateDotProduct}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Calculate Dot Product
          </button>
          {dotProduct !== null && (
            <div className="mt-4 p-4 bg-white bg-opacity-10 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-200">Dot Product:</h3>
              <p className="text-lg">{dotProduct.toFixed(2)}</p>
            </div>
          )}
        </div>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg">
          <canvas ref={chartRef} />
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-4 text-purple-200">Understanding Dot Products</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          The dot product of two vectors is a scalar value that gives information about the angle between the vectors and their magnitudes.
        </p>
        <h3 className="text-2xl font-semibold mb-2 text-purple-200">The Dot Product Formula</h3>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          For two vectors A = (x₁, y₁, z₁) and B = (x₂, y₂, z₂), the dot product is calculated as:
        </p>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center mb-4">
          <p className="text-xl">A &middot; B = x₁x₂ + y₁y₂ + z₁z₂</p>
        </div>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          The dot product is positive if the vectors point in similar directions, negative if they point in opposite directions, and zero if they are perpendicular.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-400 text-lg">
        <p>&copy; 2024 Dot Product Calculator. All rights reserved.</p>
        <p>Unlocking the power of vector algebra, one calculation at a time ✨</p>
      </footer>
    </div>
  );
}