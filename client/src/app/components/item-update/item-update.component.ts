import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ItemService } from 'src/app/services/item/item.service';
import { ItemM } from 'src/app/models/item';
import { CategoryM } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { DEFAULT_ECDH_CURVE } from 'tls';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

const URL_UPLOAD = environment.url + '/api/upload';
const UPLOAD_ALIAS = 'image'

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.css']
})
export class ItemUpdateComponent implements OnInit {

  @Input() item: ItemM;
  categoryArray: CategoryM[] | CategoryM;
  errorMessage: string;
  bad_picture: boolean;
  SelfileName: string;
  error: string;

  public uploader: FileUploader = new FileUploader({
    url: URL_UPLOAD,
    itemAlias: UPLOAD_ALIAS // (in server the name is file.fieldname)
  });

  constructor(private itemService: ItemService, private loginService: LoginService,
    private categoryService: CategoryService, private toastr: ToastrService) {

  }

  ngOnInit() {
    this.getCategoryList();

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      //  this.toastr.success('File successfully uploaded!');
    };


  }

  getCategoryList() {
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
    this.uploader.uploadAll()
    this.SelfileName = this.SelfileName.split('\\').pop().split('/').pop(); //just filename
    this.item.picturePath = UPLOAD_ALIAS + '_' + this.SelfileName;

    this.itemService.updateItem(this.item).subscribe(
      data => {
        this.errorMessage = String(data);
        setTimeout(function () {
          this.errorMessage = '';
          // console.log(this.edited);
        }.bind(this), 3000);
      },
      error => {
        this.errorMessage = error.error;
        console.log("Error", error);
        setTimeout(function () {
          this.errorMessage = '';
        }.bind(this), 3000);
      }
    );
        
    this.item = new ItemM();
  }

  saveItem() {
        
    this.uploader.uploadAll()
    if (this.bad_picture == true)
      this.errorMessage = "The picture is too big"
    else {
      this.SelfileName = this.SelfileName.split('\\').pop().split('/').pop(); //just filename
      this.item.picturePath = UPLOAD_ALIAS + '_' + this.SelfileName;

      this.itemService.addItem(this.item).subscribe(
        data => {
              
          this.errorMessage = String(data);
          setTimeout(function () {
            this.errorMessage = '';
          }.bind(this), 3000);
        },
        error => {
              
          this.errorMessage = error.error;
          console.log("Error", error);
          setTimeout(function () {
            this.errorMessage = '';
          }.bind(this), 3000);
        }
      );
          
      this.item = new ItemM();
    }
  }

  readURL(event) {
        
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        //to do image
            
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


  onFileChange(event) {
        
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
    }
  }

}


