import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  finalSumOrder;//: number;

  constructor(private _Activatedroute: ActivatedRoute,
    private router: Router) {
      debugger;
      this.finalSumOrder = this.router.getCurrentNavigation().extras.state;
     }


  ngOnInit() {
  }

}
