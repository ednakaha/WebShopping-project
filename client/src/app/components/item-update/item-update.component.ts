import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ItemService } from 'src/app/services/item/item.service';
import { ItemM } from 'src/app/models/item';
import { CategoryM } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { DEFAULT_ECDH_CURVE } from 'tls';

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.css']
})
export class ItemUpdateComponent implements OnInit {

  @Input() item: ItemM;
  itemPicturePath: string;
  categoryArray: CategoryM[] | CategoryM;

  constructor(private itemService: ItemService, private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.getCategoryList();

  }
  getCategoryList() {
    //debugger;
    this.categoryService.getCategory()
      .subscribe(p => {
        debugger;
        this.categoryArray = p
      });
  }

  update() {
    this.item = new ItemM;
    this.ngOnInit();
  }

  updateItem() {
    debugger;
    this.itemService.updateItem(this.item);
    this.item = new ItemM();
    this.itemPicturePath = '';
  }

  saveItem() {
    debugger;
    this.itemService.addItem(this.item);
    this.item = new ItemM();
    this.itemPicturePath = '';

  }
  readURL(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
      //to do image
        this.itemPicturePath = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
