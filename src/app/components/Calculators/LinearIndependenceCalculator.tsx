'use client';

import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

interface Vector {
  x: string;
  y: string;
  z?: string; // Optional for 3D vectors
}

const LinearIndependenceCalculator: React.FC = () => {
  const [vectors, setVectors] = useState<Vector[]>([]);
  const [dimension, setDimension] = useState<'2D' | '3D'>('2D');
  const [result, setResult] = useState<string>('');
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleVectorChange = (
    index: number,
    field: 'x' | 'y' | 'z',
    value: string
  ) => {
    const updatedVectors = [...vectors];
    updatedVectors[index][field] = value;
    setVectors(updatedVectors);
  };

  const addVector = () => {
    if (dimension === '2D') {
      setVectors([...vectors, { x: '', y: '' }]);
    } else {
      setVectors([...vectors, { x: '', y: '', z: '' }]);
    }
  };

  const removeVector = (index: number) => {
    const updatedVectors = vectors.filter((_, i) => i !== index);
    setVectors(updatedVectors);
  };

  const handleDimensionChange = (value: '2D' | '3D') => {
    setDimension(value);
    // Adjust vectors when dimension changes
    if (value === '2D') {
      setVectors(vectors.map((v) => ({ x: v.x, y: v.y })));
    } else {
      setVectors(
        vectors.map((v) => ({
          x: v.x,
          y: v.y,
          z: v.z || '',
        }))
      );
    }
    setResult('');
    setChartData(null);
    setError('');
  };

  const parseVector = (vector: Vector): number[] => {
    const x = parseFloat(vector.x);
    const y = parseFloat(vector.y);
    const z = vector.z ? parseFloat(vector.z) : 0;
    return [x, y, z];
  };

  const isLinearlyIndependent = (vectors: Vector[], dim: '2D' | '3D') => {
    const n = vectors.length;
    const m = dim === '2D' ? 2 : 3;

    if (n < m) {
      return 'Not enough vectors to determine linear independence.';
    }

    if (n > m) {
      return 'Too many vectors for the selected dimension. Maximum vectors allowed are equal to the dimension.';
    }

    // Create matrix
    const matrix: number[][] = vectors.map((v) => parseVector(v));

    let det = 0;

    if (dim === '2D') {
      // Calculate determinant for 2x2 matrix
      det =
        matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    } else {
      // Calculate determinant for 3x3 matrix using Sarrus' rule
      det =
        matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
        matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
        matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);
    }

    return det !== 0
      ? 'The vectors are linearly independent.'
      : 'The vectors are linearly dependent.';
  };

  const calculateLinearIndependence = () => {
    setError('');
    setResult('');
    setChartData(null);

    // Validation
    if (vectors.length !== (dimension === '2D' ? 2 : 3)) {
      setError(
        dimension === '2D'
          ? 'Please enter exactly 2 vectors for 2D.'
          : 'Please enter exactly 3 vectors for 3D.'
      );
      return;
    }

    // Check for empty inputs
    for (let i = 0; i < vectors.length; i++) {
      const vector = vectors[i];
      if (
        vector.x.trim() === '' ||
        vector.y.trim() === '' ||
        (dimension === '3D' && (vector.z === undefined || vector.z.trim() === ''))
      ) {
        setError(`Please fill out all components for Vector ${i + 1}.`);
        return;
      }
    }

    // Check for valid numbers
    for (let i = 0; i < vectors.length; i++) {
      const vector = vectors[i];
      const components = dimension === '2D' ? [vector.x, vector.y] : [vector.x, vector.y, vector.z!];
      for (let j = 0; j < components.length; j++) {
        if (isNaN(parseFloat(components[j]))) {
          setError(`Vector ${i + 1} has an invalid number in component ${j + 1}.`);
          return;
        }
      }
    }

    // Calculate linear independence
    const independenceResult = isLinearlyIndependent(vectors, dimension);
    setResult(independenceResult);

    // Prepare chart data
    const parsedVectors = vectors.map((v) => parseVector(v));

    if (dimension === '2D') {
      setChartData({
        labels: parsedVectors.map((_, index) => `Vector ${index + 1}`),
        datasets: [
          {
            label: 'X Component',
            data: parsedVectors.map((v) => v[0]),
            backgroundColor: 'rgba(59, 130, 246, 0.6)', // Blue-500 with opacity
          },
          {
            label: 'Y Component',
            data: parsedVectors.map((v) => v[1]),
            backgroundColor: 'rgba(16, 185, 129, 0.6)', // Green-500 with opacity
          },
        ],
      });
    } else {
      setChartData({
        labels: parsedVectors.map((_, index) => `Vector ${index + 1}`),
        datasets: [
          {
            label: 'X Component',
            data: parsedVectors.map((v) => v[0]),
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
          },
          {
            label: 'Y Component',
            data: parsedVectors.map((v) => v[1]),
            backgroundColor: 'rgba(16, 185, 129, 0.6)',
          },
          {
            label: 'Z Component',
            data: parsedVectors.map((v) => v[2]),
            backgroundColor: 'rgba(234, 179, 8, 0.6)', // Amber-500 with opacity
          },
        ],
      });
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Vector Components',
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-green-400">
        Linear Independence Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Determine if Your Vectors are Linearly Independent
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Use our calculator to check whether a set of vectors is linearly independent or dependent. Enter the components of your vectors and let the calculator do the rest!
        </p>
      </section>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <label className="font-semibold text-gray-700">Select Dimension:</label>
          <select
            value={dimension}
            onChange={(e) => handleDimensionChange(e.target.value as '2D' | '3D')}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="2D">2D</option>
            <option value="3D">3D</option>
          </select>
        </div>

        {vectors.map((vector, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Vector {index + 1}</h3>
            <div className="flex space-x-4">
              <div>
                <label className="block mb-1 text-gray-700" htmlFor={`vector-${index}-x`}>
                  X Component:
                </label>
                <input
                  type="number"
                  id={`vector-${index}-x`}
                  value={vector.x}
                  onChange={(e) => handleVectorChange(index, 'x', e.target.value)}
                  className="w-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 1"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700" htmlFor={`vector-${index}-y`}>
                  Y Component:
                </label>
                <input
                  type="number"
                  id={`vector-${index}-y`}
                  value={vector.y}
                  onChange={(e) => handleVectorChange(index, 'y', e.target.value)}
                  className="w-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 2"
                />
              </div>
              {dimension === '3D' && (
                <div>
                  <label className="block mb-1 text-gray-700" htmlFor={`vector-${index}-z`}>
                    Z Component:
                  </label>
                  <input
                    type="number"
                    id={`vector-${index}-z`}
                    value={vector.z}
                    onChange={(e) => handleVectorChange(index, 'z', e.target.value)}
                    className="w-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., 3"
                  />
                </div>
              )}
              <div className="flex items-end">
                <button
                  onClick={() => removeVector(index)}
                  className="mt-6 text-red-600 hover:text-red-800"
                  title="Remove Vector"
                >
                  ✕ Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addVector}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          + Add Vector
        </button>

        {error && <p className="text-red-600">{error}</p>}

        <div className="flex space-x-4">
          <button
            onClick={calculateLinearIndependence}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Calculate
          </button>
          <button
            onClick={() => {
              setVectors([]);
              setResult('');
              setChartData(null);
              setError('');
            }}
            className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Reset
          </button>
        </div>

        {result && (
          <div className="bg-green-50 p-6 rounded-lg mt-6 border border-green-200">
            <h3 className="text-2xl font-semibold mb-4 text-green-600">
              Calculation Result
            </h3>
            <p className="text-lg text-gray-800">{result}</p>
          </div>
        )}

        {chartData && (
          <div className="bg-green-50 p-6 rounded-lg mt-6 border border-green-200">
            <h3 className="text-2xl font-semibold mb-4 text-green-600">Vector Components Chart</h3>
            <Scatter data={chartData} options={chartOptions} />
          </div>
        )}
      </div>

      {/* Detailed Content Below the Calculator */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-green-600">Understanding Linear Independence</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          <strong>Linear independence</strong> is a fundamental concept in linear algebra that determines whether a set of vectors in a vector space is linearly independent or dependent. Understanding linear independence is crucial for solving systems of linear equations, performing transformations, and analyzing vector spaces.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-green-600">What is Linear Independence?</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          A set of vectors is said to be <strong>linearly independent</strong> if no vector in the set can be expressed as a linear combination of the others. In other words, the only solution to the equation:
        </p>
        <p className="text-lg text-gray-700 italic mb-4 leading-relaxed">
          c₁v₁ + c₂v₂ + ... + cₙvₙ = 0
        </p>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          is c₁ = c₂ = ... = cₙ = 0. If at least one coefficient is non-zero, the vectors are <strong>linearly dependent</strong>.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-green-600">Benefits of Understanding Linear Independence</h2>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
          <li><strong>Simplifying Systems of Equations:</strong> Determines the uniqueness of solutions.</li>
          <li><strong>Basis Formation:</strong> Helps in forming a basis for vector spaces.</li>
          <li><strong>Dimensional Analysis:</strong> Assists in understanding the dimensions of vector spaces.</li>
          <li><strong>Optimization:</strong> Critical in optimization problems and algorithms.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-green-600">How to Determine Linear Independence</h2>
        <h3 className="text-2xl font-semibold mb-4 text-green-400">Step-by-Step Guide</h3>
        <ol className="list-decimal list-inside text-lg text-gray-700 space-y-2">
          <li>
            <strong>Set Up the Equation:</strong> Arrange the vectors into a matrix where each column represents a vector.
          </li>
          <li>
            <strong>Row Reduction:</strong> Perform Gaussian elimination to reduce the matrix to its row-echelon form.
          </li>
          <li>
            <strong>Check for Pivots:</strong> Ensure that each column has a pivot (a leading 1). If every vector has a pivot, the set is linearly independent.
          </li>
          <li>
            <strong>Interpret the Result:</strong> If any column lacks a pivot, the vectors are linearly dependent.
          </li>
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-green-600">Linear Independence Example</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Consider the following set of vectors in 2D:
        </p>
        <ul className="list-none space-y-2">
          <li>
            <strong>Vector 1 (v₁):</strong> (1, 2)
          </li>
          <li>
            <strong>Vector 2 (v₂):</strong> (3, 4)
          </li>
        </ul>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          To determine if these vectors are linearly independent, set up the equation:
        </p>
        <p className="text-lg text-gray-700 italic mb-4 leading-relaxed">
          c₁(1, 2) + c₂(3, 4) = (0, 0)
        </p>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          This leads to the system of equations:
        </p>
        <ul className="list-none space-y-2">
          <li>c₁ + 3c₂ = 0</li>
          <li>2c₁ + 4c₂ = 0</li>
        </ul>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Solving this system, we find that c₁ = 0 and c₂ = 0 are the only solutions, indicating that the vectors are <strong>linearly independent</strong>.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-green-600">Visualizing Linear Independence</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Understanding linear independence can be greatly enhanced through visualization. In 2D space, two vectors are linearly independent if they are not collinear. In 3D space, three vectors are linearly independent if they do not lie in the same plane.
        </p>
        {chartData && (
          <div className="bg-green-50 p-6 rounded-lg mt-6 border border-green-200">
            <h3 className="text-2xl font-semibold mb-4 text-green-600">Vectors Visualization</h3>
            <Scatter data={chartData} options={chartOptions} />
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-green-600">Additional Resources</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          For more detailed information on linear independence and related topics, consider the following resources:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            Khan Academy - Linear Independence:{' '}
            <a
              href="https://www.khanacademy.org/math/linear-algebra/vectors-and-spaces/linear-independence/v/linear-independence"
              className="text-green-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.khanacademy.org/math/linear-algebra/...
            </a>
          </li>
          <li>
            Investopedia - Linear Independence:{' '}
            <a
              href="https://www.investopedia.com/terms/l/linear-independence.asp"
              className="text-green-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.investopedia.com/terms/l/linear-independence.asp
            </a>
          </li>
          <li>
            MIT OpenCourseWare - Linear Algebra:{' '}
            <a
              href="https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010/"
              className="text-green-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ocw.mit.edu/courses/mathematics/...
            </a>
          </li>
          <li>
            Paul's Online Math Notes - Linear Independence:{' '}
            <a
              href="https://tutorial.math.lamar.edu/Classes/LinAlg/LinearIndependence.aspx"
              className="text-green-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              tutorial.math.lamar.edu/Classes/LinAlg/...
            </a>
          </li>
        </ul>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Linear Independence Calculator. All rights reserved.</p>
        <p>Enhancing your understanding of linear algebra concepts.</p>
      </footer>
    </div>
  );
};

export default LinearIndependenceCalculator;