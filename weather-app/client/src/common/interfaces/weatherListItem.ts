import { CurrentWeatherApiResDTO } from "./currentWeatherApiResDTO";

export class WeatherListItem {
    id: number;
    currentWeatherApiResDTO: CurrentWeatherApiResDTO;
    isLocalCurrentWeather: boolean;

    constructor(id: number, currentWeatherApiResDTO: CurrentWeatherApiResDTO, isLocal: boolean = false){
        this.id = id;
        this.currentWeatherApiResDTO = currentWeatherApiResDTO;
        this.isLocalCurrentWeather = isLocal;
    }
}