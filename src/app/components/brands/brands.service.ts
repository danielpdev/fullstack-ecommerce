import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Router } from "@angular/router";

import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { Brand } from './models/brand';

const BACKEND_URL = environment.apiUrl + "/brand/";

@Injectable({ providedIn: "root" })
export class BrandsService {
  private brands: Brand[] = [];
  private brandsUpdated = new Subject<{ brands: Brand[]; }>();
  
  constructor(private http: HttpClient, private router: Router,
    private toastService: ToasterService) {
    }
  
  getBrands() {
    return this.http
      .get<{ message: string; brands: any; maxBrands: number }>(
        BACKEND_URL,
      )
      .pipe(
        map(brandData => {
          return {
            brands: brandData.brands.map(product => {
              return {
                id: product._id,
                description: product.description,
                name: product.name,
              };
            }),
            maxBrands: brandData.maxBrands
          };
        }),
        tap(transformedPostData => {
          this.brands = transformedPostData.brands;
          this.brandsUpdated.next({
            brands: [...this.brands],
          })
        })
      );
  }

  getBrandUpdateListener() {
    return this.brandsUpdated.asObservable();
  }

  getBrand(id: string): Observable<Brand> {
    return this.http.get<Brand>(BACKEND_URL + id);
  }

  addBrand(name: string, description: string) {
    const postData = {
      name, 
      description
    };
    this.http
      .post<{ message: string; product: Brand }>(
        BACKEND_URL,
        postData
      )
      .subscribe(responseData => {
        this.toastService.show("Brand Added", {
          className: "text-success"
        });
      });
  }

  editBrand(id: string, name: string, description: string) {
    const putData = {
      name, 
      description,
      id
    };

    this.http
      .put<{ message: string; brand: Brand }>(
        BACKEND_URL,
        putData
      )
      .subscribe(responseData => {
        this.toastService.show("Brand Modified", {
          className: "text-success"
        });
      });
  }

  deleteBrand(brandId: string) {
    return this.http.delete(`${BACKEND_URL}${brandId}`);
  }
}
