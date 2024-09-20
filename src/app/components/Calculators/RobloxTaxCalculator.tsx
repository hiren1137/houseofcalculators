'use client';

import React, { useState, useCallback } from 'react';
import { FaRobot, FaCalculator, FaInfoCircle } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const RobloxTaxCalculator = () => {
  const [inputAmount, setInputAmount] = useState<string>('');
  const [calculationType, setCalculationType] = useState<string>('beforeTax');
  const [result, setResult] = useState<{
    grossAmount: string;
    netAmount: string;
    taxAmount: string;
  } | null>(null);
  const [error, setError] = useState<string>('');

  const calculateTax = useCallback(() => {
    const amount = parseFloat(inputAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.');
      setResult(null);
      return;
    }

    const marketplaceFee = 0.3; // 30% marketplace fee

    let grossAmount: number, netAmount: number;
    if (calculationType === 'beforeTax') {
      grossAmount = amount;
      netAmount = amount * (1 - marketplaceFee);
    } else {
      netAmount = amount;
      grossAmount = amount / (1 - marketplaceFee);
    }

    setResult({
      grossAmount: grossAmount.toFixed(2),
      netAmount: netAmount.toFixed(2),
      taxAmount: (grossAmount - netAmount).toFixed(2),
    });
    setError('');
  }, [inputAmount, calculationType]);

  const handleReset = () => {
    setInputAmount('');
    setCalculationType('beforeTax');
    setResult(null);
    setError('');
  };

  const generateChartData = (): ChartData<'pie'> | null => {
    if (!result) return null;

    return {
      labels: ['Net Amount', 'Marketplace Fee'],
      datasets: [
        {
          data: [parseFloat(result.netAmount), parseFloat(result.taxAmount)],
          backgroundColor: ['#4ade80', '#f87171'],
          borderColor: '#1f2937',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = generateChartData();

  const chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#d1d5db',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw;
            if (typeof value === 'number') {
              return `${label}: ${value.toFixed(2)} Robux`;
            }
            return `${label}: ${value} Robux`;
          },
        },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gray-900 rounded-3xl shadow-xl text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center text-green-400">
        Roblox Tax Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Calculate Roblox Marketplace Fees
        </h2>
        <p className="text-lg text-gray-400 mb-4 leading-relaxed text-center">
          Estimate the net Robux after the 30% marketplace fee or calculate the gross amount needed to receive a specific net amount.
        </p>
      </section>

      <div className="space-y-6 bg-gray-800 p-6 rounded-lg">
        <div className="space-y-4">
          <div className="flex items-center">
            <FaRobot className="text-2xl text-green-400 mr-4" />
            <div className="w-full">
              <label className="block mb-2 font-semibold text-gray-300">Amount (Robux):</label>
              <input
                type="number"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter amount in Robux"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-300">Calculation Type:</label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="beforeTax">Robux before tax</option>
              <option value="afterTax">Robux after tax</option>
            </select>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex space-x-4">
            <button
              onClick={calculateTax}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Calculate
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-gray-100 font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Reset
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-gray-700 p-6 rounded-lg mt-6 border border-gray-600">
            <h3 className="text-2xl font-semibold mb-4 text-center text-green-400">
              Calculation Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-lg font-semibold text-gray-300">Gross Amount</p>
                <p className="text-xl text-green-400">{result.grossAmount} Robux</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-lg font-semibold text-gray-300">Marketplace Fee</p>
                <p className="text-xl text-red-400">{result.taxAmount} Robux</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-lg font-semibold text-gray-300">Net Amount</p>
                <p className="text-xl text-blue-400">{result.netAmount} Robux</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xl font-semibold mb-4 text-center">Distribution Breakdown</h4>
              <div className="flex justify-center">
                {chartData && (
                  <div className="w-64">
                    <Pie data={chartData} options={chartOptions} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="mt-12 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
          Navigating the Roblox Economy: The Essential Guide to Roblox Tax Calculators
        </h2>
        
        <div className="space-y-6 text-gray-300">
          <p>
            If you're a Roblox developer or a savvy player looking to make the most of your virtual earnings, you've probably encountered the term "Roblox tax" or "marketplace fee." But what exactly is this tax, and why should you care? More importantly, how can a Roblox tax calculator help you maximize your profits? Let's dive into the world of Robux and taxes to uncover the secrets of successful Roblox economics.
          </p>

          <h3 className="text-2xl font-semibold text-green-400">Understanding the Roblox Marketplace Fee</h3>
          <p>
            First things first: what's this tax all about? Well, imagine you're selling your latest creation on Roblox – maybe it's a cool hat or an awesome game pass. You set the price at 100 Robux, thinking you'll pocket all of it. But hold your horses! Roblox takes a slice of that pie, and it's a pretty hefty 30% cut.
          </p>
          <p>
            This 30% fee isn't just Roblox being greedy. It's their way of keeping the platform running smoothly, funding development, and maintaining the massive infrastructure that lets millions of players enjoy games every day. Think of it as the cost of doing business in the Roblox universe.
          </p>

          <h3 className="text-2xl font-semibold text-green-400">The Evolution of Roblox Taxes</h3>
          <p>
            Believe it or not, the Roblox marketplace fee hasn't always been a flat 30%. Let's take a quick trip down memory lane:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>In the early days, selling virtual apparel only cost you a tiny 10% fee.</li>
            <li>Then came the era of Limited items, bumping the fee up to 25%.</li>
            <li>The big change happened in 2012 when Roblox decided to simplify things with a flat 30% fee for most items.</li>
            <li>Fast forward to April 2, 2020, and boom – the 30% fee became the standard across the board (with a few exceptions).</li>
          </ul>
          <p>
            This standardization made things easier for developers to calculate their earnings, but it also meant that understanding the impact of this fee became more crucial than ever.
          </p>

          <h3 className="text-2xl font-semibold text-green-400">Why Use a Roblox Tax Calculator?</h3>
          <p>
            You might be thinking, "Can't I just do this math in my head?" Sure, for simple calculations, you probably can. But here's why a dedicated calculator is a game-changer:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li><strong>Accuracy:</strong> When you're dealing with larger numbers or multiple items, having a tool that does the math for you eliminates human error.</li>
            <li><strong>Time-saving:</strong> Why spend time crunching numbers when you could be creating awesome content?</li>
            <li><strong>Planning:</strong> It helps you price your items strategically to hit your profit goals.</li>
            <li><strong>Transparency:</strong> Knowing exactly what you'll earn helps you make informed decisions about your Roblox business.</li>
            <li><strong>Bidirectional calculations:</strong> Many calculators let you input either the gross or net amount, giving you flexibility in your planning.</li>
          </ol>

          <h3 className="text-2xl font-semibold text-green-400">The Roblox Tax Formula Demystified</h3>
          <p>
            For the math nerds out there (we see you!), here's the formula behind the Roblox tax calculator:
          </p>
          <p className="font-mono bg-gray-900 p-2 rounded">
            Net Earnings = Gross Earnings - (Gross Earnings * Tax Rate)
          </p>
          <p>
            In practice, it looks like this:
            If you're selling an item for 500 Robux, your actual earnings would be:
            500 Robux - (500 Robux * 0.30) = 350 Robux
          </p>

          <h3 className="text-2xl font-semibold text-green-400">The Bigger Picture: Roblox Economy Management</h3>
          <p>
            Understanding and using a Roblox tax calculator is just one piece of the puzzle when it comes to managing your Roblox economy. Here are a few extra tips to keep in mind:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Price competitively:</strong> Use the calculator to ensure your prices are competitive while still meeting your profit goals.</li>
            <li><strong>Bundle smartly:</strong> Consider offering bundles or package deals, using the calculator to ensure profitability.</li>
            <li><strong>Track your earnings:</strong> Keep a close eye on your net earnings to understand your business's performance over time.</li>
            <li><strong>Stay informed:</strong> Roblox's policies can change, so stay up-to-date with any adjustments to the marketplace fee structure.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-green-400">In Conclusion: Your Tool for Roblox Success</h3>
          <p>
            Whether you're a seasoned Roblox developer or just starting out, a Roblox tax calculator is an invaluable tool in your virtual entrepreneurship toolkit. It takes the guesswork out of pricing, helps you plan your earnings more effectively, and ultimately contributes to your success on the platform.
          </p>
          <p>
            Remember, in the fast-paced world of Roblox development, every Robux counts. By understanding and accounting for the marketplace fee using a reliable tax calculator, you're setting yourself up for smoother sailing in the vast ocean of the Roblox economy. So go ahead, crunch those numbers, and may your Robux balance always be on the rise!
          </p>
        </div>
      </section>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Roblox Tax Calculator. All rights reserved.</p>
        <p>Helping Roblox developers navigate the virtual economy 🎮</p>
      </footer>
    </div>
  );
};

export default RobloxTaxCalculator;