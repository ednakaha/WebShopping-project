import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { CategoryM } from 'src/app/models/category';
import { ItemM } from 'src/app/models/item';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  CategoryService: any;
  //model
  categoryid: string;
  categoryName: string;
  addResult: boolean;
  categoryArray: CategoryM[] | CategoryM;
  @Output() categoryClicked=new EventEmitter<string>(); 


  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.allCategory();
  }

  categoryClick(categoryId){
    this.categoryClicked.emit(categoryId);
  }

  allCategory() {
    this.categoryService.getCategory()
      .subscribe(cd => this.categoryArray = cd);
    //  alert(this.categoryArray);
  }

  getListCategory() {
    //  //debugger;
    this.categoryService.getCategory()
      .subscribe(p => this.categoryArray = p);
  }

}
