import { Component } from '@angular/core';
import { ToasterService } from './shared/toaster/toaster.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private toaster: ToasterService,
    private cookieService: CookieService) {}
  
  ngOnInit() {
  }
}
