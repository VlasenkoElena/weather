import { Injectable } from '@angular/core';
import { Weather } from '../models/weather.model';



@Injectable()
export class WeatherService {

   private weather: Weather;

    getWather() {
      return this.weather;
    }

    addWeather(weather: Weather) {
        this.weather = weather;
    }
}