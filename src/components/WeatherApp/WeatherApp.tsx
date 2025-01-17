import { useEffect, useState } from "react";
import axios from "axios";
// import { OrbitProgress } from "react-loading-indicators";
import Forecast from "../Forecast/Forecast";
import styles from './WeatherApp.module.scss'
import getCurrentDate from "../CurrentDay/CurrentDay";
import { FaWind, FaDroplet } from "react-icons/fa6";
import { CiTempHigh } from "react-icons/ci";
import customIcons from '../customIcons/customIcons'
import cityNames from "../customNames/customNames";
import MarqueeList from "../marquee/MarqueeList";

const WeatherApp = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  // const [loading, setLoading] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>('')

  

  const API_KEY = "87910f1f9ea8d899b035c4081cbb9a2a";
  const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather`;
  const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

  useEffect(() => {
    setCurrentDate(getCurrentDate())
  }, [])

  async function fetchWeather() {
    try {
      // setLoading(true);
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
    }
    // } finally {
    //   // setLoading(false);
    // }
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

        const regionFromIp = responseIp.data.region;

        if (regionFromIp) {
          setCity(regionFromIp);
          fetchWeather()
          // setCity('')
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
      // setCity('')
    }
  };


  return (
    <div className={styles.wrapper}>
      {/* <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        onKeyDown={handleKeyDown}
      /> */}

      {/* {loading && <p>loading..</p>} */}

      {weather && (
        <div className={styles.mainContainer}>
          <div className={styles.nameFlex}>
            <h2>{cityNames[weather.name] || weather.name}</h2>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className={styles.titleContainer}>
              <MarqueeList />
            <img
              src={
                customIcons[weather.weather[0].main] ||
                `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
              }
              alt={weather.weather[0].description}
            />
            <div className={styles.desContainer}>
              <h3>Cьогоднi {currentDate}</h3>
              <p className={styles.temperature}>
                <CiTempHigh size={53} />
                {Math.round(weather.main.temp)}°C
              </p>
              <p className={styles.weather}>
                {weather.weather[0].description.charAt(0).toUpperCase() +
                  weather.weather[0].description.slice(1)}
              </p>
              <div className={styles.windHumCont}>
                <p className={styles.hum}>
                  &nbsp;
                  <FaDroplet />
                  &nbsp;Вологість&nbsp;&nbsp;|&nbsp;&nbsp;
                  {weather.main.humidity}%
                </p>
                <p className={styles.wind}>
                  &nbsp;
                  <FaWind />
                  &nbsp;Вiтер&nbsp;&nbsp;|&nbsp;&nbsp;{weather.wind.speed} м/с
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {forecast && <Forecast forecast={forecast} weather={weather} />}
    </div>
  );
};

export default WeatherApp;
