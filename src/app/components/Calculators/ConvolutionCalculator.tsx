
'use client';

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const ConvolutionCalculator: React.FC = () => {
  const [sequenceA, setSequenceA] = useState<string>('1, 2, 3');
  const [sequenceB, setSequenceB] = useState<string>('4, 5, 6');
  const [convolutionResult, setConvolutionResult] = useState<number[]>([]);
  const [error, setError] = useState<string>('');

  // Function to parse input strings into number arrays
  const parseInput = (input: string): number[] => {
    return input
      .split(',')
      .map((num) => parseFloat(num.trim()))
      .filter((num) => !isNaN(num));
  };

  // Function to perform discrete convolution
  const discreteConvolution = (a: number[], b: number[]): number[] => {
    const resultLength = a.length + b.length - 1;
    const result = Array(resultLength).fill(0);

    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        result[i + j] += a[i] * b[j];
      }
    }

    return result;
  };

  const handleCalculate = () => {
    setError('');
    setConvolutionResult([]);

    const a = parseInput(sequenceA);
    const b = parseInput(sequenceB);

    if (a.length === 0 || b.length === 0) {
      setError('Please enter valid sequences for both A and B.');
      return;
    }

    const conv = discreteConvolution(a, b);
    setConvolutionResult(conv);
  };

  const handleReset = () => {
    setSequenceA('1, 2, 3');
    setSequenceB('4, 5, 6');
    setConvolutionResult([]);
    setError('');
  };

  // Prepare data for Chart.js
  const prepareChartData = () => {
    const maxLength = Math.max(sequenceA.split(',').length, sequenceB.split(',').length, convolutionResult.length);
    const labels = Array.from({ length: maxLength }, (_, i) => i);

    return {
      labels,
      datasets: [
        {
          label: 'Sequence A',
          data: parseInput(sequenceA),
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: false,
          tension: 0.1,
        },
        {
          label: 'Sequence B',
          data: parseInput(sequenceB),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: false,
          tension: 0.1,
        },
        {
          label: 'Convolution A * B',
          data: convolutionResult,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-green-600">
        Convolution Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Compute Discrete Convolution of Two Sequences</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Enter two numerical sequences to calculate their discrete convolution. The result will be displayed numerically and graphically.
        </p>
      </section>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label className="block text-lg font-medium mb-2" htmlFor="sequenceA">
              Sequence A:
            </label>
            <input
              type="text"
              id="sequenceA"
              value={sequenceA}
              onChange={(e) => setSequenceA(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 1, 2, 3"
            />
          </div>
          <div className="flex-1">
            <label className="block text-lg font-medium mb-2" htmlFor="sequenceB">
              Sequence B:
            </label>
            <input
              type="text"
              id="sequenceB"
              value={sequenceB}
              onChange={(e) => setSequenceB(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 4, 5, 6"
            />
          </div>
        </div>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleCalculate}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Calculate
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Reset
          </button>
        </div>

        {convolutionResult.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-center text-green-600">Convolution Result</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white text-left">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-green-200">n</th>
                    <th className="py-2 px-4 bg-green-200">A * B</th>
                  </tr>
                </thead>
                <tbody>
                  {convolutionResult.map((value, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4">{index}</td>
                      <td className="py-2 px-4">{value.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <Line data={prepareChartData()} />
            </div>
          </div>
        )}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-green-600 text-center">
          Understanding Convolution
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Convolution is a mathematical operation used to determine the integral that expresses the amount of overlap of one function as it is shifted over another function. In simpler terms, convolution blends two functions to produce a third function that expresses how the shape of one is modified by the other. This operation is fundamental in various fields such as signal processing, image processing, and probability theory.
        </p>

        <h3 className="text-xl font-semibold mb-2">What is Convolution?</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Convolution combines two sequences (or functions) to form a third sequence that represents how the shape of one is modified by the other. In discrete convolution, commonly used in digital signal processing, two finite sequences are combined to produce a third sequence of length equal to the sum of the lengths of the two original sequences minus one.
        </p>

        <h3 className="text-xl font-semibold mb-2">Applications of Convolution</h3>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>
            <strong>Signal Processing:</strong> Convolution is used to apply filters to signals, such as blurring or sharpening in image processing or noise reduction in audio signals.
          </li>
          <li>
            <strong>Image Processing:</strong> Techniques like edge detection and image enhancement rely on convolution with specific kernels.
          </li>
          <li>
            <strong>Probability Theory:</strong> Convolution is used to find the distribution of the sum of independent random variables.
          </li>
          <li>
            <strong>Machine Learning:</strong> Convolutional Neural Networks (CNNs) use convolution operations to detect features in data.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">How Does Convolution Work?</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          To perform discrete convolution, follow these steps:
        </p>
        <ol className="list-decimal list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>
            <strong>Reverse:</strong> Reverse one of the sequences. This is often done implicitly in computations.
          </li>
          <li>
            <strong>Shift:</strong> Shift the reversed sequence across the other sequence.
          </li>
          <li>
            <strong>Multiply and Sum:</strong> At each shift position, multiply overlapping elements and sum the results to produce a single value in the convolution result.
          </li>
        </ol>

        <h3 className="text-xl font-semibold mb-2">Example of Discrete Convolution</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Consider two sequences:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li><strong>Sequence A:</strong> 1, 2, 3</li>
          <li><strong>Sequence B:</strong> 4, 5, 6</li>
        </ul>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The convolution of A and B is calculated as follows:
        </p>
        <table className="min-w-full bg-white text-left mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">n</th>
              <th className="py-2 px-4 bg-gray-200">A * B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4">0</td>
              <td className="py-2 px-4">1×4 = 4</td>
            </tr>
            <tr>
              <td className="py-2 px-4">1</td>
              <td className="py-2 px-4">1×5 + 2×4 = 5 + 8 = 13</td>
            </tr>
            <tr>
              <td className="py-2 px-4">2</td>
              <td className="py-2 px-4">1×6 + 2×5 + 3×4 = 6 + 10 + 12 = 28</td>
            </tr>
            <tr>
              <td className="py-2 px-4">3</td>
              <td className="py-2 px-4">2×6 + 3×5 = 12 + 15 = 27</td>
            </tr>
            <tr>
              <td className="py-2 px-4">4</td>
              <td className="py-2 px-4">3×6 = 18</td>
            </tr>
          </tbody>
        </table>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          So, the convolution result is: <strong>4, 13, 28, 27, 18</strong>
        </p>

        <h3 className="text-xl font-semibold mb-2">Using the Convolution Calculator</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          To use the Convolution Calculator:
        </p>
        <ol className="list-decimal list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>
            <strong>Enter Sequences:</strong> Input two numerical sequences separated by commas in the provided fields. For example, <em>1, 2, 3</em> and <em>4, 5, 6</em>.
          </li>
          <li>
            <strong>Calculate:</strong> Click the <strong>Calculate</strong> button to compute the convolution.
          </li>
          <li>
            <strong>View Results:</strong> The convolution result will be displayed in a table and visualized on a graph.
          </li>
          <li>
            <strong>Reset:</strong> Use the <strong>Reset</strong> button to clear inputs and results.
          </li>
        </ol>

        <h3 className="text-xl font-semibold mb-2">Understanding the Graph</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The graph provides a visual representation of the two input sequences and their convolution. Each sequence is plotted in a different color for clarity:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li><strong>Sequence A:</strong> Blue line</li>
          <li><strong>Sequence B:</strong> Red line</li>
          <li><strong>Convolution A * B:</strong> Green line</li>
        </ul>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          This visualization helps in understanding how the convolution combines the two sequences to produce the resulting sequence.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Convolution Calculator. All rights reserved.</p>
        <p>Enhancing your mathematical understanding one calculation at a time 🔍</p>
      </footer>
    </div>
  );
};

export default ConvolutionCalculator;