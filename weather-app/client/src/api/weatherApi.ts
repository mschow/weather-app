import { CurrentWeatherApiResDTO } from "../common/interfaces/currentWeatherApiResDTO";
import axios from "axios";

export class WeatherApi {
    //TODO: Add throttles to these calls.

    /**
     * Default functionality, gets the browser's current location and requests the current weather in that location.
     * @returns The current weather: https://openweathermap.org/current#current_JSON
     */
    public getCurrentWeatherByCurrentLocation(): Promise<CurrentWeatherApiResDTO>{
        return new Promise((res, rej) => {
            if (navigator.geolocation) {
                    //W3Schools on navigator geolocations: https://www.w3schools.com/html/html5_geolocation.asp
                    navigator.geolocation.getCurrentPosition(
                        (position: GeolocationPosition) => { 
                            res(this.getCurrentWeatherByCoordinates(position.coords.latitude, position.coords.longitude)); 
                        }, () => {
                            rej('Could not retrieve current position.');
                        }
                    );
            } else { 
                rej('Could not retrieve current position.');
            }
        });
    }

    /**
     * OpenWeather API call retrieves current weather by ZIP Code.
     * https://openweathermap.org/current#zip
     * @param zipCode: The ZIP code for which the weather is being retrieved.
     * @returns: The current weather: https://openweathermap.org/current#current_JSON
     */
    public getCurrentWeatherByZIPCode(zipCode:number): Promise<CurrentWeatherApiResDTO> {
        return axios.get(`/weather/current/zip/${zipCode}}`).then(res => res.data);
    }

    /**
     *  OpenWeather API call retrieves current weather by city name and state code.
     * @param city: The name of the city for which the weather is being retrieved.
     * @param stateCode: The two-digit state code in which the city resides.
     * @returns: The current weather: https://openweathermap.org/current#current_JSON
     */
    public getCurrentWeatherByCityAndState(city: string, stateCode: string): Promise<CurrentWeatherApiResDTO>{
        return axios.get(`/weather/current/citystate/${city.toUpperCase()}/US-${stateCode.toUpperCase()}`).then(res => res.data);
    }

    /**
     * OpenWeather API call retrieves current weather by latitude and longitude.
     * @param latitude: Current latitude of operating device. 
     * @param longitude: Current longitude of operating device.
     * @returns: The current weather: https://openweathermap.org/current#current_JSON
     */
    private getCurrentWeatherByCoordinates(latitude: number, longitude: number): Promise<CurrentWeatherApiResDTO>{
        return axios.get(`/weather/current/coord/${latitude}/${longitude}`).then(res => res.data);
    }
}