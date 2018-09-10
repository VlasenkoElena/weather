import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { Weather } from '../models/weather.model';


const baseUrl = `http://api.openweathermap.org/data/2.5/weather?`;
const settings = 'units=metric&APPID=257a752e7542008acf6905eff0b9ea9e';


@Injectable() 
export class HttpService {

    constructor(private http: HttpClient){}

    getWeather(placeName, countryCode): Observable<Weather> {
     let url = baseUrl + settings;
       if (placeName) {
           //console.log(placeName);
           url = url + `&q=${placeName}`;
           //console.log(url);
           if (countryCode) {
           url = url + `,${countryCode}`;
           }
       }
         return this.http.get<Weather>(url);     
    }
    
    getCitiesByIDs(cityId): Observable<Weather[]> {
        return this.http.get<Weather[]>(`http://api.openweathermap.org/data/2.5/group?id=${cityId}&units=metric&APPID=257a752e7542008acf6905eff0b9ea9e`)
    }
}

