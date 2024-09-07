'use client';

import React, { useState } from 'react';

export default function TI84Calculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [isGraphMode, setIsGraphMode] = useState(false);

  const handleKeyPress = (key: string) => {
    if (key === 'AC' || key === 'clear') {
      setDisplay('0');
      setExpression('');
    } else if (key === '=') {
      calculateResult();
    } else if (key === 'graph') {
      setIsGraphMode(!isGraphMode);
      setDisplay(isGraphMode ? '0' : 'Graph Mode');
    } else {
      setDisplay(prev => prev === '0' ? key : prev + key);
      setExpression(prev => prev + key);
    }
  };

  const calculateResult = () => {
    try {
      let result = evaluateExpression(expression);
      setDisplay(result.toString());
      setExpression(result.toString());
    } catch (error) {
      setDisplay('Error');
      setExpression('');
    }
  };

  const evaluateExpression = (expr: string) => {
    // Convert degrees to radians for trig functions
    expr = expr.replace(/tan\((\d+)\)/g, (match, degrees) => `Math.tan(${degrees} * Math.PI / 180)`);
    expr = expr.replace(/sin\((\d+)\)/g, (match, degrees) => `Math.sin(${degrees} * Math.PI / 180)`);
    expr = expr.replace(/cos\((\d+)\)/g, (match, degrees) => `Math.cos(${degrees} * Math.PI / 180)`);
    expr = expr.replace(/\^/g, '**');  // Replace ^ with ** for exponentiation
    return eval(expr);
  };

  const keypad = [
    ['y=', 'window', 'zoom', 'trace', 'graph'],
    ['2nd', 'mode', 'del', 'AC', 'clear'],
    ['alpha', 'X,T,θ,n', 'stat', '', ''],
    ['math', 'apps', 'prgm', 'vars', ''],
    ['x⁻¹', 'sin', 'cos', 'tan', '^'],
    ['x²', ',', '(', ')', '÷'],
    ['log', '7', '8', '9', '×'],
    ['ln', '4', '5', '6', '-'],
    ['STO→', '1', '2', '3', '+'],
    ['ON', '0', '.', '(-)', '='],
  ];

  const renderButton = (key: string, index: number) => (
    <button
      key={index}
      onClick={() => key ? handleKeyPress(key) : null}
      className={`p-2 m-1 bg-gray-700 text-white rounded text-xs ${key === '' ? 'invisible' : ''} ${key === 'graph' && isGraphMode ? 'bg-blue-500' : ''}`}
    >
      {key}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl text-white">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-300">TI-84 Calculator Online</h1>
      
      <div className="max-w-md mx-auto bg-gray-700 p-4 rounded-xl shadow-inner">
        <div className="bg-green-200 p-2 mb-4 rounded">
          <div className="text-black text-xs mb-1">NORMAL FLOAT AUTO REAL RADIAN MP</div>
          <div className="h-16 text-right text-2xl font-mono overflow-hidden text-black">
            {display}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-1">
          {keypad.flat().map((key, index) => renderButton(key, index))}
        </div>
      </div>

      {isGraphMode && (
        <div className="mt-4 p-4 bg-gray-700 rounded-xl text-center">
          <p className="text-lg text-blue-300">Graph mode is not fully implemented in this online version.</p>
        </div>
      )}

      <section className="mt-12 bg-gray-700 bg-opacity-50 p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 text-blue-300">About the TI-84 Calculator</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          The TI-84 Plus is a graphing calculator made by Texas Instruments. It's widely used in mathematics and science education, from middle school through college. This online version provides basic functionality similar to a physical TI-84 calculator.
        </p>
        <h3 className="text-2xl font-semibold mb-2 text-blue-300">Key Features:</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4">
          <li>Basic arithmetic operations</li>
          <li>Trigonometric functions (sin, cos, tan)</li>
          <li>Exponents and roots</li>
          <li>Logarithmic functions</li>
          <li>Basic graphing capabilities (not fully implemented in this version)</li>
        </ul>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          While this online version captures the essence of a TI-84 calculator, it's important to note that it doesn't include all the advanced features of the physical device, such as programming capabilities, statistical analysis tools, or full graphing functionality.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-400 text-lg">
        <p>© 2024 TI-84 Calculator Online. All rights reserved.</p>
        <p>Empowering mathematical exploration and problem-solving 🧮</p>
      </footer>
    </div>
  );
}