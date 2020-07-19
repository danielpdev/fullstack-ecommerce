import { Component, OnInit, OnDestroy } from "@angular/core";
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cart-page',
  templateUrl: "./cart-page.component.html",
  styleUrls: ["./cart-page.component.scss"]
})
export class CartPageComponent implements OnInit, OnDestroy {
  faTrash = faTrash;
  constructor() {

  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
