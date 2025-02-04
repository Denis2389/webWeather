import styles from './Forecast.module.scss';
import customIcons from '../customIcons/customIcons';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../node_modules/swiper/swiper-bundle.min.css'

interface WeatherItem {
  description: string;
  icon: string;
}

interface ForecastItem {
  dt: number;
  main: { temp: number };
  weather: WeatherItem[];
}

interface Forecast {
  list: ForecastItem[];
}

interface Weather {
  weather: { main: string; description: string; icon: string }[];
}

const Forecast = ({ forecast, weather }: { forecast: Forecast, weather: Weather }) => {

    const dailyForecast = forecast.list.filter((item: ForecastItem, index: number, array: ForecastItem[]) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      const prevDate = index > 0 ? new Date(array[index - 1].dt * 1000).toLocaleDateString() : null;
      return date !== prevDate;
    }).slice(0, 6);
  
    return (
      <div>
        {forecast && (
          <div className={styles.container}>
            <div className={styles.items}>
              {window.innerWidth <= 767 ? (
                <Swiper spaceBetween={20} slidesPerView={3}>
                  {dailyForecast.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className={styles.item}>
                        <h3>{new Date(item.dt * 1000).toLocaleDateString()}</h3>
                        <p>{Math.round(item.main.temp)}°C</p>
                        <img
                          src={
                            customIcons[weather.weather[0].main] ||
                            `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
                          }
                          alt={weather.weather[0].description}
                        />
                        <p>
                          {item.weather[0].description.charAt(0).toUpperCase() +
                            item.weather[0].description.slice(1)}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                dailyForecast.map((item, index) => (
                  <div className={styles.item} key={index}>
                    <h3>{new Date(item.dt * 1000).toLocaleDateString()}</h3>
                    <p>{Math.round(item.main.temp)}°C</p>
                    <img
                      src={
                        customIcons[weather.weather[0].main] ||
                        `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
                      }
                      alt={weather.weather[0].description}
                    />
                    <p>
                      {item.weather[0].description.charAt(0).toUpperCase() +
                        item.weather[0].description.slice(1)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Forecast;
  