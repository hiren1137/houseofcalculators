"use client";

import React, { useState } from 'react';
import Link from 'next/link';

type Gender = 'male' | 'female';
type AgeGroup = '17-20' | '21-27' | '28-39' | '40+';

const BodyFatStandards = {
  male: {
    '17-20': 20,
    '21-27': 22,
    '28-39': 24,
    '40+': 26
  },
  female: {
    '17-20': 30,
    '21-27': 32,
    '28-39': 34,
    '40+': 36
  }
};

const ArmyBodyFatCalculator = () => {
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<AgeGroup>('17-20');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [result, setResult] = useState<{ bodyFat: string; standard: number; meetsStandard: boolean } | null>(null);

  const calculateBodyFat = () => {
    if (!height || !weight || !neck || !waist || (gender === 'female' && !hip)) {
      setResult(null);
      return;
    }

    let bodyFat: string;
    const heightCm = parseFloat(height) * 2.54;
    const waistCm = parseFloat(waist) * 2.54;
    const neckCm = parseFloat(neck) * 2.54;

    if (gender === 'male') {
      const logValue = Math.log10(waistCm - neckCm);
      bodyFat = (495 / (1.0324 - 0.19077 * logValue + 0.15456 * Math.log10(heightCm)) - 450).toFixed(1);
    } else {
      const hipCm = parseFloat(hip) * 2.54;
      const logValue = Math.log10(waistCm + hipCm - neckCm);
      bodyFat = (495 / (1.29579 - 0.35004 * logValue + 0.22100 * Math.log10(heightCm)) - 450).toFixed(1);
    }

    const standard = BodyFatStandards[gender][age];
    const meetsStandard = parseFloat(bodyFat) <= standard;

    setResult({
      bodyFat,
      standard,
      meetsStandard
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-blue-400">
        Army Body Fat Calculator
      </h1>
      
      <div className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Measure Your Military Fitness</h2>
        <p className="mb-6 text-lg text-gray-300 leading-relaxed">
          This calculator uses the U.S. Army body fat calculation method to estimate your body fat percentage.
          Enter your measurements accurately for the best results.
        </p>
        <p className="mb-6 text-lg text-gray-300">
          For a comprehensive assessment of your military fitness, also check out our{' '}
          <Link href="/acft-calculator" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold">
            ACFT Calculator
          </Link>
          , which helps you prepare for the Army Combat Fitness Test.
        </p>

        <div className="space-y-6">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setGender('male')}
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ${
                gender === 'male' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setGender('female')}
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ${
                gender === 'female' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              Female
            </button>
          </div>

          <select
            value={age}
            onChange={(e) => setAge(e.target.value as AgeGroup)}
            className="w-full p-4 bg-gray-700 rounded-lg text-white text-lg font-medium"
          >
            <option value="17-20">17-20 years</option>
            <option value="21-27">21-27 years</option>
            <option value="28-39">28-39 years</option>
            <option value="40+">40+ years</option>
          </select>

          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height (inches)"
            className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 text-lg font-medium"
          />
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight (lbs)"
            className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 text-lg font-medium"
          />
          <input
            type="number"
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
            placeholder="Neck circumference (inches)"
            className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 text-lg font-medium"
          />
          <input
            type="number"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            placeholder="Waist circumference (inches)"
            className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 text-lg font-medium"
          />
          {gender === 'female' && (
            <input
              type="number"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              placeholder="Hip circumference (inches)"
              className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 text-lg font-medium"
            />
          )}
          <button
            onClick={calculateBodyFat}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 text-xl shadow-md"
          >
            Calculate Body Fat
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-center text-blue-400">Your Results</h3>
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-semibold">Estimated Body Fat:</p>
            <p className="text-3xl font-bold text-yellow-400">{result.bodyFat}%</p>
          </div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-xl font-semibold">Maximum Allowable:</p>
            <p className="text-2xl font-bold text-gray-400">{result.standard}%</p>
          </div>
          <div className={`text-center p-4 rounded-lg ${result.meetsStandard ? 'bg-green-600' : 'bg-red-600'}`}>
            <p className="text-2xl font-bold">
              {result.meetsStandard 
                ? "Meets Army Standard"
                : "Does Not Meet Army Standard"
              }
            </p>
          </div>
        </div>
      )}

      <div className="mt-12 bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-400">Understanding Your Results</h2>
        <h3 className="text-2xl font-semibold mb-4 text-center text-blue-300">Army Body Composition Standards</h3>
        <p className="mb-6 text-lg text-gray-300 text-center">
          The U.S. Army has specific body fat percentage limits based on age and gender:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-lg">
            <thead>
              <tr className="bg-teal-800 text-white">
                <th className="px-4 py-3 text-left">Age Group</th>
                <th className="px-4 py-3 text-center">Male</th>
                <th className="px-4 py-3 text-center">Female</th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(BodyFatStandards.male) as AgeGroup[]).map((ageGroup) => (
                <tr key={ageGroup} className="bg-gray-700">
                  <td className="px-4 py-3 font-medium text-teal-300">{ageGroup} years</td>
                  <td className="px-4 py-3 text-center text-white">{BodyFatStandards.male[ageGroup]}%</td>
                  <td className="px-4 py-3 text-center text-white">{BodyFatStandards.female[ageGroup]}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">Importance of Body Composition in the Military</h3>
        <p className="mb-4">
          Maintaining proper body composition is crucial for military personnel for several reasons:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Enhanced physical performance and endurance</li>
          <li>Reduced risk of injury and improved recovery</li>
          <li>Better overall health and disease prevention</li>
          <li>Improved mental health and stress management</li>
          <li>Adherence to military readiness standards</li>
        </ul>
      </div>

      <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">Tips for Improving Body Composition</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Follow a balanced, nutritious diet rich in lean proteins, whole grains, and vegetables</li>
          <li>Engage in regular cardiovascular exercise, aiming for at least 150 minutes per week</li>
          <li>Incorporate strength training into your routine to build lean muscle mass</li>
          <li>Stay hydrated and aim for 7-9 hours of quality sleep per night</li>
          <li>Manage stress through relaxation techniques like meditation or yoga</li>
          <li>Limit alcohol consumption and avoid tobacco products</li>
          <li>Consult with a nutritionist or fitness professional for personalized advice</li>
        </ul>
      </div>

      <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">Combining Body Fat Assessment with ACFT Preparation</h3>
        <p className="mb-4">
          While maintaining a healthy body composition is important, it&apos;s just one aspect of overall military fitness. To ensure you&apos;re fully prepared for the physical demands of military service, it&apos;s crucial to also focus on your performance in the Army Combat Fitness Test (ACFT).
        </p>
        <p className="mb-4">
          The ACFT consists of six events that test various aspects of physical fitness, including strength, power, speed, and endurance. By combining your body composition goals with ACFT-specific training, you can develop a well-rounded fitness plan that meets all Army standards.
        </p>
        <p>
          Use our{' '}
          <Link href="/acft-calculator" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
            ACFT Calculator
          </Link>
          {' '}to assess your performance on each ACFT event and get personalized recommendations for improvement.
        </p>
      </div>

      <footer className="mt-12 bg-gray-800 border-t border-gray-700 rounded-lg p-6 text-center">
        <p className="text-gray-400 text-lg">&copy; 2024 Army Body Fat Calculator. All rights reserved.</p>
        <p className="mt-2 text-gray-500">
          Disclaimer: This calculator provides estimates based on the Army&apos;s method. 
          For official assessments, consult with your unit&apos;s designated body fat calculator.
        </p>
      </footer>
    </div>
  );
};

export default ArmyBodyFatCalculator;