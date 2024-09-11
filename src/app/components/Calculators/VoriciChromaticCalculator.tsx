"use client";

import React, { useState } from 'react';
import Header from '../../components/Header'; 

class Colored {
  constructor(public red: number, public green: number, public blue: number) {}

  map(func: (value: number) => number) {
    return new Colored(func(this.red), func(this.green), func(this.blue));
  }

  zipMap(other: Colored, func: (a: number, b: number) => number) {
    return new Colored(func(this.red, other.red), func(this.green, other.green), func(this.blue, other.blue));
  }

  countNonZero() {
    return (this.red > 0 ? 1 : 0) + (this.green > 0 ? 1 : 0) + (this.blue > 0 ? 1 : 0);
  }

  total() {
    return this.red + this.green + this.blue;
  }

  toString() {
    return `Red: ${this.red} | Green: ${this.green} | Blue: ${this.blue}`;
  }

  add(other: Colored) {
    this.red += other.red;
    this.green += other.green;
    this.blue += other.blue;
  }

  set(red: number, green: number, blue: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }
}

class Recipe extends Colored {
  public description: string;

  constructor(red: number, green: number, blue: number, public cost: number, public level: number, description?: string) {
    super(red, green, blue);
    this.description = description || `Vorici ${red > 0 ? red + "R" : ""}${green > 0 ? green + "G" : ""}${blue > 0 ? blue + "B" : ""}`;
  }
}

class Probability {
  constructor(
    public recipeName: string,
    public avgCost: string,
    public chance: string,
    public avgTries: string,
    public recipeCost: string,
    public stdDev: string,
    public favg: number = 0
  ) {}

  get(part: number) {
    switch (part) {
      case 0:
        return this.recipeName;
      case 1:
        return `<span class="highlighted">${this.avgCost}</span>`;
      case 2:
        return this.chance;
      case 3:
        return this.avgTries;
      case 4:
        return this.recipeCost;
      case 5:
        return this.stdDev;
      default:
        return "N/A";
    }
  }
}

