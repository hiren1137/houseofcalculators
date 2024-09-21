// components/Calculators/IowaPaycheckCalculator.tsx

'use client';

import React, { useState, useCallback } from 'react';
import { FaDollarSign, FaChartPie } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Calculates Iowa state tax based on progressive tax brackets for single filers.
 * @param {number} income - The taxable income.
 * @returns {number} - The total Iowa state tax.
 */
const calculateIowaStateTax = (income: number): number => {
  let tax = 0;
  const brackets = [
    { limit: 1676, rate: 0.0033 },
    { limit: 3352, rate: 0.0067 },
    { limit: 5025, rate: 0.0225 },
    { limit: 7850, rate: 0.0414 },
    { limit: 19900, rate: 0.0563 },
    { limit: 23350, rate: 0.0625 },
    { limit: 37950, rate: 0.0685 },
    { limit: 53350, rate: 0.0765 },
    { limit: Infinity, rate: 0.0853 },
  ];

  let previousLimit = 0;

  for (const bracket of brackets) {
    if (income > previousLimit) {
      const taxableAmount = Math.min(income, bracket.limit) - previousLimit;
      tax += taxableAmount * bracket.rate;
      previousLimit = bracket.limit;
    } else {
      break;
    }
  }

  return tax;
};

/**
 * Iowa Paycheck Calculator Component
 */
