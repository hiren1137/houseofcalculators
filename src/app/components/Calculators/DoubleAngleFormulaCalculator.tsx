'use client';

import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const DoubleAngleFormulaCalculator = () => {
  const [angle, setAngle] = useState<string>('');
  const [unit, setUnit] = useState<'degrees' | 'radians'>('degrees');
  const [results, setResults] = useState<{
    sin2A: number | null;
    cos2A: number | null;
    tan2A: number | string | null;
  }>({ sin2A: null, cos2A: null, tan2A: null });
  const [error, setError] = useState<string>('');

  const calculateDoubleAngleValues = () => {
    setError('');
    setResults({ sin2A: null, cos2A: null, tan2A: null });

    const angleNum = parseFloat(angle);

    if (isNaN(angleNum)) {
      setError('Please enter a valid numerical value for the angle.');
      return;
    }

    // Convert angle to radians if necessary
    const angleInRadians = unit === 'degrees' ? (angleNum * Math.PI) / 180 : angleNum;

    // Calculate double angle values
    const sin2A = Math.sin(2 * angleInRadians);
    const cos2A = Math.cos(2 * angleInRadians);
    let tan2A: number | string | null;

    // Set a small threshold epsilon to determine if cos(2A) is effectively zero
    const epsilon = 1e-10;

    if (Math.abs(cos2A) < epsilon) {
      tan2A = 'undefined';
    } else {
      tan2A = Math.tan(2 * angleInRadians);
    }

    setResults({ sin2A, cos2A, tan2A });
  };

  const handleReset = () => {
    setAngle('');
    setResults({ sin2A: null, cos2A: null, tan2A: null });
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">
        Double Angle Formula Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Calculate Double Angle Trigonometric Values
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Enter an angle to compute the double angle values for sine, cosine, and tangent using the
          double angle formulas.
        </p>
      </section>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Angle:</label>
          <input
            type="number"
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., 45"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Unit:</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as 'degrees' | 'radians')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="degrees">Degrees</option>
            <option value="radians">Radians</option>
          </select>
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex space-x-4">
          <button
            onClick={calculateDoubleAngleValues}
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

        {results.sin2A !== null && results.cos2A !== null && (
          <div className="bg-indigo-50 p-6 rounded-lg mt-6 border border-indigo-200">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Results</h3>
            <p className="text-lg text-gray-800 mb-2">
              <InlineMath math={`\\sin(2A) = ${results.sin2A.toFixed(4)}`} />
            </p>
            <p className="text-lg text-gray-800 mb-2">
              <InlineMath math={`\\cos(2A) = ${results.cos2A.toFixed(4)}`} />
            </p>
            {results.tan2A === 'undefined' ? (
              <p className="text-lg text-gray-800">
                <InlineMath math="\\tan(2A) \\text{ is undefined}" />
              </p>
            ) : results.tan2A !== null ? (
              <p className="text-lg text-gray-800">
                <InlineMath math={`\\tan(2A) = ${Number(results.tan2A).toFixed(4)}`} />
              </p>
            ) : null}
          </div>
        )}
      </div>

      {/* Content Below the Calculator */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-600">
          Understanding the Double Angle Formulas
        </h2>

        <h3 className="text-xl font-semibold mb-4">Introduction</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The double angle formulas are trigonometric identities that express trigonometric functions
          of double angles (like <InlineMath math="2A" />) in terms of single angles (like{' '}
          <InlineMath math="A" />). These formulas are useful in simplifying trigonometric expressions
          and solving trigonometric equations.
        </p>

        <h3 className="text-xl font-semibold mb-4">Double Angle Formulas</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The primary double angle formulas are:
        </p>

        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>
            <strong>Sine Double Angle Formula:</strong>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <BlockMath math="\sin(2A) = 2\sin A \cos A" />
            </div>
          </li>
          <li>
            <strong>Cosine Double Angle Formulas:</strong>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <BlockMath math="\cos(2A) = \cos^2 A - \sin^2 A" />
              <BlockMath math="= 2\cos^2 A - 1" />
              <BlockMath math="= 1 - 2\sin^2 A" />
            </div>
          </li>
          <li>
            <strong>Tangent Double Angle Formula:</strong>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <BlockMath math="\tan(2A) = \dfrac{2\tan A}{1 - \tan^2 A}" />
            </div>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-4">Deriving the Formulas</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The double angle formulas can be derived from the sum formulas for sine, cosine, and tangent
          by setting the two angles equal to each other.
        </p>

        <h4 className="text-lg font-semibold mb-2">Sine Double Angle Formula</h4>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">Starting from the sine sum formula:</p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <BlockMath math="\sin(A + B) = \sin A \cos B + \cos A \sin B" />
        </div>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Setting <InlineMath math="B = A" />, we get:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <BlockMath math="\sin(2A) = 2\sin A \cos A" />
        </div>

        <h4 className="text-lg font-semibold mb-2">Cosine Double Angle Formula</h4>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Starting from the cosine sum formula:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <BlockMath math="\cos(A + B) = \cos A \cos B - \sin A \sin B" />
        </div>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Setting <InlineMath math="B = A" />, we get:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <BlockMath math="\cos(2A) = \cos^2 A - \sin^2 A" />
        </div>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Using the Pythagorean identity <InlineMath math="\sin^2 A + \cos^2 A = 1" />, we can derive
          alternative forms:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <BlockMath math="\cos(2A) = 2\cos^2 A - 1" />
          <BlockMath math="\cos(2A) = 1 - 2\sin^2 A" />
        </div>

        <h4 className="text-lg font-semibold mb-2">Tangent Double Angle Formula</h4>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Starting from the tangent sum formula:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <BlockMath math="\tan(A + B) = \dfrac{\tan A + \tan B}{1 - \tan A \tan B}" />
        </div>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Setting <InlineMath math="B = A" />, we get:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <BlockMath math="\tan(2A) = \dfrac{2\tan A}{1 - \tan^2 A}" />
        </div>

        <h3 className="text-xl font-semibold mb-4">Example Calculation</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Let's calculate the double angle values for <InlineMath math="A = 45^\circ" />.
        </p>
        <ul className="list-decimal list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>
            <p>
              <strong>Step 1:</strong> Convert the angle to radians (if necessary):{' '}
              <InlineMath math="45^\circ = \dfrac{\pi}{4} \text{ radians}" />
            </p>
          </li>
          <li>
            <p>
              <strong>Step 2:</strong> Calculate <InlineMath math="\sin(2A)" />:{' '}
              <InlineMath math="\sin(90^\circ) = \sin\left(\dfrac{\pi}{2}\right) = 1" />
            </p>
          </li>
          <li>
            <p>
              <strong>Step 3:</strong> Calculate <InlineMath math="\cos(2A)" />:{' '}
              <InlineMath math="\cos(90^\circ) = \cos\left(\dfrac{\pi}{2}\right) = 0" />
            </p>
          </li>
          <li>
            <p>
              <strong>Step 4:</strong> Determine <InlineMath math="\tan(2A)" />
            </p>
            <p>
              Since <InlineMath math="\cos(90^\circ) = 0" />, <InlineMath math="\tan(90^\circ)" /> is
              undefined.
            </p>
          </li>
        </ul>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          So, we have:{' '}
          <InlineMath math="\sin(90^\circ) = 1, \quad \cos(90^\circ) = 0, \quad \tan(90^\circ) \text{ is undefined}" />
        </p>

        <h3 className="text-xl font-semibold mb-4">
          Why is <InlineMath math="\tan(2A)" /> Undefined for Certain Angles?
        </h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          When <InlineMath math="\cos(2A) = 0" />, the expression for <InlineMath math="\tan(2A)" />{' '}
          becomes undefined because division by zero is not possible. This occurs when{' '}
          <InlineMath math="2A" /> is an odd multiple of <InlineMath math="90^\circ" /> (or{' '}
          <InlineMath math="\dfrac{\pi}{2}" /> radians). In such cases, <InlineMath math="\tan(2A)" />{' '}
          approaches infinity, and we consider it undefined.
        </p>

        <h3 className="text-xl font-semibold mb-4">Applications of Double Angle Formulas</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Double angle formulas are widely used in trigonometry, calculus, and physics. They help in
          simplifying expressions, solving integrals, and analyzing wave functions. Some common
          applications include:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>Simplifying trigonometric expressions.</li>
          <li>Solving trigonometric equations.</li>
          <li>Evaluating integrals in calculus.</li>
          <li>Analyzing alternating current (AC) circuits in physics.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>

        <h4 className="text-lg font-semibold mb-2">
          1. Why are there multiple forms of the cosine double angle formula?
        </h4>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The cosine double angle formula has multiple forms due to the Pythagorean identity{' '}
          <InlineMath math="\sin^2 A + \cos^2 A = 1" />. By substituting{' '}
          <InlineMath math="\sin^2 A = 1 - \cos^2 A" /> or{' '}
          <InlineMath math="\cos^2 A = 1 - \sin^2 A" />, we derive alternative expressions that can be
          more convenient depending on the problem.
        </p>

        <h4 className="text-lg font-semibold mb-2">
          2. Can the double angle formulas be used for any angle?
        </h4>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Yes, the double angle formulas are valid for all real angles. However, care must be taken with
          tangent when the denominator in the formula becomes zero, as this would make the expression
          undefined.
        </p>

        <h4 className="text-lg font-semibold mb-2">
          3. How do double angle formulas help in integration?
        </h4>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          In calculus, double angle formulas can simplify integrals involving trigonometric functions by
          reducing the powers or transforming products into sums, making the integrals more manageable.
        </p>

        <h3 className="text-xl font-semibold mb-4">Conclusion</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The double angle formulas are essential tools in trigonometry, providing valuable relationships
          between trigonometric functions of single and double angles. Understanding and applying these
          formulas can simplify complex trigonometric problems and aid in various fields such as physics
          and engineering.
        </p>

        <h3 className="text-xl font-semibold mb-4">Try It Yourself</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Use the calculator above to compute double angle values for different angles. Experiment with
          both degrees and radians to enhance your understanding of trigonometric functions and their
          properties.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Double Angle Formula Calculator. All rights reserved.</p>
        <p>Empowering your trigonometry calculations 🧮</p>
      </footer>
    </div>
  );
};

export default DoubleAngleFormulaCalculator;