const VoriciChromaticCalculator = () => {
  const [inputs, setInputs] = useState({
    sockets: '',
    strength: '',
    dexterity: '',
    intelligence: '',
    desiredRed: '',
    desiredGreen: '',
    desiredBlue: ''
  });
  const [results, setResults] = useState<Probability[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { sockets, strength, dexterity, intelligence, desiredRed, desiredGreen, desiredBlue } = inputs;
    const requirements = new Colored(Number(strength) || 0, Number(dexterity) || 0, Number(intelligence) || 0);
    const desiredSockets = new Colored(Number(desiredRed) || 0, Number(desiredGreen) || 0, Number(desiredBlue) || 0);

    const probs = getProbabilities(requirements, desiredSockets, Number(sockets) || 0);
    setResults(probs);
  };

  const getColorChances = (requirements: Colored) => {
    const X = 5;
    const C = 5;
    const maxOnColorChance = 0.9;
    const totalRequirements = requirements.total();
    const numberOfRequirements = requirements.countNonZero();
    let requirementToChance: (requirement: number) => number;

    switch (numberOfRequirements) {
      case 1:
        requirementToChance = (requirement) => {
          if (requirement > 0) {
            return maxOnColorChance * (X + C + requirement) / (totalRequirements + 3 * X + C);
          } else {
            return (1 - maxOnColorChance) / 2 + maxOnColorChance * (X / (totalRequirements + 3 * X + C));
          }
        };
        break;
      case 2:
        requirementToChance = (requirement) => {
          if (requirement > 0) {
            return maxOnColorChance * requirement / totalRequirements;
          } else {
            return 1 - maxOnColorChance;
          }
        };
        break;
      case 3:
        requirementToChance = (requirement) => {
          return requirement / totalRequirements;
        };
        break;
      default:
        requirementToChance = () => 1 / 3;
    }

    return requirements.map(requirementToChance);
  };

  const getProbabilities = (requirements: Colored, desired: Colored, totalSockets: number) => {
    const recipes = [
      new Recipe(0, 0, 0, 1, 0, "Drop Rate"),
      new Recipe(0, 0, 0, 1, 0, "Chromatic"),
      new Recipe(1, 0, 0, 4, 2),
      new Recipe(0, 1, 0, 4, 2),
      new Recipe(0, 0, 1, 4, 2),
      new Recipe(2, 0, 0, 25, 3),
      new Recipe(0, 2, 0, 25, 3),
      new Recipe(0, 0, 2, 25, 3),
      new Recipe(0, 1, 1, 15, 4),
      new Recipe(1, 0, 1, 15, 4),
      new Recipe(1, 1, 0, 15, 4),
      new Recipe(3, 0, 0, 120, 6),
      new Recipe(0, 3, 0, 120, 6),
      new Recipe(0, 0, 3, 120, 6),
      new Recipe(2, 1, 0, 100, 7),
      new Recipe(2, 0, 1, 100, 7),
      new Recipe(1, 2, 0, 100, 7),
      new Recipe(0, 2, 1, 100, 7),
      new Recipe(1, 0, 2, 100, 7),
      new Recipe(0, 1, 2, 100, 7)
    ];

    const probs: Probability[] = [];
    const colorChances = getColorChances(requirements);

    recipes.forEach((recipe) => {
      if (recipe.red <= desired.red && recipe.green <= desired.green && recipe.blue <= desired.blue) {
        const unvoricifiedDesires = new Colored(desired.red - recipe.red, desired.green - recipe.green, desired.blue - recipe.blue);
        const howManySocketsDoWeNotCareAbout = totalSockets - desired.total();
        let chance = multinomial(colorChances, unvoricifiedDesires, howManySocketsDoWeNotCareAbout);
        
        if (recipe.description === "Chromatic") {
          const chanceForChromaticCollision = calcChromaticBonus(colorChances, desired, totalSockets);
          chance /= (1 - chanceForChromaticCollision);
        }

        const avgCost = recipe.description === "Drop Rate" ? "-" : (recipe.cost / chance).toFixed(1);
        const successChance = (chance * 100).toFixed(5) + "%";
        const avgAttempts = (1 / chance).toFixed(1);
        const costPerTry = recipe.description === "Drop Rate" ? "-" : recipe.cost.toString();
        const stdDev = Math.sqrt((1 - chance) / (chance * chance)).toFixed(2);

        probs.push(new Probability(
          recipe.description,  // This is now guaranteed to be a string
          avgCost,
          successChance,
          avgAttempts,
          costPerTry,
          stdDev,
          recipe.description === "Drop Rate" ? 0 : recipe.cost / chance
        ));
      }
    });
  
    return probs;
  };

  const multinomial = (colorChances: Colored, desired: Colored, free: number, pos: number = 1): number => {
    if (free > 0) {
      return (pos <= 1 ? multinomial(colorChances, new Colored(desired.red + 1, desired.green, desired.blue), free - 1, 1) : 0) +
             (pos <= 2 ? multinomial(colorChances, new Colored(desired.red, desired.green + 1, desired.blue), free - 1, 2) : 0) +
             multinomial(colorChances, new Colored(desired.red, desired.green, desired.blue + 1), free - 1, 3);
    } else {
      return factorial(desired.total()) / (factorial(desired.red) * factorial(desired.green) * factorial(desired.blue)) *
             Math.pow(colorChances.red, desired.red) * Math.pow(colorChances.green, desired.green) * Math.pow(colorChances.blue, desired.blue);
    }
  };

  const calcChromaticBonus = (colorChances: Colored, desired: Colored, free: number, rolled: Colored = new Colored(0, 0, 0), pos: number = 1): number => {
    if (rolled.red >= desired.red && rolled.green >= desired.green && rolled.blue >= desired.blue) {
      return 0;
    } else if (free > 0) {
      return (pos <= 1 ? calcChromaticBonus(colorChances, desired, free - 1, new Colored(rolled.red + 1, rolled.green, rolled.blue), 1) : 0) +
             (pos <= 2 ? calcChromaticBonus(colorChances, desired, free - 1, new Colored(rolled.red, rolled.green + 1, rolled.blue), 2) : 0) +
             calcChromaticBonus(colorChances, desired, free - 1, new Colored(rolled.red, rolled.green, rolled.blue + 1), 3);
    } else {
      return factorial(rolled.total()) / (factorial(rolled.red) * factorial(rolled.green) * factorial(rolled.blue)) *
             Math.pow(colorChances.red, rolled.red * 2) * Math.pow(colorChances.green, rolled.green * 2) * Math.pow(colorChances.blue, rolled.blue * 2);
    }
  };

  const factorial = (n: number): number => {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center">
            <span className="mr-4">🔮</span>
            Vorici Chromatic Calculator
            <span className="ml-4">🎨</span>
          </h1>
          
          <div className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
            <form onSubmit={handleCalculate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Total Sockets:</label>
                <input
                  type="number"
                  name="sockets"
                  value={inputs.sockets}
                  onChange={handleInputChange}
                  min="1"
                  max="6"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">STR:</label>
                  <input
                    type="number"
                    name="strength"
                    value={inputs.strength}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">DEX:</label>
                  <input
                    type="number"
                    name="dexterity"
                    value={inputs.dexterity}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">INT:</label>
                  <input
                    type="number"
                    name="intelligence"
                    value={inputs.intelligence}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Desired Red:</label>
                  <input
                    type="number"
                    name="desiredRed"
                    value={inputs.desiredRed}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Desired Green:</label>
                  <input
                    type="number"
                    name="desiredGreen"
                    value={inputs.desiredGreen}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Desired Blue:</label>
                  <input
                    type="number"
                    name="desiredBlue"
                    value={inputs.desiredBlue}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Calculate
              </button>
            </form>
          </div>

          {results.length > 0 && (
            <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Craft Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Average Cost (in chromatics)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Success Chance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Average Attempts (mean)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cost per Try (in chromatics)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Std. Deviation (of attempts)</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {results.map((result, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: result.get(0) }}></td>
                      <td className="px-6 py-4 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: result.get(1) }}></td>
                      <td className="px-6 py-4 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: result.get(2) }}></td>
                      <td className="px-6 py-4 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: result.get(3) }}></td>
                      <td className="px-6 py-4 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: result.get(4) }}></td>
                      <td className="px-6 py-4 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: result.get(5) }}></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">What is a Chromatic Orb?</h2>
            <p className="mb-4">
              A Chromatic Orb is a currency item in Path of Exile used to change the color of sockets on equipment. It's essential for customizing gear to fit your build's gem requirements.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">How to use Chromatic Orbs</h2>
            <p className="mb-4">
              The color of sockets tends to align with the item's attribute requirements:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Higher Strength requirements favor red sockets</li>
              <li>Higher Dexterity requirements favor green sockets</li>
              <li>Higher Intelligence requirements favor blue sockets</li>
            </ul>
            
            <h2 className="text-2xl font-bold mb-4">Vorici Crafting Bench</h2>
            <p className="mb-4">
              For more predictable results, you can use Vorici's crafting bench recipes. These guarantee certain socket colors but at a higher cost.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Why use this calculator?</h2>
            <p className="mb-4">
              This calculator helps you determine the most efficient method to obtain your desired socket colors. It compares the average cost and success rates of using Chromatic Orbs versus Vorici crafting methods.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Tips for efficient crafting</h2>
            <ul className="list-disc list-inside">
              <li>Use the calculator before attempting expensive crafts</li>
              <li>Consider the item's implicit bias towards certain colors</li>
              <li>For off-color sockets, Vorici crafting might be more cost-effective</li>
              <li>Remember that Chromatic Orbs can't produce white sockets</li>
            </ul>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400">
          <p>&copy; 2024 House of Calculators. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default VoriciChromaticCalculator;