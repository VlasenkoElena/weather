import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Weather } from '../../models/weather.model';
import { HttpService } from '../../services/http.service'
import { Message } from '../../models/message.model';



@Component({
  selector: 'app-add-city',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  placeName = '';
  weather: Weather;
  isDisabled = true;
  message: Message;
  error:any;
 
  @Output() onWeatherAdd = new EventEmitter<Weather>();

  
  constructor(public activeModal: NgbActiveModal,
              private httpService: HttpService) {}


  ngOnInit() {
    this.message = new Message('danger', '');
  }

  public userSettings: any = {
      "showSearchButton":false,
      "showCurrentLocation": false,
      "recentStorageName": false,
      "inputPlaceholderText": 'Enter text',
      "geoTypes": ['(cities)'],
  
  }
	autoCompleteCallback1(selectedData:any) {
   //console.log(selectedData.data.name);
   this.placeName = selectedData.data.name;
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 3000);
  }

  findPlaces() {
    if (!this.validateWatherCity()) {
      return;
    };
    
    this.httpService.getWeather(this.placeName, '')
    .subscribe((data) => {
      let weather = new Weather(
        data.name, 
        data.main, 
        data.sys,
        data.weather,
        `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        data.id)
      this.weather = weather;
       },
       (error) => {
         this.error = error.message;
         console.log(this.error);
         this.userSettings = {
          inputString: ''
        }
      }); 
  }

  addToMain() {
    this.onWeatherAdd.emit(this.weather);
    this.clearData();
  }

  validateWatherCity() {
    if (this.placeName === '') {
      this.showMessage('Enter city name');
      return false;
   };
   this.isDisabled = false;
   return true;
  }
 
  clearData() {
    this.weather = null;
    this.isDisabled = true;
    this.userSettings = {
      inputString: ''
    }
  }

}
