import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getAllOrders() {
    return this.http.get(this.baseUrl + 'orders/all');
  }
  // tslint:disable-next-line: typedef
  getOrdersByMail(mail: string) {
    return this.http.get(this.baseUrl + 'orders/' + mail + '/all');
  }

  // tslint:disable-next-line: typedef
  getOrdersForUser() {
    return this.http.get(this.baseUrl + 'orders');
  }

  // tslint:disable-next-line: typedef
  getOrderDetailed(id: number) {
    return this.http.get(this.baseUrl + 'orders/' + id);
  }

  // tslint:disable-next-line: typedef
  getOrderForAdmin(id: number) {
    return this.http.get(this.baseUrl + 'orders/admin/' + id);
  }
}
