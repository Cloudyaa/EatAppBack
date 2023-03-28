import { SimpleProductEntity } from '../product';

export interface OrderDTO {
  products: OrderedProductEntity[];
  totalQty: number;
  totalPrice: number;
}

export interface OrderedProductEntity extends SimpleProductEntity {
  qtyInBasket: number;
}
