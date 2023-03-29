import { testBasket, testOrder } from './testingRecord';
import { OrderRecord } from '../../records';

let errMessage: string;

test('Can build OrderRecord', () => {
  expect(testOrder.products).toStrictEqual([...testBasket]);
  expect(testOrder.totalQty).toStrictEqual(4);
  expect(testOrder.totalValue).toStrictEqual(3 * 1.29 + 3.59);
  expect(testOrder.userId).toStrictEqual('test_user');
});

test('Throws when order is empty', () => {
  errMessage = 'Order cannot be empty';
  expect(
    () =>
      new OrderRecord({
        ...testOrder,
        totalQty: 0,
      }),
  ).toThrow(errMessage);
});

test('Throws when total value is negative', () => {
  errMessage = 'Total order value cannot be negative';
  expect(
    () =>
      new OrderRecord({
        ...testOrder,
        totalValue: -5,
      }),
  ).toThrow(errMessage);
});

test('Throws when total value is equal to zero', () => {
  errMessage = 'Total order value must be greater than zero';
  expect(
    () =>
      new OrderRecord({
        ...testOrder,
        totalValue: 0,
      }),
  ).toThrow(errMessage);
});
