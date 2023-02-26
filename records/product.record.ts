import { NewProductEntity, ProductEntity, SimpleProductEntity } from '../types';
import { ValidationError } from '../utlis/errors';
import { FieldPacket } from 'mysql2';
import { pool } from '../utlis/db';
import { v4 as uuid } from 'uuid';

type ProductsRecordResults = [ProductEntity[], FieldPacket[]];

export class ProductRecord implements ProductEntity {
  id: string;
  name: string;
  price: number;
  qtyInBasket?: number;
  description: string;
  lifeInDays: number;
  energy: number;
  fat: number;
  protein: number;
  fibre: number;
  sugars: number;
  salt: number;

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

    obj.id ? (this.id = obj.id) : null;
    this.name = obj.name;
    this.price = obj.price;
    obj.qtyInBasket ? (this.qtyInBasket = obj.qtyInBasket) : (this.qtyInBasket = 0);
    this.description = obj.description;
    this.lifeInDays = obj.lifeInDays;
    this.energy = obj.energy;
    this.fat = obj.fat;
    this.protein = obj.protein;
    this.fibre = obj.fibre;
    this.sugars = obj.sugars;
    this.salt = obj.salt;
  }

  static async getOne(id: string): Promise<ProductRecord | null> {
    const [results] = (await pool.execute('SELECT * FROM `products` WHERE `id` = :id', {
      id,
    })) as ProductsRecordResults;

    return results.length === 0 ? null : new ProductRecord(results[0]);
  }

  async insert(): Promise<string> {
    if (!this.id) {
      this.id = uuid();
    } else {
      throw new Error('Cannot insert something that is already in database');
    }

    await pool.execute(
      'INSERT INTO `products` VALUES (:id, :name, :description, :lifeInDays, :price, :energy, :fat, :protein, :fibre, :sugars, :salt)',
      this,
    );

    return this.id;
  }

  static async find(name: string): Promise<SimpleProductEntity[]> {
    const [results] = (await pool.execute('SELECT * FROM `products` WHERE `name` LIKE :search', {
      search: `%${name}%`,
    })) as ProductsRecordResults;

    return results.map((result) => {
      const { id, name, price } = result;
      return {
        id,
        name,
        price,
      };
    });
  }
}
