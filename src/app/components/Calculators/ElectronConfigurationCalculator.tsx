// components/Calculators/ElectronConfigurationCalculator.tsx

'use client';

import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// Comprehensive periodic table data for element symbol to atomic number and other properties
const periodicTable: {
  [key: string]: {
    atomicNumber: number;
    name: string;
    standardState: string;
    atomicMass: number;
  };
} = {
  H: { atomicNumber: 1, name: 'Hydrogen', standardState: 'Gas', atomicMass: 1.008 },
  He: { atomicNumber: 2, name: 'Helium', standardState: 'Gas', atomicMass: 4.0026 },
  Li: { atomicNumber: 3, name: 'Lithium', standardState: 'Solid', atomicMass: 6.94 },
  Be: { atomicNumber: 4, name: 'Beryllium', standardState: 'Solid', atomicMass: 9.0122 },
  B: { atomicNumber: 5, name: 'Boron', standardState: 'Solid', atomicMass: 10.81 },
  C: { atomicNumber: 6, name: 'Carbon', standardState: 'Solid', atomicMass: 12.011 },
  N: { atomicNumber: 7, name: 'Nitrogen', standardState: 'Gas', atomicMass: 14.007 },
  O: { atomicNumber: 8, name: 'Oxygen', standardState: 'Gas', atomicMass: 15.999 },
  F: { atomicNumber: 9, name: 'Fluorine', standardState: 'Gas', atomicMass: 18.998 },
  Ne: { atomicNumber: 10, name: 'Neon', standardState: 'Gas', atomicMass: 20.180 },
  Na: { atomicNumber: 11, name: 'Sodium', standardState: 'Solid', atomicMass: 22.990 },
  Mg: { atomicNumber: 12, name: 'Magnesium', standardState: 'Solid', atomicMass: 24.305 },
  Al: { atomicNumber: 13, name: 'Aluminum', standardState: 'Solid', atomicMass: 26.982 },
  Si: { atomicNumber: 14, name: 'Silicon', standardState: 'Solid', atomicMass: 28.085 },
  P: { atomicNumber: 15, name: 'Phosphorus', standardState: 'Solid', atomicMass: 30.974 },
  S: { atomicNumber: 16, name: 'Sulfur', standardState: 'Solid', atomicMass: 32.06 },
  Cl: { atomicNumber: 17, name: 'Chlorine', standardState: 'Gas', atomicMass: 35.45 },
  Ar: { atomicNumber: 18, name: 'Argon', standardState: 'Gas', atomicMass: 39.948 },
  K: { atomicNumber: 19, name: 'Potassium', standardState: 'Solid', atomicMass: 39.098 },
  Ca: { atomicNumber: 20, name: 'Calcium', standardState: 'Solid', atomicMass: 40.078 },
  Sc: { atomicNumber: 21, name: 'Scandium', standardState: 'Solid', atomicMass: 44.956 },
  Ti: { atomicNumber: 22, name: 'Titanium', standardState: 'Solid', atomicMass: 47.867 },
  V: { atomicNumber: 23, name: 'Vanadium', standardState: 'Solid', atomicMass: 50.942 },
  Cr: { atomicNumber: 24, name: 'Chromium', standardState: 'Solid', atomicMass: 51.996 },
  Mn: { atomicNumber: 25, name: 'Manganese', standardState: 'Solid', atomicMass: 54.938 },
  Fe: { atomicNumber: 26, name: 'Iron', standardState: 'Solid', atomicMass: 55.845 },
  Co: { atomicNumber: 27, name: 'Cobalt', standardState: 'Solid', atomicMass: 58.933 },
  Ni: { atomicNumber: 28, name: 'Nickel', standardState: 'Solid', atomicMass: 58.693 },
  Cu: { atomicNumber: 29, name: 'Copper', standardState: 'Solid', atomicMass: 63.546 },
  Zn: { atomicNumber: 30, name: 'Zinc', standardState: 'Solid', atomicMass: 65.38 },
  Ga: { atomicNumber: 31, name: 'Gallium', standardState: 'Solid', atomicMass: 69.723 },
  Ge: { atomicNumber: 32, name: 'Germanium', standardState: 'Solid', atomicMass: 72.630 },
  As: { atomicNumber: 33, name: 'Arsenic', standardState: 'Solid', atomicMass: 74.922 },
  Se: { atomicNumber: 34, name: 'Selenium', standardState: 'Solid', atomicMass: 78.971 },
  Br: { atomicNumber: 35, name: 'Bromine', standardState: 'Liquid', atomicMass: 79.904 },
  Kr: { atomicNumber: 36, name: 'Krypton', standardState: 'Gas', atomicMass: 83.798 },
  Rb: { atomicNumber: 37, name: 'Rubidium', standardState: 'Solid', atomicMass: 85.468 },
  Sr: { atomicNumber: 38, name: 'Strontium', standardState: 'Solid', atomicMass: 87.62 },
  Y: { atomicNumber: 39, name: 'Yttrium', standardState: 'Solid', atomicMass: 88.906 },
  Zr: { atomicNumber: 40, name: 'Zirconium', standardState: 'Solid', atomicMass: 91.224 },
  Nb: { atomicNumber: 41, name: 'Niobium', standardState: 'Solid', atomicMass: 92.906 },
  Mo: { atomicNumber: 42, name: 'Molybdenum', standardState: 'Solid', atomicMass: 95.95 },
  Tc: { atomicNumber: 43, name: 'Technetium', standardState: 'Solid', atomicMass: 98 },
  Ru: { atomicNumber: 44, name: 'Ruthenium', standardState: 'Solid', atomicMass: 101.07 },
  Rh: { atomicNumber: 45, name: 'Rhodium', standardState: 'Solid', atomicMass: 102.91 },
  Pd: { atomicNumber: 46, name: 'Palladium', standardState: 'Solid', atomicMass: 106.42 },
  Ag: { atomicNumber: 47, name: 'Silver', standardState: 'Solid', atomicMass: 107.87 },
  Cd: { atomicNumber: 48, name: 'Cadmium', standardState: 'Solid', atomicMass: 112.41 },
  In: { atomicNumber: 49, name: 'Indium', standardState: 'Solid', atomicMass: 114.82 },
  Sn: { atomicNumber: 50, name: 'Tin', standardState: 'Solid', atomicMass: 118.71 },
  Sb: { atomicNumber: 51, name: 'Antimony', standardState: 'Solid', atomicMass: 121.76 },
  Te: { atomicNumber: 52, name: 'Tellurium', standardState: 'Solid', atomicMass: 127.60 },
  I: { atomicNumber: 53, name: 'Iodine', standardState: 'Solid', atomicMass: 126.90 },
  Xe: { atomicNumber: 54, name: 'Xenon', standardState: 'Gas', atomicMass: 131.29 },
  Cs: { atomicNumber: 55, name: 'Cesium', standardState: 'Solid', atomicMass: 132.91 },
  Ba: { atomicNumber: 56, name: 'Barium', standardState: 'Solid', atomicMass: 137.33 },
  La: { atomicNumber: 57, name: 'Lanthanum', standardState: 'Solid', atomicMass: 138.91 },
  Ce: { atomicNumber: 58, name: 'Cerium', standardState: 'Solid', atomicMass: 140.12 },
  Pr: { atomicNumber: 59, name: 'Praseodymium', standardState: 'Solid', atomicMass: 140.91 },
  Nd: { atomicNumber: 60, name: 'Neodymium', standardState: 'Solid', atomicMass: 144.24 },
  Pm: { atomicNumber: 61, name: 'Promethium', standardState: 'Solid', atomicMass: 145 },
  Sm: { atomicNumber: 62, name: 'Samarium', standardState: 'Solid', atomicMass: 150.36 },
  Eu: { atomicNumber: 63, name: 'Europium', standardState: 'Solid', atomicMass: 151.96 },
  Gd: { atomicNumber: 64, name: 'Gadolinium', standardState: 'Solid', atomicMass: 157.25 },
  Tb: { atomicNumber: 65, name: 'Terbium', standardState: 'Solid', atomicMass: 158.93 },
  Dy: { atomicNumber: 66, name: 'Dysprosium', standardState: 'Solid', atomicMass: 162.50 },
  Ho: { atomicNumber: 67, name: 'Holmium', standardState: 'Solid', atomicMass: 164.93 },
  Er: { atomicNumber: 68, name: 'Erbium', standardState: 'Solid', atomicMass: 167.26 },
  Tm: { atomicNumber: 69, name: 'Thulium', standardState: 'Solid', atomicMass: 168.93 },
  Yb: { atomicNumber: 70, name: 'Ytterbium', standardState: 'Solid', atomicMass: 173.05 },
  Lu: { atomicNumber: 71, name: 'Lutetium', standardState: 'Solid', atomicMass: 174.97 },
  Hf: { atomicNumber: 72, name: 'Hafnium', standardState: 'Solid', atomicMass: 178.49 },
  Ta: { atomicNumber: 73, name: 'Tantalum', standardState: 'Solid', atomicMass: 180.95 },
  W: { atomicNumber: 74, name: 'Tungsten', standardState: 'Solid', atomicMass: 183.84 },
  Re: { atomicNumber: 75, name: 'Rhenium', standardState: 'Solid', atomicMass: 186.21 },
  Os: { atomicNumber: 76, name: 'Osmium', standardState: 'Solid', atomicMass: 190.23 },
  Ir: { atomicNumber: 77, name: 'Iridium', standardState: 'Solid', atomicMass: 192.22 },
  Pt: { atomicNumber: 78, name: 'Platinum', standardState: 'Solid', atomicMass: 195.08 },
  Au: { atomicNumber: 79, name: 'Gold', standardState: 'Solid', atomicMass: 196.97 },
  Hg: { atomicNumber: 80, name: 'Mercury', standardState: 'Liquid', atomicMass: 200.59 },
  Tl: { atomicNumber: 81, name: 'Thallium', standardState: 'Solid', atomicMass: 204.38 },
  Pb: { atomicNumber: 82, name: 'Lead', standardState: 'Solid', atomicMass: 207.2 },
  Bi: { atomicNumber: 83, name: 'Bismuth', standardState: 'Solid', atomicMass: 208.98 },
  Po: { atomicNumber: 84, name: 'Polonium', standardState: 'Solid', atomicMass: 209 },
  At: { atomicNumber: 85, name: 'Astatine', standardState: 'Solid', atomicMass: 210 },
  Rn: { atomicNumber: 86, name: 'Radon', standardState: 'Gas', atomicMass: 222 },
  Fr: { atomicNumber: 87, name: 'Francium', standardState: 'Solid', atomicMass: 223 },
  Ra: { atomicNumber: 88, name: 'Radium', standardState: 'Solid', atomicMass: 226 },
  Ac: { atomicNumber: 89, name: 'Actinium', standardState: 'Solid', atomicMass: 227 },
  Th: { atomicNumber: 90, name: 'Thorium', standardState: 'Solid', atomicMass: 232.04 },
  Pa: { atomicNumber: 91, name: 'Protactinium', standardState: 'Solid', atomicMass: 231.04 },
  U: { atomicNumber: 92, name: 'Uranium', standardState: 'Solid', atomicMass: 238.03 },
  Np: { atomicNumber: 93, name: 'Neptunium', standardState: 'Solid', atomicMass: 237 },
  Pu: { atomicNumber: 94, name: 'Plutonium', standardState: 'Solid', atomicMass: 244 },
  Am: { atomicNumber: 95, name: 'Americium', standardState: 'Solid', atomicMass: 243 },
  Cm: { atomicNumber: 96, name: 'Curium', standardState: 'Solid', atomicMass: 247 },
  Bk: { atomicNumber: 97, name: 'Berkelium', standardState: 'Solid', atomicMass: 247 },
  Cf: { atomicNumber: 98, name: 'Californium', standardState: 'Solid', atomicMass: 251 },
  Es: { atomicNumber: 99, name: 'Einsteinium', standardState: 'Solid', atomicMass: 252 },
  Fm: { atomicNumber: 100, name: 'Fermium', standardState: 'Solid', atomicMass: 257 },
  Md: { atomicNumber: 101, name: 'Mendelevium', standardState: 'Solid', atomicMass: 258 },
  No: { atomicNumber: 102, name: 'Nobelium', standardState: 'Solid', atomicMass: 259 },
  Lr: { atomicNumber: 103, name: 'Lawrencium', standardState: 'Solid', atomicMass: 262 },
  Rf: { atomicNumber: 104, name: 'Rutherfordium', standardState: 'Solid', atomicMass: 267 },
  Db: { atomicNumber: 105, name: 'Dubnium', standardState: 'Solid', atomicMass: 270 },
  Sg: { atomicNumber: 106, name: 'Seaborgium', standardState: 'Solid', atomicMass: 271 },
  Bh: { atomicNumber: 107, name: 'Bohrium', standardState: 'Solid', atomicMass: 270 },
  Hs: { atomicNumber: 108, name: 'Hassium', standardState: 'Solid', atomicMass: 277 },
  Mt: { atomicNumber: 109, name: 'Meitnerium', standardState: 'Solid', atomicMass: 276 },
  Ds: { atomicNumber: 110, name: 'Darmstadtium', standardState: 'Solid', atomicMass: 281 },
  Rg: { atomicNumber: 111, name: 'Roentgenium', standardState: 'Solid', atomicMass: 280 },
  Cn: { atomicNumber: 112, name: 'Copernicium', standardState: 'Solid', atomicMass: 285 },
  Nh: { atomicNumber: 113, name: 'Nihonium', standardState: 'Solid', atomicMass: 284 },
  Fl: { atomicNumber: 114, name: 'Flerovium', standardState: 'Solid', atomicMass: 289 },
  Mc: { atomicNumber: 115, name: 'Moscovium', standardState: 'Solid', atomicMass: 288 },
  Lv: { atomicNumber: 116, name: 'Livermorium', standardState: 'Solid', atomicMass: 293 },
  Ts: { atomicNumber: 117, name: 'Tennessine', standardState: 'Solid', atomicMass: 294 },
  Og: { atomicNumber: 118, name: 'Oganesson', standardState: 'Solid', atomicMass: 294 },// ... Continue adding all elements up to atomic number 118
};

