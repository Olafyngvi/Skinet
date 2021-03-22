import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductFormValues } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  getUsers() {
    return this.http.get(this.baseUrl + 'Account/users');
  }

  // tslint:disable-next-line: typedef
  createProduct(product: ProductFormValues) {
    return this.http.post(this.baseUrl + 'products', product);
  }

  // tslint:disable-next-line: typedef
  updateProduct(product: ProductFormValues, id: number) {
    return this.http.put(this.baseUrl + 'products/' + id, product);
  }

  // tslint:disable-next-line: typedef
  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + 'products/' + id);
  }

  // tslint:disable-next-line: typedef
  uploadImage(file: File, id: number) {
    const formData = new FormData();
    formData.append('photo', file, 'image.png');
    return this.http.put(this.baseUrl + 'products/' + id + '/photo', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  // tslint:disable-next-line: typedef
  deleteProductPhoto(photoId: number, productId: number) {
    return this.http.delete(
      this.baseUrl + 'products/' + productId + '/photo/' + photoId
    );
  }

  // tslint:disable-next-line: typedef
  setMainPhoto(photoId: number, productId: number) {
    return this.http.post(
      this.baseUrl + 'products/' + productId + '/photo/' + photoId,
      {}
    );
  }
}
