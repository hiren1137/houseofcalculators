"use client";

import React, { useState } from 'react';

const BoardFootCalculator = () => {
  const [length, setLength] = useState('');
  const [lengthUnit, setLengthUnit] = useState('inches');
  const [width, setWidth] = useState('');
  const [widthUnit, setWidthUnit] = useState('inches');
  const [thickness, setThickness] = useState('');
  const [thicknessUnit, setThicknessUnit] = useState('inches');
  const [pieces, setPieces] = useState('1');
  const [waste, setWaste] = useState('0');
  const [price, setPrice] = useState('');
  const [result, setResult] = useState<{ boardFeet: string; totalCost: string | null } | null>(null);

  const convertToInches = (value: number, unit: string) => {
    switch (unit) {
      case 'feet': return value * 12;
      case 'cm': return value / 2.54;
      case 'mm': return value / 25.4;
      default: return value;
    }
  };

  const calculateBoardFeet = () => {
    const l = convertToInches(parseFloat(length), lengthUnit);
    const w = convertToInches(parseFloat(width), widthUnit);
    const t = convertToInches(parseFloat(thickness), thicknessUnit);
    const p = parseInt(pieces);
    const wastePercent = parseFloat(waste) / 100;
    const pricePerBoardFoot = parseFloat(price);

    if (isNaN(l) || isNaN(w) || isNaN(t) || isNaN(p)) {
      alert('Please enter valid numbers for all dimensions and pieces.');
      return;
    }

    let boardFeet = (l * w * t * p) / 144;
    boardFeet += boardFeet * wastePercent;

    const totalCost = pricePerBoardFoot ? boardFeet * pricePerBoardFoot : null;

    setResult({
      boardFeet: boardFeet.toFixed(2),
      totalCost: totalCost ? totalCost.toFixed(2) : null
    });
  };

  const renderInput = (value: string, setValue: React.Dispatch<React.SetStateAction<string>>, unit: string, setUnit: React.Dispatch<React.SetStateAction<string>>, label: string, id: string) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <div className="flex">
        <input
          id={id}
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={label}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="inches">in</option>
          <option value="feet">ft</option>
          <option value="cm">cm</option>
          <option value="mm">mm</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center">
            <span className="mr-4">🪵</span>
            Board Foot Calculator
            <span className="ml-4">📏</span>
          </h1>
          
          <div className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-xl mb-4">
              A board foot is a unit of volume for measuring lumber. It&apos;s equivalent to:
            </p>
            <div className="flex justify-around text-center">
              <div>
                <span className="text-3xl">📏</span>
                <p>1 inch thick</p>
              </div>
              <div>
                <span className="text-3xl">📏</span>
                <p>1 foot wide</p>
              </div>
              <div>
                <span className="text-3xl">📏</span>
                <p>1 foot long</p>
              </div>
            </div>
            <p className="text-lg mt-4">
              Or 144 cubic inches (12&quot; x 12&quot; x 1&quot;)
            </p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="mr-2">🧮</span> Calculate Board Feet
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {renderInput(length, setLength, lengthUnit, setLengthUnit, "Length", "length")}
              {renderInput(width, setWidth, widthUnit, setWidthUnit, "Width", "width")}
              {renderInput(thickness, setThickness, thicknessUnit, setThicknessUnit, "Thickness", "thickness")}
              <div className="mb-4">
                <label htmlFor="pieces" className="block text-sm font-medium text-gray-300 mb-1">Number of Pieces</label>
                <input
                  id="pieces"
                  type="number"
                  value={pieces}
                  onChange={(e) => setPieces(e.target.value)}
                  placeholder="Pieces"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="waste" className="block text-sm font-medium text-gray-300 mb-1">Waste Percentage</label>
                <input
                  id="waste"
                  type="number"
                  value={waste}
                  onChange={(e) => setWaste(e.target.value)}
                  placeholder="Waste %"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Price per Board Foot ($)</label>
                <input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price (optional)"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={calculateBoardFeet}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Calculate
            </button>
            {result && (
              <div className="mt-4 p-6 bg-gray-700 rounded-md shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-blue-300">Results</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Total Board Feet:</p>
                    <p className="text-2xl font-semibold">{result.boardFeet}</p>
                  </div>
                  {result.totalCost && (
                    <div>
                      <p className="text-sm text-gray-400">Total Cost:</p>
                      <p className="text-2xl font-semibold">${result.totalCost}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">What is a Board Foot?</h2>
            <p className="mb-4">
              A board foot is a unit of volume commonly used in the lumber industry. It represents the volume of a one-inch thick board that is one foot wide and one foot long. In other words, one board foot equals 144 cubic inches of wood.
            </p>
            <p className="mb-4">
              This measurement is crucial for estimating the amount of wood needed for various projects, from small DIY tasks to large-scale construction. It helps in calculating costs, planning material purchases, and managing inventory efficiently.
            </p>
          </div>

          <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">How to Calculate Board Feet</h2>
            <p className="mb-4">
              The formula for calculating board feet is:
            </p>
            <p className="text-lg font-semibold mb-4">
              Board Feet = (Length in inches × Width in inches × Thickness in inches × Number of pieces) ÷ 144
            </p>
            <p className="mb-4">
              Our calculator simplifies this process by allowing you to input measurements in various units and automatically converting them to the appropriate values for the calculation.
            </p>
          </div>

          <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Common Uses of Board Foot Calculations</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Estimating lumber needs for construction projects</li>
              <li>Pricing wood for sale or purchase</li>
              <li>Planning furniture-making projects</li>
              <li>Calculating shipping costs for lumber</li>
              <li>Managing wood inventory for businesses</li>
              <li>Budgeting for home renovation projects</li>
            </ul>
          </div>

          <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Tips for Accurate Measurements</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Always measure to the nearest 1/4 inch for length and width</li>
              <li>For thickness, round up to the next 1/4 inch</li>
              <li>Include a waste factor (typically 10-15%) for cutting and trimming</li>
              <li>For rough-cut lumber, add 1/4 inch to each dimension before calculating</li>
              <li>Double-check your measurements to ensure accuracy</li>
            </ul>
          </div>

          <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="mr-2">📋</span> How to Use
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Enter the length, width, and thickness of your lumber.</li>
              <li>Select the appropriate unit for each measurement.</li>
              <li>Specify the number of pieces.</li>
              <li>Add a waste percentage if needed.</li>
              <li>Optionally, enter the price per board foot.</li>
              <li>Click &quot;Calculate&quot; to see the results.</li>
            </ol>
          </div>

          <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="mr-2">💡</span> Why Use This Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Accurately estimate material needs</li>
              <li>Reduce waste in your projects</li>
              <li>Budget effectively for lumber costs</li>
              <li>Compare prices between suppliers</li>
              <li>Plan your wood storage efficiently</li>
            </ul>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400">
          <p>&copy; 2024 House of Calculators. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BoardFootCalculator;