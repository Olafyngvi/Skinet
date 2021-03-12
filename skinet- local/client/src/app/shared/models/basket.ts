import { v4 as uuidv4 } from 'uuid';

export interface IBasket {
  id: string;
  items: BasketItem[];
  clientSecret?: string;
  paymentIntentId?: string;
  deliveryMethodId?: number;
  shippingPrice?: number;
}

export interface BasketItem {
  id: number;
  naziv: string;
  price: number;
  quantity: number;
  slikaUrl: string;
  marka: string;
  tip: string;
}

export class Basket implements IBasket {
  id = uuidv4();
  items: BasketItem[] = [];
}

export interface IBasketTotals {
  shipping: number;
  subtotal: number;
  total: number;
}
