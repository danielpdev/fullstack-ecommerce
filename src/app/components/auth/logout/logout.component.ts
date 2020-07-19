import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";

@Component({
  selector: 'logout',
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"]
})
export class LogoutComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  constructor(public authService: AuthService) {
  }

  ngOnInit() {
   
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if(this.authStatusSub)
    this.authStatusSub.unsubscribe();
  }
}
