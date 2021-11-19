import React, {useState, useEffect} from 'react';
import { WeatherApi } from './api/weatherApi';
import { WeatherListItem } from './common/interfaces/weatherListItem';
import './App.css';

function App() {
  const CURRENT_WEATHER_STORAGE_KEY: string = "currentWeather";
  const weatherApi: WeatherApi = new WeatherApi();

  const [currentWeather, setCurrentWeather] = useState<WeatherListItem[]>([])

  useEffect(()=>{
    initializeWeather();
    //Supplying an empty array as a dependency so that initialization will only run once (when the App component has mounted).
    //Disabling linter for next line to prevent initializeWeather from being a required dependency.
    //eslint-disable-next-line
  }, []);

  useEffect(()=>{
    persistCurrentWeather();
    
    /**
     * Save the currentWeather state to the local storage.
     */
    function persistCurrentWeather(): void {
      localStorage?.setItem(CURRENT_WEATHER_STORAGE_KEY, JSON.stringify(currentWeather))
    }

  }, [currentWeather]);

  /**
   * Run all initial tasks.
   */
  function initializeWeather(): void {
    initializePersistedWeather();
    initializeLocalCurrentWeather();
  }

  /**
   * If there is persisted weather data, set it to the current state. Otherwise, set to an empty array.
   */
  function initializePersistedWeather(): void {
    const persistedWeatherUnparsed: string = localStorage?.getItem(CURRENT_WEATHER_STORAGE_KEY) || '[]';
    setCurrentWeather(JSON.parse(persistedWeatherUnparsed));
  }

  /**
   * If the state does not have a local current weather, retrieve one from OpenWeather and assign it to the first value
   * on the currentWeather state. Then persist.
   */
  function initializeLocalCurrentWeather(): void {
    const isLocalCurrentWeatherAlreadyExisting: boolean = currentWeather.some((weather) => weather.isLocalCurrentWeather);
    if(!isLocalCurrentWeatherAlreadyExisting){
      weatherApi.getCurrentWeatherByCurrentLocation().then((res) => {
        const localCurrentWeatherListItem: WeatherListItem = new WeatherListItem(findNextAvailableWeatherID(), res, true);
        const newCurrentWeather: WeatherListItem[] = [localCurrentWeatherListItem, ...currentWeather];
        setCurrentWeather(newCurrentWeather);
      });
    }
  }

  /**
   * Returns an ID of a value one higher than the highest existing ID in the currentWeather state, or 0 if array is empty.
   * @returns: An unused ID number.
   */
  function findNextAvailableWeatherID(): number {
    return currentWeather.reduce((prev, curr) => {
      if(curr.id > prev){
        return curr.id + 1
      }
      return prev;
    }, 0);
  }

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
