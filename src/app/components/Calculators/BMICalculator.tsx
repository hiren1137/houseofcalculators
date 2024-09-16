'use client';

import React, { useState, useCallback } from 'react';
import { FaWeight, FaRulerVertical } from 'react-icons/fa';
import { GiBodyHeight } from 'react-icons/gi';

const BMICalculator = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBMI = useCallback(() => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      setBMI(null);
      setCategory('');
      return;
    }

    const bmiValue = weightNum / (heightNum * heightNum);
    setBMI(bmiValue);

    let bmiCategory = '';
    if (bmiValue < 18.5) {
      bmiCategory = 'Underweight';
    } else if (bmiValue < 24.9) {
      bmiCategory = 'Normal weight';
    } else if (bmiValue < 29.9) {
      bmiCategory = 'Overweight';
    } else {
      bmiCategory = 'Obesity';
    }

    setCategory(bmiCategory);
  }, [weight, height]);

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setBMI(null);
    setCategory('');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl text-white">
      <h1 className="text-5xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
        BMI Calculator
      </h1>

      <section className="mb-8 text-center">
        <h2 className="text-3xl font-semibold mb-4">Calculate Your Body Mass Index</h2>
        <p className="text-lg text-gray-200 mb-4 leading-relaxed">
          Determine your BMI and understand your weight category according to standard BMI classifications.
        </p>
      </section>

      <div className="space-y-6">
        <div className="space-y-6">
          <div className="flex items-center bg-white bg-opacity-20 rounded-lg p-4">
            <FaWeight className="text-3xl text-blue-400 mr-4" />
            <div className="w-full">
              <label className="block text-lg mb-2 font-semibold">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-2 bg-transparent border-b-2 border-blue-400 focus:outline-none text-white placeholder-gray-300"
                placeholder="Enter your weight"
              />
            </div>
          </div>
          <div className="flex items-center bg-white bg-opacity-20 rounded-lg p-4">
            <GiBodyHeight className="text-3xl text-green-400 mr-4" />
            <div className="w-full">
              <label className="block text-lg mb-2 font-semibold">Height (m)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-2 bg-transparent border-b-2 border-green-400 focus:outline-none text-white placeholder-gray-300"
                placeholder="Enter your height"
              />
            </div>
          </div>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={calculateBMI}
              className="w-full sm:w-auto bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Calculate BMI
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Reset
            </button>
          </div>
        </div>

        {bmi !== null && category !== '' && (
          <div className="bg-white bg-opacity-20 p-6 rounded-xl mt-6 shadow-inner">
            <h3 className="text-3xl font-semibold mb-4 text-center">Your BMI Result</h3>
            <p className="text-xl mb-2 text-center">
              <span className="font-semibold">BMI:</span> {bmi.toFixed(2)}
            </p>
            <p className="text-xl mb-2 text-center">
              <span className="font-semibold">Weight Category:</span> {category}
            </p>
          </div>
        )}
      </div>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-4">Understanding BMI</h2>
        <p className="text-lg text-gray-200 mb-4 leading-relaxed">
          Body Mass Index (BMI) is a numerical value of your weight in relation to your height. It is used as a simple method to assess whether a person is underweight, normal weight, overweight, or obese.
        </p>
        <h3 className="text-2xl font-semibold mb-4">BMI Categories</h3>
        <table className="w-full text-lg text-gray-200 mb-8 bg-white bg-opacity-10 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="p-3 bg-blue-500 bg-opacity-30">BMI Range</th>
              <th className="p-3 bg-blue-500 bg-opacity-30">Weight Category</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 text-center border-b border-gray-500">Less than 18.5</td>
              <td className="p-3 text-center border-b border-gray-500">Underweight</td>
            </tr>
            <tr>
              <td className="p-3 text-center border-b border-gray-500">18.5 - 24.9</td>
              <td className="p-3 text-center border-b border-gray-500">Normal weight</td>
            </tr>
            <tr>
              <td className="p-3 text-center border-b border-gray-500">25 - 29.9</td>
              <td className="p-3 text-center border-b border-gray-500">Overweight</td>
            </tr>
            <tr>
              <td className="p-3 text-center">30 or more</td>
              <td className="p-3 text-center">Obesity</td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-2xl font-semibold mb-4">Limitations of BMI</h3>
        <p className="text-lg text-gray-200 mb-4 leading-relaxed">
          While BMI is a useful screening tool, it does not directly measure body fat or account for muscle mass, bone density, overall body composition, and racial and sex differences. Always consult with a healthcare provider for a comprehensive health assessment.
        </p>
        <h3 className="text-2xl font-semibold mb-4">Maintaining a Healthy BMI</h3>
        <ul className="list-disc list-inside text-lg text-gray-200 mb-4 leading-relaxed space-y-2">
          <li><strong>Balanced Diet:</strong> Consume a variety of nutrients from all food groups.</li>
          <li><strong>Regular Exercise:</strong> Engage in physical activities to boost cardiovascular health.</li>
          <li><strong>Monitor Weight:</strong> Keep track of your weight and BMI periodically.</li>
          <li><strong>Consult Professionals:</strong> Seek advice from healthcare providers or nutritionists.</li>
        </ul>
        <p className="text-lg text-gray-200 leading-relaxed">
          By understanding your BMI and maintaining a healthy lifestyle, you can improve your overall well-being.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} BMI Calculator. All rights reserved.</p>
        <p>Empowering your health journey, one calculation at a time 🧘‍♂️</p>
      </footer>
    </div>
  );
};

export default BMICalculator;