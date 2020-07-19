import { Component, Input } from "@angular/core";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  templateUrl: "./error.component.html",
  selector: "app-error",
})
export class ErrorComponent {
  @Input() errorMessage;

  constructor(public activeModal: NgbActiveModal) {}
}
