// components/Calculators/CDLadderCalculator.tsx

'use client';

import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CDLadderCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<string>('');
  const [numberOfRungs, setNumberOfRungs] = useState<string>('');
  const [termLength, setTermLength] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [results, setResults] = useState<
    Array<{ rung: number; maturityYear: number; interestEarned: number; total: number }>
  >([]);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculateCDLadder = () => {
    setError('');
    setResults([]);
    setTotalInterest(null);

    if (!initialInvestment || !numberOfRungs || !termLength || !interestRate) {
      setError('Please fill in all required fields.');
      return;
    }

    const investment = parseFloat(initialInvestment);
    const rungs = parseInt(numberOfRungs);
    const term = parseInt(termLength);
    const rate = parseFloat(interestRate) / 100;

    if (isNaN(investment) || isNaN(rungs) || isNaN(term) || isNaN(rate)) {
      setError('Please enter valid numerical values.');
      return;
    }

    if (investment <= 0 || rungs <= 0 || term <= 0 || rate < 0) {
      setError('Please enter positive values for all fields.');
      return;
    }

    const amountPerRung = investment / rungs;
    const tempResults: Array<{
      rung: number;
      maturityYear: number;
      interestEarned: number;
      total: number;
    }> = [];
    let accumulatedInterest = 0;

    for (let i = 1; i <= rungs; i++) {
      const maturityYear = i * term;
      const interest = amountPerRung * rate * term;
      accumulatedInterest += interest;
      tempResults.push({
        rung: i,
        maturityYear: maturityYear,
        interestEarned: parseFloat(interest.toFixed(2)),
        total: parseFloat((amountPerRung + interest).toFixed(2)),
      });
    }

    setResults(tempResults);
    setTotalInterest(parseFloat(accumulatedInterest.toFixed(2)));
  };

  const handleReset = () => {
    setInitialInvestment('');
    setNumberOfRungs('');
    setTermLength('');
    setInterestRate('');
    setResults([]);
    setTotalInterest(null);
    setError('');
  };

  // Prepare data for the chart
  const chartData = {
    labels: results.map((rung) => `Rung ${rung.rung}`),
    datasets: [
      {
        label: 'Interest Earned ($)',
        data: results.map((rung) => rung.interestEarned),
        backgroundColor: 'rgba(59, 130, 246, 0.6)', // Blue-500 with opacity
      },
      {
        label: 'Total Amount ($)',
        data: results.map((rung) => rung.total),
        backgroundColor: 'rgba(16, 185, 129, 0.6)', // Green-500 with opacity
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'CD Ladder Breakdown',
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">
        CD Ladder Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Plan Your CD Ladder Strategy
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Use our calculator to design a CD ladder that maximizes your returns while providing regular access to your funds. Optimize your investment strategy with ease.
        </p>
      </section>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="initialInvestment">
            Initial Investment Amount ($):
          </label>
          <input
            type="number"
            id="initialInvestment"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 10000"
            min="0"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="numberOfRungs">
            Number of Rungs:
          </label>
          <input
            type="number"
            id="numberOfRungs"
            value={numberOfRungs}
            onChange={(e) => setNumberOfRungs(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 5"
            min="1"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="termLength">
            Term Length per CD (Years):
          </label>
          <input
            type="number"
            id="termLength"
            value={termLength}
            onChange={(e) => setTermLength(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 1"
            min="1"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="interestRate">
            Annual Interest Rate (%):
          </label>
          <input
            type="number"
            id="interestRate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 2.5"
            min="0"
            step="0.01"
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <div className="flex space-x-4">
          <button
            onClick={calculateCDLadder}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Calculate Ladder
          </button>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Reset
          </button>
        </div>

        {results.length > 0 && (
          <div className="bg-blue-50 p-6 rounded-lg mt-6 border border-blue-200">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              CD Ladder Results
            </h3>
            <Bar data={chartData} options={chartOptions} />
            <table className="min-w-full bg-white border border-gray-300 mt-6">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b">Rung</th>
                  <th className="py-2 px-4 border-b">Maturity Year</th>
                  <th className="py-2 px-4 border-b">Interest Earned ($)</th>
                  <th className="py-2 px-4 border-b">Total Amount ($)</th>
                </tr>
              </thead>
              <tbody>
                {results.map((rung) => (
                  <tr key={rung.rung}>
                    <td className="py-2 px-4 border-b text-center">{rung.rung}</td>
                    <td className="py-2 px-4 border-b text-center">{rung.maturityYear}</td>
                    <td className="py-2 px-4 border-b text-center">{rung.interestEarned.toLocaleString()}</td>
                    <td className="py-2 px-4 border-b text-center">{rung.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-lg text-gray-800 font-mono mt-4 text-center">
              Total Interest Earned: ${totalInterest?.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      {/* Detailed Content Below the Calculator */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Understanding CD Ladders</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          A <strong>Certificate of Deposit (CD) ladder</strong> is an investment strategy that involves dividing your total investment across multiple CDs with varying maturity dates. This approach allows you to take advantage of higher interest rates available for longer-term CDs while maintaining liquidity by having CDs mature at regular intervals.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Benefits of a CD Ladder</h2>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
          <li><strong>Higher Interest Rates:</strong> Lock in higher rates with longer-term CDs while still accessing funds periodically.</li>
          <li><strong>Liquidity:</strong> Regular maturities ensure that you have access to your funds without incurring early withdrawal penalties.</li>
          <li><strong>Risk Management:</strong> Spread your investments across different maturities to mitigate interest rate risk.</li>
          <li><strong>Financial Planning:</strong> Align CD maturities with your financial goals and cash flow needs.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">How to Create a CD Ladder</h2>
        <h3 className="text-2xl font-semibold mb-4 text-blue-400">Step-by-Step Guide</h3>
        <ol className="list-decimal list-inside text-lg text-gray-700 space-y-2">
          <li>
            <strong>Determine Your Total Investment:</strong> Decide how much money you want to allocate to the CD ladder. For example, $10,000.
          </li>
          <li>
            <strong>Choose the Number of Rungs:</strong> Decide how many CDs you want in your ladder. Common choices range from 3 to 10. For instance, 5 rungs.
          </li>
          <li>
            <strong>Select Term Lengths:</strong> Assign different maturity periods to each CD rung, typically staggered by one year. Example terms: 1-year, 2-year, 3-year, 4-year, 5-year.
          </li>
          <li>
            <strong>Divide Your Investment:</strong> Allocate an equal portion of your total investment to each CD rung. In a $10,000 investment with 5 rungs, each CD would be $2,000.
          </li>
          <li>
            <strong>Monitor and Reinvest:</strong> As each CD matures, reinvest the principal and interest into a new long-term CD to maintain the ladder and optimize returns over time.
          </li>
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">CD Ladder Example</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Let's consider an example to illustrate how a CD ladder works:
        </p>
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Rung</th>
              <th className="py-2 px-4 border-b">CD Term (Years)</th>
              <th className="py-2 px-4 border-b">Investment Amount ($)</th>
              <th className="py-2 px-4 border-b">Interest Rate (%)</th>
              <th className="py-2 px-4 border-b">Interest Earned ($)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b text-center">1</td>
              <td className="py-2 px-4 border-b text-center">1</td>
              <td className="py-2 px-4 border-b text-center">$2,000</td>
              <td className="py-2 px-4 border-b text-center">2.0</td>
              <td className="py-2 px-4 border-b text-center">$40</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b text-center">2</td>
              <td className="py-2 px-4 border-b text-center">2</td>
              <td className="py-2 px-4 border-b text-center">$2,000</td>
              <td className="py-2 px-4 border-b text-center">2.2</td>
              <td className="py-2 px-4 border-b text-center">$88</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b text-center">3</td>
              <td className="py-2 px-4 border-b text-center">3</td>
              <td className="py-2 px-4 border-b text-center">$2,000</td>
              <td className="py-2 px-4 border-b text-center">2.4</td>
              <td className="py-2 px-4 border-b text-center">$144</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b text-center">4</td>
              <td className="py-2 px-4 border-b text-center">4</td>
              <td className="py-2 px-4 border-b text-center">$2,000</td>
              <td className="py-2 px-4 border-b text-center">2.6</td>
              <td className="py-2 px-4 border-b text-center">$208</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b text-center">5</td>
              <td className="py-2 px-4 border-b text-center">5</td>
              <td className="py-2 px-4 border-b text-center">$2,000</td>
              <td className="py-2 px-4 border-b text-center">2.8</td>
              <td className="py-2 px-4 border-b text-center">$280</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          In this example, an initial investment of $10,000 is divided into five CD rungs, each with increasing terms and slightly higher interest rates. As each CD matures, the principal and interest can be reinvested into a new long-term CD, maintaining the ladder and optimizing returns over time.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Why Choose a CD Ladder?</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Implementing a CD ladder offers several advantages that can enhance your investment portfolio:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
          <li><strong>Maximized Returns:</strong> By locking in higher interest rates for longer-term CDs, you can achieve better returns on your investments.</li>
          <li><strong>Reduced Interest Rate Risk:</strong> Staggered maturities allow you to take advantage of rising interest rates, as maturing CDs can be reinvested at current rates.</li>
          <li><strong>Scheduled Access to Funds:</strong> Regularly maturing CDs provide a predictable schedule for accessing your funds, aiding in financial planning and meeting liquidity needs.</li>
          <li><strong>Flexibility:</strong> Adjust the number of rungs and term lengths based on your financial goals and market conditions.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Additional Resources</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          For more information on CD ladders and investment strategies, consider the following resources:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            Investopedia - CD Ladder:{' '}
            <a
              href="https://www.investopedia.com/terms/c/cd-ladder.asp"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.investopedia.com/terms/c/cd-ladder.asp
            </a>
          </li>
          <li>
            Bankrate - Certificate of Deposit Ladder:{' '}
            <a
              href="https://www.bankrate.com/banking/cd/cd-ladder/"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.bankrate.com/banking/cd/cd-ladder/
            </a>
          </li>
          <li>
            Financial Industry Regulatory Authority (FINRA) - CD Laddering:{' '}
            <a
              href="https://www.finra.org/investors/learn-to-invest/types-investments/certificate-deposit-ladder"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.finra.org/investors/learn-to-invest/types-investments/certificate-deposit-ladder
            </a>
          </li>
          <li>
            U.S. Securities and Exchange Commission (SEC) - Saving and Investing:{' '}
            <a
              href="https://www.sec.gov/reportspubs/investor-publications/investorpubs.htm"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.sec.gov/reportspubs/investor-publications/investorpubs.htm
            </a>
          </li>
        </ul>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} CD Ladder Calculator. All rights reserved.</p>
        <p>Helping you optimize your investments with strategic planning.</p>
      </footer>
    </div>
  );
};

export default CDLadderCalculator;