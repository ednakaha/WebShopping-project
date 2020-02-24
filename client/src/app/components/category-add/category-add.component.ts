import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { CategoryM } from 'src/app/models/category';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  CategoryService: any;
  //model
  categoryid: string;
  categoryName: string;

  //@ViewChild('myForm') formValues; // Added this

  //categoryArray: CategoryM[] | CategoryM;
  addResult: boolean;
  roleId: number;
  errorMessage: string;
  constructor(private categoryService: CategoryService, private loginService: LoginService) { }

  categoryArray: CategoryM[] | CategoryM;

  ngOnInit() {
    debugger;
    this.roleId = Number(this.loginService.getRoleId());
    this.allCategory();

  }

  allCategory() {
    this.categoryService.getCategory()
      .subscribe(cd => this.categoryArray = cd);
  }

  addCategory() {
    this.categoryService.addCategory({
      id: '',
      name: this.categoryName
    }).subscribe(
      data => {
        this.errorMessage = String(data);
        setTimeout(function () {
          this.errorMessage = '';
        }.bind(this), 3000);
      },
      error => {
        this.errorMessage = error.error;
        setTimeout(function () {
          this.errorMessage = '';
        }.bind(this), 3000);
      }
    )
  }


  // getListCategory() {
  //   //  //debugger;
  //   this.categoryService.getCategory()
  //     .subscribe(p => this.categoryArray = p);
  // }

}
