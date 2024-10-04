'use client';

import React, { useState } from 'react';

export default function CartesianToPolarCalculator() {
  const [xValue, setXValue] = useState('');
  const [yValue, setYValue] = useState('');
  const [radius, setRadius] = useState<number | null>(null);
  const [angle, setAngle] = useState<number | null>(null);

  const calculatePolarCoordinates = () => {
    const x = parseFloat(xValue);
    const y = parseFloat(yValue);

    if (isNaN(x) || isNaN(y)) {
      alert('Please enter valid numerical values for x and y.');
      return;
    }

    const r = Math.sqrt(x * x + y * y);
    let theta = Math.atan2(y, x) * (180 / Math.PI); // Convert radians to degrees

    // Ensure theta is between 0 and 360 degrees
    if (theta < 0) {
      theta += 360;
    }

    setRadius(Math.round(r * 10000) / 10000); // Round to four decimal places
    setAngle(Math.round(theta * 10000) / 10000);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-md text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-center text-green-600">
        Cartesian to Polar Calculator
      </h1>
      <p className="text-lg text-center mb-6">
        Convert Cartesian (x, y) coordinates to Polar (r, θ) coordinates.
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-semibold">Enter x-value:</label>
            <input
              type="number"
              value={xValue}
              onChange={(e) => setXValue(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 3"
              step="any"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Enter y-value:</label>
            <input
              type="number"
              value={yValue}
              onChange={(e) => setYValue(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 4"
              step="any"
            />
          </div>
        </div>
        <button
          onClick={calculatePolarCoordinates}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300"
        >
          Calculate Polar Coordinates
        </button>

        {radius !== null && angle !== null && (
          <div className="mt-4 p-6 bg-green-100 rounded-md shadow-inner">
            <h3 className="text-xl font-semibold mb-4 text-green-700">Polar Coordinates:</h3>
            <div className="flex items-center justify-around">
              <div className="text-center">
                <p className="text-lg font-medium">Radius (r)</p>
                <p className="text-2xl font-bold text-green-800 mt-2">{radius}</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">Angle (θ)</p>
                <p className="text-2xl font-bold text-green-800 mt-2">{angle}°</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Provided by You */}
      <article className="mt-12 text-gray-800">
        <p className="mb-6">
          Converting between Cartesian and polar coordinates is a fundamental task in mathematics,
          physics, and engineering. This guide will explore Cartesian to polar calculators, their
          importance, and how to use them effectively.
        </p>

        <h2 className="text-2xl font-semibold mb-4">What Are Cartesian and Polar Coordinates?</h2>

        <p className="mb-4">
          Before diving into the conversion process, let&apos;s briefly review these coordinate
          systems:
        </p>

        <p className="mb-4">
          <strong>Cartesian coordinates</strong> use two perpendicular axes (x and y) to define a
          point&apos;s position on a plane. For example, the point (3, 4) is 3 units along the
          x-axis and 4 units along the y-axis.
        </p>

        <p className="mb-4">
          <strong>Polar coordinates</strong> use a distance from the origin (r) and an angle from
          the positive x-axis (θ) to define a point&apos;s position. For instance, the point (5,
          53.13°) is 5 units from the origin at an angle of 53.13 degrees.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Why Use a Cartesian to Polar Calculator?</h2>

        <p className="mb-4">
          Converting between these coordinate systems manually can be time-consuming and error-prone.
          A Cartesian to polar calculator offers several benefits:
        </p>

        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Saves time and reduces errors</li>
          <li>Provides precise results, especially for complex calculations</li>
          <li>Allows for quick visualization of points in both systems</li>
          <li>Facilitates problem-solving in various fields like physics and engineering</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">How to Use a Cartesian to Polar Calculator</h2>

        <p className="mb-4">Most online Cartesian to polar calculators follow a similar process:</p>

        <ol className="list-decimal list-inside mb-6 space-y-2">
          <li>Enter the x-coordinate</li>
          <li>Enter the y-coordinate</li>
          <li>Click &quot;Calculate&quot; or &quot;Convert&quot;</li>
          <li>View the results in polar form (r, θ)</li>
        </ol>

        <p className="mb-4">
          Some calculators may offer additional features like step-by-step solutions or graphical
          representations. For a wide range of mathematical tools, including Cartesian to polar
          converters, explore our{' '}
          <a
            href="https://www.houseofcalculators.com/?category=Mathematics"
            className="text-green-600 underline"
          >
            comprehensive Mathematics calculator collection
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mb-4">The Conversion Formulas</h2>

        <p className="mb-4">
          For those interested in the mathematics behind the conversion, here are the formulas used:
        </p>

        <ol className="list-decimal list-inside mb-6 space-y-2">
          <li>
            To find <strong>r</strong> (radius): r = √(x² + y²)
          </li>
          <li>
            To find <strong>θ</strong> (angle): θ = arctan(y/x)
          </li>
        </ol>

        <p className="mb-4">
          Note that special considerations are needed for points in different quadrants to determine
          the correct angle.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          Applications of Cartesian to Polar Conversion
        </h2>

        <p className="mb-4">
          Understanding and converting between these coordinate systems is crucial in various fields:
        </p>

        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Physics</strong>: Describing circular motion and wave propagation
          </li>
          <li>
            <strong>Engineering</strong>: Analyzing rotational systems and antenna designs
          </li>
          <li>
            <strong>Computer Graphics</strong>: Creating circular patterns and rotations
          </li>
          <li>
            <strong>Navigation</strong>: Calculating distances and bearings
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Choosing the Right Calculator</h2>

        <p className="mb-4">
          When selecting a Cartesian to polar calculator, consider the following features:
        </p>

        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Accuracy of results</li>
          <li>User-friendly interface</li>
          <li>Additional functionalities (e.g., graphing, step-by-step solutions)</li>
          <li>Compatibility with your device or browser</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>

        <p className="mb-4">
          Cartesian to polar calculators are invaluable tools for students, professionals, and
          enthusiasts working with different coordinate systems. By understanding how these
          calculators work and when to use them, you can streamline your calculations and gain
          deeper insights into spatial relationships.
        </p>

        <p className="mb-4">
          For hands-on practice, try using an online Cartesian to polar calculator with various input
          values to familiarize yourself with the conversion process and results.
        </p>
      </article>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>© 2024 Cartesian to Polar Calculator. All rights reserved.</p>
        <p>Simplifying your coordinate conversions.</p>
      </footer>
    </div>
  );
}
