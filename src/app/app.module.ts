import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';


import { AppComponent } from './app.component';
import { AddNameComponent } from './add-name/add-name.component';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete'; 
import { ModalComponent } from './add-name/modal/modal.component';
import { SearchWindowComponent } from './search-window/search-window.component';
import { AppRoutingModule } from './app-routing.module';
import { WeatherService } from './services/weather.service';




@NgModule({
  declarations: [
    AppComponent,
    AddNameComponent,
    ModalComponent,
    SearchWindowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    Ng4GeoautocompleteModule.forRoot()
  ],
  entryComponents: [ModalComponent],
  providers: [HttpService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
