import { testProduct } from './testingRecord';
import { ProductRecord } from '../records/product.record';

let errMessage: string;

test('Can build ProductsRecord', () => {
  expect(testProduct.name).toBe('Test name');
  expect(testProduct.description).toBe('Test description');
  expect(testProduct.price).toStrictEqual(99.99);
  expect(testProduct.energy).toStrictEqual(100);
  expect(
    testProduct.fat && testProduct.saturates && testProduct.sugars && testProduct.salt,
  ).toStrictEqual(20.5);
});

test('Throws when invalid name provided', () => {
  errMessage = 'Product name cannot be empty and cannot exceed 100 characters';
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        name: '',
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        name: 'Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test',
      }),
  ).toThrow(errMessage);
});

test('Throws when too long description provided', () => {
  errMessage = 'Product description cannot exceed 1000 characters';
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur',
      }),
  ).toThrow(errMessage);
});

test('Throws when invalid price provided', () => {
  errMessage = 'Price cannot be negative or greater than 99.99';
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        price: -10,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        price: 100,
      }),
  ).toThrow(errMessage);
});

test('Throws when invalid energy amount provided', () => {
  errMessage = 'Energy cannot be negative or greater than 500 kcal';
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        energy: -501,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        energy: 501,
      }),
  ).toThrow(errMessage);
});

test('Throws when invalid nutrition data provided', () => {
  errMessage = 'Nutrition data cannot be negative or greater than 99.99g';
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        fat: -1,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        saturates: -1,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        sugars: -1,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        salt: -1,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        fat: 100,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        saturates: 100,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        sugars: 100,
      }),
  ).toThrow(errMessage);
  expect(
    () =>
      new ProductRecord({
        ...testProduct,
        salt: 100,
      }),
  ).toThrow(errMessage);
});
