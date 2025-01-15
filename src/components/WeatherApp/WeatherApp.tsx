import { useEffect, useState } from "react";
import axios from "axios";
// import { OrbitProgress } from "react-loading-indicators";
import Forecast from "../Forecast/Forecast";
import styles from './WeatherApp.module.scss'
import getCurrentDate from "../CurrentDay/CurrentDay";

const WeatherApp = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>('')

  const API_KEY = "87910f1f9ea8d899b035c4081cbb9a2a";
  const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather`;
  const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

  useEffect(() => {
    setCurrentDate(getCurrentDate())
  }, [])

  async function fetchWeather() {
    try {
      setLoading(true);
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(WEATHER_URL, {
          params: {
            q: city,
            appid: API_KEY,
            units: "metric",
            lang: "ua",
          },
        }),
        axios.get(FORECAST_URL, {
          params: {
            q: city,
            appid: API_KEY,
            units: "metric",
            lang: "ua",
          },
        }),
      ]);
      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (city) {
      fetchWeather()
    }
  }, [city])

  useEffect(() => {
    async function fetchIp() {
      try {
        const responseIp = await axios.get('https://ipinfo.io/json', {
          params: {
            token: 'c63d2e516227d9'
          },
        });

        const cityFromIp = responseIp.data.city;

        if (cityFromIp) {
          setCity(cityFromIp);
          fetchWeather()
        }

      } catch (error) {
        console.log(error)
      }
    }
    fetchIp()
  }, [])


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && city.trim()) {
      fetchWeather();
    }
  };


  return (
    <div className={styles.container}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        onKeyDown={handleKeyDown}
      />

      {loading && <p>loading..</p>}

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <h3>{currentDate}</h3>
          <p>{weather.main.temp}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.humidity}%</p>
          <p>{weather.wind.speed} м/с</p>
        </div>
      )}

      {forecast && <Forecast forecast={forecast} weather={weather}/>}
    </div>
  );
};

export default WeatherApp;
