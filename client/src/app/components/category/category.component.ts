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


  constructor(private categoryService: CategoryService) { 
   // this.allCategory();
  }

  ngOnInit() {
    this.allCategory();
  }

  categoryClick(categoryId){
    this.categoryClicked.emit(categoryId);
  }

  allCategory() {
    debugger;
    this.categoryService.getCategory()
      .subscribe(cd =>{
         this.categoryArray = cd;
       });

   
  }


}
