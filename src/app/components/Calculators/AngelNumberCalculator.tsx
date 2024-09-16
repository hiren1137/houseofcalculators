'use client';

import React, { useState, useCallback } from 'react';
import { FaRegSmile } from 'react-icons/fa';

const AngelNumberCalculator = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [angelNumber, setAngelNumber] = useState<number | null>(null);
  const [meaning, setMeaning] = useState<string>('');

  const calculateAngelNumber = useCallback(() => {
    let numberString = inputValue.replace(/[^0-9]/g, '');

    if (!numberString) {
      setAngelNumber(null);
      setMeaning('');
      return;
    }

    let sum = numberString
      .split('')
      .map((num) => parseInt(num, 10))
      .reduce((acc, curr) => acc + curr, 0);

    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum
        .toString()
        .split('')
        .map((num) => parseInt(num, 10))
        .reduce((acc, curr) => acc + curr, 0);
    }

    setAngelNumber(sum);
    setMeaning(getAngelNumberMeaning(sum));
  }, [inputValue]);

  const getAngelNumberMeaning = (number: number): string => {
    const meanings: { [key: number]: string } = {
      1: 'New beginnings, leadership, and independence.',
      2: 'Balance, harmony, and cooperation.',
      3: 'Creativity, self-expression, and joy.',
      4: 'Stability, practicality, and hard work.',
      5: 'Change, freedom, and adventure.',
      6: 'Responsibility, nurturing, and community.',
      7: 'Spirituality, introspection, and wisdom.',
      8: 'Abundance, power, and success.',
      9: 'Completion, humanitarianism, and compassion.',
      11: 'Intuition, enlightenment, and inspiration.',
      22: 'Master builder, ambition, and discipline.',
      33: 'Master teacher, compassion, and blessings.',
    };

    return meanings[number] || 'An unknown spiritual message.';
  };

  const handleReset = () => {
    setInputValue('');
    setAngelNumber(null);
    setMeaning('');
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">
        Angel Number Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Discover Your Angel Number
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Enter your birth date or any significant number to find out your angel number and its spiritual meaning.
        </p>
      </section>

      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Enter a Number:
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 19900101 for a birth date"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={calculateAngelNumber}
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
        </div>

        {angelNumber !== null && meaning !== '' && (
          <div className="bg-indigo-50 p-6 rounded-lg mt-6 border border-indigo-200">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
              Your Angel Number is {angelNumber}
            </h3>
            <p className="text-lg text-gray-800">{meaning}</p>
          </div>
        )}
      </div>

      <section className="mt-12">
        <div className="flex items-center mb-4">
          <div className="h-1 flex-grow bg-gray-300"></div>
          <FaRegSmile className="mx-3 text-indigo-600" />
          <div className="h-1 flex-grow bg-gray-300"></div>
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          What Are Angel Numbers?
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Angel numbers are sequences of numbers that carry divine guidance and spiritual messages. They are believed to be a way for the universe or guardian angels to communicate with us.
        </p>
        <h3 className="text-xl font-semibold mb-2">How to Interpret Angel Numbers</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Each angel number holds a specific meaning. By understanding these meanings, you can gain insights into your life path, relationships, and personal growth.
        </p>
        <h3 className="text-xl font-semibold mb-2">
          Common Angel Numbers and Their Meanings
        </h3>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>
            <strong>111:</strong> New beginnings and manifestation.
          </li>
          <li>
            <strong>222:</strong> Balance and harmony.
          </li>
          <li>
            <strong>333:</strong> Creativity and communication.
          </li>
          <li>
            <strong>444:</strong> Protection and stability.
          </li>
          <li>
            <strong>555:</strong> Change and transformation.
          </li>
          <li>
            <strong>666:</strong> Reflection and personal responsibility.
          </li>
          <li>
            <strong>777:</strong> Spiritual awakening and enlightenment.
          </li>
          <li>
            <strong>888:</strong> Abundance and success.
          </li>
          <li>
            <strong>999:</strong> Completion and closure.
          </li>
        </ul>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Seeing these numbers repeatedly is thought to be a sign to pay attention to your thoughts and feelings.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Angel Number Calculator. All rights reserved.</p>
        <p>Guiding you on your spiritual journey ✨</p>
      </footer>
    </div>
  );
};

export default AngelNumberCalculator;