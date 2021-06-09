import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams: ShopParams;
  totalCount: number;
  sortOptions = [
    {name: 'Abecedno', value: 'name'},
    {name: 'Cijena: niža prema višoj', value: 'priceAsc'},
    {name: 'Cijena: viša prema nižoj', value: 'priceDesc'},
  ];

  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
  }

  // tslint:disable-next-line: typedef
  getProducts(useCache = false) {
    // tslint:disable-next-line: deprecation
    this.shopService.getProducts(useCache).subscribe(response => {
      this.products = response.data;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  getBrands() {
    // tslint:disable-next-line: deprecation
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'Svi'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  getTypes() {
    // tslint:disable-next-line: deprecation
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'Svi'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  onBrandSelected(brandId: number) {
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
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
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }

  // tslint:disable-next-line: typedef
  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
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
