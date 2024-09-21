// components/Calculators/JacobianCalculator.tsx

'use client';

import React, { useState } from 'react';
import Algebrite from 'algebrite';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const JacobianCalculator = () => {
  const [functions, setFunctions] = useState<string[]>(['x^2 + y^2', 'e^x * sin(y)']);
  const [variables, setVariables] = useState<string[]>(['x', 'y']);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const handleFunctionChange = (index: number, value: string) => {
    const newFunctions = [...functions];
    newFunctions[index] = value;
    setFunctions(newFunctions);
  };

  const handleVariableChange = (index: number, value: string) => {
    const newVariables = [...variables];
    newVariables[index] = value;
    setVariables(newVariables);
  };

  const addFunction = () => {
    setFunctions([...functions, '']);
  };

  const addVariable = () => {
    setVariables([...variables, '']);
  };

  const removeFunction = (index: number) => {
    const newFunctions = functions.filter((_, i) => i !== index);
    setFunctions(newFunctions);
  };

  const removeVariable = (index: number) => {
    const newVariables = variables.filter((_, i) => i !== index);
    setVariables(newVariables);
  };

  const calculateJacobian = () => {
    setError('');
    setResult(null);

    if (functions.length === 0 || variables.length === 0) {
      setError('Please enter at least one function and one variable.');
      return;
    }

    try {
      const jacobianMatrix: string[][] = [];

      for (let i = 0; i < functions.length; i++) {
        const row: string[] = [];
        for (let j = 0; j < variables.length; j++) {
          const func = functions[i].trim();
          const variable = variables[j].trim();
          if (func === '' || variable === '') {
            throw new Error('Functions and variables cannot be empty.');
          }

          // Use Algebrite to compute the derivative
          const derivative = Algebrite.derivative(Algebrite.parse(func), Algebrite.parse(variable));
          const simplifiedDerivative = Algebrite.simplify(derivative);
          
          // Convert to LaTeX manually if toTeX is not available
          let latexResult;
          if (typeof Algebrite.toTeX === 'function') {
            latexResult = Algebrite.toTeX(simplifiedDerivative);
          } else {
            latexResult = simplifiedDerivative.toString();
            // Basic LaTeX conversions
            latexResult = latexResult.replace(/\*/g, '\\cdot ');
            latexResult = latexResult.replace(/exp/g, '\\exp');
            latexResult = latexResult.replace(/sin/g, '\\sin');
            latexResult = latexResult.replace(/cos/g, '\\cos');
            latexResult = latexResult.replace(/tan/g, '\\tan');
            latexResult = latexResult.replace(/log/g, '\\log');
            latexResult = latexResult.replace(/sqrt/g, '\\sqrt');
            latexResult = latexResult.replace(/pi/g, '\\pi');
          }
          
          row.push(latexResult);
        }
        jacobianMatrix.push(row);
      }

      // Format the Jacobian matrix for display
      const formattedMatrix = `\\begin{bmatrix} ${jacobianMatrix.map(row => row.join(' & ')).join('\\\\ ')} \\end{bmatrix}`;

      setResult(formattedMatrix);
    } catch (err: any) {
      setError(err.message || 'An error occurred while calculating the Jacobian.');
    }
  };

  const handleReset = () => {
    setFunctions(['x^2 + y^2', 'e^x * sin(y)']);
    setVariables(['x', 'y']);
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">
        Jacobian Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Compute the Jacobian Matrix</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Enter your functions and variables to calculate the Jacobian matrix.
        </p>
        <p className="text-md text-gray-600 mb-4 leading-relaxed text-center">
          Note: Use * for multiplication (e.g., 2*x instead of 2x).
        </p>
      </section>

      <div className="space-y-6">
        {/* Functions Input */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Functions:</label>
          {functions.map((func, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={func}
                onChange={(e) => handleFunctionChange(index, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={`f${index + 1}(...)`}
              />
              {functions.length > 1 && (
                <button
                  onClick={() => removeFunction(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                  aria-label="Remove Function"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addFunction}
            className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded-lg"
          >
            Add Function
          </button>
        </div>

        {/* Variables Input */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Variables:</label>
          {variables.map((variable, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={variable}
                onChange={(e) => handleVariableChange(index, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={`x${index + 1}`}
              />
              {variables.length > 1 && (
                <button
                  onClick={() => removeVariable(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                  aria-label="Remove Variable"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addVariable}
            className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded-lg"
          >
            Add Variable
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600">{error}</p>}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={calculateJacobian}
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

        {/* Result Display */}
        {result && (
          <div className="bg-indigo-50 p-6 rounded-lg mt-6 border border-indigo-200">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Jacobian Matrix</h3>
            <BlockMath math={`J = ${result}`} />
          </div>
        )}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600 text-center">
          Understanding the Jacobian Matrix
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          The Jacobian matrix represents all first-order partial derivatives of a vector-valued function. It's fundamental in vector calculus, especially in transformations and optimization problems.
        </p>
        <h3 className="text-xl font-semibold mb-2">Example</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Consider the functions:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <InlineMath math={`f_1(x, y) = x^2 + y^2`} />
          <br />
          <InlineMath math={`f_2(x, y) = e^x * \\sin(y)`} />
        </div>
        <p className="text-lg text-gray-700 my-4 leading-relaxed text-center">
          The Jacobian matrix is:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <BlockMath math={`J = \\begin{bmatrix} 2x & 2y \\\\ e^x * \\sin(y) & e^x * \\cos(y) \\end{bmatrix}`} />
        </div>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Jacobian Calculator. All rights reserved.</p>
        <p>Enhancing your mathematical understanding one calculation at a time 📈</p>
      </footer>
    </div>
  );
};

export default JacobianCalculator;