// Subshells in order with their capacities
const subshells = [
  { shell: 1, subshell: 's', capacity: 2 },
  { shell: 2, subshell: 's', capacity: 2 },
  { shell: 2, subshell: 'p', capacity: 6 },
  { shell: 3, subshell: 's', capacity: 2 },
  { shell: 3, subshell: 'p', capacity: 6 },
  { shell: 4, subshell: 's', capacity: 2 },
  { shell: 3, subshell: 'd', capacity: 10 },
  { shell: 4, subshell: 'p', capacity: 6 },
  { shell: 5, subshell: 's', capacity: 2 },
  { shell: 4, subshell: 'd', capacity: 10 },
  { shell: 5, subshell: 'p', capacity: 6 },
  { shell: 6, subshell: 's', capacity: 2 },
  { shell: 4, subshell: 'f', capacity: 14 },
  { shell: 5, subshell: 'd', capacity: 10 },
  { shell: 6, subshell: 'p', capacity: 6 },
  { shell: 7, subshell: 's', capacity: 2 },
  { shell: 5, subshell: 'f', capacity: 14 },
  { shell: 6, subshell: 'd', capacity: 10 },
  { shell: 7, subshell: 'p', capacity: 6 },
];

// Noble gases for abbreviated electron configuration
const nobleGases = [
  { atomicNumber: 2, symbol: 'He' },
  { atomicNumber: 10, symbol: 'Ne' },
  { atomicNumber: 18, symbol: 'Ar' },
  { atomicNumber: 36, symbol: 'Kr' },
  { atomicNumber: 54, symbol: 'Xe' },
  { atomicNumber: 86, symbol: 'Rn' },
  { atomicNumber: 118, symbol: 'Og' },
];

