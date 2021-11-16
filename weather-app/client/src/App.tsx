import React, {useState, useEffect} from 'react';
import { WeatherApi } from './api/weatherApi';
import { CurrentWeatherApiResDTO } from './common/interfaces/currentWeatherApiResDTO';
import './App.css';

function App() {
  const weatherApi: WeatherApi = new WeatherApi();

  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherApiResDTO[]>([])

  useEffect(()=>{
    weatherApi.getCurrentWeatherByCurrentLocation().then((res) => {
      const newCurrentWeather: CurrentWeatherApiResDTO[] = [res, ...currentWeather];
      setCurrentWeather(newCurrentWeather);
    });
  })

  return (
    <div className="App">
    </div>
  );
}

export default App;
