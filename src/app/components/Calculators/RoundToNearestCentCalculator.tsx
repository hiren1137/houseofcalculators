'use client';

import React, { useState } from 'react';

const RoundToNearestCentCalculator = () => {
  const [amount, setAmount] = useState<string>('');
  const [roundedAmount, setRoundedAmount] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const roundToNearestCent = () => {
    setError('');
    setRoundedAmount(null);

    const amountNum = parseFloat(amount);

    if (isNaN(amountNum)) {
      setError('Please enter a valid numerical amount.');
      return;
    }

    // Round the amount to the nearest cent (two decimal places)
    const roundedValue = (Math.round(amountNum * 100) / 100).toFixed(2);
    setRoundedAmount(parseFloat(roundedValue));
  };

  const handleReset = () => {
    setAmount('');
    setRoundedAmount(null);
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">
        Round to the Nearest Cent Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Accurate Monetary Rounding
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          If dealing with a money amount problem and want your answer rounded to the nearest cent, this calculator is what you need. <strong>Input the amount of money to round, and the calculator will do its job.</strong>
        </p>
      </section>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., 123.4567"
            step="any"
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex space-x-4">
          <button
            onClick={roundToNearestCent}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Round Amount
          </button>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Reset
          </button>
        </div>

        {roundedAmount !== null && (
          <div className="bg-indigo-50 p-6 rounded-lg mt-6 border border-indigo-200">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Result</h3>
            <p className="text-lg text-gray-800">The rounded amount is:</p>
            <p className="text-3xl text-gray-800 font-bold mt-2">${roundedAmount.toFixed(2)}</p>
          </div>
        )}
      </div>

      {/* Updated Content Below the Calculator */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-600">
          Understanding Rounding to the Nearest Cent
        </h2>

        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          To know how this calculator works and learn how to round to the nearest cent, keep reading this article, where we explain what rounding to the nearest cent means and a couple of examples.
        </p>

        <h3 className="text-xl font-semibold mb-4">What does round to the nearest cent mean</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Rounding to the nearest cent implies <strong>approximating a money amount to two decimals (which represent the number of cents)</strong>, applying the following rules:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>If the third decimal digit is lower than 5, we leave the second decimal digit as it is. E.g., <strong>$4.563 ≈ $4.56</strong>.</li>
          <li>If the third decimal digit is 5 or greater, we round up the second decimal digit (increase it by one unit). For example, <strong>$4.567 ≈ $4.57</strong>.</li>
          <li>Additionally, if the second decimal digit is 9, we change it to zero and increase the first decimal digit by one unit. E.g., <strong>$3.0975 ≈ $3.10</strong>, and <strong>$2.797212 ≈ $2.80</strong>. If the first decimal digit (and the next ones) is also 9, we do the same for it and the figures to the left of it. For example, <strong>$3.9975 ≈ $4.00</strong>, and <strong>$2.997212 ≈ $3.00</strong>.</li>
        </ul>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The previous rules describe the most common <strong>rounding mode</strong>: <em>half-up</em>, which rounds "halves" towards the upper neighbor and is used by default in this calculator. Our rounding calculator article details more about the other less common rounding modes.
        </p>

        <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions (FAQs)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold">1. Why is rounding to the nearest cent important in finance?</h4>
            <p className="text-gray-700">Rounding to the nearest cent ensures accuracy in financial calculations, maintains consistency in accounting practices, and aligns with standard currency representation.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">2. Can this calculator handle negative numbers?</h4>
            <p className="text-gray-700">Yes, the calculator can round negative numbers to the nearest cent using the same rules applied to positive numbers.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">3. What if I need to round to a different decimal place?</h4>
            <p className="text-gray-700">This calculator is specifically designed for rounding to the nearest cent (two decimal places). For other rounding needs, you might need a more general rounding calculator.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">4. How does this rounding method compare to truncation?</h4>
            <p className="text-gray-700">Rounding to the nearest cent is generally more accurate than truncation (simply cutting off decimal places) as it considers the value of the digit being removed.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">5. Is this the same method used in all financial calculations?</h4>
            <p className="text-gray-700">While rounding to the nearest cent is common, some financial calculations may use different rounding methods or more decimal places depending on the specific requirements or regulations.</p>
          </div>
        </div>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Round to the Nearest Cent Calculator. All rights reserved.</p>
        <p>Ensuring financial precision in every calculation 💰</p>
      </footer>
    </div>
  );
};

export default RoundToNearestCentCalculator;