const IowaPaycheckCalculator: React.FC = () => {
  const [grossPay, setGrossPay] = useState<string>('');
  const [payPeriod, setPayPeriod] = useState<string>('weekly');
  const [netPay, setNetPay] = useState<number | null>(null);
  const [deductions, setDeductions] = useState<{
    federalTax: number;
    stateTax: number;
    socialSecurity: number;
    medicare: number;
  } | null>(null);
  const [error, setError] = useState<string>('');

  /**
   * Calculates net pay after deductions
   */
  const calculateNetPay = useCallback(() => {
    const gross = parseFloat(grossPay);
    if (isNaN(gross) || gross <= 0) {
      setError('Please enter a valid gross pay amount.');
      setNetPay(null);
      setDeductions(null);
      return;
    }

    // Define tax rates
    const federalTaxRate = 0.12; // Example: 12%
    const socialSecurityRate = 0.062;
    const medicareRate = 0.0145;

    // Calculate deductions
    const federalTax = gross * federalTaxRate;
    const stateTax = calculateIowaStateTax(gross);
    const socialSecurity = gross * socialSecurityRate;
    const medicare = gross * medicareRate;

    // Calculate net pay
    const totalDeductions = federalTax + stateTax + socialSecurity + medicare;
    const net = gross - totalDeductions;

    setNetPay(net);
    setDeductions({
      federalTax,
      stateTax,
      socialSecurity,
      medicare,
    });
    setError('');
  }, [grossPay]);

  /**
   * Resets the calculator to default state
   */
  const handleReset = () => {
    setGrossPay('');
    setPayPeriod('weekly');
    setNetPay(null);
    setDeductions(null);
    setError('');
  };

  /**
   * Prepares data for the pie chart
   */
  const generateChartData = () => {
    if (!deductions) return null;

    return {
      labels: ['Federal Tax', 'Iowa State Tax', 'Social Security', 'Medicare'],
      datasets: [
        {
          label: 'Deductions',
          data: [
            deductions.federalTax,
            deductions.stateTax,
            deductions.socialSecurity,
            deductions.medicare,
          ],
          backgroundColor: [
            '#4ade80', // Green
            '#f87171', // Red
            '#60a5fa', // Blue
            '#facc15', // Yellow
          ],
          borderColor: '#1f2937', // Dark Gray
          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = generateChartData();

  /**
   * Converts gross pay based on selected pay period
   * @returns {number} - Adjusted gross pay
   */
  const convertGrossPay = () => {
    if (grossPay === '' || isNaN(parseFloat(grossPay))) return 0;
    const gross = parseFloat(grossPay);
    switch (payPeriod) {
      case 'weekly':
        return gross;
      case 'biweekly':
        return gross / 2;
      case 'monthly':
        return gross / 4.33;
      case 'annually':
        return gross / 52;
      default:
        return gross;
    }
  };

  const displayedGrossPay = convertGrossPay();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gray-900 rounded-3xl shadow-xl text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center text-green-400">
        Iowa Paycheck Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Estimate Your Net Pay
        </h2>
        <p className="text-lg text-gray-400 mb-4 leading-relaxed text-center">
          Enter your gross pay and select your pay period to calculate your estimated net paycheck after federal and Iowa state taxes, Social Security, and Medicare deductions.
        </p>
      </section>

      <div className="space-y-6">
        <div className="space-y-4">
          {/* Gross Pay Input */}
          <div className="flex items-center">
            <FaDollarSign className="text-2xl text-green-400 mr-4" />
            <div className="w-full">
              <label className="block mb-2 font-semibold text-gray-300">Gross Pay ($):</label>
              <input
                type="number"
                value={grossPay}
                onChange={(e) => setGrossPay(e.target.value)}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your gross pay"
              />
            </div>
          </div>

          {/* Pay Period Selection */}
          <div>
            <label className="block mb-2 font-semibold text-gray-300">Pay Period:</label>
            <select
              value={payPeriod}
              onChange={(e) => setPayPeriod(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="annually">Annually</option>
            </select>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={calculateNetPay}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-gray-900 font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Calculate
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto bg-gray-700 hover:bg-gray-800 text-gray-100 font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Net Pay and Deductions Display */}
        {netPay !== null && deductions && (
          <div className="bg-gray-800 p-6 rounded-lg mt-6 border border-gray-700">
            <h3 className="text-2xl font-semibold mb-4 text-center text-green-400">
              Your Estimated Net Pay
            </h3>
            <div className="text-center space-y-2">
              <p className="text-lg text-gray-300">
                <strong>Gross Pay:</strong> ${displayedGrossPay.toFixed(2)}
              </p>
              <p className="text-lg text-gray-300">
                <strong>Total Deductions:</strong> ${(
                  deductions.federalTax +
                  deductions.stateTax +
                  deductions.socialSecurity +
                  deductions.medicare
                ).toFixed(2)}
              </p>
              <p className="text-lg text-gray-300">
                <strong>Net Pay:</strong> ${netPay.toFixed(2)}
              </p>
            </div>

            {/* Deductions Pie Chart */}
            <div className="mt-6">
              <h4 className="text-xl font-semibold mb-2 text-center">Deductions Breakdown</h4>
              <div className="flex justify-center">
                {chartData && (
                  <div className="w-48">
                    <Pie
                      data={chartData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              color: '#d1d5db', // Tailwind gray-300
                              font: {
                                size: 14,
                              },
                            },
                          },
                          tooltip: {
                            callbacks: {
                              label: function (context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                return `${label}: $${value.toFixed(2)}`;
                              },
                            },
                          },
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Explanation Section */}
      <section className="mt-12 prose prose-indigo max-w-none">
        <h2 className="text-2xl font-semibold mb-4 text-green-400">Understanding Your Paycheck Deductions</h2>
        <p className="text-lg text-gray-400 mb-4 leading-relaxed">
          The net pay you receive is your gross pay minus various deductions. Understanding these deductions can help you make informed financial decisions.
        </p>
        <p className="text-lg text-gray-400 my-4 leading-relaxed">
          Here's a breakdown of the common deductions:
        </p>

        <h3 className="text-xl font-semibold mb-2">Federal Tax</h3>
        <p className="text-lg text-gray-400 mb-4 leading-relaxed">
          Federal income tax is deducted based on your earnings and filing status. The rate used here is a simplified flat rate for estimation purposes. Actual federal taxes are progressive and may vary.
        </p>

        <h3 className="text-xl font-semibold mb-2">Iowa State Tax</h3>
        <p className="text-lg text-gray-400 mb-4 leading-relaxed">
          Iowa employs a progressive state income tax system with rates ranging from 0.33% to 8.53%, depending on your income level. This calculator uses the appropriate tax brackets to estimate your state tax deductions.
        </p>

        <h3 className="text-xl font-semibold mb-2">Social Security</h3>
        <p className="text-lg text-gray-400 mb-4 leading-relaxed">
          Social Security tax is deducted at a rate of 6.2% of your gross pay. This deduction funds retirement, disability, and survivors' benefits.
        </p>

        <h3 className="text-xl font-semibold mb-2">Medicare</h3>
        <p className="text-lg text-gray-400 mb-4 leading-relaxed">
          Medicare tax is deducted at a rate of 1.45% of your gross pay. This deduction funds health insurance for individuals aged 65 and older.
        </p>

        <h3 className="text-xl font-semibold mb-2">Pay Period Conversion</h3>
        <p className="text-lg text-gray-400 mb-4 leading-relaxed">
          Depending on how often you are paid (weekly, bi-weekly, monthly, annually), your gross pay is adjusted accordingly to provide an accurate estimation of your net pay per pay period.
        </p>

        <h3 className="text-xl font-semibold mb-2">Applications</h3>
        <ul className="list-disc list-inside text-lg text-gray-400 mb-4 leading-relaxed space-y-2">
          <li>Budgeting and financial planning.</li>
          <li>Understanding the impact of tax changes.</li>
          <li>Assessing job offers and salary negotiations.</li>
          <li>Planning for retirement and savings.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Relation to Other Concepts</h3>
        <p className="text-lg text-gray-400 mb-4 leading-relaxed">
          Understanding paycheck deductions is fundamental for grasping broader financial and economic concepts such as disposable income, effective tax rates, and fiscal policy.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Iowa Paycheck Calculator. All rights reserved.</p>
        <p>Helping you manage your finances effectively 💼</p>
      </footer>
    </div>
  );
};

export default IowaPaycheckCalculator;