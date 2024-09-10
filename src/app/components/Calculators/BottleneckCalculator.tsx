'use client';

import React, { useState } from 'react';

interface Component {
  name: string;
  score: number;
}

interface Resolution {
  name: string;
  factor: number;
}

interface Purpose {
  name: string;
  cpuWeight: number;
  gpuWeight: number;
}

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
  ] as Component[],
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
  ] as Component[],
  resolutions: [
    { name: "1080p", factor: 1.0 },
    { name: "1440p", factor: 0.75 },
    { name: "4K", factor: 0.5 },
  ] as Resolution[],
  purposes: [
    { name: "Gaming", cpuWeight: 0.3, gpuWeight: 0.7 },
    { name: "Content Creation", cpuWeight: 0.6, gpuWeight: 0.4 },
    { name: "General Tasks", cpuWeight: 0.5, gpuWeight: 0.5 },
  ] as Purpose[],
};

function calculateBottleneck(cpu: Component, gpu: Component, resolution: Resolution, purpose: Purpose): { bottleneck: number; bottleneckComponent: string } {
  const adjustedCpuScore = cpu.score * purpose.cpuWeight;
  const adjustedGpuScore = gpu.score * purpose.gpuWeight * resolution.factor;
  
  const maxScore = Math.max(adjustedCpuScore, adjustedGpuScore);
  const minScore = Math.min(adjustedCpuScore, adjustedGpuScore);
  const bottleneck = ((maxScore - minScore) / maxScore) * 100;
  
  const bottleneckComponent = adjustedCpuScore < adjustedGpuScore ? "CPU" : "GPU";
  
  return { bottleneck, bottleneckComponent };
}

function interpretBottleneck(bottleneck: number): { text: string; color: string } {
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
  const [cpu, setCpu] = useState<Component>(components.cpus[0]);
  const [gpu, setGpu] = useState<Component>(components.gpus[0]);
  const [resolution, setResolution] = useState<Resolution>(components.resolutions[0]);
  const [purpose, setPurpose] = useState<Purpose>(components.purposes[0]);
  const [result, setResult] = useState<{ bottleneck: number; bottleneckComponent: string; interpretation: { text: string; color: string } } | null>(null);

  const handleCalculate = () => {
    const { bottleneck, bottleneckComponent } = calculateBottleneck(cpu, gpu, resolution, purpose);
    const interpretation = interpretBottleneck(bottleneck);
    setResult({ bottleneck, bottleneckComponent, interpretation });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-900 rounded-xl shadow-lg space-y-8">
      <h1 className="text-5xl font-extrabold text-center text-white mb-8">PC Component Bottleneck Calculator</h1>
      
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
          <p className="text-center text-3xl mb-6 font-bold" style={{color: result.interpretation.color}}>
            {result.interpretation.text}
          </p>
          <p className="text-center text-2xl">
            This configuration has a <span className="font-bold text-blue-400">{result.bottleneck.toFixed(1)}% {result.bottleneckComponent} bottleneck</span>.
          </p>
        </div>
      )}
    </div>
  );
}