'use client';

import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const CircumcenterCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<{
    X1: string;
    Y1: string;
    X2: string;
    Y2: string;
    X3: string;
    Y3: string;
  }>({
    X1: '',
    Y1: '',
    X2: '',
    Y2: '',
    X3: '',
    Y3: '',
  });

  const [results, setResults] = useState<{
    circumcenter: { x: number | null; y: number | null };
    circumradius: number | null;
  }>({
    circumcenter: { x: null, y: null },
    circumradius: null,
  });

  const [error, setError] = useState<string>('');

  // Typed event parameter
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateCircumcenter = () => {
    setError('');
    setResults({
      circumcenter: { x: null, y: null },
      circumradius: null,
    });

    const x1 = parseFloat(inputs.X1);
    const y1 = parseFloat(inputs.Y1);
    const x2 = parseFloat(inputs.X2);
    const y2 = parseFloat(inputs.Y2);
    const x3 = parseFloat(inputs.X3);
    const y3 = parseFloat(inputs.Y3);

    // Validate inputs
    if (
      isNaN(x1) ||
      isNaN(y1) ||
      isNaN(x2) ||
      isNaN(y2) ||
      isNaN(x3) ||
      isNaN(y3)
    ) {
      setError('Please enter valid numerical values for all coordinates.');
      return;
    }

    // Calculate the determinant
    const D =
      2 *
      (x1 * (y2 - y3) +
        x2 * (y3 - y1) +
        x3 * (y1 - y2));

    if (D === 0) {
      setError('The points are colinear; no circumcircle exists.');
      return;
    }

    // Calculate Ux
    const Ux =
      ((x1 ** 2 + y1 ** 2) * (y2 - y3) +
        (x2 ** 2 + y2 ** 2) * (y3 - y1) +
        (x3 ** 2 + y3 ** 2) * (y1 - y2)) /
      D;

    // Calculate Uy
    const Uy =
      ((x1 ** 2 + y1 ** 2) * (x3 - x2) +
        (x2 ** 2 + y2 ** 2) * (x1 - x3) +
        (x3 ** 2 + y3 ** 2) * (x2 - x1)) /
      D;

    // Calculate circumradius
    const R = Math.sqrt((Ux - x1) ** 2 + (Uy - y1) ** 2);

    setResults({
      circumcenter: { x: Ux, y: Uy },
      circumradius: R,
    });
  };

  const handleReset = () => {
    setInputs({
      X1: '',
      Y1: '',
      X2: '',
      Y2: '',
      X3: '',
      Y3: '',
    });
    setResults({
      circumcenter: { x: null, y: null },
      circumradius: null,
    });
    setError('');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">
        Circumcenter Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Calculate the Circumcenter of a Triangle
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Enter the coordinates of the three vertices of a triangle to compute the circumcenter and circumradius.
        </p>
      </section>

      <div className="space-y-6">
        {/* Simplified Single Column Input Fields */}
        <div className="flex flex-col space-y-4">
          {/* X1 */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">X₁:</label>
            <input
              type="number"
              name="X1"
              value={inputs.X1}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 0"
            />
          </div>

          {/* Y1 */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Y₁:</label>
            <input
              type="number"
              name="Y1"
              value={inputs.Y1}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 0"
            />
          </div>

          {/* X2 */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">X₂:</label>
            <input
              type="number"
              name="X2"
              value={inputs.X2}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 4"
            />
          </div>

          {/* Y2 */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Y₂:</label>
            <input
              type="number"
              name="Y2"
              value={inputs.Y2}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 0"
            />
          </div>

          {/* X3 */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">X₃:</label>
            <input
              type="number"
              name="X3"
              value={inputs.X3}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 0"
            />
          </div>

          {/* Y3 */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Y₃:</label>
            <input
              type="number"
              name="Y3"
              value={inputs.Y3}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 3"
            />
          </div>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <div className="flex space-x-4">
          <button
            onClick={calculateCircumcenter}
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

        {results.circumcenter.x !== null &&
          results.circumcenter.y !== null &&
          results.circumradius !== null && (
            <div className="bg-indigo-50 p-6 rounded-lg mt-6 border border-indigo-200">
              <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Results</h3>
              <p className="text-lg text-gray-800 mb-2">
                <InlineMath math={`\\text{Circumcenter } (U_x, U_y) = (${results.circumcenter.x.toFixed(4)}, ${results.circumcenter.y.toFixed(4)})`} />
              </p>
              <p className="text-lg text-gray-800">
                <InlineMath math={`\\text{Circumradius } R = ${results.circumradius.toFixed(4)}`} />
              </p>
            </div>
          )}
      </div>

      {/* Content Below the Calculator */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-600">
          Understanding the Circumcenter of a Triangle
        </h2>

        <h3 className="text-xl font-semibold mb-4">Introduction</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          In a triangle, the <strong>circumcenter</strong> is the point where the perpendicular bisectors of the sides intersect. It is the center of the <strong>circumcircle</strong>, the circle that passes through all three vertices of the triangle.
        </p>

        <h3 className="text-xl font-semibold mb-4">Circumcenter Properties</h3>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>The circumcenter is equidistant from all three vertices of the triangle.</li>
          <li>
            Depending on the type of triangle, the circumcenter can lie inside, on, or outside the triangle:
            <ul className="list-disc list-inside ml-6">
              <li><strong>Acute Triangle:</strong> Circumcenter is inside the triangle.</li>
              <li><strong>Right Triangle:</strong> Circumcenter is at the midpoint of the hypotenuse.</li>
              <li><strong>Obtuse Triangle:</strong> Circumcenter is outside the triangle.</li>
            </ul>
          </li>
          <li>
            The circumradius is the radius of the circumcircle and can be calculated using the formula:
            <div className="bg-gray-100 p-4 rounded-lg text-center mt-2">
              <BlockMath math="R = \\dfrac{a \cdot b \cdot c}{4 \cdot \text{Area}}" />
            </div>
            where <InlineMath math="a, b, c" /> are the lengths of the sides of the triangle.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-4">Calculating the Circumcenter</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          To find the circumcenter of a triangle given three points <InlineMath math="A(x_1, y_1)" />, <InlineMath math="B(x_2, y_2)" />, and <InlineMath math="C(x_3, y_3)" />, follow these steps:
        </p>

        <ol className="list-decimal list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>
            <strong>Find the Midpoints:</strong>
            <p>
              Calculate the midpoints of at least two sides of the triangle.
              <div className="bg-gray-100 p-4 rounded-lg text-center mt-2">
                <BlockMath math="\text{Midpoint of AB} = \left( \\dfrac{x_1 + x_2}{2}, \\dfrac{y_1 + y_2}{2} \\right)" />
              </div>
            </p>
          </li>
          <li>
            <strong>Determine the Slopes:</strong>
            <p>
              Find the slopes of these sides.
              <div className="bg-gray-100 p-4 rounded-lg text-center mt-2">
                <BlockMath math="m_{AB} = \\dfrac{y_2 - y_1}{x_2 - x_1}" />
              </div>
            </p>
          </li>
          <li>
            <strong>Find Perpendicular Bisectors:</strong>
            <p>
              Calculate the slopes of the perpendicular bisectors (negative reciprocals) and use the midpoints to write their equations.
              <div className="bg-gray-100 p-4 rounded-lg text-center mt-2">
                <BlockMath math="m_{\perp AB} = -\\dfrac{1}{m_{AB}}" />
              </div>
            </p>
          </li>
          <li>
            <strong>Find the Intersection:</strong>
            <p>
              Solve the equations of the perpendicular bisectors to find their point of intersection, which is the circumcenter.
            </p>
          </li>
        </ol>

        <h3 className="text-xl font-semibold mb-4">Example Calculation</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Let's calculate the circumcenter for the triangle with vertices at <InlineMath math="A(0, 0)" />, <InlineMath math="B(4, 0)" />, and <InlineMath math="C(0, 3)" />.
        </p>
        <ul className="list-decimal list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>
            <strong>Step 1:</strong> Find the midpoints of sides AB and AC.
            <div className="bg-gray-100 p-4 rounded-lg text-center mt-2">
              <BlockMath math="\text{Midpoint of AB} = (2, 0)" />
              <BlockMath math="\text{Midpoint of AC} = (0, 1.5)" />
            </div>
          </li>
          <li>
            <strong>Step 2:</strong> Determine the slopes of AB and AC.
            <div className="bg-gray-100 p-4 rounded-lg text-center mt-2">
              <BlockMath math="m_{AB} = 0" />
              <BlockMath math="m_{AC} = \\infty" />
            </div>
          </li>
          <li>
            <strong>Step 3:</strong> Find the slopes of the perpendicular bisectors.
            <div className="bg-gray-100 p-4 rounded-lg text-center mt-2">
              <BlockMath math="m_{\perp AB} = \\infty" />
              <BlockMath math="m_{\perp AC} = 0" />
            </div>
          </li>
          <li>
            <strong>Step 4:</strong> Write the equations of the perpendicular bisectors.
            <div className="bg-gray-100 p-4 rounded-lg text-center mt-2">
              <BlockMath math="x = 2" />
              <BlockMath math="y = 1.5" />
            </div>
          </li>
          <li>
            <strong>Step 5:</strong> Find the intersection point.
            <div className="bg-gray-100 p-4 rounded-lg text-center mt-2">
              <BlockMath math="(U_x, U_y) = (2, 1.5)" />
            </div>
          </li>
          <li>
            <strong>Step 6:</strong> Calculate the circumradius.
            <div className="bg-gray-100 p-4 rounded-lg text-center mt-2">
              <BlockMath math="R = \\sqrt{(2 - 0)^2 + (1.5 - 0)^2} = \\sqrt{4 + 2.25} = \\sqrt{6.25} = 2.5" />
            </div>
          </li>
        </ul>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Therefore, the circumcenter is at <InlineMath math="(2, 1.5)" />, and the circumradius is <InlineMath math="2.5" /> units.
        </p>

        <h3 className="text-xl font-semibold mb-4">Why is the Circumcenter Important?</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The circumcenter plays a crucial role in various geometric constructions and proofs. It is used in:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>Constructing the circumcircle of a triangle.</li>
          <li>Solving geometric problems involving triangle centers.</li>
          <li>Applications in engineering and physics where precise geometric calculations are required.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>

        <h4 className="text-lg font-semibold mb-2">
          1. Can the circumcenter lie outside the triangle?
        </h4>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Yes, the circumcenter lies outside the triangle if and only if the triangle is obtuse.
        </p>

        <h4 className="text-lg font-semibold mb-2">
          2. How does the circumradius relate to the triangle's sides?
        </h4>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The circumradius can be calculated using the formula:
          <div className="bg-gray-100 p-4 rounded-lg text-center mt-2">
            <BlockMath math="R = \\dfrac{a \cdot b \cdot c}{4 \cdot \text{Area}}" />
          </div>
          where <InlineMath math="a, b, c" /> are the lengths of the triangle's sides, and <InlineMath math="\text{Area}" /> is the area of the triangle.
        </p>

        <h4 className="text-lg font-semibold mb-2">
          3. What happens if the three points are colinear?
        </h4>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          If the three points are colinear, no unique circumcircle exists, and hence the circumcenter is undefined.
        </p>

        <h3 className="text-xl font-semibold mb-4">Conclusion</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The circumcenter is a fundamental concept in triangle geometry, providing essential information about the triangle's properties and its circumcircle. Understanding how to calculate and interpret the circumcenter can enhance your comprehension of geometric principles and their applications.
        </p>

        <h3 className="text-xl font-semibold mb-4">Try It Yourself</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Use the calculator above to compute the circumcenter and circumradius for different sets of points. Experiment with various triangles to see how the circumcenter's position changes relative to the triangle's type.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Circumcenter Calculator. All rights reserved.</p>
        <p>Empowering your geometric calculations 📐</p>
      </footer>
    </div>
  );
};

export default CircumcenterCalculator;