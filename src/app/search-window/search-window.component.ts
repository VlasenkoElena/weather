import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

import { HttpService } from '../services/http.service';
import { WeatherService } from '../services/weather.service';
import { Weather } from '../models/weather.model';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-search-window',
  templateUrl: './search-window.component.html',
  styleUrls: ['./search-window.component.css']
})
export class SearchWindowComponent implements OnInit {

 
  weather: Weather;
  message: Message;
  isDisabled = false;
  error: string;
  

  constructor(private httpService: HttpService,
              private weatherService: WeatherService,
              private router: Router) { }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 3000);
  }

  findPlaces(form: NgForm) {
    //console.log(form);
    if (form.value.placeName === '') {
      this.showMessage('Enter city name');
      return false;
    }
    this.httpService.getWeather(form.value.placeName, form.value.countryCode)
    .subscribe((data) => {
      let weather = new Weather(
        data.name, 
        data.main, 
        data.sys,
        data.weather,
        `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        data.id);
       this.weather = weather;
       this.isDisabled = true;
       },
       (error) => { 
         this.showMessage(error.error.message);
         this.isDisabled = false;
         form.setValue({
          placeName: '', 
          countryCode: ''
        });
      });
  } 

  addWeather() {
    this.weatherService.addWeather(this.weather);
  }

  goHome() {
    this.weatherService.clear();
    this.router.navigate(['']);
  }
}
