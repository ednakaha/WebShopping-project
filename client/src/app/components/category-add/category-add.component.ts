import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { CategoryM } from 'src/app/models/category';

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
  constructor(private categoryService: CategoryService) { }
  categoryArray: CategoryM[] | CategoryM;

  ngOnInit() {

    this.allCategory();
  }

  allCategory() {
    this.categoryService.getCategory()
      .subscribe(cd => this.categoryArray = cd);
 //   alert(this.categoryArray);
  }

  addCategory() {
    this.categoryService.addCategory({
      id:'',
      name: this.categoryName
    })
    /*.subscribe(res => {
      this.addResult = res
      if (this.addResult) {
        this.formValues.resetForm();
      }
    });*/
    // this.form.resetForm;
  }


  getListCategory() {
    //  //debugger;
    this.categoryService.getCategory()
      .subscribe(p => this.categoryArray = p);
  }

}
