"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const ProductivityCalculator = () => {
  const [startTime, setStartTime] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [productivity, setProductivity] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculateEndTime = () => {
    if (!startTime || !scheduledTime || !productivity) {
      setResult(null);
      return;
    }

    // Parse start time
    const [time, modifier] = startTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier.toLowerCase() === 'pm' && hours < 12) {
      hours += 12;
    }
    if (modifier.toLowerCase() === 'am' && hours === 12) {
      hours = 0;
    }

    // Convert scheduled time to minutes
    const [scheduledHours, scheduledMinutes] = scheduledTime.split(':').map(Number);
    const totalScheduledMinutes = scheduledHours * 60 + scheduledMinutes;

    // Calculate productive minutes
    const productiveMinutes = (totalScheduledMinutes * parseFloat(productivity)) / 100;

    // Calculate end time
    let endMinutes = hours * 60 + minutes + productiveMinutes;
    let endHours = Math.floor(endMinutes / 60) % 24;
    let endMins = Math.round(endMinutes % 60);

    const endModifier = endHours >= 12 ? 'PM' : 'AM';
    if (endHours > 12) endHours -= 12;
    if (endHours === 0) endHours = 12;

    const formattedEndTime = `${endHours.toString().padStart(2, '0')}:${endMins
      .toString()
      .padStart(2, '0')} ${endModifier}`;

    setResult(formattedEndTime);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-blue-400">
        Productivity Calculator
      </h1>

      <div className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Optimize Your Workday</h2>
        <p className="mb-6 text-lg text-gray-300 leading-relaxed">
          Use this calculator to determine your perfect end time based on your start time,
          scheduled work duration, and desired productivity level. Maximize your efficiency
          and plan your day effectively.
        </p>

        <div className="space-y-6">
          {/* Start Time Input */}
          <div>
            <label className="block text-gray-300 text-lg font-medium mb-2">
              Start Time <span className="text-gray-400">(Format: HH:MM AM/PM, e.g., 07:00 AM)</span>
            </label>
            <input
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="07:00 AM"
              className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-500 text-lg font-medium"
            />
          </div>

          {/* Scheduled Time Input */}
          <div>
            <label className="block text-gray-300 text-lg font-medium mb-2">
              Scheduled Work Time <span className="text-gray-400">(Format: HH:MM, e.g., 10:30)</span>
            </label>
            <input
              type="text"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              placeholder="10:30"
              className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-500 text-lg font-medium"
            />
          </div>

          {/* Productivity Percentage Input */}
          <div>
            <label className="block text-gray-300 text-lg font-medium mb-2">
              Productivity Percentage <span className="text-gray-400">(Enter a number between 0 and 100)</span>
            </label>
            <input
              type="number"
              value={productivity}
              onChange={(e) => setProductivity(e.target.value)}
              placeholder="70"
              className="w-full p-4 bg-gray-700 rounded-lg text-white placeholder-gray-500 text-lg font-medium"
            />
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateEndTime}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 text-xl shadow-md"
          >
            Calculate Perfect End Time
          </button>
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-center text-blue-400">Your Result</h3>
          <div className="flex justify-center items-center mb-4">
            <p className="text-3xl font-bold text-yellow-400">
              Perfect End Time: {result}
            </p>
          </div>
        </div>
      )}

      {/* Additional Content */}
      <div className="mt-12 bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-400">Understanding Your Results</h2>
        <h3 className="text-2xl font-semibold mb-4 text-center text-blue-300">Maximizing Productivity</h3>
        <p className="mb-6 text-lg text-gray-300 text-center">
          Productivity isn't just about working harder—it's about working smarter. By knowing
          your optimal end time, you can allocate your energy efficiently throughout the day.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-center text-blue-300">Why Use a Productivity Calculator?</h3>
        <p className="mb-6 text-lg text-gray-300">
          This calculator helps you:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Plan your workday effectively</li>
          <li>Set realistic goals based on your productivity levels</li>
          <li>Avoid burnout by preventing over-scheduling</li>
          <li>Improve time management skills</li>
          <li>Enhance overall work-life balance</li>
        </ul>
      </div>

      {/* Tips for Boosting Productivity */}
      <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-teal-400">Tips for Boosting Productivity</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Prioritize tasks based on importance and urgency</li>
          <li>Take regular short breaks to refresh your mind</li>
          <li>Eliminate distractions by setting a focused work environment</li>
          <li>Set specific goals for each work session</li>
          <li>Use productivity techniques like the Pomodoro Technique</li>
          <li>Ensure adequate rest and maintain a healthy lifestyle</li>
        </ul>
      </div>

      {/* Integrating Productivity into Daily Life */}
      <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2 text-teal-400">Integrating Productivity into Daily Life</h3>
        <p className="mb-4 text-gray-300">
          Productivity isn't confined to the workplace. By applying these principles to your
          daily routine, you can achieve personal goals, maintain relationships, and enjoy
          leisure activities without feeling overwhelmed.
        </p>
        <p className="mb-4 text-gray-300">
          Remember, the key to sustained productivity is balance. Ensure you're allocating
          time to all aspects of your life.
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-gray-800 border-t border-gray-700 rounded-lg p-6 text-center">
        <p className="text-gray-400 text-lg">&copy; 2024 Productivity Calculator. All rights reserved.</p>
        <p className="mt-2 text-gray-500">
          Disclaimer: This tool provides estimates for planning purposes. Individual results
          may vary based on various factors.
        </p>
      </footer>
    </div>
  );
};

export default ProductivityCalculator;