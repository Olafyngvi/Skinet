import { Component, Input, OnInit } from '@angular/core';
import { IProduct, ProductFormValues } from '../../shared/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { IBrand } from '../../shared/models/brand';
import { IType } from '../../shared/models/productType';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss'],
})
export class EditProductFormComponent implements OnInit {
  @Input() product: ProductFormValues;
  @Input() brands: IBrand[];
  @Input() types: IType[];

  // tslint:disable-next-line: max-line-length
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  updatePrice(event: any) {
    this.product.price = event;
  }

  // tslint:disable-next-line: typedef
  onSubmit(product: ProductFormValues) {
    if (this.route.snapshot.url[0].path === 'edit') {
      const updatedProduct = {
        ...this.product,
        ...product,
        price: +product.price,
      };
      // tslint:disable-next-line: deprecation
      this.adminService
        .updateProduct(updatedProduct, +this.route.snapshot.paramMap.get('id'))
        // tslint:disable-next-line: deprecation
        .subscribe((response: any) => {
          this.router.navigate(['/admin']);
        });
    } else {
      const newProduct = { ...product, price: +product.price };
      // tslint:disable-next-line: deprecation
      this.adminService.createProduct(newProduct).subscribe((response: any) => {
        this.router.navigate(['/admin']);
      });
    }
  }
}
