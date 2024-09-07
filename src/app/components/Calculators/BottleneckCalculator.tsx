'use client';

import React, { useState } from 'react';

const components = {
  cpus: [
    { name: "Intel Core i3-10100", score: 60 },
    { name: "Intel Core i5-11400", score: 75 },
    { name: "Intel Core i5-13400F", score: 80 },
    { name: "Intel Core i7-12700K", score: 90 },
    { name: "Intel Core i7-13700K", score: 95 },
    { name: "Intel Core i9-13900K", score: 100 },
    { name: "AMD Ryzen 3 3300X", score: 65 },
    { name: "AMD Ryzen 5 5600X", score: 85 },
    { name: "AMD Ryzen 7 5800X", score: 92 },
    { name: "AMD Ryzen 9 5950X", score: 98 },
  ],
  gpus: [
    { name: "NVIDIA GeForce GTX 1650", score: 50 },
    { name: "NVIDIA GeForce GTX 1660 Super", score: 65 },
    { name: "NVIDIA GeForce RTX 3060", score: 75 },
    { name: "NVIDIA GeForce RTX 3070", score: 85 },
    { name: "NVIDIA GeForce RTX 3080", score: 95 },
    { name: "NVIDIA GeForce RTX 4070", score: 90 },
    { name: "NVIDIA GeForce RTX 4080", score: 98 },
    { name: "AMD Radeon RX 6600", score: 70 },
    { name: "AMD Radeon RX 6700 XT", score: 80 },
    { name: "AMD Radeon RX 6800 XT", score: 93 },
  ],
  resolutions: [
    { name: "1080p", factor: 1.0 },
    { name: "1440p", factor: 0.75 },
    { name: "4K", factor: 0.5 },
  ],
  purposes: [
    { name: "Gaming", cpuWeight: 0.3, gpuWeight: 0.7 },
    { name: "Content Creation", cpuWeight: 0.6, gpuWeight: 0.4 },
    { name: "General Tasks", cpuWeight: 0.5, gpuWeight: 0.5 },
  ],
};

function calculateBottleneck(cpu, gpu, resolution, purpose) {
  // Adjust scores based on purpose weights and resolution
  const adjustedCpuScore = cpu.score * purpose.cpuWeight;
  const adjustedGpuScore = gpu.score * purpose.gpuWeight * resolution.factor;
  
  // Calculate the bottleneck percentage
  const maxScore = Math.max(adjustedCpuScore, adjustedGpuScore);
  const minScore = Math.min(adjustedCpuScore, adjustedGpuScore);
  const bottleneck = ((maxScore - minScore) / maxScore) * 100;
  
  // Determine the bottleneck component
  const bottleneckComponent = adjustedCpuScore < adjustedGpuScore ? "CPU" : "GPU";
  
  return { bottleneck, bottleneckComponent };
}

function interpretBottleneck(bottleneck) {
  if (bottleneck < 5) {
    return { text: "Well-balanced configuration", color: "#4CAF50" };
  } else if (bottleneck < 10) {
    return { text: "Minor bottleneck", color: "#FFC107" };
  } else if (bottleneck < 15) {
    return { text: "Moderate bottleneck", color: "#FF9800" };
  } else {
    return { text: "Significant bottleneck", color: "#F44336" };
  }
}

