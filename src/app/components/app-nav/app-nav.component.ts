import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss'],
})
export class AppNavComponent implements OnInit {
  faUser = faUser;
  faCartPlus = faCartPlus;
  constructor(private router: Router, public authService: AuthService,
    private toaster: ToasterService) {

  }
  
  ngOnInit() {
    this.authService.getAuthStatusListener().subscribe(r => {
      
    });
  }

  openMenu(navBar: HTMLElement) {
    navBar.classList.toggle('open');
  }

  isActive(instruction: string, exact: boolean): boolean {
    return this.router.isActive(instruction, exact);
  }
}
