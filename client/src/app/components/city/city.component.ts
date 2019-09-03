import { Component, OnInit } from '@angular/core';
import { CityService } from '../../services/city/city.service';
import { CityM } from 'src/app/models/city';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  CityService: any;
  //model
  cityid: string;
  cityname: string;

  cityArray: CityM[] | CityM;

  constructor(private cityService: CityService) { }

  ngOnInit() {
  }

  addCity() {
    this.cityService.addCity({
      id:-1, 
      name: this.cityname
    });
  }
  getListCity() {
    //  //debugger;
    this.cityService.getCity()
      .subscribe(p => this.cityArray = p);
  }
}
