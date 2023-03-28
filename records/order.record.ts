import { OrderedProductEntity, OrderEntity } from '../types';
import { ValidationError } from '../utlis';

export class OrderRecord implements OrderEntity {
  products: OrderedProductEntity[];
  totalValue: number;
  totalQty: number;
  userId: string;

  constructor(obj: OrderRecord) {
    if (obj.totalQty === 0) {
      throw new ValidationError('Order cannot be empty');
    }

    if (obj.totalValue < 0) {
      throw new ValidationError('Total order value cannot be negative');
    }

    if (obj.totalValue === 0) {
      throw new ValidationError('Total order value must be greater than zero');
    }
  }
}
