import React from 'react';
import { WeatherApi } from './api/weatherApi';
import './App.css';

function App() {
  const weatherApi: WeatherApi = new WeatherApi();

  React.useEffect(()=>{
    weatherApi.getCurrentWeatherByCityAndState('sandy', 'ut').then((res)=>{
      console.log(res);
    });
  })

  return (
    <div className="App">
    </div>
  );
}

export default App;
