import { Component, ViewEncapsulation, Input, PLATFORM_ID, Inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductsService } from '../products/products.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'carousel-featured',
  templateUrl: './carousel-featured.component.html',
  styleUrls: ['./carousel-featured.component.scss'],
  
})
export class CarouselFeaturedComponent {
  
  slides$!: Observable<[][]>;

  constructor(private productService: ProductsService,
    @Inject(PLATFORM_ID) private platformId: Object,) {
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.slides$ = this.productService.getFeaturedProducts().pipe(
        map(({products}) => {
          console.log(123, products);
          return this.groupBy(products, 3);
        })
      );
    }
  }
   groupBy(arr, n) {
    var group = [];
    for (var i = 0, end = arr.length / n; i < end; ++i)
      group.push(arr.slice(i * n, (i + 1) * n));
    return group;
  }
}
  
