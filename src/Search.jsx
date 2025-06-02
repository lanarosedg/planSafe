import { useState } from 'react';
import { getWeatherByCity } from './services/weatherService';

function Search () {
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

    return (
        <>
        <div className="searchContainer">
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {weather && (
            <div className="currentLocationContainer">
                <p className="location">
                    {weather.name}
                </p>
                
                {weather && (
                <p class="degrees">{weather.main.temp}°C</p>
                )}
            </div>
            )}
            <input 
                type="text" 
                className="searchInput"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Hi, {name}! Where are we going today?" 
            />
            <br />
            <button 
                onClick={fetchWeather}
                className="searchButton"
                >
                    Search
            </button>
            
        </div>
        </>
    )
}

export default Search