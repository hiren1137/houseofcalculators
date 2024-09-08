'use client';

import { useState } from 'react';

interface WeatherData {
  cityName: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
}

export default function SnowDayCalculator() {
  const [zipCode, setZipCode] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateSnowDayProbability = (temp: number, humidity: number, windSpeed: number) => {
    let probability = Math.max(0, Math.min(100, (32 - temp) * 5));
    
    if (humidity > 70) {
      probability += (humidity - 70) * 0.5;
    }

    if (windSpeed < 10) {
      probability += (10 - windSpeed) * 2;
    } else if (windSpeed > 20) {
      probability += (windSpeed - 20) * 1.5; // Higher winds can increase chance of school closure
    }

    return Math.min(probability, 100);
  };

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setWeatherData(null);
    const apiKey = 'eae8d513dd864717e6fca13277d2ffa1'; // Your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=imperial`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      console.log('API Response:', data);

      const weatherInfo: WeatherData = {
        cityName: data.name,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        description: data.weather[0].description
      };

      setWeatherData(weatherInfo);

      const snowDayProbability = calculateSnowDayProbability(weatherInfo.temp, weatherInfo.humidity, weatherInfo.windSpeed);

      setResult(`The likelihood of a snow day (school closure) in ${weatherInfo.cityName} is ${snowDayProbability.toFixed(1)}%`);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to calculate snow day likelihood. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl shadow-2xl text-white">
      <h1 className="text-4xl font-bold mb-6 text-center flex items-center justify-center">
        <span className="mr-4">❄️</span>
        Snow Day Calculator: School Closing Predictor
        <span className="ml-4">❄️</span>
      </h1>
      
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-blue-200">Will Your School Have a Snow Day?</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
        Welcome to our magical Snow Day Calculator! ✨ Wondering if your school might close due to snow? Our enchanted tool uses real-time weather data to predict the likelihood of a snow day and potential school closure in your area.
        </p>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Simply enter your US ZIP code below, and we&apos;ll analyze the latest weather conditions to calculate your chances of a snowy school day off!
        </p>
      </section>

      <div className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Enter US ZIP code..."
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="w-full p-4 bg-white bg-opacity-20 rounded-lg placeholder-gray-300 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
        />
        <button
          onClick={handleCalculate}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 text-lg"
        >
          {loading ? 'Predicting School Closure...' : 'CALCULATE SNOW DAY CHANCES ❄️'}
        </button>
      </div>

      {result && weatherData && (
        <div className="mt-8 p-6 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
          <p className="text-2xl font-semibold mb-4 text-center">{result}</p>
          <div className="text-lg">
            <p className="font-semibold mb-2 text-blue-200">Current Weather in {weatherData.cityName}:</p>
            <ul className="list-none space-y-2">
              <li>🌡️ Temperature: {weatherData.temp.toFixed(1)}°F (Feels like: {weatherData.feelsLike.toFixed(1)}°F)</li>
              <li>💧 Humidity: {weatherData.humidity}%</li>
              <li>💨 Wind Speed: {weatherData.windSpeed.toFixed(1)} mph</li>
              <li>🌤️ Conditions: {weatherData.description}</li>
            </ul>
          </div>
        </div>
      )}

      {error && (
        <p className="text-xl text-red-300 mt-4 text-center">{error}</p>
      )}

      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-4 text-blue-200">How Our Snow Day Predictor Works</h2>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed">
          Our Snow Day Calculator uses a combination of meteorological factors to predict the likelihood of school closures due to snow:
        </p>
        <ul className="list-disc list-inside text-xl text-gray-300 mb-4 space-y-2">
          <li>❄️ Temperature: Colder temperatures increase the chance of snow and school closures.</li>
          <li>💧 Humidity: Higher humidity can lead to more significant snowfall.</li>
          <li>💨 Wind Speed: Both very low and very high wind speeds can affect school closing decisions.</li>
        </ul>
        <p className="text-xl text-gray-300 leading-relaxed">
          We use real-time weather data from the OpenWeatherMap API to provide you with the most accurate snow day predictions for your school district.
        </p>
      </section>

      <footer className="mt-12 text-center text-gray-400 text-lg">
        <p>© 2024 Snow Day Calculator: School Closing Predictor. All rights reserved.</p>
        <p>Powered by OpenWeatherMap API and school closure prediction algorithms ✨</p>
      </footer>
    </div>
  );
}