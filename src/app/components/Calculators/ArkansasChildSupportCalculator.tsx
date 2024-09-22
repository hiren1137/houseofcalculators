'use client';

import React, { useState } from 'react';

const ArkansasChildSupportCalculator: React.FC = () => {
  const [incomeParent1, setIncomeParent1] = useState<string>('');
  const [incomeParent2, setIncomeParent2] = useState<string>('');
  const [numberOfChildren, setNumberOfChildren] = useState<string>('');
  const [additionalExpenses, setAdditionalExpenses] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculateChildSupport = () => {
    setError('');
    setResult(null);

    if (!incomeParent1 || !incomeParent2 || !numberOfChildren) {
      setError('Please fill in all required fields.');
      return;
    }

    const income1 = parseFloat(incomeParent1);
    const income2 = parseFloat(incomeParent2);
    const children = parseInt(numberOfChildren);
    const expenses = parseFloat(additionalExpenses) || 0;

    if (isNaN(income1) || isNaN(income2) || isNaN(children) || isNaN(expenses)) {
      setError('Please enter valid numerical values.');
      return;
    }

    if (children < 1) {
      setError('Number of children must be at least 1.');
      return;
    }

    // Simplified Arkansas Child Support Calculation
    const combinedIncome = income1 + income2;
    const baseSupport = (combinedIncome / 100) * 12; // Base support based on combined income
    const childrenSupport = baseSupport + (baseSupport * children * 0.2); // Additional support per child
    const totalSupport = childrenSupport + expenses; // Total support including additional expenses

    setResult(totalSupport);
  };

  const handleReset = () => {
    setIncomeParent1('');
    setIncomeParent2('');
    setNumberOfChildren('');
    setAdditionalExpenses('');
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-red-400">
        Arkansas Child Support Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Estimate Your Child Support Obligations</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Use our calculator to determine your estimated child support obligations based on Arkansas state guidelines. Ensure you're meeting your financial responsibilities effectively.
        </p>
      </section>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="incomeParent1">
            Income of Parent 1 ($/year):
          </label>
          <input
            type="number"
            id="incomeParent1"
            value={incomeParent1}
            onChange={(e) => setIncomeParent1(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="e.g., 50000"
            min="0"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="incomeParent2">
            Income of Parent 2 ($/year):
          </label>
          <input
            type="number"
            id="incomeParent2"
            value={incomeParent2}
            onChange={(e) => setIncomeParent2(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="e.g., 40000"
            min="0"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="numberOfChildren">
            Number of Children:
          </label>
          <input
            type="number"
            id="numberOfChildren"
            value={numberOfChildren}
            onChange={(e) => setNumberOfChildren(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="e.g., 2"
            min="1"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700" htmlFor="additionalExpenses">
            Additional Annual Expenses ($):
          </label>
          <input
            type="number"
            id="additionalExpenses"
            value={additionalExpenses}
            onChange={(e) => setAdditionalExpenses(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="e.g., 3600"
            min="0"
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <div className="flex space-x-4">
          <button
            onClick={calculateChildSupport}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Calculate Support
          </button>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Reset
          </button>
        </div>

        {result !== null && (
          <div className="bg-red-100 p-6 rounded-lg mt-6 border border-red-200">
            <h3 className="text-2xl font-semibold mb-4 text-red-600">Estimated Child Support</h3>
            <p className="text-lg text-gray-800">
              Based on the information provided, your estimated annual child support obligation is:
            </p>
            <p className="text-lg text-gray-800 font-mono mt-2">
              ${result.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-red-600">Understanding Child Support in Arkansas</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Child support is a legal obligation for parents to provide financial assistance to their children following separation or divorce. In Arkansas, child support calculations are based on several factors, including both parents' incomes, the number of children, and additional expenses related to the children's upbringing.
        </p>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Ensuring fair and accurate child support is essential for the well-being of children and the financial stability of both parents. Our Arkansas Child Support Calculator aims to simplify this process, providing clear and precise estimates to help parents understand their obligations and rights.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-red-600">Arkansas Child Support Guidelines</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Arkansas follows specific guidelines to determine child support amounts. These guidelines consider various elements to ensure that the support calculated meets the needs of the child while considering the financial capabilities of both parents.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-red-400">Factors Influencing Child Support</h3>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
          <li><strong>Parents' Incomes:</strong> Both parents' gross incomes are considered to assess their ability to contribute to child support.</li>
          <li><strong>Number of Children:</strong> The number of children involved directly affects the support amount.</li>
          <li><strong>Health Insurance and Medical Expenses:</strong> Costs related to the children's health care are factored into the support calculation.</li>
          <li><strong>Childcare Expenses:</strong> Expenses for childcare during working hours are included.</li>
          <li><strong>Educational Expenses:</strong> Costs for schooling, including tuition and supplies, are considered.</li>
          <li><strong>Other Relevant Expenses:</strong> Any additional costs that contribute to the child's well-being.</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-6 mb-4 text-red-400">Calculation Formula</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The Arkansas Child Support Calculator uses a simplified version of the state's official formula. Here's a breakdown of how child support is estimated:
        </p>

        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Component</th>
              <th className="py-2 px-4 border-b">Calculation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">Combined Income</td>
              <td className="py-2 px-4 border-b">Income Parent 1 + Income Parent 2</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Base Support</td>
              <td className="py-2 px-4 border-b">(Combined Income / 100) * 12</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Children Support</td>
              <td className="py-2 px-4 border-b">Base Support + (Base Support * Number of Children * 0.2)</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Additional Expenses</td>
              <td className="py-2 px-4 border-b">Added directly to the total support</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b"><strong>Total Child Support</strong></td>
              <td className="py-2 px-4 border-b"><strong>Base Support + Children Support + Additional Expenses</strong></td>
            </tr>
          </tbody>
        </table>

        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          This simplified formula provides an estimate of the annual child support obligation. However, actual court-ordered support may vary based on individual circumstances and additional factors considered by the court.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-red-600">Using the Arkansas Child Support Calculator</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Our Arkansas Child Support Calculator is designed to provide a quick and easy way to estimate your child support obligations. Here's how to use it effectively:
        </p>
        <ol className="list-decimal list-inside text-lg text-gray-700 space-y-2">
          <li>
            <strong>Enter Income Details:</strong> Input the annual incomes of both parents. These should be gross incomes before any deductions.
          </li>
          <li>
            <strong>Number of Children:</strong> Specify the number of children requiring support.
          </li>
          <li>
            <strong>Additional Expenses:</strong> Enter any additional annual expenses related to child-rearing, such as medical bills or educational costs.
          </li>
          <li>
            <strong>Calculate Support:</strong> Click the <strong>Calculate Support</strong> button to view the estimated child support obligation.
          </li>
          <li>
            <strong>View Results:</strong> The calculator will display the total estimated annual child support amount based on the inputs provided.
          </li>
          <li>
            <strong>Reset:</strong> Use the <strong>Reset</strong> button to clear all inputs and perform a new calculation as needed.
          </li>
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-red-600">Legal Implications of Child Support</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Understanding the legal framework surrounding child support is essential for all parents. In Arkansas, child support is not just a recommendation but a legal obligation enforced by the courts. Failing to comply with child support orders can lead to serious legal consequences, including wage garnishment, property liens, and even imprisonment in extreme cases.
        </p>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Moreover, child support arrangements can be modified if there are significant changes in circumstances, such as alterations in income, changes in custody arrangements, or modifications in the child's needs. It's crucial for parents to stay informed about their obligations and seek legal counsel when necessary to ensure compliance and protect their rights.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-red-600">How Courts Enforce Child Support Orders</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Arkansas employs various mechanisms to enforce child support orders effectively:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
          <li><strong>Income Withholding:</strong> Child support payments can be automatically deducted from the non-custodial parent's paycheck, ensuring timely and consistent payments.</li>
          <li><strong>Tax Refund Interception:</strong> Unclaimed tax refunds can be seized to cover child support arrears.</li>
          <li><strong>Driver's License Suspension:</strong> Persistent non-payment can result in the suspension of the non-custodial parent's driver's license.</li>
          <li><strong>Property Liens:</strong> Liens can be placed on property owned by the non-custodial parent to secure unpaid child support.</li>
          <li><strong>Legal Action:</strong> In extreme cases, failure to pay child support can lead to criminal charges, including fines and imprisonment.</li>
        </ul>
        <p className="text-lg text-gray-700 leading-relaxed mt-4">
          These enforcement methods underscore the seriousness with which Arkansas treats child support obligations, ensuring that children's financial needs are met reliably.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-red-600">Ensuring Fairness in Child Support</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Fairness is at the core of child support calculations. The Arkansas Child Support Calculator strives to balance the financial contributions of both parents while prioritizing the best interests of the children. By considering both parents' incomes and the number of children, the calculator ensures that support obligations are equitable and reflective of each parent's ability to contribute.
        </p>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Moreover, the inclusion of additional expenses ensures that all aspects of the child's upbringing are considered, providing a comprehensive view of the financial responsibilities involved.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-red-600">The Role of Legal Counsel in Child Support Cases</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          While the Arkansas Child Support Calculator provides valuable estimates, legal counsel plays a crucial role in navigating child support cases. Family law attorneys can offer personalized advice, represent parents in court hearings, and assist in negotiating fair support arrangements. Engaging with a legal professional ensures that parents' rights are protected and that child support obligations are handled in accordance with Arkansas law.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Legal professionals can also help parents understand the nuances of child support guidelines, explore options for modification, and provide support during mediation or court proceedings. Their expertise is invaluable in ensuring that child support arrangements are fair, sustainable, and in the best interest of the children involved.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-red-600">Additional Resources</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          For more detailed information on child support in Arkansas, consider the following resources:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Arkansas Division of Child Support Enforcement: <a href="https://www.childsupport.arkansas.gov/" className="text-red-600 hover:underline">www.childsupport.arkansas.gov</a></li>
          <li>Arkansas Code Title 26 - Domestic Relations: <a href="https://law.justia.com/codes/arkansas/2021/title-26/" className="text-red-600 hover:underline">law.justia.com/codes/arkansas/2021/title-26/</a></li>
          <li>Arkansas Legal Services: <a href="https://www.arklegalaid.org/" className="text-red-600 hover:underline">www.arklegalaid.org</a></li>
          <li>National Parent Helpline: <a href="https://www.nationalparenthelpline.org/" className="text-red-600 hover:underline">www.nationalparenthelpline.org</a></li>
        </ul>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Arkansas Child Support Calculator. All rights reserved.</p>
        <p>Providing clarity and support for families navigating child support obligations.</p>
      </footer>
    </div>
  );
};

export default ArkansasChildSupportCalculator;