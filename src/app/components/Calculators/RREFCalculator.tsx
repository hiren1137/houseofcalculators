'use client';

import React, { useState } from 'react';

type Matrix = number[][];

export default function RREFCalculator() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [matrix, setMatrix] = useState<Matrix>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);
  const [result, setResult] = useState<Matrix | null>(null);

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    const newMatrix = matrix.map((row, rIndex) =>
      row.map((cell, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? (value === '' ? 0 : Number(value)) : cell
      )
    );
    setMatrix(newMatrix);
  };

  const calculateRREF = () => {
    const rref = (matrix: Matrix): Matrix => {
      const m = matrix.map(row => [...row]); // Create a copy of the matrix
      let lead = 0;
      const rows = m.length;
      const cols = m[0].length;

      for (let r = 0; r < rows; r++) {
        if (lead >= cols) {
          return m;
        }
        let i = r;
        while (m[i][lead] === 0) {
          i++;
          if (i === rows) {
            i = r;
            lead++;
            if (cols === lead) {
              return m;
            }
          }
        }
        [m[i], m[r]] = [m[r], m[i]];
        const lv = m[r][lead];
        m[r] = m[r].map(x => x / lv);
        for (let i = 0; i < rows; i++) {
          if (i !== r) {
            const lv = m[i][lead];
            m[i] = m[i].map((x, j) => x - lv * m[r][j]);
          }
        }
        lead++;
      }
      return m;
    };

    setResult(rref(matrix));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl shadow-2xl text-white">
      <h1 className="text-4xl font-bold mb-2 text-center text-blue-300">Reduced Row Echelon Form (RREF) Calculator</h1>
      <p className="text-xl text-center mb-6 text-gray-300">Simplify Your Matrix Operations</p>
      
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-blue-200">Transform Your Matrices</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Welcome to our RREF Calculator! This powerful tool helps you convert any matrix into its Reduced Row Echelon Form. Whether you're solving systems of linear equations, finding matrix ranks, or studying linear algebra, our RREF Calculator simplifies your work and enhances your understanding.
        </p>
      </section>

      <div className="space-y-4">
        <div>
          <label className="block text-blue-200 mb-2">Matrix Size:</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={rows}
              onChange={(e) => {
                const newRows = Number(e.target.value);
                setRows(newRows);
                setMatrix(Array(newRows).fill(0).map(() => Array(cols).fill(0)));
                setResult(null);
              }}
              className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              min="1"
              max="10"
            />
            <span className="text-2xl">×</span>
            <input
              type="number"
              value={cols}
              onChange={(e) => {
                const newCols = Number(e.target.value);
                setCols(newCols);
                setMatrix(matrix.map(() => Array(newCols).fill(0)));
                setResult(null);
              }}
              className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              min="1"
              max="10"
            />
          </div>
        </div>
        <div>
          <label className="block text-blue-200 mb-2">Enter Matrix:</label>
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
            {matrix.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  type="number"
                  value={cell === 0 ? '' : cell}
                  onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                  className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
                />
              ))
            )}
          </div>
        </div>
        <button
          onClick={calculateRREF}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Calculate RREF
        </button>
        
        {result && (
          <div className="mt-4 p-4 bg-white bg-opacity-10 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-200">RREF Result:</h3>
            <div className="flex justify-center">
              <div className="relative">
                {/* Left bracket */}
                <div className="absolute top-0 bottom-0 left-0 w-2 border-t-2 border-b-2 border-l-2 border-blue-300"></div>
                
                {/* Matrix content */}
                <div className="grid gap-2 px-4 py-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                  {result.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                      <div key={`result-${rowIndex}-${colIndex}`} className="p-2 text-center">
                        {cell.toFixed(2)}
                      </div>
                    ))
                  )}
                </div>
                
                {/* Right bracket */}
                <div className="absolute top-0 bottom-0 right-0 w-2 border-t-2 border-b-2 border-r-2 border-blue-300"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-4 text-blue-200">Understanding RREF</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          The Reduced Row Echelon Form (RREF) is a standardized form of a matrix that provides crucial insights into the properties and solutions of linear systems. It's an essential concept in linear algebra with wide-ranging applications in mathematics, physics, and engineering.
        </p>
        <h3 className="text-2xl font-semibold mb-2 text-blue-200">Key Properties of RREF:</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
          <li>The first non-zero element in each row (the leading coefficient) is 1.</li>
          <li>Each leading coefficient is the only non-zero entry in its column.</li>
          <li>Each leading coefficient is to the right of the leading coefficient in the row above it.</li>
          <li>Rows consisting of only zeros are at the bottom of the matrix.</li>
        </ul>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Our RREF Calculator uses the Gaussian elimination algorithm to transform any input matrix into its unique RREF. This process involves a series of elementary row operations: scaling, addition, and swapping of rows.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-semibold mb-4 text-blue-200">Applications of RREF</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          The RREF Calculator is an invaluable tool for various mathematical and practical applications:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
          <li>Solving systems of linear equations</li>
          <li>Determining the rank of a matrix</li>
          <li>Finding the null space and column space of a matrix</li>
          <li>Inverting matrices</li>
          <li>Analyzing linear transformations</li>
        </ul>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          By using our RREF Calculator, you can quickly obtain the simplified form of your matrix, saving time and reducing the chance of computational errors in your linear algebra work.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-400 text-lg">
        <p>© 2024 RREF Calculator. All rights reserved.</p>
        <p>Simplifying matrix operations for better understanding 📊</p>
      </footer>
    </div>
  );
}