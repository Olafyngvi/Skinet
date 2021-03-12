import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { Proizvod } from 'src/app/shared/models/proizvod';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Proizvod;
  quantity = 1;
  constructor(private shopService: ShopService,
              private activatedRoute: ActivatedRoute,
              private bcService: BreadcrumbService,
              private basketService: BasketService) {
                this.bcService.set('@productDetails', ' ');
               }

  ngOnInit(): void {
    this.loadProduct();
  }
  // tslint:disable-next-line: typedef
  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }
  // tslint:disable-next-line: typedef
  incrementQuantity() {
    this.quantity++;
  }
  // tslint:disable-next-line: typedef
  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  // tslint:disable-next-line: typedef
  loadProduct() {
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(product => {
      this.product = product;
      this.bcService.set('@productDetails', product.naziv);
    }, error => {
      console.log(error);
    });
  }

}
