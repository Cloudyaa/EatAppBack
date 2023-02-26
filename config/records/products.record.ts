import { NewProductEntity, ProductEntity } from '../../types';
import { ValidationError } from '../../utlis/errors';

export class ProductsRecord implements ProductEntity {
  id: string;
  name: string;
  price: number;
  qtyInBasket?: number;
  description: string;
  energy: number;
  fat: number;
  saturates: number;
  sugars: number;
  salt: number;

  constructor(obj: NewProductEntity) {
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError('Product name cannot be empty and cannot exceed 100 characters');
    }

    if (obj.description.length > 1000) {
      throw new ValidationError('Product description cannot exceed 1000 characters');
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
      obj.saturates < 0 ||
      obj.saturates > 99.99 ||
      obj.sugars < 0 ||
      obj.saturates > 99.99 ||
      obj.salt < 0 ||
      obj.salt > 99.99
    ) {
      throw new ValidationError('Nutrition data cannot be negative or greater than 99.99g');
    }

    obj.id ? (this.id = obj.id) : null;
    this.name = obj.name;
    this.price = obj.price;
    this.qtyInBasket = obj.qtyInBasket;
    this.description = obj.description;
    this.energy = obj.energy;
    this.fat = obj.fat;
    this.saturates = obj.saturates;
    this.sugars = obj.sugars;
    this.salt = obj.salt;
  }
}
