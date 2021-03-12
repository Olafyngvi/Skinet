import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem, IBasket } from '../../models/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.css']
})
export class BasketSummaryComponent implements OnInit {
  basket$: Observable<IBasket>;
  @Output() decrement: EventEmitter<BasketItem> = new EventEmitter<BasketItem>();
  @Output() increment: EventEmitter<BasketItem> = new EventEmitter<BasketItem>();
  @Output() remove: EventEmitter<BasketItem> = new EventEmitter<BasketItem>();
  @Input() isBasket = true;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  // tslint:disable-next-line: typedef
  decrementItemQuantity(item: BasketItem) {
    this.decrement.emit(item);
  }
  // tslint:disable-next-line: typedef
  incrementItemQuantity(item: BasketItem) {
    this.increment.emit(item);
  }
  // tslint:disable-next-line: typedef
  removeBasketItem(item: BasketItem) {
    this.remove.emit(item);
  }
}
