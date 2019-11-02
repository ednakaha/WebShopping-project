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
  //itemPicturePath: string;
  categoryArray: CategoryM[] | CategoryM;
  errorMessage: string;
  bad_picture: boolean;

  constructor(private itemService: ItemService, private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.getCategoryList();

  }
  getCategoryList() {
    //debugger;
    this.categoryService.getCategory()
      .subscribe(p => {
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
    this.item.picturePath = '';
  }

  saveItem() {
    debugger;
    if (this.bad_picture == true)
      this.errorMessage = "The picture is too big"
    else {
      this.itemService.addItem(this.item).subscribe(
        data => {
          debugger;
          this.errorMessage = String(data);
        },
        error => {
          debugger;
          this.errorMessage = error.error;
          console.log("Error", error);

        }
      );
      this.item = new ItemM();
      this.item.picturePath = '';
    }
  }
  readURL(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        //to do image
        debugger;
        this.item.picturePath = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
      if (event.target.files[0].size > 500000) {
        this.errorMessage = "Limited to 500 kb";
        this.bad_picture = true;
        return;
      }
      this.bad_picture = false;
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.item.picturePath = event.target.result;
      }
    }
  }

}


