import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  order: IOrder;
  isAdmin$: Observable<boolean>;

  constructor(private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService,
              private orderService: OrdersService,
              private accountService: AccountService) {
      this.breadcrumbService.set('@OrderDetailed', ' ');
     }

  ngOnInit(): void {
    // tslint:disable-next-line: no-debugger
    debugger;
    this.isAdmin$ = this.accountService.isAdmin$;
    // tslint:disable-next-line: deprecation
    this.isAdmin$.subscribe(admin => {
      if (admin) {
        this.orderService.getOrderForAdmin(+this.route.snapshot.paramMap.get('id'))
      // tslint:disable-next-line: deprecation
      .subscribe((order: IOrder) => {
        this.order = order;
        this.breadcrumbService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}   -   ${order.buyerEmail}`);
      }, error => {
        console.log(error);
      });
      } else {
        this.orderService.getOrderDetailed(+this.route.snapshot.paramMap.get('id'))
        // tslint:disable-next-line: deprecation
        .subscribe((order: IOrder) => {
          this.order = order;
          this.breadcrumbService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}   -   ${order.buyerEmail}`);
        }, error => {
          console.log(error);
        });
      }
    });
  }
}
