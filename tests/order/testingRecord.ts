import { OrderedProductEntity, OrderEntity } from '../../types';

export const testBasketProduct: OrderedProductEntity = {
  productId: '106c939a-9f76-4bda-a283-55d8b7155310',
  name: 'carrots',
  price: 1.29,
  qtyInBasket: 3,
};

export const testOrder: OrderEntity = {
  products: [testBasketProduct],
  totalQty: 0,
  totalValue: 0,
  userId: '25cc95b3-c83f-4262-af4a-52b9e0a761f6',
};

testOrder.totalQty = testOrder.products.reduce((total, product) => total + product.qtyInBasket, 0);

testOrder.totalValue = testOrder.products.reduce(
  (total, product) => total + product.price * product.qtyInBasket,
  0,
);