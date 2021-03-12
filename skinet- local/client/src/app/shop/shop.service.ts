import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marke } from '../shared/models/marke';
import { Pagination, Paginations } from '../shared/models/pagination';
import { Tipovi } from '../shared/models/tipovi';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { Proizvod } from '../shared/models/proizvod';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.apiUrl;
  products: Proizvod[] = [];
  marke: Marke[] = [];
  tipovi: Tipovi[] = [];
  pagination = new Paginations();
  shopParams = new ShopParams();
  productCache = new Map();

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  getProducts(useCache: boolean) {
    if (useCache === false) {
      this.productCache = new Map();
    }
    if (this.productCache.size > 0 && useCache === true) {
      if (this.productCache.has(Object.values(this.shopParams).join('-'))) {
        this.pagination.data = this.productCache.get(
          Object.values(this.shopParams).join('-')
        );
        return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.shopParams.markaId !== 0) {
      params = params.append('markaId', this.shopParams.markaId.toString());
    }
    if (this.shopParams.tipId !== 0) {
      params = params.append('tipId', this.shopParams.tipId.toString());
    }
    if (this.shopParams.search) {
      params = params.append('Search', this.shopParams.search);
    }
    params = params.append('Sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageIndex.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());

    return this.http
      .get<Pagination>(this.baseUrl + 'Produkti', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          this.productCache.set(
            Object.values(this.shopParams).join('-'),
            response.body.data
          );
          this.pagination = response.body;
          return this.pagination;
        })
      );
  }

  // tslint:disable-next-line: typedef
  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  // tslint:disable-next-line: typedef
  getShopParams() {
    return this.shopParams;
  }

  // tslint:disable-next-line: typedef
  getMarke() {
    if (this.marke.length > 0) {
      return of(this.marke);
    }
    return this.http.get<Marke[]>(this.baseUrl + 'Produkti/marke').pipe(
      map((response) => {
        this.marke = response;
        return response;
      })
    );
  }

  // tslint:disable-next-line: typedef
  getTipovi() {
    if (this.tipovi.length > 0) {
      return of(this.tipovi);
    }
    return this.http.get<Tipovi[]>(this.baseUrl + 'Produkti/tip').pipe(
      map((response) => {
        this.tipovi = response;
        return response;
      })
    );
  }

  // tslint:disable-next-line: typedef
  getProduct(id: number) {
    let product: Proizvod;
    this.productCache.forEach((products: Proizvod[]) => {
      product = products.find((p) => p.id === id);
    });

    if (product) {
      return of(product);
    }

    return this.http.get<Proizvod>(this.baseUrl + 'Produkti/' + id);
  }
}
