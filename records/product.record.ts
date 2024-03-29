import { NewProductEntity, ProductEntity, SimpleProductEntity } from '../types';
import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
import { pool, ValidationError } from '../utlis';

type ProductsRecordResults = [ProductEntity[], FieldPacket[]];

export class ProductRecord implements ProductEntity {
  productId: string;
  name: string;
  price: number;
  description: string;
  lifeInDays: number;
  energy: number;
  fat: number;
  protein: number;
  fibre: number;
  sugars: number;
  salt: number;
  priceId: string;

  constructor(obj: NewProductEntity) {
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError('Product name cannot be empty and cannot exceed 100 characters');
    }

    if (obj.description.length > 1000) {
      throw new ValidationError('Product description cannot exceed 1000 characters');
    }

    if (obj.lifeInDays < 0 || obj.lifeInDays > 366) {
      throw new ValidationError('Product life cannot be negative or exceed one year');
    }

    if (obj.price < 0 || obj.price > 99.99) {
      throw new ValidationError('Price cannot be negative or greater than 99.99');
    }

    if (obj.energy < 0 || obj.energy > 500) {
      throw new ValidationError('Energy cannot be negative or greater than 500 kcal');
    }

    if (
      obj.fat < 0 ||
      obj.fat > 99.99 ||
      obj.protein < 0 ||
      obj.protein > 99.99 ||
      obj.fibre < 0 ||
      obj.fibre > 99.99 ||
      obj.sugars < 0 ||
      obj.sugars > 99.99 ||
      obj.salt < 0 ||
      obj.salt > 99.99
    ) {
      throw new ValidationError('Nutrition data cannot be negative or greater than 99.99g');
    }

    obj.productId ? (this.productId = obj.productId) : null;
    this.name = obj.name;
    this.price = obj.price;
    this.description = obj.description;
    this.lifeInDays = obj.lifeInDays;
    this.energy = obj.energy;
    this.fat = obj.fat;
    this.protein = obj.protein;
    this.fibre = obj.fibre;
    this.sugars = obj.sugars;
    this.salt = obj.salt;
    this.priceId = obj.priceId;
  }

  static async getOne(id: string): Promise<ProductRecord | null> {
    const [results] = (await pool.execute('SELECT * FROM `products` WHERE `productId` = :id', {
      id,
    })) as ProductsRecordResults;

    return results.length === 0 ? null : new ProductRecord(results[0]);
  }

  async insert(): Promise<string> {
    if (!this.productId) {
      this.productId = uuid();
    } else {
      throw new Error('Cannot insert something that is already in database');
    }

    await pool.execute(
      'INSERT INTO `products` VALUES (:productId, :name, :description, :lifeInDays, :price, :energy, :fat, :protein, :fibre, :sugars, :salt, :priceId)',
      this,
    );

    return this.productId;
  }

  async update(): Promise<void> {
    await pool.execute(
      'UPDATE `products` SET `name` = :name, `description` = :description, `lifeInDays` = :lifeInDays,`price` = :price, `energy` = :energy, `fat` = :fat, `protein` = :protein, `fibre` = :fibre, `sugars` = :sugars, `salt` = :salt, `priceId` = :priceId WHERE `productId` = :productId',
      this,
    );
  }

  static async delete(productId: string): Promise<void> {
    await pool.execute('DELETE FROM `products` WHERE `productId` = :productId', {
      productId,
    });
  }

  static async find(name: string): Promise<SimpleProductEntity[]> {
    const [results] = (await pool.execute('SELECT * FROM `products` WHERE `name` LIKE :search', {
      search: `%${name}%`,
    })) as ProductsRecordResults;

    return results.map((result) => {
      const { productId, name, price } = result;
      return {
        productId,
        name,
        price,
      };
    });
  }

  static async findById(productId: string): Promise<SimpleProductEntity[]> {
    const [results] = (await pool.execute(
      'SELECT * FROM `products` WHERE `productId` = :productId',
      {
        productId,
      },
    )) as ProductsRecordResults;

    return results.map((result) => {
      const { productId, name, price } = result;
      return {
        productId,
        name,
        price,
      };
    });
  }

  static async getBestsellers(): Promise<SimpleProductEntity[]> {
    const [results] = (await pool.execute(
      'SELECT p.productId, p.name, p.price, COUNT(*) AS order_count, SUM(order_details.orderedQty) AS total_ordered_qty\n' +
        'FROM products p\n' +
        'JOIN order_details ON p.productId = order_details.productId\n' +
        'GROUP BY p.productId\n' +
        'ORDER BY order_count DESC, total_ordered_qty DESC\n' +
        'LIMIT 3;',
    )) as ProductsRecordResults;

    return results.map((result) => {
      const { productId, name, price } = result;
      return {
        productId,
        name,
        price,
      };
    });
  }

  static async getPriceId(productId: string): Promise<string | null> {
    const [results] = (await pool.execute(
      'SELECT `priceId` FROM `products` WHERE `productId` = :productId',
      {
        productId,
      },
    )) as ProductsRecordResults;

    return results.length === 0 ? null : results[0].priceId;
  }
}
