'use client';

import React, { useState } from 'react';

interface Vector {
  x: number | '';
  y: number | '';
  z: number | '';
}

export default function CrossProductCalculator() {
  const [vector1, setVector1] = useState<Vector>({ x: 1, y: 2, z: 3 });
  const [vector2, setVector2] = useState<Vector>({ x: 4, y: 5, z: 6 });
  const [result, setResult] = useState<Vector | null>(null);

  const calculateCrossProduct = () => {
    const v1 = { x: Number(vector1.x) || 0, y: Number(vector1.y) || 0, z: Number(vector1.z) || 0 };
    const v2 = { x: Number(vector2.x) || 0, y: Number(vector2.y) || 0, z: Number(vector2.z) || 0 };
    
    const cross = {
      x: v1.y * v2.z - v1.z * v2.y,
      y: v1.z * v2.x - v1.x * v2.z,
      z: v1.x * v2.y - v1.y * v2.x
    };
    setResult(cross);
  };

  const handleInputChange = (vector: 'vector1' | 'vector2', coord: 'x' | 'y' | 'z', value: string) => {
    const numValue = value === '' ? '' : Number(value);
    if (vector === 'vector1') {
      setVector1(prev => ({ ...prev, [coord]: numValue }));
    } else {
      setVector2(prev => ({ ...prev, [coord]: numValue }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-blue-900 to-teal-800 rounded-2xl shadow-2xl text-white">
      <h1 className="text-4xl font-bold mb-6 text-center text-teal-200">Cross Product Calculator</h1>
      
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-teal-300">Discover Vector Perpendicularity</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Explore the fascinating world of cross products! This calculator helps you compute the cross product of two 3D vectors, resulting in a vector perpendicular to both inputs.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {['vector1', 'vector2'].map((vector, index) => (
          <div key={vector} className="bg-blue-800 bg-opacity-50 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-teal-300">Vector {index + 1}</h3>
            <div className="space-y-4">
              {['x', 'y', 'z'].map((coord) => (
                <div key={coord} className="flex items-center">
                  <label className="w-8 text-teal-200 font-bold">{coord.toUpperCase()}:</label>
                  <input
                    type="number"
                    placeholder={`Enter ${coord} value`}
                    value={vector === 'vector1' ? vector1[coord as keyof Vector] : vector2[coord as keyof Vector]}
                    onChange={(e) => handleInputChange(vector as 'vector1' | 'vector2', coord as 'x' | 'y' | 'z', e.target.value)}
                    className="w-full p-2 bg-blue-700 bg-opacity-50 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={calculateCrossProduct}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 mb-8 shadow-lg"
      >
        Calculate Cross Product
      </button>

      {result && (
        <div className="mt-4 p-6 bg-blue-800 bg-opacity-50 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-teal-300">Result:</h3>
          <p className="text-xl text-white">
            The cross product is: 
            <span className="font-bold text-teal-200">
              ({result.x.toFixed(2)}, {result.y.toFixed(2)}, {result.z.toFixed(2)})
            </span>
          </p>
        </div>
      )}

      <section className="mt-12 bg-blue-800 bg-opacity-50 p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 text-teal-300">Understanding Cross Products</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          The cross product of two vectors a = (ax, ay, az) and b = (bx, by, bz) is defined as:
        </p>
        <div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg text-center mb-4">
          <p className="text-xl text-teal-200">a × b = (ay*bz - az*by, az*bx - ax*bz, ax*by - ay*bx)</p>
        </div>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          The resulting vector is perpendicular to both input vectors and its magnitude equals the area of the parallelogram spanned by the two vectors.
        </p>
      </section>

      <footer className="mt-12 text-center text-blue-200 text-lg">
        <p>© 2024 Cross Product Calculator. All rights reserved.</p>
        <p>Unlocking the power of vector mathematics 🚀</p>
      </footer>
    </div>
  );
}