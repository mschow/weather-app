import { currentWeatherApiResDTO } from "../common/interfaces/currentWeatherApiResDTO";
import axios from "axios";

export class WeatherApi {
    // private getCurrentWeatherURLFromZIPCode(zipCode:string): string {
        // return `api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${this.WEATHER_API_KEY}"`
    // }

    public getCurrentWeatherByCityAndState(city: string, stateCode: string): Promise<currentWeatherApiResDTO>{
        return axios.get(`/weather/current/citystate/${city.toUpperCase()}/US-${stateCode.toUpperCase()}`);
    }
}