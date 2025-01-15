const Forecast = ({ forecast, weather }: { forecast: any }) => {
    const dailyForecast = forecast.list.filter((item: any, index: number, array: any[]) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      const prevDate = index > 0 ? new Date(array[index - 1].dt * 1000).toLocaleDateString() : null;
      return date !== prevDate;
    }).slice(0, 6);
  
    return (
      <div>
        {forecast && (
          <div>
            <h2>Температура на 5 дней</h2>
            <div>
              {dailyForecast.map((item: any, index: number) => (
                <div key={index}>
                  <h3>{new Date(item.dt * 1000).toLocaleDateString()}</h3>
                  <p>{item.main.temp}°C</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt={weather.weather[0].description}
                  />
                  <p>{item.weather[0].description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Forecast;
  