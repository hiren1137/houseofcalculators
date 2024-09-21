// components/Calculators/NullSpaceCalculator.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

/**
 * Converts a matrix to its Reduced Row-Echelon Form (RREF).
 * @param {number[][]} matrix - The input matrix.
 * @returns {number[][]} - The RREF of the matrix.
 */
const toRREF = (matrix: number[][]): number[][] => {
  const numRows = matrix.length;
  const numCols = matrix[0].length;
  let lead = 0;
  const tol = 1e-10; // Tolerance for floating point comparisons

  for (let r = 0; r < numRows; r++) {
    if (lead >= numCols) break;
    let i = r;
    while (Math.abs(matrix[i][lead]) < tol) {
      i++;
      if (i === numRows) {
        i = r;
        lead++;
        if (lead === numCols) return matrix;
      }
    }
    // Swap rows i and r
    [matrix[i], matrix[r]] = [matrix[r], matrix[i]];
    // Normalize row r
    const lv = matrix[r][lead];
    if (Math.abs(lv) > tol) {
      matrix[r] = matrix[r].map((value) => value / lv);
    }
    // Eliminate all other rows
    for (let j = 0; j < numRows; j++) {
      if (j !== r) {
        const lvJ = matrix[j][lead];
        matrix[j] = matrix[j].map((value, idx) => value - lvJ * matrix[r][idx]);
      }
    }
    lead++;
  }

  // Round small values to zero and ones to exactly 1
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (Math.abs(matrix[r][c] - 1) < tol) {
        matrix[r][c] = 1;
      } else if (Math.abs(matrix[r][c]) < tol) {
        matrix[r][c] = 0;
      }
    }
  }

  return matrix;
};

/**
 * Computes the null space of a given matrix.
 * @param {number[][]} matrix - The input matrix.
 * @returns {number[][]} - An array of basis vectors for the null space.
 */
const computeNullSpace = (matrix: number[][]): number[][] => {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  // Convert the matrix to RREF
  const rrefMatrix = toRREF(matrix.map((row) => [...row]));

  // Identify pivot columns
  const pivotCols: number[] = [];
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (rrefMatrix[r][c] === 1) {
        pivotCols.push(c);
        break;
      }
    }
  }

  // Identify free variables (columns not in pivotCols)
  const freeVars: number[] = [];
  for (let c = 0; c < numCols; c++) {
    if (!pivotCols.includes(c)) {
      freeVars.push(c);
    }
  }

  // If no free variables, the null space is trivial
  if (freeVars.length === 0) {
    return [];
  }

  // For each free variable, create a basis vector
  const basis: number[][] = freeVars.map((freeVar) => {
    const vec: number[] = Array(numCols).fill(0);
    vec[freeVar] = 1;
    // Set pivot variables based on RREF
    pivotCols.forEach((pivotCol, pivotRow) => {
      vec[pivotCol] = -rrefMatrix[pivotRow][freeVar];
    });
    return vec;
  });

  return basis;
};

