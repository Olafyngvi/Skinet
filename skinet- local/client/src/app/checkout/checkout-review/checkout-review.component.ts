import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.css']
})
export class CheckoutReviewComponent implements OnInit {
  @Input() appStepper: CdkStepper;

  constructor(private basketService: BasketService,
              private taostr: ToastrService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  createPaymentIntent() {
    return this.basketService.createPaymentIntent().subscribe((response: any) => {
      this.taostr.success('Payment intent created');
      this.appStepper.next();
    }, error => {
      console.log(error);
      this.taostr.error(error.message);
    });
  }
}
