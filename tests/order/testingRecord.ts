import { NewOrderEntity, OrderedProductEntity } from '../../types';

export const testBasket: OrderedProductEntity[] = [
  {
    productId: 'test_product1',
    name: 'carrots',
    price: 1.29,
    orderedQty: 3,
  },
  {
    productId: 'test_product1',
    name: 'oranges',
    price: 3.59,
    orderedQty: 1,
  },
];

export const testOrder: NewOrderEntity = {
  products: testBasket,
  totalQty: 0,
  totalValue: 0,
  userId: 'test_user',
};

testOrder.totalQty = testOrder.products.reduce((total, product) => total + product.orderedQty, 0);

testOrder.totalValue = testOrder.products.reduce(
  (total, product) => total + product.price * product.orderedQty,
  0,
);
