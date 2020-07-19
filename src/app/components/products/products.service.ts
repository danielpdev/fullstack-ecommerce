import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Router } from "@angular/router";

import { Product } from "./models/Product";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';

const BACKEND_URL = environment.apiUrl + "/product/";

@Injectable({ providedIn: "root" })
export class ProductsService {
  private products: Product[] = [];
  private productsUpdated = new Subject<{ products: Product[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router,
    private toastService: ToasterService) {
  }

  getFeaturedProducts() {
    return this.http
      .get<{ message: string; products: any; size: number }>(
        BACKEND_URL + "dashboard/featured"
      )
      .pipe(
        map(productData => {
          return {
            products: productData.products.map(product => {
              return {
                description: product.description,
                name: product.name,
                price: product.price,
                available: product.available,
                id: product._id,
                images: product.images,
              };
            }),
            maxPosts: productData.size
          };
        }),
      );
  }
  getProducts(perPage, page, manage = false, featured = 'false') {
    return this.http
      .get<{ message: string; products: any; maxPosts: number }>(
        BACKEND_URL,
        manage ? {} : {
          params: {
            perPage,
            page,
            filters: [`?featured=${featured}`]
          }
        }
      )
      .pipe(
        map(productData => {
          return {
            products: productData.products.map(product => {
              return {
                description: product.description,
                name: product.name,
                id: product._id,
                imagePath: product.images,
                price: product.price,
                brand: product.brand,
                quantity: product.availableQuantity
              };
            }),
            maxPosts: productData.maxPosts
          };
        }),
        tap(transformedPostData => {
          this.products = transformedPostData.products;
          this.productsUpdated.next({
            products: [...this.products],
            postCount: transformedPostData.maxPosts
          })
        })
      );
  }

  getProductsUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(BACKEND_URL + id);
  }

  addProduct(name: string, description: string, image: File, price: number,
    available: boolean, shipping: boolean,
    availableQuantity: number, publish: string,
    featured: boolean, brand: string) {
    const postData = new FormData();
    postData.append("name", name);
    postData.append("description", description);
    postData.append("price", `${price}`);
    postData.append("available", `${available}`);
    postData.append("shipping", `${shipping}`);
    postData.append("availableQuantity", `${availableQuantity}`);
    postData.append("publish", `${publish}`);
    postData.append("featured", `${featured}`);
    postData.append("brand", `${brand}`);
    postData.append("image", image, image.name);

    this.http
      .post<{ message: string; product: Product }>(
        BACKEND_URL,
        postData
      )
      .subscribe(responseData => {
        this.toastService.show("Product Added", {
          className: "text-success"
        });
      });
  }

  editProduct(id: string, name: string, description: string, image: File, price: number,
    available: boolean, shipping: boolean,
    availableQuantity: number, publish: string,
    featured: boolean, brand: string) {

    const postData = new FormData();
    postData.append("id", id);
    postData.append("name", name);
    postData.append("description", description);
    postData.append("price", `${price}`);
    postData.append("available", `${available}`);
    postData.append("shipping", `${shipping}`);
    postData.append("availableQuantity", `${availableQuantity}`);

    postData.append("publish", `${publish}`);
    postData.append("featured", `${featured}`);
    postData.append("brand", `${brand}`);
    if (image) {
      postData.append("image", image, image.name);
    }
    this.http
      .put<{ message: string; product: Product }>(
        BACKEND_URL,
        postData
      )
      .subscribe(responseData => {
        this.toastService.show("Product Modified", {
          className: "text-success"
        });
      });
  }

  deleteProduct(productId: string) {
    return this.http.delete(`${BACKEND_URL}${productId}`);
  }

}
