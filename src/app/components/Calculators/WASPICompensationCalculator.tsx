'use client';

import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const WASPICompensationCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [weeklyPension, setWeeklyPension] = useState('');
  const [compensation, setCompensation] = useState<number | null>(null);
  const [error, setError] = useState('');

  const calculateCompensation = () => {
    setError('');
    setCompensation(null);

    if (!birthDate || !weeklyPension) {
      setError('Please fill in all fields.');
      return;
    }

    const birth = new Date(birthDate);
    const eligibleStart = new Date('1950-04-06');
    const eligibleEnd = new Date('1960-04-05');

    if (birth < eligibleStart || birth > eligibleEnd) {
      setError('You are not eligible for WASPI compensation. Eligible birth dates are between 6 April 1950 and 5 April 1960.');
      return;
    }

    // Simplified calculation (example only)
    const yearsDelayed = Math.min(6, Math.max(0, (birth.getFullYear() - 1950) * 0.5));
    const weeksDelayed = Math.round(yearsDelayed * 52);
    const compensationAmount = weeksDelayed * parseFloat(weeklyPension);

    setCompensation(compensationAmount);
  };

  const handleReset = () => {
    setBirthDate('');
    setWeeklyPension('');
    setCompensation(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">
        WASPI Compensation Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Estimate Your WASPI Compensation</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Use our calculator to determine if you're eligible for compensation and estimate how much you might receive.
        </p>
      </section>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Date of Birth:</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min="1950-04-06"
            max="1960-04-05"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Weekly Pension Amount (£):</label>
          <input
            type="number"
            value={weeklyPension}
            onChange={(e) => setWeeklyPension(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., 150"
            min="0"
            step="0.01"
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <div className="flex space-x-4">
          <button
            onClick={calculateCompensation}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Calculate Compensation
          </button>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Reset
          </button>
        </div>

        {compensation !== null && (
          <div className="bg-indigo-50 p-6 rounded-lg mt-6 border border-indigo-200">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Estimated Compensation</h3>
            <p className="text-lg text-gray-800">
              Based on the information provided, your estimated compensation is:
            </p>
            <p className="text-lg text-gray-800 font-mono mt-2">
              £{compensation.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600">Understanding WASPI Compensation</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The WASPI (Women Against State Pension Inequality) campaign addresses the issue of women born in the 1950s who have been affected by changes to the state pension age. These changes, implemented without adequate notice, have left many women facing financial hardship and altered retirement plans.
        </p>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Our calculator aims to provide an estimate of potential compensation based on your birth date and expected weekly pension amount. However, it's important to note that the actual compensation scheme, if implemented, may differ from these estimates.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600">WASPI Age Range Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Women Born Between</th>
                <th className="py-2 px-4 border-b">Gradual Increase in State Pension Age</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="py-2 px-4 border-b">April 6, 1950 – May 5, 1950</td><td className="py-2 px-4 border-b">60 years and 1 month</td></tr>
              <tr><td className="py-2 px-4 border-b">May 6, 1950 – June 5, 1950</td><td className="py-2 px-4 border-b">60 years and 2 months</td></tr>
              <tr><td className="py-2 px-4 border-b">June 6, 1950 – July 5, 1950</td><td className="py-2 px-4 border-b">60 years and 3 months</td></tr>
              <tr><td className="py-2 px-4 border-b">July 6, 1950 – August 5, 1950</td><td className="py-2 px-4 border-b">60 years and 4 months</td></tr>
              <tr><td className="py-2 px-4 border-b">August 6, 1950 – September 5, 1950</td><td className="py-2 px-4 border-b">60 years and 5 months</td></tr>
              <tr><td className="py-2 px-4 border-b">September 6, 1950 – October 5, 1950</td><td className="py-2 px-4 border-b">60 years and 6 months</td></tr>
              <tr><td className="py-2 px-4 border-b">October 6, 1950 – November 5, 1950</td><td className="py-2 px-4 border-b">60 years and 7 months</td></tr>
              <tr><td className="py-2 px-4 border-b">November 6, 1950 – December 5, 1950</td><td className="py-2 px-4 border-b">60 years and 8 months</td></tr>
              <tr><td className="py-2 px-4 border-b">December 6, 1950 – January 5, 1951</td><td className="py-2 px-4 border-b">60 years and 9 months</td></tr>
              <tr><td className="py-2 px-4 border-b">January 6, 1951 – February 5, 1951</td><td className="py-2 px-4 border-b">60 years and 10 months</td></tr>
              <tr><td className="py-2 px-4 border-b">February 6, 1951 – March 5, 1951</td><td className="py-2 px-4 border-b">60 years and 11 months</td></tr>
              <tr><td className="py-2 px-4 border-b">March 6, 1951 – April 5, 1951</td><td className="py-2 px-4 border-b">61 years</td></tr>
              <tr><td className="py-2 px-4 border-b">April 6, 1951 – May 5, 1951</td><td className="py-2 px-4 border-b">61 years and 1 month</td></tr>
              <tr><td className="py-2 px-4 border-b">May 6, 1951 – June 5, 1951</td><td className="py-2 px-4 border-b">61 years and 2 months</td></tr>
              <tr><td className="py-2 px-4 border-b">June 6, 1951 – July 5, 1951</td><td className="py-2 px-4 border-b">61 years and 3 months</td></tr>
              {/* Additional rows omitted for brevity */}
              <tr><td className="py-2 px-4 border-b">September 6, 1954 – October 5, 1954</td><td className="py-2 px-4 border-b">66 years</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-indigo-700">1. Who is eligible for WASPI compensation?</h3>
            <p className="mt-2 text-gray-700">Women born between 6 April 1950 and 5 April 1960 may be eligible for WASPI compensation. This group was most affected by the changes to the state pension age, which were implemented with little to no personal notice.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-indigo-700">2. How is the compensation calculated?</h3>
            <p className="mt-2 text-gray-700">The exact method for calculating compensation has not been finalized by the government. Our calculator provides an estimate based on the number of weeks your pension was delayed and your expected weekly pension amount. The actual compensation, if approved, may differ from these estimates.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-indigo-700">3. Is the compensation automatic?</h3>
            <p className="mt-2 text-gray-700">No, the compensation is not automatic. The WASPI campaign is ongoing, and any compensation scheme would need to be approved and implemented by the UK government. Currently, there is no official compensation scheme in place.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-indigo-700">4. What if I'm not eligible for WASPI compensation?</h3>
            <p className="mt-2 text-gray-700">If you're not eligible for WASPI compensation, you may still be entitled to other forms of support. It's advisable to check your state pension forecast and explore other retirement planning options. You can contact your local Citizens Advice Bureau or visit the official gov.uk website for guidance on available options.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-indigo-700">5. How can I support the WASPI campaign?</h3>
            <p className="mt-2 text-gray-700">You can support the WASPI campaign by joining local WASPI groups, writing to your MP, sharing your story on social media using #WASPI, attending WASPI events and demonstrations, and contributing financially to the campaign if you're able.</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600">The WASPI Journey: A Timeline</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>1995:</strong> State Pension Act changes the pension age for women from 60 to 65, to be phased in between 2010 and 2020</li>
          <li><strong>2007:</strong> Further changes accelerate the timetable, with the pension age for women to reach 65 by 2020</li>
          <li><strong>2011:</strong> Coalition government announces plans to increase the state pension age to 66 by 2020</li>
          <li><strong>2015:</strong> WASPI campaign group formed by five women affected by the changes</li>
          <li><strong>2016:</strong> First WASPI debate held in Westminster Hall</li>
          <li><strong>2019:</strong> High Court rules that the changes to the state pension age did not amount to unlawful discrimination</li>
          <li><strong>2021:</strong> Parliamentary and Health Service Ombudsman finds maladministration in the way DWP communicated the changes</li>
          <li><strong>2023:</strong> Ongoing campaign for compensation and recognition of the impact on affected women</li>
          <li><strong>2024:</strong> Continued advocacy for fair compensation and increased public awareness of the WASPI cause</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600">Impact on Women's Lives</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          The changes to the state pension age have had profound effects on many women's lives, including:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Financial hardship due to unexpected gaps in income</li>
          <li>Forced changes to retirement plans, often at short notice</li>
          <li>Mental health impacts, including stress and anxiety</li>
          <li>Strain on family relationships and caregiving responsibilities</li>
          <li>Difficulty finding employment in later years</li>
          <li>Depletion of savings intended for retirement</li>
        </ul>
        <p className="text-lg text-gray-700 leading-relaxed">
          These impacts underscore the importance of fair compensation and recognition for the affected women.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600">How You Can Get Involved</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          If you're passionate about the WASPI cause, there are several ways to get involved:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Join local WASPI groups in your area to connect with other affected women</li>
          <li>Write to your MP to raise awareness and push for parliamentary action</li>
          <li>Share your personal story on social media using #WASPI to increase visibility</li>
          <li>Attend WASPI events and demonstrations to show solidarity</li>
          <li>Support the campaign financially if you're able, to help fund ongoing advocacy efforts</li>
          <li>Educate friends and family about the WASPI issue to broaden support</li>
          <li>Volunteer your skills (e.g., legal, marketing, organizing) to local WASPI groups</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600">Resources and Support</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          For more information and support, consider the following resources:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>WASPI Official Website: <a href="https://www.waspi.co.uk/" className="text-indigo-600 hover:underline">www.waspi.co.uk</a></li>
          <li>Age UK Advice Line: 0800 678 1602</li>
          <li>Citizens Advice Bureau: <a href="https://www.citizensadvice.org.uk/" className="text-indigo-600 hover:underline">www.citizensadvice.org.uk</a></li>
          <li>Pension Wise: <a href="https://www.moneyhelper.org.uk/en/pensions-and-retirement/pension-wise" className="text-indigo-600 hover:underline">www.moneyhelper.org.uk/pension-wise</a></li>
          <li>Gov.uk State Pension Information: <a href="https://www.gov.uk/state-pension" className="text-indigo-600 hover:underline">www.gov.uk/state-pension</a></li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600">The Importance of Financial Planning</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          While the WASPI campaign continues to fight for fair compensation, it's crucial for all women to engage in thorough financial planning for retirement. Consider the following steps:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Request a state pension forecast to understand your entitlements</li>
          <li>Review any private or workplace pensions you may have</li>
          <li>Consider seeking advice from a financial advisor specializing in retirement planning</li>
          <li>Explore options for supplementing your income in retirement</li>
          <li>Stay informed about any changes to pension legislation that may affect you</li>
        </ol>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} WASPI Compensation Calculator. This calculator is for informational purposes only.</p>
        <p className="mt-2">Supporting women's rights to fair pensions and financial security in retirement.</p>
      </footer>
    </div>
  );
};

export default WASPICompensationCalculator;