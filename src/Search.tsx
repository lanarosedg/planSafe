import { useEffect, useState } from 'react';
import { getWeatherByCity, getCityNameByCoords } from './services/weatherService';
import WeatherPhoto from './WeatherPhoto'; // make sure the path is correct

type WeatherCondition = 'ExtremeHeat' | 'Sunny' | 'Cloud' | 'Rain' | 'Windy' | 'Flood';

function Search() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState('');
  const [condition, setCondition] = useState<WeatherCondition>('Sunny');

  const mapWeatherToCondition = (weatherData: any): WeatherCondition => {
    const main = weatherData.weather?.[0]?.main?.toLowerCase();
    const temp = weatherData.main?.temp;

    if (main?.includes('rain')) return 'Rain';
    if (main?.includes('cloud')) return 'Cloud';
    if (main?.includes('wind')) return 'Windy';
    if (main?.includes('sun') || main?.includes('clear')) return 'Sunny';
    if (main?.includes('flood')) return 'Flood';
    if (temp >= 38) return 'ExtremeHeat';

    return 'Sunny'; // fallback
  };

  const fetchWeather = async () => {
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
      setCondition(mapWeatherToCondition(data));
      setError('');
    } catch (err) {
      setError(String(err));
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
              setCondition(mapWeatherToCondition(data));
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
        <>
          <div className="currentLocationContainer">
            <p className="location">{weather.name}</p>
            <p className="degrees">{weather.main.temp}°C</p>
          </div>
          <WeatherPhoto condition={condition} />
        </>
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
