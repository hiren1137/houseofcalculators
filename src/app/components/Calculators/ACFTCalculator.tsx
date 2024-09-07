'use client';

import React, { useState } from 'react';

interface EventScore {
  mdl: number;
  spt: number;
  hrp: number;
  sdc: number;
  plk: number;
  run: number;
}

// Scoring tables
const scoringTables = {
  mdl: {
    male: [
      { min: 340, score: 100 },
      { min: 300, score: 90 },
      { min: 260, score: 80 },
      { min: 220, score: 70 },
      { min: 180, score: 60 },
      { min: 140, score: 50 },
    ],
    female: [
      { min: 280, score: 100 },
      { min: 240, score: 90 },
      { min: 200, score: 80 },
      { min: 160, score: 70 },
      { min: 120, score: 60 },
      { min: 100, score: 50 },
    ]
  },
  spt: {
    male: [
      { min: 12.6, score: 100 },
      { min: 11.5, score: 90 },
      { min: 10.4, score: 80 },
      { min: 9.3, score: 70 },
      { min: 8.2, score: 60 },
      { min: 7.1, score: 50 },
    ],
    female: [
      { min: 11.0, score: 100 },
      { min: 10.0, score: 90 },
      { min: 9.0, score: 80 },
      { min: 8.0, score: 70 },
      { min: 7.0, score: 60 },
      { min: 6.0, score: 50 },
    ]
  },
  hrp: {
    male: [
      { min: 60, score: 100 },
      { min: 50, score: 90 },
      { min: 40, score: 80 },
      { min: 30, score: 70 },
      { min: 20, score: 60 },
      { min: 10, score: 50 },
    ],
    female: [
      { min: 50, score: 100 },
      { min: 40, score: 90 },
      { min: 30, score: 80 },
      { min: 20, score: 70 },
      { min: 10, score: 60 },
      { min: 5, score: 50 },
    ]
  },
  sdc: {
    male: [
      { max: 90, score: 100 },
      { max: 100, score: 90 },
      { max: 110, score: 80 },
      { max: 120, score: 70 },
      { max: 130, score: 60 },
      { max: 140, score: 50 },
    ],
    female: [
      { max: 100, score: 100 },
      { max: 110, score: 90 },
      { max: 120, score: 80 },
      { max: 130, score: 70 },
      { max: 140, score: 60 },
      { max: 150, score: 50 },
    ]
  },
  plk: {
    male: [
      { min: 220, score: 100 },
      { min: 200, score: 90 },
      { min: 180, score: 80 },
      { min: 160, score: 70 },
      { min: 140, score: 60 },
      { min: 120, score: 50 },
    ],
    female: [
      { min: 220, score: 100 },
      { min: 200, score: 90 },
      { min: 180, score: 80 },
      { min: 160, score: 70 },
      { min: 140, score: 60 },
      { min: 120, score: 50 },
    ]
  },
  run: {
    male: [
      { max: 780, score: 100 }, // 13:00
      { max: 840, score: 90 },  // 14:00
      { max: 900, score: 80 },  // 15:00
      { max: 960, score: 70 },  // 16:00
      { max: 1020, score: 60 }, // 17:00
      { max: 1080, score: 50 }, // 18:00
    ],
    female: [
      { max: 870, score: 100 }, // 14:30
      { max: 930, score: 90 },  // 15:30
      { max: 990, score: 80 },  // 16:30
      { max: 1050, score: 70 }, // 17:30
      { max: 1110, score: 60 }, // 18:30
      { max: 1170, score: 50 }, // 19:30
    ]
  }
};

