import { SimpleProductEntity } from '../product';

export interface BasketDTO {
  products: OrderedProductEntity[];
  totalQty: number;
  totalValue: number;
}

export interface OrderEntity extends BasketDTO {
  userId: string;
}

export interface OrderedProductEntity extends SimpleProductEntity {
  qtyInBasket: number;
}
