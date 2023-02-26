export interface SimpleProductEntity {
  id: string;
  name: string;
  price: number;
  qtyInBasket?: number;
}

export interface Nutrition {
  energy: number;
  fat: number;
  saturates: number;
  sugars: number;
  salt: number;
}

export interface ProductEntity extends SimpleProductEntity, Nutrition {
  description: string;
}

export interface NewProductEntity extends Omit<ProductEntity, 'id'> {
  id?: string;
}
