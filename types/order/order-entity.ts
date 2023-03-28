import { SimpleProductEntity } from '../product';

export interface BasketDTO {
  products: OrderedProductEntity[];
  totalQty: number;
  totalValue: number;
}

export interface OrderEntity extends BasketDTO {
  orderId: string;
  userId: string;
  createdAt: string;
}

export interface OrderedProductEntity extends SimpleProductEntity {
  qtyInBasket: number;
}

export interface NewOrderEntity extends Omit<OrderEntity, 'orderId' | 'createdAt'> {
  orderId?: string;
  createdAt?: string;
}