export default function BottleneckCalculator() {
  const [cpu, setCpu] = useState(components.cpus[0]);
  const [gpu, setGpu] = useState(components.gpus[0]);
  const [resolution, setResolution] = useState(components.resolutions[0]);
  const [purpose, setPurpose] = useState(components.purposes[0]);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const { bottleneck, bottleneckComponent } = calculateBottleneck(cpu, gpu, resolution, purpose);
    const interpretation = interpretBottleneck(bottleneck);
    setResult({ bottleneck, bottleneckComponent, interpretation });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-900 rounded-xl shadow-lg space-y-8">
      <h1 className="text-5xl font-extrabold text-center text-white mb-8">PC Component Bottleneck Calculator</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">What is a Bottleneck?</h2>
        <p className="text-gray-300 text-xl">
          A bottleneck occurs when one component limits the overall performance of your system. 
          This calculator helps identify potential bottlenecks in your PC build.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-2xl font-bold text-white mb-3">CPU</label>
          <select
            className="w-full p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
            value={cpu.name}
            onChange={(e) => setCpu(components.cpus.find(c => c.name === e.target.value) || components.cpus[0])}
          >
            {components.cpus.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-2xl font-bold text-white mb-3">GPU</label>
          <select
            className="w-full p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
            value={gpu.name}
            onChange={(e) => setGpu(components.gpus.find(g => g.name === e.target.value) || components.gpus[0])}
          >
            {components.gpus.map((g) => (
              <option key={g.name} value={g.name}>{g.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-2xl font-bold text-white mb-3">Resolution</label>
          <select
            className="w-full p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
            value={resolution.name}
            onChange={(e) => setResolution(components.resolutions.find(r => r.name === e.target.value) || components.resolutions[0])}
          >
            {components.resolutions.map((r) => (
              <option key={r.name} value={r.name}>{r.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-2xl font-bold text-white mb-3">Purpose</label>
          <select
            className="w-full p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
            value={purpose.name}
            onChange={(e) => setPurpose(components.purposes.find(p => p.name === e.target.value) || components.purposes[0])}
          >
            {components.purposes.map((p) => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 text-2xl"
      >
        Calculate Bottleneck
      </button>

      {result && (
        <div className="mt-10 p-8 bg-gray-800 rounded-lg text-white">
          <h3 className="text-4xl font-bold mb-8 text-center">Result</h3>
          <div className="flex justify-center mb-10">
            <div className="relative w-full max-w-md h-64">
              <svg viewBox="0 0 200 100" className="w-full h-full">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4CAF50" />
                    <stop offset="50%" stopColor="#FFC107" />
                    <stop offset="100%" stopColor="#F44336" />
                  </linearGradient>
                </defs>
                <path d="M20 80 A 80 80 0 0 1 180 80" fill="none" stroke="#333" strokeWidth="16" />
                <path 
                  d="M20 80 A 80 80 0 0 1 180 80" 
                  fill="none" 
                  stroke="url(#gradient)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path 
                  d={`M100 100 L${100 + 80 * Math.cos((result.bottleneck / 100 * Math.PI) - Math.PI)} ${100 + 80 * Math.sin((result.bottleneck / 100 * Math.PI) - Math.PI)}`} 
                  stroke="white" 
                  strokeWidth="4"
                />
                <circle 
                  cx={100 + 80 * Math.cos((result.bottleneck / 100 * Math.PI) - Math.PI)} 
                  cy={100 + 80 * Math.sin((result.bottleneck / 100 * Math.PI) - Math.PI)} 
                  r="8" 
                  fill="white" 
                />
                <text x="100" y="50" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">{result.bottleneck.toFixed(1)}%</text>
              </svg>
            </div>
          </div>
          <p className="text-center text-3xl mb-6 font-bold" style={{color: result.interpretation.color}}>
            {result.interpretation.text}
          </p>
          <p className="text-center text-2xl">
            This configuration has a <span className="font-bold text-blue-400">{result.bottleneck.toFixed(1)}% {result.bottleneckComponent} bottleneck</span>.
          </p>
        </div>
      )}

      <div className="bg-gray-800 p-8 rounded-lg mt-10">
        <h2 className="text-3xl font-bold text-white mb-6">How to Interpret the Results</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-4 text-xl">
          <li><span className="text-green-400 font-bold">0-5%</span>: Excellent balance</li>
          <li><span className="text-yellow-300 font-bold">5-10%</span>: Good balance, minor bottleneck</li>
          <li><span className="text-orange-400 font-bold">10-15%</span>: Moderate bottleneck, consider upgrading</li>
          <li><span className="text-red-400 font-bold">15%+</span>: Significant bottleneck, upgrade recommended</li>
        </ul>
      </div>

      <div className="bg-gray-800 p-8 rounded-lg mt-10">
        <h2 className="text-3xl font-bold text-white mb-6">Tips for Reducing Bottlenecks</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-4 text-xl">
          <li>Upgrade the bottlenecked component (CPU or GPU)</li>
          <li>Adjust in-game settings to balance the load</li>
          <li>Overclock the bottlenecked component (if safe)</li>
          <li>Ensure adequate cooling for optimal performance</li>
          <li>Consider upgrading RAM or storage if limiting</li>
        </ul>
      </div>
    </div>
  );
}