import { Component, OnInit } from '@angular/core';
import { CityService } from '../../services/city/city.service';
import { CityM } from 'src/app/models/city';
import { LoginService } from 'src/app/services/login/login.service';

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
  roleId: number;

  constructor(private cityService: CityService,private loginService: LoginService) { }

  ngOnInit() {
    this.roleId = Number(this.loginService.getRoleId());
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
