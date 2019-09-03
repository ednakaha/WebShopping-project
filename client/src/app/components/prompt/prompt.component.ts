import { Component, OnInit, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})
export class PromptComponent implements OnInit {
  count: number;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(  private modalService: NgbModal) {
 }

  ngOnInit() {
    this.count = 1;
  }

  closeModal(){
   this.modalService.dismissAll();
  }
  
  //https://medium.com/@izzatnadiri/how-to-pass-data-to-and-receive-from-ng-bootstrap-modals-916f2ad5d66e
  passBack() {
    this.passEntry.emit(this.count);
  }
}