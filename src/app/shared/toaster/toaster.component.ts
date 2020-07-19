import { Component } from '@angular/core';

import { ToasterService } from './toaster.service';

@Component({
    selector: 'app-toasts',
    templateUrl: './toaster.component.html',
})
export class ToasterComponent {
    autohide = true;
    constructor(public toastService: ToasterService) { }
}
