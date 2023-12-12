export interface SimpleProductEntity {
  productId: string;
  name: string;
  price: number;
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

export interface NewProductEntity extends Omit<ProductEntity, 'productId'> {
  productId?: string;
}

export type ProductDTO = NewProductEntity;
