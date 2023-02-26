export interface SimpleProductEntity {
  id: string;
  name: string;
  price: number;
  qtyInBasket?: number;
}

export interface Nutrition {
  energy: number;
  fat: number;
  protein: number;
  fibre: number;
  sugars: number;
  salt: number;
}

export interface ProductEntity extends SimpleProductEntity, Nutrition {
  description: string;
  lifeInDays: number;
}

export interface NewProductEntity extends Omit<ProductEntity, 'id'> {
  id?: string;
}
