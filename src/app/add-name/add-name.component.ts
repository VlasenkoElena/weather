import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Weather } from '../models/weather.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './modal/modal.component';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-add-name',
  templateUrl: './add-name.component.html',
  styleUrls: ['./add-name.component.css']
})
export class AddNameComponent implements OnInit {

  weather: Weather;
  weathers: Weather[] = [];
  

  @Output() onWeatherAdd = new EventEmitter<Weather>();
  
  constructor(private httpService: HttpService,
    private modalService: NgbModal,
    private weatherService: WeatherService) { }


    open() {
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.onWeatherAdd.subscribe( addedWeather => {
        console.log(addedWeather);
        this.weatherWasAdded(addedWeather);
        modalRef.close();
     });
    }

  ngOnInit() {
     this.getLocalStorage();
      if (this.weatherService.getWather()) {
        this.weatherWasAdded(this.weatherService.getWather());
      }
    }

  weatherWasAdded(weather: Weather) {
    this.weathers.push(weather);
    //console.log(this.weathers); 
    this.addLocalStorage();
  }

  addLocalStorage() {
    let arrayIds: number[] = [];
    this.weathers.forEach(element => {
      arrayIds.push(element.id);
    }); 
    let stringIds = arrayIds.join();
    localStorage.setItem('myIds', stringIds);
    //console.log(stringIds);
  }

  getLocalStorage() {
    let returnWeatherIds = localStorage.getItem('myIds');
    if (returnWeatherIds) {
      this.getWeatherFromIds(returnWeatherIds);
      console.log(returnWeatherIds);
    } 
 }
  getWeatherFromIds(ids: string) {
    this.httpService.getCitiesByIDs(ids)
     .subscribe((data) => {
       let weatherList = data["list"];
       weatherList.forEach(weather => {
        let w = new Weather(
          weather.name, 
          weather.main, 
          weather.sys,
          weather.weather,
         `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`,
          weather.id )
          this.weathers.push(w)
      });
      this.addLocalStorage();
     });
  }

  clear() {
    localStorage.clear();
    this.weathers = [];
  }

  delWeather(idx) {
    //console.log(idx); 
    this.weathers.splice(idx, 1);
    this.addLocalStorage();
  }

}