const ElectronConfigurationCalculator: React.FC = () => {
  const [element, setElement] = useState<string>('');
  const [result, setResult] = useState<{
    fullConfig: string;
    abbreviatedConfig: string;
    atomicNumber: number;
    name: string;
    standardState: string;
    atomicMass: number;
  } | null>(null);
  const [error, setError] = useState<string>('');

  // Function to replace electron counts with superscripts
  const formatElectronConfiguration = (config: string): string => {
    const superscriptMap: { [key: string]: string } = {
      '0': '⁰',
      '1': '¹',
      '2': '²',
      '3': '³',
      '4': '⁴',
      '5': '⁵',
      '6': '⁶',
      '7': '⁷',
      '8': '⁸',
      '9': '⁹',
    };
    // Replace only the electron counts (digits following subshell letters)
    return config.replace(/([spdf])(\d+)/g, (match, p1, p2) => {
      const superscript = p2
        .split('')
        .map((char: string) => superscriptMap[char] || char)
        .join('');
      return `${p1}${superscript}`;
    });
  };

  // Function to calculate electron configuration
  const calculateElectronConfiguration = (atomicNumber: number): {
    fullConfig: string;
    abbreviatedConfig: string;
  } => {
    let electrons = atomicNumber;
    let configurationArray: string[] = [];

    subshells.forEach((sub) => {
      if (electrons > 0) {
        const electronsInSub = Math.min(electrons, sub.capacity);
        configurationArray.push(`${sub.shell}${sub.subshell}${electronsInSub}`);
        electrons -= electronsInSub;
      }
    });

    const fullConfig = configurationArray.join(' ');

    // Find the noble gas core
    let nobleGasSymbol = '';
    let nobleGasAtomicNumber = 0;
    for (let i = nobleGases.length - 1; i >= 0; i--) {
      if (atomicNumber > nobleGases[i].atomicNumber) {
        nobleGasSymbol = nobleGases[i].symbol;
        nobleGasAtomicNumber = nobleGases[i].atomicNumber;
        break;
      }
    }

    let abbreviatedConfig = fullConfig;
    if (nobleGasSymbol) {
      // Get the full electron configuration of the noble gas
      const nobleConfig = calculateElectronConfiguration(nobleGasAtomicNumber).fullConfig;
      // Remove the noble gas configuration from the full configuration
      const remainingConfig = fullConfig.substring(nobleConfig.length).trim();
      abbreviatedConfig = `[${nobleGasSymbol}]${remainingConfig}`;
    }

    return {
      fullConfig: formatElectronConfiguration(fullConfig),
      abbreviatedConfig: formatElectronConfiguration(abbreviatedConfig),
    };
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);

    if (element.trim() === '') {
      setError('Please enter an element symbol or atomic number.');
      return;
    }

    let atomicNumber: number | null = null;

    // Check if input is a number
    if (!isNaN(Number(element))) {
      atomicNumber = Number(element);
      if (atomicNumber < 1 || atomicNumber > 118) {
        setError('Please enter a valid atomic number between 1 and 118.');
        return;
      }
    } else {
      // Assume input is an element symbol
      const symbol =
        element.trim().length === 1
          ? element.trim().toUpperCase()
          : element.trim().charAt(0).toUpperCase() + element.trim().slice(1).toLowerCase();
      if (periodicTable[symbol]) {
        atomicNumber = periodicTable[symbol].atomicNumber;
      } else {
        setError('Please enter a valid element symbol.');
        return;
      }
    }

    const configuration = calculateElectronConfiguration(atomicNumber);
    const elementData = Object.values(periodicTable).find(
      (el) => el.atomicNumber === atomicNumber
    );

    if (elementData) {
      setResult({
        fullConfig: configuration.fullConfig,
        abbreviatedConfig: configuration.abbreviatedConfig,
        atomicNumber: elementData.atomicNumber,
        name: elementData.name,
        standardState: elementData.standardState,
        atomicMass: elementData.atomicMass,
      });
    } else {
      setError('Element data not found.');
    }
  };

  const handleReset = () => {
    setElement('');
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-2xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">
        Electron Configuration Calculator
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Determine Electron Configuration</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
          Enter an element's symbol or atomic number to calculate its electron configuration.
        </p>
      </section>

      <div className="space-y-6">
        <div className="flex items-center">
          <input
            type="text"
            value={element}
            onChange={(e) => setElement(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter Element Symbol (e.g., C) or Atomic Number (e.g., 6)"
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <div className="flex space-x-4">
          <button
            onClick={handleCalculate}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Calculate
          </button>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Reset
          </button>
        </div>

        {result && (
          <div className="bg-indigo-50 p-6 rounded-lg mt-6 border border-indigo-200">
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600 text-center">Electron Configuration</h3>
            <div className="text-center space-y-4">
              <div>
                <strong>Full Electron Configuration:</strong>
                <p className="text-lg text-gray-800">
                  {result.fullConfig}
                </p>
              </div>
              <div>
                <strong>Abbreviated Electron Configuration:</strong>
                <p className="text-lg text-gray-800">
                  {result.abbreviatedConfig}
                </p>
              </div>
              <div className="mt-4">
                <table className="min-w-full bg-white text-left">
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 font-semibold">Atomic Number</td>
                      <td className="py-2 px-4">{result.atomicNumber}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-semibold">Element</td>
                      <td className="py-2 px-4">{result.name}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-semibold">Standard State</td>
                      <td className="py-2 px-4">{result.standardState}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-semibold">Atomic Mass</td>
                      <td className="py-2 px-4">{result.atomicMass}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600 text-center">
          Understanding Electron Configuration
        </h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          An online condensed electron configuration calculator helps you determine the electron configuration of any element. This valence electron calculator displays the abbreviated configuration and the atomic number of each element. Read on to understand abbreviated electron configuration, shells, subshells, and how to find the electron configuration of an atom or element.
        </p>

        <h3 className="text-xl font-semibold mb-2">What is Electron Configuration?</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          In quantum chemistry and atomic physics, the electron configuration of an atom or molecule describes the distribution of electrons in different atomic or molecular orbitals. It also describes every electron as moving freely in an orbital within an average field generated by other orbitals. For example, the electron configuration of Phosphorus (P) is <strong>1s² 2s² 2p⁶ 3s² 3p³</strong>.
        </p>

        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Usually, physicists and chemists use the isotope notation calculator to refer to how to calculate electronic configurations of molecules and atoms. For atoms, the standard notation consists of a series of atomic subshell labels (for example, Phosphorus's sequence of notation is 1s, 2s, 2p, 3s, 3p), where the number of electrons assigned to each subshell is used as a superscript. For example, hydrogen has just 1 electron in the s orbital of the first shell, so its electron configuration notation is recorded as <strong>1s¹</strong>. Lithium has two electrons in the 1s subshell and one electron in the 2s subshell (higher energy), so its electron configuration is <strong>1s² 2s¹</strong>. For further verification, keep using this electron configuration generator.
        </p>

        <h3 className="text-xl font-semibold mb-2">Apart from this, Electron Configuration:</h3>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>Use for interpreting atomic spectra.</li>
          <li>Finds the valency of an element.</li>
          <li>Electron Configuration Chart:</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">How to Find Electron Configuration?</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Our ground state electron configuration calculator with charges also depicts an abbreviated way of finding electron configuration. If you want to do it manually, follow the steps below to write shorthand electron configurations:
        </p>
        <ol className="list-decimal list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>
            <strong>Find the Element:</strong> Find the required element on the periodic table. For example, calcium is element 20.
          </li>
          <li>
            <strong>Identify the Noble Gas Core:</strong> Find the atomic number of the first noble gas preceding your element in the periodic table. For instance, for calcium (atomic number 20), the preceding noble gas is Argon (Ar) with atomic number 18.
          </li>
          <li>
            <strong>Write the Noble Gas Symbol:</strong> Using our free noble gas configuration calculator, write the noble gas symbol in brackets to start its electronic configuration. For calcium, it would be <strong>[Ar]</strong>.
          </li>
          <li>
            <strong>Add the Remaining Electrons:</strong> Continue writing the electron configuration of the element until you reach the correct number of electrons. For calcium, after [Ar], add <strong>4s²</strong>, resulting in <strong>[Ar] 4s²</strong>.
          </li>
        </ol>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          However, an Online Angular Velocity Calculator allows you to determine the angular velocity of a body in motion on a circular path.
        </p>

        <h3 className="text-xl font-semibold mb-2">Shells and Subshells:</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Electron shells are a set of feasible states that have the same principal quantum number <strong>n</strong> (the number before the letter on the orbital) that the electron can occupy. An atom with an nth electron shell can hold <strong>2n²</strong> electrons, which means the first shell can hold 2 electrons, the second shell can hold 8 electrons, and so on.
        </p>

        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          A subshell is a set of states defined by the total azimuth quantum number <strong>ℓ</strong> in the shell. The range of ℓ values is from 0 to n-1. The values of ℓ = 0, 1, 2, and 3 correspond to the orbitals <strong>s</strong>, <strong>p</strong>, <strong>d</strong>, and <strong>f</strong>, respectively.
        </p>

        <h3 className="text-xl font-semibold mb-2">Difference Between Atomic Number and Atomic Mass:</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          It is believed that the atomic mass of an element is closely related to the atomic number because if the atomic mass is high, then the atomic number is also high. So, what is the difference between atomic mass and atomic number? Let's look at some key differences.
        </p>

        <table className="min-w-full bg-white text-left mb-4">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Atomic Mass</th>
              <th className="py-2 px-4 bg-gray-200">Atomic Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4">Atomic mass is related to the number of neutrons and protons present in a particular nucleus of an element.</td>
              <td className="py-2 px-4">The atomic number is usually the number of protons present in the nucleus of an element, which you can also determine using this best atomic number calculator.</td>
            </tr>
            <tr>
              <td className="py-2 px-4">It is the average weight of an atom or molecule.</td>
              <td className="py-2 px-4">It is the total number of nucleons in the atom’s nucleus.</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Atomic mass is always denoted by <strong>A</strong>.</td>
              <td className="py-2 px-4">The atomic number is always denoted by <strong>Z</strong>.</td>
            </tr>
            <tr>
              <td className="py-2 px-4">The atomic mass unit (AMU) is usually used to measure atomic mass.</td>
              <td className="py-2 px-4">An atomic number is a number used to place elements in the periodic table.</td>
            </tr>
          </tbody>
        </table>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          However, an Online Photon Energy Calculator will allow you to find the energy of a photon from its wavelength & frequency.
        </p>

        <h3 className="text-xl font-semibold mb-2">How Valence Electron Configuration Calculator Works?</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          An online valence electrons calculator finds the abbreviated or condensed electron configuration of an element with these instructions:
        </p>
        <h4 className="text-lg font-semibold mb-2">Input:</h4>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>Enter an element to find the complete electron configuration of that element.</li>
          <li>Hit the calculate button to get the electron configuration mnemonics.</li>
        </ul>
        <h4 className="text-lg font-semibold mb-2">Output:</h4>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>This best ground state electron configuration calculator provides abbreviated electron configuration, standard state, atomic mass, and the atomic number of an element.</li>
          <li>To find the electron configuration of other elements of the periodic table, click on the recalculate button.</li>
        </ul>
        <h4 className="text-lg font-semibold mb-2">FAQ:</h4>
        <h5 className="text-lg font-semibold mb-2">What are the main rules for electron configuration?</h5>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          There are three important rules used for electron configuration: the Pauli Exclusion Principle, the Aufbau Principle, and Hund's Rule. Understanding the basic theory behind all these principles is essential, and this online electron configuration finder will help you better understand these concepts.
        </p>
        <h5 className="text-lg font-semibold mb-2">What is the KLMN shell?</h5>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          K represents the first level of energy, L represents the second level of energy, M represents the third level of energy in an atom or molecule, and so on. In other words, the symbols KLMN only represent the number of electrons in an atom. This free electron configuration calculator is designed to arrange the number of electrons in these shells accordingly.
        </p>
        <h5 className="text-lg font-semibold mb-2">Do electrons affect atomic mass?</h5>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The mass of an electron is much smaller than that of a proton, with only 9.11 x 10⁻²⁸ grams or about 1/1800 atomic mass units. Therefore, electrons do not significantly increase or decrease the total atomic mass of an element.
        </p>
        <h5 className="text-lg font-semibold mb-2">How can I remember the first 6 elements of the periodic table?</h5>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The following mnemonic helps in remembering the first 6 elements of the periodic table:
        </p>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          “Happy Henry Lives Beside Boron Cottage”
        </p>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Where:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>Happy = Hydrogen</li>
          <li>Henry = Helium</li>
          <li>Lives = Lithium</li>
          <li>Beside = Beryllium</li>
          <li>Boron = Boron</li>
          <li>Cottage = Carbon</li>
        </ul>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Moreover, when it comes to the configuration of these elements, this electron configuration calculator stands out by providing a clear orbital notation for each atom.
        </p>

        <h3 className="text-xl font-semibold mb-2">Final Thoughts:</h3>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          An online noble gas electron configuration calculator provides a condensed method of finding the electron configuration, atomic number, and atomic mass of elements. This free orbital diagram calculator can quickly and easily tell you how many electron orbitals an atom has and how many electrons are in each orbital.
        </p>

        <h3 className="text-xl font-semibold mb-2">Reference:</h3>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4 leading-relaxed space-y-2">
          <li>From Wikipedia: Shells and subshells, Notation, Energy—ground state and excited states.</li>
          <li>From Science Notes: Electron Configurations of Elements, How to Find Electron Configuration.</li>
          <li>From Chemistry Edu: Electron Configuration, Order of Fill, How to Write an Electron Configuration, Special Cases, Exceptions, Periodic Properties.</li>
        </ul>
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Electron Configuration Calculator. All rights reserved.</p>
        <p>Enhancing your scientific understanding one calculation at a time 🔬</p>
      </footer>
    </div>
  );
};

export default ElectronConfigurationCalculator;