'use client';

import React, { useState, useCallback } from 'react';

const MotorcycleLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('');
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateLoan = useCallback(() => {
    const principal = parseFloat(loanAmount);
    const annualInterestRate = parseFloat(interestRate);
    const termMonths = parseInt(loanTerm);

    if (
      isNaN(principal) ||
      isNaN(annualInterestRate) ||
      isNaN(termMonths) ||
      principal <= 0 ||
      annualInterestRate < 0 ||
      termMonths <= 0
    ) {
      setMonthlyPayment(null);
      setTotalInterest(null);
      return;
    }

    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const payment =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -termMonths));
    const totalPayment = payment * termMonths;
    const interest = totalPayment - principal;

    setMonthlyPayment(payment);
    setTotalInterest(interest);
  }, [loanAmount, interestRate, loanTerm]);

  const handleReset = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setMonthlyPayment(null);
    setTotalInterest(null);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Motorcycle Loan Calculator</h1>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-blue-300">Estimate Your Motorcycle Loan Payments</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Use this calculator to determine your monthly motorcycle loan payments and total interest based on your loan amount, interest rate, and loan term.
        </p>
      </section>

      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-blue-300 mb-2 font-semibold">Loan Amount ($):</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              placeholder="Enter the loan amount"
            />
          </div>
          <div>
            <label className="block text-blue-300 mb-2 font-semibold">Annual Interest Rate (%):</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              placeholder="Enter the interest rate"
            />
          </div>
          <div>
            <label className="block text-blue-300 mb-2 font-semibold">Loan Term (Months):</label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full p-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-400"
              placeholder="Enter the loan term in months"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={calculateLoan}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Calculate
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Reset
            </button>
          </div>
        </div>

        {monthlyPayment !== null && totalInterest !== null && (
          <div className="bg-white bg-opacity-10 p-6 rounded-lg mt-6">
            <h3 className="text-2xl font-semibold mb-4 text-blue-300">Loan Summary</h3>
            <p className="text-xl mb-2">
              <span className="font-semibold">Monthly Payment:</span> ${monthlyPayment.toFixed(2)}
            </p>
            <p className="text-xl mb-2">
              <span className="font-semibold">Total Interest Paid:</span> ${totalInterest.toFixed(2)}
            </p>
            <p className="text-xl mb-2">
              <span className="font-semibold">Total Payment:</span> ${(monthlyPayment * parseInt(loanTerm)).toFixed(2)}
            </p>
          </div>
        )}
      </div>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-4 text-blue-300">Understanding Motorcycle Loans</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Purchasing a motorcycle often involves financing through a loan. Understanding how motorcycle loans work can help you make informed decisions and find the best loan terms for your needs.
        </p>
        <h3 className="text-2xl font-semibold mb-2 text-blue-300">How Motorcycle Loans Work</h3>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          A motorcycle loan is a type of installment loan where you borrow a specific amount and repay it over a set period with interest. The loan terms, including the interest rate and repayment schedule, are agreed upon upfront.
        </p>
        <h3 className="text-2xl font-semibold mb-2 text-blue-300">Factors Affecting Your Loan</h3>
        <ul className="list-disc list-inside text-xl text-gray-300 mb-4 leading-relaxed">
          <li><strong>Loan Amount:</strong> The total amount you borrow to purchase the motorcycle.</li>
          <li><strong>Interest Rate:</strong> The percentage charged on the loan amount, influenced by your credit score and market rates.</li>
          <li><strong>Loan Term:</strong> The duration over which you repay the loan, typically ranging from 12 to 72 months.</li>
        </ul>
        <h3 className="text-2xl font-semibold mb-2 text-blue-300">Tips for Getting a Better Loan</h3>
        <ul className="list-disc list-inside text-xl text-gray-300 mb-4 leading-relaxed">
          <li><strong>Improve Your Credit Score:</strong> A higher credit score can qualify you for lower interest rates.</li>
          <li><strong>Compare Lenders:</strong> Shop around to find the best rates and terms from different financial institutions.</li>
          <li><strong>Consider a Larger Down Payment:</strong> Paying more upfront reduces the loan amount and overall interest.</li>
          <li><strong>Shorten the Loan Term:</strong> A shorter term may increase monthly payments but reduce total interest paid.</li>
        </ul>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          By understanding these factors and using our Motorcycle Loan Calculator, you can plan your purchase effectively and choose a loan that fits your budget.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-400 text-lg">
        <p>&copy; {new Date().getFullYear()} Motorcycle Loan Calculator. All rights reserved.</p>
        <p>Helping you ride towards your dreams, one calculation at a time 🏍️</p>
      </footer>
    </div>
  );
};

export default MotorcycleLoanCalculator;
