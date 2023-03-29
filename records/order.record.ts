import { DetailedOrderEntity, NewOrderEntity, OrderedProductEntity, OrderEntity } from '../types';
import { pool, ValidationError } from '../utlis';
import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';

type OrderRecordResults = [OrderEntity[], FieldPacket[]];
type DetailedOrderRecordResults = [DetailedOrderEntity[], FieldPacket[]];

export class OrderRecord implements OrderEntity {
  products: OrderedProductEntity[];
  totalValue: number;
  totalQty: number;
  userId: string;
  orderId: string;
  orderNo: number;
  createdAt: string;
  updatedAt: string;
  status: 'pending' | 'dispatched' | 'completed';

  constructor(obj: NewOrderEntity) {
    if (obj.totalQty === 0) {
      throw new ValidationError('Order cannot be empty');
    }

    if (obj.totalValue < 0) {
      throw new ValidationError('Total order value cannot be negative');
    }

    if (obj.totalValue === 0) {
      throw new ValidationError('Total order value must be greater than zero');
    }

    this.products = obj.products;
    this.totalValue = obj.totalValue;
    this.totalQty = obj.totalQty;
    this.userId = obj.userId;
    obj.orderNo ? (this.orderNo = obj.orderNo) : null;
    obj.orderId ? (this.orderId = obj.orderId) : null;
    obj.createdAt ? (this.createdAt = obj.createdAt) : null;
    obj.createdAt ? (this.createdAt = obj.createdAt) : null;
    obj.status ? (this.status = obj.status) : null;
  }

  static async getOrder(orderId: string): Promise<OrderEntity | null> {
    const [results] = (await pool.execute('SELECT * FROM `orders` WHERE `orderId` = :orderId', {
      orderId,
    })) as OrderRecordResults;

    return results.length === 0 ? null : new OrderRecord(results[0]);
  }

  static async getOrderedProducts(orderId: string): Promise<DetailedOrderEntity[] | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `order_details` WHERE `orderId` = :orderId',
      {
        orderId,
      },
    )) as DetailedOrderRecordResults;

    if (results.length === 0) {
      return null;
    }

    return results.map((result) => {
      const { productId, orderedQty } = result;
      return {
        productId,
        orderedQty,
      };
    });
  }

  static async getUserOrders(userId: string): Promise<OrderEntity[] | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `orders` WHERE `userId` = :userId ORDER BY createdAt DESC',
      {
        userId,
      },
    )) as OrderRecordResults;

    return results.length === 0 ? null : results;
  }

  static async getAllOrders(): Promise<OrderEntity[] | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `orders` ORDER BY createdAt DESC',
    )) as OrderRecordResults;

    return results.length === 0 ? null : results;
  }

  async saveOrder(): Promise<void> {
    if (!this.orderId) {
      this.orderId = uuid();
    } else {
      throw new Error('Cannot insert something that is already in database');
    }

    this.status = 'pending';

    await pool.execute(
      'INSERT INTO `orders` (`orderId`, `userId`, `totalValue`, `totalQty`, `status`) VALUES (:orderId, :userId, :totalValue, :totalQty, :status)',
      {
        orderId: this.orderId,
        userId: this.userId,
        totalValue: this.totalValue,
        totalQty: this.totalQty,
        status: this.status,
      },
    );

    this.products.forEach((one) => {
      (async () => {
        await pool.execute(
          'INSERT INTO `order_details` VALUES (:orderId, :productId, :orderedQty)',
          {
            orderId: this.orderId,
            productId: one.productId,
            orderedQty: one.orderedQty,
          },
        );
      })();
    });
  }
}
