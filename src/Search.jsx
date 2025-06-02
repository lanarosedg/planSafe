import { useEffect, useState } from 'react';
import { getWeatherByCity, getCityNameByCoords } from './services/weatherService';

function Search() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
      setError('');
    } catch (err) {
      setError(err);
      setWeather(null);
    }
  };


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const detectedCity = await getCityNameByCoords(latitude, longitude);
            if (detectedCity) {
              const data = await getWeatherByCity(detectedCity);
              setWeather(data);
              setCity(detectedCity);
            } else {
              setError("Unable to detect your city");
            }
          } catch (err) {
            setError("Failed to fetch weather from location");
          }
        },
        () => setError("Location permission denied")
      );
    } else {
      setError("Geolocation not supported");
    }
  }, []);

  return (
    <div className="searchContainer">
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {weather && (
        <div className="currentLocationContainer">
          <p className="location">{weather.name}</p>
          <p className="degrees">{weather.main.temp}°C</p>
        </div>
      )}

      <input
        type="text"
        className="searchInput"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Hi! Where are we going today?"
      />

      <br />

      <button onClick={fetchWeather} className="searchButton">
        Search
      </button>
    </div>
  );
}

export default Search;
