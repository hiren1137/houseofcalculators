'use client';

import React, { useState } from 'react';

export default function BraSizeCalculator() {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [bandSize, setBandSize] = useState<string>('');
  const [bustSize, setBustSize] = useState<string>('');
  const [country, setCountry] = useState<string>('USA');
  const [result, setResult] = useState<string | null>(null);

  const calculateSize = () => {
    if (!bandSize || !bustSize) {
      setResult('Please enter both measurements.');
      return;
    }

    let band = parseFloat(bandSize);
    let bust = parseFloat(bustSize);

    if (unit === 'cm') {
      band = band / 2.54;
      bust = bust / 2.54;
    }

    const difference = bust - band;

    let cupSize = '';
    if (difference <= 1) cupSize = 'A';
    else if (difference <= 2) cupSize = 'B';
    else if (difference <= 3) cupSize = 'C';
    else if (difference <= 4) cupSize = 'D';
    else cupSize = 'DD+';

    const calculatedBandSize = Math.round(band / 2) * 2;

    let size = '';
    switch (country) {
      case 'USA':
        size = `${calculatedBandSize}${cupSize}`;
        break;
      case 'UK':
        size = `${calculatedBandSize}${cupSize === 'DD+' ? 'E+' : cupSize}`;
        break;
      case 'Australia':
        size = `${calculatedBandSize + 6}${cupSize}`;
        break;
      case 'India':
        size = `${calculatedBandSize}${cupSize}`;
        break;
      default:
        size = `${calculatedBandSize}${cupSize}`;
    }

    setResult(`Your estimated bra size in ${country} is: ${size}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gray-900 text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center text-cyan-400">Bra Size Calculator</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-12">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Measurement Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'inches' | 'cm')}
              className="w-full p-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="inches">Inches</option>
              <option value="cm">Centimeters</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Band Size ({unit})</label>
            <input
              type="number"
              value={bandSize}
              onChange={(e) => setBandSize(e.target.value)}
              placeholder={`Enter band size in ${unit}`}
              className="w-full p-2 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Bust Size ({unit})</label>
            <input
              type="number"
              value={bustSize}
              onChange={(e) => setBustSize(e.target.value)}
              placeholder={`Enter bust size in ${unit}`}
              className="w-full p-2 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Australia">Australia</option>
              <option value="India">India</option>
            </select>
          </div>

          <button
            onClick={calculateSize}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-300 text-lg"
          >
            Calculate Bra Size
          </button>

          {result && (
            <div className="mt-6 p-6 bg-gray-700 rounded-lg shadow-lg border border-cyan-500 transform transition-all duration-300 ease-in-out">
              <h3 className="text-xl font-semibold mb-2 text-cyan-300 text-center">Your Result</h3>
              <div className="flex items-center justify-center">
                <svg className="w-8 h-8 text-cyan-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="text-2xl font-bold text-white">
                  {result.split(': ')[0]}: <span className="text-cyan-300">{result.split(': ')[1]}</span>
                </p>
              </div>
              <p className="mt-4 text-sm text-gray-400 text-center">
                This is an estimate based on your measurements. For the best fit, we recommend trying on bras in this size and adjacent sizes.
              </p>
            </div>
          )}
        </div>
      </div>

      <h2 className="text-3xl font-semibold mb-6 text-cyan-300">The Complete Guide to Measuring Bra Size</h2>

      <div className="space-y-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-cyan-200">Why Proper Bra Sizing Matters</h3>
          <p className="text-lg text-gray-300 mb-4">
            Finding the right bra size is crucial for comfort, support, and overall well-being. A well-fitting bra can improve posture, reduce back pain, and boost confidence. Unfortunately, studies suggest that up to 80% of women wear the wrong bra size, often due to a lack of knowledge about proper sizing techniques or changes in body shape over time.
          </p>
          <p className="text-lg text-gray-300">
            Wearing an ill-fitting bra can lead to a range of issues, including discomfort, poor posture, and even long-term health problems. Too tight, and you might experience breathing difficulties or skin irritation. Too loose, and you&apos;ll lack the necessary support, potentially leading to back and shoulder pain.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-cyan-200">Step-by-Step Guide to Measuring Your Bra Size</h3>
          <ol className="list-decimal list-inside text-lg space-y-4 text-gray-300">
            <li>
              <strong>Wear the right bra:</strong> Start with an unpadded bra or no bra at all for the most accurate measurements.
            </li>
            <li>
              <strong>Measure your band size:</strong> 
              <ul className="list-disc list-inside ml-6 mt-2">
                <li>Wrap a measuring tape snugly around your ribcage, just under your breasts.</li>
                <li>Make sure the tape is parallel to the ground and breathe normally.</li>
                <li>Round to the nearest whole number. If it&apos;s an odd number, round up to the next even number.</li>
              </ul>
            </li>
            <li>
              <strong>Measure your bust size:</strong>
              <ul className="list-disc list-inside ml-6 mt-2">
                <li>Wrap the measuring tape around the fullest part of your bust.</li>
                <li>Don&apos;t pull the tape too tight; it should be just tight enough to stay in place.</li>
                <li>Round to the nearest whole number.</li>
              </ul>
            </li>
            <li>
              <strong>Calculate your cup size:</strong> Subtract your band size from your bust measurement. The difference determines your cup size according to the following chart:
            </li>
          </ol>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto">
          <h3 className="text-2xl font-semibold mb-4 text-cyan-200">Cup Size Chart</h3>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 text-cyan-300">Difference (inches)</th>
                <th className="px-4 py-2 text-cyan-300">Cup Size</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr><td className="px-4 py-2">Less than 1</td><td className="px-4 py-2">AA</td></tr>
              <tr><td className="px-4 py-2">1</td><td className="px-4 py-2">A</td></tr>
              <tr><td className="px-4 py-2">2</td><td className="px-4 py-2">B</td></tr>
              <tr><td className="px-4 py-2">3</td><td className="px-4 py-2">C</td></tr>
              <tr><td className="px-4 py-2">4</td><td className="px-4 py-2">D</td></tr>
              <tr><td className="px-4 py-2">5</td><td className="px-4 py-2">DD/E</td></tr>
              <tr><td className="px-4 py-2">6</td><td className="px-4 py-2">DDD/F</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-cyan-200">Understanding Different Sizing Systems</h3>
          <p className="text-lg text-gray-300 mb-4">
            Bra sizing can vary significantly between countries, which can be confusing when shopping internationally or comparing sizes. Here&apos;s a quick overview of how sizing differs in our four main countries:
          </p>
          <ul className="list-disc list-inside text-lg space-y-2 text-gray-300">
            <li><strong>USA and UK:</strong> These countries use the same band sizing system, but cup sizes can differ slightly for larger sizes.</li>
            <li><strong>Australia:</strong> Band sizes are typically 6 inches larger than US/UK sizes. For example, a US/UK 32 band would be a 38 in Australia.</li>
            <li><strong>India:</strong> Band sizes are often listed in centimeters and may be up to 20 cm larger than US/UK sizes.</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto">
          <h3 className="text-2xl font-semibold mb-4 text-cyan-200">International Band Size Conversion Chart</h3>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 text-cyan-300">US/UK</th>
                <th className="px-4 py-2 text-cyan-300">Australia</th>
                <th className="px-4 py-2 text-cyan-300">India (cm)</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr><td className="px-4 py-2">30</td><td className="px-4 py-2">36</td><td className="px-4 py-2">65-70</td></tr>
              <tr><td className="px-4 py-2">32</td><td className="px-4 py-2">38</td><td className="px-4 py-2">70-75</td></tr>
              <tr><td className="px-4 py-2">34</td><td className="px-4 py-2">40</td><td className="px-4 py-2">75-80</td></tr>
              <tr><td className="px-4 py-2">36</td><td className="px-4 py-2">42</td><td className="px-4 py-2">80-85</td></tr>
              <tr><td className="px-4 py-2">38</td><td className="px-4 py-2">44</td><td className="px-4 py-2">85-90</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-cyan-200">Tips for Finding the Perfect Fit</h3>
          <ul className="list-disc list-inside text-lg space-y-2 text-gray-300">
            <li>Always try on a bra before purchasing, if possible. Sizes can vary between brands and styles.</li>
            <li>The band should be snug but not tight. You should be able to fit two fingers under the band comfortably.</li>
            <li>The center gore (the part between the cups) should lie flat against your sternum.</li>
            <li>Cups should fully contain your breast tissue without any spillage or gaping.</li>
            <li>Straps should stay in place without digging into your shoulders.</li>
            <li>When you raise your arms, the bra should stay in place without riding up.</li>
            <li>Remember that your bra size can change due to factors like weight fluctuations, pregnancy, or menopause.</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-cyan-200">Common Bra Fitting Issues and Solutions</h3>
          <ul className="list-disc list-inside text-lg space-y-4 text-gray-300">
            <li>
              <strong>Straps digging in or slipping off:</strong> This often indicates a band that&apos;s too loose. Try a smaller band size or adjust the straps. Remember, straps should provide only 10% of the support.
            </li>
            <li>
              <strong>Band riding up in the back:</strong> The band is likely too big. Go down a band size and up a cup size to maintain the same volume.
            </li>
            <li>
              <strong>Cups gaping or wrinkling:</strong> The cups are too large. Try going down a cup size or choosing a different style that better suits your breast shape.
            </li>
            <li>
              <strong>Breast tissue spilling out of cups:</strong> The cups are too small. Go up a cup size while keeping the same band size.
            </li>
            <li>
              <strong>Underwire poking or not sitting flat:</strong> This could indicate a cup that&apos;s too small or a style that doesn&apos;t match your breast shape. Try a larger cup size or a different style.
            </li>
            <li>
              <strong>Center gore not lying flat:</strong> This often means the cups are too small. Try going up a cup size.
            </li>
          </ul>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-cyan-200">The Importance of Regular Fittings</h3>
          <p className="text-lg text-gray-300 mb-4">
            Your bra size isn&apos;t static; it can change throughout your life due to various factors. It&apos;s recommended to get fitted or remeasure yourself every 6-12 months, or if you experience any of the following:
          </p>
          <ul className="list-disc list-inside text-lg space-y-2 text-gray-300">
            <li>Significant weight gain or loss</li>
            <li>Pregnancy or breastfeeding</li>
            <li>Hormonal changes, including menopause</li>
            <li>Starting or changing a fitness routine</li>
            <li>Changes in medication that might affect your body</li>
          </ul>
          <p className="text-lg text-gray-300 mt-4">
            Regular fittings ensure that you&apos;re always wearing the most comfortable and supportive bra for your current body shape, promoting better breast health and overall comfort.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-cyan-200">Caring for Your Bras</h3>
          <p className="text-lg text-gray-300 mb-4">
            Proper care can extend the life of your bras, ensuring they maintain their shape and support for longer. Here are some tips:
          </p>
          <ul className="list-disc list-inside text-lg space-y-2 text-gray-300">
            <li>Hand wash your bras or use a lingerie bag if machine washing.</li>
            <li>Use cold water and a gentle detergent to prevent fabric degradation.</li>
            <li>Never put bras in the dryer; always air dry them.</li>
            <li>Store bras with the cups facing outward to maintain their shape.</li>
            <li>Rotate your bras to give the elastic time to recover between wears.</li>
            <li>Replace your bras every 6-12 months, depending on wear and care.</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-cyan-200">Conclusion</h3>
          <p className="text-lg text-gray-300 mb-4">
            Finding the right bra size is a journey, not a destination. Your body changes over time, and so will your bra needs. By understanding how to measure yourself, recognizing the signs of a good fit, and knowing how to care for your bras, you&apos;re well on your way to achieving optimal comfort and support.
          </p>
          <p className="text-lg text-gray-300 mb-4">
            Remember, while our calculator provides a great starting point, it&apos;s always beneficial to try on bras and get professional fittings when possible. Every brand and style fits differently, so don&apos;t be discouraged if you need to try a few sizes to find your perfect fit.
          </p>
          <p className="text-lg text-gray-300">
            Embrace your unique shape and size, and celebrate the diversity of bodies. A well-fitting bra isn&apos;t just about looks; it&apos;s about feeling comfortable, confident, and supported in your everyday life.
          </p>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Bra Size Calculator. All rights reserved.</p>
        <p>This calculator provides estimates. For the most accurate fit, consider professional fitting.</p>
      </footer>
    </div>
  );
}
