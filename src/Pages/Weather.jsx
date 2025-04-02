// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
// Removed unused icons FaStore, FaFileAlt, FaCloud, FaLeaf, FaUser for this component
// Removed unused Link import
// import { FaStore, FaFileAlt, FaCloud, FaLeaf, FaUser } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

const Weather = () => {
  const [cityName, setCityName] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- IMPORTANT: Replace with your actual OpenWeatherMap API key ---
  // --- Best practice: Store this in an environment variable (.env file) ---
  const API_KEY = 'c20067050b9a621988bd9b558575ec02';
  // Example using environment variable: const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  // Function to fetch weather data (can be called by city or coordinates)
  const fetchWeatherData = async ({ city = null, lat = null, lon = null }) => {
    if (!API_KEY || API_KEY === 'c20067050b9a621988bd9b558575ec02') {
       setError('Please add your OpenWeatherMap API key to the code.');
       setLoading(false);
       return;
    }

    setLoading(true);
    setError(null); // Clear previous errors
    setCurrentWeather(null); // Clear previous data
    setForecastData(null); // Clear previous data

    const units = 'metric'; // Use 'imperial' for Fahrenheit

    // Construct URLs based on input
    let currentUrl, forecastUrl;
    if (city) {
      currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`;
    } else if (lat && lon) {
      currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
    } else {
      setError('Please enter a city name or allow location access.');
      setLoading(false);
      return;
    }

    try {
      // Fetch both current weather and forecast data concurrently
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(currentUrl),
        fetch(forecastUrl),
      ]);

      // Check if responses are ok
      if (!currentResponse.ok) {
        const errorData = await currentResponse.json();
        throw new Error(`Current Weather Error: ${errorData.message || currentResponse.statusText}`);
      }
      if (!forecastResponse.ok) {
        const errorData = await forecastResponse.json();
        throw new Error(`Forecast Error: ${errorData.message || forecastResponse.statusText}`);
      }

      // Parse JSON data
      const currentData = await currentResponse.json();
      const forecastRawData = await forecastResponse.json();

      // Process forecast data to get one entry per day (around midday)
      const dailyForecasts = processForecastData(forecastRawData.list);

      setCurrentWeather(currentData);
      setForecastData(dailyForecasts);

    } catch (err) {
      console.error("API Fetch Error:", err);
      setError(err.message || 'Failed to fetch weather data. Check city name or network.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to process the 3-hour forecast data into daily summaries
  const processForecastData = (list) => {
    const dailyData = {};
    list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      // Store the forecast closest to midday (12:00) for each day
      if (!dailyData[date] || Math.abs(new Date(item.dt * 1000).getHours() - 12) < Math.abs(new Date(dailyData[date].dt * 1000).getHours() - 12)) {
        dailyData[date] = item;
      }
    });
    // Return the values (forecast objects) sorted by date, limited to 5 days
    return Object.values(dailyData).sort((a, b) => a.dt - b.dt).slice(0, 5);
  };


  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission if wrapped in a form
    if (cityName.trim()) {
      fetchWeatherData({ city: cityName });
    } else {
      setError('Please enter a city name.');
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData({ lat: latitude, lon: longitude });
        },
        (err) => {
          console.error("Geolocation Error:", err);
          setError(`Geolocation Error: ${err.message}. Please ensure location access is granted.`);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  // Helper to format date
  const formatDate = (timestamp, options = { weekday: 'short', month: 'short', day: 'numeric' }) => {
    return new Date(timestamp * 1000).toLocaleDateString(undefined, options);
  };


  return (
    // Removed outer flex container as it might conflict with parent layout
    // Assuming this component is placed within a structure that handles the overall layout
    <div className="flex-grow p-6 bg-gray-100"> {/* Added padding here */}
      {/* Search Section */}
      {/* Removed duplicate h1 */}
      {/* <h1 className="text-xl font-bold">Weather Page</h1> */}
      <div className="p-6 mb-6 bg-white rounded shadow-md">
        <h3 className="mb-4 text-lg font-semibold text-gray-700">Enter a City Name</h3> {/* Adjusted styles */}
        {/* Using a form for better accessibility and handling Enter key */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex items-center">
            <input
              type="text"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              placeholder="E.g: London, Tokyo, New York" // Updated placeholder
              className="flex-grow p-3 mr-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" // Adjusted styles
              aria-label="City Name"
            />
            <button
              type="submit"
              disabled={loading} // Disable button while loading
              className="px-6 py-3 font-medium text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed" // Adjusted styles & colors
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
        <div className="relative mb-4 text-center"> {/* Separator styling */}
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
                <span className="px-2 text-sm text-gray-500 bg-white">or</span>
            </div>
        </div>
        <button
          onClick={handleCurrentLocation}
          disabled={loading} // Disable button while loading
          className="w-full px-4 py-3 font-medium text-gray-700 bg-yellow-300 rounded hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed" // Adjusted styles & colors
        >
          {loading ? 'Getting Location...' : 'Use Current Location'}
        </button>
      </div>

       {/* Loading State */}
      {loading && !error && <p className="text-center text-gray-600">Loading weather data...</p>}

      {/* Error Display */}
      {error && <div className="p-4 mb-6 text-red-800 bg-red-100 border border-red-400 rounded shadow-md" role="alert">{error}</div>}

      {/* Current Weather - Conditionally Rendered */}
      {currentWeather && !loading && !error && (
        <section className="p-6 mb-6 text-white bg-green-500 rounded-lg shadow-md"> {/* Adjusted styles */}
          <h3 className="mb-4 text-xl font-bold text-center">Current Weather</h3>
          <div className="flex flex-col items-center text-center sm:flex-row sm:justify-between sm:text-left">
            {/* Left side: City, Date, Description */}
            <div className='mb-4 sm:mb-0'>
              <h4 className="text-2xl font-semibold">{currentWeather.name}, {currentWeather.sys.country}</h4>
              <p className="text-sm">{formatDate(currentWeather.dt, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              {currentWeather.weather[0] && (
                <div className="flex items-center justify-center mt-2 sm:justify-start">
                  <img
                      src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                      alt={currentWeather.weather[0].description}
                      className="w-12 h-12 mr-2"
                    />
                  <p className="capitalize">{currentWeather.weather[0].description}</p>
                 </div>
              )}
            </div>
            {/* Right side: Temp, Wind, Humidity */}
            <div className="text-lg">
              <p className="mb-1 text-4xl font-bold">{Math.round(currentWeather.main.temp)}°C</p>
              <p>Feels like: {Math.round(currentWeather.main.feels_like)}°C</p>
              <p>Wind: {currentWeather.wind.speed} M/S</p>
              <p>Humidity: {currentWeather.main.humidity}%</p>
            </div>
          </div>
        </section>
      )}

      {/* 5-Day Forecast - Conditionally Rendered */}
      {forecastData && !loading && !error && (
        <section>
          <h3 className="mb-4 text-xl font-bold text-gray-800">5 - Days Forecast</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {forecastData.map((item, index) => (
              <div key={index} className="p-4 text-center text-gray-800 bg-green-300 rounded-lg shadow-md"> {/* Adjusted styles */}
                <p className="font-semibold">{formatDate(item.dt)}</p>
                 {item.weather[0] && (
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt={item.weather[0].description}
                      className="w-10 h-10 mx-auto" // Smaller icon for forecast
                    />
                  )}
                <p className="text-lg font-bold">{Math.round(item.main.temp)}°C</p>
                <p className='text-sm capitalize'>{item.weather[0]?.description || 'N/A'}</p>
                <p className="text-sm">Wind: {item.wind.speed} M/S</p>
                <p className="text-sm">Humidity: {item.main.humidity}%</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Weather;