export default function ACFTCalculator() {
  const [age, setAge] = useState('17-21');
  const [gender, setGender] = useState('male');
  const [scores, setScores] = useState({
    mdl: '',
    spt: '',
    hrp: '',
    sdc: '',
    plk: '',
    run: ''
  });

  const [eventScores, setEventScores] = useState<EventScore>({
    mdl: 0,
    spt: 0,
    hrp: 0,
    sdc: 0,
    plk: 0,
    run: 0
  });
  const [totalScore, setTotalScore] = useState(0);
  const [passed, setPassed] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setScores(prevScores => ({ ...prevScores, [name]: value }));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getEventScore = (event: string, value: number) => {
    const table = scoringTables[event as keyof typeof scoringTables][gender as 'male' | 'female'];
    if (event === 'sdc' || event === 'run') {
      for (let i = 0; i < table.length; i++) {
        if (value <= (table[i] as { max: number; score: number }).max) {
          return table[i].score;
        }
      }
    } else {
      for (let i = 0; i < table.length; i++) {
        if (value >= (table[i] as { min: number; score: number }).min) {
          return table[i].score;
        }
      }
    }
    return 0;
  };

  const calculateScore = () => {
    const newEventScores: EventScore = {
      mdl: 0,
      spt: 0,
      hrp: 0,
      sdc: 0,
      plk: 0,
      run: 0
    };
    let total = 0;
    let allPassed = true;

    for (const [event, value] of Object.entries(scores)) {
      const score = getEventScore(event, parseFloat(value));
      newEventScores[event as keyof EventScore] = score;
      total += score;
      if (score < 60) allPassed = false;
    }

    setEventScores(newEventScores);
    setTotalScore(total);
    setPassed(allPassed);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-green-800 to-blue-900 rounded-2xl shadow-2xl text-white">
      <h1 className="text-4xl font-bold mb-6 text-center text-green-200">Army Combat Fitness Test (ACFT) Calculator</h1>
      
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-green-300">Measure Your Military Fitness</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Enter your scores for each ACFT event to calculate your total score and determine if you've passed the test.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-blue-800 bg-opacity-50 p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-green-300">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-green-200 mb-2">Age Group:</label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-2 bg-blue-700 bg-opacity-50 rounded-lg text-white"
              >
                <option value="17-21">17-21</option>
                <option value="22-26">22-26</option>
                <option value="27-31">27-31</option>
                <option value="32-36">32-36</option>
                <option value="37-41">37-41</option>
                <option value="42-46">42-46</option>
                <option value="47-51">47-51</option>
                <option value="52-56">52-56</option>
                <option value="57-61">57-61</option>
                <option value="62+">62+</option>
              </select>
            </div>
            <div>
              <label className="block text-green-200 mb-2">Gender:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 bg-blue-700 bg-opacity-50 rounded-lg text-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-blue-800 bg-opacity-50 p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-green-300">Event Scores</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-green-200 mb-2">3-Rep Max Deadlift (MDL) in lbs:</label>
              <input
                type="number"
                name="mdl"
                value={scores.mdl}
                onChange={handleInputChange}
                placeholder="140-340 lbs"
                className="w-full p-2 bg-blue-700 bg-opacity-50 rounded-lg text-white placeholder-blue-300"
              />
            </div>
            <div>
              <label className="block text-green-200 mb-2">Standing Power Throw (SPT) in meters:</label>
              <input
                type="number"
                name="spt"
                value={scores.spt}
                onChange={handleInputChange}
                step="0.1"
                placeholder="4.5-12.5 m"
                className="w-full p-2 bg-blue-700 bg-opacity-50 rounded-lg text-white placeholder-blue-300"
              />
            </div>
            <div>
              <label className="block text-green-200 mb-2">Hand Release Push-Up (HRP) reps:</label>
              <input
                type="number"
                name="hrp"
                value={scores.hrp}
                onChange={handleInputChange}
                placeholder="10-60 reps"
                className="w-full p-2 bg-blue-700 bg-opacity-50 rounded-lg text-white placeholder-blue-300"
              />
            </div>
            <div>
              <label className="block text-green-200 mb-2">Sprint-Drag-Carry (SDC) in seconds:</label>
              <input
                type="number"
                name="sdc"
                value={scores.sdc}
                onChange={handleInputChange}
                placeholder="90-180 seconds"
                className="w-full p-2 bg-blue-700 bg-opacity-50 rounded-lg text-white placeholder-blue-300"
              />
            </div>
            <div>
              <label className="block text-green-200 mb-2">Plank (PLK) in seconds:</label>
              <input
                type="number"
                name="plk"
                value={scores.plk}
                onChange={handleInputChange}
                placeholder="120-220 seconds"
                className="w-full p-2 bg-blue-700 bg-opacity-50 rounded-lg text-white placeholder-blue-300"
              />
            </div>
            <div>
              <label className="block text-green-200 mb-2">2-Mile Run (2MR) in seconds:</label>
              <input
                type="number"
                name="run"
                value={scores.run}
                onChange={handleInputChange}
                placeholder="780-1200 seconds"
                className="w-full p-2 bg-blue-700 bg-opacity-50 rounded-lg text-white placeholder-blue-300"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={calculateScore}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 mb-8 shadow-lg"
      >
        Calculate ACFT Score
      </button>

      {totalScore > 0 && (
        <div className="mt-4 p-6 bg-blue-800 bg-opacity-50 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-green-300">Your ACFT Results:</h3>
          <p className="text-xl text-white mb-2">
            Total Score: <span className="font-bold text-green-200">{totalScore} / 600</span>
          </p>
          <p className="text-xl text-white mb-4">
            Status: <span className={`font-bold ${passed ? 'text-green-300' : 'text-red-300'}`}>
              {passed ? 'PASSED' : 'NOT PASSED'}
            </span>
          </p>
          <div className="grid grid-cols-2 gap-4">
            <p className="text-lg">MDL: {scores.mdl} lbs ({eventScores.mdl} points)</p>
            <p className="text-lg">SPT: {scores.spt} m ({eventScores.spt} points)</p>
            <p className="text-lg">HRP: {scores.hrp} reps ({eventScores.hrp} points)</p>
            <p className="text-lg">SDC: {formatTime(Number(scores.sdc))} ({eventScores.sdc} points)</p>
            <p className="text-lg">PLK: {formatTime(Number(scores.plk))} ({eventScores.plk} points)</p>
            <p className="text-lg">2MR: {formatTime(Number(scores.run))} ({eventScores.run} points)</p>
          </div>
        </div>
      )}

      <section className="mt-12 bg-blue-800 bg-opacity-50 p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 text-green-300">About the ACFT</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          The Army Combat Fitness Test (ACFT) consists of six events designed to measure soldiers' physical fitness and readiness for combat tasks. A minimum score of 60 points is required for each event, with a total minimum score of 360 points to pass the test.
        </p>
      </section>

      <footer className="mt-12 text-center text-blue-200 text-lg">
        <p>© 2024 ACFT Calculator. All rights reserved.</p>
        <p>Empowering soldiers to achieve peak physical readiness 💪</p>
      </footer>
    </div>
  );
}