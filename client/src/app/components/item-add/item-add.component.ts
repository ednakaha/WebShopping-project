import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item/item.service';
import { ItemM } from 'src/app/models/item';
import { CategoryService } from '../../services/category/category.service';
import { CategoryM } from 'src/app/models/category';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-item',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {
  ItemService: any;
  //model
  itemName: string;
  itemCategoryId: string;
  itemPrice: number;
  itemPicturePath: string;
  errorMessage:String;

  itemArray: ItemM[] | ItemM;
  categoryArray:CategoryM[] | CategoryM;
  roleId: number;

  constructor(private itemService: ItemService,  private categoryService:CategoryService, private loginService: LoginService) { }

  ngOnInit() {
    this.getCategoryList();
    this.roleId = Number(this.loginService.getRoleId());
  }

  getCategoryList() {
    //debugger;
    this.categoryService.getCategory()
      .subscribe(p => this.categoryArray = p);
  }
  addItem() {
    this.itemService.addItem({
      id:'-1',
      name: this.itemName,
      categoryId: this.itemCategoryId,
      price: this.itemPrice,
      picturePath: this.itemPicturePath
    }).subscribe(
      data => {
        this.errorMessage = String(data)
        console.log("POST Request is successful ", data);
      },
      error => {
        this.errorMessage = error.error;
        console.log("Error", error);
      }
    );
  }

  getListItem() {
    //  //debugger;
    this.itemService.getItem()
      .subscribe(p => this.itemArray = p);
  }

  readURL(event:any) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.onload = (event:any) => {
            this.itemPicturePath = event.target.result;
        }

        reader.readAsDataURL(event.target.files[0]);
    }
}
}
