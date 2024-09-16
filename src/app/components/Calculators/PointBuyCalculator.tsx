'use client';

import React, { useState, useCallback } from 'react';

const abilities = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];

const PointBuyCalculator = () => {
  const [scores, setScores] = useState<{ [key: string]: number }>({
    Strength: 8,
    Dexterity: 8,
    Constitution: 8,
    Intelligence: 8,
    Wisdom: 8,
    Charisma: 8,
  });

  const pointCost = (score: number) => {
    switch (score) {
      case 8:
        return 0;
      case 9:
        return 1;
      case 10:
        return 2;
      case 11:
        return 3;
      case 12:
        return 4;
      case 13:
        return 5;
      case 14:
        return 7;
      case 15:
        return 9;
      default:
        return Infinity;
    }
  };

  const totalPointsUsed = Object.values(scores).reduce((sum, score) => sum + pointCost(score), 0);
  const pointsRemaining = 27 - totalPointsUsed;

  const adjustScore = useCallback(
    (ability: string, delta: number) => {
      setScores((prevScores) => {
        const newScore = prevScores[ability] + delta;
        if (newScore < 8 || newScore > 15) return prevScores;

        const newTotalPointsUsed =
          totalPointsUsed - pointCost(prevScores[ability]) + pointCost(newScore);
        if (newTotalPointsUsed > 27) return prevScores;

        return { ...prevScores, [ability]: newScore };
      });
    },
    [totalPointsUsed]
  );

  const resetScores = () => {
    setScores({
      Strength: 8,
      Dexterity: 8,
      Constitution: 8,
      Intelligence: 8,
      Wisdom: 8,
      Charisma: 8,
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Point Buy Calculator</h1>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-green-300">Customize Your Character Attributes</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Use this calculator to allocate points to your character's attributes while staying within the standard point limit. Create a balanced and optimized character for your next adventure.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {abilities.map((ability) => (
            <div key={ability} className="flex items-center justify-between bg-white bg-opacity-10 p-4 rounded-lg">
              <span className="text-xl font-semibold text-green-300">{ability}</span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => adjustScore(ability, -1)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded-lg transition-colors duration-300"
                >
                  -
                </button>
                <span className="text-xl font-semibold">{scores[ability]}</span>
                <button
                  onClick={() => adjustScore(ability, 1)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded-lg transition-colors duration-300"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={resetScores}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 mt-4"
          >
            Reset
          </button>
        </div>
        <div className="bg-white bg-opacity-10 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4 text-green-300">Points Summary</h3>
          <p className="text-xl mb-2">
            <span className="font-semibold">Total Points Used:</span> {totalPointsUsed}
          </p>
          <p className="text-xl mb-2">
            <span className="font-semibold">Points Remaining:</span> {pointsRemaining}
          </p>
          {pointsRemaining < 0 && (
            <p className="text-xl text-red-400 font-semibold">You have exceeded the point limit!</p>
          )}
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-4 text-green-300">Understanding the Point Buy System</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          The point buy system is a method for generating character attributes in role-playing games, allowing players to customize their characters' strengths and weaknesses within a balanced framework.
        </p>
        <h3 className="text-2xl font-semibold mb-2 text-green-300">How It Works</h3>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          You have a pool of <strong>27 points</strong> to distribute among six attributes: Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma. Each attribute starts at a base score of 8. Increasing an attribute's score costs a certain number of points based on the desired score.
        </p>
        <table className="w-full text-xl text-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border-b border-gray-600 p-2 text-left">Score</th>
              <th className="border-b border-gray-600 p-2 text-left">Point Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">8</td>
              <td className="p-2">0</td>
            </tr>
            <tr>
              <td className="p-2">9</td>
              <td className="p-2">1</td>
            </tr>
            <tr>
              <td className="p-2">10</td>
              <td className="p-2">2</td>
            </tr>
            <tr>
              <td className="p-2">11</td>
              <td className="p-2">3</td>
            </tr>
            <tr>
              <td className="p-2">12</td>
              <td className="p-2">4</td>
            </tr>
            <tr>
              <td className="p-2">13</td>
              <td className="p-2">5</td>
            </tr>
            <tr>
              <td className="p-2">14</td>
              <td className="p-2">7</td>
            </tr>
            <tr>
              <td className="p-2">15</td>
              <td className="p-2">9</td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-2xl font-semibold mb-2 text-green-300">Tips for Allocating Points</h3>
        <ul className="list-disc list-inside text-xl text-gray-300 mb-4 leading-relaxed">
          <li><strong>Prioritize Key Attributes:</strong> Focus on attributes that are crucial for your character's class or role.</li>
          <li><strong>Balance Strengths and Weaknesses:</strong> Consider the benefits of having higher scores in multiple attributes versus maximizing a single one.</li>
          <li><strong>Consult Your Game Master:</strong> Ensure your attribute choices align with the game's rules and your character's background.</li>
        </ul>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          By carefully distributing your points, you can create a well-rounded character that excels in their chosen field while contributing to the overall success of your party.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-400 text-lg">
        <p>&copy; {new Date().getFullYear()} Point Buy Calculator. All rights reserved.</p>
        <p>Empowering your character creation journey, one point at a time 🎲</p>
      </footer>
    </div>
  );
};

export default PointBuyCalculator;