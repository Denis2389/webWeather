import styles from './Forecast.module.scss'

const Forecast = ({ forecast, weather }: { forecast: any }) => {

    const dailyForecast = forecast.list.filter((item: any, index: number, array: any[]) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      const prevDate = index > 0 ? new Date(array[index - 1].dt * 1000).toLocaleDateString() : null;
      return date !== prevDate;
    }).slice(0, 6);
  
    return (
      <div>
        {forecast && (
          <div className={styles.container}>
            <div className={styles.items}>
              {dailyForecast.map((item: any, index: number) => (
                <div key={index}>
                  <h3>{new Date(item.dt * 1000).toLocaleDateString()}</h3>
                  <p>{Math.round(item.main.temp)}°C</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt={weather.weather[0].description}
                  />
                  <p>
                    {item.weather[0].description.charAt(0).toUpperCase() +
                      item.weather[0].description.slice(1)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Forecast;
  