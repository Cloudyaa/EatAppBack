import { SimpleProductEntity } from '../product';

export interface SimpleOrderEntity {
  orderNo: number;
  orderId: string;
  createdAt: string;
  totalValue: number;
}

export interface DetailedOrderEntity {
  productId: string;
  orderedQty: number;
}

export interface OrderedProductEntity extends SimpleProductEntity, DetailedOrderEntity {}

export interface OrderDTO {
  products: OrderedProductEntity[];
  totalQty: number;
  totalValue: number;
  userId: string;
}

export interface OrderEntity extends OrderDTO {
  orderNo: number;
  orderId: string;
  createdAt: string;
  updatedAt: string;
  status: 'pending' | 'dispatched' | 'completed';
}

export interface NewOrderEntity
  extends Omit<OrderEntity, 'orderId' | 'createdAt' | 'updatedAt' | 'orderNo' | 'status'> {
  orderNo?: number;
  orderId?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: 'pending' | 'dispatched' | 'completed';
}

export interface SuccessOrderResponse {
  status: number;
  message: string;
  orderNumber: number;
}
