'use client';

import React, { useState } from 'react';

type JumpType = 'Long Jump' | 'High Jump';

const JumpCalculator5e: React.FC = () => {
  const [jumpType, setJumpType] = useState<JumpType>('Long Jump');
  const [strength, setStrength] = useState<number>(10);
  const [runningStart, setRunningStart] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculateJump = () => {
    setError('');
    setResult(null);

    if (strength < 1 || strength > 30) {
      setError('Strength score must be between 1 and 30.');
      return;
    }

    let distance = 0;

    if (jumpType === 'Long Jump') {
      distance = strength;
      if (runningStart) {
        distance += Math.floor(strength / 2);
      }
    } else if (jumpType === 'High Jump') {
      distance = Math.floor(strength / 2);
      if (runningStart) {
        distance += Math.floor(strength / 4);
      }
    }

    setResult(distance);
  };

  const handleReset = () => {
    setJumpType('Long Jump');
    setStrength(10);
    setRunningStart(false);
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-purple-400">
        Jump Calculator 5e
      </h1>
      
      <div className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Calculate Your Jump Distance</h2>
        <p className="mb-6 text-lg text-gray-300 leading-relaxed">
          Whether you're planning your character's next leap or ensuring they meet the requirements for a daring escape, this calculator helps you determine the exact distance you can jump based on your Strength score and other factors.
        </p>
        <p className="mb-6 text-lg text-gray-300">
          For a more comprehensive character analysis, check out our Character Sheet Calculator, which assists in managing all aspects of your D&D character.
        </p>

        <div className="space-y-6">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setJumpType('Long Jump')}
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ${
                jumpType === 'Long Jump' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              Long Jump
            </button>
            <button
              onClick={() => setJumpType('High Jump')}
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ${
                jumpType === 'High Jump' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              High Jump
            </button>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2 text-white" htmlFor="strength">
              Strength Score:
            </label>
            <input
              type="number"
              id="strength"
              value={strength}
              onChange={(e) => setStrength(parseInt(e.target.value))}
              className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 text-lg font-medium"
              placeholder="Enter your Strength score (1-30)"
              min="1"
              max="30"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="runningStart"
              checked={runningStart}
              onChange={(e) => setRunningStart(e.target.checked)}
              className="h-6 w-6 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="runningStart" className="ml-2 text-lg text-gray-300">
              Have a running start
            </label>
          </div>

          <div className="flex space-x-4 justify-center">
            <button
              onClick={calculateJump}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-xl shadow-md"
            >
              Calculate Jump
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-xl shadow-md"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {result !== null && (
        <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-center text-purple-400">Jump Results</h3>
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-semibold text-white">Type of Jump:</p>
            <p className="text-xl font-semibold text-purple-300">{jumpType}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-semibold text-white">Strength Score:</p>
            <p className="text-xl font-semibold text-purple-300">{strength}</p>
          </div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-xl font-semibold text-white">Running Start:</p>
            <p className="text-xl font-semibold text-purple-300">{runningStart ? 'Yes' : 'No'}</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-purple-600">
            <p className="text-2xl font-bold text-white">Your {jumpType} Distance: {result} feet</p>
          </div>
        </div>
      )}

      <div className="mt-12 bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">Understanding Jump Calculations in D&D 5e</h2>
        <p className="mb-6 text-lg text-gray-300 leading-relaxed">
          Jumping in Dungeons & Dragons 5th Edition is a fundamental movement action that allows characters to traverse the battlefield with agility and speed. Whether leaping over chasms, vaulting over obstacles, or making high jumps to reach elevated areas, understanding how jump distances are calculated is crucial for optimizing your character's mobility and effectiveness.
        </p>
        <p className="mb-6 text-lg text-gray-300">
          This calculator simplifies the process by taking into account your character's Strength score and whether they have a running start. By inputting these values, you can quickly determine the maximum distance your character can jump, ensuring you make informed decisions during gameplay.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-indigo-300">Types of Jumps</h3>
        <p className="mb-4 text-lg text-gray-300 leading-relaxed">
          In D&D 5e, there are primarily two types of jumps:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-300 space-y-2">
          <li>
            <strong>Long Jump:</strong> This allows your character to leap forward horizontally. The distance you can jump depends on your Strength score and whether you have a running start.
          </li>
          <li>
            <strong>High Jump:</strong> This enables your character to jump vertically. The height achieved is also influenced by your Strength score and running start.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mt-6 mb-4 text-indigo-300">Calculating Jump Distances</h3>
        <p className="mb-4 text-lg text-gray-300 leading-relaxed">
          The formulas for calculating jump distances in D&D 5e are straightforward:
        </p>
        <h4 className="text-xl font-semibold mb-2 text-indigo-200">Long Jump</h4>
        <p className="mb-4 text-lg text-gray-300">
          - **Without a Running Start:** You can jump a number of feet up to your Strength score. For example, a Strength of 15 allows a 15-foot jump.
        </p>
        <p className="mb-4 text-lg text-gray-300">
          - **With a Running Start:** If you move at least 10 feet immediately before the jump, you can add half your Strength score to the distance. Using the previous example, a Strength of 15 with a running start allows a 15 + 7 (half of 15, rounded down) = 22-foot jump.
        </p>

        <h4 className="text-xl font-semibold mb-2 text-indigo-200">High Jump</h4>
        <p className="mb-4 text-lg text-gray-300">
          - **Without a Running Start:** You can jump a height of up to half your Strength score, rounded up. A Strength of 15 allows an 8-foot jump.
        </p>
        <p className="mb-4 text-lg text-gray-300">
          - **With a Running Start:** If you move at least 10 feet immediately before the jump, you can add half your Strength score to the height. Thus, a Strength of 15 with a running start allows an 8 + 7 = 15-foot jump.
        </p>

        <h3 className="text-2xl font-semibold mt-6 mb-4 text-indigo-300">Using the Jump Calculator 5e</h3>
        <p className="mb-4 text-lg text-gray-300 leading-relaxed">
          Our **Jump Calculator 5e** streamlines these calculations, allowing you to focus more on your adventure rather than mathematical computations. Here's how to use it effectively:
        </p>
        <ol className="list-decimal list-inside text-lg text-gray-300 space-y-2">
          <li>
            <strong>Select Jump Type:</strong> Choose between a <em>Long Jump</em> or a <em>High Jump</em> based on your character's needs.
          </li>
          <li>
            <strong>Enter Strength Score:</strong> Input your character's current Strength score. Remember, this should be between 1 and 30.
          </li>
          <li>
            <strong>Running Start Option:</strong> Indicate whether your character has a running start by checking the box. This will adjust the jump distance accordingly.
          </li>
          <li>
            <strong>Calculate:</strong> Click the <strong>Calculate Jump</strong> button to see the result.
          </li>
          <li>
            <strong>View Results:</strong> The calculator will display the maximum distance your character can jump based on the inputs provided.
          </li>
          <li>
            <strong>Reset:</strong> Use the <strong>Reset</strong> button to clear all inputs and perform a new calculation.
          </li>
        </ol>

        <h3 className="text-2xl font-semibold mt-6 mb-4 text-indigo-300">Benefits of Using the Jump Calculator</h3>
        <ul className="list-disc list-inside text-lg text-gray-300 space-y-2">
          <li>
            <strong>Efficiency:</strong> Quickly determine jump distances without manual calculations, saving time during gameplay.
          </li>
          <li>
            <strong>Accuracy:</strong> Ensure your jump distances are calculated correctly, adhering to D&D 5e rules.
          </li>
          <li>
            <strong>Planning:</strong> Strategically plan your character's movements and actions based on accurate jump distances.
          </li>
          <li>
            <strong>Versatility:</strong> Suitable for both players and Dungeon Masters to facilitate smoother game sessions.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mt-6 mb-4 text-indigo-300">Tips for Maximizing Jump Distances</h3>
        <p className="mb-4 text-lg text-gray-300 leading-relaxed">
          To make the most out of your jump calculations, consider the following tips:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-300 space-y-2">
          <li>
            <strong>Enhance Your Strength:</strong> Investing in feats or abilities that increase your Strength score can significantly boost your jump distances.
          </li>
          <li>
            <strong>Utilize Magic Items:</strong> Items like the <em>Belt of Giant Strength</em> can enhance your Strength, providing better jump capabilities.
          </li>
          <li>
            <strong>Coordinate with Allies:</strong> Use teamwork to set up advantageous positions or create opportunities for combined maneuvers.
          </li>
          <li>
            <strong>Plan Running Starts:</strong> Whenever possible, plan your movements to include a running start, maximizing your jump distances.
          </li>
          <li>
            <strong>Leverage Environment:</strong> Use environmental features like ropes, ladders, or platforms to assist in making difficult jumps.
          </li>
        </ul>
      </div>

      <footer className="mt-12 text-center bg-gray-800 border-t border-gray-700 rounded-lg p-6 text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Jump Calculator 5e. All rights reserved.</p>
        <p>Enhancing your gaming experience one calculation at a time 🎲</p>
      </footer>
    </div>
  );
};

export default JumpCalculator5e;
