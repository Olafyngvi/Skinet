import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventTargetLike } from 'rxjs/internal/observable/fromEvent';
import { Marke } from '../shared/models/marke';
import { Proizvod } from '../shared/models/proizvod';
import { ShopParams } from '../shared/models/shopParams';
import { Tipovi } from '../shared/models/tipovi';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  products: Proizvod[];
  marke: Marke[];
  tipovi: Tipovi[];
  shopParams: ShopParams;
  totalCount: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'naziv' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts(true);
    this.getMarke();
    this.getTipovi();
  }

  // tslint:disable-next-line: typedef
  getProducts(useCache = false) {
    this.shopService.getProducts(useCache).subscribe(
      (response) => {
        this.products = response.data;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line: typedef
  getMarke() {
    this.shopService.getMarke().subscribe(
      (response) => {
        this.marke = [{ id: 0, naziv: 'Svi' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line: typedef
  getTipovi() {
    // tslint:disable-next-line: deprecation
    this.shopService.getTipovi().subscribe(
      (response) => {
        this.tipovi = [{ id: 0, naziv: 'Svi' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line: typedef
  onMarkaSelected(markaId: number) {
    const params = this.shopService.getShopParams();
    params.markaId = markaId;
    params.pageIndex = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  // tslint:disable-next-line: typedef
  onTipSelected(tipId: number) {
    const params = this.shopService.getShopParams();
    params.tipId = tipId;
    params.pageIndex = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  // tslint:disable-next-line: typedef
  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    if (params.pageIndex !== event) {
      params.pageIndex = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }

  // tslint:disable-next-line: typedef
  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageIndex = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  // tslint:disable-next-line: typedef
  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
