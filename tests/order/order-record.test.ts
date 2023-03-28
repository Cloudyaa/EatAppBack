import { testBasketProduct, testOrder } from './testingRecord';
import { OrderRecord } from '../../records';

let errMessage: string;

test('Can build OrderRecord', () => {
  expect(testOrder.products).toStrictEqual([{ ...testBasketProduct }]);
  expect(testOrder.totalQty).toStrictEqual(3);
  expect(testOrder.totalValue).toStrictEqual(3 * 1.29);
  expect(testOrder.userId).toStrictEqual('25cc95b3-c83f-4262-af4a-52b9e0a761f6');
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
