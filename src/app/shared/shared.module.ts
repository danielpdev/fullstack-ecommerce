import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToasterComponent } from './toaster/toaster.component';
import { CarouselFeaturedComponent } from '../components/carousel-featured/carousel-featured.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule
  ],
  declarations: [
    ToasterComponent,
    CarouselFeaturedComponent
  ],
  exports: [
    FontAwesomeModule,
    NgbModule,
    ToasterComponent,
    CarouselFeaturedComponent
  ],
})
export class SharedModule { }
