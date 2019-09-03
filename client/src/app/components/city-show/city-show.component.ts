import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CityService } from 'src/app/services/city/city.service';
import { CityM } from 'src/app/models/city';

@Component({
  selector: 'app-city-show',
  templateUrl: './city-show.component.html',
  styleUrls: ['./city-show.component.css']
})
export class CityShowComponent implements OnInit {
  cityId_Emitter: string;
  cities: CityM[] | CityM;

  @Output() changeSelectEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private cityService: CityService) { }

  ngOnInit() {
    this.getCityList();
  }

  getCityList() {
    this.cityService.getCity()
      .subscribe(p => this.cities = p);
  }
  
  setSelectedCityEmitter() {
    this.changeSelectEmitter.emit(this.cityId_Emitter);
  }
}
