import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject, Injector, InjectionToken } from "@angular/core";
import { Subscription, Observable, Subject } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Product } from '../models/Product';
import { ProductsService } from '../products.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { isPlatformBrowser } from '@angular/common';
import { map, switchMap, startWith, tap, takeLast, takeUntil } from 'rxjs/operators';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProductComponent } from '../edit/edit-product.component';
import { BrandsService } from '../../brands/brands.service';
import { EditBrandComponent } from '../../brands/edit/edit-brand.component';

@Component({
  selector: 'manage',
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"]
})
export class ManageProductsComponent implements OnInit, OnDestroy {
  faTrash = faTrash;
  faEdit = faEdit;
  actionsProducts$ = new Subject();
  actionsBrands$ = new Subject();
  products$!: Observable<[]>;
  brands$!: Observable<[]>;
  private destroy$ = new Subject();
  constructor(
    private productService: ProductsService,
    private brandService: BrandsService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private modalService: NgbModal) {
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.products$ = this.actionsProducts$.pipe(
        startWith(['get']),
        switchMap(([action, payload]) => {
          if (action === 'get') {
            return this.fetchProducts();
          } else if (action === 'delete') {
            const { id } = payload;
            return this.productService.deleteProduct(id).pipe(
              switchMap((res) => {
                return this.fetchProducts();
              })
            )
          } 
        })
      );

      this.brands$ = this.actionsBrands$.pipe(
        startWith(['get']),
        switchMap(([action, payload]) => {
          if (action === 'get') {
            return this.fetchBrands();
          } else if (action === 'delete') {
            const { id } = payload;
            return this.productService.deleteProduct(id).pipe(
              switchMap((res) => {
                return this.fetchBrands();
              })
            )
          } 
        })
      );
    }
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchProducts() {
    return this.productService.getProducts(10, 1, true).pipe(
      map(({products}) => {
        console.log(123, products);
        return products;
      }));
  }

  fetchBrands() {
    return this.brandService.getBrands().pipe(
      map(({brands}) => {
        return brands;
      })
    );
  }

  deleteProduct(id: string) {
    this.actionsProducts$.next(['delete', { id }]);
  }

  deleteBrand(id: string) {
    this.actionsBrands$.next(['delete', { id }]);
  }

  editProduct(id: string) {
    this.productService.getProduct(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe((product: any) => {
      const injector = Injector.create({providers: [{provide: 'product', useValue: product.product}]});

      const modalRef = this.modalService.open(EditProductComponent, {
        injector
      });
      modalRef.result.then((result) => {
      }, (reason) => {
        this.actionsProducts$.next(['get']);
      });
    });
  }

  editBrand(id: string) {
    this.brandService.getBrand(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe((brand: any) => {
      const injector = Injector.create({providers: [{provide: 'brand', useValue: brand.brand}]});

      const modalRef = this.modalService.open(EditBrandComponent, {
        injector,
      });
      modalRef.result.then((result) => {
      }, (reason) => {
        this.actionsBrands$.next(['get']);
      });
    });
    
  }
}