const NullSpaceCalculator: React.FC = () => {
  const [rows, setRows] = useState<number>(2);
  const [cols, setCols] = useState<number>(2);
  const [matrix, setMatrix] = useState<string[][]>([
    ['', ''],
    ['', ''],
  ]);
  const [nullSpace, setNullSpace] = useState<number[][] | null>(null);
  const [error, setError] = useState<string>('');

  // Initialize matrix based on rows and columns
  const initializeMatrix = (newRows: number, newCols: number) => {
    const newMatrix: string[][] = [];
    for (let i = 0; i < newRows; i++) {
      const row: string[] = [];
      for (let j = 0; j < newCols; j++) {
        row.push('');
      }
      newMatrix.push(row);
    }
    setMatrix(newMatrix);
  };

  // Handle dimension changes
  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRows = parseInt(e.target.value);
    if (isNaN(newRows) || newRows <= 0) return;
    setRows(newRows);
    initializeMatrix(newRows, cols);
    setNullSpace(null);
    setError('');
  };

  const handleColsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCols = parseInt(e.target.value);
    if (isNaN(newCols) || newCols <= 0) return;
    setCols(newCols);
    initializeMatrix(rows, newCols);
    setNullSpace(null);
    setError('');
  };

  // Handle matrix element changes
  const handleMatrixChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    const value = e.target.value;
    const updatedMatrix = matrix.map((r, i) =>
      r.map((c, j) => {
        if (i === row && j === col) {
          return value;
        }
        return c;
      })
    );
    setMatrix(updatedMatrix);
    setNullSpace(null);
    setError('');
  };

  // Validate and parse the matrix
  const parseMatrix = (): number[][] => {
    const parsedMatrix: number[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < cols; j++) {
        const value = matrix[i][j].trim();
        if (value === '') {
          throw new Error(`Element at row ${i + 1}, column ${j + 1} is empty.`);
        }
        const num = parseFloat(value);
        if (isNaN(num)) {
          throw new Error(`Element at row ${i + 1}, column ${j + 1} is not a valid number.`);
        }
        row.push(num);
      }
      parsedMatrix.push(row);
    }
    return parsedMatrix;
  };

  // Calculate Null Space
  const calculateNullSpace = () => {
    setError('');
    setNullSpace(null);

    try {
      const parsedMatrix = parseMatrix();

      const ns = computeNullSpace(parsedMatrix);

      if (ns.length === 0) {
        setError('The null space is trivial (only the zero vector).');
        return;
      }

      // Round the basis vectors for better readability
      const nsRounded = ns.map((vec) => vec.map((val) => parseFloat(val.toFixed(6))));

      setNullSpace(nsRounded);
    } catch (err: any) {
      setError(err.message || 'An error occurred while computing the null space. Please check your matrix.');
      console.error(err);
    }
  };

  // Reset Function
  const handleReset = () => {
    setRows(2);
    setCols(2);
    setMatrix([
      ['', ''],
      ['', ''],
    ]);
    setNullSpace(null);
    setError('');
  };

  // Ensure matrix is correctly initialized on component mount
  useEffect(() => {
    initializeMatrix(rows, cols);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">Null Space Calculator</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Compute the Null Space of a Matrix</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Enter the dimensions and elements of a matrix to calculate its null space.
        </p>
      </section>

      <div className="space-y-6">
        {/* Matrix Dimensions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Number of Rows:</label>
            <input
              type="number"
              min="1"
              value={rows}
              onChange={handleRowsChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 2"
              aria-label="Number of Rows"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Number of Columns:</label>
            <input
              type="number"
              min="1"
              value={cols}
              onChange={handleColsChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 2"
              aria-label="Number of Columns"
            />
          </div>
        </div>

        {/* Matrix Input */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Matrix Elements:</label>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <tbody>
                {matrix.map((row, i) => (
                  <tr key={i}>
                    {row.map((val, j) => (
                      <td key={j} className="px-2 py-1">
                        <input
                          type="number"
                          value={val}
                          onChange={(e) => handleMatrixChange(e, i, j)}
                          className="w-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder={`a${i + 1}${j + 1}`}
                          aria-label={`Matrix element a${i + 1}${j + 1}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={calculateNullSpace}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Calculate
          </button>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Reset
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600">{error}</p>}

        {/* Result */}
        {nullSpace && (
          <div className="bg-indigo-50 p-6 rounded-lg mt-6 border border-indigo-200">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Null Space Basis Vectors</h3>
            {nullSpace.map((vec, index) => (
              <p key={index} className="text-lg text-gray-800 font-mono mt-2">
                Vector {index + 1}: <InlineMath math={`\\begin{bmatrix} ${vec.join(', ')} \\end{bmatrix}^T`} />
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Explanation Section */}
<section className="mt-12 prose prose-indigo max-w-none">
  <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Understanding Null Space</h2>
  <p className="text-lg text-gray-700 mb-4 leading-relaxed">
    The null space of a matrix \( A \) consists of all vectors \( x \) that satisfy the equation:
  </p>
  <div className="bg-gray-100 p-4 rounded-lg text-center">
    <InlineMath math="A \cdot x = 0" />
  </div>
  <p className="text-lg text-gray-700 my-4 leading-relaxed">
    Finding the null space is crucial for understanding the solutions to homogeneous systems of linear equations. It helps in determining the linear dependencies among the columns of the matrix.
  </p>

  <h3 className="text-xl font-semibold mb-2">Calculating the Null Space</h3>
  <p className="text-lg text-gray-700 mb-4 leading-relaxed">
    To calculate the null space of a matrix, follow these steps:
  </p>
  <ol className="list-decimal list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
    <li>Convert the matrix to Reduced Row Echelon Form (RREF). You can use our <a href="https://www.houseofcalculators.com/rref-calculator" className="text-indigo-600 hover:text-indigo-800">RREF Calculator</a> for this step.</li>
    <li>Identify the free variables (columns without leading 1's in the RREF).</li>
    <li>Express the basic variables in terms of the free variables.</li>
    <li>Create basis vectors for the null space by setting each free variable to 1 (with others at 0) and solving for the basic variables.</li>
  </ol>

  <h3 className="text-xl font-semibold mb-2">Interpreting the Results</h3>
  <p className="text-lg text-gray-700 mb-4 leading-relaxed">
    When you use this null space calculator:
  </p>
  <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
    <li>If the result is empty, the null space is trivial (contains only the zero vector).</li>
    <li>If one or more vectors are returned, these form a basis for the null space. Any linear combination of these vectors will also be in the null space.</li>
    <li>The number of basis vectors gives the nullity of the matrix, which is the dimension of the null space.</li>
  </ul>

  <h3 className="text-xl font-semibold mb-2">Applications</h3>
  <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
    <li>Solving homogeneous systems of linear equations.</li>
    <li>Understanding linear transformations and their properties.</li>
    <li>Analyzing the structure of linear operators in quantum mechanics.</li>
    <li>Optimizing processes in control theory and systems engineering.</li>
    <li>Solving underdetermined systems in data compression and image processing.</li>
  </ul>

  <h3 className="text-xl font-semibold mb-2">Relation to Other Concepts</h3>
  <p className="text-lg text-gray-700 mb-4 leading-relaxed">
    The null space is closely related to other important concepts in linear algebra:
  </p>
  <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
    <li>Rank: The nullity of a matrix plus its rank equals the number of columns (Rank-Nullity theorem).</li>
    <li>Column Space: The null space of A<sup>T</sup> (transpose of A) is the orthogonal complement of the column space of A.</li>
    <li>Eigenspaces: The null space of (A - λI) is the eigenspace of A corresponding to the eigenvalue λ.</li>
  </ul>

  <p className="text-lg text-gray-700 mt-4 leading-relaxed">
    Understanding the null space and its properties is essential for a deep comprehension of linear algebra and its applications in various fields of science and engineering.
  </p>
</section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Null Space Calculator. All rights reserved.</p>
        <p>Enhancing your mathematical understanding one calculation at a time 📈</p>
      </footer>
    </div>
  );
};

export default NullSpaceCalculator;