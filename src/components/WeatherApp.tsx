import { useEffect, useState } from "react";
import axios from "axios";
import { OrbitProgress } from "react-loading-indicators";
import { CiSearch } from "react-icons/ci";

const WeatherApp = () => {
  // interface WeatherProps {
  //     location: {
  //         name: string;
  //     };
  //     current: {
  //         temp_c: number;
  //         feelslike_c: number;
  //         condition: {
  //             text: string;
  //         }
  //     }
  // }

  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false);

  const API_KEY = "87910f1f9ea8d899b035c4081cbb9a2a";
  const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather`;
  const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

  async function fetchWeather() {
    try {
      setLoading(true);
      const response = await axios.get(WEATHER_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
          lang: "ua",
        },
      });
      setWeather(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchForecast() {
    try {
        const forecastResponse = await axios.get(FORECAST_URL, {
          params: {
            q: city,
            appid: API_KEY,
            units: "metric",
            lang: "ua",
          },
        });
        setForecast(forecastResponse.data)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    fetchForecast()
  })

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && city.trim()) {
      fetchWeather();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>
        <CiSearch />
      </button>

      {loading && (
        <OrbitProgress
          variant="disc"
          color="#32cd32"
          size="large"
          text="loading"
          textColor=""
        />
      )}

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.humidity}%</p>
          <p>{weather.wind.speed} м/с</p>
        </div>
      )}

      {forecast && (
        <div>
            <h2>temp na 5 days</h2>
            <div>
                {forecast.list.splice(0, 5).map((item: any, index: number) => (
                    <div key={index}>
                        <h3>{new Date(item.dt * 1000).toLocaleDateString()}</h3>
                        <p>{item.main.temp}°C</p>
                        <p>{item.weather[0].description}</p>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp